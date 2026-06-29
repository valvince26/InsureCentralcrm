import React from "react";

export default function CampaignsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav className="flex items-center gap-2 text-label-md text-on-surface-variant mb-2">
          <span>Marketing</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-primary font-semibold">Campaign Management</span>
        </nav>
        <h2 className="text-headline-md font-headline-md text-on-surface">Outbound Campaigns</h2>
        <p className="text-body-md text-on-surface-variant mt-1">Manage and monitor your multi-channel insurance outreach performance.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-1 flex">
          <button className="px-4 py-1.5 text-label-md font-bold bg-primary text-on-primary rounded-md shadow-sm cursor-pointer">All</button>
          <button className="px-4 py-1.5 text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Active</button>
          <button className="px-4 py-1.5 text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Paused</button>
          <button className="px-4 py-1.5 text-label-md font-medium text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">Completed</button>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-label-md font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
          <span className="material-symbols-outlined">add</span>
          Add Campaign
        </button>
      </div>
    </div>
  );
}
