import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Heart, Activity, Star, ChevronRight, CheckCircle, Shield,
  Users, Award, Clock, Phone, ArrowRight, Quote
} from "lucide-react";
import { SERVICES, DESTINATIONS, HOSPITALS, TESTIMONIALS } from "../data/mockData";
import { SEO } from "../seo/SEO";

const TRUST_STATS = [
  { value: "50,000+", label: "Patients Assisted", icon: Users },
  { value: "190+", label: "Countries Served", icon: Award },
  { value: "4.9★", label: "Average Rating", icon: Star },
  { value: "98%", label: "Satisfaction Rate", icon: CheckCircle },
];

const FREE_SERVICES = [
  { icon: Shield, title: "Free Medical Opinion", desc: "Get expert medical opinions from partner hospitals at no cost." },
  { icon: Users, title: "Personal Coordinator", desc: "Dedicated case manager guides you through every step." },
  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance in your preferred language." },
  { icon: Phone, title: "Travel Logistics", desc: "Airport transfers, accommodation, and visa support." },
  { icon: Award, title: "Quality Assurance", desc: "Only JCI-accredited or equivalent hospitals in our network." },
  { icon: CheckCircle, title: "Post-Treatment Care", desc: "Follow-up coordination and remote consultation support." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Submit Inquiry", desc: "Fill out our secure medical inquiry form with your treatment needs and medical history." },
  { step: "02", title: "Medical Review", desc: "Our medical team reviews your case and recommends suitable hospitals and specialists." },
  { step: "03", title: "Get Your Quote", desc: "Receive detailed cost estimates from top hospitals with no hidden fees." },
  { step: "04", title: "Plan Your Journey", desc: "We arrange everything — appointments, travel, accommodation, and translations." },
  { step: "05", title: "Receive Treatment", desc: "Undergo your treatment with a dedicated coordinator by your side." },
  { step: "06", title: "Follow-Up Care", desc: "Post-treatment monitoring and communication with your medical team." },
];

const HOSPITAL_IMAGES: Record<string, string> = {
  bumrungrad: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  apollo: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  medipol: "https://images.unsplash.com/photo-1587351021821-f871837248c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  gleneagles: "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  vejthani: "https://images.unsplash.com/photo-1709497197725-2e97c76b31d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
};

const COUNTRY_CODES = [
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+61", flag: "🇦🇺", label: "AU" },
  { code: "+49", flag: "🇩🇪", label: "DE" },
  { code: "+33", flag: "🇫🇷", label: "FR" },
  { code: "+84", flag: "🇻🇳", label: "VN" },
  { code: "+66", flag: "🇹🇭", label: "TH" },
  { code: "+91", flag: "🇮🇳", label: "IN" },
  { code: "+90", flag: "🇹🇷", label: "TR" },
  { code: "+60", flag: "🇲🇾", label: "MY" },
  { code: "+65", flag: "🇸🇬", label: "SG" },
  { code: "+971", flag: "🇦🇪", label: "AE" },
  { code: "+966", flag: "🇸🇦", label: "SA" },
  { code: "+7", flag: "🇷🇺", label: "RU" },
  { code: "+86", flag: "🇨🇳", label: "CN" },
];

export function HomePage() {
  const navigate = useNavigate();
  const [heroForm, setHeroForm] = useState({ name: "", treatment: "", country: "", phone: "", countryCode: "+1" });

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = heroForm.countryCode && heroForm.phone
      ? `${heroForm.countryCode} ${heroForm.phone}`
      : heroForm.phone;
    navigate("/contact", {
      state: {
        prefilled: {
          fullName: heroForm.name,
          phone,
          countryOfResidence: heroForm.country,
          treatmentInterests: heroForm.treatment ? [heroForm.treatment] : [],
        },
      },
    });
  };

  return (
    <div>
      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 45%, #0072c3 100%)", minHeight: "580px" }}>
        {/* Background pattern */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.18 }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,40,80,0.7) 0%, rgba(0,60,120,0.5) 50%, rgba(0,80,160,0.4) 100%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: headline + stats */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ backgroundColor: "rgba(13,202,240,0.15)", color: "#0DCAF0", border: "1px solid rgba(13,202,240,0.3)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                Trusted by 50,000+ international patients
              </div>

              <h1 className="mb-5 leading-tight" style={{ color: "#ffffff", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 600 }}>
                World-Class Healthcare,<br />
                <span style={{ color: "#0DCAF0" }}>Exceptional Savings.</span>
              </h1>

              <p className="text-lg mb-8" style={{ color: "#a8cce0", lineHeight: "1.7" }}>
                We connect you with JCI-accredited hospitals across Asia for cardiac surgery, cancer treatment, orthopaedics, dental, IVF, and more — at 40–80% lower cost, with a dedicated concierge every step of the way.
              </p>

              {/* Trust stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {TRUST_STATS.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="text-center p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <div className="text-2xl font-bold" style={{ color: "#0DCAF0" }}>{value}</div>
                    <div className="text-xs mt-1" style={{ color: "#8bb5d4" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Accreditations */}
              <div className="flex flex-wrap items-center gap-2">
                {["JCI Accredited Partners", "GDPR Compliant", "ISO Certified", "Medical Advisory Board"].map((b) => (
                  <span key={b} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs" style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#c8e0f4", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <CheckCircle size={11} style={{ color: "#198754" }} />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Quick inquiry form */}
            <div>
              <div className="rounded-2xl p-7 shadow-2xl" style={{ backgroundColor: "#ffffff" }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#198754" }} />
                  <span className="text-sm font-semibold" style={{ color: "#005897" }}>Free Consultation — Response within 24h</span>
                </div>
                <h2 className="mb-5" style={{ fontSize: "22px", fontWeight: 600, color: "#333333" }}>
                  Start Your Medical Journey
                </h2>

                <form onSubmit={handleHeroSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F4F4F" }}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Your full name"
                      className="w-full outline-none transition-all"
                      style={{ height: "38px", border: "1px solid #CCCCCC", borderRadius: "8px", padding: "6px 12px 6px 14px", fontSize: "14px" }}
                      onFocus={(e) => { e.target.style.borderColor = "#0D6EFD"; e.target.style.boxShadow = "0 0 0 2px rgba(13,110,253,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#CCCCCC"; e.target.style.boxShadow = "none"; }}
                      value={heroForm.name}
                      onChange={(e) => setHeroForm({ ...heroForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F4F4F" }}>Treatment Interest *</label>
                    <select
                      className="w-full outline-none transition-all appearance-none bg-white"
                      style={{ height: "38px", border: "1px solid #CCCCCC", borderRadius: "8px", padding: "6px 12px", fontSize: "14px", color: "#333" }}
                      onFocus={(e) => { e.target.style.borderColor = "#0D6EFD"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#CCCCCC"; }}
                      value={heroForm.treatment}
                      onChange={(e) => setHeroForm({ ...heroForm, treatment: e.target.value })}
                    >
                      <option value="">Select treatment area</option>
                      {SERVICES.map((s) => <option key={s.id}>{s.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F4F4F" }}>Country of Residence *</label>
                    <input
                      type="text"
                      placeholder="e.g. United Kingdom"
                      className="w-full outline-none transition-all"
                      style={{ height: "38px", border: "1px solid #CCCCCC", borderRadius: "8px", padding: "6px 12px 6px 14px", fontSize: "14px" }}
                      onFocus={(e) => { e.target.style.borderColor = "#0D6EFD"; e.target.style.boxShadow = "0 0 0 2px rgba(13,110,253,0.1)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#CCCCCC"; e.target.style.boxShadow = "none"; }}
                      value={heroForm.country}
                      onChange={(e) => setHeroForm({ ...heroForm, country: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#4F4F4F" }}>Phone / WhatsApp *</label>
                    <div className="flex overflow-hidden transition-all" style={{ border: "1px solid #CCCCCC", borderRadius: "8px", height: "38px" }}
                      onFocusCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#0D6EFD"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 2px rgba(13,110,253,0.1)"; }}
                      onBlurCapture={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#CCCCCC"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                    >
                      <select
                        className="outline-none appearance-none cursor-pointer text-sm shrink-0"
                        style={{ backgroundColor: "#F8F9FA", borderRight: "1px solid #CCCCCC", padding: "0 8px 0 10px", fontSize: "13px", color: "#333", width: "86px" }}
                        value={heroForm.countryCode}
                        onChange={(e) => setHeroForm({ ...heroForm, countryCode: e.target.value })}
                      >
                        {COUNTRY_CODES.map(({ code, flag, label }) => (
                          <option key={code} value={code}>{flag} {code}</option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        placeholder="Your phone number"
                        className="flex-1 outline-none bg-white"
                        style={{ padding: "0 12px", fontSize: "14px", color: "#333" }}
                        value={heroForm.phone}
                        onChange={(e) => setHeroForm({ ...heroForm, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white font-bold text-sm rounded-md transition-colors"
                    style={{ backgroundColor: "#DC3545", height: "44px" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#BB2D3B"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#DC3545"; }}
                  >
                    Get Free Consultation →
                  </button>
                </form>

                <p className="text-center text-xs mt-3" style={{ color: "#6C757D" }}>
                  🔒 GDPR compliant · Medical data handled securely · No spam
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOP MEDICAL DESTINATIONS ── */}
      <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "#EEF7FF", color: "#005897" }}>
              <span>✈</span> Top Medical Destinations
            </div>
            <h2 style={{ fontSize: "30px", fontWeight: 600, color: "#333333" }}>Where Do Patients Choose to Be Treated?</h2>
            <p className="mt-2 max-w-2xl mx-auto" style={{ color: "#4F4F4F", fontSize: "16px" }}>
              Our network spans the most trusted medical tourism hubs in Asia and Europe, each offering world-class care at a fraction of Western costs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DESTINATIONS.map((dest) => (
              <Link
                key={dest.id}
                to={`/destinations/${dest.slug}`}
                className="group block rounded-xl overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
              >
                <div className="relative h-44 overflow-hidden bg-gray-100">
                  <img src={dest.image} alt={dest.country} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,40,80,0.7) 0%, transparent 60%)" }} />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-2xl">{dest.flag}</span>
                    <div className="text-white font-bold text-lg leading-none mt-1">{dest.country}</div>
                    <div className="text-xs" style={{ color: "#0DCAF0" }}>{dest.city}</div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "#EEF7FF", color: "#005897" }}>
                      {dest.hospitalCount} Hospitals
                    </span>
                    <span className="text-xs" style={{ color: "#6C757D" }}>{dest.patientCount} patients/yr</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {dest.strengths.slice(0, 3).map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: "#F8F9FA", color: "#4F4F4F", border: "1px solid #DEE2E6" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/destinations" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md font-semibold text-sm transition-colors border-2"
              style={{ borderColor: "#005897", color: "#005897" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#005897"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#005897"; }}>
              Explore All Destinations <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── MULTI-SPECIALTY FOCUS ── */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F0F4F8" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "#FFF0F1", color: "#DC3545" }}>
              <Heart size={12} /> 6 Specialties · 5 Countries
            </div>
            <h2 style={{ fontSize: "30px", fontWeight: 700, color: "#1a2d4f" }}>Treatments We Specialize In</h2>
            <p className="mt-2 max-w-xl mx-auto" style={{ color: "#4F4F4F", fontSize: "16px" }}>
              JCI-accredited hospitals across Asia — cardiac surgery to IVF — at 70–90% less than US & UK costs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service) => {
              const savings: Record<string, string> = { cardiology: "85%", oncology: "75%", orthopaedics: "80%", dental: "80%", ivf: "75%", wellness: "70%" };
              const flags: Record<string, string> = { Thailand: "🇹🇭", India: "🇮🇳", Turkey: "🇹🇷", Malaysia: "🇲🇾", "South Korea": "🇰🇷", Cyprus: "🇨🇾", "Czech Republic": "🇨🇿", Georgia: "🇬🇪", Mexico: "🇲🇽", Hungary: "🇭🇺", Japan: "🇯🇵" };
              return (
                <Link
                  key={service.id}
                  to={`/services/${service.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ border: "1px solid #E2E8F0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                >
                  {/* Accent bar */}
                  <div style={{ height: "4px", backgroundColor: "#005897" }} />

                  <div className="p-5">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "#EEF7FF" }}>
                          <div style={{ color: "#005897" }}>
                            {service.id === "cardiology" && <Heart size={20} />}
                            {service.id === "oncology" && <Activity size={20} />}
                            {service.id === "orthopaedics" && <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M7 7l5-5 5 5M7 17l5 5 5-5"/></svg>}
                            {service.id === "dental" && <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3C7.5 3 5 6.5 5 9c0 3 1 5 1 8s1 4 2 4 2-2 4-2 3 2 4 2 2-1 2-4 1-5 1-8c0-2.5-2.5-6-7-6z"/></svg>}
                            {service.id === "ivf" && <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>}
                            {service.id === "wellness" && <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                          </div>
                        </div>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#1a2d4f", lineHeight: 1.2 }}>{service.title}</h3>
                      </div>
                      <span className="flex-shrink-0 text-xs font-bold px-2 py-1 rounded-lg ml-2"
                        style={{ backgroundColor: "#F0FFF4", color: "#198754", border: "1px solid #c3e6cb" }}>
                        Save {savings[service.id]}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs mb-3" style={{ color: "#6C757D", lineHeight: "1.65" }}>
                      {service.shortDescription}
                    </p>

                    {/* Procedure pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.procedures.slice(0, 3).map((p) => (
                        <span key={p} className="text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: "#F0F4F8", color: "#4F4F4F", border: "1px solid #E2E8F0" }}>
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* Footer: flags + cost + arrow */}
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #F0F4F8" }}>
                      <div className="flex gap-0.5 text-base leading-none">
                        {service.countries.slice(0, 4).map((c) => (
                          <span key={c} title={c}>{flags[c]}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold" style={{ color: "#005897" }}>
                        From {service.costRange.split("–")[0]}
                        <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-colors"
              style={{ backgroundColor: "#DC3545" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#BB2D3B"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#DC3545"; }}>
              View All Medical Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOSPITAL NETWORK ── */}
      <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "#EEF7FF", color: "#005897" }}>
                <Award size={12} /> Partner Network
              </div>
              <h2 style={{ fontSize: "30px", fontWeight: 600, color: "#333333" }}>Network of Top-Ranked Hospitals</h2>
              <p className="mt-1" style={{ color: "#4F4F4F", fontSize: "16px" }}>All hospitals are JCI-accredited or equivalent, with internationally trained medical teams.</p>
            </div>
            <Link to="/hospitals" className="flex-shrink-0 text-sm font-medium flex items-center gap-1" style={{ color: "#005897" }}>
              View all hospitals <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {HOSPITALS.map((hospital) => (
              <div key={hospital.id} className="relative rounded-xl overflow-hidden transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer group"
                style={{ height: "220px", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
                {/* Background image */}
                <img
                  src={HOSPITAL_IMAGES[hospital.id] ?? HOSPITAL_IMAGES.vejthani}
                  alt={hospital.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay — stronger at bottom */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,20,50,0.92) 0%, rgba(0,40,80,0.55) 50%, rgba(0,40,80,0.15) 100%)" }} />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  {/* Accreditation badges top-right */}
                  <div className="flex flex-wrap gap-1 justify-end">
                    {hospital.accreditations.map((acc) => (
                      <span key={acc} className="text-xs px-1.5 py-0.5 rounded font-bold"
                        style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.25)", backdropFilter: "blur(4px)" }}>
                        {acc}
                      </span>
                    ))}
                  </div>

                  {/* Hospital info at bottom */}
                  <div>
                    <h4 className="leading-tight mb-1" style={{ color: "#ffffff", fontSize: "14px", fontWeight: 700, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
                      {hospital.name}
                    </h4>
                    <p className="text-xs mb-2" style={{ color: "#a8cce0" }}>{hospital.city}, {hospital.country}</p>
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {[...Array(Math.floor(hospital.rating))].map((_, i) => (
                          <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-xs font-bold" style={{ color: "#F8E71C" }}>{hospital.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TREATMENT COST PREVIEW ── */}
      <section className="py-16 px-4" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "rgba(13,202,240,0.15)", color: "#0DCAF0" }}>
              💰 Cost Transparency
            </div>
            <h2 style={{ fontSize: "30px", fontWeight: 600, color: "#ffffff" }}>Treatment Cost Preview</h2>
            <p className="mt-2" style={{ color: "#8bb5d4", fontSize: "16px" }}>Compare indicative costs across destinations. All-inclusive packages available.</p>
          </div>

          <div className="overflow-x-auto rounded-xl">
            <table className="w-full bg-white rounded-xl overflow-hidden">
              <thead>
                <tr style={{ backgroundColor: "#002244", color: "#ffffff" }}>
                  <th className="text-left px-5 py-4 text-sm font-semibold">Treatment</th>
                  <th className="text-center px-4 py-4 text-sm font-semibold">🇺🇸 USA</th>
                  <th className="text-center px-4 py-4 text-sm font-semibold">🇬🇧 UK</th>
                  <th className="text-center px-4 py-4 text-sm" style={{ color: "#4ade80" }}>🇹🇭 Thailand</th>
                  <th className="text-center px-4 py-4 text-sm" style={{ color: "#4ade80" }}>🇮🇳 India</th>
                  <th className="text-center px-4 py-4 text-sm" style={{ color: "#4ade80" }}>🇹🇷 Turkey</th>
                </tr>
              </thead>
              <tbody>
                {([
                  { treatment: "Cardiac Bypass Surgery", us: "$130,000", uk: "$85,000", th: "$13,000", thSave: "90%", ind: "$7,500", indSave: "94%", tr: "$12,000", trSave: "91%" },
                  { treatment: "Total Knee Replacement", us: "$50,000", uk: "$35,000", th: "$9,000", thSave: "82%", ind: "$5,500", indSave: "89%", tr: "$7,000", trSave: "86%" },
                  { treatment: "IVF (Single Cycle)", us: "$15,000", uk: "$10,000", th: "$4,500", thSave: "70%", ind: "$3,000", indSave: "80%", tr: "$3,500", trSave: "77%" },
                  { treatment: "Dental Implant (per tooth)", us: "$4,500", uk: "$3,500", th: "$1,200", thSave: "73%", ind: "$800", indSave: "82%", tr: "$800", trSave: "82%" },
                  { treatment: "Executive Health Checkup", us: "$3,000", uk: "$2,500", th: "$600", thSave: "80%", ind: "$400", indSave: "87%", tr: "$500", trSave: "83%" },
                ] as const).map((row, i) => (
                  <tr key={i} className="border-b transition-colors hover:bg-blue-50/30" style={{ borderColor: "#DEE2E6" }}>
                    <td className="px-5 py-4 text-sm font-semibold" style={{ color: "#1a2d4f" }}>{row.treatment}</td>
                    <td className="px-4 py-4 text-center text-sm font-semibold" style={{ color: "#DC3545" }}>{row.us}</td>
                    <td className="px-4 py-4 text-center text-sm" style={{ color: "#6C757D" }}>{row.uk}</td>
                    {([
                      [row.th, row.thSave],
                      [row.ind, row.indSave],
                      [row.tr, row.trSave],
                    ] as const).map(([price, save], j) => (
                      <td key={j} className="px-4 py-4 text-center">
                        <div className="text-sm font-bold" style={{ color: "#198754" }}>{price}</div>
                        <div className="text-xs mt-0.5 font-medium" style={{ color: "#6C757D" }}>save {save}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center mt-4 text-xs" style={{ color: "#8bb5d4" }}>
            * Estimates only. Exact costs depend on individual condition and hospital. Get a personalized quote.
          </p>

          <div className="text-center mt-6">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 rounded-md font-bold text-sm text-white transition-colors"
              style={{ backgroundColor: "#DC3545" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#BB2D3B"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#DC3545"; }}>
              Get My Personalized Cost Estimate <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "#EEF7FF", color: "#005897" }}>
              📋 Patient Journey
            </div>
            <h2 style={{ fontSize: "30px", fontWeight: 600, color: "#333333" }}>How It Works — Your Medical Journey</h2>
            <p className="mt-2" style={{ color: "#4F4F4F", fontSize: "16px" }}>Simple, transparent, and fully supported from inquiry to recovery.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-white transition-shadow hover:shadow-md"
                style={{ border: "1px solid #DEE2E6" }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                  style={{ backgroundColor: "#005897" }}>
                  {step.step}
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: "#333333" }}>{step.title}</h4>
                  <p className="text-sm" style={{ color: "#6C757D", lineHeight: "1.5" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/patient-journey" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#005897" }}>
              Learn more about our patient journey <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FREE SERVICES ── */}
      <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-4" style={{ backgroundColor: "#F0FFF4", color: "#198754" }}>
                ✓ All at Zero Cost to Patients
              </div>
              <h2 className="mb-4" style={{ fontSize: "30px", fontWeight: 600, color: "#333333" }}>
                Free Support Services — From Inquiry to Recovery
              </h2>
              <p className="mb-6" style={{ color: "#4F4F4F", fontSize: "16px", lineHeight: "1.7" }}>
                MedBridge is 100% free for patients. Our fees are covered by our hospital partners. You receive full concierge support without any charges.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-bold text-white"
                style={{ backgroundColor: "#DC3545" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#BB2D3B"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#DC3545"; }}>
                Start Your Free Journey <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {FREE_SERVICES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl transition-shadow hover:shadow-md"
                  style={{ border: "1px solid #DEE2E6", backgroundColor: "#F8F9FA" }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#EEF7FF" }}>
                    <Icon size={18} style={{ color: "#005897" }} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-0.5" style={{ color: "#333333" }}>{title}</h4>
                    <p className="text-xs" style={{ color: "#6C757D", lineHeight: "1.4" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PATIENT REVIEWS ── */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-3" style={{ backgroundColor: "#FFF8E1", color: "#F59E0B" }}>
              ⭐ Patient Stories
            </div>
            <h2 style={{ fontSize: "30px", fontWeight: 600, color: "#333333" }}>Real Patients, Real Outcomes</h2>
            <p className="mt-2" style={{ color: "#4F4F4F", fontSize: "16px" }}>Hear from patients who transformed their health and their finances.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="flex flex-col rounded-xl p-5 bg-white"
                style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <Quote size={24} className="mb-3 flex-shrink-0" style={{ color: "#0DCAF0" }} />
                <p className="text-sm flex-1 mb-4" style={{ color: "#4F4F4F", lineHeight: "1.6" }}>"{t.quote}"</p>
                <div className="border-t pt-4" style={{ borderColor: "#DEE2E6" }}>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <div className="font-semibold text-sm" style={{ color: "#333333" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "#6C757D" }}>{t.flag} {t.country}</div>
                  <div className="text-xs mt-1 font-medium" style={{ color: "#005897" }}>{t.treatment}</div>
                  <div className="mt-2 text-xs font-semibold px-2 py-0.5 rounded-full inline-block" style={{ backgroundColor: "#F0FFF4", color: "#198754" }}>
                    Saved {t.savings}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/testimonials" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: "#005897" }}>
              Read all patient stories <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 px-4" style={{ background: "linear-gradient(135deg, #DC3545 0%, #c0392b 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-4 text-white" style={{ fontSize: "32px", fontWeight: 700 }}>
            Ready to Begin Your Medical Journey?
          </h2>
          <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.85)" }}>
            Join 50,000+ patients who chose MedBridge for trusted, affordable, world-class healthcare. Our team is ready to help — at no cost to you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md font-bold text-sm bg-white transition-colors"
              style={{ color: "#DC3545" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#f0f0f0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white"; }}>
              Get Free Consultation <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md font-bold text-sm text-white border-2 border-white/40 hover:border-white/70 transition-colors">
              Chat on WhatsApp
            </a>
          </div>
          <p className="mt-6 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            No commitment required · Response within 24 hours · Free for patients
          </p>
        </div>
      </section>
    </div>
  );
}
