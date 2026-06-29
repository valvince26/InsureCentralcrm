"use client";

import React from "react";
import { useCrmStore } from "@/store/crmStore";

export default function KPIStats() {
  const contacts = useCrmStore((state) => state.contacts);
  
  const totalContacts = contacts.length;
  const newLeads = contacts.filter(c => c.status === "New Lead" || c.status === "Imported").length;

  const kpis = [
    { label: "Total Contacts", value: totalContacts.toString(), change: "+3", changeType: "positive", colorClass: "text-primary" },
    { label: "New Leads", value: newLeads.toString(), change: "+5%", changeType: "positive", colorClass: "text-primary" },
    { label: "Transfers", value: "48", change: "-2%", changeType: "negative", colorClass: "text-primary" },
    { label: "Conv. Rate", value: "5.8%", change: "+0.4", changeType: "positive", colorClass: "text-secondary" },
    { label: "Avg Talk", value: "4:12", change: "Stable", changeType: "neutral", colorClass: "text-primary" },
    { label: "Appointments", value: "24", change: "+8", changeType: "positive", colorClass: "text-primary" },
    { label: "Revenue", value: "$12.4k", change: "+18%", changeType: "positive", colorClass: "text-secondary" },
  ];

  const getChangeStyles = (type: string) => {
    switch(type) {
      case "positive": return "bg-secondary-container text-on-secondary-container";
      case "negative": return "bg-error-container text-on-error-container";
      case "neutral": return "bg-surface-container text-on-surface-variant";
      default: return "";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="bg-surface-container-lowest p-4 rounded-xl soft-shadow border border-outline-variant flex flex-col justify-between">
          <p className="font-label-md text-label-md text-on-surface-variant">{kpi.label}</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className={`font-headline-md text-headline-md ${kpi.colorClass}`}>{kpi.value}</h3>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${getChangeStyles(kpi.changeType)}`}>
              {kpi.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
