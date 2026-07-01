import ContactsHeader from "@/features/contacts/components/ContactsHeader";
import ContactsFilters from "@/features/contacts/components/ContactsFilters";
import ContactsTable from "@/features/contacts/components/ContactsTable";
import ContactsPagination from "@/features/contacts/components/ContactsPagination";
import ContactsMiniWidgets from "@/features/contacts/components/ContactsMiniWidgets";
import ContactsInitializer from "@/features/contacts/components/ContactsInitializer";
import { getContacts } from "@/features/contacts/actions/contacts.actions";

export const dynamic = "force-dynamic";

export default async function ContactsPage() {
  const contacts = await getContacts();
  
  // Map Prisma models to Zustand Contact schema if needed, but we can do it in the action or here.
  // The store expects: id, name, phone, email, state, source, ownerName, campaign, status, disposition, etc.
  const mappedContacts = contacts.map((c: any) => ({
    id: c.id,
    initials: (c.firstName.charAt(0) + (c.lastName ? c.lastName.charAt(0) : '')).toUpperCase(),
    bgInitials: "bg-primary-container",
    textInitials: "text-on-primary-container",
    name: `${c.firstName} ${c.lastName || ''}`.trim(),
    phone: c.phone || '—',
    email: c.email || '—',
    state: c.state || '—',
    source: c.source || 'Manual',
    sourceBg: "bg-blue-50 text-blue-700",
    ownerName: c.assignedUser ? `${c.assignedUser.firstName || ''} ${c.assignedUser.lastName || ''}`.trim() || c.assignedUser.email : "Unassigned",
    campaign: c.campaign?.name || "None",
    status: c.status || "New",
    statusBg: c.status === "New" ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-700",
    statusDot: c.status === "New" ? "bg-green-500" : "bg-gray-500",
    disposition: c.disposition || "None",
    lastCalled: "Never", // Could map to c.callLogs if we included them
    followUp: "-",
    followUpColor: "text-on-surface-variant",
    tags: c.tags || []
  }));

  return (
    <section className="flex-1 p-8 overflow-y-auto custom-scrollbar">
      <ContactsInitializer contacts={mappedContacts} />

      <div className="mb-6 flex flex-col gap-6">
        <ContactsHeader />
        <ContactsFilters />
      </div>

      <div className="bg-white rounded-xl border border-outline-variant table-shadow overflow-hidden flex flex-col">
        <ContactsTable />
        <ContactsPagination />
      </div>

      <ContactsMiniWidgets />
    </section>
  );
}
