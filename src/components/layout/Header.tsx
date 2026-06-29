"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isDialer = pathname === "/power-dialer";
  
  const [sessionSeconds, setSessionSeconds] = useState(5085);

  useEffect(() => {
    if (!isDialer) return;
    const interval = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isDialer]);

  const formatTimer = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <header className="fixed top-0 right-0 left-[260px] h-[64px] z-40 flex justify-between items-center px-gutter bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md border-b border-outline-variant dark:border-outline shadow-sm dark:shadow-none transition-all duration-200">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full max-w-[400px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input 
            className="w-full bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-body-md focus:ring-2 focus:ring-primary/20 transition-all focus:outline-none" 
            placeholder={isDialer ? "Search leads, campaigns or scripts... (⌘K)" : "Search tasks, contacts, or claims (⌘K)"} 
            type="text" 
          />
        </div>
        {isDialer && (
          <div className="flex items-center gap-2 px-3 py-1 bg-primary-container text-on-primary rounded-full ml-4">
            <span className="material-symbols-outlined text-[18px]">campaign</span>
            <span className="font-label-md text-label-md">Q4 Life Campaign</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-on-surface-variant hover:text-primary transition-all duration-200 cursor-pointer relative">
          <span className="material-symbols-outlined">notifications</span>
          {!isDialer && <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>}
        </button>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-all duration-200 cursor-pointer">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
        
        {isDialer && (
          <div className="flex items-center gap-2 bg-secondary-container px-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
            <span className="font-code-md text-code-md font-bold text-on-secondary-container">{formatTimer(sessionSeconds)}</span>
          </div>
        )}
      </div>
    </header>
  );
}
