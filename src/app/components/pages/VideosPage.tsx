import { useState } from "react";
import { Link } from "react-router";
import { Play, ChevronRight, Eye, Clock, X, Video } from "lucide-react";

const VIDEO_CATEGORIES = ["All", "Hospital Tours", "Patient Testimonials", "Treatment Explainers", "Destination Guides"];

const VIDEOS = [
  {
    id: 1,
    title: "Inside Bumrungrad International Hospital — Full Tour",
    description: "Join our coordinator on a full walkthrough of Bumrungrad's cardiac center, private suites, international patient lounge, and pharmacy.",
    category: "Hospital Tours",
    duration: "14:32",
    views: "128K",
    date: "May 2026",
    thumbnail: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    featured: true,
  },
  {
    id: 2,
    title: "James's Story: Cardiac Bypass in Bangkok — Before & After",
    description: "James, 64, from London, shares his entire experience from first inquiry to full recovery. Includes hospital footage and surgeon interview.",
    category: "Patient Testimonials",
    duration: "18:05",
    views: "94K",
    date: "April 2026",
    thumbnail: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 3,
    title: "What Is a Total Knee Replacement? A Surgeon Explains",
    description: "Dr. Prayuth from Apollo Hospitals walks through the entire procedure — from X-ray diagnosis to implant selection, surgical technique, and recovery milestones.",
    category: "Treatment Explainers",
    duration: "11:20",
    views: "76K",
    date: "April 2026",
    thumbnail: "https://images.unsplash.com/photo-1690306816872-91063f6de36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 4,
    title: "Bangkok vs. Istanbul vs. Delhi: Which Medical Hub Is Right for You?",
    description: "We compare the top 3 medical tourism hubs across 8 criteria: cost, quality, language, visa ease, recovery environment, and flight accessibility.",
    category: "Destination Guides",
    duration: "22:48",
    views: "211K",
    date: "March 2026",
    thumbnail: "https://images.unsplash.com/photo-1504542982118-59308b40fe0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 5,
    title: "Apollo Hospitals Chennai: Oncology Center Walkthrough",
    description: "A behind-the-scenes look at Apollo's world-renowned oncology center — linear accelerators, tumor board meetings, and infusion suites.",
    category: "Hospital Tours",
    duration: "16:14",
    views: "53K",
    date: "March 2026",
    thumbnail: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 6,
    title: "IVF Abroad Explained: Protocols, Egg Donation, and Legal Frameworks",
    description: "Reproductive endocrinologist Dr. Somjit explains IVF protocols used in Thailand, the differences from Western clinics, and what couples should ask before booking.",
    category: "Treatment Explainers",
    duration: "26:33",
    views: "88K",
    date: "February 2026",
    thumbnail: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 7,
    title: "Anna's Dental Journey: Veneers in Istanbul — Full Documentary",
    description: "Anna flew from Warsaw to Istanbul for 20 veneers. We followed her from airport pickup to final reveal — 5 days, €9,500, life-changing results.",
    category: "Patient Testimonials",
    duration: "31:07",
    views: "175K",
    date: "January 2026",
    thumbnail: "https://images.unsplash.com/photo-1587351021821-f871837248c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 8,
    title: "Kuala Lumpur Medical Tourism: Gleneagles Hospital & Beyond",
    description: "Malaysia's appeal for medical tourists from the Middle East and Australia — English-speaking staff, no language barrier, and competitive pricing.",
    category: "Destination Guides",
    duration: "19:55",
    views: "42K",
    date: "January 2026",
    thumbnail: "https://images.unsplash.com/photo-1626315869436-d6781ba69d6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Hospital Tours": "#005897",
  "Patient Testimonials": "#6F42C1",
  "Treatment Explainers": "#DC3545",
  "Destination Guides": "#198754",
};

function VideoModal({ video, onClose }: { video: typeof VIDEOS[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.85)" }} onClick={onClose}>
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden bg-black" onClick={(e) => e.stopPropagation()}>
        {/* Simulated video player */}
        <div className="relative" style={{ paddingTop: "56.25%" }}>
          <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(220,53,69,0.9)" }}>
              <Play size={32} className="text-white ml-1" />
            </div>
            <p className="text-white text-sm" style={{ opacity: 0.8 }}>Video preview — connect a real video source to enable playback</p>
          </div>
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
            <X size={18} />
          </button>
        </div>
        <div className="p-5 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block"
                style={{ backgroundColor: `${CATEGORY_COLORS[video.category]}18`, color: CATEGORY_COLORS[video.category] }}>
                {video.category}
              </span>
              <h3 className="mb-2" style={{ fontSize: "16px", fontWeight: 700, color: "#333" }}>{video.title}</h3>
              <p className="text-sm" style={{ color: "#6C757D", lineHeight: "1.6" }}>{video.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs" style={{ color: "#9CA3AF" }}>
            <span className="flex items-center gap-1"><Clock size={11} /> {video.duration}</span>
            <span className="flex items-center gap-1"><Eye size={11} /> {video.views} views</span>
            <span>{video.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVideo, setActiveVideo] = useState<typeof VIDEOS[0] | null>(null);

  const filtered = VIDEOS.filter((v) => activeCategory === "All" || v.category === activeCategory);
  const featured = VIDEOS.find((v) => v.featured);
  const rest = filtered.filter((v) => !v.featured || activeCategory !== "All");

  return (
    <div>
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}

      {/* Header */}
      <div className="py-14 px-4" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-xs mb-4" style={{ color: "#8bb5d4" }}>
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight size={12} />
            <Link to="/faq" className="hover:text-white">Knowledge</Link>
            <ChevronRight size={12} />
            <span style={{ color: "#0DCAF0" }}>Videos</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4" style={{ backgroundColor: "rgba(13,202,240,0.15)", color: "#0DCAF0", border: "1px solid rgba(13,202,240,0.3)" }}>
            <Video size={12} /> Video Library
          </div>
          <h1 className="text-white mb-3" style={{ fontSize: "36px", fontWeight: 700 }}>Watch & Learn</h1>
          <p style={{ color: "#a8cce0", fontSize: "17px" }}>
            Hospital tours, patient documentaries, surgeon explainers, and destination guides — all in one place.
          </p>
          <div className="flex items-center justify-center gap-4 mt-5 text-sm" style={{ color: "#a8cce0" }}>
            <span>{VIDEOS.length} videos</span>
            <span>·</span>
            <span>{VIDEOS.reduce((a, v) => a + parseInt(v.views), 0).toLocaleString()}+ total views</span>
            <span>·</span>
            <span>Updated weekly</span>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-[57px] z-30 bg-white border-b" style={{ borderColor: "#DEE2E6" }}>
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-3" style={{ minWidth: "max-content" }}>
            {VIDEO_CATEGORIES.map((cat) => (
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

          {/* Featured video */}
          {activeCategory === "All" && featured && (
            <div className="mb-10 rounded-2xl overflow-hidden bg-black group cursor-pointer relative"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}
              onClick={() => setActiveVideo(featured)}>
              <div className="relative" style={{ paddingTop: "42%" }}>
                <img src={featured.thumbnail} alt={featured.title} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,20,60,0.9) 0%, rgba(0,30,80,0.5) 60%, transparent 100%)" }} />

                {/* Featured badge */}
                <div className="absolute top-5 left-5">
                  <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ backgroundColor: "#DC3545" }}>▶ Featured Video</span>
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-end pr-16">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: "rgba(220,53,69,0.9)", boxShadow: "0 0 0 10px rgba(220,53,69,0.2)" }}>
                    <Play size={30} className="text-white ml-1.5" />
                  </div>
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-6 left-6 max-w-lg">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block"
                    style={{ backgroundColor: `${CATEGORY_COLORS[featured.category]}30`, color: "#0DCAF0", border: "1px solid rgba(13,202,240,0.4)" }}>
                    {featured.category}
                  </span>
                  <h2 className="text-white mb-2 leading-snug" style={{ fontSize: "22px", fontWeight: 700 }}>{featured.title}</h2>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "#a8cce0" }}>
                    <span className="flex items-center gap-1"><Clock size={11} /> {featured.duration}</span>
                    <span className="flex items-center gap-1"><Eye size={11} /> {featured.views} views</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {(activeCategory === "All" ? rest : filtered).map((video) => (
              <div key={video.id} className="bg-white rounded-xl overflow-hidden group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
                style={{ border: "1px solid #DEE2E6", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                onClick={() => setActiveVideo(video)}>
                {/* Thumbnail */}
                <div className="relative overflow-hidden" style={{ paddingTop: "56.25%" }}>
                  <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: "rgba(220,53,69,0.9)" }}>
                      <Play size={18} className="text-white ml-0.5" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs font-bold text-white"
                    style={{ backgroundColor: "rgba(0,0,0,0.75)" }}>
                    {video.duration}
                  </div>
                </div>

                <div className="p-4">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full mb-2 inline-block"
                    style={{ backgroundColor: `${CATEGORY_COLORS[video.category]}15`, color: CATEGORY_COLORS[video.category] }}>
                    {video.category}
                  </span>
                  <h3 className="mb-2 leading-snug" style={{ fontSize: "13px", fontWeight: 700, color: "#333333" }}>{video.title}</h3>
                  <div className="flex items-center gap-3 text-xs" style={{ color: "#9CA3AF" }}>
                    <span className="flex items-center gap-1"><Eye size={10} /> {video.views}</span>
                    <span>{video.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
            <h3 className="text-white mb-2" style={{ fontSize: "22px", fontWeight: 700 }}>Have a Question? Talk to Us Live</h3>
            <p className="mb-6" style={{ color: "#a8cce0" }}>Our patient coordinators are available via WhatsApp or video call in your language.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-bold text-white"
                style={{ backgroundColor: "#198754" }}>
                Chat on WhatsApp
              </a>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-bold text-white border border-white/30">
                Book a Free Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
