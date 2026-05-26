import { Link } from "react-router";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Users, TrendingUp, Clock, CheckCircle, ArrowRight, AlertCircle } from "lucide-react";
import { getStoredLeads } from "../data/mockData";
import { LeadStatusBadge, LeadPriorityBadge } from "./LeadBadges";

const PIE_COLORS = ["#005897", "#DC3545", "#198754", "#F59E0B", "#0DCAF0", "#8B5CF6", "#EC4899", "#6C757D"];

export function DashboardPage() {
  const leads = getStoredLeads();
  
  const totalLeads = leads.length;
  const newToday = leads.filter((l) => {
    const today = new Date().toDateString();
    return new Date(l.createdAt).toDateString() === today;
  }).length;
  const pendingReview = leads.filter((l) => l.status === "NEW" || l.status === "MEDICAL_REVIEW").length;
  const converted = leads.filter((l) => l.status === "CONVERTED").length;

  const metricCards = [
    { label: "Total Leads", value: totalLeads, icon: Users, color: "#005897", bg: "#EEF7FF", change: "+12% this month" },
    { label: "New Today", value: newToday, icon: TrendingUp, color: "#DC3545", bg: "#FFF3F3", change: `+${newToday} today` },
    { label: "Pending Review", value: pendingReview, icon: Clock, color: "#F59E0B", bg: "#FFFBEB", change: "Action needed" },
    { label: "Converted", value: converted, icon: CheckCircle, color: "#198754", bg: "#F0FFF4", change: `${((converted / (totalLeads || 1)) * 100).toFixed(1)}% conversion rate` },
  ];

  // Status breakdown
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const leadsByStatus = Object.keys(statusCounts).map((status) => ({
    status,
    count: statusCounts[status],
  }));

  // Source breakdown
  const sourceCounts = leads.reduce((acc, lead) => {
    const src = lead.sourceChannel || "Direct";
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const leadsBySource = Object.keys(sourceCounts).map((source) => ({
    source,
    count: sourceCounts[source],
  }));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold" style={{ fontSize: "22px", color: "#333333" }}>Dashboard Overview</h1>
          <p className="text-sm" style={{ color: "#6C757D" }}>Monday, May 25, 2026 · Welcome back, Admin</p>
        </div>
        <Link to="/contact" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white"
          style={{ backgroundColor: "#DC3545" }}>
          New Inquiry Form <ArrowRight size={14} />
        </Link>
      </div>

      {/* Metric cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {metricCards.map(({ label, value, icon: Icon, color, bg, change }) => (
          <div key={label} className="bg-white rounded-xl p-5 transition-shadow hover:shadow-md"
            style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "#6C757D" }}>{label}</p>
                <p className="font-bold text-3xl" style={{ color }}>{value}</p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bg }}>
                <Icon size={18} style={{ color }} />
              </div>
            </div>
            <div className="text-xs" style={{ color: "#6C757D" }}>{change}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Leads by status bar chart */}
        <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 className="font-bold mb-5 text-sm" style={{ color: "#333" }}>Leads by Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={leadsByStatus} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="status" tick={{ fontSize: 9, fill: "#6C757D" }} tickFormatter={(v) => v.replace("_", " ").slice(0, 8)} />
              <YAxis tick={{ fontSize: 10, fill: "#6C757D" }} />
              <Tooltip
                contentStyle={{ fontSize: "12px", borderRadius: "8px", border: "1px solid #DEE2E6" }}
                labelFormatter={(v) => String(v).replace(/_/g, " ")}
              />
              <Bar dataKey="count" fill="#005897" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leads by source pie chart */}
        <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 className="font-bold mb-5 text-sm" style={{ color: "#333" }}>Leads by Source Channel</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={leadsBySource} dataKey="count" nameKey="source" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
                  {leadsBySource.map((entry, i) => (
                    <Cell key={`pie-cell-${entry.source}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {leadsBySource.map(({ source, count }, i) => (
                <div key={source} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span style={{ color: "#4F4F4F" }}>{source}</span>
                  </div>
                  <span className="font-semibold" style={{ color: "#333" }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent leads */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #DEE2E6" }}>
          <h3 className="font-bold text-sm" style={{ color: "#333" }}>Recent Inquiries</h3>
          <Link to="/admin/leads" className="text-xs font-semibold flex items-center gap-1" style={{ color: "#005897" }}>
            View all <ArrowRight size={12} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "#F8F9FA" }}>
              <tr>
                {["Reference", "Patient", "Treatment", "Country", "Status", "Priority", "Source", "Date"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#6C757D" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.slice(0, 5).map((lead, i) => (
                <tr key={lead.id} className="border-t transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#DEE2E6" }}>
                  <td className="px-4 py-3">
                    <Link to={`/admin/leads/${lead.id}`} className="text-xs font-mono font-bold" style={{ color: "#005897" }}>
                      {lead.referenceCode}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium" style={{ color: "#333" }}>{lead.fullName}</div>
                    <div className="text-xs" style={{ color: "#6C757D" }}>{lead.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs" style={{ color: "#4F4F4F" }}>{lead.treatmentInterests.join(", ")}</div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#4F4F4F" }}>{lead.countryOfResidence}</td>
                  <td className="px-4 py-3">
                    <LeadStatusBadge status={lead.status} />
                  </td>
                  <td className="px-4 py-3">
                    <LeadPriorityBadge priority={lead.priority} />
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#6C757D" }}>{lead.sourceChannel}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#6C757D" }}>
                    {new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white rounded-xl p-5" style={{ border: "1px solid #FFC107", backgroundColor: "#FFFBEB" }}>
        <div className="flex items-start gap-3">
          <AlertCircle size={18} style={{ color: "#F59E0B", flexShrink: 0, marginTop: "1px" }} />
          <div>
            <div className="font-semibold text-sm mb-1" style={{ color: "#333" }}>Action Required</div>
            <p className="text-sm" style={{ color: "#4F4F4F" }}>
              {pendingReview} leads are awaiting medical review. 3 leads have been waiting for documents for more than 3 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
