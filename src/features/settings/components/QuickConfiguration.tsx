import React from "react";

export default function QuickConfiguration() {
  return (
    <div className="bg-surface-container border border-outline-variant p-6 rounded-xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-secondary-container/20 flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined">integration_instructions</span>
        </div>
        <h4 className="text-title-md font-title-md">Quick Configuration</h4>
      </div>
      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <div className="mt-1 p-1 bg-surface-container-highest rounded">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
          </div>
          <div>
            <p className="text-body-md font-medium">Auto-Sync with Twilio</p>
            <p className="text-label-md text-on-surface-variant">Disposition results are pushed back to your telephony provider logs.</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1 p-1 bg-surface-container-highest rounded">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
          </div>
          <div>
            <p className="text-body-md font-medium">Global Scope</p>
            <p className="text-label-md text-on-surface-variant">These rules apply to all 12 active campaigns unless overridden locally.</p>
          </div>
        </li>
      </ul>
      <button className="mt-6 w-full py-2 border border-outline-variant text-on-surface-variant rounded-lg hover:bg-surface-container-highest transition-colors font-medium cursor-pointer">
        Documentation &amp; Best Practices
      </button>
    </div>
  );
}
