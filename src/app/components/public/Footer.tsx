import { Link } from "react-router";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const FOOTER_LINKS = {
  "Medical Services": [
    { label: "Cardiology", href: "/services/cardiology" },
    { label: "Oncology", href: "/services/oncology" },
    { label: "Orthopaedics", href: "/services/orthopaedics" },
    { label: "Dental & Cosmetic", href: "/services/dental" },
    { label: "IVF & Fertility", href: "/services/ivf" },
    { label: "Wellness & Checkup", href: "/services/wellness" },
  ],
  "Top Destinations": [
    { label: "Thailand", href: "/destinations/thailand" },
    { label: "India", href: "/destinations/india" },
    { label: "Turkey", href: "/destinations/turkey" },
    { label: "Malaysia", href: "/destinations/malaysia" },
  ],
  "Patient Resources": [
    { label: "Patient Journey", href: "/patient-journey" },
    { label: "Treatment Costs", href: "/contact" },
    { label: "Patient Stories", href: "/testimonials" },
    { label: "FAQ", href: "/faq" },
    { label: "Hospital Network", href: "/hospitals" },
  ],
  "Company": [
    { label: "About Us", href: "/" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "GDPR Compliance", href: "/privacy-policy" },
    { label: "Partner Hospitals", href: "/hospitals" },
  ],
};

export function Footer() {
  return (
    <footer>
      {/* Main footer */}
      <div className="py-14 px-6" style={{ backgroundColor: "#003d6b" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand column */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white">
                  <svg viewBox="0 0 32 32" className="w-7 h-7">
                    <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 2c1.5 0 2.946.285 4.278.8L8.8 18.278A10 10 0 0116 6zm-7.278 12.722A9.96 9.96 0 0116 26a10 10 0 01-7.278-7.278zM26 16c0 1.5-.285 2.946-.8 4.278L13.722 8.8A9.96 9.96 0 0126 16z" fill="#005897"/>
                  </svg>
                </div>
                <div className="leading-none">
                  <div className="text-white font-bold text-lg">MedBridge</div>
                  <div className="text-xs" style={{ color: "#0DCAF0" }}>Global Health</div>
                </div>
              </Link>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#8bb5d4" }}>
                Your trusted international healthcare concierge. We connect patients with world-class hospitals across Asia, helping you access premium medical care at transparent, affordable costs.
              </p>
              <div className="space-y-3 text-sm" style={{ color: "#8bb5d4" }}>
                <div className="flex items-center gap-2.5">
                  <Phone size={14} className="flex-shrink-0" style={{ color: "#0DCAF0" }} />
                  <span>+1 (800) MED-BRIDGE</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail size={14} className="flex-shrink-0" style={{ color: "#0DCAF0" }} />
                  <span>hello@medbridgehealth.com</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#0DCAF0" }} />
                  <span>Bangkok · Kuala Lumpur · Istanbul · New Delhi</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-6">
                <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium text-white transition-colors"
                   style={{ backgroundColor: "#198754" }}>
                  <MessageCircle size={13} />WhatsApp
                </a>
                <span className="px-3 py-2 rounded-md text-xs font-medium text-white" style={{ backgroundColor: "#0068FF" }}>Zalo</span>
                <span className="px-3 py-2 rounded-md text-xs font-medium text-white" style={{ backgroundColor: "#07C160" }}>WeChat</span>
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: "#8bb5d4" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="py-4 px-6" style={{ backgroundColor: "#002d50" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            {["JCI Partner Hospitals", "GDPR Compliant", "HIPAA Aligned", "ISO Certified"].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border"
                style={{ color: "#0DCAF0", borderColor: "#0DCAF030", backgroundColor: "#0DCAF010" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {badge}
              </span>
            ))}
          </div>
          <p className="text-xs text-center" style={{ color: "#5a8ba8" }}>
            © 2026 MedBridge Global Health. All rights reserved. Medical information is not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
