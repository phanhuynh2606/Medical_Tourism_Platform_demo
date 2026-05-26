import { useParams, Link } from "react-router";
import { ChevronRight, ArrowRight, MapPin, Building, Users } from "lucide-react";
import { DESTINATIONS, HOSPITALS, SERVICES } from "../data/mockData";

export function DestinationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const dest = DESTINATIONS.find((d) => d.slug === slug);

  if (!dest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#333" }}>Destination Not Found</h2>
          <Link to="/destinations" className="text-sm" style={{ color: "#005897" }}>← Back to Destinations</Link>
        </div>
      </div>
    );
  }

  const localHospitals = HOSPITALS.filter((h) => h.country === dest.country);

  return (
    <div>
      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={dest.image} alt={dest.country} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,40,80,0.85) 0%, rgba(0,40,80,0.4) 100%)" }} />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-4 pb-10 w-full">
            <nav className="flex items-center gap-2 text-xs mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight size={12} />
              <Link to="/destinations" className="hover:text-white">Destinations</Link>
              <ChevronRight size={12} />
              <span style={{ color: "#0DCAF0" }}>{dest.country}</span>
            </nav>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-5xl">{dest.flag}</span>
              <div>
                <h1 className="text-white font-bold" style={{ fontSize: "36px" }}>{dest.country}</h1>
                <p className="text-sm italic" style={{ color: "#0DCAF0" }}>{dest.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ backgroundColor: "#005897" }}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-wrap gap-6 justify-around">
          {[
            { icon: Building, label: "Partner Hospitals", value: dest.hospitalCount },
            { icon: Users, label: "International Patients/Year", value: dest.patientCount },
            { icon: MapPin, label: "Key Cities", value: dest.city },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                <Icon size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold">{value}</div>
                <div className="text-xs" style={{ color: "#8bb5d4" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-7">
            {/* Overview */}
            <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h2 className="font-bold mb-3" style={{ fontSize: "20px", color: "#333" }}>Why Choose {dest.country}?</h2>
              <p style={{ color: "#4F4F4F", lineHeight: "1.7", fontSize: "15px" }}>{dest.overview}</p>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h2 className="font-bold mb-4" style={{ fontSize: "20px", color: "#333" }}>Top Medical Specialties in {dest.country}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {dest.strengths.map((strength) => {
                  const service = SERVICES.find((s) => s.title.toLowerCase().includes(strength.toLowerCase().split(" ")[0]));
                  return (
                    <Link key={strength} to={service ? `/services/${service.slug}` : "/services"}
                      className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-blue-50"
                      style={{ border: "1px solid #DEE2E6" }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EEF7FF" }}>
                        <span style={{ color: "#005897", fontSize: "14px" }}>✓</span>
                      </div>
                      <span className="text-sm font-medium" style={{ color: "#333" }}>{strength}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Partner hospitals */}
            {localHospitals.length > 0 && (
              <div className="bg-white rounded-xl p-6" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <h2 className="font-bold mb-4" style={{ fontSize: "20px", color: "#333" }}>Partner Hospitals in {dest.country}</h2>
                <div className="space-y-4">
                  {localHospitals.map((h) => (
                    <div key={h.id} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: "#F8F9FA", border: "1px solid #DEE2E6" }}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                        style={{ backgroundColor: "#005897" }}>
                        {h.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm mb-1" style={{ color: "#333" }}>{h.name}</div>
                        <div className="text-xs mb-2" style={{ color: "#6C757D" }}>
                          {h.city} · Est. {h.established} · {h.beds} beds
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {h.accreditations.map((a) => (
                            <span key={a} className="text-xs px-1.5 py-0.5 rounded font-medium" style={{ backgroundColor: "#EEF7FF", color: "#005897" }}>{a}</span>
                          ))}
                          {h.specializations.map((s) => (
                            <span key={s} className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: "#F8F9FA", color: "#6C757D", border: "1px solid #DEE2E6" }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="rounded-xl p-6 text-white" style={{ backgroundColor: "#DC3545" }}>
              <h3 className="font-bold text-lg mb-2">Plan Your Trip to {dest.country}</h3>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.85)" }}>Get a personalized quote and travel plan for treatment in {dest.country}.</p>
              <Link to="/contact" className="block w-full text-center py-3 rounded-md font-bold text-sm bg-white"
                style={{ color: "#DC3545" }}>
                Request Quote <ArrowRight size={14} className="inline ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-xl p-5" style={{ border: "1px solid #DEE2E6" }}>
              <h4 className="font-bold mb-3 text-sm" style={{ color: "#333" }}>Destination Highlights</h4>
              <ul className="space-y-2.5 text-sm">
                {["World-class medical infrastructure", "English-speaking medical teams", "Internationally accredited hospitals", "Visa assistance available", "Dedicated patient coordinators", "Post-treatment follow-up support"].map((item) => (
                  <li key={item} className="flex items-start gap-2" style={{ color: "#4F4F4F" }}>
                    <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs" style={{ backgroundColor: "#F0FFF4", color: "#198754" }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
