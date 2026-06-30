"use client";

import React, { useState, useEffect } from "react";
import { getBusinessHours, saveBusinessHours } from "@/features/settings/actions/settings.actions";

export default function BusinessHours() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{msg: string, type: "success" | "error"} | null>(null);
  
  const [form, setForm] = useState<any>({
    timezone: "America/New_York",
    monday: { isOpen: true, open: "09:00", close: "17:00" },
    tuesday: { isOpen: true, open: "09:00", close: "17:00" },
    wednesday: { isOpen: true, open: "09:00", close: "17:00" },
    thursday: { isOpen: true, open: "09:00", close: "17:00" },
    friday: { isOpen: true, open: "09:00", close: "17:00" },
    saturday: { isOpen: false, open: "09:00", close: "17:00" },
    sunday: { isOpen: false, open: "09:00", close: "17:00" },
  });

  useEffect(() => {
    getBusinessHours().then(data => {
      if (data) setForm(data);
      setLoading(false);
    });
  }, []);

  const handleDayChange = (day: string, field: string, value: any) => {
    setForm({
      ...form,
      [day]: { ...form[day], [field]: value }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveBusinessHours(form);
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

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-title-lg font-bold text-on-surface">Business Hours</h2>
          <p className="text-body-md text-on-surface-variant mt-1">Configure your organization's operating hours for scheduling and automated actions.</p>
        </div>
        {toast && (
          <div className={`px-4 py-2 rounded-lg text-label-md font-bold ${toast.type === "success" ? "bg-[#22c55e]/20 text-[#16a34a]" : "bg-error/20 text-error"}`}>
            {toast.msg}
          </div>
        )}
      </div>

      <div className="mt-8">
        <label className="block text-label-md font-bold text-on-surface mb-2">Timezone for Business Hours</label>
        <select 
          value={form.timezone} 
          onChange={(e) => setForm({...form, timezone: e.target.value})} 
          className="w-full md:w-1/2 bg-surface-container-low border border-outline-variant rounded-lg px-4 py-2.5 text-body-md outline-none mb-8"
        >
          <option value="America/New_York">Eastern Time (US & Canada)</option>
          <option value="America/Chicago">Central Time (US & Canada)</option>
          <option value="America/Denver">Mountain Time (US & Canada)</option>
          <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
        </select>

        <div className="space-y-4">
          {days.map(day => (
            <div key={day} className="flex items-center gap-6 p-4 border border-outline-variant rounded-lg bg-surface-container-low">
              <div className="w-32 flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={form[day]?.isOpen}
                  onChange={(e) => handleDayChange(day, 'isOpen', e.target.checked)}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="font-bold text-on-surface capitalize">{day}</span>
              </div>
              
              {form[day]?.isOpen ? (
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-label-md text-on-surface-variant">Open</span>
                    <input 
                      type="time" 
                      value={form[day]?.open}
                      onChange={(e) => handleDayChange(day, 'open', e.target.value)}
                      className="bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 outline-none"
                    />
                  </div>
                  <span className="text-on-surface-variant">-</span>
                  <div className="flex items-center gap-2">
                    <span className="text-label-md text-on-surface-variant">Close</span>
                    <input 
                      type="time" 
                      value={form[day]?.close}
                      onChange={(e) => handleDayChange(day, 'close', e.target.value)}
                      className="bg-surface-container-lowest border border-outline-variant rounded px-2 py-1 outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex-1 text-on-surface-variant italic">Closed</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-outline-variant flex justify-end gap-4">
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
