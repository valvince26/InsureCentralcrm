"use client";

import React from "react";

export default function TaskList() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
      <div className="space-y-3">
        {/* High Priority Overdue Task */}
        <div className="task-row group bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center hover:border-primary/40 transition-all cursor-pointer">
          <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary mr-4" type="checkbox" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded uppercase tracking-wider">High</span>
              <h4 className="font-title-md text-title-md text-on-surface truncate">Finalize renewal for Julian Wallace</h4>
            </div>
            <div className="flex items-center text-label-md text-on-surface-variant gap-4">
              <span className="flex items-center text-error"><span className="material-symbols-outlined text-[16px] mr-1">event</span> Overdue (Yesterday)</span>
              <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">person</span> Julian Wallace</span>
              <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">description</span> Auto Policy #A2938</span>
            </div>
          </div>
          <div className="task-actions opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant"><span className="material-symbols-outlined">edit</span></button>
            <button className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant"><span className="material-symbols-outlined">delete</span></button>
          </div>
        </div>

        {/* Normal Priority Task */}
        <div className="task-row group bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center border-l-4 border-l-primary hover:border-primary/40 transition-all cursor-pointer shadow-sm">
          <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary mr-4" type="checkbox" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded uppercase tracking-wider">Normal</span>
              <h4 className="font-title-md text-title-md text-on-surface truncate">Review claim docs from Sarah Jenkins</h4>
            </div>
            <div className="flex items-center text-label-md text-on-surface-variant gap-4">
              <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">schedule</span> Today, 2:30 PM</span>
              <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">person</span> Sarah Jenkins</span>
            </div>
          </div>
          <div className="task-actions opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant"><span className="material-symbols-outlined">edit</span></button>
            <button className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant"><span className="material-symbols-outlined">delete</span></button>
          </div>
        </div>

        {/* Low Priority Task */}
        <div className="task-row group bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center hover:border-primary/40 transition-all cursor-pointer">
          <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary mr-4" type="checkbox" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded uppercase tracking-wider">Low</span>
              <h4 className="font-title-md text-title-md text-on-surface truncate">Send birthday card to Michael Chen</h4>
            </div>
            <div className="flex items-center text-label-md text-on-surface-variant gap-4">
              <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">calendar_today</span> Today</span>
              <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">person</span> Michael Chen</span>
            </div>
          </div>
          <div className="task-actions opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant"><span className="material-symbols-outlined">edit</span></button>
            <button className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant"><span className="material-symbols-outlined">delete</span></button>
          </div>
        </div>

        {/* Recurring Task */}
        <div className="task-row group bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center hover:border-primary/40 transition-all cursor-pointer">
          <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary mr-4" type="checkbox" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded uppercase tracking-wider">Normal</span>
              <h4 className="font-title-md text-title-md text-on-surface truncate">Weekly team sync preparation</h4>
            </div>
            <div className="flex items-center text-label-md text-on-surface-variant gap-4">
              <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">update</span> Recurring (Weekly)</span>
              <span className="flex items-center"><span className="material-symbols-outlined text-[16px] mr-1">group</span> Team Internal</span>
            </div>
          </div>
          <div className="task-actions opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant"><span className="material-symbols-outlined">edit</span></button>
            <button className="p-1.5 rounded-lg hover:bg-surface-container-high text-on-surface-variant"><span className="material-symbols-outlined">delete</span></button>
          </div>
        </div>
      </div>
    </div>
  );
}
