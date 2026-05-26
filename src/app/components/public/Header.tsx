import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, Globe, ChevronDown, Search, Phone, MessageCircle, Sparkles } from "lucide-react";

type NavChild = { label: string; href: string; desc?: string };
type NavItem = { label: string; href: string; hasDropdown?: boolean; children?: NavChild[] };

const NAV_ITEMS: NavItem[] = [
  {
    label: "Services", href: "/services", hasDropdown: true,
    children: [
      { label: "Cardiology", href: "/services/cardiology", desc: "Heart surgery & interventions" },
      { label: "Oncology", href: "/services/oncology", desc: "Cancer treatment & care" },
      { label: "Orthopaedics", href: "/services/orthopaedics", desc: "Joint & spine surgery" },
      { label: "Dental & Cosmetic", href: "/services/dental", desc: "Implants, veneers & more" },
      { label: "IVF & Fertility", href: "/services/ivf", desc: "Advanced fertility treatment" },
    ],
  },
  { label: "Hospitals", href: "/hospitals" },
  { label: "Destinations", href: "/destinations" },
  { label: "Cost Estimator", href: "/cost-estimator" },
  {
    label: "Knowledge", href: "/faq", hasDropdown: true,
    children: [
      { label: "How It Works", href: "/patient-journey", desc: "Your step-by-step medical journey" },
      { label: "Blogs", href: "/blog", desc: "Expert articles & guides" },
      { label: "Videos", href: "/videos", desc: "Hospital tours & testimonials" },
      { label: "Medical Visa", href: "/medical-visa", desc: "Entry requirements by country" },
      { label: "FAQ", href: "/faq", desc: "Common patient questions" },
    ],
  },
  { label: "Wellness", href: "/services/wellness" },
  { label: "Patient Stories", href: "/testimonials" },
];

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

