import React from "react";

export default function RecordingsHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
      <div>
        <h2 className="text-headline-md font-headline-md text-on-surface">Call Recordings</h2>
        <p className="text-body-md text-on-surface-variant">Review agent performance and customer sentiment analysis.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-container transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          High Value Calls
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-container transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">timer</span>
          Long Calls (&gt;5m)
        </button>
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg text-label-md font-label-md text-on-surface hover:bg-surface-container transition-all cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">person_search</span>
            Specific Agent
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
          </button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-label-md font-label-md hover:opacity-90 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">filter_list</span>
          All Filters
        </button>
      </div>
    </div>
  );
}
