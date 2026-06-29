"use client";

import React, { createContext, useContext, useState, useTransition } from "react";
import { completeQueueItem } from "@/features/queue/actions/assignment.actions";

export type CallState = "idle" | "ringing" | "connected" | "wrap_up";

interface DialerContextType {
  queue: any[];
  activeItem: any | null;
  callState: CallState;
  setCallState: (state: CallState) => void;
  nextLead: (disposition: "Completed" | "Skipped" | "Requeued") => void;
  isPending: boolean;
}

const DialerContext = createContext<DialerContextType | undefined>(undefined);

export function DialerProvider({ children, initialQueue }: { children: React.ReactNode; initialQueue: any[] }) {
  const [queue, setQueue] = useState(initialQueue);
  const [callState, setCallState] = useState<CallState>("idle");
  const [isPending, startTransition] = useTransition();

  const activeItem = queue.length > 0 ? queue[0] : null;

  const nextLead = (disposition: "Completed" | "Skipped" | "Requeued") => {
    if (!activeItem) return;

    // Instantly remove from local queue for snappy UI
    setQueue((prev) => prev.slice(1));
    setCallState("idle");

    // Persist in background
    startTransition(async () => {
      try {
        await completeQueueItem(activeItem.id, disposition);
      } catch (err) {
        console.error("Failed to complete queue item", err);
      }
    });
  };

  return (
    <DialerContext.Provider value={{ queue, activeItem, callState, setCallState, nextLead, isPending }}>
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
