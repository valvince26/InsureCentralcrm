"use client";
import { useEffect } from 'react';
import { useCrmStore } from '@/store/crmStore';
import { useStillOSContacts } from '@/hooks/useStillOS';

export default function StillOSContactsLoader() {
  const page = useCrmStore(s => s.page);
  const rowsPerPage = useCrmStore(s => s.rowsPerPage);
  const { contacts, total, loading } = useStillOSContacts(page, rowsPerPage);

  useEffect(() => {
    if (!loading) {
      useCrmStore.setState({ contacts, totalFromAPI: total, selectedIds: [] });
    }
  }, [contacts, total, loading]);

  return null;
}
