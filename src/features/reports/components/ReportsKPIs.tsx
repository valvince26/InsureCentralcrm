import React from "react";

export default function ReportsKPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* KPI 1 */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:-translate-y-0.5 transition-transform">
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-md text-on-surface-variant font-medium">Total Calls</span>
            <span className="p-2 bg-primary-fixed text-on-primary-fixed rounded-lg">
              <span className="material-symbols-outlined text-[20px]">call</span>
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md">12,482</h3>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="flex items-center text-[#006a6a] font-label-md bg-secondary-container/30 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> 14.2%
          </span>
          <span className="text-[11px] text-on-surface-variant">vs last month</span>
        </div>
      </div>

      {/* KPI 2 */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:-translate-y-0.5 transition-transform">
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-md text-on-surface-variant font-medium">Avg Talk Time</span>
            <span className="p-2 bg-secondary-fixed text-on-secondary-fixed rounded-lg">
              <span className="material-symbols-outlined text-[20px]">timer</span>
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md">04:32</h3>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="flex items-center text-error font-label-md bg-error-container/30 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">trending_down</span> 2.1%
          </span>
          <span className="text-[11px] text-on-surface-variant">vs last month</span>
        </div>
      </div>

      {/* KPI 3 */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:-translate-y-0.5 transition-transform">
        <div>
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-md text-on-surface-variant font-medium">Lead ROI</span>
            <span className="p-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md">324%</h3>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="flex items-center text-[#006a6a] font-label-md bg-secondary-container/30 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">trending_up</span> 8.5%
          </span>
          <span className="text-[11px] text-on-surface-variant">vs last month</span>
        </div>
      </div>

      {/* KPI 4 */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm hover:-translate-y-0.5 transition-transform overflow-hidden relative">
        <div className="z-10">
          <div className="flex justify-between items-start mb-4">
            <span className="text-label-md text-on-surface-variant font-medium">Agency Growth</span>
            <span className="p-2 bg-primary-container text-on-primary-container rounded-lg">
              <span className="material-symbols-outlined text-[20px]">auto_graph</span>
            </span>
          </div>
          <h3 className="font-headline-md text-headline-md">+18.4%</h3>
        </div>
        <div className="mt-4 flex items-center gap-2 z-10">
          <span className="flex items-center text-[#006a6a] font-label-md bg-secondary-container/30 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span> Stable
          </span>
          <span className="text-[11px] text-on-surface-variant">Target: 15%</span>
        </div>
        {/* Subtle background sparkline placeholder */}
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 bg-gradient-to-t from-primary to-transparent"></div>
      </div>
    </div>
  );
}
