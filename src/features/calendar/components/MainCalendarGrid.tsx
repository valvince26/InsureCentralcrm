import React from "react";

export default function MainCalendarGrid() {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-lg overflow-hidden">
      {/* Grid Header */}
      <div className="grid grid-cols-7 border-b border-outline-variant bg-surface-container-low/50">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div key={day} className="py-3 text-center border-r border-outline-variant last:border-r-0">
            <span className="text-label-md font-bold text-on-surface-variant">{day}</span>
          </div>
        ))}
      </div>

      {/* Grid Body */}
      <div className="grid grid-cols-7 grid-rows-5 auto-rows-fr">
        {/* Week 1 */}
        {[25, 26, 27, 28, 29, 30].map((date) => (
          <div key={`prev-${date}`} className="min-h-[120px] border-r border-b border-outline-variant p-2 bg-surface-container-low/20 opacity-40">
            <span className="text-label-md">{date}</span>
          </div>
        ))}
        <div className="min-h-[120px] border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <span className="text-label-md font-bold">1</span>
        </div>

        {/* Week 2 */}
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <span className="text-label-md">2</span>
          <div className="mt-2 space-y-1">
            <div className="bg-primary text-white text-[10px] p-1.5 rounded-md font-bold truncate shadow-sm active:scale-95 transition-transform hover:brightness-110">
              Policy Audit - Mike Ross
            </div>
          </div>
        </div>
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <span className="text-label-md">3</span>
        </div>
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 bg-secondary-container/10 ring-2 ring-primary ring-inset z-10 cursor-pointer">
          <span className="text-label-md font-bold text-primary">4</span>
          <div className="mt-2 space-y-1">
            <div className="bg-primary text-white text-[10px] p-1.5 rounded-md font-bold truncate shadow-md hover:brightness-110">
              Lead Callback - David Wilson
            </div>
            <div className="bg-primary-container text-white text-[10px] p-1.5 rounded-md font-bold truncate opacity-90 hover:brightness-110">
              Renewal Meeting - Sarah Jenkings
            </div>
          </div>
        </div>
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <span className="text-label-md">5</span>
        </div>
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <span className="text-label-md">6</span>
          <div className="mt-2">
            <div className="bg-outline-variant/30 border border-outline text-on-surface-variant text-[10px] p-1.5 rounded-md font-bold truncate italic hover:bg-outline-variant/50 transition-colors">
              Oversight Mtg (Tentative)
            </div>
          </div>
        </div>
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 bg-surface-container-low/20 cursor-pointer group hover:bg-surface-container-low transition-colors">
          <span className="text-label-md">7</span>
        </div>
        <div className="min-h-[120px] border-b border-outline-variant p-2 bg-surface-container-low/20 cursor-pointer group hover:bg-surface-container-low transition-colors">
          <span className="text-label-md">8</span>
        </div>

        {/* Week 3 */}
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <span className="text-label-md">9</span>
        </div>
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <span className="text-label-md">10</span>
          <div className="mt-2">
            <div className="bg-primary text-white text-[10px] p-1.5 rounded-md font-bold truncate hover:brightness-110">
              Team Standup
            </div>
          </div>
        </div>
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <span className="text-label-md">11</span>
        </div>
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <span className="text-label-md">12</span>
          <div className="mt-2">
            <div className="bg-primary text-white text-[10px] p-1.5 rounded-md font-bold truncate hover:brightness-110">
              Client Lunch - Acme Corp
            </div>
          </div>
        </div>
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer group">
          <span className="text-label-md">13</span>
        </div>
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 bg-surface-container-low/20 cursor-pointer hover:bg-surface-container-low transition-colors">
          <span className="text-label-md">14</span>
        </div>
        <div className="min-h-[120px] border-b border-outline-variant p-2 bg-surface-container-low/20 cursor-pointer hover:bg-surface-container-low transition-colors">
          <span className="text-label-md">15</span>
        </div>

        {/* Filler Rows */}
        {[16, 17, 18, 19, 20].map((date) => (
          <div key={`fill1-${date}`} className="min-h-[120px] border-r border-b border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer"><span className="text-label-md">{date}</span></div>
        ))}
        <div className="min-h-[120px] border-r border-b border-outline-variant p-2 bg-surface-container-low/20 cursor-pointer hover:bg-surface-container-low transition-colors"><span className="text-label-md">21</span></div>
        <div className="min-h-[120px] border-b border-outline-variant p-2 bg-surface-container-low/20 cursor-pointer hover:bg-surface-container-low transition-colors"><span className="text-label-md">22</span></div>

        {[23, 24, 25, 26, 27].map((date) => (
          <div key={`fill2-${date}`} className="min-h-[120px] border-r border-outline-variant p-2 hover:bg-surface-container-low transition-colors cursor-pointer"><span className="text-label-md">{date}</span></div>
        ))}
        <div className="min-h-[120px] border-r border-outline-variant p-2 bg-surface-container-low/20 cursor-pointer hover:bg-surface-container-low transition-colors"><span className="text-label-md">28</span></div>
        <div className="min-h-[120px] p-2 bg-surface-container-low/20 cursor-pointer hover:bg-surface-container-low transition-colors"><span className="text-label-md">29</span></div>
      </div>

      {/* Bottom Action Footer */}
      <div className="m-6 flex items-center justify-between bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
            <span className="text-label-md font-bold text-on-surface-variant">Scheduled</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full border border-primary bg-white mr-2"></span>
            <span className="text-label-md font-bold text-on-surface-variant">Pending</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-error mr-2"></span>
            <span className="text-label-md font-bold text-on-surface-variant">Urgent</span>
          </div>
        </div>
        <div className="text-label-md text-on-surface-variant">
          Showing 12 appointments for October
        </div>
      </div>
    </div>
  );
}
