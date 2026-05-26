import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { ChevronRight, Info, TrendingDown, ArrowRight, MessageCircle, CheckCircle, Sparkles, Heart, Activity, Stethoscope, Baby, Smile, Eye } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const TREATMENT_IMAGES: Record<string, string> = {
  "cardiac-bypass": "https://images.unsplash.com/photo-1579154491781-5e199df316aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "valve-replacement": "https://images.unsplash.com/photo-1579154491781-5e199df316aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "angioplasty": "https://images.unsplash.com/photo-1579154491781-5e199df316aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "knee-replacement": "https://images.unsplash.com/photo-1559757175-5700dde675bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "hip-replacement": "https://images.unsplash.com/photo-1559757175-5700dde675bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "spinal-fusion": "https://images.unsplash.com/photo-1559757175-5700dde675bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "chemotherapy": "https://images.unsplash.com/photo-1578496781985-452d4a934d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "bone-marrow": "https://images.unsplash.com/photo-1578496781985-452d4a934d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "ivf-cycle": "https://images.unsplash.com/photo-1631557676757-fcc7b1160be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "egg-donation": "https://images.unsplash.com/photo-1631557676757-fcc7b1160be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "dental-implant": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "all-on-4": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "veneers-10": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "lasik": "https://images.unsplash.com/photo-1588411948896-660f8f45a1e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "executive-checkup": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "full-body-mri": "https://images.unsplash.com/photo-1516549655169-df83a0774514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  "hair-transplant": "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
};

const TREATMENTS = [
  { id: "cardiac-bypass", label: "Cardiac Bypass Surgery", specialty: "Cardiology", icon: Heart },
  { id: "valve-replacement", label: "Heart Valve Replacement", specialty: "Cardiology", icon: Heart },
  { id: "angioplasty", label: "Angioplasty & Stenting", specialty: "Cardiology", icon: Activity },
  { id: "knee-replacement", label: "Total Knee Replacement", specialty: "Orthopaedics", icon: Activity },
  { id: "hip-replacement", label: "Total Hip Replacement", specialty: "Orthopaedics", icon: Activity },
  { id: "spinal-fusion", label: "Spinal Fusion Surgery", specialty: "Orthopaedics", icon: Activity },
  { id: "chemotherapy", label: "Chemotherapy Treatment", specialty: "Oncology", icon: Stethoscope },
  { id: "bone-marrow", label: "Bone Marrow Transplant", specialty: "Oncology", icon: Stethoscope },
  { id: "ivf-cycle", label: "IVF Single Cycle", specialty: "IVF & Fertility", icon: Baby },
  { id: "egg-donation", label: "IVF with Egg Donation", specialty: "IVF & Fertility", icon: Baby },
  { id: "dental-implant", label: "Dental Implant", specialty: "Dental", icon: Smile },
  { id: "all-on-4", label: "All-on-4 Full Arch", specialty: "Dental", icon: Smile },
  { id: "veneers-10", label: "Porcelain Veneers", specialty: "Dental", icon: Smile },
  { id: "lasik", label: "LASIK Eye Surgery", specialty: "Eye Surgery", icon: Eye },
  { id: "executive-checkup", label: "Executive Health Checkup", specialty: "Wellness", icon: Stethoscope },
  { id: "full-body-mri", label: "Full Body MRI Scan", specialty: "Wellness", icon: Activity },
  { id: "hair-transplant", label: "Hair Transplant", specialty: "Cosmetic", icon: Sparkles },
];

const DESTINATIONS = [
  { id: "thailand", label: "Thailand", flag: "🇹🇭", tier1: 1.0, tier2: 0.75 },
  { id: "india", label: "India", flag: "🇮🇳", tier1: 0.75, tier2: 0.55 },
  { id: "turkey", label: "Turkey", flag: "🇹🇷", tier1: 0.9, tier2: 0.7 },
  { id: "malaysia", label: "Malaysia", flag: "🇲🇾", tier1: 0.95, tier2: 0.8 },
  { id: "south-korea", label: "South Korea", flag: "🇰🇷", tier1: 1.1, tier2: 0.9 },
  { id: "mexico", label: "Mexico", flag: "🇲🇽", tier1: 0.7, tier2: 0.5 },
];

