import ContactsHeader from "@/features/contacts/components/ContactsHeader";
import ContactsFilters from "@/features/contacts/components/ContactsFilters";
import ContactsTable from "@/features/contacts/components/ContactsTable";
import ContactsPagination from "@/features/contacts/components/ContactsPagination";
import ContactsMiniWidgets from "@/features/contacts/components/ContactsMiniWidgets";

export default function ContactsPage() {
  return (
    <section className="flex-1 p-8 overflow-y-auto custom-scrollbar">
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
