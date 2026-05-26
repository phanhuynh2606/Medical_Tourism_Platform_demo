import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Eye, EyeOff, Shield } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "admin@medbridge.com", password: "demo1234" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Simulate auth
    await new Promise((r) => setTimeout(r, 800));
    if (form.email === "admin@medbridge.com" && form.password === "demo1234") {
      navigate("/admin");
    } else {
      setError("Invalid email or password. Use admin@medbridge.com / demo1234");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#F8F9FA" }}>
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-between p-10"
        style={{ background: "linear-gradient(160deg, #002d50 0%, #005897 60%, #0072c3 100%)" }}>
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
              <span className="font-black text-lg" style={{ color: "#005897" }}>M</span>
            </div>
            <div>
              <div className="text-white font-bold text-xl">MedBridge</div>
              <div className="text-xs" style={{ color: "#0DCAF0" }}>Global Health CRM</div>
            </div>
          </div>
          <h2 className="text-white mb-4" style={{ fontSize: "28px", fontWeight: 700, lineHeight: "1.3" }}>
            Manage patient journeys with confidence.
          </h2>
          <p style={{ color: "#8bb5d4", fontSize: "15px", lineHeight: "1.6" }}>
            The MedBridge CRM helps your team track leads, manage medical consultations, and deliver exceptional patient care — all in one secure platform.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Active Leads", value: "247" },
            { label: "Conversions this month", value: "31" },
            { label: "Partner Hospitals", value: "180+" },
            { label: "Countries Served", value: "190+" },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl p-4" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              <div className="font-bold text-2xl text-white">{value}</div>
              <div className="text-xs mt-0.5" style={{ color: "#8bb5d4" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#005897" }}>
              <span className="text-white font-black text-lg">M</span>
            </div>
            <div>
              <div className="font-bold" style={{ color: "#333" }}>MedBridge CRM</div>
            </div>
          </div>

          <div className="rounded-2xl p-8 bg-white shadow-xl" style={{ border: "1px solid #DEE2E6" }}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#EEF7FF" }}>
                <Shield size={16} style={{ color: "#005897" }} />
              </div>
              <div>
                <h1 className="font-bold" style={{ fontSize: "20px", color: "#333333" }}>Sign In to CRM</h1>
                <p className="text-xs" style={{ color: "#6C757D" }}>Authorized personnel only</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F4F4F" }}>Email Address</label>
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full outline-none transition-all"
                  style={{ height: "40px", border: "1px solid #CCCCCC", borderRadius: "8px", padding: "6px 14px", fontSize: "14px" }}
                  onFocus={(e) => { e.target.style.borderColor = "#0D6EFD"; e.target.style.boxShadow = "0 0 0 2px rgba(13,110,253,0.1)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#CCCCCC"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F4F4F" }}>Password</label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full outline-none transition-all"
                    style={{ height: "40px", border: "1px solid #CCCCCC", borderRadius: "8px", padding: "6px 40px 6px 14px", fontSize: "14px" }}
                    onFocus={(e) => { e.target.style.borderColor = "#0D6EFD"; e.target.style.boxShadow = "0 0 0 2px rgba(13,110,253,0.1)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#CCCCCC"; e.target.style.boxShadow = "none"; }}
                  />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} style={{ color: "#6C757D" }} /> : <Eye size={16} style={{ color: "#6C757D" }} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-xs px-3 py-2 rounded-lg" style={{ backgroundColor: "#FFF3F3", color: "#DC3545", border: "1px solid #f5c2c7" }}>
                  {error}
                </div>
              )}

              <div className="rounded-lg px-3 py-2 text-xs" style={{ backgroundColor: "#F0FFF4", color: "#198754", border: "1px solid #c3e6cb" }}>
                Demo credentials: admin@medbridge.com / demo1234
              </div>

              <button type="submit" disabled={loading}
                className="w-full text-white font-bold text-sm rounded-md transition-colors disabled:opacity-70"
                style={{ backgroundColor: "#005897", height: "44px" }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#003d6b"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#005897"; }}>
                {loading ? "Signing in..." : "Sign In to CRM"}
              </button>
            </form>
          </div>

          <div className="text-center mt-6">
            <Link to="/" className="text-sm" style={{ color: "#6C757D" }}>
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
