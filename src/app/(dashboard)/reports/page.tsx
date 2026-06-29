import ReportsHeader from "@/features/reports/components/ReportsHeader";
import ReportsKPIs from "@/features/reports/components/ReportsKPIs";
import ConversionTrendsChart from "@/features/reports/components/ConversionTrendsChart";
import DispositionPieChart from "@/features/reports/components/DispositionPieChart";
import LeadSourcePerformance from "@/features/reports/components/LeadSourcePerformance";
import TopPerformingAgents from "@/features/reports/components/TopPerformingAgents";
import ReportsFooter from "@/features/reports/components/ReportsFooter";
import ReportsFAB from "@/features/reports/components/ReportsFAB";

export default function ReportsPage() {
  return (
    <div className="p-8 max-w-[1440px] mx-auto w-full">
      <ReportsHeader />
      <ReportsKPIs />
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ConversionTrendsChart />
        <DispositionPieChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <LeadSourcePerformance />
        <TopPerformingAgents />
      </div>

      <ReportsFooter />
      <ReportsFAB />
    </div>
  );
}
