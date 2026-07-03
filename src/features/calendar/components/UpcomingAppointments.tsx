"use client";

import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { getUpcomingTasks } from "../actions/calendar.actions";

export default function UpcomingAppointments() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchTasks() {
      try {
        const upcoming = await getUpcomingTasks(3);
        if (isMounted) setTasks(upcoming);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchTasks();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-label-lg">Upcoming</h3>
        <button className="text-primary text-label-md font-bold hover:underline cursor-pointer">View All</button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-label-md text-on-surface-variant">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-label-md text-on-surface-variant">No upcoming tasks.</div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="group cursor-pointer">
              <div className="flex gap-4">
                <div className="flex flex-col items-center min-w-[40px]">
                  <span className="text-label-sm font-bold text-primary">{format(new Date(task.dueDate), "MMM")}</span>
                  <span className="text-title-lg font-bold text-on-surface">{format(new Date(task.dueDate), "dd")}</span>
                </div>
                <div className="flex-1 border-l-2 border-primary/20 pl-4 group-hover:border-primary transition-colors">
                  <div className="text-label-sm text-on-surface-variant font-bold mb-1">
                    {format(new Date(task.dueDate), "p")}
                  </div>
                  <div className="font-bold text-label-md text-on-surface mb-1 group-hover:text-primary transition-colors">
                    {task.title}
                  </div>
                  {task.contact && (
                    <div className="flex items-center text-label-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-[14px] mr-1">person</span>
                      {task.contact.firstName} {task.contact.lastName}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
