import { Link } from "react-router";
import { ArrowRight, ChevronRight, CheckCircle, ClipboardList, Search, FileText, BarChart2, Plane, HeartPulse, Smile, Clock, Users, Shield, MessageCircle } from "lucide-react";

const B = {
  primary: "#005897",
  dark:    "#003d6b",
  deeper:  "#002244",
  light:   "#EEF7FF",
  border:  "#c5ddf0",
  muted:   "#6C757D",
  text:    "#333333",
};

const STEPS = [
  {
    step: 1,
    phase: "Inquiry",
    icon: ClipboardList,
    title: "Submit Your Medical Inquiry",
    description: "Complete our secure online form with your details, treatment area, and any medical reports. Takes less than 15 minutes. All data is encrypted and GDPR compliant.",
    details: ["Name, country & contact details", "Treatment area and diagnosis", "Medical history summary", "Optional: Upload medical reports"],
    duration: "~15 min",
  },
  {
    step: 2,
    phase: "Review",
    icon: Search,
    title: "Case Review by Our Medical Team",
    description: "Our medical coordinators and advisory board assess your case within 24 hours. We shortlist suitable hospitals and specialists tailored to your condition and budget.",
    details: ["Case assessment by medical coordinator", "Specialist & hospital shortlisting", "Destination recommendation", "Preliminary cost estimate"],
    duration: "Within 24h",
  },
  {
    step: 3,
    phase: "Opinion",
    icon: FileText,
    title: "Free Medical Opinion",
    description: "We share your anonymized case (with your consent) with partner hospitals. You receive detailed treatment protocols and transparent cost proposals.",
    details: ["Hospital reviews your medical records", "Treatment protocol preparation", "Multiple hospital quotes", "Surgeon profiles shared"],
    duration: "3–5 days",
  },
  {
    step: 4,
    phase: "Decision",
    icon: BarChart2,
    title: "Compare & Choose Your Plan",
    description: "Receive a comprehensive, itemized treatment plan with transparent pricing. Our team walks you through every option — no pressure, your timeline.",
    details: ["Detailed cost breakdown", "Hospital & surgeon comparison", "Q&A with medical coordinator", "Second opinion available"],
    duration: "Your timeline",
  },
  {
    step: 5,
    phase: "Planning",
    icon: Plane,
    title: "Travel & Logistics Coordination",
    description: "Once you confirm, we handle everything — hospital appointments, visa invitation letters, accommodation near the hospital, and airport transfers.",
    details: ["Hospital appointment confirmation", "Visa invitation letter", "Accommodation near hospital", "Airport transfer arrangement"],
    duration: "1–2 weeks",
  },
  {
    step: 6,
    phase: "Treatment",
    icon: HeartPulse,
    title: "Arrive & Begin Treatment",
    description: "Your dedicated on-ground coordinator meets you at the airport. We stay available 24/7 throughout your stay — for medical updates and day-to-day support.",
    details: ["Airport / hotel pickup", "Hospital admission support", "Language interpretation", "24/7 coordinator availability"],
    duration: "Per treatment plan",
  },
  {
    step: 7,
    phase: "Recovery",
    icon: Smile,
    title: "Recovery & Ongoing Follow-Up",
    description: "After treatment we coordinate your discharge, return travel, and remote follow-up with your medical team — ensuring a smooth transition home.",
    details: ["Recovery monitoring", "Discharge planning assistance", "Return travel coordination", "Remote follow-up consultation"],
    duration: "Ongoing",
  },
];

const TRUST_ITEMS = [
  { icon: Clock,    value: "< 24h",   label: "First Response" },
  { icon: Users,    value: "50,000+", label: "Patients Assisted" },
  { icon: Shield,   value: "100%",    label: "Free to Patients" },
  { icon: MessageCircle, value: "24/7", label: "Coordinator Support" },
];

