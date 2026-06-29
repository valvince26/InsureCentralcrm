import ReportsHeader from "@/features/reports/components/ReportsHeader";
import ReportsKPIs from "@/features/reports/components/ReportsKPIs";
import ConversionTrendsChart from "@/features/reports/components/ConversionTrendsChart";
import DispositionPieChart from "@/features/reports/components/DispositionPieChart";
import LeadSourcePerformance from "@/features/reports/components/LeadSourcePerformance";
import TopPerformingAgents from "@/features/reports/components/TopPerformingAgents";
import ReportsFooter from "@/features/reports/components/ReportsFooter";
import ReportsFAB from "@/features/reports/components/ReportsFAB";
import { getReportMetrics } from "@/features/reports/actions/reports.actions";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const metrics = await getReportMetrics();

  return (
    <div className="p-8 space-y-6 max-w-[1440px] mx-auto w-full pb-24">
      <ReportsHeader topAgents={metrics.topAgents} />
      
      {/* Top Level KPIs */}
      <ReportsKPIs kpis={metrics.kpis} />

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ConversionTrendsChart />
        <DispositionPieChart />
      </div>

      {/* Secondary Data Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadSourcePerformance />
        <TopPerformingAgents agents={metrics.topAgents} />
      </div>

      <ReportsFooter />
      <ReportsFAB />
    </div>
  );
}
