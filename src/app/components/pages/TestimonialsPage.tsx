import { useState } from "react";
import { Link } from "react-router";
import { Star, Quote, ChevronRight, ArrowRight, TrendingDown, Users, Globe, Award } from "lucide-react";
import { TESTIMONIALS } from "../data/mockData";

const ALL_TESTIMONIALS = [
  ...TESTIMONIALS,
  {
    id: 5,
    name: "Carlos Mendez",
    country: "Mexico",
    flag: "🇲🇽",
    treatment: "Spine Surgery",
    specialty: "Orthopaedics",
    hospital: "Vejthani Hospital, Bangkok",
    rating: 5,
    quote: "I had been suffering from chronic back pain for 6 years. Two surgeons in Mexico City said I needed a complex spinal fusion. MedBridge arranged my care in Bangkok — I was treated by a German-trained neurosurgeon and saved over $30,000. I walked pain-free within two weeks.",
    savings: "$31,000",
    date: "May 2026",
    destination: "Thailand",
  },
  {
    id: 6,
    name: "Priya Sharma",
    country: "Canada",
    flag: "🇨🇦",
    treatment: "Breast Cancer Treatment",
    specialty: "Oncology",
    hospital: "Apollo Hospitals, Delhi",
    rating: 5,
    quote: "Facing stage 2 breast cancer with a 14-month NHS wait, I needed to act fast. MedBridge connected me with an oncology team in Delhi within days. Chemotherapy, surgery, and radiation all coordinated seamlessly. I am now in remission.",
    savings: "$55,000",
    date: "February 2026",
    destination: "India",
  },
  {
    id: 7,
    name: "Robert Hansen",
    country: "Denmark",
    flag: "🇩🇰",
    treatment: "All-on-4 Dental Implants",
    specialty: "Dental",
    hospital: "Memorial Şişli, Istanbul",
    rating: 5,
    quote: "My dentist in Copenhagen quoted €42,000 for full dental restoration. The same All-on-4 in Istanbul cost €9,500 — including flights and hotel. The quality is indistinguishable. I tell every friend about MedBridge.",
    savings: "$35,000",
    date: "March 2026",
    destination: "Turkey",
  },
  {
    id: 8,
    name: "Yuki Tanaka",
    country: "Japan",
    flag: "🇯🇵",
    treatment: "Executive Health Screening",
    specialty: "Wellness",
    hospital: "Bumrungrad International, Bangkok",
    rating: 5,
    quote: "I travel to Bangkok twice a year for whole-body MRI, cardiac stress tests, and oncology panels. In Japan the same panel costs ¥800,000 — at Bumrungrad I pay a fraction and get results the same day.",
    savings: "$4,200",
    date: "April 2026",
    destination: "Thailand",
  },
  {
    id: 9,
    name: "Sophie Laurent",
    country: "France",
    flag: "🇫🇷",
    treatment: "IVF with Egg Donation",
    specialty: "IVF & Fertility",
    hospital: "Prince Court Medical, KL",
    rating: 5,
    quote: "After three failed IVF cycles in France at €15,000 each, MedBridge recommended a clinic in Kuala Lumpur with a 62% success rate for egg donation. We are now expecting twins. I cannot put into words what MedBridge made possible for our family.",
    savings: "$28,000",
    date: "January 2026",
    destination: "Malaysia",
  },
  {
    id: 10,
    name: "Ahmed Al-Farsi",
    country: "UAE",
    flag: "🇦🇪",
    treatment: "Heart Valve Replacement",
    specialty: "Cardiology",
    hospital: "Apollo Hospitals, Chennai",
    rating: 5,
    quote: "My cardiologist in Dubai quoted AED 380,000 for a mitral valve replacement. Apollo Chennai quoted $14,000 for the same procedure with a surgeon who has performed over 3,000 open-heart operations. The care was first-class.",
    savings: "$89,000",
    date: "March 2026",
    destination: "India",
  },
];

const SPECIALTIES = ["All", "Cardiology", "Oncology", "Orthopaedics", "Dental", "IVF & Fertility", "Wellness"];

const SPECIALTY_COLORS: Record<string, string> = {
  "Cardiology":    "#e74c3c",
  "Oncology":      "#8e44ad",
  "Orthopaedics":  "#2980b9",
  "Dental":        "#27ae60",
  "IVF & Fertility": "#e67e22",
  "Wellness":      "#005897",
};

