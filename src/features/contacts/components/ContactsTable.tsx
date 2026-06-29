"use client";

import React from "react";
import { useCrmStore } from "@/store/crmStore";

export default function ContactsTable() {
  const { contacts, selectedIds, toggleSelection, selectAll, clearSelection } = useCrmStore();

  // Contacts from store are already the current API page — no client-side slicing
  const allOnPageSelected = contacts.length > 0 && contacts.every((c) => selectedIds.includes(c.id));

  const handleSelectAll = () => {
    if (allOnPageSelected) {
      clearSelection();
    } else {
      selectAll(contacts.map(c => c.id));
    }
  };

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>, id: string) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "INPUT" && target.tagName !== "SELECT" && target.tagName !== "BUTTON") {
      toggleSelection(id);
    }
  };

  return (
    <div className="overflow-x-auto custom-scrollbar flex-1">
      <table className="w-full text-left border-collapse min-w-[1400px]">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            <th className="py-3 px-4 w-10">
              <input 
                className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" 
                type="checkbox" 
                checked={allOnPageSelected}
                onChange={handleSelectAll}
              />
            </th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Name</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Phone</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Email</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-center">State</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Lead Source</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Owner</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Campaign</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Disposition</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Last Called</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Follow Up</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {contacts.length === 0 ? (
            <tr>
              <td colSpan={12} className="py-8 text-center text-on-surface-variant">
                No contacts found matching the filters.
              </td>
            </tr>
          ) : (
            contacts.map((c) => (
              <tr 
                key={c.id} 
                onClick={(e) => handleRowClick(e, c.id)} 
                className={`transition-colors group cursor-pointer ${selectedIds.includes(c.id) ? 'bg-primary-container/20' : 'hover:bg-surface-container-lowest'}`}
              >
                <td className="py-4 px-4">
                  <input 
                    className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" 
                    type="checkbox" 
                    checked={selectedIds.includes(c.id)}
                    onChange={() => toggleSelection(c.id)}
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${c.bgInitials} flex items-center justify-center ${c.textInitials} font-bold text-xs`}>{c.initials}</div>
                    <div className="font-semibold text-on-surface">{c.name}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-on-surface-variant font-medium">{c.phone}</td>
                <td className="py-4 px-4 text-on-surface-variant">{c.email}</td>
                <td className="py-4 px-4 text-center">
                  <span className="bg-surface-container border border-outline-variant text-[10px] font-bold px-1.5 py-0.5 rounded">{c.state}</span>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.sourceBg}`}>{c.source}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {c.ownerPhoto ? (
                      <img className="w-5 h-5 rounded-full" alt={c.ownerName} src={c.ownerPhoto} />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-surface-dim flex items-center justify-center text-[10px]">{c.ownerInitials || c.ownerName.slice(0,2).toUpperCase()}</div>
                    )}
                    <span className="text-xs">{c.ownerName}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-xs truncate max-w-[120px]">{c.campaign}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${c.statusBg}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${c.statusDot}`}></span> {c.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-xs">{c.disposition}</td>
                <td className="py-4 px-4 text-xs text-on-surface-variant">{c.lastCalled}</td>
                <td className={`py-4 px-4 text-xs font-semibold ${c.followUpColor}`}>{c.followUp}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
