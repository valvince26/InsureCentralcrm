"use client";

import React from "react";
import { useDialer } from "../context/DialerContext";

export default function ScriptPanel() {
  const { activeItem } = useDialer();
  const contactName = activeItem?.contact?.firstName || "[Lead Name]";

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="p-4 bg-surface-container-low border-b border-outline-variant flex justify-between items-center">
        <h3 className="font-title-md text-title-md">Active Script</h3>
        <div className="flex gap-2">
          <button className="p-1 hover:bg-surface-container rounded transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">expand_more</span>
          </button>
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto bg-surface-bright/30">
        <div className="prose prose-sm max-w-none">
          <h4 className="text-primary font-bold mb-2">The Opening</h4>
          <p className="text-on-surface-variant mb-6 leading-relaxed bg-white p-3 rounded-lg border border-primary/10">
            "Hi <span className="bg-primary-container text-on-primary px-1 rounded">{contactName}</span>, this is Marcus from Insure Central. I'm reaching out because you recently requested a quote for life insurance online..."
          </p>

          <h4 className="text-primary font-bold mb-2">Discovery Questions</h4>
          <ul className="space-y-4 text-on-surface-variant list-none pl-0">
            <li className="flex gap-3 bg-white p-3 rounded-lg border border-outline-variant/30">
              <span className="material-symbols-outlined text-secondary text-[20px]">help</span>
              "Are you primarily looking for income replacement or final expense coverage?"
            </li>
            <li className="flex gap-3 bg-white p-3 rounded-lg border border-outline-variant/30">
              <span className="material-symbols-outlined text-secondary text-[20px]">help</span>
              "Is there a specific monthly budget you had in mind for this protection?"
            </li>
          </ul>

          <h4 className="text-primary font-bold mt-8 mb-2">Handling Objections</h4>
          <div className="bg-error-container/20 p-4 rounded-xl border border-error/10">
            <p className="text-xs font-bold text-error uppercase mb-2">If "Not Interested":</p>
            <p className="text-sm italic">"I completely understand, Robert. Most of our clients felt that way until they saw how our bundling can actually lower their overall monthly costs..."</p>
          </div>
        </div>
      </div>
    </div>
  );
}
