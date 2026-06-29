import CalendarHeader from "@/features/calendar/components/CalendarHeader";
import MiniCalendar from "@/features/calendar/components/MiniCalendar";
import UpcomingAppointments from "@/features/calendar/components/UpcomingAppointments";
import CalendarKPI from "@/features/calendar/components/CalendarKPI";
import MainCalendarGrid from "@/features/calendar/components/MainCalendarGrid";

export default function CalendarPage() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto w-full">
      <CalendarHeader />
      
      {/* Dashboard Layout: Calendar + Sidebar */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Left Sidebar Components */}
        <div className="col-span-12 lg:col-span-3 space-y-8">
          <MiniCalendar />
          <UpcomingAppointments />
          <CalendarKPI />
        </div>
        
        {/* Main Calendar Grid */}
        <div className="col-span-12 lg:col-span-9">
          <MainCalendarGrid />
        </div>
        
      </div>
    </div>
  );
}
