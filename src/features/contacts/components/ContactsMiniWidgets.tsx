import React from "react";

export default function ContactsMiniWidgets() {
  const widgets = [
    {
      title: "Today's Calls",
      value: "42",
      icon: "call",
      iconBg: "bg-primary/10 text-primary",
      change: "+12%",
      changeColor: "text-green-600",
    },
    {
      title: "New Leads",
      value: "156",
      icon: "how_to_reg",
      iconBg: "bg-secondary/10 text-secondary",
      change: "+24%",
      changeColor: "text-green-600",
    },
    {
      title: "Follow Ups",
      value: "18",
      icon: "pending_actions",
      iconBg: "bg-amber-100 text-amber-700",
      change: "-4%",
      changeColor: "text-error",
    },
    {
      title: "Conversions",
      value: "3.8%",
      icon: "assignment_turned_in",
      iconBg: "bg-purple-100 text-purple-700",
      change: "+0.5%",
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
