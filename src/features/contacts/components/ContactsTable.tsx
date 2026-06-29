"use client";

import React, { useState } from "react";
import { useStillOSContacts } from "@/hooks/useStillOS";

export default function ContactsTable() {
  const [page, setPage] = useState(1);
  const { contacts, total, pages, loading, error } = useStillOSContacts(page, 50);

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "INPUT" && target.tagName !== "SELECT" && target.tagName !== "BUTTON") {
      const checkbox = e.currentTarget.querySelector('input[type="checkbox"]') as HTMLInputElement;
      if (checkbox) checkbox.checked = !checkbox.checked;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-on-surface-variant text-sm">
        Loading {total > 0 ? total.toLocaleString() : ''} contacts from StillOS…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16 text-error text-sm">
        Failed to load contacts: {error}
      </div>
    );
  }

  return (
    <>
      <div className="px-4 py-2 text-xs text-on-surface-variant border-b border-outline-variant">
        {total.toLocaleString()} total contacts · page {page} of {pages}
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1400px]">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="py-3 px-4 w-10">
                <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" type="checkbox" />
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
            {contacts.map((c) => (
              <tr key={c.id} onClick={handleRowClick} className="hover:bg-surface-container-lowest transition-colors group cursor-pointer">
                <td className="py-4 px-4">
                  <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" type="checkbox" />
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
                    <div className="w-5 h-5 rounded-full bg-surface-dim flex items-center justify-center text-[10px]">{c.ownerName?.slice(0, 2).toUpperCase()}</div>
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
            ))}
          </tbody>
        </table>
      </div>
      {pages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-outline-variant text-xs text-on-surface-variant">
          <span>{total.toLocaleString()} contacts</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1 rounded border border-outline-variant disabled:opacity-40 hover:bg-surface-container">Prev</button>
            <span className="px-3 py-1">{page} / {pages}</span>
            <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
              className="px-3 py-1 rounded border border-outline-variant disabled:opacity-40 hover:bg-surface-container">Next</button>
          </div>
        </div>
      )}
    </>
  );
}
