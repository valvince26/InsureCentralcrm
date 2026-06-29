import React from "react";

export default function CampaignInsights() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Analytics Chart Placeholder */}
      <div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm relative overflow-hidden h-[300px]">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h4 className="text-title-md font-title-md">Lead Source Distribution</h4>
          <button className="text-primary text-label-md font-bold hover:underline cursor-pointer">Download Report</button>
        </div>
        
        {/* Abstract Background Graphic for Chart */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
            <path className="text-primary" d="M0 150 C 100 100, 200 180, 300 120 S 500 50, 600 100 S 700 30, 800 80 V 200 H 0 Z" fill="currentColor"></path>
          </svg>
        </div>
        
        <div className="grid grid-cols-4 items-end gap-8 h-40 mt-12 relative z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-full bg-primary/20 rounded-t-lg relative" style={{ height: "85%" }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-label-md font-bold">42%</div>
            </div>
            <span className="text-label-md text-on-surface-variant">Social</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-full bg-secondary rounded-t-lg relative" style={{ height: "60%" }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-label-md font-bold">28%</div>
            </div>
            <span className="text-label-md text-on-surface-variant">Web Form</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-full bg-primary rounded-t-lg relative" style={{ height: "45%" }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-label-md font-bold">18%</div>
            </div>
            <span className="text-label-md text-on-surface-variant">Referral</span>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <div className="w-full bg-outline-variant rounded-t-lg relative" style={{ height: "30%" }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-label-md font-bold">12%</div>
            </div>
            <span className="text-label-md text-on-surface-variant">Direct</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm h-[300px] flex flex-col">
        <h4 className="text-title-md font-title-md mb-4">Recent System Logs</h4>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 sidebar-scroll">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px] text-on-secondary-container">play_arrow</span>
            </div>
            <div>
              <p className="text-body-md font-medium leading-tight">"Q4 Life Insurance" resumed by Alex S.</p>
              <p className="text-label-md text-on-surface-variant">12 minutes ago</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-error-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px] text-on-error-container">priority_high</span>
            </div>
            <div>
              <p className="text-body-md font-medium leading-tight">Lead threshold alert: "Auto Cold Blitz"</p>
              <p className="text-label-md text-on-surface-variant">45 minutes ago</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px] text-primary">person_add</span>
            </div>
            <div>
              <p className="text-body-md font-medium leading-tight">5 new agents assigned to Medicare</p>
              <p className="text-label-md text-on-surface-variant">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">check_circle</span>
            </div>
            <div>
              <p className="text-body-md font-medium leading-tight">Campaign export completed</p>
              <p className="text-label-md text-on-surface-variant">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
