"use client";

import React, { useState, useEffect } from "react";

export default function TeamsSettings() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="material-symbols-outlined animate-spin text-[32px] text-primary">progress_activity</span></div>;
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-title-lg font-bold text-on-surface">Teams Management</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Organize your users into groups for lead distribution and campaign access.</p>
        </div>
        <button className="px-6 py-2.5 bg-primary text-on-primary font-bold text-label-md rounded-lg hover:bg-primary-container disabled:opacity-50 transition-colors">
          Create Team
        </button>
      </div>

      <div className="border border-outline-variant rounded-xl overflow-hidden text-center p-12 text-on-surface-variant bg-surface-container-low">
        <span className="material-symbols-outlined text-[48px] opacity-20 mb-4">groups</span>
        <h3 className="text-title-md font-bold text-on-surface mb-2">No Teams Created</h3>
        <p className="text-body-md max-w-md mx-auto">Create teams to logically group your agents and assign campaigns to entire departments at once.</p>
      </div>
    </div>
  );
}
