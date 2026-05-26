import { Link } from "react-router";
import { ChevronRight, Shield, Lock, Eye, Trash2 } from "lucide-react";

export function PrivacyPage() {
  return (
    <div>
      {/* Header */}
      <div className="py-12 px-4" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-xs mb-4" style={{ color: "#8bb5d4" }}>
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#0DCAF0" }}>Privacy Policy</span>
          </nav>
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
              <Shield size={28} className="text-white" />
            </div>
          </div>
          <h1 className="text-white mb-3" style={{ fontSize: "36px", fontWeight: 700 }}>Privacy Policy & GDPR Compliance</h1>
          <p style={{ color: "#a8cce0" }}>Last updated: May 25, 2026 · Effective: May 25, 2026</p>
        </div>
      </div>

      <div className="py-12 px-4" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-4xl mx-auto">
          {/* GDPR highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Lock, title: "Encrypted Storage", desc: "All medical data is encrypted at rest and in transit" },
              { icon: Eye, title: "No Data Selling", desc: "We never sell your personal or medical information" },
              { icon: Shield, title: "GDPR Compliant", desc: "Full compliance with EU General Data Protection Regulation" },
              { icon: Trash2, title: "Right to Erasure", desc: "Request deletion of your data at any time" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-4 text-center" style={{ border: "1px solid #DEE2E6" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: "#EEF7FF" }}>
                  <Icon size={18} style={{ color: "#005897" }} />
                </div>
                <div className="font-semibold text-sm mb-1" style={{ color: "#333" }}>{title}</div>
                <div className="text-xs" style={{ color: "#6C757D" }}>{desc}</div>
              </div>
            ))}
          </div>

          {/* Policy content */}
          <div className="bg-white rounded-xl p-8" style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div className="prose max-w-none space-y-7">

              {[
                {
                  title: "1. Data Controller",
                  content: `MedBridge Global Health ("we", "us", "our") acts as the data controller for personal data collected through our website and inquiry process. Contact: privacy@medbridgehealth.com`
                },
                {
                  title: "2. Information We Collect",
                  content: `We collect: personal identification data (name, email, phone, nationality, date of birth), medical information you voluntarily provide (treatment interests, medical condition descriptions, uploaded documents), contact preferences, and usage data (browser type, IP address, pages visited). We collect this information only when you submit an inquiry or contact us directly.`
                },
                {
                  title: "3. How We Use Your Information",
                  content: `Your information is used to: (a) process and respond to your medical consultation requests; (b) share anonymized or consented information with partner hospitals to obtain treatment opinions and quotes; (c) communicate with you about your inquiry via your preferred channels; (d) comply with legal obligations; (e) improve our services. We do not use your data for marketing without explicit consent.`
                },
                {
                  title: "4. Medical Data & Sensitive Information",
                  content: `Medical information is classified as special category data under GDPR Article 9. We process this data only with your explicit consent, solely for the purpose of facilitating your healthcare consultation. Medical documents are stored encrypted and are never accessible via public URLs. Access is restricted to authorized personnel directly involved in your case.`
                },
                {
                  title: "5. Data Sharing",
                  content: `We share your data with: (a) partner hospitals and medical consultants, with your explicit consent, for the purpose of obtaining medical opinions; (b) service providers who process data on our behalf under strict data processing agreements; (c) legal authorities when required by law. We never sell your data. We never share your data with third-party marketers.`
                },
                {
                  title: "6. Your Rights Under GDPR",
                  content: `You have the right to: access your personal data; rectify inaccurate data; request erasure ("right to be forgotten"); restrict processing; data portability; object to processing; withdraw consent at any time. To exercise these rights, contact: privacy@medbridgehealth.com. We respond to all requests within 30 days.`
                },
                {
                  title: "7. Data Retention",
                  content: `We retain inquiry data for a maximum of 3 years from last contact, unless you request earlier deletion or we are required by law to retain it longer. Medical documents are deleted within 90 days of case closure unless a longer retention is requested by you.`
                },
                {
                  title: "8. Security",
                  content: `We implement industry-standard security measures including: TLS 1.3 encryption in transit; AES-256 encryption at rest; access control and authentication for all staff; regular security audits; rate limiting on form submissions; input sanitization to prevent injection attacks.`
                },
                {
                  title: "9. Cookies",
                  content: `We use essential cookies for website functionality and session management. Analytics cookies are only used with your explicit consent via our cookie banner. We do not use advertising cookies. You can manage cookie preferences at any time through your browser settings.`
                },
                {
                  title: "10. Contact & Complaints",
                  content: `Data protection inquiries: privacy@medbridgehealth.com. You have the right to lodge a complaint with your national data protection authority (e.g., ICO in the UK, CNIL in France) if you believe your data has been processed unlawfully.`
                },
              ].map((section) => (
                <div key={section.title}>
                  <h2 className="font-bold mb-2" style={{ fontSize: "17px", color: "#333333" }}>{section.title}</h2>
                  <p className="text-sm leading-relaxed" style={{ color: "#4F4F4F" }}>{section.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm mb-4" style={{ color: "#6C757D" }}>Questions about this policy?</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-bold text-white"
              style={{ backgroundColor: "#005897" }}>
              Contact Our Privacy Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
