import React from "react";

export default function TasksHeader() {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-headline-md text-headline-md text-on-surface">Task Management</h2>
        <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md flex items-center shadow-sm hover:brightness-110 transition-all cursor-pointer">
          <span className="material-symbols-outlined mr-2">add</span>
          New Task
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-outline-variant">
        <button className="px-6 py-3 border-b-2 border-primary text-primary font-title-md text-title-md transition-all cursor-pointer">Today</button>
        <button className="px-6 py-3 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-title-md text-title-md transition-all cursor-pointer">Upcoming</button>
        <button className="px-6 py-3 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-title-md text-title-md transition-all cursor-pointer">Completed</button>
        <button className="px-6 py-3 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-title-md text-title-md transition-all cursor-pointer">
          Overdue <span className="ml-1 px-1.5 py-0.5 bg-error text-on-error text-[10px] rounded-full">3</span>
        </button>
      </div>
    </div>
  );
}
