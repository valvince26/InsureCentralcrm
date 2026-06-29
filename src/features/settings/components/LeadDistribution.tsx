"use client";

import React, { useState, useEffect } from "react";
import { saveSettings, getSettings } from "../actions/settings.actions";

export default function LeadDistribution() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    distributionMode: "round_robin",
    dailyLeadCap: "50",
    allowRedistribution: "true",
  });

  useEffect(() => {
    getSettings(["distributionMode", "dailyLeadCap", "allowRedistribution"]).then((data) => {
      setForm((prev) => ({ ...prev, ...data }));
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await saveSettings(form);
      setMessage("Distribution settings saved.");
    } catch (err) {
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-on-surface-variant">Loading settings...</div>;

  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden">
      <div className="p-6 border-b border-outline-variant/30">
        <h2 className="text-title-md font-bold text-on-surface">Lead Distribution</h2>
        <p className="text-body-sm text-on-surface-variant mt-1">Configure how incoming and imported leads are assigned to agents.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {message && (
          <div className={`p-4 rounded-lg text-label-md ${message.includes("success") ? "bg-primary-container text-on-primary-container" : "bg-error-container text-on-error-container"}`}>
            {message}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-label-md font-semibold text-on-surface">Default Distribution Strategy</label>
          <select name="distributionMode" value={form.distributionMode} onChange={handleChange} className="w-full max-w-md bg-surface-container-highest border border-outline-variant/50 rounded-lg px-4 py-2.5 text-on-surface outline-none focus:border-primary">
            <option value="round_robin">Round Robin (Sequential)</option>
            <option value="equal">Equal Distribution</option>
            <option value="manual">Manual Assignment Only</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-label-md font-semibold text-on-surface">Global Daily Lead Cap (Per Agent)</label>
            <input type="number" name="dailyLeadCap" value={form.dailyLeadCap} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-lg px-4 py-2 text-on-surface outline-none focus:border-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-label-md font-semibold text-on-surface">Allow Manager Redistribution</label>
            <select name="allowRedistribution" value={form.allowRedistribution} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-lg px-4 py-2 text-on-surface outline-none focus:border-primary">
              <option value="true">Yes</option>
              <option value="false">No (Super Admin Only)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" disabled={saving} className="bg-primary hover:bg-primary/90 text-on-primary font-label-lg px-6 py-2.5 rounded-full transition-colors">
            {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </form>
    </div>
  );
}