const AVATAR_COLORS = ["#005897", "#003d6b", "#0072c3", "#DC3545", "#198754", "#8e44ad", "#e67e22"];

const FEATURED = ALL_TESTIMONIALS[5]; // Priya - cancer story, most impactful

export function TestimonialsPage() {
  const [activeSpec, setActiveSpec] = useState("All");

  const filtered = activeSpec === "All"
    ? ALL_TESTIMONIALS.filter((t) => t.id !== FEATURED.id)
    : ALL_TESTIMONIALS.filter((t) => (t as any).specialty === activeSpec);

  const showFeatured = activeSpec === "All";

  const totalSavings = ALL_TESTIMONIALS.reduce((sum, t) => {
    const n = parseInt(t.savings.replace(/[$,]/g, ""));
    return sum + n;
  }, 0);

  return (
    <div style={{ backgroundColor: "#F0F4F8" }}>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "340px" }}>
        <img
          src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
          alt="Patient stories"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,20,50,0.97) 0%, rgba(0,40,90,0.90) 55%, rgba(0,61,107,0.78) 100%)" }} />

        <div className="relative py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight size={12} />
              <span style={{ color: "#0DCAF0" }}>Patient Stories</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                  style={{ backgroundColor: "rgba(13,202,240,0.15)", color: "#0DCAF0", border: "1px solid rgba(13,202,240,0.3)" }}>
                  <Award size={11} /> Verified Patient Reviews
                </div>
                <h1 className="text-white leading-tight mb-4" style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800 }}>
                  Real Patients.<br />
                  <span style={{ color: "#0DCAF0" }}>Real Outcomes.</span>
                </h1>
                <p style={{ color: "#a8cce0", fontSize: "16px", lineHeight: "1.75" }}>
                  Over 50,000 patients have trusted MedBridge. Every review is verified — tied to a real case, a real hospital, and a real treatment outcome.
                </p>

                {/* Star rating */}
                <div className="flex items-center gap-3 mt-5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-white font-black text-xl">4.95</span>
                  <span className="text-sm" style={{ color: "#8bb5d4" }}>· 3,200+ verified reviews</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Users,      value: "50,000+", label: "Patients Assisted" },
                  { icon: Globe,      value: "190+",    label: "Countries" },
                  { icon: TrendingDown, value: `$${(totalSavings / 1000).toFixed(0)}K+`, label: "Savings Featured" },
                  { icon: Award,      value: "98%",     label: "Would Recommend" },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="p-4 rounded-xl text-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <Icon size={16} style={{ color: "#0DCAF0", margin: "0 auto 6px" }} />
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>{value}</div>
                    <div style={{ fontSize: "12px", color: "#8bb5d4" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FILTER TABS ── */}
      <div className="sticky top-[57px] z-30 bg-white" style={{ borderBottom: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1.5 py-3" style={{ minWidth: "max-content" }}>
            {SPECIALTIES.map((spec) => (
              <button
                key={spec}
                onClick={() => setActiveSpec(spec)}
                className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
                style={{
                  backgroundColor: activeSpec === spec ? "#005897" : "#F8F9FA",
                  color: activeSpec === spec ? "#fff" : "#4F4F4F",
                  border: activeSpec === spec ? "none" : "1px solid #DEE2E6",
                }}>
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">

          {/* ── FEATURED STORY ── */}
          {showFeatured && (
            <div className="mb-10 rounded-2xl overflow-hidden bg-white"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)", border: "1px solid #E9ECEF" }}>
              <div className="grid lg:grid-cols-2">
                {/* Image side */}
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                    alt="Apollo Hospitals India"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 50%, rgba(255,255,255,0.08))" }} />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: "#DC3545" }}>
                    ★ Featured Story
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-white font-bold text-sm">Apollo Hospitals, Delhi</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>India · February 2026</div>
                  </div>
                </div>

                {/* Content side */}
                <div className="p-8 flex flex-col justify-center">
                  <Quote size={32} style={{ color: "#0DCAF0", marginBottom: "12px" }} />
                  <p className="mb-5 leading-relaxed" style={{ fontSize: "16px", color: "#2d3748", fontStyle: "italic" }}>
                    "{FEATURED.quote}"
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg"
                      style={{ backgroundColor: "#8e44ad" }}>
                      {FEATURED.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold" style={{ color: "#003d6b" }}>{FEATURED.name}</div>
                      <div className="text-xs" style={{ color: "#6C757D" }}>{FEATURED.flag} {FEATURED.country}</div>
                    </div>
                    <div className="flex gap-0.5 ml-2">
                      {[...Array(FEATURED.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="text-xs px-3 py-1 rounded-full font-medium"
                      style={{ backgroundColor: "#F3F0FF", color: "#8e44ad" }}>
                      {FEATURED.treatment}
                    </span>
                    <span className="text-xs px-3 py-1.5 rounded-full font-bold"
                      style={{ backgroundColor: "#F0FFF4", color: "#198754" }}>
                      Saved {FEATURED.savings}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── CARDS GRID ── */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p style={{ color: "#6C757D" }}>No stories found for this specialty yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((t, idx) => {
                const spec = (t as any).specialty as string;
                const specColor = SPECIALTY_COLORS[spec] || "#005897";
                const avatarBg = AVATAR_COLORS[idx % AVATAR_COLORS.length];
                return (
                  <div key={t.id}
                    className="bg-white rounded-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl"
                    style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid #E9ECEF" }}>

                    {/* Top accent bar in specialty color */}
                    <div className="h-1" style={{ backgroundColor: specColor }} />

                    <div className="p-6 flex flex-col flex-1">
                      {/* Quote */}
                      <Quote size={22} className="mb-3 flex-shrink-0" style={{ color: specColor }} />
                      <p className="text-sm flex-1 mb-5 leading-relaxed" style={{ color: "#4F4F4F", fontStyle: "italic" }}>
                        "{t.quote}"
                      </p>

                      {/* Savings badge */}
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg mb-4 self-start"
                        style={{ backgroundColor: "#F0FFF4", border: "1px solid #c3e6cb" }}>
                        <TrendingDown size={12} style={{ color: "#198754" }} />
                        <span className="text-xs font-black" style={{ color: "#198754" }}>Saved {t.savings}</span>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #F3F4F6" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black flex-shrink-0"
                            style={{ backgroundColor: avatarBg }}>
                            {t.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm" style={{ color: "#003d6b" }}>{t.name}</div>
                            <div className="text-xs" style={{ color: "#9CA3AF" }}>{t.flag} {t.country} · {t.date}</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>

                      {/* Treatment + hospital */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: `${specColor}12`, color: specColor, border: `1px solid ${specColor}25` }}>
                          {t.treatment}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F0F4F8", color: "#6C757D" }}>
                          {t.hospital}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── AGGREGATE TRUST STRIP ── */}
          <div className="mt-14 rounded-2xl p-8" style={{ background: "linear-gradient(135deg, #002244 0%, #003d6b 50%, #005897 100%)" }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                { value: "4.95 / 5", label: "Average Rating", sub: "across 3,200+ reviews" },
                { value: "98%", label: "Would Recommend", sub: "MedBridge to others" },
                { value: "50,000+", label: "Patients Served", sub: "from 190+ countries" },
                { value: "60–85%", label: "Average Savings", sub: "vs. home country costs" },
              ].map(({ value, label, sub }) => (
                <div key={label}>
                  <div style={{ fontSize: "28px", fontWeight: 800, color: "#0DCAF0" }}>{value}</div>
                  <div className="font-semibold text-sm" style={{ color: "#fff" }}>{label}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#8bb5d4" }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="py-14 px-4" style={{ backgroundColor: "#fff", borderTop: "1px solid #E9ECEF" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#003d6b" }} className="mb-3">
            Your Story Could Be Next
          </h2>
          <p style={{ color: "#6C757D" }} className="mb-7 text-base">
            Join 50,000+ patients who made their health a priority — at a cost they could actually afford.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg"
              style={{ backgroundColor: "#DC3545", boxShadow: "0 4px 16px rgba(220,53,69,0.35)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#BB2D3B"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#DC3545"; }}>
              Start My Journey <ArrowRight size={16} />
            </Link>
            <Link to="/patient-journey"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm"
              style={{ border: "1.5px solid #c5ddf0", color: "#005897", backgroundColor: "#EEF7FF" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ddeeff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#EEF7FF"; }}>
              See How It Works <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
