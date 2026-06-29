import React from "react";

export default function TopPerformingAgents({ agents }: { agents?: any[] }) {
  const tableData = agents?.length ? agents : [
    {
      id: "mock1",
      initials: "ML",
      bg: "bg-primary-fixed-dim text-on-primary-fixed",
      name: "Marcus Lowery (Mock)",
      callsMade: "1,402",
      conversionRate: "12.4%",
      talkTime: "142m",
      growth: "+12.4%",
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
              <th className="px-6 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider text-right">Talk Time</th>
              <th className="px-6 py-3 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider text-right">Conversion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {tableData.map((agent, i) => (
              <tr key={agent.id || i} className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${agent.bg || 'bg-primary-container text-on-primary-container'} text-[10px] flex items-center justify-center font-bold uppercase`}>
                    {agent.initials || agent.name.substring(0, 2)}
                  </div>
                  <div>
                    <p className="text-body-md font-medium">{agent.name}</p>
                    <p className="text-[11px] text-on-surface-variant">Agent</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-body-md font-medium">{agent.callsMade}</td>
                <td className="px-6 py-4 text-right text-body-md">{agent.talkTime}</td>
                <td className="px-6 py-4 text-right text-body-md font-bold text-secondary">{agent.conversionRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
