import React from "react";

export default function TaskDetailPanel() {
  return (
    <aside className="w-[400px] border-l border-outline-variant bg-surface-container-lowest flex flex-col p-0 z-10 flex-shrink-0">
      <div className="p-6 border-b border-outline-variant flex justify-between items-center">
        <h3 className="font-title-lg text-title-lg text-on-surface">Task Details</h3>
        <button className="p-1 hover:bg-surface-container rounded-full text-on-surface-variant cursor-pointer">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {/* Detail Header */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-label-md font-bold rounded uppercase">Normal</span>
            <span className="text-label-md text-on-surface-variant">Created Apr 12, 10:45 AM</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Review claim docs from Sarah Jenkins</h2>
          <div className="flex items-center text-primary font-medium cursor-pointer hover:underline">
            <span className="material-symbols-outlined text-[20px] mr-1">open_in_new</span>
            Go to Claim #CLM-9023
          </div>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-tighter">Due Date</p>
            <div className="flex items-center p-3 bg-surface-container rounded-lg">
              <span className="material-symbols-outlined text-primary mr-2">calendar_month</span>
              <span className="font-title-md text-title-md">Today, 2:30 PM</span>
            </div>
          </div>
          <div>
            <p className="text-label-md text-on-surface-variant mb-1 uppercase tracking-tighter">Assigned To</p>
            <div className="flex items-center p-2 bg-surface-container rounded-lg">
              <img className="w-6 h-6 rounded-full object-cover mr-2" alt="Alex Morgan" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0QTP_XQgiZeUAKGWur0F2Ugk-EwjWptna8w1eyGYONS54LFNJp2aGu4QRB7KW5b_8k9cCJArPniF_U4omJyStUyvyb15Lj8w5F-zJ4wK6lsYxYk85rggxLFfEOtpzc8kAL1ubfouMILH8-xqUVxLQ_JRCbAdudPdERcDNPCI4X4u_eqCTNdh6CDwOMaywTsCM-Rr7uB-N8yuFA8v3tAcjEaqR_240TL48xwCYVzosIR71-xtoCCzA1HiQIAXqmX7Q1MziYni23ipq" />
              <span className="text-body-md truncate">Alex Morgan</span>
            </div>
          </div>
        </div>

        {/* Contact Card Section */}
        <div className="bg-background rounded-xl p-4 border border-outline-variant border-dashed">
          <p className="text-label-md text-on-surface-variant mb-3 uppercase tracking-tighter">Related Contact</p>
          <div className="flex items-center">
            <img className="w-12 h-12 rounded-lg object-cover" alt="Sarah Jenkins" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBYcYUSgLFIAMb-WpGcTGY0naFE-t1o7atfIA6ESreL8A8o_8k73oBoM6htEoTUphHRN7cPAv9zVsyUnZj-t5YH7dAhyRR960JW6GXw37SYDYauWn8f9VdMT1yOHbwUpvVBqoUV1FRvwPxn_MijQDI6SW71liA_X8HX32Jc9KZDSbrkoJNf2AlIibRfIFJZTlTVhv-p0AIh_kzk1yo6lxE_NDMHTMCfQ4AHV4xllkbxl7v5pwoX_YH1Hd-wp_i3WgLauZpSiOVXnsy" />
            <div className="ml-3">
              <h4 className="font-title-md text-title-md">Sarah Jenkins</h4>
              <p className="text-label-md text-on-surface-variant">Policyholder (Life & Health)</p>
            </div>
            <button className="ml-auto p-2 bg-primary-fixed text-on-primary-fixed rounded-full hover:brightness-95 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-[20px]">call</span>
            </button>
          </div>
        </div>

        {/* Description/Notes */}
        <div>
          <p className="text-label-md text-on-surface-variant mb-2 uppercase tracking-tighter">Description</p>
          <textarea 
            className="w-full bg-background border border-outline-variant rounded-xl p-4 text-body-md focus:ring-primary focus:border-primary min-h-[120px] focus:outline-none" 
            placeholder="Add detailed notes here..."
            defaultValue="Sarah sent over the updated medical records for her pending health insurance claim. Need to verify section 4 against the primary policy exclusions and forward to underwriting by EOD."
          ></textarea>
        </div>

        {/* Subtasks */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <p className="text-label-md text-on-surface-variant uppercase tracking-tighter">Subtasks (2/3)</p>
            <button className="text-primary text-label-md font-bold cursor-pointer">+ Add</button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-outline-variant/30">
              <input defaultChecked className="w-4 h-4 rounded text-primary" type="checkbox" />
              <span className="text-body-md line-through text-on-surface-variant">Download PDF attachments</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-outline-variant/30">
              <input defaultChecked className="w-4 h-4 rounded text-primary" type="checkbox" />
              <span className="text-body-md line-through text-on-surface-variant">Check policy CLM-9023 active state</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background rounded-lg border border-outline-variant/30">
              <input className="w-4 h-4 rounded text-primary" type="checkbox" />
              <span className="text-body-md">Forward to underwriting portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Footer */}
      <div className="p-6 border-t border-outline-variant bg-surface-container-low flex gap-3">
        <button className="flex-1 bg-primary text-on-primary py-3 rounded-xl font-bold flex items-center justify-center shadow-md cursor-pointer hover:brightness-110">
          <span className="material-symbols-outlined mr-2">check_circle</span>
          Mark Complete
        </button>
        <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </div>
    </aside>
  );
}
