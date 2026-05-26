import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard, Users, Kanban, Settings, LogOut, Menu, X,
  ChevronRight, Bell, Search, User, BarChart3, ClipboardList
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: ClipboardList, label: "Lead List", href: "/admin/leads" },
  { icon: Kanban, label: "Pipeline (Kanban)", href: "/admin/leads/kanban" },
  { icon: Users, label: "Users & Roles", href: "/admin/users" },
  { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

const ROLE_COLORS: Record<string, string> = {
  SUPER_ADMIN: "#DC3545",
  CRM_MANAGER: "#005897",
  MEDICAL_CONSULTANT: "#198754",
  SALES_CONSULTANT: "#F59E0B",
  CONTENT_EDITOR: "#6C757D",
};

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const currentUser = { name: "Admin User", email: "admin@medbridge.com", role: "SUPER_ADMIN" };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#F8F9FA" }}>
      {/* Sidebar */}
      <aside
        className={`flex flex-col transition-all duration-200 flex-shrink-0 ${sidebarOpen ? "w-60" : "w-16"}`}
        style={{ backgroundColor: "#003d6b", minHeight: "100vh" }}
      >
        {/* Logo / toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.1)", height: "64px" }}>
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md flex items-center justify-center bg-white">
                <span style={{ color: "#005897", fontWeight: 900, fontSize: "12px" }}>M</span>
              </div>
              <div className="leading-none">
                <div className="text-white font-bold text-sm">MedBridge</div>
                <div className="text-xs" style={{ color: "#0DCAF0" }}>CRM</div>
              </div>
            </Link>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-1 rounded hover:bg-white/10 ml-auto">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href ||
              (item.href !== "/admin" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                title={!sidebarOpen ? item.label : undefined}
                className={`flex items-center gap-3 px-4 py-3 transition-colors text-sm ${sidebarOpen ? "" : "justify-center"}`}
                style={{
                  backgroundColor: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                  color: isActive ? "#0DCAF0" : "#a8cce0",
                  borderLeft: isActive ? "3px solid #0DCAF0" : "3px solid transparent",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <item.icon size={18} className="flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className="border-t p-3" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: ROLE_COLORS[currentUser.role] || "#6C757D" }}>
                {currentUser.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-xs font-semibold truncate">{currentUser.name}</div>
                <div className="text-xs truncate" style={{ color: "#8bb5d4" }}>{currentUser.role.replace("_", " ")}</div>
              </div>
              <button onClick={() => navigate("/admin/login")} className="text-white/60 hover:text-white/90 transition-colors" title="Logout">
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <button className="flex justify-center w-full" onClick={() => navigate("/admin/login")} title="Logout">
              <LogOut size={18} style={{ color: "#a8cce0" }} />
            </button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 border-b flex-shrink-0"
          style={{ backgroundColor: "#ffffff", borderColor: "#DEE2E6", height: "64px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm" style={{ color: "#6C757D" }}>
            <Link to="/admin" className="hover:text-gray-900">CRM</Link>
            {location.pathname.split("/").filter(Boolean).slice(1).map((segment, i, arr) => (
              <div key={i} className="flex items-center gap-1.5">
                <ChevronRight size={13} />
                <span style={{ color: i === arr.length - 1 ? "#333" : "#6C757D", textTransform: "capitalize" }}>
                  {segment.replace(/-/g, " ")}
                </span>
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#6C757D" }} />
              <input
                type="text"
                placeholder="Search leads..."
                className="outline-none text-sm"
                style={{ paddingLeft: "32px", paddingRight: "12px", height: "34px", border: "1px solid #DEE2E6", borderRadius: "8px", width: "200px", color: "#333" }}
                onFocus={(e) => { e.target.style.borderColor = "#005897"; e.target.style.width = "260px"; }}
                onBlur={(e) => { e.target.style.borderColor = "#DEE2E6"; e.target.style.width = "200px"; }}
              />
            </div>

            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell size={18} style={{ color: "#6C757D" }} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: "#DC3545" }} />
            </button>

            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
              style={{ backgroundColor: ROLE_COLORS[currentUser.role] || "#6C757D" }}>
              {currentUser.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
