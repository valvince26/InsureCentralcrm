"use client";

import React from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function ConversationList({ conversations, activeId }: { conversations: any[], activeId: string | null }) {
  return (
    <section className="w-[380px] flex-shrink-0 bg-white border-r border-outline-variant flex flex-col h-full z-10">
      <div className="p-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
        <div className="flex items-center gap-2">
          <span className="text-title-md">Recent Messages</span>
        </div>
        <div className="flex gap-1">
          <button className="p-1.5 hover:bg-surface-container rounded-md">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {conversations.length === 0 ? (
          <div className="p-8 text-center text-on-surface-variant">
            No active conversations.
          </div>
        ) : (
          conversations.map(conv => {
            const isActive = conv.id === activeId;
            const latestMsg = conv.messages?.[0]?.body || "No messages yet.";
            const timeAgo = formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true });
            const contactName = `${conv.contact?.firstName || ''} ${conv.contact?.lastName || ''}`.trim() || "Unknown";
            
            return (
              <Link key={conv.id} href={`/messaging?c=${conv.id}`} className="block">
                <div className={`p-4 border-b ${isActive ? 'border-primary bg-primary/5 relative' : 'border-outline-variant hover:bg-surface-container-lowest transition-colors'}`}>
                  {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                  
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-title-md font-bold ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                      {contactName}
                    </span>
                    <span className="text-label-md text-outline">{timeAgo}</span>
                  </div>
                  <p className={`text-body-md line-clamp-1 mt-1 ${isActive ? 'font-semibold text-on-surface' : 'text-on-surface-variant'}`}>
                    {latestMsg}
                  </p>
                  
                  {isActive && (
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full font-bold uppercase">
                        {conv.contact?.status || 'Active'}
                      </span>
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
