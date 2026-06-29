"use client";

import React, { useState, useTransition } from "react";
import { inviteUser, getOrganizationUsers } from "../actions/user.actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (users: any[]) => void;
}

export default function InviteUserModal({ isOpen, onClose, onSuccess }: Props) {
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    role: "AGENT",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    startTransition(async () => {
      try {
        const result = await inviteUser(
          formData.email,
          formData.firstName,
          formData.lastName,
          formData.role as "SUPER_ADMIN" | "MANAGER" | "AGENT"
        );
        
        if (result.success) {
          setFormData({ email: "", firstName: "", lastName: "", role: "AGENT" });
          const newUsers = await getOrganizationUsers();
          onSuccess(newUsers);
          onClose();
        }
      } catch (err: any) {
        alert("Failed to invite user: " + err.message);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center">
          <h2 className="font-headline-sm text-on-surface">Invite New User</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-on-surface mb-1">Email Address</label>
            <input 
              required
              type="email"
              className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="name@company.com"
            />
          </div>
          
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
            <label className="block text-sm font-medium text-on-surface mb-1">Role</label>
            <select
              className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary outline-none"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="AGENT">Agent</option>
              <option value="MANAGER">Manager</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>
          
          <div className="mt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-low cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isPending}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-container shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isPending ? "Inviting..." : "Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
