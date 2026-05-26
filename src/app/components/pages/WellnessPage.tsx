import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronRight, Star, CheckCircle, ArrowRight, Leaf, Shield, Clock, Users, Heart, Sun } from "lucide-react";

const G = {
  dark: "#003d6b",
  primary: "#005897",
  mid: "#0072c3",
  light: "#EEF7FF",
  mint: "#c5ddf0",
  amber: "#DC3545",
  text: "#333333",
  muted: "#6C757D",
};

const PROGRAM_TYPES = ["All", "Detox & Cleanse", "Ayurveda", "Stress Relief", "Anti-Aging", "Yoga Retreat", "Executive Checkup"];

const PROGRAMS = [
  {
    id: 1, type: "Detox & Cleanse",
    title: "7-Day Total Body Detox",
    location: "Koh Samui, Thailand",
    duration: "7 nights",
    price: "$1,200",
    rating: 4.9, reviews: 312,
    image: "https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    tags: ["Juice Cleanse", "Colon Therapy", "Detox Massage"],
  },
  {
    id: 2, type: "Ayurveda",
    title: "14-Day Panchakarma Retreat",
    location: "Kerala, India",
    duration: "14 nights",
    price: "$900",
    rating: 5.0, reviews: 218,
    image: "https://images.unsplash.com/photo-1570799650082-f3eb7207f588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    tags: ["Panchakarma", "Herbal Therapy", "Yoga"],
  },
  {
    id: 3, type: "Stress Relief",
    title: "5-Day Mind & Body Reset",
    location: "Penang, Malaysia",
    duration: "5 nights",
    price: "$650",
    rating: 4.8, reviews: 175,
    image: "https://images.unsplash.com/photo-1595746262347-3e2b17daf768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    tags: ["Meditation", "Deep Tissue Massage", "Float Therapy"],
  },
  {
    id: 4, type: "Anti-Aging",
    title: "10-Day Cellular Renewal Program",
    location: "Chiang Mai, Thailand",
    duration: "10 nights",
    price: "$2,400",
    rating: 4.9, reviews: 94,
    image: "https://images.unsplash.com/photo-1777919541982-dcb34c146a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    tags: ["IV Therapy", "NAD+ Infusion", "Anti-Aging Facial"],
  },
  {
    id: 5, type: "Yoga Retreat",
    title: "21-Day Transformational Yoga",
    location: "Rishikesh, India",
    duration: "21 nights",
    price: "$1,100",
    rating: 5.0, reviews: 402,
    image: "https://images.unsplash.com/photo-1687245905413-2602d6fb2b4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    tags: ["Hatha Yoga", "Pranayama", "Silent Meditation"],
  },
  {
    id: 6, type: "Executive Checkup",
    title: "Executive Wellness Masterclass",
    location: "Bangkok, Thailand",
    duration: "3 days",
    price: "$800",
    rating: 4.8, reviews: 539,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    tags: ["Full Body MRI", "Cancer Screening", "Cardiac Panel"],
  },
];

const DESTINATIONS = [
  {
    id: 1, country: "Thailand", city: "Koh Samui & Chiang Mai", flag: "🇹🇭",
    image: "https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    tagline: "Tropical healing at its finest",
    highlight: "40+ wellness centers", programs: ["Detox", "Spa", "Executive Checkup"],
  },
  {
    id: 2, country: "India", city: "Kerala & Rishikesh", flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1570799650082-f3eb7207f588?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    tagline: "The birthplace of Ayurveda",
    highlight: "5,000 years of healing wisdom", programs: ["Ayurveda", "Yoga", "Meditation"],
  },
  {
    id: 3, country: "Malaysia", city: "Penang & Langkawi", flag: "🇲🇾",
    image: "https://images.unsplash.com/photo-1715242563833-946f4b811399?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    tagline: "Island serenity meets modern wellness",
    highlight: "20+ retreat centers", programs: ["Stress Relief", "Detox", "Spa"],
  },
  {
    id: 4, country: "Japan", city: "Kyoto & Hakone", flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1775931843900-8238aa087f9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    tagline: "Onsen, forest bathing & Zen",
    highlight: "Shinrin-yoku forest therapy", programs: ["Onsen", "Meditation", "Anti-Aging"],
  },
];

