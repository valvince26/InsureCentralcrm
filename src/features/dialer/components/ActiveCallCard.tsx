import React from "react";

export default function ActiveCallCard() {
  return (
    <div className="bg-white border border-outline-variant rounded-2xl p-10 shadow-sm relative overflow-hidden">
      {/* Background Accent Decor */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-surface-container rounded-full mb-6 flex items-center justify-center border-4 border-white shadow-md">
          <span className="font-display-lg text-display-lg text-primary-container">RP</span>
        </div>
        <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Robert Patterson</h2>
        <p className="font-title-lg text-title-lg text-on-surface-variant mb-6 tracking-tight">+1 (555) 239-4081</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <span className="px-4 py-1.5 bg-surface-container-low text-on-surface border border-outline-variant rounded-full text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary">location_on</span> Chicago, IL
          </span>
          <span className="px-4 py-1.5 bg-surface-container-low text-on-surface border border-outline-variant rounded-full text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary">event</span> Lead Since: Oct 12
          </span>
          <span className="px-4 py-1.5 bg-surface-container-low text-on-surface border border-outline-variant rounded-full text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-primary">stars</span> High Priority
          </span>
        </div>
        
        {/* Call Controls */}
        <div className="flex items-center gap-8">
          <button className="w-20 h-20 flex items-center justify-center rounded-full bg-secondary text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
            <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
          </button>
          <button className="w-24 h-24 flex items-center justify-center rounded-full bg-error text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 animate-pulse cursor-pointer">
            <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>call_end</span>
          </button>
          <button className="w-20 h-20 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant shadow hover:bg-surface-container-low transition-all duration-200 cursor-pointer">
            <span className="material-symbols-outlined text-[32px]">pause</span>
          </button>
        </div>
      </div>
    </div>
  );
}
