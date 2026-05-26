import { useParams, Link } from "react-router";
import { ArrowRight, CheckCircle, ChevronRight, MapPin, Star, MessageCircle, Clock, Shield, Users, GraduationCap, Award } from "lucide-react";
import { SERVICES, HOSPITALS } from "../data/mockData";

// ── Brand palette (single color throughout the page body)
const B = {
  primary: "#005897",
  dark: "#003d6b",
  light: "#EEF7FF",
  border: "#c5ddf0",
  muted: "#6C757D",
  text: "#333333",
};

const SERVICE_IMAGES: Record<string, string> = {
  cardiology: "https://images.unsplash.com/photo-1579154491781-5e199df316aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  oncology: "https://images.unsplash.com/photo-1578496781985-452d4a934d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  orthopaedics: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  dental: "https://images.unsplash.com/photo-1663182234283-28941e7612da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  ivf: "https://images.unsplash.com/photo-1631557676757-fcc7b1160be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
  wellness: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
};

const HOSPITAL_IMAGES: Record<string, string> = {
  bumrungrad: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  apollo:     "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  medipol:    "https://images.unsplash.com/photo-1587351021821-f871837248c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  gleneagles: "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  sikarin:    "https://images.unsplash.com/photo-1709497197725-2e97c76b31d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
};

// Doctor photos alternating 6 Unsplash portraits
const DOC_PHOTOS = [
  "https://images.unsplash.com/photo-1637059824899-a441006a6875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1712215544003-af10130f8eb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1550831107-1553da8c8464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  "https://images.unsplash.com/photo-1736289173074-df6009da27c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
];

const SPECIALISTS: Record<string, Array<{ name: string; title: string; credential: string; exp: string; cases: string; hospital: string; photo: number }>> = {
  cardiology: [
    { name: "Dr. Michael Chen", title: "Senior Interventional Cardiologist", credential: "Harvard Medical School · Board Certified", exp: "22 yrs", cases: "4,200+", hospital: "Bumrungrad International, Bangkok", photo: 0 },
    { name: "Dr. Priya Sharma", title: "Cardiac Electrophysiologist", credential: "AIIMS Delhi · Fellowship UK", exp: "18 yrs", cases: "3,100+", hospital: "Apollo Hospitals, Chennai", photo: 1 },
    { name: "Dr. Ahmad Khalil", title: "Cardiothoracic Surgeon", credential: "Johns Hopkins · European Board", exp: "15 yrs", cases: "1,800+", hospital: "Medipol Mega, Istanbul", photo: 3 },
  ],
  oncology: [
    { name: "Dr. Sarah Williams", title: "Medical Oncologist", credential: "MD Anderson · ESMO Certified", exp: "20 yrs", cases: "5,000+", hospital: "Apollo Cancer Centre, Chennai", photo: 2 },
    { name: "Dr. Raj Kumar", title: "Radiation Oncologist", credential: "AIIMS · Linac Specialist", exp: "16 yrs", cases: "3,800+", hospital: "Bumrungrad International, Bangkok", photo: 3 },
    { name: "Dr. Nadia Hassan", title: "Surgical Oncologist", credential: "Charité Berlin · Fellowship USA", exp: "14 yrs", cases: "2,200+", hospital: "Medipol Mega, Istanbul", photo: 5 },
  ],
  orthopaedics: [
    { name: "Dr. Thomas Mueller", title: "Joint Replacement Specialist", credential: "Heidelberg University · AO Fellow", exp: "24 yrs", cases: "6,500+", hospital: "Vejthani Hospital, Bangkok", photo: 4 },
    { name: "Dr. Anita Patel", title: "Spine & Disc Surgeon", credential: "AIIMS Delhi · AOSpine Certified", exp: "17 yrs", cases: "2,900+", hospital: "Fortis FMRI, Gurgaon", photo: 1 },
    { name: "Dr. James Park", title: "Sports Medicine & Arthroscopy", credential: "Seoul National University · ISAKOS", exp: "12 yrs", cases: "3,200+", hospital: "Bumrungrad International, Bangkok", photo: 0 },
  ],
  dental: [
    { name: "Dr. Emma Rodriguez", title: "Cosmetic & Implant Dentist", credential: "NYU College of Dentistry · ITI Fellow", exp: "15 yrs", cases: "4,800+", hospital: "Memorial Şişli, Istanbul", photo: 2 },
    { name: "Dr. Ali Hassan", title: "Oral & Maxillofacial Surgeon", credential: "King's College London · FDSRCS", exp: "18 yrs", cases: "3,300+", hospital: "Bumrungrad International, Bangkok", photo: 3 },
    { name: "Dr. Sofia Chen", title: "Orthodontist & Invisalign Specialist", credential: "Chulalongkorn University · AAO Member", exp: "13 yrs", cases: "5,100+", hospital: "Vejthani Hospital, Bangkok", photo: 5 },
  ],
  ivf: [
    { name: "Dr. Maria Kowalski", title: "Reproductive Endocrinologist", credential: "Jagiellonian University · ESHRE Fellow", exp: "19 yrs", cases: "2,800+", hospital: "Prince Court, Kuala Lumpur", photo: 2 },
    { name: "Dr. Arun Sharma", title: "IVF & Fertility Specialist", credential: "AIIMS Delhi · FOGSI Certified", exp: "16 yrs", cases: "3,500+", hospital: "Apollo Fertility, Chennai", photo: 4 },
    { name: "Dr. Yuki Tanaka", title: "Clinical Embryologist", credential: "Keio University · ESHRE Certified", exp: "11 yrs", cases: "2,100+", hospital: "Bumrungrad International, Bangkok", photo: 1 },
  ],
  wellness: [
    { name: "Dr. Petcharat Narong", title: "Preventive Medicine Specialist", credential: "Mahidol University · AFPM Member", exp: "14 yrs", cases: "8,000+", hospital: "Bumrungrad International, Bangkok", photo: 5 },
    { name: "Dr. Kavya Menon", title: "Anti-Aging & Longevity Expert", credential: "AIIMS · A4M Certified", exp: "12 yrs", cases: "5,200+", hospital: "Apollo Hospitals, Delhi", photo: 1 },
    { name: "Dr. Lucas Weber", title: "Executive Health & Cardiology", credential: "Munich Medical School · ESC Member", exp: "16 yrs", cases: "4,700+", hospital: "Medipol Mega, Istanbul", photo: 0 },
  ],
};

