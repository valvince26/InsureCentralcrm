"use client";

import React, { useState, useTransition } from "react";
import EditUserModal from "@/features/settings/components/EditUserModal";
import { deleteUser } from "@/features/settings/actions/user.actions";

interface Props {
  user: any;
}

export default function TeamRowActions({ user }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    setIsMenuOpen(false);
    if (!confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) return;
    
    startTransition(async () => {
      try {
        await deleteUser(user.id);
      } catch (err: any) {
        alert("Failed to delete user: " + err.message);
      }
    });
  };

  return (
    <>
      <div className="relative inline-block text-left">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-outline hover:text-primary transition-colors p-1 cursor-pointer"
        >
          <span className="material-symbols-outlined">more_vert</span>
        </button>

        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-36 bg-surface rounded-lg shadow-lg border border-outline-variant z-20 overflow-hidden">
              <button 
                onClick={() => { setIsMenuOpen(false); setIsEditModalOpen(true); }}
                className="w-full text-left px-4 py-2 text-body-sm text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
              >
                Edit Details
              </button>
              <button 
                onClick={handleDelete}
                disabled={isPending}
                className="w-full text-left px-4 py-2 text-body-sm text-error hover:bg-error-container transition-colors cursor-pointer disabled:opacity-50"
              >
                {isPending ? "Deleting..." : "Delete User"}
              </button>
            </div>
          </>
        )}
      </div>

      <EditUserModal 
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => {}} // Server Action handles revalidation
      />
    </>
  );
}
