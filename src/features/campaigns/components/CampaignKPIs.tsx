import React from "react";

export default function CampaignKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className="text-label-md font-label-md text-on-surface-variant">Active Leads</span>
          <div className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded text-[10px] font-bold">+12%</div>
        </div>
        <div className="text-headline-md font-headline-md text-on-surface">14,284</div>
        <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden mt-2">
          <div className="h-full bg-secondary w-3/4"></div>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className="text-label-md font-label-md text-on-surface-variant">Total Call Time</span>
          <span className="text-on-surface-variant text-[10px] font-bold">This Week</span>
        </div>
        <div className="text-headline-md font-headline-md text-on-surface">1,482 hrs</div>
        <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden mt-2">
          <div className="h-full bg-primary w-1/2"></div>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className="text-label-md font-label-md text-on-surface-variant">Avg. Conversion</span>
          <div className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-[10px] font-bold">-2.4%</div>
        </div>
        <div className="text-headline-md font-headline-md text-on-surface">4.82%</div>
        <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden mt-2">
          <div className="h-full bg-error w-1/4"></div>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <span className="text-label-md font-label-md text-on-surface-variant">Active Agents</span>
          <span className="text-secondary font-bold text-[10px]">85% Peak</span>
        </div>
        <div className="text-headline-md font-headline-md text-on-surface">42</div>
        <div className="w-full h-1 bg-surface-container rounded-full overflow-hidden mt-2">
          <div className="h-full bg-secondary w-5/6"></div>
        </div>
      </div>
    </div>
  );
}