const BASE_COSTS: Record<string, { min: number; max: number; homMin: number; homMax: number }> = {
  "cardiac-bypass": { min: 12000, max: 25000, homMin: 80000, homMax: 150000 },
  "valve-replacement": { min: 10000, max: 22000, homMin: 70000, homMax: 130000 },
  "angioplasty": { min: 5000, max: 11000, homMin: 30000, homMax: 60000 },
  "knee-replacement": { min: 6000, max: 13000, homMin: 35000, homMax: 60000 },
  "hip-replacement": { min: 6500, max: 14000, homMin: 35000, homMax: 65000 },
  "spinal-fusion": { min: 7000, max: 16000, homMin: 40000, homMax: 90000 },
  "chemotherapy": { min: 1200, max: 4000, homMin: 7000, homMax: 15000 },
  "bone-marrow": { min: 25000, max: 60000, homMin: 150000, homMax: 300000 },
  "ivf-cycle": { min: 3000, max: 6000, homMin: 12000, homMax: 20000 },
  "egg-donation": { min: 5000, max: 10000, homMin: 20000, homMax: 35000 },
  "dental-implant": { min: 700, max: 1500, homMin: 3000, homMax: 5000 },
  "all-on-4": { min: 4500, max: 9000, homMin: 20000, homMax: 40000 },
  "veneers-10": { min: 2500, max: 5500, homMin: 12000, homMax: 22000 },
  "lasik": { min: 800, max: 2000, homMin: 4000, homMax: 7000 },
  "executive-checkup": { min: 500, max: 1500, homMin: 2000, homMax: 5000 },
  "full-body-mri": { min: 400, max: 900, homMin: 2500, homMax: 5000 },
  "hair-transplant": { min: 1800, max: 4000, homMin: 10000, homMax: 20000 },
};

const CURRENCIES = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "AUD", symbol: "A$", rate: 1.53 },
  { code: "CAD", symbol: "C$", rate: 1.36 },
  { code: "SGD", symbol: "S$", rate: 1.35 },
  { code: "AED", symbol: "AED", rate: 3.67 },
];

const POPULAR = ["cardiac-bypass", "knee-replacement", "ivf-cycle", "dental-implant", "hair-transplant", "executive-checkup"];
const COMPANION_TRAVEL_COST = 800;

function fmt(amount: number, symbol: string, rate: number) {
  const v = amount * rate;
  if (v >= 1000000) return `${symbol}${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${symbol}${Math.round(v / 1000)}K`;
  return `${symbol}${Math.round(v).toLocaleString()}`;
}

const specialties = [...new Set(TREATMENTS.map((t) => t.specialty))];

