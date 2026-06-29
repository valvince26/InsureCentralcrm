import React from "react";

export default function DispositionRulesTable() {
  const rules = [
    {
      dotColor: "bg-error",
      name: "No Answer",
      actionBadge: "bg-secondary-container text-on-secondary-container",
      actionLabel: "Requeue",
      actionDesc: "Move back to Active Queue",
      delay: "2 hours",
      statusColor: "bg-secondary",
      statusTextClass: "text-secondary",
      statusLabel: "Active"
    },
    {
      dotColor: "bg-secondary",
      name: "Interested",
      actionBadge: "bg-primary-container text-white",
      actionLabel: "Convert",
      actionDesc: "Create Opportunity & Task",
      delay: "Immediate",
      statusColor: "bg-secondary",
      statusTextClass: "text-secondary",
      statusLabel: "Active"
    },
    {
      dotColor: "bg-tertiary",
      name: "Busy Tone",
      actionBadge: "bg-surface-container-highest text-on-surface-variant",
      actionLabel: "Retry",
      actionDesc: "Increment dial attempts",
      delay: "15 mins",
      statusColor: "bg-outline",
      statusTextClass: "text-on-surface-variant",
      statusLabel: "Disabled"
    },
    {
      dotColor: "bg-outline",
      name: "Wrong Number",
      actionBadge: "bg-error-container text-on-error-container",
      actionLabel: "Disqualify",
      actionDesc: 'Mark as "Dead Lead"',
      delay: "Immediate",
      statusColor: "bg-secondary",
      statusTextClass: "text-secondary",
      statusLabel: "Active"
    }
  ];

  return (
    <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
        <div>
          <h3 className="text-title-md font-title-md text-on-surface">Disposition Rules</h3>
          <p className="text-label-md text-on-surface-variant">Automate lead status changes and re-queuing based on call outcomes.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-label-md font-medium rounded-lg hover:bg-primary-container transition-colors shadow-sm cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Outcome
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low/50">
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Outcome Name</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Automated Action</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Trigger Delay</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {rules.map((rule, i) => (
              <tr key={i} className="hover:bg-surface-container-low transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${rule.dotColor}`}></span>
                    <span className="text-body-md font-medium text-on-surface">{rule.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 ${rule.actionBadge} text-[11px] font-bold rounded uppercase`}>{rule.actionLabel}</span>
                    <span className="text-body-md text-on-surface-variant">{rule.actionDesc}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <code className="text-code-md bg-surface-container-high px-2 py-0.5 rounded">{rule.delay}</code>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 ${rule.statusTextClass} text-label-md font-medium`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${rule.statusColor}`}></span>
                    {rule.statusLabel}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 hover:bg-surface-container-high rounded text-on-surface-variant cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Footer Controls */}
      <div className="p-6 bg-surface-container-low/30 border-t border-outline-variant flex justify-between items-center">
        <div className="flex items-center gap-2 text-label-md text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px]">info</span>
          Changes to rules apply instantly to all active campaigns.
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2 text-on-surface-variant font-medium hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer">
            Cancel Changes
          </button>
          <button className="px-8 py-2 bg-primary text-white font-semibold rounded-lg hover:shadow-lg hover:bg-primary-container transition-all active:scale-95 cursor-pointer">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
