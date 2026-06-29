import React from "react";

export default function MiniCalendar() {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm">
      <h3 className="text-label-md font-bold text-on-surface uppercase tracking-wider mb-4">My Schedule</h3>
      <div className="grid grid-cols-7 gap-1 text-center">
        <div className="text-[10px] font-bold text-on-surface-variant pb-2">M</div>
        <div className="text-[10px] font-bold text-on-surface-variant pb-2">T</div>
        <div className="text-[10px] font-bold text-on-surface-variant pb-2">W</div>
        <div className="text-[10px] font-bold text-on-surface-variant pb-2">T</div>
        <div className="text-[10px] font-bold text-on-surface-variant pb-2">F</div>
        <div className="text-[10px] font-bold text-on-surface-variant pb-2">S</div>
        <div className="text-[10px] font-bold text-on-surface-variant pb-2">S</div>
        
        {/* Dummy Dates */}
        <div className="text-label-md p-1.5 text-on-surface-variant/40">25</div>
        <div className="text-label-md p-1.5 text-on-surface-variant/40">26</div>
        <div className="text-label-md p-1.5 text-on-surface-variant/40">27</div>
        <div className="text-label-md p-1.5 text-on-surface-variant/40">28</div>
        <div className="text-label-md p-1.5 text-on-surface-variant/40">29</div>
        <div className="text-label-md p-1.5 text-on-surface-variant/40">30</div>
        
        <div className="text-label-md p-1.5 font-bold cursor-pointer hover:bg-surface-container-high rounded-lg transition-colors">1</div>
        <div className="text-label-md p-1.5 cursor-pointer hover:bg-surface-container-high rounded-lg transition-colors">2</div>
        <div className="text-label-md p-1.5 cursor-pointer hover:bg-surface-container-high rounded-lg transition-colors">3</div>
        <div className="text-label-md p-1.5 bg-primary text-white rounded-lg font-bold shadow-md cursor-pointer hover:brightness-110 transition-colors">4</div>
        <div className="text-label-md p-1.5 cursor-pointer hover:bg-surface-container-high rounded-lg transition-colors">5</div>
        <div className="text-label-md p-1.5 relative cursor-pointer hover:bg-surface-container-high rounded-lg transition-colors">
          6<span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
        </div>
        <div className="text-label-md p-1.5 cursor-pointer hover:bg-surface-container-high rounded-lg transition-colors">7</div>
        <div className="text-label-md p-1.5 cursor-pointer hover:bg-surface-container-high rounded-lg transition-colors">8</div>
      </div>
    </div>
  );
}
