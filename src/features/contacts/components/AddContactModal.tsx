"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/crmStore";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddContactModal({ isOpen, onClose }: Props) {
  const addContact = useCrmStore((state) => state.addContact);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = `${formData.firstName.charAt(0)}${formData.lastName.charAt(0)}`.toUpperCase();
    
    addContact({
      id: Math.random().toString(36).substring(7),
      initials: initials || "?",
      bgInitials: "bg-primary-container",
      textInitials: "text-on-primary-container",
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      phone: formData.phone || "-",
      email: formData.email || "-",
      state: formData.state || "-",
      source: "Manual Entry",
      sourceBg: "bg-surface-variant text-on-surface",
      ownerName: "Current User", // Mocked
      campaign: "-",
      status: "New Lead",
      statusBg: "bg-green-50 text-green-700",
      statusDot: "bg-green-500",
      disposition: "-",
      lastCalled: "Never",
      followUp: "-",
      followUpColor: "text-on-surface-variant"
    });
    
    setFormData({ firstName: "", lastName: "", email: "", phone: "", state: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
          <h2 className="font-headline-sm text-on-surface">Add New Contact</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
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
          
          <div className="mt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-low"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-container shadow-sm"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
