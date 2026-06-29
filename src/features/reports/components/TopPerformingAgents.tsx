import React from "react";

export default function TopPerformingAgents() {
  const agents = [
    {
      initials: "ML",
      bg: "bg-primary-fixed-dim text-on-primary-fixed",
      name: "Marcus Lowery",
      role: "Lvl 4 Senior Agent",
      calls: "1,402",
      transfers: "241",
      revenue: "$142,500",
      growth: "+12.4%",
      growthColor: "text-[#006a6a] bg-secondary-container/20"
    },
    {
      initials: "AV",
      bg: "bg-secondary-fixed text-on-secondary-fixed",
      name: "Anita Vance",
      role: "Closing Specialist",
      calls: "1,288",
      transfers: "312",
      revenue: "$128,400",
      growth: "+8.2%",
      growthColor: "text-[#006a6a] bg-secondary-container/20"
    },
    {
      initials: "JH",
      bg: "bg-tertiary-fixed-dim text-on-tertiary-fixed",
      name: "James Holt",
      role: "New Business",
      calls: "1,105",
      transfers: "184",
      revenue: "$94,200",
      growth: "-2.4%",
      growthColor: "text-error bg-error-container/20"
    },
    {
      initials: "RK",
      bg: "bg-on-primary-fixed-variant text-primary-fixed",
      name: "Riley Kim",
      role: "Senior Broker",
      calls: "982",
      transfers: "152",
      revenue: "$82,150",
      growth: "+4.1%",
      growthColor: "text-[#006a6a] bg-secondary-container/20"
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:-translate-y-0.5 transition-transform lg:col-span-2 overflow-hidden flex flex-col">
      <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
        <h4 className="font-title-md text-title-md">Top Performing Agents</h4>
        <button className="text-on-surface-variant hover:text-primary cursor-pointer">
          <span className="material-symbols-outlined">filter_list</span>
        </button>
      </div>
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low">
            <tr>
              <th className="px-6 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Agent</th>
              <th className="px-6 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider text-right">Total Calls</th>
              <th className="px-6 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider text-right">Transfers</th>
              <th className="px-6 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider text-right">Revenue</th>
              <th className="px-6 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider text-center">Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {agents.map((agent, i) => (
              <tr key={i} className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${agent.bg} text-[10px] flex items-center justify-center font-bold`}>
                    {agent.initials}
                  </div>
                  <div>
                    <p className="text-body-md font-medium">{agent.name}</p>
                    <p className="text-[11px] text-on-surface-variant">{agent.role}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-body-md font-medium">{agent.calls}</td>
                <td className="px-6 py-4 text-right text-body-md">{agent.transfers}</td>
                <td className="px-6 py-4 text-right text-body-md font-bold">{agent.revenue}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`${agent.growthColor} px-2 py-0.5 rounded text-[11px]`}>{agent.growth}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
