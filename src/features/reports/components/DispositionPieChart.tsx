import React from "react";

export default function DispositionPieChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:-translate-y-0.5 transition-transform p-6">
      <h4 className="font-title-md text-title-md mb-6">Disposition Breakdown</h4>
      <div className="flex flex-col items-center justify-center h-[260px]">
        <div 
          className="relative w-40 h-40 rounded-full border-[16px] border-primary flex items-center justify-center" 
          style={{ borderColor: "#00407e #7af5f5 #e0e3e5 #006a6a" }}
        >
          <div className="text-center">
            <span className="text-headline-md font-bold block">2.4k</span>
            <span className="text-[10px] text-on-surface-variant uppercase">Total Leads</span>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-2 w-full">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-label-md truncate">Sold (42%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary-container"></div>
            <span className="text-label-md truncate">Callback (28%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-tertiary-fixed"></div>
            <span className="text-label-md truncate">No Answer (15%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <span className="text-label-md truncate">DNC (15%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
