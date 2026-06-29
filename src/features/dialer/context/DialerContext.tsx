"use client";

import React, { createContext, useContext, useState, useTransition, useEffect } from "react";
import { completeQueueItem } from "@/features/queue/actions/assignment.actions";
import { logCall } from "@/features/dialer/actions/dialer.actions";

export type CallState = "idle" | "ringing" | "connected" | "wrap_up";

interface DialerContextType {
  queue: any[];
  activeItem: any | null;
  callState: CallState;
  setCallState: (state: CallState) => void;
  callDuration: number;
  nextLead: (disposition: string, queueAction: "Completed" | "Skipped" | "Requeued") => void;
  isPending: boolean;
}

const DialerContext = createContext<DialerContextType | undefined>(undefined);

export function DialerProvider({ children, initialQueue }: { children: React.ReactNode; initialQueue: any[] }) {
  const [queue, setQueue] = useState(initialQueue);
  const [callState, setCallState] = useState<CallState>("idle");
  const [callDuration, setCallDuration] = useState(0);
  const [isPending, startTransition] = useTransition();

  const activeItem = queue.length > 0 ? queue[0] : null;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === "connected") {
      interval = setInterval(() => setCallDuration(d => d + 1), 1000);
    } else if (callState === "idle" || callState === "ringing") {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const nextLead = (disposition: string, queueAction: "Completed" | "Skipped" | "Requeued") => {
    if (!activeItem) return;

    const contactId = activeItem.contactId;
    const finalDuration = callDuration;
    const queueItemId = activeItem.id;

    // Instantly remove from local queue for snappy UI
    setQueue((prev) => prev.slice(1));
    setCallState("idle");
    setCallDuration(0);

    // Persist in background
    startTransition(async () => {
      try {
        await logCall(contactId, finalDuration, disposition);
        await completeQueueItem(queueItemId, queueAction);
      } catch (err) {
        console.error("Failed to process queue item and call log", err);
      }
    });
  };

  return (
    <DialerContext.Provider value={{ queue, activeItem, callState, setCallState, callDuration, nextLead, isPending }}>
      {children}
    </DialerContext.Provider>
  );
}

export function useDialer() {
  const context = useContext(DialerContext);
  if (context === undefined) {
    throw new Error("useDialer must be used within a DialerProvider");
  }
  return context;
}
