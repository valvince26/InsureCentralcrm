"use client";

import React, { useState, useEffect } from "react";
import { getEmailSettings, saveEmailSettings } from "@/features/settings/actions/settings.actions";

export default function EmailSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{msg: string, type: "success" | "error"} | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const [form, setForm] = useState({
    companyEmail: "",
    displayName: "",
    replyTo: "",
    host: "",
    port: "587",
    username: "",
    password: "",
    encryption: "tls",
    dailyLimit: 1000,
    bccAddress: "",
    maxAttachmentSize: 10
  });

  useEffect(() => {
    getEmailSettings().then(data => {
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
      await saveEmailSettings(form);
      setToast({ msg: "SMTP Settings saved successfully", type: "success" });
    } catch (e) {
      setToast({ msg: "Failed to save settings", type: "error" });
    }
    setSaving(false);
    setTimeout(() => setToast(null), 3000);
  };

  const testConnection = () => {
    setToast({ msg: "Testing connection... (Simulated success)", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="material-symbols-outlined animate-spin text-[32px] text-primary">progress_activity</span></div>;
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-title-lg font-bold text-on-surface">Email Integration (SMTP)</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Configure your unified company inbox. All users will send emails through this central SMTP configuration.</p>
        </div>
        {toast && (
          <div className={`px-4 py-2 rounded-lg text-label-md font-bold ${toast.type === "success" ? "bg-[#22c55e]/20 text-[#16a34a]" : "bg-error/20 text-error"}`}>
            {toast.msg}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        
        {/* Sender Info */}
        <div className="md:col-span-2">
          <h3 className="text-title-md font-bold text-on-surface border-b border-outline-variant pb-2 mb-4">Sender Information</h3>
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Display Name</label>
          <input name="displayName" value={form.displayName} onChange={handleChange} placeholder="e.g. Insure Central" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Company Email Address</label>
          <input name="companyEmail" value={form.companyEmail} onChange={handleChange} placeholder="info@company.com" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Reply-To Address (Optional)</label>
          <input name="replyTo" value={form.replyTo} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Default BCC Address (Optional)</label>
          <input name="bccAddress" value={form.bccAddress} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>

        {/* Server Config */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-title-md font-bold text-on-surface border-b border-outline-variant pb-2 mb-4">SMTP Configuration</h3>
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">SMTP Host</label>
          <input name="host" value={form.host} onChange={handleChange} placeholder="smtp.sendgrid.net" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-label-md font-bold text-on-surface mb-2">Port</label>
            <input name="port" value={form.port} onChange={handleChange} placeholder="587" className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
          </div>
          <div className="flex-1">
            <label className="block text-label-md font-bold text-on-surface mb-2">Encryption</label>
            <select name="encryption" value={form.encryption} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md outline-none">
              <option value="tls">STARTTLS / TLS</option>
              <option value="ssl">SSL</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Username</label>
          <input name="username" value={form.username} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Password / API Key</label>
          <div className="relative">
            <input 
              name="password" 
              type={showPassword ? "text" : "password"} 
              value={form.password} 
              onChange={handleChange} 
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" 
            />
            <span 
              className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant mt-1">Passwords are encrypted via AES-256 before saving to the database.</p>
        </div>

        {/* Limits */}
        <div className="md:col-span-2 mt-4">
          <h3 className="text-title-md font-bold text-on-surface border-b border-outline-variant pb-2 mb-4">Limits & Rules</h3>
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Daily Sending Limit</label>
          <input type="number" name="dailyLimit" value={form.dailyLimit} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Max Attachment Size (MB)</label>
          <input type="number" name="maxAttachmentSize" value={form.maxAttachmentSize} onChange={handleChange} className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-outline-variant flex justify-between items-center">
        <button 
          onClick={testConnection}
          className="px-6 py-2.5 border border-outline-variant text-on-surface-variant font-bold text-label-md rounded-lg hover:bg-surface-container transition-colors cursor-pointer flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">network_check</span>
          Test Connection
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
