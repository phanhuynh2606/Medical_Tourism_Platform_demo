import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, CheckCircle, AlertCircle, Clock, FileText, ArrowRight, Globe, Shield } from "lucide-react";

const COUNTRIES = [
  {
    id: "thailand",
    name: "Thailand",
    flag: "🇹🇭",
    visaType: "Medical Treatment Visa (Non-IM)",
    maxStay: "90 days (extendable to 1 year)",
    processingTime: "3–5 business days",
    fee: "THB 2,000 (~$55)",
    difficulty: "Easy",
    difficultyColor: "#198754",
    summary: "Thailand offers one of the most straightforward medical visa processes in Asia. The Non-IM visa is designed specifically for medical tourists and can be extended at any immigration office.",
    documents: [
      "Valid passport (6+ months validity)",
      "Completed visa application form",
      "2 recent passport-sized photos",
      "Letter of medical appointment from Thai hospital",
      "Proof of sufficient funds (min. THB 20,000 / person)",
      "Return flight booking",
      "Accommodation confirmation",
      "Travel/medical insurance (recommended)",
    ],
    tips: [
      "Bumrungrad and Bangkok Hospital can issue invitation letters within 24 hours",
      "Extensions are processed at Bangkok's Chaeng Watthana immigration office",
      "Most Western nationals can enter visa-free for up to 30 days for short treatments",
      "Long-term medical stays qualify for special 1-year medical visas",
    ],
    embassyNote: "Apply at your nearest Royal Thai Embassy or consulate. Online e-Visa available for 25 nationalities.",
  },
  {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    visaType: "Medical Visa (MED) or Medical Attendant Visa (MED-X)",
    maxStay: "Up to 1 year (triple entry)",
    processingTime: "3–7 business days",
    fee: "$75–$150 (varies by nationality)",
    difficulty: "Moderate",
    difficultyColor: "#856404",
    summary: "India's dedicated Medical Visa is among the most generous — valid for 1 year with multiple entries, and extendable. Family members can obtain Medical Attendant visas to accompany patients.",
    documents: [
      "Valid passport (6+ months validity, 2 blank pages)",
      "Online visa application (indianvisaonline.gov.in)",
      "Recent photo (2\"×2\", white background)",
      "Recommendation letter from recognized Indian hospital",
      "Medical documents / diagnosis report from home country doctor",
      "Proof of financial means",
      "Return ticket",
      "Accommodation proof",
    ],
    tips: [
      "Apply via the Indian Visa Online portal — faster than embassy walk-in",
      "Apollo, Fortis, and Medanta can issue invitation letters quickly",
      "MED-X visa allows 1 attendant per patient",
      "Extensions can be granted by the Foreigners Regional Registration Office (FRRO)",
    ],
    embassyNote: "Apply online at indianvisaonline.gov.in or through your nearest Indian High Commission.",
  },
  {
    id: "turkey",
    name: "Turkey",
    flag: "🇹🇷",
    visaType: "e-Visa or Visa-on-Arrival (most nationalities)",
    maxStay: "90 days within 180-day period",
    processingTime: "Minutes to 24 hours (e-Visa)",
    fee: "$50–$100 (varies by nationality)",
    difficulty: "Easy",
    difficultyColor: "#198754",
    summary: "Turkey is one of the most accessible destinations for medical tourists. Citizens of over 80 countries can obtain an e-Visa online within minutes. No specific 'medical visa' category is required for most treatments.",
    documents: [
      "Valid passport",
      "e-Visa application at evisa.gov.tr",
      "Credit/debit card for payment",
      "Return flight details",
      "Hotel or clinic accommodation proof",
      "Medical appointment letter (for longer stays)",
    ],
    tips: [
      "Most patients enter on a standard tourist e-Visa — no special medical visa needed",
      "For stays over 90 days, apply for a Long-Stay visa at the Turkish consulate",
      "Istanbul clinics typically handle all paperwork coordination for international patients",
      "EU citizens can enter with national ID card for stays up to 90 days",
    ],
    embassyNote: "Apply online at evisa.gov.tr — fast, straightforward, and accepted at all Turkish borders.",
  },
  {
    id: "malaysia",
    name: "Malaysia",
    flag: "🇲🇾",
    visaType: "Social Visit Pass (extended for medical)",
    maxStay: "30–90 days (extendable)",
    processingTime: "Immediate to 5 days",
    fee: "Free for most nationalities",
    difficulty: "Very Easy",
    difficultyColor: "#198754",
    summary: "Malaysia is among the most hassle-free destinations for medical tourists. Citizens of 166 countries enter visa-free. The Social Visit Pass can be extended for medical reasons at any immigration office.",
    documents: [
      "Valid passport (6+ months validity)",
      "Return flight ticket",
      "Proof of accommodation",
      "Medical appointment letter (for extensions)",
      "Sufficient funds proof",
    ],
    tips: [
      "No advance visa required for most nationalities — stamp on arrival",
      "Gleneagles and Sunway Medical Centre can issue support letters for immigration extensions",
      "Medical tourism office at KLIA can assist arriving patients",
      "Malaysia Healthcare Travel Council (MHTC) provides free patient support services",
    ],
    embassyNote: "Check visa requirements at esd.imi.gov.my. Most nationalities enter visa-free.",
  },
];

