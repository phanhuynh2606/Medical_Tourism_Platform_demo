import { useState } from "react";
import { Link } from "react-router";
import { Star, ChevronRight, ArrowRight, Search, Shield, Award, Users, CheckCircle, MapPin } from "lucide-react";

const ALL_HOSPITALS = [
  {
    id: "bumrungrad",
    name: "Bumrungrad International Hospital",
    country: "Thailand",
    city: "Bangkok",
    flag: "🇹🇭",
    accreditations: ["JCI", "AACI"],
    specializations: ["Cardiology", "Oncology", "Orthopaedics", "Neurology"],
    beds: 580,
    established: 1980,
    patients: "1.1M+",
    description: "One of Asia's most internationally recognized hospitals, treating over 1.1 million patients from 190 countries annually.",
    rating: 4.9,
    reviews: 4820,
    highlight: "190 countries served",
    color: "#005897",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "vejthani",
    name: "Vejthani Hospital",
    country: "Thailand",
    city: "Bangkok",
    flag: "🇹🇭",
    accreditations: ["JCI", "AACI"],
    specializations: ["Orthopaedics", "Spine Surgery", "Sports Medicine", "Dental"],
    beds: 400,
    established: 1994,
    patients: "350K+",
    description: "Award-winning hospital known for its orthopedic and spine surgery excellence, with a dedicated international patient center.",
    rating: 4.8,
    reviews: 2340,
    highlight: "Best orthopedic center in Thailand",
    color: "#005897",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "apollo",
    name: "Apollo Hospitals",
    country: "India",
    city: "Chennai / Delhi / Mumbai",
    flag: "🇮🇳",
    accreditations: ["JCI", "NABH"],
    specializations: ["Cardiology", "Oncology", "Neurology", "Orthopaedics"],
    beds: 10000,
    established: 1983,
    patients: "3M+",
    description: "Asia's largest healthcare group with 70+ hospitals, pioneering advanced cardiac and oncology procedures with world-class outcomes.",
    rating: 4.8,
    reviews: 9610,
    highlight: "Asia's largest healthcare group",
    color: "#DC3545",
    image: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "fortis",
    name: "Fortis Memorial Research Institute",
    country: "India",
    city: "Gurgaon / Delhi",
    flag: "🇮🇳",
    accreditations: ["JCI", "NABH", "ISO 9001"],
    specializations: ["Bone Marrow Transplant", "Robotic Surgery", "Cardiology", "Cancer"],
    beds: 1000,
    established: 2001,
    patients: "800K+",
    description: "India's leading super-specialty hospital with 14 centres of excellence, including Asia's first 256-slice CT scanner.",
    rating: 4.7,
    reviews: 3870,
    highlight: "First robotic surgery in North India",
    color: "#DC3545",
    image: "https://images.unsplash.com/photo-1578496781985-452d4a934d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "medipol",
    name: "Medipol Mega University Hospital",
    country: "Turkey",
    city: "Istanbul",
    flag: "🇹🇷",
    accreditations: ["JCI", "TUV"],
    specializations: ["Cardiology", "Oncology", "Transplant", "Neurology"],
    beds: 470,
    established: 2014,
    patients: "500K+",
    description: "Turkey's largest private hospital complex with 470 beds and 24 specialist clinics, ranked among Europe's top medical centers.",
    rating: 4.7,
    reviews: 2150,
    highlight: "Turkey's largest private hospital",
    color: "#e67e22",
    image: "https://images.unsplash.com/photo-1587351021821-f871837248c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "memorial",
    name: "Memorial Şişli Hospital",
    country: "Turkey",
    city: "Istanbul",
    flag: "🇹🇷",
    accreditations: ["JCI", "ISO 9001"],
    specializations: ["Dental", "Hair Transplant", "Cosmetic Surgery", "Eye Surgery"],
    beds: 300,
    established: 1995,
    patients: "400K+",
    description: "Europe's top destination for dental, hair restoration, and cosmetic procedures with internationally certified surgeons and a 5-star patient experience.",
    rating: 4.9,
    reviews: 5630,
    highlight: "#1 hair transplant destination globally",
    color: "#e67e22",
    image: "https://images.unsplash.com/photo-1663182234283-28941e7612da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "gleneagles",
    name: "Gleneagles Hospital",
    country: "Malaysia",
    city: "Kuala Lumpur",
    flag: "🇲🇾",
    accreditations: ["JCI", "MSQH"],
    specializations: ["Cardiology", "Orthopaedics", "Oncology", "Neurology"],
    beds: 380,
    established: 1978,
    patients: "250K+",
    description: "A flagship Parkway Pantai hospital offering international-standard care in a state-of-the-art facility with multilingual staff.",
    rating: 4.8,
    reviews: 1970,
    highlight: "Parkway Pantai flagship",
    color: "#27ae60",
    image: "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "prince-court",
    name: "Prince Court Medical Centre",
    country: "Malaysia",
    city: "Kuala Lumpur",
    flag: "🇲🇾",
    accreditations: ["JCI", "MSQH", "ISO 9001"],
    specializations: ["IVF & Fertility", "Health Checkup", "Cardiology", "Oncology"],
    beds: 260,
    established: 2007,
    patients: "150K+",
    description: "Ranked Asia's best hospital multiple years running, with a dedicated fertility centre, executive health screening, and a world-class maternity ward.",
    rating: 4.9,
    reviews: 3210,
    highlight: "Voted Asia's best hospital",
    color: "#27ae60",
    image: "https://images.unsplash.com/photo-1631557676757-fcc7b1160be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: "sikarin",
    name: "Sikarin Hospital",
    country: "Thailand",
    city: "Bangkok",
    flag: "🇹🇭",
    accreditations: ["JCI"],
    specializations: ["Orthopaedics", "Spine Surgery", "Sports Medicine"],
    beds: 250,
    established: 1983,
    patients: "200K+",
    description: "Renowned orthopedic center with internationally trained surgeons specializing in joint replacement and spine surgery.",
    rating: 4.7,
    reviews: 1540,
    highlight: "Award-winning spine surgery",
    color: "#005897",
    image: "https://images.unsplash.com/photo-1709497197725-2e97c76b31d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

const COUNTRY_TABS = [
  { label: "All Hospitals", value: "all", flag: "🌏", count: ALL_HOSPITALS.length },
  { label: "Thailand", value: "Thailand", flag: "🇹🇭", count: ALL_HOSPITALS.filter((h) => h.country === "Thailand").length },
  { label: "India", value: "India", flag: "🇮🇳", count: ALL_HOSPITALS.filter((h) => h.country === "India").length },
  { label: "Turkey", value: "Turkey", flag: "🇹🇷", count: ALL_HOSPITALS.filter((h) => h.country === "Turkey").length },
  { label: "Malaysia", value: "Malaysia", flag: "🇲🇾", count: ALL_HOSPITALS.filter((h) => h.country === "Malaysia").length },
];

const TRUST_CRITERIA = [
  { icon: Shield, label: "JCI Accreditation", desc: "Only internationally accredited hospitals are accepted into our network — no exceptions." },
  { icon: Award, label: "Surgeon Credentials", desc: "Every specialist is verified: board-certified, internationally trained, and peer-reviewed." },
  { icon: Users, label: "Outcome Data", desc: "We review real complication rates, infection records, and patient satisfaction scores annually." },
  { icon: CheckCircle, label: "Infrastructure Audit", desc: "Our medical team personally audits each partner hospital's ICU, theatres, and recovery wards." },
];


export function HospitalsPage() {
  const [activeCountry, setActiveCountry] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpec, setActiveSpec] = useState("All");

  const allSpecs = ["All", "Cardiology", "Oncology", "Orthopaedics", "Dental", "IVF & Fertility", "Neurology"];

  const filtered = ALL_HOSPITALS.filter((h) => {
    const matchCountry = activeCountry === "all" || h.country === activeCountry;
    const matchSearch = !searchQuery || h.name.toLowerCase().includes(searchQuery.toLowerCase()) || h.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSpec = activeSpec === "All" || h.specializations.some((s) => s.toLowerCase().includes(activeSpec.toLowerCase()));
    return matchCountry && matchSearch && matchSpec;
  });

  return (
    <div style={{ backgroundColor: "#F0F4F8" }}>

      {/* ── HERO HEADER ── */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #002244 0%, #003d6b 50%, #005897 100%)" }}>
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5" style={{ background: "#0DCAF0", transform: "translate(30%, -30%)" }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5" style={{ background: "#0DCAF0", transform: "translate(-30%, 30%)" }} />

        <div className="relative py-14 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-xs mb-4" style={{ color: "#8bb5d4" }}>
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight size={12} />
              <span style={{ color: "#0DCAF0" }}>Hospital Network</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
                  style={{ backgroundColor: "rgba(13,202,240,0.15)", color: "#0DCAF0", border: "1px solid rgba(13,202,240,0.3)" }}>
                  <Shield size={11} /> Verified Partner Network
                </div>
                <h1 className="text-white mb-4 leading-tight" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800 }}>
                  {ALL_HOSPITALS.length} World-Class Hospitals.<br />
                  <span style={{ color: "#0DCAF0" }}>All Verified. All Trusted.</span>
                </h1>
                <p style={{ color: "#a8cce0", fontSize: "16px", lineHeight: "1.7" }}>
                  Every hospital in our network passes a 4-point audit — JCI accreditation, surgeon credentials, outcome data, and infrastructure review. We don't list. We curate.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "50+", label: "Partner Hospitals", sub: "across 12 countries" },
                  { value: "190", label: "Countries Served", sub: "by our network" },
                  { value: "4.8★", label: "Avg Rating", sub: "across all partners" },
                  { value: "100%", label: "JCI Accredited", sub: "no exceptions" },
                ].map(({ value, label, sub }) => (
                  <div key={label} className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <div style={{ fontSize: "26px", fontWeight: 800, color: "#0DCAF0" }}>{value}</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{label}</div>
                    <div style={{ fontSize: "11px", color: "#8bb5d4" }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SEARCH + FILTERS ── */}
      <div className="sticky top-[57px] z-30 bg-white" style={{ borderBottom: "2px solid #DEE2E6", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-3 py-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
              <input
                type="text"
                placeholder="Search hospitals or cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg outline-none text-sm"
                style={{ padding: "9px 12px 9px 36px", backgroundColor: "#F8F9FA", border: "1px solid #DEE2E6", color: "#333" }}
              />
            </div>

            {/* Country tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-0.5" style={{ flexShrink: 0 }}>
              {COUNTRY_TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveCountry(tab.value)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all"
                  style={{
                    backgroundColor: activeCountry === tab.value ? "#005897" : "#F8F9FA",
                    color: activeCountry === tab.value ? "#fff" : "#4F4F4F",
                    border: activeCountry === tab.value ? "none" : "1px solid #DEE2E6",
                  }}
                >
                  {tab.flag} {tab.label}
                  <span className="rounded-full px-1.5 py-0.5 text-xs"
                    style={{
                      backgroundColor: activeCountry === tab.value ? "rgba(255,255,255,0.25)" : "#E9ECEF",
                      color: activeCountry === tab.value ? "#fff" : "#6C757D",
                    }}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Specialty filter */}
          <div className="flex gap-1.5 pb-3 overflow-x-auto">
            {allSpecs.map((spec) => (
              <button
                key={spec}
                onClick={() => setActiveSpec(spec)}
                className="px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all"
                style={{
                  backgroundColor: activeSpec === spec ? "#EEF7FF" : "transparent",
                  color: activeSpec === spec ? "#005897" : "#9CA3AF",
                  border: activeSpec === spec ? "1.5px solid #005897" : "1px solid transparent",
                }}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOSPITAL CARDS ── */}
      <div className="py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p style={{ color: "#6C757D" }}>No hospitals match your search. Try a different filter.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((hospital) => (
                <div
                  key={hospital.id}
                  className="bg-white rounded-2xl overflow-hidden group transition-all hover:-translate-y-2 hover:shadow-2xl"
                  style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid #E9ECEF" }}
                >
                  {/* Photo */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,20,60,0.92) 0%, rgba(0,30,80,0.55) 50%, transparent 100%)" }} />

                    {/* Country + city */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: "rgba(0,0,0,0.45)", color: "#fff", backdropFilter: "blur(6px)" }}>
                      {hospital.flag} {hospital.city}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}>
                      <Star size={11} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-white">{hospital.rating}</span>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>({(hospital.reviews / 1000).toFixed(1)}k)</span>
                    </div>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {/* Accreditation badges */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {hospital.accreditations.map((acc) => (
                          <span key={acc} className="text-xs px-2.5 py-0.5 rounded-full font-bold"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.90)",
                              color: "#003d6b",
                              backdropFilter: "blur(6px)",
                            }}>
                            {acc}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-white leading-tight" style={{ fontSize: "16px", fontWeight: 800, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                        {hospital.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    {/* Highlight chip */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3"
                      style={{ backgroundColor: "#EEF7FF", color: "#005897", border: "1px solid #c5ddf0" }}>
                      ★ {hospital.highlight}
                    </div>

                    <p className="text-sm mb-4" style={{ color: "#4F4F4F", lineHeight: "1.65" }}>
                      {hospital.description}
                    </p>

                    {/* Specializations */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {hospital.specializations.map((spec) => (
                        <span key={spec} className="text-xs px-2 py-0.5 rounded-md"
                          style={{ backgroundColor: "#F0F4F8", color: "#4F4F4F", border: "1px solid #DEE2E6" }}>
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Key stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl" style={{ backgroundColor: "#F8F9FA" }}>
                      <div className="text-center">
                        <div className="font-bold text-sm" style={{ color: "#333" }}>{hospital.patients}</div>
                        <div className="text-xs" style={{ color: "#9CA3AF" }}>Patients</div>
                      </div>
                      <div className="text-center" style={{ borderLeft: "1px solid #DEE2E6", borderRight: "1px solid #DEE2E6" }}>
                        <div className="font-bold text-sm" style={{ color: "#333" }}>{hospital.beds.toLocaleString()}</div>
                        <div className="text-xs" style={{ color: "#9CA3AF" }}>Beds</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-sm" style={{ color: "#333" }}>Est. {hospital.established}</div>
                        <div className="text-xs" style={{ color: "#9CA3AF" }}>Founded</div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs" style={{ color: "#6C757D" }}>
                        <MapPin size={11} />
                        {hospital.city}, {hospital.country}
                      </div>
                      <Link
                        to="/contact"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:gap-2.5"
                        style={{ backgroundColor: "#005897" }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#003d6b"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#005897"; }}
                      >
                        Get a Quote <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── WHY WE SELECT ── */}
      <div className="py-14 px-4" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
              style={{ backgroundColor: "#EEF7FF", color: "#005897", border: "1px solid #c5ddf0" }}>
              <Shield size={12} /> Our Vetting Process
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#003d6b" }}>How We Choose Our Partner Hospitals</h2>
            <p className="mt-2 text-sm" style={{ color: "#6C757D" }}>We apply a rigorous 4-point audit before accepting any hospital into our network.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TRUST_CRITERIA.map(({ icon: Icon, label, desc }, i) => (
              <div key={label} className="p-6 rounded-2xl text-center transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ backgroundColor: "#F8F9FA", border: "1px solid #E9ECEF" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "#EEF7FF" }}>
                  <Icon size={22} style={{ color: "#005897" }} />
                </div>
                <div className="text-xs font-bold rounded-full px-2 py-0.5 inline-block mb-2"
                  style={{ backgroundColor: "#005897", color: "#fff" }}>0{i + 1}</div>
                <h4 className="mb-2" style={{ fontSize: "14px", fontWeight: 700, color: "#333" }}>{label}</h4>
                <p className="text-xs leading-relaxed" style={{ color: "#6C757D" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ACCREDITATION LOGOS ── */}
      <div className="py-8 px-4" style={{ backgroundColor: "#F0F4F8", borderTop: "1px solid #E9ECEF" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold mb-5" style={{ color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Accepted Accreditation Standards
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["JCI (Joint Commission International)", "NABH (India)", "MSQH (Malaysia)", "TUV SUD", "AACI", "ISO 9001:2015"].map((badge) => (
              <div key={badge} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white"
                style={{ border: "1px solid #DEE2E6", color: "#005897" }}>
                <CheckCircle size={12} style={{ color: "#005897" }} /> {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="py-16 px-4" style={{ background: "linear-gradient(135deg, #002244 0%, #003d6b 50%, #005897 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-3" style={{ fontSize: "28px", fontWeight: 800 }}>Not sure which hospital is right for you?</h2>
          <p style={{ color: "#a8cce0" }} className="mb-7 text-base">
            Share your diagnosis and we'll match you with the best hospital and specialist within 24 hours — for free.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg"
              style={{ backgroundColor: "#DC3545", boxShadow: "0 4px 20px rgba(220,53,69,0.4)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#BB2D3B"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#DC3545"; }}>
              Get a Hospital Match <ArrowRight size={16} />
            </Link>
            <Link to="/cost-estimator"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white"
              style={{ border: "1.5px solid rgba(255,255,255,0.35)", backgroundColor: "rgba(255,255,255,0.08)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}>
              Estimate My Cost <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