const SERVICE_STATS: Record<string, Array<{ value: string; label: string }>> = {
  cardiology:   [{ value: "95%+", label: "Success Rate" }, { value: "8,000+", label: "Cardiac Cases/yr" }, { value: "3–5 days", label: "Pre-op Stay" }, { value: "85%", label: "Cost Saved vs. US" }],
  oncology:     [{ value: "JCI", label: "Accredited Centers" }, { value: "5,000+", label: "Cancer Cases/yr" }, { value: "Varies", label: "Treatment Duration" }, { value: "75%", label: "Cost Saved vs. US" }],
  orthopaedics: [{ value: "98%", label: "Patient Satisfaction" }, { value: "12,000+", label: "Joint Cases/yr" }, { value: "2–3 weeks", label: "Recovery Stay" }, { value: "80%", label: "Cost Saved vs. US" }],
  dental:       [{ value: "ISO", label: "Certified Clinics" }, { value: "20,000+", label: "Patients/yr" }, { value: "5–14 days", label: "Treatment Stay" }, { value: "70%", label: "Cost Saved vs. EU" }],
  ivf:          [{ value: "55%+", label: "Success Rate" }, { value: "3,000+", label: "IVF Cycles/yr" }, { value: "2–4 weeks", label: "Cycle Duration" }, { value: "65%", label: "Cost Saved vs. US" }],
  wellness:     [{ value: "Same-day", label: "Results Available" }, { value: "30,000+", label: "Checkups/yr" }, { value: "1–3 days", label: "Package Duration" }, { value: "60%", label: "Cost Saved vs. US" }],
};

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: B.text }}>Service Not Found</h2>
          <Link to="/services" className="text-sm" style={{ color: B.primary }}>← Back to Services</Link>
        </div>
      </div>
    );
  }

  const relatedHospitals = HOSPITALS.filter((h) =>
    h.specializations.some((s) => s.toLowerCase().includes(service.title.split(" ")[0].toLowerCase()))
  );
  const stats = SERVICE_STATS[service.id] ?? SERVICE_STATS.cardiology;
  const doctors = SPECIALISTS[service.id] ?? SPECIALISTS.cardiology;

  return (
    <div style={{ backgroundColor: "#F0F4F8" }}>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
        <img
          src={SERVICE_IMAGES[service.id]}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(0,20,50,0.96) 0%, rgba(0,40,90,0.88) 55%, rgba(0,61,107,0.75) 100%)" }} />

        <div className="relative max-w-6xl mx-auto px-4 py-12">
          <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="font-semibold" style={{ color: "#0DCAF0" }}>{service.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                style={{ backgroundColor: "rgba(13,202,240,0.15)", color: "#0DCAF0", border: "1px solid rgba(13,202,240,0.35)" }}>
                <Shield size={11} /> Medical Specialty
              </div>
              <h1 className="text-white mb-3" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, lineHeight: 1.1 }}>
                {service.title}
              </h1>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "17px", lineHeight: "1.7" }}>
                {service.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {service.countries.map((c) => (
                  <span key={c} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-semibold"
                    style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.22)" }}>
                    <MapPin size={10} /> {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Cost card */}
            <div className="flex-shrink-0 rounded-2xl p-6 min-w-52 text-center"
              style={{ backgroundColor: "rgba(255,255,255,0.09)", backdropFilter: "blur(14px)", border: "1.5px solid rgba(255,255,255,0.2)" }}>
              <div className="text-xs font-semibold mb-1" style={{ color: "rgba(255,255,255,0.55)" }}>Cost Range</div>
              <div className="text-2xl font-black text-white mb-1">{service.costRange}</div>
              <div className="text-xs font-medium px-2 py-0.5 rounded-full inline-block"
                style={{ backgroundColor: "rgba(13,202,240,0.2)", color: "#0DCAF0" }}>
                vs. 3–5× more in the West
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS STRIP ── */}
      <div className="px-4" style={{ backgroundColor: B.dark }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            {stats.map(({ value, label }) => (
              <div key={label} className="px-6 py-4 text-center">
                <div className="text-white font-black text-xl leading-none mb-0.5">{value}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-7">

            {/* ── LEFT MAIN ── */}
            <div className="lg:col-span-2 space-y-6">

              {/* Overview */}
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: `2px solid ${B.border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: B.primary }}>
                    <Shield size={15} />
                  </div>
                  <h2 className="font-bold" style={{ fontSize: "17px", color: B.dark }}>Treatment Overview</h2>
                </div>
                <div className="p-6">
                  <p style={{ color: "#4F4F4F", lineHeight: "1.85", fontSize: "15px" }}>{service.overview}</p>
                </div>
              </div>

              {/* Procedures */}
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: `2px solid ${B.border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: B.primary }}>
                    <CheckCircle size={15} />
                  </div>
                  <h2 className="font-bold" style={{ fontSize: "17px", color: B.dark }}>Procedures & Treatments</h2>
                </div>
                <div className="p-6">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {service.procedures.map((proc, i) => (
                      <div key={proc} className="flex items-center gap-3 p-3.5 rounded-xl"
                        style={{ backgroundColor: B.light, border: `1px solid ${B.border}` }}>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                          style={{ backgroundColor: B.primary }}>
                          {i + 1}
                        </div>
                        <span className="text-sm font-medium" style={{ color: B.text }}>{proc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── LEAD SPECIALISTS ── */}
              <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: `2px solid ${B.border}` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: B.primary }}>
                    <GraduationCap size={15} />
                  </div>
                  <div>
                    <h2 className="font-bold" style={{ fontSize: "17px", color: B.dark }}>Lead Specialists</h2>
                    <p className="text-xs" style={{ color: B.muted }}>Verified credentials · Internationally trained</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {doctors.map((doc) => (
                    <div key={doc.name} className="flex gap-4 p-4 rounded-xl transition-shadow hover:shadow-md"
                      style={{ border: "1px solid #E9ECEF", backgroundColor: "#FAFBFC" }}>
                      {/* Photo */}
                      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                        style={{ border: `2px solid ${B.border}` }}>
                        <img
                          src={DOC_PHOTOS[doc.photo]}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm mb-0.5" style={{ color: B.dark }}>{doc.name}</div>
                        <div className="text-xs font-medium mb-1.5" style={{ color: B.primary }}>{doc.title}</div>
                        <div className="flex items-center gap-1 text-xs mb-2" style={{ color: B.muted }}>
                          <Award size={11} /> {doc.credential}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{ backgroundColor: B.light, color: B.primary, border: `1px solid ${B.border}` }}>
                            {doc.exp} experience
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{ backgroundColor: B.light, color: B.primary, border: `1px solid ${B.border}` }}>
                            {doc.cases} cases
                          </span>
                        </div>
                        <div className="text-xs mt-2 flex items-center gap-1" style={{ color: B.muted }}>
                          <MapPin size={10} /> {doc.hospital}
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-center pt-1" style={{ color: B.muted }}>
                    Our coordinator will match you with the right specialist based on your case.
                  </p>
                </div>
              </div>

              {/* Partner hospitals */}
              {relatedHospitals.length > 0 && (
                <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                  <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: `2px solid ${B.border}` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: B.primary }}>
                      <Users size={15} />
                    </div>
                    <h2 className="font-bold" style={{ fontSize: "17px", color: B.dark }}>Recommended Hospitals</h2>
                  </div>
                  <div className="divide-y" style={{ borderColor: "#F3F4F6" }}>
                    {relatedHospitals.map((h) => (
                      <div key={h.id} className="flex gap-0 overflow-hidden transition-all hover:bg-blue-50/30">
                        {/* Hospital photo */}
                        <div className="w-28 flex-shrink-0 overflow-hidden" style={{ minHeight: "96px" }}>
                          <img
                            src={HOSPITAL_IMAGES[h.id] ?? "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=300"}
                            alt={h.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 p-4 flex items-center justify-between gap-3">
                          <div>
                            <div className="font-bold text-sm mb-0.5" style={{ color: B.dark }}>{h.name}</div>
                            <div className="text-xs mb-2" style={{ color: B.muted }}>📍 {h.city}, {h.country}</div>
                            <div className="flex flex-wrap gap-1">
                              {h.accreditations.map((a) => (
                                <span key={a} className="text-xs px-1.5 py-0.5 rounded font-semibold"
                                  style={{ backgroundColor: B.light, color: B.primary, border: `1px solid ${B.border}` }}>
                                  ✓ {a}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center gap-1 justify-end">
                              <Star size={12} className="fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-bold" style={{ color: B.text }}>{h.rating}</span>
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{h.beds.toLocaleString()} beds</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            <div className="space-y-5">

              {/* Primary CTA */}
              <div className="rounded-2xl overflow-hidden" style={{ boxShadow: `0 8px 24px rgba(0,88,151,0.25)` }}>
                <div className="p-6 text-white" style={{ background: `linear-gradient(135deg, ${B.dark} 0%, ${B.primary} 100%)` }}>
                  <div className="text-lg font-black mb-1">Ready to Start?</div>
                  <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.82)" }}>
                    Get a personalized treatment plan and cost estimate from our medical team — free of charge.
                  </p>
                  <Link to="/contact"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-black transition-all"
                    style={{ backgroundColor: "#ffffff", color: B.primary }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#EEF7FF"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}>
                    Request Free Consultation <ArrowRight size={14} />
                  </Link>
                </div>
                <div className="px-6 py-3.5" style={{ backgroundColor: B.light, borderTop: `1px solid ${B.border}` }}>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "#4F4F4F" }}>
                    <CheckCircle size={13} style={{ color: B.primary }} />
                    No commitment · Response within 24 hours
                  </div>
                </div>
              </div>

              {/* Quick facts */}
              <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ backgroundColor: B.primary }} />
                  <h4 className="font-bold text-sm" style={{ color: B.dark }}>Quick Facts</h4>
                </div>
                <div className="space-y-0">
                  {[
                    { label: "Cost Range", value: service.costRange },
                    { label: "Top Destinations", value: service.countries.slice(0, 2).join(", ") },
                    { label: "Partner Hospitals", value: "15+" },
                    { label: "Accreditation", value: "JCI / NABH" },
                    { label: "Procedures", value: `${service.procedures.length} treatments` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2.5"
                      style={{ borderBottom: "1px solid #F3F4F6" }}>
                      <span className="text-xs" style={{ color: "#9CA3AF" }}>{label}</span>
                      <span className="text-xs font-bold" style={{ color: B.text }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ backgroundColor: "#198754", boxShadow: "0 4px 12px rgba(25,135,84,0.3)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
                  <MessageCircle size={18} />
                </div>
                <div>
                  <div className="font-bold">Chat on WhatsApp</div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.8)" }}>Coordinators online now</div>
                </div>
              </a>

              {/* Other services */}
              <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5 rounded-full" style={{ backgroundColor: B.primary }} />
                  <h4 className="font-bold text-sm" style={{ color: B.dark }}>Other Services</h4>
                </div>
                <div className="space-y-0.5">
                  {SERVICES.filter((s) => s.id !== service.id && s.id !== "wellness").map((s) => (
                    <Link key={s.id} to={`/services/${s.slug}`}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors"
                      style={{ color: B.text }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = B.light; e.currentTarget.style.color = B.primary; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = B.text; }}>
                      <span className="font-medium">{s.title}</span>
                      <ChevronRight size={14} style={{ color: "#9CA3AF" }} />
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="py-14 px-4" style={{ background: `linear-gradient(135deg, ${B.dark} 0%, ${B.primary} 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <Clock size={28} className="mx-auto mb-3" style={{ color: "#0DCAF0" }} />
          <h2 className="text-white mb-3" style={{ fontSize: "26px", fontWeight: 800 }}>
            Get Your Free {service.title} Opinion
          </h2>
          <p style={{ color: "#a8cce0" }} className="mb-7 text-base">
            Share your medical reports and our specialist will review your case within 24 hours — at no cost.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg"
            style={{ backgroundColor: "#DC3545", boxShadow: "0 4px 16px rgba(220,53,69,0.4)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#BB2D3B"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#DC3545"; }}>
            Get a Free Medical Opinion <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
