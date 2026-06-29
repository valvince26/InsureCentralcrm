import React from "react";

export default function UpcomingAppointments() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-5 border-b border-outline-variant bg-surface-container-low/30">
        <h3 className="text-label-md font-bold text-on-surface uppercase tracking-wider">Upcoming Today</h3>
      </div>
      <div className="divide-y divide-outline-variant">
        <div className="p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <p className="text-label-md font-bold text-primary mb-1">10:30 AM</p>
          <p className="text-body-md font-bold mb-0.5">Lead Callback</p>
          <p className="text-label-md text-on-surface-variant">David Wilson • Life Policy</p>
        </div>
        <div className="p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <p className="text-label-md font-bold text-primary mb-1">1:00 PM</p>
          <p className="text-body-md font-bold mb-0.5">Renewal Meeting</p>
          <p className="text-label-md text-on-surface-variant">Sarah Jenkins • Auto/Home</p>
        </div>
        <div className="p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <p className="text-label-md font-bold text-primary mb-1">4:15 PM</p>
          <p className="text-body-md font-bold mb-0.5">Claims Strategy</p>
          <p className="text-label-md text-on-surface-variant">Internal Team Call</p>
        </div>
      </div>
      <button className="w-full py-3 text-label-md font-bold text-primary hover:bg-surface-container-high transition-colors cursor-pointer">
        View All Schedule
      </button>
    </div>
  );
}
