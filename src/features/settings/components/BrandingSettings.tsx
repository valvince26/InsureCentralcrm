"use client";

import React, { useState, useEffect } from "react";
import { getBrandingSettings, saveBrandingSettings } from "@/features/settings/actions/settings.actions";

export default function BrandingSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{msg: string, type: "success" | "error"} | null>(null);
  
  const [form, setForm] = useState({
    logo: "",
    favicon: "",
    loginBackground: "",
    primaryColor: "#00407e",
    secondaryColor: "#006a6a",
    sidebarColor: "#2f3133",
    buttonColor: "#00407e",
    accentColor: "#a8c8ff",
    typography: "Inter"
  });

  useEffect(() => {
    getBrandingSettings().then(data => {
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
      await saveBrandingSettings(form);
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
          <h2 className="text-title-lg font-bold text-on-surface">Branding</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Customize the look and feel of the CRM for your organization.</p>
        </div>
        {toast && (
          <div className={`px-4 py-2 rounded-lg text-label-md font-bold ${toast.type === "success" ? "bg-[#22c55e]/20 text-[#16a34a]" : "bg-error/20 text-error"}`}>
            {toast.msg}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Colors */}
        <div className="space-y-6">
          <h3 className="text-title-md font-bold text-on-surface border-b border-outline-variant pb-2">Theme Colors</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-label-md font-bold text-on-surface mb-2">Primary Color</label>
              <div className="flex gap-2">
                <input type="color" name="primaryColor" value={form.primaryColor} onChange={handleChange} className="w-10 h-10 rounded cursor-pointer" />
                <input type="text" name="primaryColor" value={form.primaryColor} onChange={handleChange} className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-md outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-label-md font-bold text-on-surface mb-2">Secondary Color</label>
              <div className="flex gap-2">
                <input type="color" name="secondaryColor" value={form.secondaryColor} onChange={handleChange} className="w-10 h-10 rounded cursor-pointer" />
                <input type="text" name="secondaryColor" value={form.secondaryColor} onChange={handleChange} className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-md outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-label-md font-bold text-on-surface mb-2">Sidebar Color</label>
              <div className="flex gap-2">
                <input type="color" name="sidebarColor" value={form.sidebarColor} onChange={handleChange} className="w-10 h-10 rounded cursor-pointer" />
                <input type="text" name="sidebarColor" value={form.sidebarColor} onChange={handleChange} className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-md outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-label-md font-bold text-on-surface mb-2">Button Color</label>
              <div className="flex gap-2">
                <input type="color" name="buttonColor" value={form.buttonColor} onChange={handleChange} className="w-10 h-10 rounded cursor-pointer" />
                <input type="text" name="buttonColor" value={form.buttonColor} onChange={handleChange} className="flex-1 bg-surface-container-low border border-outline-variant rounded-lg px-3 text-body-md outline-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Assets */}
        <div className="space-y-6">
          <h3 className="text-title-md font-bold text-on-surface border-b border-outline-variant pb-2">Assets & Typography</h3>
          
          <div>
            <label className="block text-label-md font-bold text-on-surface mb-2">Typography</label>
            <select name="typography" value={form.typography} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md outline-none">
              <option value="Inter">Inter (Modern Sans-Serif)</option>
              <option value="Roboto">Roboto (Google Standard)</option>
              <option value="Outfit">Outfit (Geometric)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-label-md font-bold text-on-surface mb-2">Company Logo URL</label>
            <input name="logo" value={form.logo} onChange={handleChange} placeholder="https://..." className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-label-md font-bold text-on-surface mb-2">Favicon URL</label>
            <input name="favicon" value={form.favicon} onChange={handleChange} placeholder="https://..." className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
          </div>
        </div>
        
        {/* Preview Panel */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-title-md font-bold text-on-surface border-b border-outline-variant pb-2 mb-6">Live Preview</h3>
          <div className="border border-outline-variant rounded-xl overflow-hidden shadow-sm flex" style={{ height: "300px" }}>
            {/* Mock Sidebar */}
            <div className="w-48 p-4 text-white" style={{ backgroundColor: form.sidebarColor }}>
              <div className="flex items-center gap-2 mb-8 font-bold">
                {form.logo ? (
                   <img src={form.logo} alt="Logo" className="max-h-6" />
                ) : (
                  <div className="w-6 h-6 rounded bg-white/20"></div>
                )}
                <span>InsureFlow</span>
              </div>
              <div className="space-y-2">
                <div className="h-8 rounded opacity-80" style={{ backgroundColor: form.primaryColor }}></div>
                <div className="h-8 rounded bg-white/5"></div>
                <div className="h-8 rounded bg-white/5"></div>
              </div>
            </div>
            
            {/* Mock Content */}
            <div className="flex-1 bg-surface-container-lowest p-8 flex flex-col items-start justify-center">
              <h1 className="text-3xl font-bold mb-4" style={{ color: form.primaryColor, fontFamily: form.typography }}>Welcome to the CRM</h1>
              <p className="text-on-surface-variant mb-6" style={{ fontFamily: form.typography }}>This is a preview of how your theme colors and typography will look across the platform.</p>
              <button className="px-6 py-2.5 rounded-lg text-white font-bold" style={{ backgroundColor: form.buttonColor }}>
                Primary Button
              </button>
            </div>
          </div>
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
