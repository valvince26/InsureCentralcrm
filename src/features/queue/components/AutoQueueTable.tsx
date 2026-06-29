"use client";

import React from "react";
import Link from "next/link";
import { completeQueueItem } from "@/features/queue/actions/assignment.actions";
import { useRouter } from "next/navigation";

export default function AutoQueueTable({ queueItems }: { queueItems: any[] }) {
  const router = useRouter();

  const handleSkip = async (id: string) => {
    try {
      await completeQueueItem(id, "Skipped");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/30">
        <h3 className="text-title-md font-title-md text-on-surface">Your Active Queue ({queueItems.length})</h3>
        <Link 
          href="/power-dialer" 
          className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md hover:bg-primary/90 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          Start Dialing
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-lowest border-b border-outline-variant">
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Contact Name</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Phone</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Campaign / Source</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider">Attempts</th>
              <th className="px-6 py-4 text-label-md font-bold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {queueItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-on-surface-variant">
                  <div className="flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">check_circle</span>
                    <p className="text-title-md">Your queue is empty!</p>
                    <p className="text-body-md mt-2">You have no pending leads to call.</p>
                  </div>
                </td>
              </tr>
            ) : (
              queueItems.map((item, index) => (
                <tr key={item.id} className="transition-colors hover:bg-primary/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-body-md text-on-surface-variant font-mono">{index + 1}</span>
                      {item.priority > 0 && (
                        <span className="material-symbols-outlined text-error text-[16px]">priority_high</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-body-md font-bold text-on-surface">
                      {item.contact?.firstName} {item.contact?.lastName}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-body-md text-on-surface-variant">
                    {item.contact?.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold bg-secondary-container/30 text-secondary border border-secondary/20">
                      {item.campaign?.name || item.contact?.source || "Direct"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-body-md text-on-surface-variant">
                    {item.attempts}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleSkip(item.id)}
                        className="p-2 hover:bg-error-container rounded-lg text-error transition-colors cursor-pointer" 
                        title="Skip / Remove from Queue"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
