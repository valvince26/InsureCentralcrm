"use client";

import React, { useEffect, useState } from "react";
import { getContactAuditLogs } from "../actions/contacts.actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactActivitySlideOut({ isOpen, onClose }: Props) {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getContactAuditLogs().then(data => {
        setLogs(data);
        setLoading(false);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose}></div>
      <div className="fixed top-0 right-0 h-screen w-[400px] bg-surface shadow-2xl z-50 flex flex-col transform transition-transform duration-300 translate-x-0 border-l border-outline-variant">
        <div className="px-6 py-5 border-b border-outline-variant flex justify-between items-center bg-surface-container-lowest">
          <div>
            <h2 className="font-headline-sm text-on-surface">Recent Activity</h2>
            <p className="text-label-md text-on-surface-variant mt-1">Audit log for Contacts module</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant transition-colors cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {loading ? (
            <div className="flex justify-center p-8">
              <span className="material-symbols-outlined animate-spin text-primary text-3xl">refresh</span>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center text-on-surface-variant mt-10">
              <span className="material-symbols-outlined text-4xl opacity-50 mb-2">history</span>
              <p>No recent activity found.</p>
            </div>
          ) : (
            <div className="relative border-l-2 border-surface-container-highest ml-3 pl-6 space-y-8">
              {logs.map((log) => {
                let icon = "history";
                let iconColor = "bg-surface-container-high text-on-surface-variant";
                
                if (log.action === "Bulk Delete") {
                  icon = "delete";
                  iconColor = "bg-error/10 text-error";
                } else if (log.action === "Import Contacts") {
                  icon = "upload_file";
                  iconColor = "bg-primary-container text-on-primary-container";
                }

                let detailsObj: any = {};
                try {
                  detailsObj = JSON.parse(log.details || "{}");
                } catch (e) {}

                return (
                  <div key={log.id} className="relative">
                    <div className={`absolute -left-[35px] w-8 h-8 rounded-full ${iconColor} flex items-center justify-center border-4 border-surface`}>
                      <span className="material-symbols-outlined text-[16px]">{icon}</span>
                    </div>
                    
                    <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-on-surface text-label-lg">{log.action}</h4>
                        <span className="text-label-sm text-on-surface-variant">{new Date(log.createdAt).toLocaleString()}</span>
                      </div>
                      
                      <div className="text-body-sm text-on-surface-variant space-y-1">
                        {log.action === "Bulk Delete" && (
                          <p>Deleted <span className="font-bold">{detailsObj.count}</span> contact(s).</p>
                        )}
                        {log.action === "Import Contacts" && (
                          <p>Imported <span className="font-bold">{detailsObj.count}</span> contact(s) via {detailsObj.source}.</p>
                        )}
                        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-outline-variant/50">
                          <span className="material-symbols-outlined text-[14px]">person</span>
                          <span className="text-xs font-medium">By {log.user?.firstName || log.user?.email || "System"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
