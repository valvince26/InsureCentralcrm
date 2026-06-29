import SettingsHeader from "@/features/settings/components/SettingsHeader";
import SettingsSidebar from "@/features/settings/components/SettingsSidebar";
import DispositionRulesTable from "@/features/settings/components/DispositionRulesTable";
import WebhookPreview from "@/features/settings/components/WebhookPreview";
import QuickConfiguration from "@/features/settings/components/QuickConfiguration";
import GeneralSettings from "@/features/settings/components/GeneralSettings";
import UserPermissions from "@/features/settings/components/UserPermissions";
import PhoneSettings from "@/features/settings/components/PhoneSettings";
import LeadDistribution from "@/features/settings/components/LeadDistribution";

export default async function SettingsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const tab = typeof searchParams.tab === 'string' ? searchParams.tab : 'dispositions';

  return (
    <div className="max-w-[1440px] mx-auto p-8 w-full">
      <SettingsHeader />
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Vertical Tabs */}
        <SettingsSidebar />
        
        {/* Active Content View */}
        <div className="flex-1 w-full">
          {tab === 'dispositions' && <DispositionRulesTable />}
          {tab === 'general' && <GeneralSettings />}
          {tab === 'phone' && <PhoneSettings />}
          {tab === 'distribution' && <LeadDistribution />}
          {tab === 'users' && <UserPermissions />}
          {tab === 'api' && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <WebhookPreview />
              <QuickConfiguration />
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
