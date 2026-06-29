import React from "react";

export default function FollowUps() {
  const followUps = [
    { name: "Robert Garcia", detail: "Renewal follow-up • 2:00 PM" },
    { name: "Linda Sterling", detail: "Unquote commercial • 3:30 PM" },
    { name: "Thomas Muller", detail: "Binder delivery • 4:15 PM" },
    { name: "Sarah Jenkins", detail: "Claims update • 5:00 PM" },
  ];

  return (
    <div className="bg-surface-container-lowest rounded-xl soft-shadow border border-outline-variant p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-title-lg text-title-lg text-on-surface">Today's Follow-ups</h2>
        <span className="bg-primary-container text-on-primary-container text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">12 Due</span>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="space-y-4">
          {followUps.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-outline-variant rounded-lg hover:bg-surface-bright transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" data-icon="person">person</span>
                </div>
                <div>
                  <p className="text-body-md font-semibold">{item.name}</p>
                  <p className="text-[12px] text-on-surface-variant">{item.detail}</p>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-2 text-primary hover:bg-primary-container/10 rounded transition-all cursor-pointer">
                <span className="material-symbols-outlined" data-icon="call">call</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
