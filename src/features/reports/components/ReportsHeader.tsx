"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReportsHeader({ topAgents }: { topAgents?: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const range = searchParams.get("range") || "this_month";
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    if (!topAgents || topAgents.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = ["Agent Name", "Calls Made", "Talk Time", "Conversion Rate"];
    const rows = topAgents.map(a => [
      a.name, 
      a.callsMade, 
      a.talkTime, 
      a.conversionRate
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `agent_performance_${range}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  };

  const handleRangeChange = (newRange: string) => {
    setShowDropdown(false);
    if (newRange === "custom") {
      setShowCustomModal(true);
    } else {
      router.push(`?range=${newRange}`);
    }
  };

  const applyCustomRange = () => {
    if (!customStart || !customEnd) return;
    setShowCustomModal(false);
    router.push(`?range=custom&start=${customStart}&end=${customEnd}`);
  };

  const getRangeLabel = () => {
    if (range === "this_month") {
      const date = new Date();
      return `${date.toLocaleString('default', { month: 'short' })} 01 - ${date.toLocaleString('default', { month: 'short' })} ${new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()}, ${date.getFullYear()}`;
    }
    if (range === "last_month") return "Last Month";
    if (range === "this_year") return "This Year";
    if (range === "custom") {
      const start = searchParams.get("start");
      const end = searchParams.get("end");
      if (start && end) return `${start} to ${end}`;
      return "Custom Range";
    }
    return "All Time";
  };

  return (
    <div className="flex justify-between items-end mb-8 print:mb-0 relative">
      <div className="print:hidden">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Executive Performance Reports</h2>
        <p className="text-body-md text-on-surface-variant">Real-time agency analytics and performance orchestration.</p>
      </div>
      <div className="hidden print:block">
        <h2 className="font-display-md text-display-md text-on-surface mb-1">InsureCentral Performance Report</h2>
        <p className="text-body-md text-on-surface-variant">Generated: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="flex items-center gap-3 print:hidden">
        <div className="relative">
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center bg-surface-container-low border border-outline-variant rounded-lg px-3 py-2 gap-2 cursor-pointer hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span className="text-label-md">{getRangeLabel()}</span>
            <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
          </div>
          
          {showDropdown && (
            <div className="absolute top-full mt-1 right-0 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg overflow-hidden z-50">
              <div onClick={() => handleRangeChange("this_month")} className="px-4 py-3 hover:bg-surface-container-low cursor-pointer text-body-md">This Month</div>
              <div onClick={() => handleRangeChange("last_month")} className="px-4 py-3 hover:bg-surface-container-low cursor-pointer text-body-md">Last Month</div>
              <div onClick={() => handleRangeChange("this_year")} className="px-4 py-3 hover:bg-surface-container-low cursor-pointer text-body-md">This Year</div>
              <div onClick={() => handleRangeChange("all_time")} className="px-4 py-3 hover:bg-surface-container-low cursor-pointer text-body-md">All Time</div>
              <div onClick={() => handleRangeChange("custom")} className="px-4 py-3 hover:bg-surface-container-low cursor-pointer text-body-md border-t border-outline-variant/30 text-primary">Custom Range...</div>
            </div>
          )}

          {showCustomModal && (
            <div className="absolute top-full mt-1 right-0 w-72 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg p-4 z-50 flex flex-col gap-4">
              <div>
                <label className="text-label-sm font-bold text-on-surface-variant mb-1 block">Start Date</label>
                <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} className="w-full bg-surface-container border border-outline-variant rounded-md px-3 py-2 text-body-md" />
              </div>
              <div>
                <label className="text-label-sm font-bold text-on-surface-variant mb-1 block">End Date</label>
                <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} className="w-full bg-surface-container border border-outline-variant rounded-md px-3 py-2 text-body-md" />
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => setShowCustomModal(false)} className="px-3 py-1.5 rounded-md text-label-md hover:bg-surface-container transition-colors">Cancel</button>
                <button onClick={applyCustomRange} className="px-3 py-1.5 rounded-md text-label-md bg-primary text-on-primary hover:opacity-90 transition-opacity">Apply</button>
              </div>
            </div>
          )}
        </div>
        <button onClick={handleExportCSV} className="flex items-center gap-2 bg-surface-container-lowest border border-outline-variant px-4 py-2 rounded-lg text-label-md font-medium hover:bg-surface-container-high transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">download</span>
          Export CSV
        </button>
        <button onClick={handlePrint} className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg text-label-md font-medium shadow-sm hover:opacity-90 transition-all cursor-pointer">
          <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
          PDF Report
        </button>
      </div>
    </div>
  );
}
