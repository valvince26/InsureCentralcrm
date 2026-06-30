"use client";

import { useEffect } from "react";
import { useCrmStore } from "@/store/crmStore";

export default function ContactsInitializer({ contacts }: { contacts: any[] }) {
  useEffect(() => {
    useCrmStore.setState((state) => ({ 
      contacts, 
      // Ensure we don't accidentally wipe out selectedIds unless they were deleted
      selectedIds: state.selectedIds.filter(id => contacts.some(c => c.id === id))
    }));
  }, [contacts]);

  return null;
}
