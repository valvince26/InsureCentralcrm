import React from "react";

export default function ReportsHeader() {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Executive Performance Reports</h2>
        <p className="text-body-md text-on-surface-variant">Real-time agency analytics and performance orchestration.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 gap-2 cursor-pointer hover:bg-surface-container transition-colors">
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          <span className="text-label-md">Oct 01 - Oct 31, 2023</span>
          <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
        </div>
        <button className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-lg text-label-md font-medium hover:bg-surface-container-high transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export CSV
        </button>
        <button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-label-md font-medium shadow-sm hover:opacity-90 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
          PDF Report
        </button>
      </div>
    </div>
  );
}
