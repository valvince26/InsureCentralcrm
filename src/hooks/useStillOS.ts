'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Contact } from '@/store/crmStore';

export interface StillOSStats {
  total_leads: number;
  hot_leads: number;
  warm_leads: number;
  contacts: number;
  opportunities: number;
  conversations: number;
  unread_conversations: number;
  est_pipeline_commission: number;
  expected_policies: number;
  last_sync: string | null;
  outbound_sends: number;
}

interface ContactsResponse {
  contacts: RawContact[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

interface RawContact {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  source: string;
  classification: string;
  status: string;
  assignedTo: string;
  tags: string[];
  dateAdded: string | null;
  dob: string | null;
}

function toStoreContact(r: RawContact): Contact {
  const cls = r.classification;
  const statusBg =
    cls === 'HOT' ? 'bg-red-50 text-red-700' :
    cls === 'WARM' ? 'bg-amber-50 text-amber-700' :
    'bg-gray-50 text-gray-600';
  const statusDot =
    cls === 'HOT' ? 'bg-red-500' :
    cls === 'WARM' ? 'bg-amber-500' :
    'bg-gray-400';
  const lastCalled = r.dateAdded
    ? new Date(r.dateAdded).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '—';

  return {
    id: r.id,
    initials: r.initials || '??',
    bgInitials: 'bg-primary-container',
    textInitials: 'text-on-primary-container',
    name: r.name,
    phone: r.phone,
    email: r.email || '—',
    state: r.state,
    source: r.source,
    sourceBg: 'bg-blue-50 text-blue-700',
    ownerName: r.assignedTo ? r.assignedTo.slice(0, 8) : 'Unassigned',
    campaign: r.tags?.[0] || 'Final Expense',
    status: r.status,
    statusBg,
    statusDot,
    disposition: r.classification,
    lastCalled,
    followUp: cls === 'HOT' ? 'Today' : cls === 'WARM' ? 'This week' : '—',
    followUpColor: cls === 'HOT' ? 'text-error' : 'text-primary',
  };
}

export function useStillOSContacts(page = 1, limit = 50, classification = '', state = '') {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (classification) params.set('classification', classification);
      if (state) params.set('state', state);
      const res = await fetch(`/api/stillos/contacts?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: ContactsResponse = await res.json();
      setContacts(data.contacts.map(toStoreContact));
      setTotal(data.total);
      setPages(data.pages);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [page, limit, classification, state]);

  useEffect(() => { fetch_(); }, [fetch_]);

  return { contacts, total, pages, loading, error, refetch: fetch_ };
}

export function useStillOSStats() {
  const [stats, setStats] = useState<StillOSStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stillos/stats')
      .then(r => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { stats, loading };
}
