const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  NEW: { label: "New", color: "#005897", bg: "#EEF7FF" },
  CONTACTED: { label: "Contacted", color: "#0072c3", bg: "#E8F4FD" },
  QUALIFIED: { label: "Qualified", color: "#198754", bg: "#F0FFF4" },
  WAITING_FOR_DOCUMENTS: { label: "Waiting Docs", color: "#F59E0B", bg: "#FFFBEB" },
  MEDICAL_REVIEW: { label: "Medical Review", color: "#8B5CF6", bg: "#F5F3FF" },
  QUOTE_SENT: { label: "Quote Sent", color: "#0DCAF0", bg: "#E8FAFD" },
  APPOINTMENT_PLANNED: { label: "Appt. Planned", color: "#EC4899", bg: "#FFF0F5" },
  CONVERTED: { label: "Converted", color: "#198754", bg: "#DCFCE7" },
  LOST: { label: "Lost", color: "#6C757D", bg: "#F8F9FA" },
  ARCHIVED: { label: "Archived", color: "#4F4F4F", bg: "#EEEEEE" },
};

const PRIORITY_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  LOW: { label: "Low", color: "#6C757D", bg: "#F8F9FA" },
  NORMAL: { label: "Normal", color: "#0072c3", bg: "#EEF7FF" },
  HIGH: { label: "High", color: "#F59E0B", bg: "#FFFBEB" },
  URGENT: { label: "Urgent", color: "#DC3545", bg: "#FFF3F3" },
};

export function LeadStatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || { label: status, color: "#6C757D", bg: "#F8F9FA" };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

export function LeadPriorityBadge({ priority }: { priority: string }) {
  const cfg = PRIORITY_CONFIG[priority] || { label: priority, color: "#6C757D", bg: "#F8F9FA" };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}

export function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, { color: string; bg: string }> = {
    SUPER_ADMIN: { color: "#DC3545", bg: "#FFF3F3" },
    CRM_MANAGER: { color: "#005897", bg: "#EEF7FF" },
    MEDICAL_CONSULTANT: { color: "#198754", bg: "#F0FFF4" },
    SALES_CONSULTANT: { color: "#F59E0B", bg: "#FFFBEB" },
    CONTENT_EDITOR: { color: "#6C757D", bg: "#F8F9FA" },
  };
  const cfg = colors[role] || { color: "#6C757D", bg: "#F8F9FA" };
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: cfg.bg, color: cfg.color }}>
      {role.replace(/_/g, " ")}
    </span>
  );
}

export const ALL_STATUSES = Object.keys(STATUS_CONFIG);
export const STATUS_LABELS = STATUS_CONFIG;
