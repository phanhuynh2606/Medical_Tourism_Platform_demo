import { useState, useMemo } from "react";
import { Link } from "react-router";
import { Search, Filter, ChevronDown, ChevronUp, ArrowRight, X, Download } from "lucide-react";
import { MOCK_LEADS, getStoredLeads } from "../data/mockData";
import { LeadStatusBadge, LeadPriorityBadge, ALL_STATUSES } from "./LeadBadges";

function exportToCSV(leads: typeof MOCK_LEADS) {
  const headers = [
    "Reference Code", "Full Name", "Email", "Phone",
    "Country", "Nationality", "Treatment Interests",
    "Status", "Priority", "Source Channel",
    "Assigned To", "Created At",
  ];

  const rows = leads.map((l) => [
    l.referenceCode,
    l.fullName,
    l.email,
    l.phone,
    l.countryOfResidence,
    l.nationality,
    l.treatmentInterests.join("; "),
    l.status,
    l.priority,
    l.sourceChannel || "",
    l.assignedTo || "",
    new Date(l.createdAt).toLocaleDateString("en-GB"),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `medbridge-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const TREATMENTS = ["Cardiology", "Oncology", "Orthopaedics", "Dental & Cosmetic", "IVF & Fertility", "Wellness & Checkup"];
const COUNTRIES = ["United Kingdom", "Saudi Arabia", "United States", "Poland", "Vietnam", "Russia", "Nigeria", "China", "Australia", "UAE"];

export function LeadsListPage() {
  const [leads, setLeads] = useState(() => getStoredLeads());
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ status: "", priority: "", treatment: "", country: "" });
  const [sortBy, setSortBy] = useState<"createdAt" | "priority" | "status">("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [exporting, setExporting] = useState(false);

  const PRIORITY_ORDER: Record<string, number> = { URGENT: 4, HIGH: 3, NORMAL: 2, LOW: 1 };

  const filtered = useMemo(() => {
    let leadsList = [...leads];

    if (search) {
      const q = search.toLowerCase();
      leadsList = leadsList.filter((l) =>
        l.fullName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.referenceCode.toLowerCase().includes(q)
      );
    }

    if (filters.status) leadsList = leadsList.filter((l) => l.status === filters.status);
    if (filters.priority) leadsList = leadsList.filter((l) => l.priority === filters.priority);
    if (filters.treatment) leadsList = leadsList.filter((l) => l.treatmentInterests.some((t) => t.includes(filters.treatment)));
    if (filters.country) leadsList = leadsList.filter((l) => l.countryOfResidence === filters.country);

    leadsList.sort((a, b) => {
      if (sortBy === "createdAt") {
        return sortDir === "desc"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === "priority") {
        return sortDir === "desc"
          ? PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]
          : PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      }
      return 0;
    });

    return leadsList;
  }, [leads, search, filters, sortBy, sortDir]);

  const clearFilters = () => setFilters({ status: "", priority: "", treatment: "", country: "" });
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  const SortIcon = ({ col }: { col: typeof sortBy }) => (
    sortBy === col
      ? sortDir === "desc" ? <ChevronDown size={13} /> : <ChevronUp size={13} />
      : <ChevronDown size={13} className="opacity-30" />
  );

  const selectStyle = {
    height: "34px",
    border: "1px solid #DEE2E6",
    borderRadius: "6px",
    padding: "0 10px",
    fontSize: "13px",
    backgroundColor: "#ffffff",
    color: "#333",
    outline: "none",
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold" style={{ fontSize: "20px", color: "#333" }}>Lead Management</h1>
          <p className="text-sm" style={{ color: "#6C757D" }}>{filtered.length} of {leads.length} leads</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              setExporting(true);
              await new Promise((r) => setTimeout(r, 400));
              exportToCSV(filtered);
              setExporting(false);
            }}
            disabled={exporting || filtered.length === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors disabled:opacity-50"
            style={{ backgroundColor: "#F0FFF4", color: "#198754", border: "1px solid #c3e6cb" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#DCFCE7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#F0FFF4"; }}
          >
            <Download size={14} />
            {exporting ? "Exporting..." : `Export CSV (${filtered.length})`}
          </button>
          <Link to="/admin/leads/kanban" className="px-4 py-2 text-sm font-semibold rounded-md"
            style={{ backgroundColor: "#F8F9FA", color: "#4F4F4F", border: "1px solid #DEE2E6" }}>
            Kanban View
          </Link>
        </div>
      </div>

      {/* Search + Filters toolbar */}
      <div className="bg-white rounded-xl p-4" style={{ border: "1px solid #DEE2E6" }}>
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#6C757D" }} />
            <input
              type="text"
              placeholder="Search by name, email, phone, reference..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-sm"
              style={{ paddingLeft: "34px", paddingRight: "12px", height: "36px", border: "1px solid #DEE2E6", borderRadius: "8px", color: "#333" }}
              onFocus={(e) => { e.target.style.borderColor = "#005897"; }}
              onBlur={(e) => { e.target.style.borderColor = "#DEE2E6"; }}
            />
          </div>

          <button onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            style={{
              backgroundColor: showFilters ? "#005897" : "#F8F9FA",
              color: showFilters ? "white" : "#4F4F4F",
              border: "1px solid #DEE2E6",
            }}>
            <Filter size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: "#DC3545" }}>
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs" style={{ color: "#DC3545" }}>
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* Filter dropdowns */}
        {showFilters && (
          <div className="flex flex-wrap gap-3 mt-4 pt-4" style={{ borderTop: "1px solid #DEE2E6" }}>
            {[
              { label: "Status", key: "status" as const, options: ALL_STATUSES },
              { label: "Priority", key: "priority" as const, options: ["LOW", "NORMAL", "HIGH", "URGENT"] },
              { label: "Treatment", key: "treatment" as const, options: TREATMENTS },
              { label: "Country", key: "country" as const, options: COUNTRIES },
            ].map(({ label, key, options }) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs font-semibold" style={{ color: "#4F4F4F" }}>{label}</label>
                <select style={selectStyle} value={filters[key]}
                  onChange={(e) => setFilters((f) => ({ ...f, [key]: e.target.value }))}>
                  <option value="">All {label}s</option>
                  {options.map((o) => <option key={o} value={o}>{o.replace(/_/g, " ")}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ backgroundColor: "#F8F9FA" }}>
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#6C757D" }}>Reference</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#6C757D" }}>Patient</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#6C757D" }}>Treatment</th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#6C757D" }}>Country</th>
                <th className="text-left px-4 py-3 text-xs font-semibold cursor-pointer" style={{ color: "#6C757D" }}
                  onClick={() => toggleSort("status")}>
                  <div className="flex items-center gap-1">Status <SortIcon col="status" /></div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold cursor-pointer" style={{ color: "#6C757D" }}
                  onClick={() => toggleSort("priority")}>
                  <div className="flex items-center gap-1">Priority <SortIcon col="priority" /></div>
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "#6C757D" }}>Assigned To</th>
                <th className="text-left px-4 py-3 text-xs font-semibold cursor-pointer" style={{ color: "#6C757D" }}
                  onClick={() => toggleSort("createdAt")}>
                  <div className="flex items-center gap-1">Date <SortIcon col="createdAt" /></div>
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-sm" style={{ color: "#6C757D" }}>
                    No leads match your search or filters.
                  </td>
                </tr>
              ) : filtered.map((lead) => (
                <tr key={lead.id} className="border-t transition-colors hover:bg-gray-50"
                  style={{ borderColor: "#DEE2E6" }}>
                  <td className="px-4 py-3">
                    <Link to={`/admin/leads/${lead.id}`} className="text-xs font-mono font-bold" style={{ color: "#005897" }}>
                      {lead.referenceCode}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium" style={{ color: "#333" }}>{lead.fullName}</div>
                    <div className="text-xs" style={{ color: "#6C757D" }}>{lead.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs" style={{ color: "#4F4F4F" }}>{lead.treatmentInterests.slice(0, 2).join(", ")}</div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#4F4F4F" }}>{lead.countryOfResidence}</td>
                  <td className="px-4 py-3"><LeadStatusBadge status={lead.status} /></td>
                  <td className="px-4 py-3"><LeadPriorityBadge priority={lead.priority} /></td>
                  <td className="px-4 py-3">
                    {lead.assignedTo ? (
                      <span className="text-xs" style={{ color: "#333" }}>{lead.assignedTo}</span>
                    ) : (
                      <span className="text-xs" style={{ color: "#DC3545" }}>Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "#6C757D" }}>
                    {new Date(lead.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })}
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/admin/leads/${lead.id}`} className="flex items-center gap-1 text-xs font-medium" style={{ color: "#005897" }}>
                      View <ArrowRight size={12} />
                    </Link>
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
