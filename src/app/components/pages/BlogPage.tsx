import { useState } from "react";
import { Link } from "react-router";
import { Search, ChevronRight, Clock, ArrowRight, BookOpen } from "lucide-react";

const CATEGORIES = ["All", "Medical Tourism Tips", "Destination Guides", "Cost & Savings", "Treatment Guides", "Patient Stories"];

const BLOG_POSTS = [
  {
    id: 1,
    slug: "how-to-choose-hospital-abroad",
    title: "How to Choose the Right Hospital Abroad: A Step-by-Step Guide",
    excerpt: "Navigating the world of international hospitals can feel overwhelming. We break down the 7 key criteria every medical tourist should use when evaluating a hospital — from JCI accreditation to surgeon credentials and post-care protocols.",
    category: "Medical Tourism Tips",
    author: "Dr. Sarah Chen",
    authorRole: "Medical Director",
    date: "May 20, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    featured: true,
  },
  {
    id: 2,
    slug: "bangkok-medical-tourism-guide",
    title: "Bangkok: Asia's Medical Tourism Capital — A Complete 2026 Guide",
    excerpt: "From Bumrungrad to Vejthani, Bangkok hosts over 40 JCI-accredited hospitals. We cover what to expect, where to stay, and how to plan a stress-free medical trip to Thailand's capital.",
    category: "Destination Guides",
    author: "James Whitfield",
    authorRole: "Patient Coordinator",
    date: "May 15, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1504542982118-59308b40fe0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 3,
    slug: "cardiac-bypass-cost-comparison",
    title: "Cardiac Bypass Surgery: Why Patients Are Choosing India Over the US",
    excerpt: "A cardiac bypass costs $130,000 in the US. The same procedure at Apollo Hospitals in Chennai — with a Harvard-trained surgeon — costs $9,000. We examine the quality data, outcomes, and real patient stories.",
    category: "Cost & Savings",
    author: "Dr. Ahmad Hassan",
    authorRole: "Senior Medical Advisor",
    date: "May 10, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 4,
    slug: "ivf-abroad-what-to-know",
    title: "IVF Abroad: What Every Couple Should Know Before Booking",
    excerpt: "Fertility treatment overseas requires careful planning. From legal frameworks to embryo freezing regulations and success rate comparisons, we cover everything you need before making the decision.",
    category: "Treatment Guides",
    author: "Dr. Sarah Chen",
    authorRole: "Medical Director",
    date: "May 5, 2026",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1690306816872-91063f6de36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 5,
    slug: "istanbul-dental-tourism",
    title: "Istanbul's Dental Tourism Boom: Veneers, Implants, and All-on-4 at a Fraction of EU Costs",
    excerpt: "Turkey has become Europe's dental capital. We visit 3 leading clinics in Istanbul, speak with patients who flew in from Germany and the UK, and reveal what to watch out for.",
    category: "Destination Guides",
    author: "Aylin Kaya",
    authorRole: "Turkey Regional Coordinator",
    date: "April 28, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 6,
    slug: "medical-tourism-insurance-guide",
    title: "Travel Insurance for Medical Tourists: What's Covered and What's Not",
    excerpt: "Standard travel insurance won't cover planned medical procedures. We decode the policies you actually need — medical repatriation, surgical complication cover, and gap insurance — with a country-by-country breakdown.",
    category: "Medical Tourism Tips",
    author: "Lisa Thornton",
    authorRole: "Risk & Compliance Lead",
    date: "April 20, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1454496406107-dc34337da8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 7,
    slug: "my-knee-replacement-in-india",
    title: "\"I Saved $43,000 on My Knee Replacement\" — Michael's Story",
    excerpt: "Michael Torres, 58, from Phoenix, Arizona, was quoted $50,000 for a total knee replacement in the US. He flew to Chennai and had the same procedure at Apollo Hospitals for $7,000. One year on, here's his honest review.",
    category: "Patient Stories",
    author: "Editorial Team",
    authorRole: "MedBridge",
    date: "April 12, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 8,
    slug: "knee-replacement-recovery-tips",
    title: "7 Things to Do Before Flying Home After Joint Replacement Surgery",
    excerpt: "Flying long-haul after orthopedic surgery carries real risks. Deep vein thrombosis, wound care, and mobility aids — our physiotherapy team walks you through the essential pre-flight checklist.",
    category: "Treatment Guides",
    author: "Dr. Ahmad Hassan",
    authorRole: "Senior Medical Advisor",
    date: "April 5, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1587351021821-f871837248c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Medical Tourism Tips": { bg: "#EEF7FF", text: "#005897" },
  "Destination Guides": { bg: "#F0FFF4", text: "#198754" },
  "Cost & Savings": { bg: "#FFF3CD", text: "#856404" },
  "Treatment Guides": { bg: "#FFF0F1", text: "#DC3545" },
  "Patient Stories": { bg: "#F3F0FF", text: "#6F42C1" },
};

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = BLOG_POSTS.filter((post) => {
    const matchCat = activeCategory === "All" || post.category === activeCategory;
    const matchSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = BLOG_POSTS.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured || activeCategory !== "All" || searchQuery);
  const showFeatured = activeCategory === "All" && !searchQuery && featured;

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
            <span style={{ color: "#0DCAF0" }}>Blog</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4" style={{ backgroundColor: "rgba(13,202,240,0.15)", color: "#0DCAF0", border: "1px solid rgba(13,202,240,0.3)" }}>
            <BookOpen size={12} /> Medical Knowledge Hub
          </div>
          <h1 className="text-white mb-3" style={{ fontSize: "36px", fontWeight: 700 }}>
            Insights & Guides for Medical Travellers
          </h1>
          <p style={{ color: "#a8cce0", fontSize: "17px" }} className="mb-8">
            Expert articles on treatments, destinations, costs, and patient experiences — everything you need to plan your medical journey with confidence.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#6C757D" }} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white rounded-xl outline-none"
              style={{ padding: "12px 16px 12px 42px", fontSize: "14px", color: "#333" }}
            />
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-[57px] z-30 bg-white border-b" style={{ borderColor: "#DEE2E6" }}>
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-3" style={{ minWidth: "max-content" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
                style={{
                  backgroundColor: activeCategory === cat ? "#005897" : "#F8F9FA",
                  color: activeCategory === cat ? "#ffffff" : "#4F4F4F",
                  border: activeCategory === cat ? "none" : "1px solid #DEE2E6",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 px-4" style={{ backgroundColor: "#F8F9FA" }}>
        <div className="max-w-7xl mx-auto">

          {/* Featured post */}
          {showFeatured && (
            <div className="mb-10 rounded-2xl overflow-hidden bg-white group cursor-pointer"
              style={{ border: "1px solid #DEE2E6", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img src={featured!.image} alt={featured!.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, rgba(255,255,255,0.1) 100%)" }} />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ backgroundColor: "#DC3545", color: "#fff" }}>
                      ★ Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="mb-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[featured!.category]?.bg, color: CATEGORY_COLORS[featured!.category]?.text }}>
                      {featured!.category}
                    </span>
                  </div>
                  <h2 className="mb-3 leading-snug" style={{ fontSize: "22px", fontWeight: 700, color: "#333333" }}>{featured!.title}</h2>
                  <p className="mb-5 text-sm leading-relaxed" style={{ color: "#4F4F4F" }}>{featured!.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: "#005897" }}>
                        {featured!.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold" style={{ color: "#333" }}>{featured!.author}</div>
                        <div className="text-xs flex items-center gap-1" style={{ color: "#6C757D" }}>
                          <Clock size={10} /> {featured!.readTime} · {featured!.date}
                        </div>
                      </div>
                    </div>
                    <Link to={`/blog/${featured!.slug}`} className="flex items-center gap-1 text-sm font-semibold" style={{ color: "#DC3545" }}>
                      Read more <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Posts grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p style={{ color: "#6C757D" }}>No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(showFeatured ? rest : filtered).map((post) => (
                <article key={post.id} className="bg-white rounded-xl overflow-hidden group transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                  style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                  <div className="relative h-48 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[post.category]?.bg, color: CATEGORY_COLORS[post.category]?.text }}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 leading-snug" style={{ fontSize: "15px", fontWeight: 700, color: "#333333" }}>{post.title}</h3>
                    <p className="text-sm mb-4 line-clamp-3" style={{ color: "#6C757D", lineHeight: "1.6" }}>{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #DEE2E6" }}>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: "#005897" }}>
                          {post.author.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-semibold" style={{ color: "#333" }}>{post.author}</div>
                          <div className="text-xs flex items-center gap-1" style={{ color: "#9CA3AF" }}>
                            <Clock size={9} /> {post.readTime}
                          </div>
                        </div>
                      </div>
                      <Link to={`/blog/${post.slug}`} className="text-xs font-semibold flex items-center gap-0.5" style={{ color: "#005897" }}>
                        Read <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-14 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
            <h3 className="text-white mb-2" style={{ fontSize: "22px", fontWeight: 700 }}>Get Articles Delivered to Your Inbox</h3>
            <p className="mb-6" style={{ color: "#a8cce0" }}>Weekly guides on medical travel, cost comparisons, and patient stories. No spam.</p>
            <div className="flex max-w-md mx-auto gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-lg outline-none bg-white"
                style={{ padding: "10px 16px", fontSize: "14px" }}
              />
              <button className="px-5 py-2.5 rounded-lg text-white text-sm font-bold whitespace-nowrap" style={{ backgroundColor: "#DC3545" }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
