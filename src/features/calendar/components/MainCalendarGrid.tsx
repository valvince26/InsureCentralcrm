"use client";

import React, { useEffect, useState } from "react";
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
import { getTasksForDateRange } from "../actions/calendar.actions";

export default function MainCalendarGrid() {
  const { currentDate } = useCalendarStore();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate calendar grid dates
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateFormat = "d";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  useEffect(() => {
    let isMounted = true;
    
    async function fetchTasks() {
      setIsLoading(true);
      try {
        const data = await getTasksForDateRange(startDate, endDate);
        if (isMounted) {
          setTasks(data);
        }
      } catch (err) {
        console.error("Failed to fetch calendar tasks", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchTasks();
    
    return () => { isMounted = false; };
  }, [currentDate]);

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-lg overflow-hidden flex flex-col h-[700px]">
      {/* Grid Header */}
      <div className="grid grid-cols-7 border-b border-outline-variant bg-surface-container-low/50 shrink-0">
        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
          <div key={day} className="py-3 text-center border-r border-outline-variant last:border-r-0">
            <span className="text-label-md font-bold text-on-surface-variant">{day}</span>
          </div>
        ))}
      </div>

      {/* Grid Body */}
      <div className="grid grid-cols-7 auto-rows-fr flex-1">
        {days.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isCurrentDay = isToday(day);
          
          // Find tasks for this day
          const dayTasks = tasks.filter(task => task.dueDate && isSameDay(new Date(task.dueDate), day));

          return (
            <div 
              key={day.toString()} 
              className={`
                min-h-[100px] border-r border-b border-outline-variant p-2 transition-colors cursor-pointer group flex flex-col overflow-hidden
                ${!isCurrentMonth ? "bg-surface-container-low/20 opacity-50" : "hover:bg-surface-container-low"}
                ${isCurrentDay ? "bg-secondary-container/10 ring-2 ring-primary ring-inset z-10" : ""}
              `}
            >
              <span className={`text-label-md ${isCurrentDay ? "font-bold text-primary" : (isCurrentMonth ? "font-medium" : "")}`}>
                {format(day, dateFormat)}
              </span>
              
              <div className="mt-1 space-y-1 overflow-y-auto flex-1 no-scrollbar pb-1">
                {dayTasks.map(task => (
                  <div 
                    key={task.id}
                    title={task.title}
                    className={`
                      text-[10px] p-1.5 rounded-md font-bold truncate shadow-sm hover:brightness-110
                      ${task.status === "Pending" ? "bg-primary text-white" : "bg-surface-container-highest text-on-surface-variant line-through"}
                    `}
                  >
                    {task.title}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Footer */}
      <div className="shrink-0 m-4 flex items-center justify-between bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-primary mr-2"></span>
            <span className="text-label-md font-bold text-on-surface-variant">Pending</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-surface-container-highest mr-2"></span>
            <span className="text-label-md font-bold text-on-surface-variant">Completed</span>
          </div>
        </div>
        <div className="text-label-md text-on-surface-variant">
          {isLoading ? "Loading..." : `Showing ${tasks.length} tasks`}
        </div>
      </div>
    </div>
  );
}
