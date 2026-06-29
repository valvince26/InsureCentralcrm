"use client";

import React from "react";
import { useStillOSStats } from "@/hooks/useStillOS";

export default function ContactsMiniWidgets() {
  const { stats, loading } = useStillOSStats();

  const conversionRate = stats
    ? ((stats.expected_policies / Math.max(stats.contacts, 1)) * 100).toFixed(1) + '%'
    : '—';

  const widgets = [
    {
      title: "Outbound Sends",
      value: loading ? '…' : (stats?.outbound_sends ?? 0).toLocaleString(),
      icon: "call",
      iconBg: "bg-primary/10 text-primary",
      change: "dialer",
      changeColor: "text-on-surface-variant",
    },
    {
      title: "Hot Leads",
      value: loading ? '…' : (stats?.hot_leads ?? 0).toLocaleString(),
      icon: "how_to_reg",
      iconBg: "bg-secondary/10 text-secondary",
      change: `of ${loading ? '…' : (stats?.total_leads ?? 0).toLocaleString()}`,
      changeColor: "text-green-600",
    },
    {
      title: "Unread Threads",
      value: loading ? '…' : (stats?.unread_conversations ?? 0).toLocaleString(),
      icon: "pending_actions",
      iconBg: "bg-amber-100 text-amber-700",
      change: `of ${loading ? '…' : (stats?.conversations ?? 0).toLocaleString()}`,
      changeColor: "text-amber-600",
    },
    {
      title: "Conversion Rate",
      value: loading ? '…' : conversionRate,
      icon: "assignment_turned_in",
      iconBg: "bg-purple-100 text-purple-700",
      change: `${loading ? '…' : (stats?.expected_policies ?? 0).toLocaleString()} policies`,
      changeColor: "text-green-600",
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      {widgets.map((widget, idx) => (
        <div key={idx} className="bg-white p-5 rounded-xl border border-outline-variant table-shadow flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg ${widget.iconBg} flex items-center justify-center`}>
            <span className="material-symbols-outlined">{widget.icon}</span>
          </div>
          <div>
            <p className="text-on-surface-variant text-xs font-medium">{widget.title}</p>
            <h4 className="text-xl font-bold text-on-surface">
              {widget.value} <span className={`text-[10px] font-bold ml-1 ${widget.changeColor}`}>{widget.change}</span>
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}
