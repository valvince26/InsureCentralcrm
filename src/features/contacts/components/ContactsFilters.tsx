"use client";

import React, { useTransition } from "react";
import { useCrmStore } from "@/store/crmStore";
import { bulkDeleteContacts } from "../actions/contacts.actions";

export default function ContactsFilters() {
  const { filters, setFilter, selectedIds, clearSelection } = useCrmStore();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (selectedIds.length === 0) return alert("Select contacts first.");
    if (confirm(`Delete ${selectedIds.length} selected contacts?`)) {
      startTransition(async () => {
        const result = await bulkDeleteContacts(selectedIds);
        if (result.success) {
          clearSelection();
        } else {
          alert("Failed to delete contacts: " + result.error);
        }
      });
    }
  };

  const handleAction = (actionName: string) => {
    if (selectedIds.length === 0) return alert("Select contacts first.");
    alert(`${actionName} action for ${selectedIds.length} contacts (Mock implementation)`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 p-4 bg-white border border-outline-variant rounded-xl table-shadow">
      <div className="flex items-center gap-2 text-on-surface-variant text-label-md font-semibold mr-2">
        <span className="material-symbols-outlined text-[20px]">filter_list</span>
        Filters:
      </div>
      {/* Filters Selects */}
      <div className="relative">
        <select 
          value={filters.state} 
          onChange={(e) => setFilter("state", e.target.value)}
          className="appearance-none bg-surface-container-lowest border border-outline-variant px-3 py-1.5 pr-8 rounded-md text-xs font-medium focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
        >
          <option>All States</option>
          <option>CA</option>
          <option>TX</option>
          <option>FL</option>
          <option>NY</option>
          <option>OH</option>
        </select>
        <span className="material-symbols-outlined absolute right-2 top-1.5 text-[16px] pointer-events-none text-on-surface-variant">expand_more</span>
      </div>
      <div className="relative">
        <select 
          value={filters.owner} 
          onChange={(e) => setFilter("owner", e.target.value)}
          className="appearance-none bg-surface-container-lowest border border-outline-variant px-3 py-1.5 pr-8 rounded-md text-xs font-medium focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
        >
          <option>All Owners</option>
          <option>John Doe</option>
          <option>Sarah Miller</option>
          <option>Mike Ross</option>
        </select>
        <span className="material-symbols-outlined absolute right-2 top-1.5 text-[16px] pointer-events-none text-on-surface-variant">expand_more</span>
      </div>
      <div className="relative">
        <select 
          value={filters.campaign} 
          onChange={(e) => setFilter("campaign", e.target.value)}
          className="appearance-none bg-surface-container-lowest border border-outline-variant px-3 py-1.5 pr-8 rounded-md text-xs font-medium focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer"
        >
          <option>All Campaigns</option>
          <option>Auto Renewal Q4</option>
          <option>Home Bundle</option>
          <option>Life Event Lead</option>
          <option>CSV Import</option>
        </select>
        <span className="material-symbols-outlined absolute right-2 top-1.5 text-[16px] pointer-events-none text-on-surface-variant">expand_more</span>
      </div>
      <div className="h-6 w-[1px] bg-outline-variant mx-1"></div>
      <button className="flex items-center gap-1.5 px-3 py-1.5 border border-outline-variant rounded-md text-xs font-medium hover:bg-surface-container-low cursor-pointer">
        <span className="material-symbols-outlined text-[16px]">sell</span>
        Tags
      </button>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-[11px] text-on-surface-variant font-medium mr-1">
          {selectedIds.length > 0 ? `${selectedIds.length} Selected` : "Bulk Actions:"}
        </span>
        <div className="flex bg-surface-container-low rounded-md p-1 gap-1">
          <button onClick={() => handleAction("Assign")} className="p-1.5 hover:bg-white rounded transition-all text-on-surface-variant hover:text-primary cursor-pointer" title="Assign User">
            <span className="material-symbols-outlined text-[18px]">person_check</span>
          </button>
          <button onClick={() => handleAction("Change Campaign")} className="p-1.5 hover:bg-white rounded transition-all text-on-surface-variant hover:text-primary cursor-pointer" title="Assign Campaign">
            <span className="material-symbols-outlined text-[18px]">forward_to_inbox</span>
          </button>
          <button onClick={() => handleAction("Export")} className="p-1.5 hover:bg-white rounded transition-all text-on-surface-variant hover:text-primary cursor-pointer" title="Export Selected">
            <span className="material-symbols-outlined text-[18px]">download</span>
          </button>
          <button onClick={handleDelete} className="p-1.5 hover:bg-white rounded transition-all text-on-surface-variant hover:text-error cursor-pointer" title="Delete">
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
