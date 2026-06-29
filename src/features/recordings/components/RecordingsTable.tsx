"use client";

import React, { useState, useEffect } from "react";

export default function RecordingsTable() {
  const [waveformHeights, setWaveformHeights] = useState<number[]>(Array(8).fill(4));

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveformHeights(Array.from({ length: 8 }, () => Math.floor(Math.random() * 20) + 4));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const recordings = [
    {
      agentName: "Sarah Johnson",
      tag: "New Policy",
      tagColor: "bg-secondary-container text-on-secondary-container",
      contactInfo: "+1 (555) 012-3456",
      dateTime: "Oct 24, 2:15 PM",
      duration: "12m 45s",
      dispositionColor: "bg-secondary",
      disposition: "Converted",
      isActive: true
    },
    {
      agentName: "David Chen",
      tag: "Renewal",
      tagColor: "bg-surface-variant text-on-surface-variant",
      contactInfo: "+1 (555) 987-6543",
      dateTime: "Oct 24, 11:30 AM",
      duration: "04m 12s",
      dispositionColor: "bg-error",
      disposition: "Rejected",
      isActive: false
    },
    {
      agentName: "Marcus Thorne",
      tag: "New Policy",
      tagColor: "bg-secondary-container text-on-secondary-container",
      contactInfo: "+1 (555) 234-5678",
      dateTime: "Oct 23, 4:50 PM",
      duration: "08m 22s",
      dispositionColor: "bg-tertiary",
      disposition: "Callback",
      isActive: false
    },
    {
      agentName: "Sarah Johnson",
      tag: "Claim Support",
      tagColor: "bg-surface-variant text-on-surface-variant",
      contactInfo: "+1 (555) 012-3456",
      dateTime: "Oct 23, 10:10 AM",
      duration: "15m 30s",
      dispositionColor: "bg-secondary",
      disposition: "Resolved",
      isActive: false
    }
  ];

  return (
    <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="px-4 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Playback</th>
              <th className="px-4 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Details</th>
              <th className="px-4 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Duration</th>
              <th className="px-4 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Disposition</th>
              <th className="px-4 py-4 text-label-md font-label-md text-on-surface-variant uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {recordings.map((recording, i) => (
              <tr key={i} className={`group hover:bg-surface-container-low transition-colors cursor-pointer ${recording.isActive ? "bg-secondary-container/10" : ""}`}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <button className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm cursor-pointer ${recording.isActive ? "bg-primary text-on-primary" : "bg-surface-container-high text-on-surface-variant"}`}>
                      <span className="material-symbols-outlined">play_arrow</span>
                    </button>
                    <div className="flex items-end gap-0.5 h-6 w-24">
                      {waveformHeights.map((h, idx) => (
                        <div 
                          key={idx} 
                          className={`w-1 rounded-t-sm transition-all duration-200 ease-in-out ${recording.isActive ? (idx === 3 ? "bg-primary" : "bg-primary/40") : "bg-outline-variant"}`} 
                          style={{ height: `${recording.isActive ? h : [3,5,2,4,6,3,2,4][idx]}px` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-body-md font-bold text-on-surface">{recording.agentName}</span>
                      <span className={`text-[10px] ${recording.tagColor} px-1.5 py-0.5 rounded uppercase font-bold`}>{recording.tag}</span>
                    </div>
                    <div className="text-label-md text-on-surface-variant flex items-center gap-2">
                      <span>Contact: {recording.contactInfo}</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span>{recording.dateTime}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-body-md text-on-surface">{recording.duration}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${recording.dispositionColor}`}></span>
                    <span className="text-body-md text-on-surface">{recording.disposition}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="text-on-surface-variant hover:text-primary cursor-pointer">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
        <span className="text-label-md text-on-surface-variant">Showing 1-10 of 2,482 recordings</span>
        <div className="flex gap-2">
          <button className="p-1.5 rounded-md hover:bg-surface-container-high transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button className="p-1.5 rounded-md hover:bg-surface-container-high transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
