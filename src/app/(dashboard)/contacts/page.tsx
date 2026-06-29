import ContactsHeader from "@/features/contacts/components/ContactsHeader";
import ContactsFilters from "@/features/contacts/components/ContactsFilters";
import ContactsTable from "@/features/contacts/components/ContactsTable";
import ContactsPagination from "@/features/contacts/components/ContactsPagination";

export const dynamic = "force-dynamic";
import ContactsMiniWidgets from "@/features/contacts/components/ContactsMiniWidgets";
import ContactsInitializer from "@/features/contacts/components/ContactsInitializer";
import { getContacts } from "@/features/contacts/actions/contacts.actions";

// Colors for UI mapping
const colors = [
  { bg: "bg-primary-container", text: "text-on-primary-container" },
  { bg: "bg-secondary-container", text: "text-on-secondary-container" },
  { bg: "bg-tertiary-container", text: "text-on-tertiary-container" },
  { bg: "bg-surface-variant", text: "text-on-surface-variant" },
  { bg: "bg-error-container", text: "text-on-error-container" }
];

export default async function ContactsPage() {
  const rawContacts = await getContacts();
  
  // Map Prisma models to UI store interface
  const contacts = rawContacts.map((c: any, i: number) => {
    const color = colors[i % colors.length];
    
    // Status color mapping
    const statusBg = c.status === "New" ? "bg-green-50 text-green-700" 
      : c.status === "Working" ? "bg-blue-50 text-blue-700"
      : c.status === "Closed" ? "bg-gray-50 text-gray-500"
      : "bg-gray-50 text-gray-700";
    
    const statusDot = c.status === "New" ? "bg-green-500"
      : c.status === "Working" ? "bg-blue-500"
      : c.status === "Closed" ? "bg-gray-400"
      : "bg-gray-400";

    // Source color mapping
    const sourceBg = c.source?.includes("Facebook") ? "bg-blue-50 text-blue-700"
      : c.source?.includes("Google") ? "bg-orange-50 text-orange-700"
      : c.source?.includes("Referral") ? "bg-purple-50 text-purple-700"
      : "bg-gray-50 text-gray-700";

    return {
      id: c.id,
      initials: `${c.firstName?.charAt(0) || ""}${c.lastName?.charAt(0) || ""}`.toUpperCase() || "?",
      bgInitials: color.bg,
      textInitials: color.text,
      name: `${c.firstName || ""} ${c.lastName || ""}`.trim(),
      phone: c.phone || "-",
      email: c.email || "-",
      state: c.state || "-",
      source: c.source || "Unknown",
      sourceBg,
      ownerInitials: c.assignedUser ? `${c.assignedUser.firstName?.charAt(0) || ""}${c.assignedUser.lastName?.charAt(0) || ""}`.toUpperCase() : "?",
      ownerName: c.assignedUser ? `${c.assignedUser.firstName || ""} ${c.assignedUser.lastName || ""}`.trim() : "Unassigned",
      campaign: c.campaign?.name || "-",
      status: c.status || "Unknown",
      statusBg,
      statusDot,
      disposition: c.disposition || "-",
      lastCalled: "Never", // Will hook up to CallLog later
      followUp: "-", // Will hook up to Tasks later
      followUpColor: "text-on-surface-variant"
    };
  });

  return (
    <section className="flex-1 p-8 overflow-y-auto custom-scrollbar">
      <ContactsInitializer contacts={contacts} />
      
      <div className="mb-6 flex flex-col gap-6">
        <ContactsHeader />
        <ContactsFilters />
      </div>

      {/* Contacts Table Container */}
      <div className="bg-white rounded-xl border border-outline-variant table-shadow overflow-hidden flex flex-col">
        <ContactsTable />
        <ContactsPagination />
      </div>

      <ContactsMiniWidgets />
    </section>
  );
}
