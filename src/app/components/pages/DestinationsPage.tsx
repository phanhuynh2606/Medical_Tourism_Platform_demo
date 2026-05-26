import { Link } from "react-router";
import { ArrowRight, ChevronRight, MapPin, Building2, Users, Plane, CheckCircle, Star } from "lucide-react";
import { DESTINATIONS } from "../data/mockData";

const DEST_EXTRA: Record<string, {
  savings: string;
  flightFrom: string;
  visaEase: string;
  visaNote: string;
  color: string;
  bestFor: string[];
  costExamples: Array<{ procedure: string; price: string; usCost: string }>;
  whyChoose: string[];
}> = {
  thailand: {
    savings: "Up to 75%",
    flightFrom: "~20h from USA · ~10h from UK",
    visaEase: "Visa on Arrival",
    visaNote: "30-day visa on arrival for 64 countries. Medical visa extensions available.",
    color: "#DC3545",
    bestFor: ["Cardiology", "Orthopaedics", "Dental", "Wellness"],
    costExamples: [
      { procedure: "Heart Bypass", price: "$11,000", usCost: "$123,000" },
      { procedure: "Knee Replacement", price: "$9,500", usCost: "$52,000" },
      { procedure: "Dental Implant", price: "$950", usCost: "$4,500" },
    ],
    whyChoose: ["Most JCI hospitals in Asia", "English-speaking staff", "5-star recovery hotels", "Easy visa on arrival"],
  },
  india: {
    savings: "Up to 85%",
    flightFrom: "~16h from USA · ~9h from UK",
    visaEase: "e-Medical Visa",
    visaNote: "e-Medical Visa available online in 3 business days. Valid 60 days, triple entry.",
    color: "#e67e22",
    bestFor: ["Cardiology", "Oncology", "Neurology", "IVF"],
    costExamples: [
      { procedure: "Heart Bypass", price: "$9,000", usCost: "$123,000" },
      { procedure: "Bone Marrow Transplant", price: "$26,000", usCost: "$300,000" },
      { procedure: "IVF Cycle", price: "$3,500", usCost: "$15,000" },
    ],
    whyChoose: ["Harvard & Johns Hopkins-trained surgeons", "Highest savings globally", "World-class oncology centers", "600,000+ international patients yearly"],
  },
  turkey: {
    savings: "Up to 70%",
    flightFrom: "~11h from USA · ~4h from UK",
    visaEase: "e-Visa",
    visaNote: "Simple e-Visa online in minutes. Valid 90 days. Visa-free for EU passport holders.",
    color: "#8e44ad",
    bestFor: ["Dental", "Hair Transplant", "Cardiology", "Eye Surgery"],
    costExamples: [
      { procedure: "All-on-4 Dental", price: "$4,800", usCost: "$28,000" },
      { procedure: "Hair Transplant (4000 grafts)", price: "$2,200", usCost: "$14,000" },
      { procedure: "LASIK (both eyes)", price: "$1,100", usCost: "$4,200" },
    ],
    whyChoose: ["Closest destination for Europeans", "EU-standard hospitals", "World's #1 hair transplant destination", "Istanbul is a top tourist city"],
  },
  malaysia: {
    savings: "Up to 65%",
    flightFrom: "~22h from USA · ~13h from UK",
    visaEase: "Visa Free",
    visaNote: "Visa-free for 162 countries. Medical pass extensions available for treatment stays.",
    color: "#27ae60",
    bestFor: ["Cardiology", "Orthopaedics", "Health Checkup", "IVF"],
    costExamples: [
      { procedure: "Hip Replacement", price: "$12,000", usCost: "$52,000" },
      { procedure: "Executive Checkup", price: "$800", usCost: "$3,500" },
      { procedure: "IVF Cycle", price: "$5,500", usCost: "$15,000" },
    ],
    whyChoose: ["Fully English-speaking country", "Closest to Australia/Middle East", "Tropical recovery environment", "Voted Asia's best hospital (Prince Court)"],
  },
};

const SAVINGS_TABLE = [
  { procedure: "Cardiac Bypass", usa: "$123,000", thailand: "$11K", india: "$9K", turkey: "$18K", malaysia: "$14K" },
  { procedure: "Knee Replacement", usa: "$52,000", thailand: "$9.5K", india: "$7K", turkey: "$11K", malaysia: "$12K" },
  { procedure: "Dental Implant", usa: "$4,500", thailand: "$950", india: "$800", turkey: "$700", malaysia: "$1,100" },
  { procedure: "IVF Cycle", usa: "$15,000", thailand: "$5K", india: "$3.5K", turkey: "$4K", malaysia: "$5.5K" },
  { procedure: "Hair Transplant", usa: "$14,000", thailand: "$3K", india: "—", turkey: "$2.2K", malaysia: "—" },
];

