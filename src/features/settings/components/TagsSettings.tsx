"use client";

import React, { useState, useEffect } from "react";
import { getTags, createTag, deleteTag } from "@/features/settings/actions/crm.actions";

export default function TagsSettings() {
  const [tags, setTags] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [newTag, setNewTag] = useState({ name: "", color: "#e2e8f0", category: "General" });

  const loadData = () => {
    getTags().then(data => {
      setTags(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    if (!newTag.name.trim()) return;
    setSaving(true);
    await createTag(newTag);
    setNewTag({ name: "", color: "#e2e8f0", category: "General" });
    loadData();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;
    setSaving(true);
    await deleteTag(id);
    loadData();
    setSaving(false);
  };

  if (loading) {
    return <div className="p-8 flex justify-center"><span className="material-symbols-outlined animate-spin text-[32px] text-primary">progress_activity</span></div>;
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-title-lg font-bold text-on-surface">Tag Management</h2>
        <p className="text-body-md text-on-surface-variant mt-1">Create and manage color-coded tags for your Contacts and Opportunities.</p>
      </div>

      <div className="flex gap-4 items-end bg-surface-container-low p-6 rounded-lg border border-outline-variant mb-8">
        <div className="flex-1">
          <label className="block text-label-md font-bold text-on-surface mb-2">Tag Name</label>
          <input 
            value={newTag.name} 
            onChange={e => setNewTag({...newTag, name: e.target.value})} 
            placeholder="e.g. VIP Client"
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 text-body-md focus:border-primary outline-none" 
          />
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Color</label>
          <input 
            type="color" 
            value={newTag.color} 
            onChange={e => setNewTag({...newTag, color: e.target.value})} 
            className="w-12 h-10 rounded cursor-pointer" 
          />
        </div>
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">Category</label>
          <select 
            value={newTag.category} 
            onChange={e => setNewTag({...newTag, category: e.target.value})}
            className="bg-surface-container-lowest border border-outline-variant rounded-lg px-4 py-2.5 text-body-md outline-none"
          >
            <option value="General">General</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
          </select>
        </div>
        <button 
          onClick={handleCreate} 
          disabled={saving || !newTag.name.trim()}
          className="px-6 py-2.5 bg-primary text-on-primary font-bold text-label-md rounded-lg hover:bg-primary-container disabled:opacity-50 transition-colors"
        >
          Add Tag
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tags.map(tag => (
          <div key={tag.id} className="flex items-center justify-between p-4 border border-outline-variant rounded-lg bg-surface-container-lowest">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: tag.color || '#ccc' }}></span>
              <div>
                <p className="font-bold text-on-surface">{tag.name}</p>
                <p className="text-[10px] text-outline uppercase">{tag.category}</p>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(tag.id)}
              disabled={saving}
              className="text-on-surface-variant hover:text-error transition-colors p-1"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        ))}
        {tags.length === 0 && (
          <div className="col-span-full p-8 text-center text-on-surface-variant italic">
            No tags created yet.
          </div>
        )}
      </div>
    </div>
  );
}
