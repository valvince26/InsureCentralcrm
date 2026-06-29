"use client";

import React from "react";

export default function ReportsKPIs({ kpis }: { kpis?: any }) {
  const kpiData = [
    {
      id: "total-calls",
      label: "Total Calls Made",
      value: kpis?.totalCalls?.toLocaleString() || "12,450",
      trend: "+15.2%",
      trendDirection: "up",
      icon: "call",
      color: "text-primary",
      bg: "bg-primary-container/30",
    },
    {
      id: "avg-duration",
      label: "Avg Call Duration",
      value: kpis?.avgDurationMins || "4m 12s",
      trend: "+0.5%",
      trendDirection: "up",
      icon: "timer",
      color: "text-[#00A6A6]",
      bg: "bg-[#00A6A6]/10",
    },
    {
      id: "conversion-rate",
      label: "Conversion Rate",
      value: kpis?.conversionRate || "8.4%",
      trend: "-1.2%",
      trendDirection: "down",
      icon: "trending_up",
      color: "text-secondary",
      bg: "bg-secondary-container/30",
    },
    {
      id: "active-leads",
      label: "Active Leads",
      value: kpis?.totalLeads?.toLocaleString() || "3,205",
      trend: "+24.8%",
      trendDirection: "up",
      icon: "group",
      color: "text-tertiary",
      bg: "bg-tertiary-container/30",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi) => (
        <div key={kpi.id} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group cursor-pointer">
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-surface-container-high to-transparent opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`w-12 h-12 rounded-xl ${kpi.bg} flex items-center justify-center`}>
              <span className={`material-symbols-outlined text-[24px] ${kpi.color}`}>
                {kpi.icon}
              </span>
            </div>
            
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-label-sm font-bold ${
              kpi.trendDirection === "up" 
                ? "text-[#00A6A6] bg-[#00A6A6]/10" 
                : "text-error bg-error-container/50"
            }`}>
              <span className="material-symbols-outlined text-[14px]">
                {kpi.trendDirection === "up" ? "trending_up" : "trending_down"}
              </span>
              {kpi.trend}
            </div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-display-sm font-display-sm text-on-surface mb-1">
              {kpi.value}
            </h3>
            <p className="text-body-md text-on-surface-variant">
              {kpi.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
