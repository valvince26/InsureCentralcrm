import React from "react";

export default function TeamTable() {
  const members = [
    {
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCon9mGMtLXuhhiIAq42rjHJiu0ozV1VrcFY12cENpF8KBS-qJz7zrRosiOeDg1Lkx2dcYol9ZgPWxnMJ-EV68bVXeWoeePs-A38QKJhFYTifIO1ZFveApJS46Z43OyFQDTkuyjs7ep7I1jmQapoT2M05L0fyz5p30couNXySjDLF9X82vKA3_lTaXdlH_HqqTp8hGvdENcmZrGCW2VH-toa0-nCpxkxyaxKofFwhegn-XlxgAWLeCSRcOc0XlBcyS2cz40feI-eVxk",
      name: "Michael Chen",
      email: "michael.c@insureflow.com",
      roleBadge: "bg-primary-fixed text-on-primary-fixed-variant",
      role: "Admin",
      team: "Headquarters",
      statusColor: "bg-[#00A6A6]",
      status: "Active",
      performanceValue: 94,
      performanceColor: "bg-[#00A6A6]",
      performanceTextColor: "text-[#00A6A6]"
    },
    {
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnIufipEFHJRun-eZ-mVS7v3FzXFHmO8p8rgXDVOlIsDtAvH7GqJxATpE3BHyKpkfoUsoqEcrahgU7zThM10oZzuIiEjChsR8vGVKFBV8qJFT0ng4h9rsJ_01OJo4-3JOnrm8IohZOzup2e5nqIeZk6AT6PrpsE9fy434kijBRJE5RrYlB-GaPlhJyV8aBdtJAK7XMH2ff8OE43-yRWuxhD77TAAuiERv1YsHFqOz2vKcS9zSu1TLqQ1r6_54S_4ZkXkmO5KnK7UTA",
      name: "Elena Rodriguez",
      email: "e.rodriguez@insureflow.com",
      roleBadge: "bg-surface-container-highest text-on-surface-variant",
      role: "Manager",
      team: "South-West Region",
      statusColor: "bg-secondary-fixed-dim",
      status: "Away",
      performanceValue: 82,
      performanceColor: "bg-primary",
      performanceTextColor: "text-primary"
    },
    {
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSboNvi4RBQFYsVQ00-nMAzg8K9kI9-KCu97rFY_nhPddAUKred6JvQ5-5u3A8hDndDDLgWyi-eyLoccc4-W3vy6OeNH9qf9CnZzrO8g6cuJ9lIMs-HN6G_CFpSN9Y5BWn33FM0VQhxw6w9CjQGWBp8WFB9b_513DUTk963wMILz5oinYiwdV5C-QfSvQIdNpzjialOwuymFTyop3Oh3Lw0wNCzCr6v3Dvg8p_Ob9FNWUbawcD2ncYCat_KtkcGKpzFQ2MdSwDL_EO",
      name: "Jordan Smith",
      email: "jordan.smith@insureflow.com",
      roleBadge: "bg-surface-container-highest text-on-surface-variant",
      role: "Agent",
      team: "Auto Insurance",
      statusColor: "bg-[#00A6A6]",
      status: "Active",
      performanceValue: 98,
      performanceColor: "bg-[#00A6A6]",
      performanceTextColor: "text-[#00A6A6]"
    },
    {
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXtzvIwpMg10RTihFCwNnQHbXA4mZCOiN1yGwYl7L-kKcnbOamzBuT7Y3IOBElnghyDAItSRiaR1E5pvsPmW0w7bgZmjHL-HTwKvJX1XQmFEFVyA9rLzAEn6FSzcXraEbpY-T8hukqaY0_kZIbY0UBwq4yu8IAd11pz5iaVvXlhUduE5yw66I9v_uzKRflCpyspg2PIDPwQ7bWM9abpDQI5OtQqq3Z0i3El7uIssdiaGCFLFTuszuXGAZ1pklhJNFRDPrlAvKYGRT5",
      name: "Lisa Wong",
      email: "lisa.w@insureflow.com",
      roleBadge: "bg-surface-container-highest text-on-surface-variant",
      role: "Agent",
      team: "Life & Health",
      statusColor: "bg-outline-variant",
      statusTextClass: "text-outline",
      status: "Offline",
      performanceValue: 45,
      performanceColor: "bg-error",
      performanceTextColor: "text-error"
    }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-surface-container-low text-on-surface-variant text-label-md font-semibold uppercase tracking-wider">
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Team</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Performance</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {members.map((member, i) => (
            <tr key={i} className="hover:bg-surface-container-lowest transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img alt="" className="w-10 h-10 rounded-full bg-surface-container-high object-cover" src={member.avatar} />
                  <div>
                    <p className="text-body-md font-semibold">{member.name}</p>
                    <p className="text-label-md text-outline">{member.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 ${member.roleBadge} rounded text-[11px] font-bold uppercase tracking-tight`}>{member.role}</span>
              </td>
              <td className="px-6 py-4 text-body-md text-on-surface-variant font-medium">{member.team}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${member.statusColor}`}></span>
                  <span className={`text-body-md ${member.statusTextClass || "text-on-surface"} font-medium`}>{member.status}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                    <div className={`h-full ${member.performanceColor}`} style={{ width: `${member.performanceValue}%` }}></div>
                  </div>
                  <span className={`text-[10px] font-bold ${member.performanceTextColor} mt-1`}>{member.performanceValue}% Target</span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-outline hover:text-primary transition-colors p-1 cursor-pointer">
                  <span className="material-symbols-outlined">more_vert</span>
                </button>
              </td>
            </tr>
          ))}
          
          {/* Pending Invite Row */}
          <tr className="hover:bg-surface-container-lowest transition-colors">
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
                  <span className="material-symbols-outlined text-outline">person</span>
                </div>
                <div>
                  <p className="text-body-md font-semibold">David Okoro</p>
                  <p className="text-label-md text-outline italic">Pending Invitation...</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <span className="px-2 py-1 bg-surface-container-highest text-on-surface-variant rounded text-[11px] font-bold uppercase tracking-tight">Agent</span>
            </td>
            <td className="px-6 py-4 text-body-md text-on-surface-variant font-medium">Customer Success</td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[18px]">hourglass_empty</span>
                <span className="text-body-md text-tertiary font-medium">Pending</span>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col items-center opacity-40">
                <div className="w-24 h-1.5 bg-outline-variant rounded-full overflow-hidden"></div>
                <span className="text-[10px] font-bold mt-1">N/A</span>
              </div>
            </td>
            <td className="px-6 py-4 text-right text-primary font-medium text-body-md">
              <button className="hover:underline cursor-pointer">Resend</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
