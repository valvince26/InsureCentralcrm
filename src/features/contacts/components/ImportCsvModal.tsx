"use client";

import React, { useState, useRef, useTransition, useEffect } from "react";
import Papa from "papaparse";
import { importContacts, getTags } from "../actions/contacts.actions";
import { useUiStore } from "@/store/uiStore";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CRM_FIELDS = [
  { id: "firstName", label: "First Name (Required for context)", required: true },
  { id: "lastName", label: "Last Name", required: false },
  { id: "email", label: "Email", required: true },
  { id: "phone", label: "Phone", required: true },
  { id: "state", label: "State (Code)", required: false },
  { id: "source", label: "Source", required: false },
];

export default function ImportCsvModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { showAlert, showConfirm } = useUiStore();
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [sampleData, setSampleData] = useState<any[]>([]);
  const [allData, setAllData] = useState<any[]>([]);
  
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [tagsToAssign, setTagsToAssign] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setFile(null);
      setCsvHeaders([]);
      setSampleData([]);
      setAllData([]);
      setMappings({});
      setTagsToAssign("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    Papa.parse(uploadedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data.length === 0) {
          showAlert("The CSV file appears to be empty.");
          setFile(null);
          return;
        }
        
        const headers = results.meta.fields || Object.keys(results.data[0] as object);
        setCsvHeaders(headers);
        setSampleData(results.data.slice(0, 3));
        setAllData(results.data);
        
        // Auto-map where possible
        const initialMap: Record<string, string> = {};
        CRM_FIELDS.forEach(field => {
          const match = headers.find(h => 
            h.toLowerCase() === field.label.toLowerCase() || 
            h.toLowerCase() === field.id.toLowerCase() ||
            h.toLowerCase().includes(field.id.toLowerCase().replace('name', ' name'))
          );
          if (match) initialMap[field.id] = match;
        });
        setMappings(initialMap);
        setStep(2);
      }
    });
  };

  const handleProceedToVerify = async () => {
    const missingRequired = CRM_FIELDS.filter(f => f.required && !mappings[f.id]);
    
    if (missingRequired.length > 0) {
      const fieldNames = missingRequired.map(f => f.label.replace(' (Required for context)', '')).join(', ');
      const confirmed = await showConfirm(`You haven't mapped: ${fieldNames}. Contacts missing these will still be imported if possible. Are you sure you want to proceed?`);
      if (!confirmed) return;
    }
    
    setStep(3);
  };

  const handleImport = () => {
    startTransition(async () => {
      const parsedContacts = allData.map((row: any) => ({
        firstName: mappings.firstName ? row[mappings.firstName] : "Unknown",
        lastName: mappings.lastName ? row[mappings.lastName] : "",
        email: mappings.email ? row[mappings.email] : "",
        phone: mappings.phone ? row[mappings.phone] : "",
        state: mappings.state ? row[mappings.state] : "",
        source: mappings.source ? row[mappings.source] : "CSV Import",
      }));

      const tagsArray = tagsToAssign.split(',').map(t => t.trim()).filter(Boolean);
      
      const result = await importContacts(parsedContacts, tagsArray);
      
      if (result.success) {
        router.refresh();
        showAlert(`Successfully imported ${parsedContacts.length} contacts!`);
        onClose();
      } else {
        showAlert("Import failed: " + result.error);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <h2 className="font-headline-sm text-on-surface">Import Contacts</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Stepper */}
        <div className="px-8 py-4 bg-surface-container-lowest border-b border-outline-variant/50 flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
              }`}>
                {s}
              </div>
              <div className={`ml-3 font-medium text-sm ${step >= s ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                {s === 1 ? 'Upload' : s === 2 ? 'Map Fields' : 'Verify'}
              </div>
              {s < 3 && <div className={`flex-1 h-[2px] mx-4 ${step > s ? 'bg-primary' : 'bg-outline-variant/30'}`}></div>}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-surface-container-lowest">
          {step === 1 && (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-outline-variant/50 rounded-xl bg-surface">
              <span className="material-symbols-outlined text-[48px] text-primary/60 mb-4">upload_file</span>
              <h3 className="text-title-md font-semibold text-on-surface mb-2">Upload your CSV file</h3>
              <p className="text-body-sm text-on-surface-variant mb-6 text-center max-w-sm">
                Ensure your file includes columns for First Name, Last Name, Email, and Phone for best results.
              </p>
              <label className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-semibold hover:bg-primary-container transition-colors shadow-sm cursor-pointer flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">folder_open</span>
                Choose File
                <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3 items-start">
                <span className="material-symbols-outlined text-primary">info</span>
                <div>
                  <h4 className="font-semibold text-primary">Map columns to fields</h4>
                  <p className="text-sm text-on-surface-variant mt-1">
                    Review how your spreadsheet columns map to our database fields. We've auto-mapped them where possible.
                  </p>
                </div>
              </div>

              <div className="border border-outline-variant/50 rounded-xl overflow-hidden bg-surface">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-container-low border-b border-outline-variant/50">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-on-surface">CRM Field</th>
                      <th className="px-4 py-3 font-semibold text-on-surface">CSV Column</th>
                      <th className="px-4 py-3 font-semibold text-on-surface">Sample Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {CRM_FIELDS.map(field => (
                      <tr key={field.id} className="hover:bg-surface-container-lowest/50">
                        <td className="px-4 py-4 align-top">
                          <div className="font-medium text-on-surface flex items-center gap-2">
                            {field.label.replace(' (Required for context)', '')}
                            {field.required && <span className="text-error text-xs">*</span>}
                          </div>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <select
                            className="w-full px-3 py-2 border border-outline-variant rounded-lg bg-surface text-sm focus:ring-2 focus:ring-primary outline-none"
                            value={mappings[field.id] || ""}
                            onChange={(e) => setMappings({ ...mappings, [field.id]: e.target.value })}
                          >
                            <option value="">-- Not Mapped --</option>
                            {csvHeaders.map(h => <option key={h} value={h}>{h}</option>)}
                          </select>
                        </td>
                        <td className="px-4 py-4 align-top text-on-surface-variant font-mono text-xs">
                          {mappings[field.id] ? (
                            <div className="flex flex-col gap-1">
                              {sampleData.map((row, i) => (
                                <div key={i} className="truncate max-w-[200px]">
                                  {row[mappings[field.id]] || <span className="text-outline italic">empty</span>}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-outline italic">No mapping</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-6">
              <div className="bg-surface border border-outline-variant/50 rounded-xl p-6">
                <h3 className="text-title-md font-semibold text-on-surface mb-4">Import Preferences</h3>
                
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-sm text-on-surface">Apply Tags to Imported Contacts</label>
                  <p className="text-xs text-on-surface-variant mb-2">
                    Enter tags separated by commas. These will be added to every contact in this import.
                  </p>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm"
                    placeholder="e.g. Q3 Leads, Tradeshow, Imported"
                    value={tagsToAssign}
                    onChange={(e) => setTagsToAssign(e.target.value)}
                  />
                </div>
              </div>

              <div className="bg-surface-container-high rounded-xl p-6 flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-[48px] text-primary mb-2">task_alt</span>
                <h3 className="text-title-lg font-bold text-on-surface">Ready to Import!</h3>
                <p className="text-body-md text-on-surface-variant mt-2 max-w-md">
                  You are about to import <strong>{allData.length}</strong> contacts into your CRM.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-surface border-t border-outline-variant/50 flex justify-between items-center">
          <button 
            onClick={step === 1 ? onClose : () => setStep(step - 1)}
            className="px-5 py-2.5 rounded-xl text-on-surface-variant font-semibold hover:bg-surface-container-low transition-colors cursor-pointer text-sm"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          
          {step === 2 && (
            <button 
              onClick={handleProceedToVerify}
              className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold shadow-sm hover:bg-primary-container transition-all cursor-pointer text-sm flex items-center gap-2"
            >
              Next: Verify
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          )}

          {step === 3 && (
            <button 
              onClick={handleImport}
              disabled={isPending}
              className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold shadow-sm hover:bg-primary-container transition-all cursor-pointer text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isPending ? 'Importing...' : 'Start Import'}
              {!isPending && <span className="material-symbols-outlined text-[18px]">check</span>}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