const GENERAL_TIPS = [
  { icon: FileText, title: "Always Get a Hospital Invitation Letter", desc: "Before applying for any medical visa, contact your hospital and request an official invitation/appointment letter on hospital letterhead. Most JCI-accredited hospitals provide this for free within 24–48 hours." },
  { icon: Shield, title: "Get Medical Travel Insurance", desc: "Standard travel insurance does not cover planned procedures. Look for 'medical tourism' or 'surgical complication' add-ons that cover post-op complications and medical repatriation." },
  { icon: Clock, title: "Apply Well in Advance", desc: "Apply for your visa at least 2–3 weeks before your procedure, even if processing is typically fast. Unexpected delays are common, especially during peak seasons." },
  { icon: Globe, title: "Check Your Home Country's Travel Advisories", desc: "Before travelling, check your government's travel advisory for your destination. Some countries require health insurance with minimum coverage for entry." },
];

export function MedicalVisaPage() {
  const [activeCountry, setActiveCountry] = useState("thailand");

  const country = COUNTRIES.find((c) => c.id === activeCountry)!;

  return (
    <div>
      {/* Header */}
      <div className="py-14 px-4" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-xs mb-4" style={{ color: "#8bb5d4" }}>
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <Link to="/faq" className="hover:text-white">Knowledge</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#0DCAF0" }}>Medical Visa</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4" style={{ backgroundColor: "rgba(13,202,240,0.15)", color: "#0DCAF0", border: "1px solid rgba(13,202,240,0.3)" }}>
            <Globe size={12} /> Visa & Entry Guide
          </div>
          <h1 className="text-white mb-3" style={{ fontSize: "36px", fontWeight: 700 }}>Medical Visa Guide</h1>
          <p style={{ color: "#a8cce0", fontSize: "17px" }}>
            Everything you need to know about entering Thailand, India, Turkey, and Malaysia for medical treatment — visa types, documents, fees, and insider tips.
          </p>
        </div>
      </div>

      {/* Hero image strip */}
      <div className="h-56 overflow-hidden relative">
        <img src="https://images.unsplash.com/photo-1454496406107-dc34337da8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920" alt="Passport and travel documents" className="w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,40,80,0.6) 0%, rgba(0,20,50,0.3) 100%)" }} />
      </div>

      <div className="py-14 px-4" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-6xl mx-auto">

          {/* General Tips */}
          <div className="mb-14">
            <div className="text-center mb-8">
              <h2 style={{ fontSize: "26px", fontWeight: 700, color: "#333333" }}>Before You Apply — General Rules</h2>
              <p className="mt-1" style={{ color: "#6C757D" }}>These apply regardless of which country you're travelling to.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {GENERAL_TIPS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 bg-white rounded-xl p-5" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EEF7FF" }}>
                    <Icon size={20} style={{ color: "#005897" }} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ fontSize: "14px", color: "#333333" }}>{title}</h4>
                    <p className="text-sm" style={{ color: "#6C757D", lineHeight: "1.6" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Country selector */}
          <div className="mb-8">
            <h2 className="mb-6 text-center" style={{ fontSize: "26px", fontWeight: 700, color: "#333333" }}>Country-by-Country Visa Guide</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCountry(c.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: activeCountry === c.id ? "#005897" : "#ffffff",
                    color: activeCountry === c.id ? "#ffffff" : "#333333",
                    border: `2px solid ${activeCountry === c.id ? "#005897" : "#DEE2E6"}`,
                    boxShadow: activeCountry === c.id ? "0 4px 12px rgba(0,88,151,0.3)" : "none",
                  }}
                >
                  <span className="text-lg">{c.flag}</span>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Country detail card */}
          <div className="bg-white rounded-2xl overflow-hidden mb-14" style={{ border: "1px solid #DEE2E6", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            {/* Country header */}
            <div className="px-8 py-6" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{country.flag}</span>
                  <div>
                    <h3 className="text-white" style={{ fontSize: "24px", fontWeight: 700 }}>{country.name}</h3>
                    <p style={{ color: "#a8cce0", fontSize: "14px" }}>{country.visaType}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  {[
                    { label: "Max Stay", value: country.maxStay },
                    { label: "Processing", value: country.processingTime },
                    { label: "Fee", value: country.fee },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center px-4 py-2 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                      <div className="text-xs" style={{ color: "#8bb5d4" }}>{label}</div>
                      <div className="text-sm font-bold text-white mt-0.5">{value}</div>
                    </div>
                  ))}
                  <div className="text-center px-4 py-2 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                    <div className="text-xs" style={{ color: "#8bb5d4" }}>Difficulty</div>
                    <div className="text-sm font-bold mt-0.5" style={{ color: country.difficultyColor === "#198754" ? "#4ade80" : "#fbbf24" }}>{country.difficulty}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              <p className="mb-8 text-sm leading-relaxed" style={{ color: "#4F4F4F", fontSize: "15px" }}>{country.summary}</p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Documents Required */}
                <div>
                  <h4 className="flex items-center gap-2 mb-4" style={{ fontSize: "15px", fontWeight: 700, color: "#333" }}>
                    <FileText size={16} style={{ color: "#005897" }} />
                    Documents Required
                  </h4>
                  <ul className="space-y-2.5">
                    {country.documents.map((doc) => (
                      <li key={doc} className="flex items-start gap-2.5 text-sm" style={{ color: "#4F4F4F" }}>
                        <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: "#198754" }} />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Insider Tips */}
                <div>
                  <h4 className="flex items-center gap-2 mb-4" style={{ fontSize: "15px", fontWeight: 700, color: "#333" }}>
                    <AlertCircle size={16} style={{ color: "#DC3545" }} />
                    Insider Tips
                  </h4>
                  <ul className="space-y-3">
                    {country.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2.5 text-sm" style={{ color: "#4F4F4F" }}>
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5" style={{ backgroundColor: "#0DCAF0" }}>!</span>
                        {tip}
                      </li>
                    ))}
                  </ul>

                  {/* Embassy note */}
                  <div className="mt-5 p-4 rounded-xl" style={{ backgroundColor: "#EEF7FF", border: "1px solid #c5ddf0" }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: "#005897" }}>Embassy / Application Info</p>
                    <p className="text-sm" style={{ color: "#4F4F4F" }}>{country.embassyNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* We handle it for you */}
          <div className="rounded-2xl p-8 mb-10" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-white mb-3" style={{ fontSize: "22px", fontWeight: 700 }}>We Handle All the Paperwork For You</h3>
                <p style={{ color: "#a8cce0", lineHeight: "1.7" }}>
                  MedBridge coordinates your hospital invitation letter, assists with your visa application checklist, and connects you with our destination partner offices who can support in-country visa extensions.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  "Hospital invitation letter within 24h",
                  "Visa document checklist per nationality",
                  "In-country visa extension support",
                  "Embassy appointment scheduling assistance",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: "#0DCAF0" }} />
                    <span className="text-sm" style={{ color: "#c8e0f4" }}>{item}</span>
                  </div>
                ))}
                <Link to="/contact"
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 rounded-md font-bold text-sm text-white"
                  style={{ backgroundColor: "#DC3545" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#BB2D3B"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#DC3545"; }}>
                  Get Visa Assistance <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="mb-6" style={{ fontSize: "22px", fontWeight: 700, color: "#333333" }}>Frequently Asked Visa Questions</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Can I travel on a tourist visa for medical treatment?",
                  a: "For short treatments (under 30 days), most countries allow you to enter on a tourist or e-Visa. For longer treatments or to be safe, apply for the dedicated medical visa to avoid any complications at immigration.",
                },
                {
                  q: "Does my companion need a separate visa?",
                  a: "Yes, companions need their own visa. India offers a dedicated 'Medical Attendant Visa' (MED-X) for one accompanying family member. Other countries typically issue tourist or visit visas to companions.",
                },
                {
                  q: "What if my treatment takes longer than expected?",
                  a: "Most medical visas can be extended within the destination country. MedBridge's local partner offices can help coordinate extensions — typically requiring a letter from the treating hospital explaining medical necessity.",
                },
                {
                  q: "Do I need to declare my medical purpose at the border?",
                  a: "If you hold a medical visa, yes. If entering on a tourist visa for a minor procedure, it's best to be honest if asked. Border officials in medical tourism hubs are well accustomed to medical visitors.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-white rounded-xl overflow-hidden" style={{ border: "1px solid #DEE2E6" }}>
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer select-none font-semibold text-sm" style={{ color: "#333333" }}>
                    {q}
                    <ChevronRight size={16} className="flex-shrink-0 group-open:rotate-90 transition-transform" style={{ color: "#005897" }} />
                  </summary>
                  <div className="px-6 pb-5 text-sm" style={{ color: "#4F4F4F", lineHeight: "1.7", borderTop: "1px solid #DEE2E6" }}>
                    <div className="pt-4">{a}</div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
