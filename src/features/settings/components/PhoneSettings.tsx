"use client";

import React, { useState, useEffect } from "react";
import { saveSettings, getSettings } from "../actions/settings.actions";

export default function PhoneSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    phoneProvider: "none",
    twilioSid: "",
    twilioToken: "",
    defaultCallerId: "",
    recordCalls: "false"
  });

  useEffect(() => {
    getSettings(["phoneProvider", "twilioSid", "twilioToken", "defaultCallerId", "recordCalls"]).then((data) => {
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
      setMessage("Phone settings saved successfully.");
    } catch (err) {
      setMessage("Failed to save phone settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-on-surface-variant">Loading settings...</div>;

  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden">
      <div className="p-6 border-b border-outline-variant/30">
        <h2 className="text-title-md font-bold text-on-surface">Phone Integration</h2>
        <p className="text-body-sm text-on-surface-variant mt-1">Configure your VOIP provider for the Power Dialer.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {message && (
          <div className={`p-4 rounded-lg text-label-md ${message.includes("success") ? "bg-primary-container text-on-primary-container" : "bg-error-container text-on-error-container"}`}>
            {message}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-label-md font-semibold text-on-surface">VOIP Provider</label>
          <select
            name="phoneProvider"
            value={form.phoneProvider}
            onChange={handleChange}
            className="w-full max-w-md bg-surface-container-highest border border-outline-variant/50 rounded-lg px-4 py-2.5 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          >
            <option value="none">None (Simulated Dialer Mode)</option>
            <option value="twilio">Twilio</option>
            <option value="leadconnector">LeadConnector (GHL)</option>
            <option value="ringcentral">RingCentral</option>
          </select>
        </div>

        {form.phoneProvider === "twilio" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-surface-container-highest/50 rounded-xl border border-outline-variant/30">
            <div className="space-y-2">
              <label className="text-label-md font-semibold text-on-surface">Account SID</label>
              <input type="text" name="twilioSid" value={form.twilioSid} onChange={handleChange} className="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2 text-on-surface outline-none focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-label-md font-semibold text-on-surface">Auth Token</label>
              <input type="password" name="twilioToken" value={form.twilioToken} onChange={handleChange} className="w-full bg-surface-container border border-outline-variant/50 rounded-lg px-4 py-2 text-on-surface outline-none focus:border-primary" />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-label-md font-semibold text-on-surface">Default Caller ID</label>
            <input type="text" name="defaultCallerId" value={form.defaultCallerId} onChange={handleChange} placeholder="+1 (555) 000-0000" className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-lg px-4 py-2 text-on-surface outline-none focus:border-primary" />
          </div>
          <div className="space-y-2">
            <label className="text-label-md font-semibold text-on-surface">Record All Calls</label>
            <select name="recordCalls" value={form.recordCalls} onChange={handleChange} className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-lg px-4 py-2 text-on-surface outline-none focus:border-primary">
              <option value="false">Disabled</option>
              <option value="true">Enabled (Compliance Required)</option>
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
