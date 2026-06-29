import React from "react";

export default function PipelinesHeader() {
  return (
    <section className="px-8 pt-8 pb-4 flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
      <div>
        <h2 className="text-headline-md font-headline-md text-primary mb-1">Sales Pipeline</h2>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-secondary rounded-full"></span>
          <p className="text-body-md text-on-surface-variant">Live view of 42 active lead opportunities</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-surface-container-low p-1 rounded-lg border border-outline-variant flex">
          <button className="px-4 py-1.5 text-label-md font-bold bg-white shadow-sm rounded-md text-primary transition-all cursor-pointer">My Deals</button>
          <button className="px-4 py-1.5 text-label-md text-on-surface-variant hover:text-on-surface transition-all cursor-pointer">Team Deals</button>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold shadow-md hover:bg-primary-container transition-all active:scale-95 cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span>Add Deal</span>
        </button>
      </div>
    </section>
  );
}
