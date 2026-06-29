import React from "react";

export default function CallContextPanels() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white/60 p-6 rounded-xl border border-outline-variant">
        <h3 className="font-title-md text-title-md mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">history</span> Call History
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm p-2 border-b border-outline-variant/30">
            <span className="text-on-surface-variant">Last Call: Oct 14</span>
            <span className="font-medium text-error">No Answer</span>
          </div>
          <div className="flex justify-between items-center text-sm p-2 border-b border-outline-variant/30">
            <span className="text-on-surface-variant">Attempt #2: Oct 12</span>
            <span className="font-medium text-on-surface">Busy Tone</span>
          </div>
        </div>
      </div>
      <div className="bg-white/60 p-6 rounded-xl border border-outline-variant">
        <h3 className="font-title-md text-title-md mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">info</span> Policy Intent
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">
          Client expressed interest in Term Life bundling during previous web inquiry. High LTV potential.
          <span className="block mt-2 font-bold text-primary">Target: $500k Coverage</span>
        </p>
      </div>
    </div>
  );
}
