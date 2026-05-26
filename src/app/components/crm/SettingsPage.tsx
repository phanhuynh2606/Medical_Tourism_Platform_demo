import { useState } from "react";
import { Save, CheckCircle } from "lucide-react";

export function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    businessName: "MedBridge Global Health",
    businessEmail: "hello@medbridgehealth.com",
    businessPhone: "+1 800 MED-BRIDGE",
    notificationEmail: "crm-alerts@medbridgehealth.com",
    whatsappLink: "https://wa.me/84900000000",
    zaloLink: "https://zalo.me/0900000000",
    wechatQR: "",
    autoAssign: false,
    newLeadEmail: true,
    dailySummary: true,
  });

  const update = (field: string, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputStyle = {
    width: "100%",
    height: "38px",
    border: "1px solid #CCCCCC",
    borderRadius: "8px",
    padding: "6px 12px",
    fontSize: "14px",
    outline: "none",
    color: "#333",
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold" style={{ fontSize: "20px", color: "#333" }}>Settings</h1>
          <p className="text-sm" style={{ color: "#6C757D" }}>Manage CRM and business contact settings</p>
        </div>
        <button onClick={save} className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: saved ? "#198754" : "#005897" }}>
          {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
        </button>
      </div>

      {/* Business info */}
      <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <h2 className="font-bold mb-5 text-sm" style={{ color: "#333" }}>Business Contact Details</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { key: "businessName", label: "Business Name" },
            { key: "businessEmail", label: "Business Email" },
            { key: "businessPhone", label: "Phone Number" },
            { key: "notificationEmail", label: "Notification Email" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F4F4F" }}>{label}</label>
              <input
                type="text"
                style={inputStyle}
                value={settings[key as keyof typeof settings] as string}
                onChange={(e) => update(key, e.target.value)}
                onFocus={(e) => { e.target.style.borderColor = "#0D6EFD"; }}
                onBlur={(e) => { e.target.style.borderColor = "#CCCCCC"; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Chat channels */}
      <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <h2 className="font-bold mb-5 text-sm" style={{ color: "#333" }}>Chat Channel Links</h2>
        <div className="space-y-4">
          {[
            { key: "whatsappLink", label: "WhatsApp Link (wa.me)", icon: "💬" },
            { key: "zaloLink", label: "Zalo Link", icon: "🔵" },
            { key: "wechatQR", label: "WeChat QR Image URL", icon: "🟢" },
          ].map(({ key, label, icon }) => (
            <div key={key}>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F4F4F" }}>
                {icon} {label}
              </label>
              <input
                type="url"
                style={inputStyle}
                value={settings[key as keyof typeof settings] as string}
                placeholder="https://..."
                onChange={(e) => update(key, e.target.value)}
                onFocus={(e) => { e.target.style.borderColor = "#0D6EFD"; }}
                onBlur={(e) => { e.target.style.borderColor = "#CCCCCC"; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <h2 className="font-bold mb-5 text-sm" style={{ color: "#333" }}>Email Notifications</h2>
        <div className="space-y-4">
          {[
            { key: "newLeadEmail", label: "New lead notification", desc: "Send email when a new inquiry is submitted" },
            { key: "dailySummary", label: "Daily summary email", desc: "Receive daily digest of lead activity" },
            { key: "autoAssign", label: "Auto-assign leads", desc: "Automatically assign new leads to available consultants (Phase 2)" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between p-4 rounded-lg"
              style={{ backgroundColor: "#F8F9FA", border: "1px solid #DEE2E6" }}>
              <div>
                <div className="font-medium text-sm" style={{ color: "#333" }}>{label}</div>
                <div className="text-xs mt-0.5" style={{ color: "#6C757D" }}>{desc}</div>
              </div>
              <button
                onClick={() => update(key, !settings[key as keyof typeof settings])}
                className="relative inline-flex items-center w-10 h-5 rounded-full transition-colors"
                style={{ backgroundColor: settings[key as keyof typeof settings] ? "#005897" : "#DEE2E6" }}
              >
                <span className="absolute inline-block w-4 h-4 rounded-full bg-white transition-transform shadow-sm"
                  style={{ transform: settings[key as keyof typeof settings] ? "translateX(22px)" : "translateX(2px)" }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
