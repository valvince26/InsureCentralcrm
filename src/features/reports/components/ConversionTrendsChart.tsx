import React from "react";

export default function ConversionTrendsChart() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:-translate-y-0.5 transition-transform p-6 lg:col-span-2">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-title-md text-title-md">Daily Conversion Trends</h4>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <span className="text-label-md text-on-surface-variant">Current</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
            <span className="text-label-md text-on-surface-variant">Previous</span>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[300px] flex items-end justify-between px-2">
        {/* Faux Line Chart Visualization */}
        <svg className="w-full h-full" viewBox="0 0 800 200">
          <path d="M0,150 Q100,140 200,80 T400,100 T600,40 T800,60" fill="none" stroke="#00407e" strokeWidth="3"></path>
          <path d="M0,180 Q100,170 200,130 T400,150 T600,110 T800,140" fill="none" stroke="#c2c6d3" strokeDasharray="5,5" strokeWidth="2"></path>
          {/* Circles on nodes */}
          <circle cx="200" cy="80" fill="#00407e" r="4"></circle>
          <circle cx="400" cy="100" fill="#00407e" r="4"></circle>
          <circle cx="600" cy="40" fill="#00407e" r="4"></circle>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-on-surface-variant font-medium pt-2">
          <span>OCT 01</span><span>OCT 07</span><span>OCT 14</span><span>OCT 21</span><span>OCT 31</span>
        </div>
      </div>
    </div>
  );
}
