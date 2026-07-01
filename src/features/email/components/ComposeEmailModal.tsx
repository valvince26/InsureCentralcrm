"use client";

import React, { useState, useEffect, useTransition, useRef } from "react";
import { getContacts } from "@/features/contacts/actions/contacts.actions";
import { createEmailThread, saveEmailDraft } from "../actions/email.actions";
import { useUiStore } from "@/store/uiStore";

export default function ComposeEmailModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { showAlert } = useUiStore();
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && contacts.length === 0) {
      getContacts().then(c => setContacts(c));
    }
  }, [isOpen, contacts.length]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const filteredContacts = contacts.filter(c => {
    const search = searchQuery.toLowerCase();
    return c.email?.toLowerCase().includes(search) || 
           c.firstName?.toLowerCase().includes(search) || 
           c.lastName?.toLowerCase().includes(search);
  });

  const handleSelectContact = (id: string, email: string, name: string) => {
    setSelectedContact(id);
    setSearchQuery(`${name} <${email}>`);
    setIsDropdownOpen(false);
  };

  const handleSend = () => {
    const finalContact = selectedContact || searchQuery;
    if (!finalContact || !subject.trim() || !body.trim()) {
      showAlert("Please fill in all fields.");
      return;
    }

    startTransition(async () => {
      try {
        const bodyText = `<p>${body.replace(/\n/g, '<br/>')}</p>`;
        await createEmailThread(finalContact, subject, bodyText);
        showAlert("Email sent!");
        setSubject("");
        setBody("");
        setSelectedContact("");
        setSearchQuery("");
        onClose();
      } catch (err: any) {
        showAlert("Failed to send email: " + err.message);
      }
    });
  };

  const handleSaveDraft = () => {
    const finalContact = selectedContact || searchQuery;
    if (!finalContact && !subject.trim() && !body.trim()) {
      showAlert("Please enter at least some content to save a draft.");
      return;
    }

    startTransition(async () => {
      try {
        const bodyText = `<p>${body.replace(/\n/g, '<br/>')}</p>`;
        await saveEmailDraft(finalContact || "Draft Contact", subject || "(No Subject)", bodyText);
        showAlert("Draft saved!");
        setSubject("");
        setBody("");
        setSelectedContact("");
        setSearchQuery("");
        onClose();
      } catch (err: any) {
        showAlert("Failed to save draft: " + err.message);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <h2 className="font-headline-sm text-on-surface">New Message</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center border-b border-outline-variant pb-2 relative" ref={dropdownRef}>
            <label className="w-20 text-sm font-medium text-on-surface-variant">To:</label>
            <div className="flex-1 relative">
              <input 
                type="text"
                className="w-full bg-transparent outline-none text-body-md"
                placeholder="Type an email or search contacts..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setSelectedContact(""); 
                  setIsDropdownOpen(true);
                }}
                onFocus={() => setIsDropdownOpen(true)}
              />
              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-surface border border-outline-variant rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map(c => (
                      <div 
                        key={c.id} 
                        className="px-4 py-2 hover:bg-surface-container-low cursor-pointer flex justify-between items-center"
                        onClick={() => handleSelectContact(c.id, c.email || '', `${c.firstName} ${c.lastName}`)}
                      >
                        <span className="font-medium text-on-surface text-sm">{c.firstName} {c.lastName}</span>
                        <span className="text-on-surface-variant text-xs">{c.email}</span>
                      </div>
                    ))
                  ) : searchQuery.length > 0 ? (
                    <div className="px-4 py-2 text-sm text-on-surface-variant hover:bg-surface-container-low cursor-pointer" onClick={() => setIsDropdownOpen(false)}>
                      Use "{searchQuery}"
                    </div>
                  ) : (
                    <div className="px-4 py-2 text-sm text-on-surface-variant">
                      Type to search contacts...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center border-b border-outline-variant pb-2">
            <label className="w-20 text-sm font-medium text-on-surface-variant">Subject:</label>
            <input 
              className="flex-1 bg-transparent outline-none text-body-md"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Enter subject..."
            />
          </div>
          
          <textarea 
            className="w-full min-h-[250px] mt-4 bg-transparent border-none focus:ring-0 resize-y text-body-md outline-none"
            placeholder="Type your message here..."
            value={body}
            onChange={e => setBody(e.target.value)}
          />
        </div>

        <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex justify-between items-center">
          <div className="flex gap-2">
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">attachment</span>
            </button>
            <button className="p-2 text-on-surface-variant hover:bg-surface-container-highest rounded-lg transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">image</span>
            </button>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleSaveDraft}
              disabled={isPending}
              className="px-6 py-2 border border-outline-variant text-on-surface rounded-lg font-bold text-label-md hover:bg-surface-container-highest shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              Save Draft
            </button>
            <button 
              onClick={handleSend}
              disabled={isPending}
              className="px-6 py-2 bg-primary text-on-primary rounded-lg font-bold text-label-md hover:bg-primary-container shadow-sm transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
            >
              <span>{isPending ? 'Sending...' : 'Send'}</span>
              <span className="material-symbols-outlined text-[16px]">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
