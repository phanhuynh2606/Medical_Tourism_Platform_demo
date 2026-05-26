import { Link } from "react-router";
import { ArrowRight, ChevronRight, CheckCircle } from "lucide-react";
import { SERVICES } from "../data/mockData";

const SERVICE_IMAGES: Record<string, string> = {
  cardiology: "https://images.unsplash.com/photo-1579154491781-5e199df316aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  oncology: "https://images.unsplash.com/photo-1578496781985-452d4a934d50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  orthopaedics: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  dental: "https://images.unsplash.com/photo-1663182234283-28941e7612da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  ivf: "https://images.unsplash.com/photo-1631557676757-fcc7b1160be8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  wellness: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  cardiology: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  oncology: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  orthopaedics: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M7 7l5-5 5 5M7 17l5 5 5-5"/>
    </svg>
  ),
  dental: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3C7.5 3 5 6.5 5 9c0 3 1 5 1 8s1 4 2 4 2-2 4-2 3 2 4 2 2-1 2-4 1-5 1-8c0-2.5-2.5-6-7-6z"/>
    </svg>
  ),
  ivf: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v4m0 12v4M2 12h4m12 0h4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
    </svg>
  ),
  wellness: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
};

const SAVINGS: Record<string, string> = {
  cardiology: "Up to 85% savings",
  oncology: "Up to 75% savings",
  orthopaedics: "Up to 80% savings",
  dental: "Up to 70% savings",
  ivf: "Up to 65% savings",
  wellness: "Up to 60% savings",
};

export function ServicesPage() {
  return (
    <div>
      {/* Page header */}
      <div className="py-14 px-4" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-xs mb-4" style={{ color: "#8bb5d4" }}>
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#0DCAF0" }}>Medical Services</span>
          </nav>
          <h1 className="text-white mb-3" style={{ fontSize: "36px", fontWeight: 700 }}>Medical Services</h1>
          <p style={{ color: "#a8cce0", fontSize: "17px" }}>
            World-class specialists across 6 major treatment areas — all at 60–85% less than Western prices.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              { value: "6", label: "Specialties" },
              { value: "50+", label: "Partner Hospitals" },
              { value: "190+", label: "Countries Served" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold" style={{ color: "#0DCAF0" }}>{value}</div>
                <div className="text-xs" style={{ color: "#8bb5d4" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div className="py-16 px-4" style={{ backgroundColor: "#F0F4F8" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {SERVICES.filter((s) => s.id !== "wellness").map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
              >
                {/* Photo header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={SERVICE_IMAGES[service.id]}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,40,90,0.88) 100%)"
                  }} />

                  {/* Savings badge top-right */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
                    💰 {SAVINGS[service.id]}
                  </div>

                  {/* Icon + title bottom-left */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: "1.5px solid rgba(255,255,255,0.4)" }}>
                      {SERVICE_ICONS[service.id]}
                    </div>
                    <div>
                      <div className="text-white leading-tight" style={{ fontSize: "18px", fontWeight: 700, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>
                        {service.title}
                      </div>
                      <div className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.8)" }}>
                        {service.procedures.length} procedures
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-sm mb-4" style={{ color: "#6C757D", lineHeight: "1.65" }}>
                    {service.shortDescription}
                  </p>

                  {/* Key procedures */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.procedures.slice(0, 3).map((p) => (
                      <span key={p} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ backgroundColor: "#EEF7FF", color: "#005897", border: "1px solid #c5ddf0" }}>
                        <CheckCircle size={10} />
                        {p}
                      </span>
                    ))}
                    {service.procedures.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ backgroundColor: "#F8F9FA", color: "#6C757D", border: "1px solid #DEE2E6" }}>
                        +{service.procedures.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Destinations */}
                  <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                    <span className="text-xs" style={{ color: "#9CA3AF" }}>Available in:</span>
                    {service.countries.map((c) => (
                      <span key={c} className="text-xs px-2 py-0.5 rounded font-semibold"
                        style={{ backgroundColor: "#EEF7FF", color: "#005897" }}>
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #E9ECEF" }}>
                    <div>
                      <div className="text-xs" style={{ color: "#9CA3AF" }}>From</div>
                      <div className="font-bold" style={{ color: "#005897", fontSize: "15px" }}>
                        {service.costRange.split("–")[0].trim()}
                      </div>
                    </div>
                    <span className="flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl text-white transition-all group-hover:gap-2.5"
                      style={{ backgroundColor: "#005897" }}>
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="py-8 px-4" style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E9ECEF", borderBottom: "1px solid #E9ECEF" }}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: "🏥", label: "JCI-Accredited Hospitals Only" },
            { icon: "🩺", label: "Internationally Trained Surgeons" },
            { icon: "✈️", label: "Full Travel & Visa Support" },
            { icon: "💬", label: "Dedicated Patient Coordinator" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-xl">{icon}</span>
              <span className="text-sm font-medium" style={{ color: "#4F4F4F" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-14 px-4" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-3" style={{ fontSize: "28px", fontWeight: 700 }}>Not sure which treatment you need?</h2>
          <p style={{ color: "#a8cce0" }} className="mb-7 text-base">
            Our medical team reviews your case within 24 hours and recommends the right specialist and destination — at no cost to you.
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
