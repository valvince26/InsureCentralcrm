import React from "react";
import Link from "next/link";

export default function ContactDetailsPane({ conversation }: { conversation?: any }) {
  if (!conversation || !conversation.contact) {
    return (
      <aside className="w-80 border-l border-outline-variant bg-white flex items-center justify-center text-on-surface-variant z-10">
        <p>No contact selected.</p>
      </aside>
    );
  }

  const contactName = `${conversation.contact.firstName || ''} ${conversation.contact.lastName || ''}`.trim();
  const initials = contactName ? contactName.substring(0, 2).toUpperCase() : "NA";

  return (
    <aside className="w-80 border-l border-outline-variant bg-white overflow-y-auto custom-scrollbar z-10">
      <div className="p-6">
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-surface-container-low mb-4 bg-secondary flex items-center justify-center text-white text-[32px] font-bold">
            {initials}
          </div>
          <h3 className="text-title-lg font-bold">{contactName}</h3>
          <p className="text-body-md text-on-surface-variant">{conversation.contact.status || "Lead"}</p>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-label-md font-bold text-outline-variant uppercase mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex flex-col items-center justify-center p-3 border border-outline-variant rounded-xl hover:bg-surface-container transition-all cursor-pointer">
                <span className="material-symbols-outlined text-primary mb-1">description</span>
                <span className="text-[10px] font-bold">Create Quote</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 border border-outline-variant rounded-xl hover:bg-surface-container transition-all cursor-pointer">
                <span className="material-symbols-outlined text-secondary mb-1">event</span>
                <span className="text-[10px] font-bold">Book Meeting</span>
              </button>
            </div>
          </div>

          <div>
            <p className="text-label-md font-bold text-outline-variant uppercase mb-3">Lead Details</p>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-label-md text-on-surface-variant">Phone:</span>
                <span className="text-label-md font-bold">{conversation.contact.phone || "N/A"}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-label-md text-on-surface-variant">Email:</span>
                <span className="text-label-md font-bold truncate max-w-[120px]" title={conversation.contact.email}>{conversation.contact.email || "N/A"}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-label-md text-on-surface-variant">Lead Score:</span>
                <div className="flex items-center gap-1">
                  <span className="text-label-md font-bold text-primary">88</span>
                  <span className="material-symbols-outlined text-primary text-[14px]">bolt</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-6 border-t border-outline-variant">
            <Link 
              href="/contacts" 
              className="block w-full text-center py-2.5 text-label-md font-bold text-primary hover:bg-primary/5 rounded-lg border border-primary/20 transition-all cursor-pointer"
            >
              View Contact Profile
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
