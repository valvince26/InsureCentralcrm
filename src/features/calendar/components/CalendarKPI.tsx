import React from "react";

export default function CalendarKPI() {
  return (
    <div className="bg-primary p-6 rounded-xl shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-2 -translate-y-2 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-[64px] text-white">bolt</span>
      </div>
      <h4 className="text-white/80 text-label-md font-bold uppercase tracking-widest mb-1">Weekly Target</h4>
      <p className="text-white font-headline-md text-headline-md mb-4">18 / 25 Calls</p>
      <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
        <div className="bg-secondary-container h-full w-[72%]"></div>
      </div>
    </div>
  );
}
