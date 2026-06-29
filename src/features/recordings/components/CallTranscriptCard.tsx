import React from "react";

export default function CallTranscriptCard() {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden h-[500px] flex flex-col">
      <div className="p-4 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
        <h3 className="text-title-md font-title-md text-on-surface">Call Transcript</h3>
        <button className="text-primary text-label-md font-bold hover:underline cursor-pointer">Download PDF</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Speaker: Agent */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-label-md font-bold text-primary">Sarah (Agent)</span>
            <span className="text-[10px] text-on-surface-variant">00:12</span>
          </div>
          <p className="text-body-md text-on-surface leading-relaxed p-3 bg-primary-fixed/30 rounded-r-xl rounded-bl-xl">
            Thank you for calling InsureCentral Support. My name is Sarah. Am I speaking with Mrs. Johnson today?
          </p>
        </div>
        {/* Speaker: Customer */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-row-reverse">
            <span className="text-label-md font-bold text-on-surface">Customer</span>
            <span className="text-[10px] text-on-surface-variant">00:18</span>
          </div>
          <p className="text-body-md text-on-surface leading-relaxed p-3 bg-surface-container-high rounded-l-xl rounded-br-xl text-right">
            Yes, hello Sarah. I'm calling about the status of my automotive claim from last Tuesday. I haven't heard back yet.
          </p>
        </div>
        {/* Speaker: Agent */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-label-md font-bold text-primary">Sarah (Agent)</span>
            <span className="text-[10px] text-on-surface-variant">00:25</span>
          </div>
          <p className="text-body-md text-on-surface leading-relaxed p-3 bg-primary-fixed/30 rounded-r-xl rounded-bl-xl">
            I completely understand. Let me pull that up for you right away. I see that the adjuster has visited the site, and the report was finalized this morning. You should be receiving an email shortly with the next steps.
          </p>
        </div>
        {/* Speaker: Customer */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-row-reverse">
            <span className="text-label-md font-bold text-on-surface">Customer</span>
            <span className="text-[10px] text-on-surface-variant">00:42</span>
          </div>
          <p className="text-body-md text-on-surface leading-relaxed p-3 bg-surface-container-high rounded-l-xl rounded-br-xl text-right">
            Oh, that's great news! I was worried it might take longer. Is there anything else I need to provide on my end?
          </p>
        </div>
      </div>
      <div className="p-4 border-t border-outline-variant bg-surface-container-lowest">
        <div className="relative">
          <input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none text-body-md" placeholder="Search in transcript..." type="text" />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
        </div>
      </div>
    </div>
  );
}
