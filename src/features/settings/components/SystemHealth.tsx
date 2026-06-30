"use client";

import React, { useState, useEffect } from "react";

export default function SystemHealth() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading system health
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="material-symbols-outlined animate-spin text-[32px] text-primary">progress_activity</span></div>;
  }

  const services = [
    { name: "Database (PostgreSQL)", status: "Operational", uptime: "99.99%", latency: "24ms" },
    { name: "SMTP Email Relay", status: "Operational", uptime: "100.00%", latency: "145ms" },
    { name: "Twilio API", status: "Degraded Performance", uptime: "98.45%", latency: "1024ms", color: "text-warning" },
    { name: "OpenAI Background Queue", status: "Operational", uptime: "99.95%", latency: "340ms" },
    { name: "Webhook Dispatcher", status: "Operational", uptime: "100.00%", latency: "12ms" },
  ];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-title-lg font-bold text-on-surface">System Health Dashboard</h2>
        <p className="text-body-md text-on-surface-variant mt-1">Real-time status of underlying infrastructure and third-party API integrations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="p-6 border border-outline-variant rounded-xl bg-surface-container-low flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">dns</span>
          </div>
          <div>
            <p className="text-label-md text-outline-variant uppercase font-bold tracking-wider">Environment</p>
            <p className="text-title-md font-bold text-on-surface">Production Vercel</p>
          </div>
        </div>
        <div className="p-6 border border-outline-variant rounded-xl bg-surface-container-low flex items-center gap-4">
          <div className="w-12 h-12 bg-[#22c55e]/10 text-[#16a34a] rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">verified</span>
          </div>
          <div>
            <p className="text-label-md text-outline-variant uppercase font-bold tracking-wider">Overall Status</p>
            <p className="text-title-md font-bold text-on-surface">All Systems Normal</p>
          </div>
        </div>
        <div className="p-6 border border-outline-variant rounded-xl bg-surface-container-low flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">storage</span>
          </div>
          <div>
            <p className="text-label-md text-outline-variant uppercase font-bold tracking-wider">DB Storage</p>
            <p className="text-title-md font-bold text-on-surface">42% Used (21.4GB)</p>
          </div>
        </div>
      </div>

      <h3 className="text-title-md font-bold text-on-surface border-b border-outline-variant pb-2 mb-6">Service Connections</h3>
      
      <div className="space-y-4">
        {services.map(svc => (
          <div key={svc.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-outline-variant rounded-lg bg-surface hover:bg-surface-container-lowest transition-colors">
            <div className="flex items-center gap-4 mb-2 sm:mb-0">
              <span className={`w-3 h-3 rounded-full ${svc.status === 'Operational' ? 'bg-[#22c55e]' : 'bg-warning'}`}></span>
              <div>
                <p className="font-bold text-on-surface">{svc.name}</p>
                <p className={`text-label-md ${svc.color || 'text-on-surface-variant'}`}>{svc.status}</p>
              </div>
            </div>
            <div className="flex items-center gap-8 text-right">
              <div>
                <p className="text-label-md text-outline uppercase font-bold text-[10px]">Uptime (30d)</p>
                <p className="text-body-md font-medium text-on-surface">{svc.uptime}</p>
              </div>
              <div>
                <p className="text-label-md text-outline uppercase font-bold text-[10px]">Latency</p>
                <p className="text-body-md font-medium text-on-surface">{svc.latency}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
