import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ChevronRight, FileText, MessageSquare, Phone, Mail,
  Clock, CheckCircle, User, Edit2, Send
} from "lucide-react";
import { MOCK_LEADS, INTERACTION_LOGS, getStoredLeads, saveLeads } from "../data/mockData";
import { LeadStatusBadge, LeadPriorityBadge, ALL_STATUSES } from "./LeadBadges";

const TEAM_MEMBERS = ["Sarah Chen", "Dr. Ahmad Hassan", "Maria Santos", "Tom Williams"];

export function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const lead = getStoredLeads().find((l) => l.id === id);
  const [status, setStatus] = useState(lead?.status || "NEW");
  const [priority, setPriority] = useState(lead?.priority || "NORMAL");
  const [assignedTo, setAssignedTo] = useState(lead?.assignedTo || "");
  const [newNote, setNewNote] = useState("");
  const [logs, setLogs] = useState(INTERACTION_LOGS);

  const handleSave = () => {
    const currentLeads = getStoredLeads();
    const updated = currentLeads.map((l) =>
      l.id === id ? { ...l, status, priority, assignedTo: assignedTo || null } : l
    );
    saveLeads(updated);
    alert("Lead details updated successfully!");
  };

  if (!lead) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="font-bold text-xl mb-2" style={{ color: "#333" }}>Lead Not Found</h2>
          <Link to="/admin/leads" className="text-sm" style={{ color: "#005897" }}>← Back to Leads</Link>
        </div>
      </div>
    );
  }

  const addNote = () => {
    if (!newNote.trim()) return;
    setLogs([{
      id: String(Date.now()),
      type: "NOTE",
      content: newNote,
      createdAt: new Date().toISOString(),
      user: "Admin User",
    }, ...logs]);
    setNewNote("");
  };

  const INTERACTION_ICONS: Record<string, React.ReactNode> = {
    NOTE: <MessageSquare size={14} />,
    EMAIL: <Mail size={14} />,
    CALL: <Phone size={14} />,
    WHATSAPP: <MessageSquare size={14} />,
    ZALO: <MessageSquare size={14} />,
    STATUS_CHANGE: <CheckCircle size={14} />,
    DOCUMENT_REQUEST: <FileText size={14} />,
  };

  const INTERACTION_COLORS: Record<string, string> = {
    NOTE: "#6C757D",
    EMAIL: "#005897",
    CALL: "#198754",
    WHATSAPP: "#25D366",
    STATUS_CHANGE: "#F59E0B",
    DOCUMENT_REQUEST: "#8B5CF6",
  };

  const selectStyle = {
    border: "1px solid #DEE2E6",
    borderRadius: "6px",
    padding: "6px 10px",
    fontSize: "13px",
    backgroundColor: "#ffffff",
    color: "#333",
    outline: "none",
  };

  return (
    <div className="space-y-5">
      {/* Breadcrumb + header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <nav className="flex items-center gap-2 text-xs mb-1" style={{ color: "#6C757D" }}>
            <Link to="/admin/leads" className="hover:text-gray-900">Leads</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#333" }}>{lead.referenceCode}</span>
          </nav>
          <h1 className="font-bold" style={{ fontSize: "20px", color: "#333" }}>{lead.fullName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <LeadStatusBadge status={status} />
          <LeadPriorityBadge priority={priority} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Left: Profile + Medical */}
        <div className="lg:col-span-2 space-y-5">
          {/* Patient profile */}
          <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl text-white"
                style={{ backgroundColor: "#005897" }}>
                {lead.fullName.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold" style={{ color: "#333" }}>{lead.fullName}</h2>
                <div className="text-xs" style={{ color: "#6C757D" }}>{lead.referenceCode}</div>
              </div>
              <span className="ml-auto text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: "#EEF7FF", color: "#005897" }}>
                📍 {lead.countryOfResidence}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Email", value: lead.email, icon: <Mail size={13} /> },
                { label: "Phone", value: lead.phone, icon: <Phone size={13} /> },
                { label: "Nationality", value: lead.nationality, icon: <User size={13} /> },
                { label: "Gender", value: lead.gender || "—", icon: <User size={13} /> },
                { label: "Date of Birth", value: lead.dateOfBirth || "—", icon: <Clock size={13} /> },
                { label: "Source Channel", value: lead.sourceChannel || "—", icon: <MessageSquare size={13} /> },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "#F8F9FA", color: "#6C757D" }}>
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs" style={{ color: "#6C757D" }}>{label}</div>
                    <div className="text-sm font-medium" style={{ color: "#333" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Medical information */}
          <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h3 className="font-bold mb-4 text-sm" style={{ color: "#333" }}>Medical Request</h3>
            <div className="space-y-4">
              <div>
                <div className="text-xs font-semibold mb-2" style={{ color: "#6C757D" }}>Treatment Interests</div>
                <div className="flex flex-wrap gap-2">
                  {lead.treatmentInterests.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: "#EEF7FF", color: "#005897" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: "#F8F9FA", border: "1px solid #DEE2E6" }}>
                <div className="text-xs font-semibold mb-2" style={{ color: "#6C757D" }}>Condition Description</div>
                <p className="text-sm" style={{ color: "#4F4F4F", lineHeight: "1.6" }}>
                  {lead.conditionDescription || `Patient has expressed interest in treatment for conditions related to ${lead.treatmentInterests.join(", ")}.`}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-xs" style={{ color: "#6C757D" }}>Preferred Destination</div>
                  <div className="text-sm font-medium" style={{ color: "#333" }}>{lead.preferredDestinationCountry || "—"}</div>
                </div>
                <div>
                  <div className="text-xs" style={{ color: "#6C757D" }}>Estimated Travel Date</div>
                  <div className="text-sm font-medium" style={{ color: "#333" }}>
                    {lead.estimatedTravelDate ? new Date(lead.estimatedTravelDate).toLocaleDateString("en-GB") : "—"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm" style={{ color: "#333" }}>Medical Documents</h3>
              <button className="text-xs px-3 py-1.5 rounded-md font-medium" style={{ backgroundColor: "#EEF7FF", color: "#005897" }}>
                Request Documents
              </button>
            </div>
            <div className="flex flex-col items-center justify-center py-8 rounded-xl" style={{ backgroundColor: "#F8F9FA", border: "2px dashed #DEE2E6" }}>
              <FileText size={28} style={{ color: "#CCCCCC" }} className="mb-2" />
              <p className="text-sm" style={{ color: "#6C757D" }}>No documents uploaded yet</p>
              <p className="text-xs mt-1" style={{ color: "#CCCCCC" }}>Patient uploads are encrypted and secure</p>
            </div>
          </div>

          {/* Interaction timeline */}
          <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h3 className="font-bold mb-4 text-sm" style={{ color: "#333" }}>Interaction Timeline</h3>

            {/* Add note */}
            <div className="mb-5">
              <div className="flex gap-2">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add an internal note or log an interaction..."
                  className="flex-1 outline-none text-sm resize-none"
                  rows={3}
                  style={{ border: "1px solid #DEE2E6", borderRadius: "8px", padding: "10px 12px", color: "#333" }}
                  onFocus={(e) => { e.target.style.borderColor = "#005897"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#DEE2E6"; }}
                />
              </div>
              <div className="flex justify-end mt-2">
                <button onClick={addNote}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold text-white"
                  style={{ backgroundColor: "#005897" }}>
                  <Send size={12} /> Add Note
                </button>
              </div>
            </div>

            {/* Log entries */}
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: INTERACTION_COLORS[log.type] || "#6C757D" }}>
                    {INTERACTION_ICONS[log.type] || <MessageSquare size={14} />}
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold" style={{ color: "#333" }}>{log.user}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "#F8F9FA", color: "#6C757D" }}>
                          {log.type.replace(/_/g, " ")}
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: "#CCCCCC" }}>
                        {new Date(log.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: "#4F4F4F", lineHeight: "1.5" }}>{log.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Status pipeline */}
          <div className="bg-white rounded-xl p-5" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h3 className="font-bold mb-4 text-sm flex items-center gap-2" style={{ color: "#333" }}>
              <Edit2 size={13} /> Lead Status
            </h3>
            <div className="space-y-2">
              {ALL_STATUSES.map((s) => (
                <button key={s} onClick={() => setStatus(s)}
                  className="w-full text-left text-xs px-3 py-2 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: status === s ? "#005897" : "#F8F9FA",
                    color: status === s ? "white" : "#4F4F4F",
                    border: `1px solid ${status === s ? "#005897" : "#DEE2E6"}`,
                  }}>
                  {s === status ? "● " : "○ "}{s.replace(/_/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Assignment */}
          <div className="bg-white rounded-xl p-5" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h3 className="font-bold mb-4 text-sm" style={{ color: "#333" }}>Assignment</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#6C757D" }}>Priority</label>
                <select style={{ ...selectStyle, width: "100%" }} value={priority}
                  onChange={(e) => setPriority(e.target.value)}>
                  {["LOW", "NORMAL", "HIGH", "URGENT"].map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "#6C757D" }}>Assigned To</label>
                <select style={{ ...selectStyle, width: "100%" }} value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}>
                  <option value="">Unassigned</option>
                  {TEAM_MEMBERS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <button onClick={handleSave} className="w-full py-2 text-sm font-semibold rounded-md text-white"
                style={{ backgroundColor: "#005897" }}>
                Save Changes
              </button>
            </div>
          </div>

          {/* Contact preference */}
          <div className="bg-white rounded-xl p-5" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <h3 className="font-bold mb-4 text-sm" style={{ color: "#333" }}>Contact Preferences</h3>
            <div className="space-y-2">
              {["Email", "WhatsApp", "Phone"].map((method) => (
                <div key={method} className="flex items-center justify-between text-sm">
                  <span style={{ color: "#4F4F4F" }}>{method}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "#F0FFF4", color: "#198754" }}>Preferred</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 w-full py-2 px-3 rounded-md text-sm font-medium text-white"
                style={{ backgroundColor: "#25D366" }}>
                <MessageSquare size={14} /> Message on WhatsApp
              </a>
              <a href={`mailto:${lead.email}`}
                className="flex items-center gap-2 w-full py-2 px-3 rounded-md text-sm font-medium"
                style={{ backgroundColor: "#F8F9FA", color: "#333", border: "1px solid #DEE2E6" }}>
                <Mail size={14} /> Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
