import SettingsHeader from "@/features/settings/components/SettingsHeader";
import SettingsSidebar from "@/features/settings/components/SettingsSidebar";
import DispositionRulesTable from "@/features/settings/components/DispositionRulesTable";
import WebhookPreview from "@/features/settings/components/WebhookPreview";
import QuickConfiguration from "@/features/settings/components/QuickConfiguration";
import GeneralSettings from "@/features/settings/components/GeneralSettings";
import BrandingSettings from "@/features/settings/components/BrandingSettings";
import BusinessHours from "@/features/settings/components/BusinessHours";
import EmailSettings from "@/features/settings/components/EmailSettings";
import UserPermissions from "@/features/settings/components/UserPermissions";
import PhoneSettings from "@/features/settings/components/PhoneSettings";
import LeadDistribution from "@/features/settings/components/LeadDistribution";
import PipelinesSettings from "@/features/settings/components/PipelinesSettings";
import TagsSettings from "@/features/settings/components/TagsSettings";
import CustomFieldsSettings from "@/features/settings/components/CustomFieldsSettings";
import SystemHealth from "@/features/settings/components/SystemHealth";
import TeamsSettings from "@/features/settings/components/TeamsSettings";

export default async function SettingsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const tab = typeof searchParams.tab === 'string' ? searchParams.tab : 'general';

  return (
    <div className="max-w-[1440px] mx-auto p-8 w-full">
      <SettingsHeader />
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Vertical Tabs */}
        <SettingsSidebar />
        
        {/* Active Content View */}
        <div className="flex-1 w-full">
          {tab === 'general' && <GeneralSettings />}
          {tab === 'branding' && <BrandingSettings />}
          {tab === 'business_hours' && <BusinessHours />}
          {tab === 'email' && <EmailSettings />}
          
          {tab === 'dispositions' && <DispositionRulesTable />}
          {tab === 'phone' && <PhoneSettings />}
          {tab === 'distribution' && <LeadDistribution />}
          {tab === 'users' && <UserPermissions />}
          {tab === 'teams' && <TeamsSettings />}
          
          {tab === 'pipelines' && <PipelinesSettings />}
          {tab === 'tags' && <TagsSettings />}
          {tab === 'custom_fields' && <CustomFieldsSettings />}
          
          {tab === 'api' && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <WebhookPreview />
              <QuickConfiguration />
            </section>
          )}
          {tab === 'system_health' && <SystemHealth />}
        </div>
      </div>
    </div>
  );
}
