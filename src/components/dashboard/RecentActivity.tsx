import React from "react";

export default function RecentActivity() {
  const activities = [
    {
      icon: "phone_callback",
      iconBg: "bg-secondary-container",
      iconColor: "text-on-secondary-container",
      title: "Sarah Chen connected with",
      highlight: "David Wilson",
      subtitle: "New Auto Policy Lead • 4m ago"
    },
    {
      icon: "event_available",
      iconBg: "bg-primary-container",
      iconColor: "text-on-primary-container",
      title: "Marcus Bell scheduled an appointment",
      highlight: "",
      subtitle: "Life Insurance Consultation • 12m ago"
    },
    {
      icon: "sync_alt",
      iconBg: "bg-tertiary-container",
      iconColor: "text-on-tertiary-container",
      title: "Lead Transfer: Home Bundle",
      highlight: "",
      subtitle: "Agent: Sarah Chen → Underwriting Dept • 28m ago"
    },
    {
      icon: "call_missed",
      iconBg: "bg-error-container",
      iconColor: "text-on-error-container",
      title: "Missed Call:",
      highlight: "Unknown Lead",
      subtitle: "Power Dialer Exception • 45m ago"
    }
  ];

  return (
    <div className="bg-surface-container-lowest rounded-xl soft-shadow border border-outline-variant p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-title-lg text-title-lg text-on-surface">Recent Activity</h2>
        <button className="text-primary font-label-md text-label-md hover:underline cursor-pointer">View Log</button>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex gap-4">
            <div className={`w-8 h-8 rounded-full ${activity.iconBg} flex items-center justify-center flex-shrink-0`}>
              <span className={`material-symbols-outlined text-[18px] ${activity.iconColor}`} data-icon={activity.icon}>{activity.icon}</span>
            </div>
            <div>
              <p className="text-body-md font-medium">
                {activity.title} {activity.highlight && <span className="text-primary font-semibold">{activity.highlight}</span>}
              </p>
              <p className="text-[12px] text-on-surface-variant">{activity.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
