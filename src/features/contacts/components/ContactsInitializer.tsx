"use client";

import { useRef } from "react";
import { useCrmStore } from "@/store/crmStore";

export default function ContactsInitializer({ contacts }: { contacts: any[] }) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useCrmStore.setState({ contacts, selectedIds: [] });
    initialized.current = true;
  }

  return null;
}