export function CostEstimatorPage() {
  const [treatment, setTreatment] = useState("");
  const [tier, setTier] = useState<"tier1" | "tier2">("tier1");
  const [currency, setCurrency] = useState("USD");
  const [companions, setCompanions] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  const cur = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
  const base = BASE_COSTS[treatment];
  const treatmentLabel = TREATMENTS.find((t) => t.id === treatment)?.label || "";

  function destRange(dest: typeof DESTINATIONS[0]) {
    if (!base) return null;
    const m = dest[tier];
    const extra = companions * COMPANION_TRAVEL_COST;
    return {
      min: Math.round(base.min * m) + extra,
      max: Math.round(base.max * m) + extra,
      pct: Math.round((1 - (base.min * m + extra) / base.homMin) * 100),
    };
  }

  useGSAP(() => {
    if (!treatment || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll(".destination-card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    if (selectorRef.current && window.innerWidth >= 1024) {
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 20%",
        end: "bottom 80%",
        pin: selectorRef.current,
        pinSpacing: false,
      });
    }
  }, [treatment]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [treatment]);

  return (
    <main className="overflow-x-hidden w-full max-w-full" style={{ fontFamily: "Outfit, sans-serif", backgroundColor: "#F0F4F8" }}>

      {/* Hero Section */}
      <div ref={heroRef} className="py-14 px-4" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-xs mb-4" style={{ color: "#8bb5d4" }}>
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#0DCAF0" }}>Cost Calculator</span>
          </nav>

          <h1 className="text-white mb-3" style={{ fontSize: "36px", fontWeight: 700 }}>
            Treatment Cost Estimator
          </h1>

          <p style={{ color: "#a8cce0", fontSize: "17px" }}>
            Get instant price comparisons across 6 destinations for 17+ procedures — see exactly how much you can save.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              { value: "17+", label: "Procedures" },
              { value: "6", label: "Destinations" },
              { value: "50+", label: "Partner Hospitals" },
              { value: "Up to 85%", label: "Cost Savings" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold" style={{ color: "#0DCAF0" }}>{value}</div>
                <div className="text-xs" style={{ color: "#8bb5d4" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div id="calculator" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">

          {!treatment ? (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="mb-3" style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "#333333" }}>
                  Select Your Treatment
                </h2>
                <p className="text-lg" style={{ color: "#6C757D" }}>
                  Choose from our most requested procedures below
                </p>
              </div>

              {/* Popular Treatments - Image Cards */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-1 rounded-full" style={{ backgroundColor: "#005897" }}></div>
                  <h3 className="text-lg font-bold" style={{ color: "#005897" }}>Most Requested Procedures</h3>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {POPULAR.map((id) => {
                    const t = TREATMENTS.find((x) => x.id === id)!;
                    const Icon = t.icon;
                    return (
                      <button
                        key={id}
                        onClick={() => setTreatment(id)}
                        onMouseEnter={() => setHoveredCard(id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="group relative overflow-hidden rounded-2xl text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                        style={{
                          transform: hoveredCard === id ? "translateY(-6px)" : "translateY(0)",
                          boxShadow: hoveredCard === id ? "0 16px 40px rgba(0,88,151,0.2)" : "0 4px 12px rgba(0,0,0,0.08)",
                        }}>

                        {/* Image Background */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={TREATMENT_IMAGES[id]}
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-500"
                            style={{ transform: hoveredCard === id ? "scale(1.08)" : "scale(1)" }}
                          />
                          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,88,151,0.9) 0%, rgba(0,88,151,0.3) 50%, transparent 100%)" }} />

                          {/* Icon overlay */}
                          <div className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.95)" }}>
                            <Icon size={24} style={{ color: "#005897" }} />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="bg-white p-5">
                          <h4 className="font-bold text-lg mb-1" style={{ color: "#333" }}>{t.label}</h4>
                          <p className="text-sm mb-3" style={{ color: "#6C757D" }}>{t.specialty}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#EEF7FF", color: "#005897" }}>
                              View Pricing
                            </span>
                            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2" style={{ color: "#005897" }} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* All Specialties */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-1 rounded-full" style={{ backgroundColor: "#6C757D" }}></div>
                  <h3 className="text-lg font-bold" style={{ color: "#333" }}>All Specialties</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {specialties.map((spec) => {
                    const specTreatments = TREATMENTS.filter((t) => t.specialty === spec);
                    return (
                      <div key={spec} className="bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
                        <h4 className="font-bold text-lg mb-4" style={{ color: "#005897" }}>{spec}</h4>
                        <div className="space-y-2">
                          {specTreatments.map((t) => {
                            const Icon = t.icon;
                            return (
                              <button
                                key={t.id}
                                onClick={() => setTreatment(t.id)}
                                className="w-full text-left px-4 py-3 rounded-xl transition-all hover:bg-neutral-50 focus:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-primary flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                  <Icon size={18} style={{ color: "#005897" }} />
                                  <span className="text-sm font-medium" style={{ color: "#333" }}>{t.label}</span>
                                </div>
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" style={{ color: "#9CA3AF" }} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Price Comparison View */
            <div className="grid lg:grid-cols-12 gap-8">

              {/* Pinned Left Selector */}
              <div ref={selectorRef} className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-2xl p-7" style={{ boxShadow: "0 8px 24px rgba(0,88,151,0.12)", border: "2px solid #005897" }}>

                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="text-xs font-semibold mb-1.5 uppercase tracking-wide" style={{ color: "#6C757D" }}>Selected Procedure</div>
                      <h3 className="text-xl font-black" style={{ color: "#005897" }}>{treatmentLabel}</h3>
                    </div>
                    <button
                      onClick={() => setTreatment("")}
                      className="text-xs font-bold px-4 py-2 rounded-lg transition-all hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      style={{ backgroundColor: "#F3F4F6", color: "#6C757D" }}>
                      Change
                    </button>
                  </div>

                  {/* Options */}
                  <div className="space-y-5">
                    {/* Hospital Tier */}
                    <div>
                      <label className="text-sm font-bold block mb-3" style={{ color: "#333" }}>Hospital Tier</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: "tier1" as const, label: "Premium", sub: "JCI-accredited" },
                          { id: "tier2" as const, label: "Standard", sub: "Lower cost" },
                        ].map((t) => (
                          <button key={t.id} onClick={() => setTier(t.id)}
                            className="p-4 rounded-xl text-left transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            style={{
                              border: `2px solid ${tier === t.id ? "#005897" : "#E9ECEF"}`,
                              backgroundColor: tier === t.id ? "#EEF7FF" : "white",
                            }}>
                            <div className="text-sm font-bold" style={{ color: tier === t.id ? "#005897" : "#333" }}>{t.label}</div>
                            <div className="text-xs mt-1" style={{ color: "#6C757D" }}>{t.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Currency */}
                    <div>
                      <label htmlFor="currency-select" className="text-sm font-bold block mb-3" style={{ color: "#333" }}>Currency</label>
                      <select
                        id="currency-select"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full rounded-xl text-sm font-medium outline-none transition-all focus:ring-2 focus:ring-brand-primary"
                        style={{ border: "2px solid #E9ECEF", padding: "12px 16px", backgroundColor: "white", color: "#333" }}>
                        {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
                      </select>
                    </div>

                    {/* Companions */}
                    <div>
                      <label htmlFor="companions-slider" className="text-sm font-bold block mb-3" style={{ color: "#333" }}>
                        Travel Companions: <span style={{ color: "#005897" }}>{companions}</span>
                      </label>
                      <input
                        id="companions-slider"
                        type="range"
                        min={0}
                        max={3}
                        value={companions}
                        onChange={(e) => setCompanions(Number(e.target.value))}
                        aria-label="Number of travel companions"
                        aria-valuemin={0}
                        aria-valuemax={3}
                        aria-valuenow={companions}
                        aria-valuetext={`${companions} companion${companions !== 1 ? 's' : ''}`}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        style={{
                          accentColor: "#005897",
                          background: `linear-gradient(to right, #005897 0%, #005897 ${companions * 33.33}%, #E9ECEF ${companions * 33.33}%, #E9ECEF 100%)`
                        }} />
                      <div className="flex justify-between text-xs mt-2" style={{ color: "#9CA3AF" }}>
                        <span>Solo</span><span>1</span><span>2</span><span>3</span>
                      </div>
                      {companions > 0 && (
                        <div className="text-xs mt-2 px-3 py-2 rounded-lg" style={{ backgroundColor: "#F3F4F6", color: "#6C757D" }}>
                          +{cur.symbol}{companions * COMPANION_TRAVEL_COST} travel estimate
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Home Country Reference */}
                  <div className="mt-8 pt-6 border-t-2" style={{ borderColor: "#F3F4F6" }}>
                    <div className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "#6C757D" }}>Typical Cost at Home</div>
                    <div className="text-3xl font-black mb-1" style={{ color: "#DC3545" }}>
                      {fmt(base.homMin, cur.symbol, cur.rate)}–{fmt(base.homMax, cur.symbol, cur.rate)}
                    </div>
                    <div className="text-xs" style={{ color: "#9CA3AF" }}>USA / UK / Australia average</div>
                  </div>
                </div>

                {/* Info Card */}
                <div className="flex items-start gap-3 p-5 rounded-2xl" style={{ backgroundColor: "#FFFBEB", border: "2px solid #FDE68A" }}>
                  <Info size={16} style={{ color: "#F59E0B", flexShrink: 0, marginTop: "2px" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "#92400E" }}>
                    Indicative ranges only. Actual cost depends on your diagnosis, hospital selection, and surgeon. Get a precise quote via free consultation.
                  </p>
                </div>
              </div>

              {/* Right Destination Cards */}
              <div ref={cardsRef} className="lg:col-span-8 space-y-6">

                <div className="mb-8">
                  <h2 className="mb-3" style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, color: "#333" }}>
                    Compare Destinations
                  </h2>
                  <p className="text-lg" style={{ color: "#6C757D" }}>
                    See how much you can save across six premium medical tourism hubs
                  </p>
                </div>

                {DESTINATIONS.map((dest) => {
                  const r = destRange(dest)!;
                  return (
                    <div
                      key={dest.id}
                      className="destination-card bg-white rounded-2xl overflow-hidden transition-all hover:shadow-2xl focus-within:ring-2 focus-within:ring-brand-primary"
                      style={{
                        boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                        border: "1px solid #E9ECEF",
                        willChange: "transform, opacity",
                      }}>

                      {/* Header Bar */}
                      <div className="p-6 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
                        <div className="flex items-center gap-4">
                          <span className="text-5xl" aria-hidden="true">{dest.flag}</span>
                          <div>
                            <h3 className="text-2xl font-black text-white">{dest.label}</h3>
                            <div className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{treatmentLabel}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>YOU SAVE</div>
                          <div className="text-4xl font-black" style={{ color: "#0DCAF0" }}>{r.pct}%</div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">

                        {/* Price Display */}
                        <div className="mb-6">
                          <div className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "#6C757D" }}>Estimated Cost</div>
                          <div className="text-5xl font-black" style={{ color: "#005897" }}>
                            {fmt(r.min, cur.symbol, cur.rate)} – {fmt(r.max, cur.symbol, cur.rate)}
                          </div>
                          <div className="text-sm mt-2" style={{ color: "#6C757D" }}>
                            {tier === "tier1" ? "Premium JCI-accredited hospital" : "Standard hospital"}
                          </div>
                        </div>

                        {/* Savings Breakdown */}
                        <div className="p-5 rounded-2xl mb-6" style={{ backgroundColor: "#F0FDF4", border: "2px solid #86EFAC" }}>
                          <div className="flex items-center gap-3 mb-2">
                            <TrendingDown size={20} style={{ color: "#16A34A" }} />
                            <div className="text-sm font-bold" style={{ color: "#166534" }}>Total Savings</div>
                          </div>
                          <div className="text-3xl font-black" style={{ color: "#16A34A" }}>
                            {fmt(base.homMin - r.max, cur.symbol, cur.rate)} – {fmt(base.homMax - r.min, cur.symbol, cur.rate)}
                          </div>
                          <div className="text-xs mt-1" style={{ color: "#166534" }}>
                            vs. typical home country costs
                          </div>
                        </div>

                        {/* Included Items */}
                        <div className="mb-6">
                          <div className="text-sm font-bold mb-3" style={{ color: "#333" }}>Typically Included</div>
                          <div className="grid grid-cols-2 gap-2">
                            {["Surgeon fees", "Hospital room", "Operating theatre", "Pre-op tests", "Nursing care", "Follow-up", "Coordinator", "Standard implants"].map((item) => (
                              <div key={item} className="flex items-center gap-2 text-xs" style={{ color: "#4F4F4F" }}>
                                <CheckCircle size={14} style={{ color: "#16A34A", flexShrink: 0 }} />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTAs */}
                        <div className="flex gap-3 pt-5" style={{ borderTop: "2px solid #F3F4F6" }}>
                          <Link to="/contact"
                            className="flex-1 text-center py-4 rounded-xl font-bold text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-cta focus:ring-offset-2"
                            style={{ backgroundColor: "#DC3545", boxShadow: "0 4px 16px rgba(220,53,69,0.2)" }}>
                            Get Free Quote
                          </Link>
                          <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
                            className="flex-1 text-center py-4 rounded-xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 text-white focus:outline-none focus:ring-2 focus:ring-brand-success focus:ring-offset-2"
                            style={{ backgroundColor: "#16A34A", boxShadow: "0 4px 16px rgba(22,163,74,0.2)" }}>
                            <MessageCircle size={18} /> WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Final CTA Section */}
      {treatment && (
        <div className="py-16 px-4" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-white mb-4" style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700 }}>
              Ready for Your Personalized Quote?
            </h2>
            <p className="text-lg mb-8" style={{ color: "#a8cce0" }}>
              Our medical advisors review your case and deliver detailed quotes from accredited hospitals within 24 hours
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-white text-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              style={{ backgroundColor: "#DC3545", boxShadow: "0 12px 32px rgba(220,53,69,0.4)" }}>
              Start Free Consultation
              <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      )}

    </main>
  );
}
