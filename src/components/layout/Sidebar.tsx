"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "dashboard", label: "Dashboard" },
  { href: "/contacts", icon: "contacts", label: "Contacts" },
  { href: "/auto-queue", icon: "queue_play_next", label: "Auto Queue" },
  { href: "/power-dialer", icon: "call", label: "Power Dialer" },
  { href: "/campaigns", icon: "campaign", label: "Campaigns" },
  { href: "/pipelines", icon: "account_tree", label: "Pipelines" },
  { href: "/tasks", icon: "task_alt", label: "Tasks" },
  { href: "/calendar", icon: "calendar_today", label: "Calendar" },
  { href: "/reports", icon: "assessment", label: "Reports" },
  { href: "/recordings", icon: "settings_voice", label: "Call Recordings" },
];

const bottomNavItems = [
  { href: "/team", icon: "group", label: "Team" },
  { href: "/settings", icon: "settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-surface-dim dark:bg-inverse-surface flex flex-col py-4 z-50 border-r border-outline-variant/30">
      <div className="px-6 mb-8">
        <h1 className="text-title-lg font-title-lg font-bold text-on-primary-fixed dark:text-primary-fixed-dim">InsureFlow CRM</h1>
        <p className="text-label-md font-label-md text-on-surface-variant/70 uppercase tracking-wider mt-1">Enterprise Edition</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 ease-in-out ${
                isActive
                  ? "text-primary dark:text-primary-fixed-dim bg-secondary-container dark:bg-on-secondary-fixed-variant border-l-4 border-primary dark:border-primary-fixed-dim"
                  : "text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>{item.icon}</span>
              <span className={`text-label-md font-label-md ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-outline-variant/20">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 ease-in-out ${
                  isActive
                    ? "text-primary dark:text-primary-fixed-dim bg-secondary-container dark:bg-on-secondary-fixed-variant border-l-4 border-primary dark:border-primary-fixed-dim"
                    : "text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>{item.icon}</span>
                <span className={`text-label-md font-label-md ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="mt-auto px-6 pt-4 border-t border-outline-variant/20 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden">
          <img className="w-full h-full object-cover" alt="Alex Sterling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIeSMrwTec5w5McyK8q3J7dVthdWttRShKPkemsUgg7KecorVQemKFtB0-2UnJMa7bFR97YJrQtuSm2U5XsoarellDTkw1F3yvsqlkZobxFlqlLnggWUfxwKa29xYl4UUfuA-H8bxtUkBjoSdTi53P-WXdYqstwdUfroVcs-FX-bF1CRmcZXk6mvPxlPxP0rLg2-5YhRdcoYg8qZ4LKUzwpSwWOkXK7pHiWBPIfOHuBoKKi8yd-Qp8C7yD9ga_CpSynzdzn4mHgs6l" />
        </div>
        <div className="overflow-hidden">
          <p className="text-label-md font-bold truncate">Alex Sterling</p>
          <p className="text-[10px] text-on-surface-variant truncate">Premium Account Mgr</p>
        </div>
      </div>
    </aside>
  );
}
