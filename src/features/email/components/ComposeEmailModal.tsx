"use client";

import React, { useState, useEffect, useTransition } from "react";
import { getContacts } from "@/features/contacts/actions/contacts.actions";
import { createEmailThread } from "../actions/email.actions";

export default function ComposeEmailModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isOpen && contacts.length === 0) {
      getContacts().then(c => setContacts(c));
    }
  }, [isOpen, contacts.length]);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!selectedContact || !subject.trim() || !body.trim()) {
      return alert("Please fill in all fields.");
    }

    startTransition(async () => {
      try {
        const bodyText = `<p>${body.replace(/\n/g, '<br/>')}</p>`;
        await createEmailThread(selectedContact, subject, bodyText);
        alert("Email sent!");
        setSubject("");
        setBody("");
        setSelectedContact("");
        onClose();
      } catch (err: any) {
        alert("Failed to send email: " + err.message);
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
          <div className="flex items-center border-b border-outline-variant pb-2">
            <label className="w-20 text-sm font-medium text-on-surface-variant">To:</label>
            <select 
              className="flex-1 bg-transparent outline-none cursor-pointer text-body-md"
              value={selectedContact}
              onChange={e => setSelectedContact(e.target.value)}
            >
              <option value="">Select a contact...</option>
              {contacts.map(c => (
                <option key={c.id} value={c.id}>
                  {c.firstName} {c.lastName} ({c.email || 'No email'})
                </option>
              ))}
            </select>
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
  );
}
