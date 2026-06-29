import React from "react";

export default function TeamStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">groups</span>
        </div>
        <div>
          <p className="text-label-md text-outline font-medium">Total Members</p>
          <p className="text-headline-md text-on-surface">42</p>
        </div>
      </div>
      <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-accent-teal/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-[#00A6A6]">verified_user</span>
        </div>
        <div>
          <p className="text-label-md text-outline font-medium">Active Agents</p>
          <p className="text-headline-md text-on-surface">36</p>
        </div>
      </div>
      <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-secondary-fixed-dim/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-on-secondary-fixed-variant">workspace_premium</span>
        </div>
        <div>
          <p className="text-label-md text-outline font-medium">Team Leads</p>
          <p className="text-headline-md text-on-surface">8</p>
        </div>
      </div>
      <div className="bg-surface p-6 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-tertiary-fixed-dim/30 flex items-center justify-center">
          <span className="material-symbols-outlined text-tertiary">pending_actions</span>
        </div>
        <div>
          <p className="text-label-md text-outline font-medium">Pending Invites</p>
          <p className="text-headline-md text-on-surface">5</p>
        </div>
      </div>
    </div>
  );
}
