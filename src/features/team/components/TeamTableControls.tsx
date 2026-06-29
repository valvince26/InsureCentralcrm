import React from "react";

export default function TeamTableControls() {
  return (
    <div className="p-4 bg-surface-container-lowest flex items-center justify-between">
      <div className="relative w-80">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
        <input className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-lg focus:ring-1 focus:ring-primary text-body-md outline-none" placeholder="Quick find member..." type="text" />
      </div>
      <div className="flex items-center gap-4 text-label-md text-outline">
        <span>Showing 1-10 of 42 members</span>
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant disabled:opacity-50 cursor-pointer" disabled>
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
