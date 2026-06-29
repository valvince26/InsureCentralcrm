"use client";

import React, { useState } from "react";
import { useDialer } from "../context/DialerContext";

export default function DispositionBar() {
  const { activeItem, nextLead, isPending } = useDialer();
  const [activeDisp, setActiveDisp] = useState<string | null>(null);

  const dispositions = [
    { id: "no-answer", label: "No Answer", icon: "call_missed" },
    { id: "voicemail", label: "Voicemail", icon: "voicemail" },
    { id: "follow-up", label: "Follow Up", icon: "event_repeat" },
    { id: "interested", label: "Interested", icon: "star", activeClass: "bg-primary-container text-on-primary" },
    { id: "transferred", label: "Transferred", icon: "forward" },
    { id: "wrong-number", label: "Wrong Number", icon: "phone_disabled" },
    { id: "dnc", label: "DNC", icon: "block", baseClass: "bg-error-container text-on-error-container hover:opacity-80" },
    { id: "not-qualified", label: "Not Qualified", icon: "thumb_down" },
  ];

  const handleSubmit = () => {
    if (!activeDisp) {
      alert("Please select a disposition first.");
      return;
    }
    // In a real app, we'd log the call with the specific disposition string
    // Here we just advance the queue.
    nextLead(activeDisp === "no-answer" || activeDisp === "voicemail" ? "Requeued" : "Completed");
    setActiveDisp(null);
  };

  return (
    <footer className="h-[100px] bg-white border-t border-outline-variant flex items-center px-8 gap-4 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] flex-shrink-0">
      <div className="text-on-surface-variant font-label-md uppercase tracking-tighter w-24 leading-none">
        Call<br/>Disposition
      </div>
      <div className="flex-1 flex gap-3 h-14 overflow-x-auto no-scrollbar items-center">
        {dispositions.map((disp) => {
          const isActive = activeDisp === disp.id;
          const baseClass = disp.baseClass || "bg-surface-container hover:bg-surface-container-highest";
          const activeStyle = isActive 
            ? disp.activeClass || "ring-2 ring-primary bg-primary-container/10" 
            : "";

          return (
            <button
              key={disp.id}
              onClick={() => setActiveDisp(disp.id)}
              disabled={!activeItem}
              className={`h-full px-6 flex items-center justify-center gap-2 rounded-xl font-label-md transition-all ${!activeItem ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${baseClass} ${activeStyle}`}
            >
              <span className="material-symbols-outlined text-[20px]">{disp.icon}</span> {disp.label}
            </button>
          );
        })}
      </div>
      
      <button 
        onClick={handleSubmit}
        disabled={isPending || !activeItem}
        className={`h-14 px-8 bg-secondary text-white rounded-xl font-title-md flex items-center gap-3 shadow-lg hover:shadow-xl transition-all flex-shrink-0 ${(!activeItem || isPending) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {isPending ? "Saving..." : "Submit & Next"} <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </footer>
  );
}
