"use client";

import React, { useState, useEffect, useTransition } from "react";
import { getCustomFields, createCustomField, deleteCustomField } from "@/features/settings/actions/crm.actions";
import { useUiStore } from "@/store/uiStore";

export default function CustomFieldsSettings() {
  const { showConfirm } = useUiStore();
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  const [newField, setNewField] = useState({ name: "", type: "text", entityType: "contact" });

  const loadData = () => {
    getCustomFields().then(data => {
      setFields(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    if (!newField.name.trim()) return;
    setSaving(true);
    await createCustomField(newField);
    setNewField({ name: "", type: "text", entityType: "contact" });
    loadData();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm("Are you sure you want to delete this custom field?");
    if (!confirmed) return;

    startTransition(async () => {
      await deleteCustomField(id);
      loadData();
    });
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="material-symbols-outlined animate-spin text-[32px] text-primary">progress_activity</span></div>;
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-title-lg font-bold text-on-surface">Custom Fields</h2>
        <p className="text-body-md text-on-surface-variant mt-1">Define extra data points you want to track across Contacts, Campaigns, and Opportunities.</p>
      </div>

      <div className="flex gap-4 items-end bg-surface-container-low p-6 rounded-lg border border-outline-variant mb-8">
        <div className="flex-1">
          <label className="block text-label-md font-bold text-on-surface mb-2">Field Name</label>
          <input 
            value={newField.name} 
            onChange={e => setNewField({...newField, name: e.target.value})} 
            placeholder="e.g. Policy Expiration Date"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary outline-none" 
          />
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Input Type</label>
          <select 
            value={newField.type} 
            onChange={e => setNewField({...newField, type: e.target.value})}
            className="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 text-body-md outline-none"
          >
            <option value="text">Text (Short)</option>
            <option value="textarea">Textarea (Long)</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
            <option value="dropdown">Dropdown</option>
            <option value="checkbox">Checkbox</option>
          </select>
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Assign To</label>
          <select 
            value={newField.entityType} 
            onChange={e => setNewField({...newField, entityType: e.target.value})}
            className="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 text-body-md outline-none"
          >
            <option value="contact">Contact</option>
            <option value="opportunity">Opportunity</option>
            <option value="campaign">Campaign</option>
          </select>
        </div>
        <button 
          onClick={handleCreate} 
          disabled={saving || !newField.name.trim()}
          className="px-6 py-2.5 bg-primary text-on-primary font-bold text-label-md rounded-lg hover:bg-primary-container disabled:opacity-50 transition-colors"
        >
          Add Field
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(field => (
          <div key={field.id} className="flex items-center justify-between p-4 border border-outline-variant rounded-lg bg-surface-container-lowest">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-outline-variant text-[20px]">
                {field.type === 'date' ? 'calendar_today' : field.type === 'number' ? 'pin' : 'text_fields'}
              </span>
              <div>
                <p className="font-bold text-on-surface">{field.name}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] bg-surface-container px-2 rounded-full uppercase font-bold text-on-surface-variant">{field.entityType}</span>
                  <span className="text-[10px] border border-outline-variant px-2 rounded-full uppercase text-outline">{field.type}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(field.id)}
              disabled={saving}
              className="text-on-surface-variant hover:text-error transition-colors p-1"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        ))}
        {fields.length === 0 && (
          <div className="col-span-full p-8 text-center text-on-surface-variant italic">
            No custom fields defined yet.
          </div>
        )}
      </div>
    </div>
  );
}
