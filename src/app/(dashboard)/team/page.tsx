import TeamHeader from "@/features/team/components/TeamHeader";
import TeamStats from "@/features/team/components/TeamStats";
import TeamTabs from "@/features/team/components/TeamTabs";
import TeamTableControls from "@/features/team/components/TeamTableControls";
import TeamTable from "@/features/team/components/TeamTable";
import TeamPagination from "@/features/team/components/TeamPagination";

export const dynamic = "force-dynamic";

export default function TeamPage() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto w-full">
      <TeamHeader />
      <TeamStats />
      
      {/* Content Area: Table and Controls */}
      <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden flex flex-col">
        <TeamTabs />
        <TeamTableControls />
        <TeamTable />
        <TeamPagination />
      </div>
    </div>
  );
}
