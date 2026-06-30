"use client";

import React, { useState, useEffect } from "react";
import { getGeneralSettings, saveGeneralSettings } from "@/features/settings/actions/settings.actions";

export default function GeneralSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{msg: string, type: "success" | "error"} | null>(null);
  
  const [form, setForm] = useState({
    companyName: "",
    website: "",
    supportEmail: "",
    supportPhone: "",
    businessAddress: "",
    timezone: "America/New_York",
    country: "US",
    language: "en-US",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h"
  });

  useEffect(() => {
    getGeneralSettings().then(data => {
      if (data) setForm(data as any);
      setLoading(false);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveGeneralSettings(form);
      setToast({ msg: "Settings saved successfully", type: "success" });
    } catch (e) {
      setToast({ msg: "Failed to save settings", type: "error" });
    }
    setSaving(false);
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="material-symbols-outlined animate-spin text-[32px] text-primary">progress_activity</span></div>;
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-title-lg font-bold text-on-surface">General Settings</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Manage your company's core information and localization preferences.</p>
        </div>
        {toast && (
          <div className={`px-4 py-2 rounded-lg text-label-md font-bold ${toast.type === "success" ? "bg-[#22c55e]/20 text-[#16a34a]" : "bg-error/20 text-error"}`}>
            {toast.msg}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Company Name</label>
          <input name="companyName" value={form.companyName} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Website</label>
          <input name="website" value={form.website} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Support Email</label>
          <input name="supportEmail" value={form.supportEmail} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Support Phone</label>
          <input name="supportPhone" value={form.supportPhone} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-label-md font-bold text-on-surface mb-2">Business Address</label>
          <input name="businessAddress" value={form.businessAddress} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>

        {/* Localization Section */}
        <div className="md:col-span-2 pt-6 mt-2 border-t border-outline-variant">
          <h3 className="text-title-md font-bold text-on-surface mb-6">Localization</h3>
        </div>
        
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Timezone</label>
          <select name="timezone" value={form.timezone} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md outline-none">
            <option value="America/New_York">Eastern Time (US & Canada)</option>
            <option value="America/Chicago">Central Time (US & Canada)</option>
            <option value="America/Denver">Mountain Time (US & Canada)</option>
            <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
          </select>
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Country</label>
          <select name="country" value={form.country} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md outline-none">
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
          </select>
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Currency</label>
          <select name="currency" value={form.currency} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md outline-none">
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Date Format</label>
          <select name="dateFormat" value={form.dateFormat} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md outline-none">
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-outline-variant flex justify-end gap-4">
        <button className="px-6 py-2.5 border border-outline-variant text-on-surface-variant font-bold text-label-md rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
          Reset
        </button>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="px-6 py-2.5 bg-primary text-on-primary font-bold text-label-md rounded-lg hover:bg-primary-container shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
        >
          {saving && <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>}
          Save Changes
        </button>
      </div>
    </div>
  );
}
