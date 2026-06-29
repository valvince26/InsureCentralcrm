import React from "react";

export default function TeamPagination() {
  return (
    <div className="p-6 border-t border-outline-variant bg-surface flex items-center justify-between">
      <p className="text-body-md text-on-surface-variant">Showing 5 members</p>
      <div className="flex gap-2">
        <button className="px-4 py-2 border border-outline-variant rounded-lg text-body-md font-medium text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer">Previous</button>
        <button className="px-4 py-2 bg-primary text-white rounded-lg text-body-md font-medium hover:opacity-90 transition-all cursor-pointer">Next</button>
      </div>
    </div>
  );
}
