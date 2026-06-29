import React from "react";

export default function SettingsSidebar() {
  return (
    <nav className="w-64 flex flex-col gap-1 shrink-0">
      <button className="flex items-center gap-3 px-4 py-3 text-label-md font-label-md text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors text-left group cursor-pointer">
        <span className="material-symbols-outlined text-[20px]">tune</span>
        General
      </button>
      <button className="flex items-center gap-3 px-4 py-3 text-label-md font-label-md text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors text-left group cursor-pointer">
        <span className="material-symbols-outlined text-[20px]">settings_phone</span>
        Phone Integration
      </button>
      <button className="flex items-center gap-3 px-4 py-3 text-primary bg-surface-container-lowest shadow-sm ring-1 ring-outline-variant/30 text-label-md font-semibold rounded-lg transition-all text-left group cursor-pointer">
        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>rule</span>
        Disposition Rules
      </button>
      <button className="flex items-center gap-3 px-4 py-3 text-label-md font-label-md text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors text-left group cursor-pointer">
        <span className="material-symbols-outlined text-[20px]">hub</span>
        Lead Distribution
      </button>
      <button className="flex items-center gap-3 px-4 py-3 text-label-md font-label-md text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors text-left group cursor-pointer">
        <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
        Users &amp; Permissions
      </button>
      <button className="flex items-center gap-3 px-4 py-3 text-label-md font-label-md text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors text-left group cursor-pointer">
        <span className="material-symbols-outlined text-[20px]">api</span>
        API &amp; Webhooks
      </button>
    </nav>
  );
}
