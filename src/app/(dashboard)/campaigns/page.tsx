import CampaignsHeader from "@/features/campaigns/components/CampaignsHeader";
import CampaignKPIs from "@/features/campaigns/components/CampaignKPIs";
import CampaignTable from "@/features/campaigns/components/CampaignTable";
import CampaignInsights from "@/features/campaigns/components/CampaignInsights";

export default function CampaignsPage() {
  return (
    <div className="p-8 space-y-8 max-w-[1440px] mx-auto w-full">
      <CampaignsHeader />
      <CampaignKPIs />
      <CampaignTable />
      <CampaignInsights />
    </div>
  );
}
