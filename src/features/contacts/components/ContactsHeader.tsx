"use client";

import React, { useState, useRef, useTransition } from "react";
import AddContactModal from "./AddContactModal";
import Papa from "papaparse";
import { importContacts } from "../actions/contacts.actions";

export default function ContactsHeader() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedContacts = results.data.map((row: any) => {
          const firstName = row["First Name"] || row["Name"] || "Unknown";
          const lastName = row["Last Name"] || "";
          
          return {
            firstName,
            lastName,
            phone: row["Phone"] || "",
            email: row["Email"] || "",
            state: row["State"] || "",
            source: row["Lead Source"] || row["Source"] || "CSV Import",
          };
        });
        
        startTransition(async () => {
          const result = await importContacts(parsedContacts);
          if (result.success) {
            alert(`Successfully imported ${parsedContacts.length} contacts!`);
          } else {
            alert("Import failed: " + result.error);
          }
          if (fileInputRef.current) fileInputRef.current.value = "";
        });
      }
    });
  };

  return (
    <>
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Smart Contacts</h2>
          <p className="text-on-surface-variant mt-1">Manage leads, policyholders, and agency relationships in high resolution.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="file" 
            accept=".csv"
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg bg-white text-on-surface font-semibold hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">upload</span>
            Import CSV
          </button>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Add Contact
          </button>
        </div>
      </div>
      <AddContactModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </>
  );
}
