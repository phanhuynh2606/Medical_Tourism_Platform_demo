import { useState } from "react";
import { Link } from "react-router";
import { ChevronRight, ChevronDown, ArrowRight } from "lucide-react";
import { FAQS } from "../data/mockData";

const CATEGORIES = ["All", "Getting Started", "Costs & Savings", "Quality & Safety", "Logistics & Travel"];

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openItem, setOpenItem] = useState<number | null>(1);

  const filtered = activeCategory === "All" ? FAQS : FAQS.filter((f) => f.category === activeCategory);

  return (
    <div>
      {/* Header */}
      <div className="py-12 px-4" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-xs mb-4" style={{ color: "#8bb5d4" }}>
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#0DCAF0" }}>FAQ</span>
          </nav>
          <h1 className="text-white mb-3" style={{ fontSize: "36px", fontWeight: 700 }}>Frequently Asked Questions</h1>
          <p style={{ color: "#a8cce0", fontSize: "17px" }}>
            Everything you need to know about medical tourism, our process, costs, and safety standards.
          </p>
        </div>
      </div>

      <div className="py-12 px-4" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-3xl mx-auto">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                style={{
                  backgroundColor: activeCategory === cat ? "#005897" : "#ffffff",
                  color: activeCategory === cat ? "#ffffff" : "#4F4F4F",
                  border: `1px solid ${activeCategory === cat ? "#005897" : "#DEE2E6"}`,
                }}>
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ accordion */}
          <div className="space-y-3">
            {filtered.map((faq) => (
              <div key={faq.id} className="bg-white rounded-xl overflow-hidden transition-shadow"
                style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenItem(openItem === faq.id ? null : faq.id)}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: "#EEF7FF", color: "#005897" }}>
                      {faq.category.split(" ")[0]}
                    </span>
                    <span className="font-semibold text-sm" style={{ color: "#333333" }}>{faq.question}</span>
                  </div>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 ml-3 transition-transform"
                    style={{ color: "#005897", transform: openItem === faq.id ? "rotate(180deg)" : "rotate(0)" }}
                  />
                </button>
                {openItem === faq.id && (
                  <div className="px-6 pb-5 pt-0">
                    <div className="ml-16 text-sm" style={{ color: "#4F4F4F", lineHeight: "1.7" }}>
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-10 rounded-xl p-7 text-center" style={{ backgroundColor: "#EEF7FF", border: "1px solid #c5ddf0" }}>
            <h3 className="font-bold mb-2" style={{ fontSize: "18px", color: "#333" }}>Still Have Questions?</h3>
            <p className="text-sm mb-4" style={{ color: "#4F4F4F" }}>
              Our patient coordinators are available 24/7 to answer any questions about your specific situation.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-bold text-white"
                style={{ backgroundColor: "#DC3545" }}>
                Send Us a Message <ArrowRight size={14} />
              </Link>
              <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-bold text-white"
                style={{ backgroundColor: "#198754" }}>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
