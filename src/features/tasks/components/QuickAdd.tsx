import React from "react";

export default function QuickAdd() {
  return (
    <div className="mb-6 bg-surface-container-lowest rounded-xl border border-outline-variant p-2 shadow-sm flex items-center">
      <span className="material-symbols-outlined text-outline mx-3">task</span>
      <input 
        className="flex-1 bg-transparent border-none text-body-md py-2 focus:ring-0 focus:outline-none placeholder:text-outline-variant" 
        placeholder="Quick add: Follow up with Julian Wallace tomorrow at 10am" 
        type="text"
      />
      <button className="bg-surface-container text-on-surface-variant px-3 py-1.5 rounded-lg text-label-md font-label-md mr-2 cursor-pointer">
        Set Due Date
      </button>
      <button className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-lg text-label-md font-bold cursor-pointer">
        Add
      </button>
    </div>
  );
}
