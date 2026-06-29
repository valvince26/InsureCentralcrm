import React from "react";

export default function ReportsFAB() {
  return (
    <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-50 group cursor-pointer">
      <span className="material-symbols-outlined text-[28px]">add</span>
      <div className="absolute right-16 bottom-0 bg-inverse-surface text-inverse-on-surface px-3 py-2 rounded-lg text-label-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        New Campaign
      </div>
    </button>
  );
}
