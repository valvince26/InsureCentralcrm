"use client";

import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function EmailList({ threads, activeId }: { threads: any[], activeId: string | null }) {
  return (
    <section className="w-[380px] flex-shrink-0 bg-white border-r border-outline-variant flex flex-col h-full z-10">
      <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
        <div className="flex items-center gap-2">
          <span className="text-title-md text-on-surface">Inbox</span>
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
        </div>
        <div className="flex gap-1">
          <button className="p-1.5 hover:bg-surface-container rounded-md">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">sort</span>
          </button>
          <button className="p-1.5 hover:bg-surface-container rounded-md">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">filter_list</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {threads.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">
            No emails found.
          </div>
        ) : (
          threads.map(thread => {
            const isActive = thread.id === activeId;
            const contactName = `${thread.contact?.firstName || ''} ${thread.contact?.lastName || ''}`.trim() || "Unknown";
            const timeAgo = formatDistanceToNow(new Date(thread.lastActivityAt), { addSuffix: true });
            
            // Strip HTML tags for preview snippet
            const snippetRaw = thread.emails?.[0]?.body || "";
            const snippet = snippetRaw.replace(/<[^>]+>/g, '').substring(0, 100);

            return (
              <Link key={thread.id} href={`/email?t=${thread.id}`} className="block">
                <div className={`p-4 border-b ${isActive ? 'border-primary bg-primary/5 relative' : 'border-outline-variant hover:bg-surface-container-lowest transition-colors group'}`}>
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                  
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-title-md font-semibold ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                      {contactName}
                    </span>
                    <span className="text-label-md text-outline">{timeAgo}</span>
                  </div>
                  
                  <p className={`text-body-md truncate ${isActive ? 'font-semibold text-on-surface' : 'font-medium text-on-surface'}`}>
                    {thread.subject}
                  </p>
                  
                  <p className="text-body-md text-on-surface-variant line-clamp-2 mt-1">
                    {snippet}
                  </p>
                  
                  {/* Mock Tags just for visual parity with prototype */}
                  {isActive && thread.subject.includes("Urgent") && (
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 bg-error-container text-on-error-container rounded-full font-bold uppercase">
                        Urgent
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-full">
                        Renewal
                      </span>
                    </div>
                  )}
                  {!isActive && !thread.subject.includes("Urgent") && (
                    <div className="flex gap-2 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">attach_file</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
