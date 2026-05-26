import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { MOCK_USERS } from "../data/mockData";
import { RoleBadge } from "./LeadBadges";

export function UsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);

  const toggleActive = (id: string) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, isActive: !u.isActive } : u));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold" style={{ fontSize: "20px", color: "#333" }}>Users & Roles</h1>
          <p className="text-sm" style={{ color: "#6C757D" }}>{users.filter((u) => u.isActive).length} active users</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white"
          style={{ backgroundColor: "#005897" }}>
          <Plus size={15} /> Invite User
        </button>
      </div>

      {/* Roles info */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { role: "SUPER_ADMIN", desc: "Full system access" },
          { role: "CRM_MANAGER", desc: "Manage all leads" },
          { role: "MEDICAL_CONSULTANT", desc: "Medical file access" },
          { role: "SALES_CONSULTANT", desc: "Assigned leads only" },
          { role: "CONTENT_EDITOR", desc: "CMS access (Phase 2)" },
        ].map(({ role, desc }) => (
          <div key={role} className="bg-white rounded-lg p-3 text-center" style={{ border: "1px solid #DEE2E6" }}>
            <RoleBadge role={role} />
            <div className="text-xs mt-2" style={{ color: "#6C757D" }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* Users table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "#F8F9FA" }}>
              <tr>
                {["User", "Role", "Leads Assigned", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "#6C757D" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t transition-colors hover:bg-gray-50" style={{ borderColor: "#DEE2E6" }}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                        style={{ backgroundColor: "#005897" }}>
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium" style={{ color: "#333" }}>{user.name}</div>
                        <div className="text-xs" style={{ color: "#6C757D" }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-5 py-4 text-sm" style={{ color: "#333" }}>
                    {user.leadsAssigned > 0 ? (
                      <span className="font-medium">{user.leadsAssigned} leads</span>
                    ) : (
                      <span style={{ color: "#6C757D" }}>—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: user.isActive ? "#F0FFF4" : "#F8F9FA",
                        color: user.isActive ? "#198754" : "#6C757D",
                      }}>
                      {user.isActive ? "● Active" : "○ Inactive"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleActive(user.id)}
                        className="text-xs px-2 py-1 rounded font-medium transition-colors"
                        style={{
                          backgroundColor: user.isActive ? "#FFF3F3" : "#F0FFF4",
                          color: user.isActive ? "#DC3545" : "#198754",
                        }}>
                        {user.isActive ? "Deactivate" : "Activate"}
                      </button>
                      <button className="p-1 rounded hover:bg-gray-100">
                        <MoreHorizontal size={15} style={{ color: "#6C757D" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
