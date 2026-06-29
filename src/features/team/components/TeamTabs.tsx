import React from "react";

export default function TeamTabs() {
  return (
    <div className="border-b border-outline-variant">
      <div className="flex items-center justify-between px-6 pt-4">
        <div className="flex gap-8">
          <button className="pb-4 px-1 text-primary border-b-2 border-primary font-medium text-body-md cursor-pointer">All Members</button>
          <button className="pb-4 px-1 text-outline hover:text-on-surface transition-colors font-medium text-body-md cursor-pointer">Agents</button>
          <button className="pb-4 px-1 text-outline hover:text-on-surface transition-colors font-medium text-body-md cursor-pointer">Managers</button>
          <button className="pb-4 px-1 text-outline hover:text-on-surface transition-colors font-medium text-body-md cursor-pointer">Admins</button>
        </div>
        <div className="pb-4 flex gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-lg text-body-md font-medium text-on-surface-variant hover:bg-surface-container-low cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-lg text-body-md font-medium text-on-surface-variant hover:bg-surface-container-low cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
