import KPIStats from "@/components/dashboard/KPIStats";
import CallActivityChart from "@/components/dashboard/CallActivityChart";
import AgentLeaderboard from "@/components/dashboard/AgentLeaderboard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import FollowUps from "@/components/dashboard/FollowUps";

export default function Dashboard() {
  return (
    <>
      <div className="p-8 space-y-8 max-w-[1440px] mx-auto w-full">
        <KPIStats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <CallActivityChart />
          <AgentLeaderboard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8">
          <RecentActivity />
          <FollowUps />
        </div>
      </div>
      {/* Contextual FAB - Dashboard Primary Action */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 cursor-pointer">
        <span className="material-symbols-outlined text-[28px]" data-icon="add">add</span>
      </button>
    </>
  );
}
