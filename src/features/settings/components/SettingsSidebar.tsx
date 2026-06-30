"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CATEGORIES = [
  {
    title: "Organization",
    tabs: [
      { id: "general", label: "General", icon: "tune" },
      { id: "branding", label: "Branding", icon: "palette" },
      { id: "business_hours", label: "Business Hours", icon: "schedule" },
      { id: "regional", label: "Regional Settings", icon: "public" },
      { id: "email", label: "Email Settings", icon: "mail" },
      { id: "notifications", label: "Notifications", icon: "notifications" },
    ]
  },
  {
    title: "Communications",
    tabs: [
      { id: "phone", label: "Phone Integration", icon: "settings_phone" },
      { id: "dispositions", label: "Disposition Rules", icon: "rule" },
      { id: "queue_rules", label: "Queue Rules", icon: "queue" },
      { id: "distribution", label: "Lead Distribution", icon: "hub" },
    ]
  },
  {
    title: "CRM",
    tabs: [
      { id: "pipelines", label: "Pipelines", icon: "account_tree" },
      { id: "tags", label: "Tags", icon: "sell" },
      { id: "custom_fields", label: "Custom Fields", icon: "format_list_bulleted" },
    ]
  },
  {
    title: "Users",
    tabs: [
      { id: "users", label: "Users & Roles", icon: "admin_panel_settings" },
      { id: "teams", label: "Teams", icon: "groups" },
      { id: "audit_logs", label: "Audit Logs", icon: "history" },
    ]
  },
  {
    title: "Developer",
    tabs: [
      { id: "api", label: "API & Webhooks", icon: "api" },
      { id: "system_health", label: "System Health", icon: "monitor_heart" },
    ]
  }
];

export default function SettingsSidebar() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "general";

  return (
    <nav className="w-64 flex flex-col shrink-0 custom-scrollbar overflow-y-auto" style={{ maxHeight: "calc(100vh - 120px)" }}>
      {CATEGORIES.map((category, idx) => (
        <div key={category.title} className={idx > 0 ? "mt-6" : ""}>
          <p className="px-4 text-[11px] font-bold text-outline-variant uppercase tracking-wider mb-2">
            {category.title}
          </p>
          <div className="flex flex-col gap-1">
            {category.tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/settings?tab=${tab.id}`}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-left group cursor-pointer ${
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
          </div>
        </div>
      ))}
    </nav>
  );
}