export function DestinationsPage() {
  return (
    <div style={{ backgroundColor: "#F0F4F8" }}>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
          alt="Medical travel destinations"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,20,50,0.96) 0%, rgba(0,40,90,0.88) 55%, rgba(0,61,107,0.78) 100%)" }} />

        <div className="relative py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span style={{ color: "#0DCAF0" }}>Destinations</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ backgroundColor: "rgba(13,202,240,0.15)", color: "#0DCAF0", border: "1px solid rgba(13,202,240,0.3)" }}>
                  <MapPin size={11} /> 4 Curated Destinations
                </div>
                <h1 className="text-white mb-4 leading-tight" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800 }}>
                  Where Will You Go<br />
                  <span style={{ color: "#0DCAF0" }}>For World-Class Care?</span>
                </h1>
                <p style={{ color: "#a8cce0", fontSize: "16px", lineHeight: "1.75" }}>
                  Thailand, India, Turkey, and Malaysia — each destination offers JCI-accredited hospitals, internationally trained surgeons, and savings of 65–85% vs. the West.
                </p>
              </div>

              {/* Highlight stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Building2, value: "175+", label: "Partner Hospitals", sub: "across 4 countries" },
                  { icon: Users, value: "1.5M+", label: "Patients/Year", sub: "combined volume" },
                  { icon: Star, value: "Up to 85%", label: "Cost Savings", sub: "vs. USA prices" },
                  { icon: Plane, value: "4 Countries", label: "Covered", sub: "with visa guidance" },
                ].map(({ icon: Icon, value, label, sub }) => (
                  <div key={label} className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <Icon size={16} style={{ color: "#0DCAF0", marginBottom: "6px" }} />
                    <div style={{ fontSize: "22px", fontWeight: 800, color: "#fff" }}>{value}</div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#c5ddf0" }}>{label}</div>
                    <div style={{ fontSize: "11px", color: "#8bb5d4" }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DESTINATION CARDS GRID ── */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-7">
          {DESTINATIONS.map((dest) => {
            const extra = DEST_EXTRA[dest.id];
            return (
              <div key={dest.id} className="bg-white rounded-2xl overflow-hidden group transition-all hover:-translate-y-1 hover:shadow-2xl"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)", border: "1px solid #E9ECEF" }}>

                {/* Photo header */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.country}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,15,40,0.92) 0%, rgba(0,20,50,0.5) 50%, transparent 100%)" }} />

                  {/* Visa badge top-right */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "#fff", backdropFilter: "blur(6px)" }}>
                    ✈ {extra.visaEase}
                  </div>

                  {/* Savings badge top-left */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: extra.color, color: "#fff" }}>
                    {extra.savings} savings
                  </div>

                  {/* Country info bottom */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-3xl">{dest.flag}</span>
                          <div>
                            <div className="text-white leading-tight" style={{ fontSize: "22px", fontWeight: 800 }}>{dest.country}</div>
                            <div className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{dest.city}</div>
                          </div>
                        </div>
                        <p className="text-xs italic" style={{ color: "#0DCAF0" }}>{dest.tagline}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-black text-lg">{dest.hospitalCount}</div>
                        <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>hospitals</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <p className="text-sm mb-4" style={{ color: "#4F4F4F", lineHeight: "1.7" }}>{dest.overview}</p>

                  {/* Cost examples */}
                  <div className="mb-4 rounded-xl overflow-hidden" style={{ border: "1px solid #E9ECEF" }}>
                    <div className="px-3 py-2 text-xs font-bold" style={{ backgroundColor: "#F0F4F8", color: "#003d6b" }}>
                      Sample Costs vs. USA
                    </div>
                    {extra.costExamples.map(({ procedure, price, usCost }) => (
                      <div key={procedure} className="flex items-center justify-between px-3 py-2.5" style={{ borderTop: "1px solid #F3F4F6" }}>
                        <span className="text-xs" style={{ color: "#4F4F4F" }}>{procedure}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-xs line-through" style={{ color: "#9CA3AF" }}>{usCost}</span>
                          <span className="text-xs font-black" style={{ color: extra.color }}>{price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Strengths */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {dest.strengths.map((s) => (
                      <span key={s} className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ backgroundColor: "#EEF7FF", color: "#005897", border: "1px solid #c5ddf0" }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Why choose */}
                  <div className="grid grid-cols-2 gap-1.5 mb-5">
                    {extra.whyChoose.map((w) => (
                      <div key={w} className="flex items-start gap-1.5 text-xs" style={{ color: "#4F4F4F" }}>
                        <CheckCircle size={11} className="mt-0.5 flex-shrink-0" style={{ color: "#005897" }} />
                        {w}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #F3F4F6" }}>
                    <div className="text-xs" style={{ color: "#6C757D" }}>
                      <span className="font-bold" style={{ color: "#333" }}>{dest.patientCount}</span> patients/yr
                    </div>
                    <Link
                      to={`/destinations/${dest.slug}`}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:gap-2.5"
                      style={{ backgroundColor: "#005897" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#003d6b"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#005897"; }}
                    >
                      Explore {dest.country} <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── COST COMPARISON TABLE ── */}
      <div className="py-14 px-4" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 style={{ fontSize: "26px", fontWeight: 800, color: "#003d6b" }}>Side-by-Side Cost Comparison</h2>
            <p className="mt-2 text-sm" style={{ color: "#6C757D" }}>All prices in USD. Includes surgeon fee, anaesthesia, hospital stay, and basic follow-up.</p>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #DEE2E6", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#003d6b", color: "#fff" }}>
                    <th className="text-left px-5 py-4 font-semibold" style={{ minWidth: "160px" }}>Procedure</th>
                    <th className="px-4 py-4 font-semibold text-center" style={{ color: "#ff6b6b" }}>🇺🇸 USA</th>
                    <th className="px-4 py-4 font-semibold text-center">🇹🇭 Thailand</th>
                    <th className="px-4 py-4 font-semibold text-center">🇮🇳 India</th>
                    <th className="px-4 py-4 font-semibold text-center">🇹🇷 Turkey</th>
                    <th className="px-4 py-4 font-semibold text-center">🇲🇾 Malaysia</th>
                  </tr>
                </thead>
                <tbody>
                  {SAVINGS_TABLE.map((row, i) => (
                    <tr key={row.procedure} style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#F8FAFC", borderBottom: "1px solid #F3F4F6" }}>
                      <td className="px-5 py-3.5 font-semibold" style={{ color: "#333" }}>{row.procedure}</td>
                      <td className="px-4 py-3.5 text-center font-bold" style={{ color: "#DC3545" }}>{row.usa}</td>
                      <td className="px-4 py-3.5 text-center font-black" style={{ color: "#DC3545" }}>{row.thailand}</td>
                      <td className="px-4 py-3.5 text-center font-black" style={{ color: "#e67e22" }}>{row.india}</td>
                      <td className="px-4 py-3.5 text-center font-black" style={{ color: "#8e44ad" }}>{row.turkey}</td>
                      <td className="px-4 py-3.5 text-center font-black" style={{ color: "#27ae60" }}>{row.malaysia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 text-xs" style={{ color: "#9CA3AF", backgroundColor: "#F8FAFC", borderTop: "1px solid #F3F4F6" }}>
              * Prices are estimates. Your actual quote depends on diagnosis, hospital grade, and surgeon. Get a personalized estimate via our <Link to="/cost-estimator" style={{ color: "#005897", fontWeight: 600 }}>Cost Estimator</Link>.
            </div>
          </div>
        </div>
      </div>

      {/* ── VISA STRIP ── */}
      <div className="py-8 px-4" style={{ backgroundColor: "#EEF7FF", borderTop: "1px solid #c5ddf0", borderBottom: "1px solid #c5ddf0" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-bold mb-5" style={{ color: "#005897", letterSpacing: "0.08em", textTransform: "uppercase" }}>Visa Requirements at a Glance</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {DESTINATIONS.map((dest) => {
              const extra = DEST_EXTRA[dest.id];
              return (
                <div key={dest.id} className="bg-white rounded-xl p-4 text-center" style={{ border: "1px solid #c5ddf0" }}>
                  <div className="text-2xl mb-1">{dest.flag}</div>
                  <div className="font-bold text-sm mb-1" style={{ color: "#003d6b" }}>{dest.country}</div>
                  <div className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-2"
                    style={{ backgroundColor: extra.color + "18", color: extra.color }}>
                    {extra.visaEase}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#6C757D" }}>{extra.visaNote}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="py-16 px-4" style={{ background: "linear-gradient(135deg, #002244 0%, #003d6b 50%, #005897 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-3" style={{ fontSize: "28px", fontWeight: 800 }}>Not sure which destination is right for you?</h2>
          <p style={{ color: "#a8cce0" }} className="mb-7 text-base">
            Our team recommends the best destination based on your treatment, budget, travel preferences, and recovery time — at no cost.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg"
              style={{ backgroundColor: "#DC3545", boxShadow: "0 4px 20px rgba(220,53,69,0.4)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#BB2D3B"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#DC3545"; }}>
              Get Destination Advice <ArrowRight size={16} />
            </Link>
            <Link to="/cost-estimator"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white"
              style={{ border: "1.5px solid rgba(255,255,255,0.35)", backgroundColor: "rgba(255,255,255,0.08)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}>
              Compare Costs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
