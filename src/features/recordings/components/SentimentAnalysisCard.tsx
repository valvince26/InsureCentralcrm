import React from "react";

export default function SentimentAnalysisCard() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-title-md font-title-md text-on-surface">Sentiment Analysis</h3>
        <span className="material-symbols-outlined text-secondary">analytics</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 shrink-0">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
            <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeLinecap="round" strokeWidth="4"></path>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-title-md font-bold">85%</span>
          </div>
        </div>
        <div>
          <p className="text-body-md font-bold text-on-surface">Very Positive</p>
          <p className="text-label-md text-on-surface-variant">Customer expressed high satisfaction with the claim process.</p>
        </div>
      </div>
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between text-label-md">
          <span className="text-on-surface-variant">Politeness</span>
          <div className="w-32 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="bg-secondary h-full" style={{ width: "92%" }}></div>
          </div>
        </div>
        <div className="flex items-center justify-between text-label-md">
          <span className="text-on-surface-variant">Clarity</span>
          <div className="w-32 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="bg-secondary h-full" style={{ width: "78%" }}></div>
          </div>
        </div>
        <div className="flex items-center justify-between text-label-md">
          <span className="text-on-surface-variant">Resolution Speed</span>
          <div className="w-32 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="bg-secondary h-full" style={{ width: "85%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
