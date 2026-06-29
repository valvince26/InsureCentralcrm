import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Contact {
  id: string;
  initials: string;
  bgInitials: string;
  textInitials: string;
  name: string;
  phone: string;
  email: string;
  state: string;
  source: string;
  sourceBg: string;
  ownerPhoto?: string;
  ownerInitials?: string;
  ownerName: string;
  campaign: string;
  status: string;
  statusBg: string;
  statusDot: string;
  disposition: string;
  lastCalled: string;
  followUp: string;
  followUpColor: string;
}

interface CrmState {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  updateContact: (id: string, updated: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  importContacts: (newContacts: Contact[]) => void;

  // New Selection State
  selectedIds: string[];
  toggleSelection: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  bulkDelete: () => void;

  // Filters State
  filters: { state: string; owner: string; campaign: string };
  setFilter: (key: keyof CrmState["filters"], value: string) => void;

  // Pagination State
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (rows: number) => void;
}

const initialContacts: Contact[] = [
  {
    id: "1",
    initials: "AW",
    bgInitials: "bg-secondary-container",
    textInitials: "text-on-secondary-container",
    name: "Adrian Walker",
    phone: "(555) 012-3456",
    email: "adrian.w@example.com",
    state: "TX",
    source: "Facebook Ads",
    sourceBg: "bg-blue-50 text-blue-700",
    ownerPhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLV4cpX5GYsHdBfM49skj4kVbTRtB8a6tqZUgK3wA225nh3XNbctgSxiyps7RlVqhOoLRzihbZMXBJzUVAsVTS4qJ0TbgZZWYBqWBNrilMUkZAXZ8zw5zBVNqT_jQGs0NyGs2XEkTYmqUtfZpJhvpaj6ejXrB0E_H71T1VxWDmrLWTBzhj_ZzAZNQ7DZuI2llzisaCUXpeBKYu6mSTWkXjWqplEagpOqt4ffnUa_-WH1rxtc0GGJhIx-reVNdNRjTjyQMibViieQnI",
    ownerName: "Sarah Miller",
    campaign: "Auto Renewal Q4",
    status: "New Lead",
    statusBg: "bg-green-50 text-green-700",
    statusDot: "bg-green-500",
    disposition: "Interested",
    lastCalled: "2h ago",
    followUp: "Tomorrow",
    followUpColor: "text-primary"
  },
  {
    id: "2",
    initials: "BM",
    bgInitials: "bg-primary-container",
    textInitials: "text-on-primary-container",
    name: "Bethany Moore",
    phone: "(555) 987-6543",
    email: "beth.m@mail.com",
    state: "CA",
    source: "Referral",
    sourceBg: "bg-purple-50 text-purple-700",
    ownerInitials: "JD",
    ownerName: "John Doe",
    campaign: "Home Bundle",
    status: "Contacting",
    statusBg: "bg-amber-50 text-amber-700",
    statusDot: "bg-amber-500",
    disposition: "Voice Mail",
    lastCalled: "1d ago",
    followUp: "Today, 2PM",
    followUpColor: "text-error"
  },
  {
    id: "3",
    initials: "CL",
    bgInitials: "bg-tertiary-container",
    textInitials: "text-white",
    name: "Corey Lawson",
    phone: "(555) 234-5678",
    email: "corey.l@test.com",
    state: "FL",
    source: "Organic",
    sourceBg: "bg-gray-50 text-gray-700",
    ownerPhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuAc-QOJgRI5TLKFE-yPhhcMAHKDf3EtCvAM93sTBCE9C78W-Jof4qlQRPYE3au1T3tuu7Llq7DmeQb-TgLkpyL5APdtdSBNesxH82jUtZOxqMzu5oSwRrtL8LiEFpQM8xJS_JL2fTuisdxQxgh2_uxIkTnnNZmQeMXFQb-o96Bdu3i3xtWSyVUO80uek1klfht5a_v5PSuxuAcVKxS2JeYLiE93zhiAsRxnnAHzaCQ7ZlfSFJXx8OnD7adL34464LFZvbQL0YOwwios",
    ownerName: "Mike Ross",
    campaign: "Life Event Lead",
    status: "High Priority",
    statusBg: "bg-red-50 text-red-700",
    statusDot: "bg-red-500",
    disposition: "Call Back",
    lastCalled: "45m ago",
    followUp: "In 30m",
    followUpColor: "text-primary"
  },
  {
    id: "4",
    initials: "DS",
    bgInitials: "bg-surface-container-highest",
    textInitials: "text-on-surface-variant",
    name: "Dana Smith",
    phone: "(555) 777-8899",
    email: "dana.smith@provider.net",
    state: "NY",
    source: "Google Ads",
    sourceBg: "bg-orange-50 text-orange-700",
    ownerInitials: "JD",
    ownerName: "John Doe",
    campaign: "Auto Renewal Q4",
    status: "Working",
    statusBg: "bg-blue-50 text-blue-700",
    statusDot: "bg-blue-500",
    disposition: "Negotiation",
    lastCalled: "3d ago",
    followUp: "Friday",
    followUpColor: "text-on-surface-variant"
  },
  {
    id: "5",
    initials: "EF",
    bgInitials: "bg-green-100",
    textInitials: "text-green-700",
    name: "Evan Foster",
    phone: "(555) 444-3322",
    email: "evan@foster.io",
    state: "OH",
    source: "Linkedin",
    sourceBg: "bg-blue-50 text-blue-700",
    ownerPhoto: "https://lh3.googleusercontent.com/aida-public/AB6AXuDC1SRkf0O9stBvHwUCVJzfQQzzdoAndPNrZDdShvWr_cIg1hqYvhrU78kTUgqk1Zf-QT6UehpnxUCmGfSHRgBQgpUKqtnsnJ6ZeMS15lZy_tkYxmIr-P44FKu5aWAxsw9zuoSSfXaPP8ZGZfKu3mVRyvdEKnunCirHPUw6LZVQAolwnqsn81uVGGk2qGvhzOi2hbcn5L9fDofETRMS9etE8yndh6bILJPLKSJHBXiIon-gKv6B1fWafWQGxU4otHMcaQeY5p6rP15O",
    ownerName: "Sarah Miller",
    campaign: "Home Bundle",
    status: "Closed",
    statusBg: "bg-gray-50 text-gray-500",
    statusDot: "bg-gray-400",
    disposition: "Purchased",
    lastCalled: "1w ago",
    followUp: "-",
    followUpColor: "text-on-surface-variant"
  }
];

export const useCrmStore = create<CrmState>()(
  persist(
    (set) => ({
      contacts: initialContacts,
      selectedIds: [],
      filters: { state: "All States", owner: "All Owners", campaign: "All Campaigns" },
      page: 1,
      rowsPerPage: 10,
      
      addContact: (contact) => 
        set((state) => ({ contacts: [contact, ...state.contacts] })),
        
      updateContact: (id, updated) =>
        set((state) => ({
          contacts: state.contacts.map((c) => (c.id === id ? { ...c, ...updated } : c)),
        })),
        
      deleteContact: (id) =>
        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== id),
          selectedIds: state.selectedIds.filter(selectedId => selectedId !== id)
        })),
        
      importContacts: (newContacts) =>
        set((state) => ({ contacts: [...newContacts, ...state.contacts] })),

      toggleSelection: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.includes(id) 
            ? state.selectedIds.filter(selId => selId !== id)
            : [...state.selectedIds, id]
        })),

      selectAll: (ids) => set({ selectedIds: ids }),
      clearSelection: () => set({ selectedIds: [] }),
      
      bulkDelete: () =>
        set((state) => ({
          contacts: state.contacts.filter(c => !state.selectedIds.includes(c.id)),
          selectedIds: []
        })),

      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
          page: 1 // Reset pagination on filter change
        })),

      setPage: (page) => set({ page }),
      setRowsPerPage: (rowsPerPage) => set({ rowsPerPage, page: 1 })
    }),
    {
      name: 'crm-storage',
      partialize: (state) => ({ 
        filters: state.filters, 
        page: state.page, 
        rowsPerPage: state.rowsPerPage 
        // Omit contacts and selectedIds from persistence
      }),
    }
  )
);