export function PatientJourneyPage() {
  return (
    <div style={{ backgroundColor: "#F0F4F8" }}>

      {/* ── HERO ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "320px" }}>
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
          alt="Medical journey"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center 35%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,20,50,0.97) 0%, rgba(0,40,90,0.90) 55%, rgba(0,61,107,0.80) 100%)" }} />

        <div className="relative py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-2 text-xs mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/faq" className="hover:text-white transition-colors">Knowledge</Link>
              <ChevronRight size={12} />
              <span style={{ color: "#0DCAF0" }}>How It Works</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                  style={{ backgroundColor: "rgba(13,202,240,0.15)", color: "#0DCAF0", border: "1px solid rgba(13,202,240,0.3)" }}>
                  <Shield size={11} /> End-to-End Concierge Care
                </div>
                <h1 className="text-white leading-tight mb-4" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800 }}>
                  Your Medical Journey,<br />
                  <span style={{ color: "#0DCAF0" }}>Step by Step</span>
                </h1>
                <p style={{ color: "#a8cce0", fontSize: "16px", lineHeight: "1.75" }}>
                  From your first inquiry to full recovery at home — we guide every milestone, handle all logistics, and make sure you never feel alone.
                </p>
              </div>

              {/* Trust stats */}
              <div className="grid grid-cols-2 gap-3">
                {TRUST_ITEMS.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="p-4 rounded-xl text-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}>
                    <Icon size={18} style={{ color: "#0DCAF0", margin: "0 auto 6px" }} />
                    <div style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>{value}</div>
                    <div style={{ fontSize: "12px", color: "#8bb5d4" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div className="py-14 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Section intro */}
          <div className="text-center mb-10">
            <p className="text-xs font-bold mb-1" style={{ color: "#9CA3AF", letterSpacing: "0.08em", textTransform: "uppercase" }}>The Process</p>
            <h2 style={{ fontSize: "26px", fontWeight: 800, color: B.dark }}>7 Steps, Zero Surprises</h2>
            <p className="text-sm mt-2" style={{ color: B.muted }}>Most patients complete steps 1–3 within a week, with zero upfront cost.</p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-[27px] top-8 bottom-8 w-0.5 hidden sm:block"
              style={{ background: `linear-gradient(to bottom, ${B.primary}, ${B.border})` }} />

            <div className="space-y-5">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isLast = i === STEPS.length - 1;
                return (
                  <div key={step.step} className="flex gap-5 items-start group">

                    {/* Icon circle */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
                        style={{ backgroundColor: B.primary, border: `3px solid #EEF7FF` }}>
                        <Icon size={20} />
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-white"
                        style={{ backgroundColor: B.dark }}>
                        {step.step}
                      </div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 bg-white rounded-2xl overflow-hidden transition-all group-hover:-translate-y-0.5 group-hover:shadow-xl"
                      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid #E9ECEF", marginBottom: isLast ? 0 : undefined }}>

                      {/* Top bar accent */}
                      <div className="h-0.5" style={{ backgroundColor: B.primary }} />

                      <div className="p-5">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                              style={{ backgroundColor: B.light, color: B.primary, border: `1px solid ${B.border}` }}>
                              {step.phase}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs" style={{ color: B.muted }}>
                            <Clock size={11} /> {step.duration}
                          </div>
                        </div>

                        <h3 className="mb-2" style={{ fontSize: "16px", fontWeight: 800, color: B.dark }}>
                          {step.title}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: "#4F4F4F", lineHeight: "1.7" }}>
                          {step.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-1.5">
                          {step.details.map((detail) => (
                            <div key={detail} className="flex items-center gap-2 text-xs" style={{ color: "#4F4F4F" }}>
                              <CheckCircle size={12} style={{ color: B.primary, flexShrink: 0 }} />
                              {detail}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── WHY MEDBRIDGE HANDLES THIS ── */}
      <div className="py-14 px-4" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ fontSize: "24px", fontWeight: 800, color: B.dark }}>Why Not Go Direct to the Hospital?</h2>
            <p className="text-sm mt-2" style={{ color: B.muted }}>Many patients ask this. Here's what MedBridge handles that the hospital won't.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Independent Advice", body: "Hospitals promote themselves. We are not paid per referral — we recommend based on your diagnosis, not commission rates." },
              { title: "Price Negotiation", body: "We negotiate package rates that aren't available to patients booking directly. Our volume relationships typically save 10–20% more." },
              { title: "Visa & Documentation", body: "Medical visa letters, invitation letters, document translation — we handle the paperwork that hospitals don't." },
              { title: "Multi-Hospital Quotes", body: "We get competing quotes from 2–3 hospitals simultaneously so you can compare quality and price without doing it yourself." },
              { title: "On-Ground Coordinator", body: "You have a named coordinator reachable by WhatsApp 24/7 — not a call center, not a chatbot. A real person." },
              { title: "Post-Treatment Follow-Up", body: "Your home doctor receives structured discharge notes. Remote follow-up consultations are arranged before you fly home." },
            ].map(({ title, body }) => (
              <div key={title} className="p-5 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-md"
                style={{ backgroundColor: "#F8FAFC", border: "1px solid #E9ECEF" }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: B.light }}>
                  <CheckCircle size={16} style={{ color: B.primary }} />
                </div>
                <h4 className="mb-2" style={{ fontSize: "14px", fontWeight: 700, color: B.dark }}>{title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: B.muted }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="py-16 px-4" style={{ background: `linear-gradient(135deg, ${B.deeper} 0%, ${B.dark} 50%, ${B.primary} 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5"
            style={{ backgroundColor: "rgba(13,202,240,0.15)", border: "1px solid rgba(13,202,240,0.3)" }}>
            <Plane size={24} style={{ color: "#0DCAF0" }} />
          </div>
          <h2 className="text-white mb-3" style={{ fontSize: "28px", fontWeight: 800 }}>
            Ready to Start Step 1?
          </h2>
          <p style={{ color: "#a8cce0" }} className="mb-7 text-base">
            Submit your inquiry today — our medical team responds within 24 hours, and there's no commitment or cost at any stage.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-lg"
              style={{ backgroundColor: "#DC3545", boxShadow: "0 4px 20px rgba(220,53,69,0.4)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#BB2D3B"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#DC3545"; }}>
              Begin My Journey <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white"
              style={{ border: "1.5px solid rgba(255,255,255,0.35)", backgroundColor: "rgba(255,255,255,0.08)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}>
              <MessageCircle size={16} /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
