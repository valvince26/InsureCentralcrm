import React from "react";

export default function ContactsPagination() {
  return (
    <div className="p-4 bg-surface-container-low border-t border-outline-variant flex justify-between items-center">
      <div className="text-xs text-on-surface-variant font-medium">
        Showing <span className="text-on-surface font-bold">1-10</span> of <span className="text-on-surface font-bold">2,842</span> contacts
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 border border-outline-variant rounded-lg bg-white text-on-surface-variant hover:bg-surface-container-lowest disabled:opacity-30 cursor-not-allowed" disabled>
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-bold shadow-sm cursor-pointer">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-outline-variant text-on-surface-variant text-xs font-bold hover:bg-surface-container-lowest cursor-pointer">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-outline-variant text-on-surface-variant text-xs font-bold hover:bg-surface-container-lowest cursor-pointer">3</button>
          <span className="px-2 self-center text-on-surface-variant text-xs font-bold">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-outline-variant text-on-surface-variant text-xs font-bold hover:bg-surface-container-lowest cursor-pointer">285</button>
        </div>
        <button className="p-2 border border-outline-variant rounded-lg bg-white text-on-surface-variant hover:bg-surface-container-lowest cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-on-surface-variant">Rows per page:</span>
        <div className="relative">
          <select className="appearance-none bg-white border border-outline-variant px-3 py-1 pr-8 rounded-md text-xs font-bold focus:ring-0 cursor-pointer">
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
          <span className="material-symbols-outlined absolute right-1.5 top-1 text-[16px] pointer-events-none text-on-surface-variant">expand_more</span>
        </div>
      </div>
    </div>
  );
}