const FAQS = [
  { q: "Is a wellness retreat covered by health insurance?", a: "Most standard health insurance does not cover wellness retreats. However, some corporate wellness plans and HSA/FSA accounts in the US may allow reimbursement for certain health-focused programs. We can provide detailed invoices to support your claims." },
  { q: "How do I choose the right program for me?", a: "Fill in our wellness planner and one of our coordinators will assess your goals, health history, and schedule to recommend the most suitable program and destination. The consultation is completely free." },
  { q: "Do I need to be fit to join a retreat?", a: "No. Our programs cater to all fitness levels — from complete beginners to experienced practitioners. Tell us your current fitness level when you enquire and we'll match you accordingly." },
  { q: "What is included in the program price?", a: "Most programs include accommodation, meals (specific to the program diet), all scheduled treatments, yoga or meditation classes, and airport transfer. Flights are not included but we can advise on the best options." },
  { q: "Can I combine a wellness retreat with a medical procedure?", a: "Absolutely — this is one of MedBridge's unique strengths. Many patients recover from surgery at a wellness resort. We coordinate both the medical and wellness aspects seamlessly." },
];

const WHY = [
  { icon: <Leaf size={22} />, title: "Curated Centers Only", desc: "Every wellness center in our network is personally vetted for quality, cleanliness, practitioner credentials, and real outcomes." },
  { icon: <Shield size={22} />, title: "Medical Wellness Integration", desc: "Seamlessly combine wellness retreats with health screenings or post-surgical recovery — only MedBridge offers this coordination." },
  { icon: <Users size={22} />, title: "Multilingual Coordinators", desc: "Your dedicated coordinator speaks your language and handles everything from visa to airport pickup." },
  { icon: <Clock size={22} />, title: "Flexible Scheduling", desc: "Programs from 3 days to 3 months. We adapt around your calendar, not the other way around." },
  { icon: <Heart size={22} />, title: "Post-Program Support", desc: "Your wellness journey doesn't end at checkout. We provide follow-up sessions, nutrition plans, and home practice guides." },
  { icon: <Sun size={22} />, title: "100% Free to You", desc: "Our service is funded by partner centers. You pay only for the program — our coordination, planning, and support cost nothing." },
];

