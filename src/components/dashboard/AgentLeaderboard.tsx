import React from "react";

export default function AgentLeaderboard() {
  const agents = [
    { initials: "SC", name: "Sarah Chen", calls: 142, tf: 12, status: "ACTIVE", statusColor: "text-secondary", bgStatus: "bg-secondary", badgeBg: "bg-primary-fixed", badgeText: "text-on-primary-fixed" },
    { initials: "MB", name: "Marcus Bell", calls: 128, tf: 9, status: "ACTIVE", statusColor: "text-secondary", bgStatus: "bg-secondary", badgeBg: "bg-secondary-fixed", badgeText: "text-on-secondary-fixed" },
    { initials: "JT", name: "Jim Thorpe", calls: 115, tf: 15, status: "BREAK", statusColor: "text-on-surface-variant", bgStatus: "bg-outline", badgeBg: "bg-tertiary-fixed", badgeText: "text-on-tertiary-fixed" },
    { initials: "EL", name: "Elena Lopez", calls: 98, tf: 4, status: "ACTIVE", statusColor: "text-secondary", bgStatus: "bg-secondary", badgeBg: "bg-primary-fixed", badgeText: "text-on-primary-fixed" },
  ];

  return (
    <div className="bg-surface-container-lowest rounded-xl soft-shadow border border-outline-variant overflow-hidden flex flex-col">
      <div className="p-6 border-b border-outline-variant">
        <h2 className="font-title-lg text-title-lg text-on-surface">Agent Leaderboard</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Top performers today</p>
      </div>
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-6 py-3 font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider">Agent</th>
              <th className="px-4 py-3 font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider text-center">Calls</th>
              <th className="px-4 py-3 font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider text-center">Tf.</th>
              <th className="px-6 py-3 font-label-md text-[10px] text-on-surface-variant uppercase tracking-wider text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {agents.map((agent, idx) => (
              <tr key={idx} className="hover:bg-surface-container/50 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${agent.badgeBg} ${agent.badgeText} flex items-center justify-center font-bold text-[10px]`}>{agent.initials}</div>
                  <span className="text-body-md font-medium">{agent.name}</span>
                </td>
                <td className="px-4 py-4 text-center text-body-md font-semibold">{agent.calls}</td>
                <td className="px-4 py-4 text-center text-body-md">{agent.tf}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${agent.statusColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${agent.bgStatus}`}></span> {agent.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
