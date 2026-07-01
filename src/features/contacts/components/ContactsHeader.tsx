"use client";

import React, { useState } from "react";
import AddContactModal from "./AddContactModal";
import ImportCsvModal from "./ImportCsvModal";

export default function ContactsHeader() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);



  return (
    <>
      <div className="flex justify-between items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Smart Contacts</h2>
          <p className="text-on-surface-variant mt-1">Manage leads, policyholders, and agency relationships in high resolution.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsImportOpen(true)}
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
      <ImportCsvModal isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} />
    </>
  );
}
