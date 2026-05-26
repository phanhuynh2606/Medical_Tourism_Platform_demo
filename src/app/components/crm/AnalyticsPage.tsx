import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, FunnelChart, Funnel, LabelList,
  ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, CheckCircle, Clock, Target } from "lucide-react";

// ── Mock time-series data ──
const LEADS_OVER_TIME = [
  { month: "Dec '25", leads: 18, converted: 2 },
  { month: "Jan '26", leads: 27, converted: 4 },
  { month: "Feb '26", leads: 34, converted: 5 },
  { month: "Mar '26", leads: 41, converted: 6 },
  { month: "Apr '26", leads: 55, converted: 8 },
  { month: "May '26", leads: 72, converted: 6 },
];

const LEADS_BY_TREATMENT = [
  { treatment: "Cardiology", leads: 58 },
  { treatment: "Orthopaedics", leads: 47 },
  { treatment: "Oncology", leads: 39 },
  { treatment: "Dental", leads: 36 },
  { treatment: "IVF", leads: 31 },
  { treatment: "Wellness", leads: 22 },
  { treatment: "Eye Surgery", leads: 14 },
];

const LEADS_BY_COUNTRY = [
  { country: "United Kingdom", leads: 44, flag: "🇬🇧" },
  { country: "Saudi Arabia", leads: 38, flag: "🇸🇦" },
  { country: "United States", leads: 31, flag: "🇺🇸" },
  { country: "Vietnam", leads: 24, flag: "🇻🇳" },
  { country: "Australia", leads: 22, flag: "🇦🇺" },
  { country: "Russia", leads: 18, flag: "🇷🇺" },
  { country: "Nigeria", leads: 15, flag: "🇳🇬" },
  { country: "UAE", leads: 14, flag: "🇦🇪" },
  { country: "China", leads: 13, flag: "🇨🇳" },
  { country: "Other", leads: 28, flag: "🌍" },
];

const LEADS_BY_SOURCE = [
  { source: "Google", leads: 89, color: "#4285F4" },
  { source: "WhatsApp", leads: 54, color: "#25D366" },
  { source: "Referral", leads: 41, color: "#F59E0B" },
  { source: "Social Media", leads: 33, color: "#EC4899" },
  { source: "Zalo", leads: 18, color: "#0068FF" },
  { source: "WeChat", leads: 12, color: "#07C160" },
];

const CONVERSION_FUNNEL = [
  { name: "Inquiry Submitted", value: 247, fill: "#005897" },
  { name: "Contacted", value: 189, fill: "#0072c3" },
  { name: "Qualified", value: 134, fill: "#0DCAF0" },
  { name: "Quote Sent", value: 88, fill: "#F59E0B" },
  { name: "Appointment Planned", value: 52, fill: "#8B5CF6" },
  { name: "Converted", value: 31, fill: "#198754" },
];

const KPI_CARDS = [
  {
    label: "Total Leads (All Time)",
    value: "247",
    change: "+29% vs last quarter",
    up: true,
    icon: Users,
    color: "#005897",
    bg: "#EEF7FF",
  },
  {
    label: "Conversion Rate",
    value: "12.6%",
    change: "+1.8pp vs last quarter",
    up: true,
    icon: Target,
    color: "#198754",
    bg: "#F0FFF4",
  },
  {
    label: "Avg. Time to Convert",
    value: "18 days",
    change: "-3 days vs last quarter",
    up: true,
    icon: Clock,
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    label: "Leads Lost",
    value: "28",
    change: "+4 vs last quarter",
    up: false,
    icon: TrendingDown,
    color: "#DC3545",
    bg: "#FFF3F3",
  },
];

