"use client";

import React, { useState, useEffect } from "react";
import { saveSettings, getSettings } from "../actions/settings.actions";

export default function GeneralSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    companyName: "",
    timezone: "UTC",
    currency: "USD",
    address: "",
  });

  useEffect(() => {
    getSettings(["companyName", "timezone", "currency", "address"]).then((data) => {
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
      setMessage("Settings saved successfully.");
    } catch (err) {
      setMessage("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-on-surface-variant">Loading settings...</div>;
  }

  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden">
      <div className="p-6 border-b border-outline-variant/30">
        <h2 className="text-title-md font-bold text-on-surface">General Settings</h2>
        <p className="text-body-sm text-on-surface-variant mt-1">Manage your basic organization configuration.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {message && (
          <div className={`p-4 rounded-lg text-label-md ${message.includes("success") ? "bg-primary-container text-on-primary-container" : "bg-error-container text-on-error-container"}`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-label-md font-semibold text-on-surface">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-lg px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              placeholder="e.g. Insure Central"
            />
          </div>

          <div className="space-y-2">
            <label className="text-label-md font-semibold text-on-surface">Timezone</label>
            <select
              name="timezone"
              value={form.timezone}
              onChange={handleChange}
              className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-lg px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="America/Denver">Mountain Time (MT)</option>
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-label-md font-semibold text-on-surface">Default Currency</label>
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-lg px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD ($)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-label-md font-semibold text-on-surface">Business Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-lg px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              placeholder="123 Main St, Suite 100"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-primary/90 text-on-primary font-label-lg px-6 py-2.5 rounded-full transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
