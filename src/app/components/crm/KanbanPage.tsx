import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { MOCK_LEADS, getStoredLeads, saveLeads } from "../data/mockData";
import { LeadPriorityBadge, STATUS_LABELS } from "./LeadBadges";

const PIPELINE_COLUMNS = [
  "NEW", "CONTACTED", "QUALIFIED", "WAITING_FOR_DOCUMENTS",
  "MEDICAL_REVIEW", "QUOTE_SENT", "APPOINTMENT_PLANNED", "CONVERTED",
];

const COLUMN_COLORS: Record<string, string> = {
  NEW: "#005897",
  CONTACTED: "#0072c3",
  QUALIFIED: "#198754",
  WAITING_FOR_DOCUMENTS: "#F59E0B",
  MEDICAL_REVIEW: "#8B5CF6",
  QUOTE_SENT: "#0DCAF0",
  APPOINTMENT_PLANNED: "#EC4899",
  CONVERTED: "#198754",
};

export function KanbanPage() {
  const [leads, setLeads] = useState(() => getStoredLeads());
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);

  const getLeadsForStatus = (status: string) => leads.filter((l) => l.status === status);

  const handleDragStart = (id: string) => setDraggedId(id);
  const handleDragOver = (e: React.DragEvent, col: string) => {
    e.preventDefault();
    setDragOverCol(col);
  };
  const handleDrop = (col: string) => {
    if (!draggedId) return;
    setLeads((prev) => {
      const next = prev.map((l) => l.id === draggedId ? { ...l, status: col } : l);
      saveLeads(next);
      return next;
    });
    setDraggedId(null);
    setDragOverCol(null);
  };

  const getAgeLabel = (createdAt: string) => {
    const diff = Date.now() - new Date(createdAt).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold" style={{ fontSize: "20px", color: "#333" }}>Lead Pipeline — Kanban</h1>
          <p className="text-sm" style={{ color: "#6C757D" }}>Drag cards to update lead status · {leads.length} total leads</p>
        </div>
        <Link to="/admin/leads" className="px-4 py-2 text-sm font-semibold rounded-md"
          style={{ backgroundColor: "#F8F9FA", color: "#4F4F4F", border: "1px solid #DEE2E6" }}>
          List View
        </Link>
      </div>

      {/* Kanban board */}
      <div className="flex gap-4 overflow-x-auto pb-4" style={{ minHeight: "600px" }}>
        {PIPELINE_COLUMNS.map((col) => {
          const colLeads = getLeadsForStatus(col);
          const cfg = STATUS_LABELS[col];
          const color = COLUMN_COLORS[col];
          const isDragOver = dragOverCol === col;

          return (
            <div
              key={col}
              className="flex-shrink-0 flex flex-col rounded-xl overflow-hidden"
              style={{ width: "240px", minHeight: "400px" }}
              onDragOver={(e) => handleDragOver(e, col)}
              onDrop={() => handleDrop(col)}
            >
              {/* Column header */}
              <div className="px-3 py-3 flex items-center justify-between"
                style={{ backgroundColor: color, borderRadius: "10px 10px 0 0" }}>
                <span className="text-white font-semibold text-xs">{cfg?.label || col.replace(/_/g, " ")}</span>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "white" }}>
                  {colLeads.length}
                </span>
              </div>

              {/* Cards */}
              <div
                className={`flex-1 p-2 space-y-2 rounded-b-xl transition-colors`}
                style={{
                  backgroundColor: isDragOver ? `${color}15` : "#F8F9FA",
                  border: isDragOver ? `2px dashed ${color}` : "2px solid transparent",
                  minHeight: "100px",
                }}
              >
                {colLeads.length === 0 && (
                  <div className="flex items-center justify-center py-8 text-xs" style={{ color: "#CCCCCC" }}>
                    Drop leads here
                  </div>
                )}

                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead.id)}
                    className="bg-white rounded-lg p-3 cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md"
                    style={{
                      border: "1px solid #DEE2E6",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                      opacity: draggedId === lead.id ? 0.5 : 1,
                    }}
                  >
                    {/* Priority & treatment */}
                    <div className="flex items-center justify-between mb-2">
                      <LeadPriorityBadge priority={lead.priority} />
                      <span className="text-xs" style={{ color: "#CCCCCC" }}>{getAgeLabel(lead.createdAt)}</span>
                    </div>

                    {/* Patient name */}
                    <div className="font-semibold text-sm mb-0.5" style={{ color: "#333" }}>{lead.fullName}</div>

                    {/* Treatment */}
                    <div className="text-xs mb-2" style={{ color: "#6C757D" }}>
                      {lead.treatmentInterests.slice(0, 1).join(", ")}
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs" style={{ color: "#6C757D" }}>
                      <span>🌍 {lead.countryOfResidence.slice(0, 12)}</span>
                      <span className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: "#F8F9FA" }}>
                        {lead.sourceChannel || "Direct"}
                      </span>
                    </div>

                    {/* Assigned + link */}
                    <div className="flex items-center justify-between mt-2 pt-2" style={{ borderTop: "1px solid #DEE2E6" }}>
                      <span className="text-xs" style={{ color: lead.assignedTo ? "#333" : "#DC3545" }}>
                        {lead.assignedTo ? `👤 ${lead.assignedTo.split(" ")[0]}` : "Unassigned"}
                      </span>
                      <Link to={`/admin/leads/${lead.id}`} className="text-xs" style={{ color: "#005897" }}>
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