const CUSTOM_TOOLTIP = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg p-3" style={{ border: "1px solid #DEE2E6", fontSize: "12px" }}>
      <p className="font-semibold mb-1.5" style={{ color: "#333" }}>{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span style={{ color: "#6C757D" }}>{p.name}:</span>
          <span className="font-semibold" style={{ color: "#333" }}>{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold" style={{ fontSize: "22px", color: "#333" }}>Analytics</h1>
          <p className="text-sm" style={{ color: "#6C757D" }}>Lead performance · Jan – May 2026 · Mock data</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-sm rounded-md outline-none"
            style={{ height: "36px", border: "1px solid #DEE2E6", padding: "0 12px", color: "#333", backgroundColor: "#fff" }}>
            <option>Last 6 months</option>
            <option>Last 3 months</option>
            <option>This month</option>
          </select>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {KPI_CARDS.map(({ label, value, change, up, icon: Icon, color, bg }) => (
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
            <div className="flex items-center gap-1.5 text-xs">
              {up
                ? <TrendingUp size={13} style={{ color: "#198754" }} />
                : <TrendingDown size={13} style={{ color: "#DC3545" }} />}
              <span style={{ color: up ? "#198754" : "#DC3545" }}>{change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Leads over time */}
      <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-sm" style={{ color: "#333" }}>Leads & Conversions Over Time</h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#005897" }} />Leads</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: "#198754" }} />Converted</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={LEADS_OVER_TIME} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#005897" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#005897" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#198754" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#198754" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6C757D" }} />
            <YAxis tick={{ fontSize: 11, fill: "#6C757D" }} />
            <Tooltip content={<CUSTOM_TOOLTIP />} />
            <Area type="monotone" dataKey="leads" name="Leads" stroke="#005897" strokeWidth={2} fill="url(#leadGrad)" dot={{ fill: "#005897", r: 4 }} />
            <Area type="monotone" dataKey="converted" name="Converted" stroke="#198754" strokeWidth={2} fill="url(#convGrad)" dot={{ fill: "#198754", r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Conversion funnel + source */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Funnel */}
        <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 className="font-bold text-sm mb-5" style={{ color: "#333" }}>Conversion Funnel</h3>
          <div className="space-y-2">
            {CONVERSION_FUNNEL.map((stage, i) => {
              const pct = Math.round((stage.value / CONVERSION_FUNNEL[0].value) * 100);
              const dropPct = i > 0
                ? Math.round(((CONVERSION_FUNNEL[i - 1].value - stage.value) / CONVERSION_FUNNEL[i - 1].value) * 100)
                : 0;
              return (
                <div key={stage.name}>
                  {i > 0 && dropPct > 0 && (
                    <div className="flex items-center justify-end text-xs mb-1" style={{ color: "#DC3545" }}>
                      ↓ {dropPct}% drop-off
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <div className="text-xs w-36 flex-shrink-0 text-right" style={{ color: "#6C757D" }}>{stage.name}</div>
                    <div className="flex-1 rounded-full h-7 relative overflow-hidden" style={{ backgroundColor: "#F8F9FA" }}>
                      <div className="h-full rounded-full flex items-center pl-3 transition-all"
                        style={{ width: `${pct}%`, backgroundColor: stage.fill, minWidth: "40px" }}>
                        <span className="text-white text-xs font-bold">{stage.value}</span>
                      </div>
                    </div>
                    <div className="text-xs font-semibold w-10 text-right" style={{ color: stage.fill }}>{pct}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Source breakdown */}
        <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 className="font-bold text-sm mb-5" style={{ color: "#333" }}>Leads by Source Channel</h3>
          <div className="space-y-3">
            {LEADS_BY_SOURCE.map(({ source, leads, color }) => {
              const pct = Math.round((leads / 247) * 100);
              return (
                <div key={source}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: "#4F4F4F" }}>{source}</span>
                    <span className="font-semibold" style={{ color: "#333" }}>{leads} <span style={{ color: "#6C757D" }}>({pct}%)</span></span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: "#F0F0F0" }}>
                    <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Treatment + Country */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* By treatment */}
        <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 className="font-bold text-sm mb-5" style={{ color: "#333" }}>Leads by Treatment</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={LEADS_BY_TREATMENT} layout="vertical" margin={{ top: 0, right: 30, left: 60, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#6C757D" }} />
              <YAxis dataKey="treatment" type="category" tick={{ fontSize: 11, fill: "#4F4F4F" }} width={80} />
              <Tooltip content={<CUSTOM_TOOLTIP />} />
              <Bar dataKey="leads" name="Leads" fill="#005897" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* By country */}
        <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <h3 className="font-bold text-sm mb-5" style={{ color: "#333" }}>Top Patient Countries</h3>
          <div className="space-y-2.5">
            {LEADS_BY_COUNTRY.map(({ country, leads, flag }) => {
              const pct = Math.round((leads / 247) * 100);
              return (
                <div key={country} className="flex items-center gap-3">
                  <span className="text-base w-6 flex-shrink-0">{flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="truncate" style={{ color: "#4F4F4F" }}>{country}</span>
                      <span className="font-semibold flex-shrink-0 ml-2" style={{ color: "#333" }}>{leads}</span>
                    </div>
                    <div className="w-full rounded-full h-1.5" style={{ backgroundColor: "#F0F0F0" }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, backgroundColor: "#005897" }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Insights strip */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: "📈", title: "Best performing month", value: "May 2026", sub: "72 leads — highest ever" },
          { icon: "🏆", title: "Top treatment", value: "Cardiology", sub: "58 leads (23.5% of total)" },
          { icon: "🌍", title: "Top patient country", value: "United Kingdom", sub: "44 leads (17.8%)" },
        ].map(({ icon, title, value, sub }) => (
          <div key={title} className="bg-white rounded-xl p-5 flex items-center gap-4"
            style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div className="text-3xl flex-shrink-0">{icon}</div>
            <div>
              <div className="text-xs" style={{ color: "#6C757D" }}>{title}</div>
              <div className="font-bold text-sm" style={{ color: "#333" }}>{value}</div>
              <div className="text-xs mt-0.5" style={{ color: "#6C757D" }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
