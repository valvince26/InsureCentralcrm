import React from "react";
import { getOrganizationUsers } from "@/features/settings/actions/user.actions";
import TeamRowActions from "./TeamRowActions";

export default async function TeamTable() {
  const users = await getOrganizationUsers();

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
          {users.map((user) => {
            const isPending = !user.isActive;
            const roleBadge = user.role === "SUPER_ADMIN" ? "bg-primary-fixed text-on-primary-fixed-variant"
                            : user.role === "MANAGER" ? "bg-surface-container-highest text-on-surface-variant"
                            : "bg-surface-container-highest text-on-surface-variant";
            
            const statusColor = isPending ? "bg-tertiary" : "bg-[#00A6A6]";
            const statusText = isPending ? "Pending" : "Active";
            
            return (
              <tr key={user.id} className="hover:bg-surface-container-lowest transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-on-surface-variant">
                      {user.firstName?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="text-body-md font-semibold">{user.firstName} {user.lastName}</p>
                      <p className="text-label-md text-outline">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 ${roleBadge} rounded text-[11px] font-bold uppercase tracking-tight`}>{user.role}</span>
                </td>
                <td className="px-6 py-4 text-body-md text-on-surface-variant font-medium">{user.team?.name || "Unassigned"}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {isPending ? (
                      <span className="material-symbols-outlined text-tertiary text-[18px]">hourglass_empty</span>
                    ) : (
                      <span className={`w-2 h-2 rounded-full ${statusColor}`}></span>
                    )}
                    <span className={`text-body-md font-medium ${isPending ? 'text-tertiary' : 'text-on-surface'}`}>{statusText}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`flex flex-col items-center ${isPending ? 'opacity-40' : ''}`}>
                    <div className="w-24 h-1.5 bg-outline-variant rounded-full overflow-hidden">
                      {!isPending && <div className="h-full bg-[#00A6A6]" style={{ width: `100%` }}></div>}
                    </div>
                    <span className="text-[10px] font-bold text-on-surface-variant mt-1">{isPending ? "N/A" : "100% Target"}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <TeamRowActions user={user} />
                </td>
              </tr>
            );
          })}
          
          {users.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-on-surface-variant">No team members found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