export function WellnessPage() {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("All");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", country: "", phone: "", program: "", message: "" });

  const filtered = PROGRAMS.filter((p) => activeType === "All" || p.type === activeType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/contact");
  };

  return (
    <div style={{ fontFamily: "inherit" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Wellness retreat"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Layered green overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(110deg, rgba(0,40,90,0.93) 0%, rgba(0,61,107,0.82) 45%, rgba(0,88,151,0.35) 100%)"
        }} />
        {/* Leaf pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #0DCAF0 0%, transparent 50%), radial-gradient(circle at 80% 20%, #005897 0%, transparent 40%)"
        }} />

        <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left: copy */}
            <div>
              <nav className="flex items-center gap-2 text-xs mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>
                <Link to="/" className="hover:text-white">Home</Link>
                <ChevronRight size={11} />
                <Link to="/services" className="hover:text-white">Services</Link>
                <ChevronRight size={11} />
                <span style={{ color: "#0DCAF0" }}>Wellness & Checkup</span>
              </nav>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{ backgroundColor: "rgba(13,202,240,0.15)", color: "#0DCAF0", border: "1px solid rgba(13,202,240,0.4)" }}>
                <Leaf size={11} /> Holistic Wellness Programs
              </div>

              <h1 className="text-white mb-5 leading-tight" style={{ fontSize: "clamp(30px, 4.5vw, 52px)", fontWeight: 800 }}>
                Wellness Retreats for<br />
                <span style={{ color: "#0DCAF0" }}>Detox, Recovery</span><br />
                & Holistic Care
              </h1>

              <p className="mb-8" style={{ color: "rgba(255,255,255,0.78)", fontSize: "17px", lineHeight: "1.75", maxWidth: "520px" }}>
                Rejuvenate your body and mind with personalized wellness, Ayurveda, and detox programs at leading global wellness centers — coordinated entirely by MedBridge, free of charge.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                {[
                  { value: "40+", label: "Wellness Centers" },
                  { value: "4", label: "Countries" },
                  { value: "6", label: "Program Types" },
                  { value: "4.9★", label: "Avg Rating" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div className="font-black text-2xl text-white">{value}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="#programs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all"
                  style={{ backgroundColor: G.primary, boxShadow: "0 4px 16px rgba(0,88,151,0.4)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = G.dark; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = G.primary; }}>
                  Browse Programs <ArrowRight size={14} />
                </a>
                <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white border border-white/30 hover:bg-white/10 transition-colors">
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right: Plan Your Stay form */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: "#ffffff" }}>
                {/* Form header */}
                <div className="px-6 py-5" style={{ background: `linear-gradient(135deg, ${G.dark} 0%, ${G.primary} 100%)` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Leaf size={16} style={{ color: "#0DCAF0" }} />
                    <span className="text-white font-black text-lg">Plan Your Wellness Journey</span>
                  </div>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Free consultation · Response within 4 hours</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: G.text }}>Your Name *</label>
                    <input type="text" placeholder="Full name"
                      className="w-full outline-none rounded-xl px-4 py-2.5 text-sm transition-all"
                      style={{ border: "1.5px solid #DEE2E6", color: "#333" }}
                      onFocus={(e) => { e.target.style.borderColor = G.primary; e.target.style.boxShadow = `0 0 0 3px ${G.primary}20`; }}
                      onBlur={(e) => { e.target.style.borderColor = "#DEE2E6"; e.target.style.boxShadow = "none"; }}
                      value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: G.text }}>Program Type *</label>
                    <select className="w-full outline-none rounded-xl px-4 py-2.5 text-sm appearance-none bg-white transition-all"
                      style={{ border: "1.5px solid #DEE2E6", color: "#333" }}
                      onFocus={(e) => { e.target.style.borderColor = G.primary; }}
                      onBlur={(e) => { e.target.style.borderColor = "#DEE2E6"; }}
                      value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })}>
                      <option value="">Select a program type</option>
                      {PROGRAM_TYPES.filter(t => t !== "All").map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: G.text }}>Country of Residence *</label>
                    <input type="text" placeholder="e.g. United Kingdom"
                      className="w-full outline-none rounded-xl px-4 py-2.5 text-sm transition-all"
                      style={{ border: "1.5px solid #DEE2E6", color: "#333" }}
                      onFocus={(e) => { e.target.style.borderColor = G.primary; e.target.style.boxShadow = `0 0 0 3px ${G.primary}20`; }}
                      onBlur={(e) => { e.target.style.borderColor = "#DEE2E6"; e.target.style.boxShadow = "none"; }}
                      value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: G.text }}>Your Goals / Health Concerns</label>
                    <textarea placeholder="e.g. stress relief, weight loss, chronic fatigue, post-surgery recovery..."
                      rows={3}
                      className="w-full outline-none rounded-xl px-4 py-2.5 text-sm resize-none transition-all"
                      style={{ border: "1.5px solid #DEE2E6", color: "#333" }}
                      onFocus={(e) => { e.target.style.borderColor = G.primary; e.target.style.boxShadow = `0 0 0 3px ${G.primary}20`; }}
                      onBlur={(e) => { e.target.style.borderColor = "#DEE2E6"; e.target.style.boxShadow = "none"; }}
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>

                  <button type="submit"
                    className="w-full py-3.5 rounded-xl text-white font-black text-sm tracking-wide transition-all"
                    style={{ background: `linear-gradient(135deg, ${G.dark} 0%, ${G.primary} 100%)`, boxShadow: `0 4px 16px ${G.primary}40` }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}>
                    GET MY WELLNESS PLAN →
                  </button>

                  <p className="text-center text-xs" style={{ color: "#9CA3AF" }}>
                    🌿 Free service · No commitment · GDPR compliant
                  </p>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROGRAM TYPES ── */}
      <section id="programs" className="py-16 px-4" style={{ backgroundColor: G.light }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
              style={{ backgroundColor: G.mint, color: G.primary }}>
              <Leaf size={11} /> Wellness Programs
            </div>
            <h2 style={{ fontSize: "30px", fontWeight: 800, color: G.dark }}>Find Your Perfect Program</h2>
            <p className="mt-2 max-w-xl mx-auto" style={{ color: G.muted }}>
              From ancient Ayurveda to modern executive checkups — curated programs for every goal and timeline.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {PROGRAM_TYPES.map((type) => (
              <button key={type} onClick={() => setActiveType(type)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  backgroundColor: activeType === type ? G.primary : "#ffffff",
                  color: activeType === type ? "#ffffff" : G.muted,
                  border: `1.5px solid ${activeType === type ? G.primary : "#DEE2E6"}`,
                  boxShadow: activeType === type ? `0 4px 12px ${G.primary}35` : "none",
                }}>
                {type}
              </button>
            ))}
          </div>

          {/* Program cards */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((program) => (
              <div key={program.id} className="bg-white rounded-2xl overflow-hidden group transition-all hover:-translate-y-2 hover:shadow-2xl"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}>
                <div className="relative h-48 overflow-hidden">
                  <img src={program.image} alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,40,90,0.75) 0%, transparent 60%)" }} />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: G.primary }}>
                    {program.type}
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className={i < Math.floor(program.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} />
                      ))}
                      <span className="text-xs text-white ml-1 font-semibold">{program.rating} ({program.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-black mb-1" style={{ fontSize: "16px", color: G.dark }}>{program.title}</h3>
                  <p className="text-xs mb-3 flex items-center gap-1" style={{ color: G.muted }}>
                    📍 {program.location}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {program.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ backgroundColor: G.light, color: G.primary, border: `1px solid ${G.mint}` }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4" style={{ borderTop: `2px solid ${G.light}` }}>
                    <div>
                      <div className="text-xs" style={{ color: G.muted }}>From · {program.duration}</div>
                      <div className="font-black text-lg" style={{ color: G.primary }}>{program.price}</div>
                    </div>
                    <Link to="/contact"
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-white text-sm font-bold transition-all"
                      style={{ backgroundColor: G.primary }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = G.dark; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = G.primary; }}>
                      Get Quote <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY MEDBRIDGE WELLNESS ── */}
      <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: G.dark }}>Why Plan Your Wellness Journey With Us?</h2>
            <p className="mt-2" style={{ color: G.muted }}>MedBridge is the only medical tourism platform that integrates wellness retreats with clinical care.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY.map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-2xl transition-all hover:shadow-lg"
                style={{ border: `1.5px solid ${G.mint}`, backgroundColor: G.light }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{ backgroundColor: G.primary }}>
                  {icon}
                </div>
                <div>
                  <h4 className="font-bold mb-1" style={{ fontSize: "14px", color: G.dark }}>{title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: G.muted }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP DESTINATIONS ── */}
      <section className="py-16 px-4" style={{ backgroundColor: G.light }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
              style={{ backgroundColor: G.mint, color: G.primary }}>
              ✈️ Wellness Destinations
            </div>
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: G.dark }}>The World's Best Wellness Destinations</h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {DESTINATIONS.map((dest) => (
              <div key={dest.id} className="rounded-2xl overflow-hidden group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
                <div className="relative h-52 overflow-hidden">
                  <img src={dest.image} alt={dest.country}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,40,90,0.88) 0%, rgba(0,61,107,0.25) 60%, transparent 100%)" }} />
                  <div className="absolute top-3 right-3 text-3xl">{dest.flag}</div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="font-black text-white text-lg leading-tight">{dest.country}</div>
                    <div className="text-xs mt-0.5" style={{ color: "#0DCAF0" }}>{dest.city}</div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-xs font-semibold mb-2" style={{ color: G.muted }}>{dest.tagline}</p>
                  <div className="text-xs mb-3 font-bold" style={{ color: G.primary }}>✦ {dest.highlight}</div>
                  <div className="flex flex-wrap gap-1">
                    {dest.programs.map((p) => (
                      <span key={p} className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: G.light, color: G.primary }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WELLNESS JOURNEY TIMELINE ── */}
      <section className="py-16 px-4" style={{ backgroundColor: "#ffffff" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontSize: "28px", fontWeight: 800, color: G.dark }}>Your Wellness Journey — From Inquiry to Transformation</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: G.mint }} />
            <div className="space-y-8">
              {[
                { step: "01", title: "Share Your Goals", desc: "Fill out our wellness planner with your health goals, timeline, and budget. Takes 2 minutes.", color: G.primary },
                { step: "02", title: "Get Your Personalized Plan", desc: "Within 4 hours, your coordinator sends a curated selection of centers and programs matched to your needs.", color: G.mid },
                { step: "03", title: "Choose & Book", desc: "Select your program. We handle all bookings, transfers, and visa support.", color: G.amber },
                { step: "04", title: "Arrive & Heal", desc: "Your coordinator meets you on arrival. All you need to do is show up and let the healing begin.", color: G.primary },
                { step: "05", title: "Post-Program Support", desc: "After your retreat, we stay in touch. Nutrition plans, follow-up exercises, and check-in calls included.", color: G.dark },
              ].map(({ step, title, desc, color }) => (
                <div key={step} className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0 relative z-10"
                    style={{ backgroundColor: color }}>
                    {step}
                  </div>
                  <div className="pt-2.5">
                    <h4 className="font-bold mb-1" style={{ color: G.dark }}>{title}</h4>
                    <p className="text-sm" style={{ color: G.muted, lineHeight: "1.6" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 px-4" style={{ backgroundColor: G.light }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 style={{ fontSize: "26px", fontWeight: 800, color: G.dark }}>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl overflow-hidden bg-white"
                style={{ border: `1.5px solid ${openFaq === i ? G.primary : G.mint}`, boxShadow: openFaq === i ? `0 4px 16px ${G.primary}15` : "none" }}>
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-semibold text-sm pr-4" style={{ color: G.dark }}>{faq.q}</span>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold transition-transform"
                    style={{ backgroundColor: openFaq === i ? G.primary : G.mint, color: openFaq === i ? "#fff" : G.primary, transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}>
                    +
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm" style={{ color: G.muted, lineHeight: "1.7", borderTop: `1px solid ${G.mint}` }}>
                    <div className="pt-4">{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-16 px-4 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${G.dark} 0%, ${G.primary} 100%)` }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #0DCAF0 0%, transparent 60%), radial-gradient(circle at 80% 30%, #ffffff 0%, transparent 50%)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <Leaf size={32} className="mx-auto mb-4" style={{ color: "#0DCAF0" }} />
          <h2 className="text-white mb-3" style={{ fontSize: "28px", fontWeight: 800 }}>
            Begin Your Wellness Transformation Today
          </h2>
          <p className="mb-8" style={{ color: "rgba(255,255,255,0.78)", fontSize: "16px" }}>
            Join thousands of people who chose to invest in their health — and came back transformed. Our coordinators are ready to design your perfect program.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-black text-sm bg-white transition-all"
              style={{ color: G.dark }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = G.mint; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}>
              Plan My Wellness Journey <ArrowRight size={15} />
            </Link>
            <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white border border-white/30 hover:bg-white/10 transition-colors">
              WhatsApp a Coordinator
            </a>
          </div>
          <p className="mt-5 text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
            🌿 Free service for all patients · Response within 4 hours
          </p>
        </div>
      </section>

    </div>
  );
}
