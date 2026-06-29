"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const TABS = [
  { id: "general", label: "General", icon: "tune" },
  { id: "phone", label: "Phone Integration", icon: "settings_phone" },
  { id: "dispositions", label: "Disposition Rules", icon: "rule" },
  { id: "distribution", label: "Lead Distribution", icon: "hub" },
  { id: "users", label: "Users & Permissions", icon: "admin_panel_settings" },
  { id: "api", label: "API & Webhooks", icon: "api" },
];

export default function SettingsSidebar() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dispositions";

  return (
    <nav className="w-64 flex flex-col gap-1 shrink-0">
      {TABS.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <Link
            key={tab.id}
            href={`/settings?tab=${tab.id}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left group cursor-pointer ${
              isActive
                ? "text-primary bg-surface-container-lowest shadow-sm ring-1 ring-outline-variant/30 text-label-md font-semibold"
                : "text-label-md font-label-md text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}
            >
              {tab.icon}
            </span>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
