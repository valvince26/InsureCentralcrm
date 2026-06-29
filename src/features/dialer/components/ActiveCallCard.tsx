"use client";

import React from "react";
import { useDialer } from "../context/DialerContext";

export default function ActiveCallCard() {
  const { activeItem, callState, setCallState } = useDialer();

  if (!activeItem) {
    return (
      <div className="bg-white border border-outline-variant rounded-2xl p-10 shadow-sm relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-24 h-24 bg-surface-container rounded-full mb-6 flex items-center justify-center text-outline">
          <span className="material-symbols-outlined text-[40px]">check_circle</span>
        </div>
        <h2 className="font-display-lg text-display-lg text-on-surface mb-2">You're All Caught Up!</h2>
        <p className="font-title-lg text-title-lg text-on-surface-variant mb-6">No pending leads in your queue.</p>
      </div>
    );
  }

  const contact = activeItem.contact;
  const isRinging = callState === "ringing";
  const isConnected = callState === "connected";

  const handleCall = () => {
    if (callState === "idle") setCallState("ringing");
    else if (callState === "ringing") setCallState("connected");
  };

  const handleEndCall = () => {
    setCallState("wrap_up");
  };

  return (
    <div className="bg-white border border-outline-variant rounded-2xl p-10 shadow-sm relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className={`w-24 h-24 bg-surface-container rounded-full mb-6 flex items-center justify-center border-4 border-white shadow-md transition-all ${isRinging ? 'animate-pulse bg-primary/20' : ''}`}>
          <span className="font-display-lg text-display-lg text-primary-container">
            {contact.firstName?.charAt(0) || "U"}{contact.lastName?.charAt(0) || ""}
          </span>
        </div>
        <h2 className="font-display-lg text-display-lg text-on-surface mb-2">{contact.firstName} {contact.lastName}</h2>
        <p className="font-title-lg text-title-lg text-on-surface-variant mb-6 tracking-tight">
          {contact.phone || "No Phone Number"}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {contact.state && (
            <span className="px-4 py-1.5 bg-surface-container-low text-on-surface border border-outline-variant rounded-full text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary">location_on</span> {contact.state}
            </span>
          )}
          <span className="px-4 py-1.5 bg-surface-container-low text-on-surface border border-outline-variant rounded-full text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary">event</span> Lead Source: {contact.source || "Direct"}
          </span>
          <span className="px-4 py-1.5 bg-surface-container-low text-on-surface border border-outline-variant rounded-full text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary">stars</span> {activeItem.priority > 0 ? "High Priority" : "Standard"}
          </span>
        </div>
        
        <div className="flex items-center gap-8">
          <button 
            onClick={handleCall}
            disabled={isConnected}
            className={`w-20 h-20 flex items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 ${isConnected ? 'bg-secondary/50 cursor-not-allowed' : 'bg-secondary hover:scale-105 active:scale-95 cursor-pointer'}`}
          >
            <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
          </button>
          
          {(isRinging || isConnected) && (
            <button 
              onClick={handleEndCall}
              className="w-24 h-24 flex items-center justify-center rounded-full bg-error text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 animate-pulse cursor-pointer"
            >
              <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>call_end</span>
            </button>
          )}

          <button className="w-20 h-20 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant shadow hover:bg-surface-container-low transition-all duration-200 cursor-pointer">
            <span className="material-symbols-outlined text-[32px]">pause</span>
          </button>
        </div>
      </div>
    </div>
  );
}
