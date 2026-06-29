"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

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
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-surface-dim dark:bg-inverse-surface flex flex-col py-4 z-50 border-r border-outline-variant/30">
      <div className="px-6 mb-8">
        <h1 className="text-title-lg font-title-lg font-bold text-on-primary-fixed dark:text-primary-fixed-dim">InsureCentral</h1>
        <p className="text-label-md font-label-md text-on-surface-variant/70 uppercase tracking-wider mt-1">◆ Still OS™ Platform</p>
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

      <div className="mt-auto px-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold overflow-hidden shrink-0">
            {user?.user_metadata?.avatar_url ? (
              <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              user?.email?.charAt(0).toUpperCase() || "A"
            )}
          </div>
          <div className="overflow-hidden">
            <p className="text-label-md font-bold truncate">{user?.user_metadata?.full_name || "Agent"}</p>
            <p className="text-[10px] text-on-surface-variant truncate">{user?.email || "Loading..."}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-on-surface-variant hover:text-error transition-colors p-1" title="Sign Out">
          <span className="material-symbols-outlined text-[20px]">logout</span>
        </button>
      </div>
    </aside>
  );
}
