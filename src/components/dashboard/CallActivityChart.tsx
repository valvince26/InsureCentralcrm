import React from "react";

export default function CallActivityChart() {
  return (
    <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl soft-shadow border border-outline-variant p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-title-lg text-title-lg text-on-surface">Call Activity</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Volume trend for the past 7 days</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-surface-container text-on-surface rounded-md text-label-md font-medium border border-outline-variant">Weekly</button>
          <button className="px-3 py-1 hover:bg-surface-container text-on-surface-variant rounded-md text-label-md font-medium border border-transparent">Monthly</button>
        </div>
      </div>
      <div className="h-[320px] w-full relative">
        {/* Simulated Graph Background */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-10">
          <div className="w-full h-px bg-on-surface"></div>
          <div className="w-full h-px bg-on-surface"></div>
          <div className="w-full h-px bg-on-surface"></div>
          <div className="w-full h-px bg-on-surface"></div>
          <div className="w-full h-px bg-on-surface"></div>
        </div>
        <svg className="w-full h-full" viewBox="0 0 800 300">
          {/* Blue Line - Inbound */}
          <path d="M0,220 Q100,180 200,240 T400,120 T600,180 T800,80" fill="none" stroke="#00407e" strokeWidth="3"></path>
          {/* Teal Line - Connected */}
          <path d="M0,250 Q100,220 200,260 T400,180 T600,230 T800,140" fill="none" stroke="#006a6a" strokeDasharray="8,4" strokeWidth="2"></path>
          {/* Dots for points */}
          <circle cx="0" cy="220" fill="#00407e" r="4"></circle>
          <circle cx="200" cy="240" fill="#00407e" r="4"></circle>
          <circle cx="400" cy="120" fill="#00407e" r="4"></circle>
          <circle cx="600" cy="180" fill="#00407e" r="4"></circle>
          <circle cx="800" cy="80" fill="#00407e" r="4"></circle>
        </svg>
        <div className="flex justify-between mt-4 text-on-surface-variant text-[10px] font-bold uppercase tracking-widest px-2">
          <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
        </div>
      </div>
    </div>
  );
}
