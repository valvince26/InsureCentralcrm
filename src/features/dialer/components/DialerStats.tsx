"use client";

import React, { useState, useEffect } from "react";

export default function DialerStats() {
  const [callSeconds, setCallSeconds] = useState(252); // 04:12

  useEffect(() => {
    const interval = setInterval(() => {
      setCallSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-8">
        <div>
          <p className="text-on-surface-variant font-label-md uppercase tracking-widest text-[10px] mb-1">Queue Progress</p>
          <div className="flex items-center gap-3">
            <span className="font-headline-md text-headline-md font-bold text-primary">14 <span className="text-on-surface-variant/40 font-normal">/ 42</span></span>
            <div className="w-32 h-2 bg-surface-container rounded-full overflow-hidden">
              <div className="w-[33%] h-full bg-primary"></div>
            </div>
          </div>
        </div>
        <div className="w-[1px] h-10 bg-outline-variant"></div>
        <div>
          <p className="text-on-surface-variant font-label-md uppercase tracking-widest text-[10px] mb-1">Active Call Time</p>
          <span className="font-headline-md text-headline-md font-bold text-secondary">{formatTimer(callSeconds)}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-on-surface-variant font-label-md uppercase tracking-widest text-[10px] mb-1">Next Lead Preview</p>
        <div className="flex items-center gap-3 justify-end">
          <span className="font-title-md text-title-md text-on-surface-variant">Sarah Jenkins</span>
          <span className="material-symbols-outlined text-primary rotate-180">arrow_back</span>
        </div>
      </div>
    </div>
  );
}
