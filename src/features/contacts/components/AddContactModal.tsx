"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import { createContact, getTags } from "../actions/contacts.actions";
import { useUiStore } from "@/store/uiStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddContactModal({ isOpen, onClose }: Props) {
  const { showAlert } = useUiStore();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    tagName: "",
  });

  const [tags, setTags] = useState<{id: string, name: string}[]>([]);
  const [tagSearch, setTagSearch] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      getTags().then(t => setTags(t));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const filteredTags = tags.filter(t => t.name.toLowerCase().includes(tagSearch.toLowerCase()));

  const handleSelectTag = (name: string) => {
    setFormData({ ...formData, tagName: name });
    setTagSearch("");
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(async () => {
      const result = await createContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        state: formData.state,
        source: "Manual Entry",
        tagName: formData.tagName || undefined
      });
      
      if (result.success) {
        setFormData({ firstName: "", lastName: "", email: "", phone: "", state: "", tagName: "" });
        onClose();
      } else {
        showAlert("Failed to save contact: " + result.error);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <h2 className="font-headline-sm text-on-surface">Add New Contact</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">First Name</label>
              <input 
                required
                className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">Last Name</label>
              <input 
                required
                className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">Email</label>
            <input 
              type="email"
              className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">Phone</label>
              <input 
                className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-on-surface mb-1">State (Code)</label>
              <input 
                maxLength={2}
                className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none uppercase"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value.toUpperCase()})}
              />
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-medium text-on-surface mb-1">Tags</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
              </div>
              <input 
                type="text"
                className="w-full pl-9 pr-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
                placeholder="Search / create tags"
                value={tagSearch}
                onChange={(e) => {
                  setTagSearch(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
              />
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-surface border border-outline-variant rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filteredTags.map(t => (
                    <div 
                      key={t.id} 
                      className="px-4 py-2 hover:bg-surface-container-low cursor-pointer flex items-center gap-2 text-sm"
                      onClick={() => handleSelectTag(t.name)}
                    >
                      <span className="bg-surface-container-high px-2 py-0.5 rounded-full text-xs font-medium text-on-surface-variant">{t.name}</span>
                    </div>
                  ))}
                  {tagSearch.trim() && !filteredTags.some(t => t.name.toLowerCase() === tagSearch.trim().toLowerCase()) && (
                    <div 
                      className="px-4 py-2 hover:bg-surface-container-low cursor-pointer text-sm font-medium text-primary flex items-center gap-1"
                      onClick={() => handleSelectTag(tagSearch.trim())}
                    >
                      <span>+ {tagSearch.trim()}</span>
                    </div>
                  )}
                  {filteredTags.length === 0 && !tagSearch.trim() && (
                    <div className="px-4 py-3 text-sm text-on-surface-variant text-center">
                      Type to search or create a new tag
                    </div>
                  )}
                </div>
              )}
            </div>
            {formData.tagName && (
              <div className="mt-3 flex items-center gap-2">
                <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm">
                  {formData.tagName}
                  <button type="button" onClick={() => setFormData({...formData, tagName: ""})} className="hover:text-primary-dark cursor-pointer flex items-center justify-center bg-white/50 rounded-full w-4 h-4">
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                </span>
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end gap-3 pt-2 border-t border-outline-variant">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-low cursor-pointer font-medium text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container shadow-sm cursor-pointer font-medium text-sm disabled:opacity-50"
            >
              {isPending ? 'Saving...' : 'Save Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
