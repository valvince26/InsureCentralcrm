"use client";

import React from "react";
import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  format, 
  isSameMonth, 
  isSameDay, 
  isToday 
} from "date-fns";
import { useCalendarStore } from "@/store/calendarStore";

export default function MiniCalendar() {
  const { currentDate, nextMonth, prevMonth, setCurrentDate } = useCalendarStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-label-lg">{format(currentDate, "MMMM yyyy")}</h3>
        <div className="flex gap-1">
          <button onClick={prevMonth} className="p-1 hover:bg-surface-container-high rounded cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button onClick={nextMonth} className="p-1 hover:bg-surface-container-high rounded cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
          <div key={i} className="text-center text-[10px] font-bold text-on-surface-variant">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isCurrentDay = isToday(day);

          return (
            <button 
              key={day.toString()}
              onClick={() => setCurrentDate(day)}
              className={`
                w-8 h-8 rounded-full flex items-center justify-center text-label-sm transition-colors mx-auto cursor-pointer
                ${!isCurrentMonth ? "text-outline opacity-50" : "text-on-surface hover:bg-surface-container-high"}
                ${isCurrentDay ? "bg-primary text-white hover:bg-primary-container hover:text-on-primary-container" : ""}
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
