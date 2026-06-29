"use client";

import React from "react";

export default function ContactsTable() {
  const contacts = [
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

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "INPUT" && target.tagName !== "SELECT" && target.tagName !== "BUTTON") {
      const checkbox = e.currentTarget.querySelector("input[type=\"checkbox\"]") as HTMLInputElement;
      if (checkbox) checkbox.checked = !checkbox.checked;
    }
  };

  return (
    <div className="overflow-x-auto custom-scrollbar">
      <table className="w-full text-left border-collapse min-w-[1400px]">
        <thead>
          <tr className="bg-surface-container-low border-b border-outline-variant">
            <th className="py-3 px-4 w-10">
              <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" type="checkbox" />
            </th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Name</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Phone</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Email</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-center">State</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Lead Source</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Owner</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Campaign</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Status</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Disposition</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Last Called</th>
            <th className="py-3 px-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Follow Up</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {contacts.map((c) => (
            <tr key={c.id} onClick={handleRowClick} className="hover:bg-surface-container-lowest transition-colors group cursor-pointer">
              <td className="py-4 px-4">
                <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer" type="checkbox" />
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${c.bgInitials} flex items-center justify-center ${c.textInitials} font-bold text-xs`}>{c.initials}</div>
                  <div className="font-semibold text-on-surface">{c.name}</div>
                </div>
              </td>
              <td className="py-4 px-4 text-on-surface-variant font-medium">{c.phone}</td>
              <td className="py-4 px-4 text-on-surface-variant">{c.email}</td>
              <td className="py-4 px-4 text-center">
                <span className="bg-surface-container border border-outline-variant text-[10px] font-bold px-1.5 py-0.5 rounded">{c.state}</span>
              </td>
              <td className="py-4 px-4">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.sourceBg}`}>{c.source}</span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  {c.ownerPhoto ? (
                    <img className="w-5 h-5 rounded-full" alt={c.ownerName} src={c.ownerPhoto} />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-surface-dim flex items-center justify-center text-[10px]">{c.ownerInitials}</div>
                  )}
                  <span className="text-xs">{c.ownerName}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-xs truncate max-w-[120px]">{c.campaign}</td>
              <td className="py-4 px-4">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${c.statusBg}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.statusDot}`}></span> {c.status}
                </span>
              </td>
              <td className="py-4 px-4 text-xs">{c.disposition}</td>
              <td className="py-4 px-4 text-xs text-on-surface-variant">{c.lastCalled}</td>
              <td className={`py-4 px-4 text-xs font-semibold ${c.followUpColor}`}>{c.followUp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
