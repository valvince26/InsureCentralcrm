"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { useCalendarStore } from "@/store/calendarStore";
import CreateTaskModal from "./CreateTaskModal";

export default function CalendarHeader() {
  const { currentDate, nextMonth, prevMonth } = useCalendarStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
      <div>
        <h2 className="font-headline-md text-headline-md text-on-surface mb-1">Calendar</h2>
        <p className="text-body-md text-on-surface-variant">Manage your high-priority callbacks and policy reviews.</p>
      </div>
      <div className="flex items-center gap-4 bg-surface-container-lowest p-1.5 rounded-xl shadow-sm border border-outline-variant">
        <div className="flex p-1 bg-surface-container-low rounded-lg">
          <button className="px-4 py-1.5 text-label-md font-bold text-primary bg-surface-container-lowest rounded-md shadow-sm cursor-pointer">Month</button>
          <button className="px-4 py-1.5 text-label-md text-on-surface-variant hover:text-on-surface cursor-pointer">Week</button>
          <button className="px-4 py-1.5 text-label-md text-on-surface-variant hover:text-on-surface cursor-pointer">Day</button>
        </div>
        <div className="h-8 w-[1px] bg-outline-variant mx-1"></div>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-1.5 hover:bg-surface-container-high rounded-md cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <span className="text-label-md font-bold px-2">{format(currentDate, "MMMM yyyy")}</span>
          <button onClick={nextMonth} className="p-1.5 hover:bg-surface-container-high rounded-md cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="ml-4 bg-primary text-white px-5 py-2 rounded-lg text-label-md font-bold hover:bg-primary-container transition-colors shadow-sm flex items-center cursor-pointer hover:brightness-110"
        >
          <span className="material-symbols-outlined mr-2 text-[18px]">add</span>
          New Event
        </button>
      </div>
      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
