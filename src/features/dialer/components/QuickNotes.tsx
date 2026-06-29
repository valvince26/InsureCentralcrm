import React from "react";

export default function QuickNotes() {
  return (
    <div className="h-64 border-t border-outline-variant flex flex-col p-6 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
      <h3 className="font-title-md text-title-md mb-4 flex items-center justify-between">
        Quick Notes
        <span className="text-[10px] text-on-surface-variant font-mono uppercase">Auto-saving...</span>
      </h3>
      <textarea 
        className="flex-1 w-full p-4 bg-surface-container-low border border-outline-variant rounded-xl resize-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md" 
        placeholder="Add call notes here..."
      ></textarea>
    </div>
  );
}
