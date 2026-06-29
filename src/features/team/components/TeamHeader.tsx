import React from "react";

export default function TeamHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-headline-lg text-on-surface">Team Management</h1>
        <p className="text-on-surface-variant">Manage your agency members, track performance, and assign roles.</p>
      </div>
      <button className="bg-primary-container text-on-primary px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium hover:opacity-90 transition-all shadow-md cursor-pointer">
        <span className="material-symbols-outlined">person_add</span>
        Add Team Member
      </button>
    </div>
  );
}
