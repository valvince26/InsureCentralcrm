import SettingsHeader from "@/features/settings/components/SettingsHeader";
import SettingsSidebar from "@/features/settings/components/SettingsSidebar";
import DispositionRulesTable from "@/features/settings/components/DispositionRulesTable";
import WebhookPreview from "@/features/settings/components/WebhookPreview";
import QuickConfiguration from "@/features/settings/components/QuickConfiguration";

export default function SettingsPage() {
  return (
    <div className="max-w-[1440px] mx-auto p-8 w-full">
      <SettingsHeader />
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Vertical Tabs */}
        <SettingsSidebar />
        
        {/* Active Content View: Disposition Rules */}
        <DispositionRulesTable />
      </div>

      {/* Developer Reference / API section */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <WebhookPreview />
        <QuickConfiguration />
      </section>
    </div>
  );
}
