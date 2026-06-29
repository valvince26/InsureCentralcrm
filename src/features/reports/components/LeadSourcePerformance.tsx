import React from "react";

export default function LeadSourcePerformance() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:-translate-y-0.5 transition-transform p-6 lg:col-span-1">
      <h4 className="font-title-md text-title-md mb-6">Lead Source Performance</h4>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-label-md">
            <span>Facebook Ads</span>
            <span className="font-bold">48%</span>
          </div>
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: "48%" }}></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-label-md">
            <span>Google Search</span>
            <span className="font-bold">32%</span>
          </div>
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-secondary-fixed-dim rounded-full" style={{ width: "32%" }}></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-label-md">
            <span>Referral Program</span>
            <span className="font-bold">12%</span>
          </div>
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-tertiary-fixed-dim rounded-full" style={{ width: "12%" }}></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-label-md">
            <span>Direct Mail</span>
            <span className="font-bold">8%</span>
          </div>
          <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
            <div className="h-full bg-outline-variant rounded-full" style={{ width: "8%" }}></div>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-outline-variant/30 text-center">
        <button className="text-primary font-label-md hover:underline cursor-pointer">View source detailed report</button>
      </div>
    </div>
  );
}
