"use client";

import React, { useState, useEffect } from "react";
import { getOrganizationUsers, updateUserRole, inviteUser } from "../actions/user.actions";

export default function UserPermissions() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getOrganizationUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleRoleChange = async (userId: string, role: string) => {
    if (!confirm(`Are you sure you want to change this user's role to ${role}?`)) return;
    try {
      await updateUserRole(userId, role as any);
      setUsers(users.map(u => u.id === userId ? { ...u, role } : u));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleInviteUser = async () => {
    const email = prompt("Enter the email address of the user you want to invite:");
    if (!email) return;
    
    const firstName = prompt("Enter their first name:") || "New";
    const lastName = prompt("Enter their last name:") || "User";
    
    try {
      await inviteUser(email, firstName, lastName, "AGENT");
      alert(`Successfully invited ${email}! They will be added to the team once they sign in.`);
      // Refresh the list
      const data = await getOrganizationUsers();
      setUsers(data);
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-on-surface-variant">Loading users...</div>;
  }

  return (
    <div className="bg-surface-container rounded-xl border border-outline-variant/30 overflow-hidden">
      <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center">
        <div>
          <h2 className="text-title-md font-bold text-on-surface">Users & Permissions</h2>
          <p className="text-body-sm text-on-surface-variant mt-1">Manage team members and their access levels.</p>
        </div>
        <button onClick={handleInviteUser} className="bg-primary hover:bg-primary/90 text-on-primary font-label-md px-4 py-2 rounded-lg transition-colors cursor-pointer">
          Invite User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-surface-container-highest border-b border-outline-variant/30 text-label-sm text-on-surface-variant">
            <tr>
              <th className="px-6 py-3 font-semibold">User</th>
              <th className="px-6 py-3 font-semibold">Email</th>
              <th className="px-6 py-3 font-semibold">Role</th>
              <th className="px-6 py-3 font-semibold">Team</th>
              <th className="px-6 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-surface-container-high transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-label-sm">
                      {user.firstName?.charAt(0) || "U"}
                    </div>
                    <span className="font-semibold text-on-surface">{user.firstName} {user.lastName}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-on-surface-variant text-body-sm">{user.email}</td>
                <td className="px-6 py-4">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-transparent border border-outline-variant/50 rounded px-2 py-1 text-body-sm text-on-surface"
                  >
                    <option value="SUPER_ADMIN">Super Admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="AGENT">Agent</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-on-surface-variant text-body-sm">
                  {user.team?.name || "Unassigned"}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:text-primary/80 font-label-sm">Edit</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
