"use client";

import React, { useState, useTransition } from "react";
import { createTask } from "../actions/calendar.actions";
import { useUiStore } from "@/store/uiStore";

export default function CreateTaskModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { showAlert } = useUiStore();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) {
      showAlert("Please fill in title and due date.");
      return;
    }

    startTransition(async () => {
      try {
        await createTask({ title, dueDate: new Date(dueDate) });
        showAlert("Event created successfully.");
        setTitle("");
        setDueDate("");
        onClose();
      } catch (err: any) {
        showAlert("Error creating event: " + err.message);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-outline-variant flex justify-between items-center">
          <h2 className="text-headline-sm font-bold">New Event</h2>
          <button onClick={onClose} className="p-2 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-label-md font-bold mb-2">Title</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="e.g. Policy Review Meeting"
            />
          </div>

          <div>
            <label className="block text-label-md font-bold mb-2">Date & Time</label>
            <input 
              type="datetime-local" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 border border-outline-variant rounded-xl font-bold hover:bg-surface-container-low transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isPending}
              className="px-6 py-2 bg-primary text-on-primary rounded-xl font-bold hover:bg-primary-container hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isPending ? "Saving..." : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