const SEARCH_SUGGESTIONS = [
  { type: "Treatment", label: "Cardiac Bypass Surgery", href: "/services/cardiology" },
  { type: "Treatment", label: "Total Knee Replacement", href: "/services/orthopaedics" },
  { type: "Treatment", label: "IVF Treatment", href: "/services/ivf" },
  { type: "Treatment", label: "Dental Implants", href: "/services/dental" },
  { type: "Treatment", label: "Cancer Treatment", href: "/services/oncology" },
  { type: "Destination", label: "Bangkok, Thailand", href: "/destinations/thailand" },
  { type: "Destination", label: "Delhi / Chennai, India", href: "/destinations/india" },
  { type: "Destination", label: "Istanbul, Turkey", href: "/destinations/turkey" },
  { type: "Hospital", label: "Bumrungrad International", href: "/hospitals" },
  { type: "Hospital", label: "Apollo Hospitals", href: "/hospitals" },
  { type: "Guide", label: "Medical Visa Guide", href: "/medical-visa" },
  { type: "Guide", label: "Cost Comparison", href: "/cost-estimator" },
];

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Treatment: { bg: "#EEF7FF", text: "#005897" },
  Destination: { bg: "#F0FFF4", text: "#198754" },
  Hospital: { bg: "#FFF0F1", text: "#DC3545" },
  Guide: { bg: "#F3F0FF", text: "#6F42C1" },
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const filtered = searchQuery.trim()
    ? SEARCH_SUGGESTIONS.filter((s) => s.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : SEARCH_SUGGESTIONS.slice(0, 8);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleSearchSelect(href: string) {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(href);
  }

  return (
    <>
      {/* ── ROW 1: Brand bar ── */}
      <div style={{ backgroundColor: "#003d6b", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 mr-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-md">
              <svg viewBox="0 0 32 32" className="w-6 h-6">
                <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 2c1.5 0 2.946.285 4.278.8L8.8 18.278A10 10 0 0116 6zm-7.278 12.722A9.96 9.96 0 0116 26a10 10 0 01-7.278-7.278zM26 16c0 1.5-.285 2.946-.8 4.278L13.722 8.8A9.96 9.96 0 0126 16z" fill="#003d6b"/>
              </svg>
            </div>
            <div>
              <div className="text-white tracking-wide" style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1 }}>MedBridge</div>
              <div style={{ color: "#0DCAF0", fontSize: "10px", letterSpacing: "0.06em", lineHeight: 1.4 }}>GLOBAL HEALTH PLATFORM</div>
            </div>
          </Link>


          {/* Search bar */}
          <div ref={searchRef} className="flex-1 relative hidden md:block max-w-xl mx-auto">
            <div
              className="flex items-center rounded-xl transition-all"
              style={{
                backgroundColor: "#ffffff",
                border: `1.5px solid ${searchOpen ? "#0DCAF0" : "#e0e0e0"}`,
                boxShadow: searchOpen ? "0 0 0 3px rgba(13,202,240,0.15)" : "0 1px 4px rgba(0,0,0,0.08)",
              }}
            >
              <Search size={15} className="ml-4 flex-shrink-0" style={{ color: "#9CA3AF" }} />
              <input
                type="text"
                placeholder="Search treatments, hospitals, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchOpen(true)}
                className="flex-1 bg-transparent outline-none px-3 py-2.5"
                style={{ fontSize: "13px", color: "#333333" }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="mr-3 text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Search dropdown */}
            {searchOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50"
                style={{ border: "1px solid #DEE2E6" }}>
                <div className="px-4 py-2 text-xs font-semibold" style={{ color: "#9CA3AF", backgroundColor: "#F8F9FA", borderBottom: "1px solid #DEE2E6" }}>
                  {searchQuery ? `Results for "${searchQuery}"` : "Popular searches"}
                </div>
                {filtered.length === 0 ? (
                  <div className="px-4 py-4 text-sm text-center" style={{ color: "#6C757D" }}>No results found</div>
                ) : (
                  filtered.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleSearchSelect(item.href)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-gray-50"
                    >
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: TYPE_COLORS[item.type]?.bg, color: TYPE_COLORS[item.type]?.text }}>
                        {item.type}
                      </span>
                      <span className="text-sm" style={{ color: "#333333" }}>{item.label}</span>
                    </button>
                  ))
                )}
                <div className="px-4 py-2.5 text-xs text-center" style={{ backgroundColor: "#F8F9FA", borderTop: "1px solid #DEE2E6", color: "#6C757D" }}>
                  Press Enter to search all results
                </div>
              </div>
            )}
          </div>

          {/* Right: contact + CTA */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {/* WhatsApp quick contact */}
            <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
              style={{ color: "#a8cce0" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}>
              <MessageCircle size={14} style={{ color: "#25D366" }} />
              <span className="text-xs font-medium hidden lg:block">WhatsApp</span>
            </a>

            {/* Phone */}
            <a href="tel:+18006332743" className="hidden lg:flex items-center gap-1.5"
              style={{ color: "#a8cce0", fontSize: "12px" }}>
              <Phone size={12} />
              +1 800 MED-BRIDGE
            </a>

            {/* CTA */}
            <Link
              to="/contact"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all shadow-lg"
              style={{ backgroundColor: "#DC3545", boxShadow: "0 4px 12px rgba(220,53,69,0.35)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#BB2D3B"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(220,53,69,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#DC3545"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(220,53,69,0.35)"; }}
            >
              <Sparkles size={13} />
              Free Consultation
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto text-white p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── ROW 2: Nav bar ── */}
      <div className="hidden md:block sticky top-0 z-50 shadow-sm" style={{ backgroundColor: "#005897", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between" style={{ height: "44px" }}>

          {/* Nav links */}
          <nav className="flex items-center gap-0.5 h-full">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + "/");
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                return (
                  <div key={item.label} className="relative h-full flex items-center"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}>
                    <Link
                      to={item.href}
                      className="flex items-center gap-0.5 px-3 h-full text-sm whitespace-nowrap transition-colors relative"
                      style={{ color: isActive ? "#0DCAF0" : "rgba(255,255,255,0.88)" }}
                    >
                      {item.label}
                      <ChevronDown size={12} style={{ transition: "transform 0.2s", transform: openDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)" }} />
                      {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full" style={{ backgroundColor: "#0DCAF0" }} />}
                    </Link>

                    {openDropdown === item.label && (
                      <div className="absolute left-0 top-full pt-1 z-50">
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden" style={{ border: "1px solid #DEE2E6", minWidth: "220px" }}>
                          {item.children!.map((child) => (
                            <Link key={child.label} to={child.href}
                              className="flex items-start gap-3 px-4 py-3 transition-colors group/item"
                              style={{ borderBottom: "1px solid #F3F4F6" }}
                              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#EEF7FF"; }}
                              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                            >
                              <div>
                                <div className="text-sm font-semibold" style={{ color: "#333333" }}>{child.label}</div>
                                {child.desc && <div className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{child.desc}</div>}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link key={item.label} to={item.href}
                  className="flex items-center px-3 h-full text-sm whitespace-nowrap transition-colors relative"
                  style={{ color: isActive ? "#0DCAF0" : "rgba(255,255,255,0.88)" }}
                >
                  {item.label}
                  {isActive && <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full" style={{ backgroundColor: "#0DCAF0" }} />}
                </Link>
              );
            })}
          </nav>

          {/* Right: live indicator + language */}
          <div className="flex items-center gap-4">
            {/* Live chat indicator */}
            <div className="hidden lg:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#25D366" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>Coordinators online</span>
            </div>

            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs transition-colors"
                style={{ color: "rgba(255,255,255,0.8)", backgroundColor: langOpen ? "rgba(255,255,255,0.12)" : "transparent" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={(e) => { if (!langOpen) e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <Globe size={13} />
                <span>{selectedLang.flag} {selectedLang.code.toUpperCase()}</span>
                <ChevronDown size={11} />
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl py-1 z-50 overflow-hidden"
                  style={{ border: "1px solid #DEE2E6", minWidth: "160px" }}>
                  {LANGUAGES.map((lang) => (
                    <button key={lang.code}
                      className="flex items-center gap-2.5 w-full px-4 py-2 text-sm text-left transition-colors"
                      style={{ color: selectedLang.code === lang.code ? "#005897" : "#333333", fontWeight: selectedLang.code === lang.code ? 700 : 400 }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8F9FA"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                      onClick={() => { setSelectedLang(lang); setLangOpen(false); }}>
                      <span>{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE DRAWER ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 flex flex-col" style={{ backgroundColor: "#003d6b" }}>
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                  <svg viewBox="0 0 32 32" className="w-5 h-5">
                    <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4zm0 2c1.5 0 2.946.285 4.278.8L8.8 18.278A10 10 0 0116 6zm-7.278 12.722A9.96 9.96 0 0116 26a10 10 0 01-7.278-7.278zM26 16c0 1.5-.285 2.946-.8 4.278L13.722 8.8A9.96 9.96 0 0126 16z" fill="#003d6b"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white font-bold text-base">MedBridge</div>
                  <div className="text-xs" style={{ color: "#0DCAF0" }}>Global Health</div>
                </div>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-white p-1">
                <X size={22} />
              </button>
            </div>

            {/* Mobile search */}
            <div className="px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2.5" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
                <Search size={14} style={{ color: "#8bb5d4" }} />
                <input type="text" placeholder="Search treatments..." className="flex-1 bg-transparent outline-none text-sm text-white placeholder-blue-300" style={{ color: "#fff" }} />
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto py-2">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <Link to={item.href}
                    className="flex items-center justify-between px-5 py-3 text-sm font-medium transition-colors"
                    style={{ color: "rgba(255,255,255,0.9)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                    onClick={() => setMobileOpen(false)}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}>
                    {item.label}
                    {item.hasDropdown && <ChevronDown size={14} style={{ color: "#8bb5d4" }} />}
                  </Link>
                  {item.children?.map((child) => (
                    <Link key={child.label} to={child.href}
                      className="flex items-center pl-9 pr-5 py-2.5 text-xs transition-colors"
                      style={{ color: "#8bb5d4", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      onClick={() => setMobileOpen(false)}>
                      — {child.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>

            {/* Bottom actions */}
            <div className="p-4 space-y-2" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: "#198754" }}>
                <MessageCircle size={15} /> WhatsApp Us
              </a>
              <Link to="/contact" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ backgroundColor: "#DC3545" }}>
                <Sparkles size={13} /> Free Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
