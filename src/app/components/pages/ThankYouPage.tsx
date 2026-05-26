import { useParams, Link } from "react-router";
import { CheckCircle, ArrowRight, Clock, Phone } from "lucide-react";

export function ThankYouPage() {
  const { referenceCode } = useParams<{ referenceCode: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16" style={{ backgroundColor: "#F8F9FA" }}>
      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center animate-pulse"
            style={{ backgroundColor: "#F0FFF4", border: "3px solid #198754" }}>
            <CheckCircle size={40} style={{ color: "#198754" }} />
          </div>
        </div>

        <h1 className="mb-3" style={{ fontSize: "28px", fontWeight: 700, color: "#333333" }}>
          Inquiry Submitted Successfully!
        </h1>

        <p className="mb-6" style={{ color: "#4F4F4F", fontSize: "16px", lineHeight: "1.7" }}>
          Thank you for trusting MedBridge. Your inquiry has been received and our team will review your case within 24 hours.
        </p>

        {/* Reference code */}
        <div className="rounded-xl p-5 mb-7" style={{ backgroundColor: "#EEF7FF", border: "2px solid #005897" }}>
          <div className="text-xs font-semibold mb-1" style={{ color: "#6C757D" }}>Your Reference Number</div>
          <div className="font-bold text-2xl tracking-widest" style={{ color: "#005897" }}>{referenceCode}</div>
          <div className="text-xs mt-2" style={{ color: "#6C757D" }}>Please save this reference for future correspondence</div>
        </div>

        {/* What happens next */}
        <div className="text-left rounded-xl p-5 mb-7 bg-white" style={{ border: "1px solid #DEE2E6" }}>
          <h3 className="font-bold mb-4" style={{ color: "#333", fontSize: "15px" }}>What Happens Next?</h3>
          <div className="space-y-3">
            {[
              { icon: Clock, time: "Within 1 hour", text: "Confirmation email sent to your inbox" },
              { icon: Phone, time: "Within 24 hours", text: "Medical coordinator contacts you via your preferred channel" },
              { icon: ArrowRight, time: "Within 3–5 days", text: "Detailed treatment plan and cost estimate from partner hospitals" },
            ].map(({ icon: Icon, time, text }) => (
              <div key={time} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EEF7FF" }}>
                  <Icon size={14} style={{ color: "#005897" }} />
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: "#005897" }}>{time}</div>
                  <div className="text-sm" style={{ color: "#4F4F4F" }}>{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick connect */}
        <p className="text-sm mb-4" style={{ color: "#6C757D" }}>Need to reach us immediately?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-bold text-white"
            style={{ backgroundColor: "#198754" }}>
            Chat on WhatsApp
          </a>
          <a href="mailto:hello@medbridgehealth.com"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md text-sm font-semibold"
            style={{ backgroundColor: "#F8F9FA", color: "#333", border: "1px solid #DEE2E6" }}>
            Email Us
          </a>
        </div>

        <Link to="/" className="text-sm" style={{ color: "#005897" }}>
          ← Return to Homepage
        </Link>
      </div>
    </div>
  );
}
