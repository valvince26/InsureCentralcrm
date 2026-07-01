"use client";

import React, { useState } from "react";
import Link from "next/link";
import ComposeEmailModal from "./ComposeEmailModal";

export default function EmailFolders({ unreadCount = 0, currentFolder = "Inbox" }: { unreadCount?: number, currentFolder?: string }) {
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  return (
    <>
      <section className="w-64 flex-shrink-0 bg-surface border-r border-outline-variant flex flex-col z-10">
        <div className="p-6">
          <button 
            onClick={() => setIsComposeOpen(true)}
            className="w-full py-3 bg-primary text-on-primary rounded-xl font-title-md flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:bg-primary-container transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined">edit</span>
            Compose
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Link href="/email?folder=Inbox" className={`flex items-center justify-between px-4 py-2.5 rounded-lg font-medium transition-colors ${currentFolder === 'Inbox' ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: currentFolder === 'Inbox' ? "'FILL' 1" : "" }}>inbox</span>
              <span className="text-body-md">Inbox</span>
            </div>
            {unreadCount > 0 && (
              <span className={`text-[11px] px-1.5 rounded-full ${currentFolder === 'Inbox' ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface'}`}>{unreadCount}</span>
            )}
          </Link>
          <Link href="/email?folder=Sent" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${currentFolder === 'Sent' ? 'bg-primary/10 text-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: currentFolder === 'Sent' ? "'FILL' 1" : "" }}>send</span>
            <span className="text-body-md">Sent</span>
          </Link>
          <Link href="/email?folder=Drafts" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${currentFolder === 'Drafts' ? 'bg-primary/10 text-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: currentFolder === 'Drafts' ? "'FILL' 1" : "" }}>draft</span>
            <span className="text-body-md">Drafts</span>
          </Link>
          <Link href="/email?folder=Archived" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${currentFolder === 'Archived' ? 'bg-primary/10 text-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: currentFolder === 'Archived' ? "'FILL' 1" : "" }}>archive</span>
            <span className="text-body-md">Archived</span>
          </Link>
          <Link href="/email?folder=Trash" className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${currentFolder === 'Trash' ? 'bg-primary/10 text-primary font-medium' : 'text-on-surface-variant hover:bg-surface-container-high'}`}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: currentFolder === 'Trash' ? "'FILL' 1" : "" }}>delete</span>
            <span className="text-body-md">Trash</span>
          </Link>
          
          <div className="pt-6 pb-2">
            <p className="px-4 text-[11px] font-bold text-outline-variant uppercase tracking-wider">Labels</p>
          </div>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
            <span className="text-body-md">Urgent</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
            <span className="text-body-md">Claims</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-[#a8c8ff]"></span>
            <span className="text-body-md">Renewals</span>
          </Link>
        </nav>
        
        <div className="p-6 bg-surface-container-low border-t border-outline-variant">
          <div className="flex items-center justify-between mb-2">
            <span className="text-label-md text-on-surface-variant">Storage</span>
            <span className="text-label-md font-bold text-on-surface">82%</span>
          </div>
          <div className="w-full bg-outline-variant h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[82%]"></div>
          </div>
        </div>
      </section>
      
      <ComposeEmailModal isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} />
    </>
  );
}
