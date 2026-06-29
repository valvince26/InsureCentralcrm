"use client";

import React from "react";

export default function CampaignTable() {
  const campaigns = [
    {
      id: "1",
      name: "Q4 Life Insurance Bundle",
      lastUpdated: "Last updated 2h ago",
      status: "Active",
      statusBg: "bg-secondary-container text-on-secondary-container border-secondary/20",
      dotBg: "bg-secondary animate-pulse",
      leads: "4,520",
      duration: "124h 15m",
      conv: "5.2%",
      convTrend: "trending_up",
      convColor: "text-secondary",
      agents: 12,
      agentDot: "bg-secondary"
    },
    {
      id: "2",
      name: "Home Bundle Renewals - SE Region",
      lastUpdated: "Manual outreach sequence",
      status: "Paused",
      statusBg: "bg-surface-container-high text-on-surface-variant border-outline-variant",
      dotBg: "bg-outline",
      leads: "1,280",
      duration: "42h 08m",
      conv: "3.1%",
      convTrend: "trending_down",
      convColor: "text-error",
      agents: 0,
      agentColor: "text-on-surface-variant/40",
      agentDot: "bg-outline-variant"
    },
    {
      id: "3",
      name: "Auto Insurance Cold Lead Blitz",
      lastUpdated: "Triggered by web form fill",
      status: "Active",
      statusBg: "bg-secondary-container text-on-secondary-container border-secondary/20",
      dotBg: "bg-secondary animate-pulse",
      leads: "8,105",
      duration: "512h 45m",
      conv: "6.8%",
      convTrend: "trending_up",
      convColor: "text-secondary",
      agents: 24,
      agentDot: "bg-secondary"
    },
    {
      id: "4",
      name: "Medicare Advantage Open Enrollment",
      lastUpdated: "Legacy list reactivation",
      status: "Completed",
      statusBg: "bg-surface-container-high text-on-surface-variant border-outline-variant",
      dotBg: "bg-outline",
      leads: "2,440",
      duration: "18h 33m",
      conv: "1.2%",
      convTrend: "horizontal_rule",
      convColor: "text-on-surface-variant",
      agents: 0,
      agentColor: "text-on-surface-variant/40",
      agentDot: "bg-outline-variant"
    }
  ];

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/30">
        <div className="flex items-center gap-4">
          <h3 className="text-title-md font-title-md text-on-surface">Campaign Performance</h3>
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full border-2 border-surface bg-surface-variant"></div>
            <div className="w-7 h-7 rounded-full border-2 border-surface bg-primary-fixed"></div>
            <div className="w-7 h-7 rounded-full border-2 border-surface bg-secondary-fixed"></div>
          </div>
        </div>
        <button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors cursor-pointer">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-lowest border-b border-outline-variant">
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Campaign Name</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Leads</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Duration</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Conv. %</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Agents</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {campaigns.map((camp) => (
              <tr key={camp.id} className="campaign-row transition-colors group hover:bg-primary/5 cursor-pointer">
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className="text-body-md font-bold text-on-surface">{camp.name}</span>
                    <span className="text-label-md text-on-surface-variant">{camp.lastUpdated}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${camp.statusBg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${camp.dotBg}`}></span>
                    {camp.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-body-md font-medium">{camp.leads}</td>
                <td className="px-6 py-5 text-body-md font-mono text-on-surface-variant">{camp.duration}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <span className="text-body-md font-bold">{camp.conv}</span>
                    <span className={`${camp.convColor} material-symbols-outlined text-[16px]`}>{camp.convTrend}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className={`flex items-center gap-2 ${camp.agentColor || ''}`}>
                    <div className={`w-2 h-2 rounded-full ${camp.agentDot}`}></div>
                    <span className="text-body-md">{camp.agents}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-primary-fixed rounded-lg text-primary transition-colors cursor-pointer" title="Edit">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    {camp.status === "Paused" ? (
                      <button className="p-2 hover:bg-secondary-container rounded-lg text-secondary transition-colors cursor-pointer" title="Resume">
                        <span className="material-symbols-outlined">play_circle</span>
                      </button>
                    ) : (
                      <button className="p-2 hover:bg-error-container rounded-lg text-error transition-colors cursor-pointer" title="Pause">
                        <span className="material-symbols-outlined">pause_circle</span>
                      </button>
                    )}
                    <button className="p-2 hover:bg-surface-container-high rounded-lg text-on-surface-variant transition-colors cursor-pointer" title="View Analytics">
                      <span className="material-symbols-outlined">analytics</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-outline-variant flex items-center justify-between">
        <span className="text-label-md text-on-surface-variant">Showing 4 of 24 campaigns</span>
        <div className="flex gap-2">
          <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-high disabled:opacity-50 transition-colors cursor-pointer" disabled>
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors cursor-pointer">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
