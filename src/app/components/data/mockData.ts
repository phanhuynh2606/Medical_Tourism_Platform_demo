export const SERVICES = [
  {
    id: "cardiology",
    slug: "cardiology",
    title: "Cardiology",
    icon: "Heart",
    shortDescription: "World-class cardiac care with minimally invasive procedures and advanced diagnostics.",
    overview: "Our cardiology network offers comprehensive heart care including bypass surgery, valve replacement, angioplasty, and advanced diagnostics. Partner hospitals maintain JCI accreditation with 95%+ success rates.",
    procedures: ["Bypass Surgery (CABG)", "Heart Valve Replacement", "Angioplasty & Stenting", "Pacemaker Implantation", "Electrophysiology Studies", "Echocardiography"],
    costRange: "$8,000 – $25,000",
    countries: ["Thailand", "India", "Turkey", "Malaysia"],
    color: "#e74c3c",
  },
  {
    id: "oncology",
    slug: "oncology",
    title: "Oncology",
    icon: "Activity",
    shortDescription: "Cutting-edge cancer treatment with multidisciplinary tumor boards and precision medicine.",
    overview: "Access world-class cancer treatment combining surgery, chemotherapy, radiation, immunotherapy, and targeted therapy with tumor boards from leading oncology centers.",
    procedures: ["Chemotherapy", "Radiation Therapy", "Immunotherapy", "Robotic Surgery", "Bone Marrow Transplant", "Targeted Therapy"],
    costRange: "$15,000 – $80,000",
    countries: ["India", "Thailand", "Turkey", "South Korea"],
    color: "#8e44ad",
  },
  {
    id: "orthopaedics",
    slug: "orthopaedics",
    title: "Orthopaedics",
    icon: "Bone",
    shortDescription: "Joint replacements, spine surgery, and sports medicine by leading orthopaedic surgeons.",
    overview: "From total hip and knee replacements to complex spinal fusions, our orthopaedic network offers superior outcomes at a fraction of Western costs.",
    procedures: ["Total Knee Replacement", "Total Hip Replacement", "Spinal Fusion", "Disc Replacement", "ACL Reconstruction", "Shoulder Surgery"],
    costRange: "$5,000 – $18,000",
    countries: ["India", "Thailand", "Turkey", "Malaysia"],
    color: "#2980b9",
  },
  {
    id: "dental",
    slug: "dental",
    title: "Dental & Cosmetic",
    icon: "Smile",
    shortDescription: "Full-mouth rehabilitation, dental implants, veneers, and cosmetic dentistry.",
    overview: "Transform your smile with premium dental care — implants, All-on-4, veneers, crowns, and orthodontics — at 60–80% savings over home country costs.",
    procedures: ["Dental Implants", "All-on-4 / All-on-6", "Porcelain Veneers", "Crowns & Bridges", "Invisalign", "Full-Mouth Rehabilitation"],
    costRange: "$800 – $15,000",
    countries: ["Thailand", "Turkey", "Mexico", "Hungary"],
    color: "#27ae60",
  },
  {
    id: "ivf",
    slug: "ivf",
    title: "IVF & Fertility",
    icon: "Baby",
    shortDescription: "Advanced fertility treatments with high success rates and compassionate care.",
    overview: "Our fertility network offers IVF, ICSI, egg freezing, and surrogacy services at top-tier clinics with English-speaking coordinators.",
    procedures: ["IVF / ICSI", "Egg Donation", "Embryo Freezing", "PGT Genetic Testing", "Surrogacy Coordination", "Fertility Assessment"],
    costRange: "$3,500 – $12,000",
    countries: ["Thailand", "Cyprus", "Czech Republic", "Georgia"],
    color: "#e67e22",
  },
  {
    id: "wellness",
    slug: "wellness",
    title: "Wellness & Checkup",
    icon: "Leaf",
    shortDescription: "Comprehensive health screenings, executive checkups, and wellness retreats.",
    overview: "Preventive health packages combining executive checkups, whole-body MRI scans, cancer screening, and wellness programs at world-class facilities.",
    procedures: ["Executive Health Checkup", "Full Body MRI Scan", "Cancer Screening Panel", "Cardiac Risk Assessment", "Wellness Retreat Programs", "Anti-Aging Treatments"],
    costRange: "$500 – $5,000",
    countries: ["Thailand", "Malaysia", "Japan", "South Korea"],
    color: "#16a085",
  },
];

export const DESTINATIONS = [
  {
    id: "thailand",
    slug: "thailand",
    country: "Thailand",
    city: "Bangkok",
    flag: "🇹🇭",
    tagline: "The Medical Tourism Capital of Asia",
    overview: "Thailand is the world's most popular medical tourism destination, known for JCI-accredited hospitals, internationally trained doctors, and exceptional patient care — all at 50–70% lower costs.",
    strengths: ["Cardiology", "Orthopaedics", "Dental", "Cosmetic Surgery", "Wellness"],
    hospitalCount: 47,
    patientCount: "180,000+",
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800",
  },
  {
    id: "india",
    slug: "india",
    country: "India",
    city: "Delhi / Mumbai / Chennai",
    flag: "🇮🇳",
    tagline: "World-Class Healthcare at Unbeatable Value",
    overview: "India's leading hospitals offer cutting-edge technology with Johns Hopkins and Harvard-trained surgeons. Exceptional for complex cardiac, neuro, and oncology cases.",
    strengths: ["Cardiology", "Oncology", "Neurology", "Orthopaedics", "IVF"],
    hospitalCount: 62,
    patientCount: "500,000+",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
  },
  {
    id: "turkey",
    slug: "turkey",
    country: "Turkey",
    city: "Istanbul / Ankara",
    flag: "🇹🇷",
    tagline: "European Standards, Eastern Costs",
    overview: "Istanbul bridges Europe and Asia, offering EU-standard medical care, Harvard-trained specialists, and leading hair transplant, dental, and aesthetic surgery centers.",
    strengths: ["Hair Transplant", "Dental", "Cardiology", "Eye Surgery", "Cosmetic Surgery"],
    hospitalCount: 38,
    patientCount: "750,000+",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800",
  },
  {
    id: "malaysia",
    slug: "malaysia",
    country: "Malaysia",
    city: "Kuala Lumpur / Penang",
    flag: "🇲🇾",
    tagline: "Trusted Healthcare in the Heart of Southeast Asia",
    overview: "Malaysia offers English-language healthcare with internationally accredited hospitals, making it ideal for patients from the Middle East, Australia, and Southeast Asia.",
    strengths: ["Cardiology", "Orthopaedics", "Health Checkup", "Dental", "Fertility"],
    hospitalCount: 28,
    patientCount: "90,000+",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800",
  },
];

export const HOSPITALS = [
  {
    id: "bumrungrad",
    name: "Bumrungrad International Hospital",
    country: "Thailand",
    city: "Bangkok",
    accreditations: ["JCI", "AACI"],
    specializations: ["Cardiology", "Oncology", "Orthopaedics"],
    beds: 580,
    established: 1980,
    description: "One of Asia's most internationally recognized hospitals, treating over 1.1 million patients from 190 countries annually.",
    rating: 4.9,
  },
  {
    id: "apollo",
    name: "Apollo Hospitals",
    country: "India",
    city: "Chennai / Delhi",
    accreditations: ["JCI", "NABH"],
    specializations: ["Cardiology", "Oncology", "Neurology", "Orthopaedics"],
    beds: 10000,
    established: 1983,
    description: "Asia's largest healthcare group with 70+ hospitals, pioneering advanced cardiac and oncology procedures with world-class outcomes.",
    rating: 4.8,
  },
  {
    id: "medipol",
    name: "Medipol Mega University Hospital",
    country: "Turkey",
    city: "Istanbul",
    accreditations: ["JCI", "TUV"],
    specializations: ["Cardiology", "Oncology", "Transplant", "Neurology"],
    beds: 470,
    established: 2014,
    description: "Turkey's largest private hospital complex with 470 beds and 24 specialist clinics, ranked among Europe's top medical centers.",
    rating: 4.7,
  },
  {
    id: "gleneagles",
    name: "Gleneagles Hospital",
    country: "Malaysia",
    city: "Kuala Lumpur",
    accreditations: ["JCI", "MSQH"],
    specializations: ["Cardiology", "Orthopaedics", "Oncology", "Neurology"],
    beds: 380,
    established: 1978,
    description: "A flagship Parkway Pantai hospital offering international-standard care in a state-of-the-art facility with multilingual staff.",
    rating: 4.8,
  },
  {
    id: "sikarin",
    name: "Sikarin Hospital",
    country: "Thailand",
    city: "Bangkok",
    accreditations: ["JCI"],
    specializations: ["Orthopaedics", "Spine Surgery", "Sports Medicine"],
    beds: 250,
    established: 1983,
    description: "Renowned orthopedic center with internationally trained surgeons specializing in joint replacement and spine surgery.",
    rating: 4.7,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "James Richardson",
    country: "United Kingdom",
    flag: "🇬🇧",
    treatment: "Cardiac Bypass Surgery",
    hospital: "Bumrungrad International, Bangkok",
    rating: 5,
    quote: "After being quoted £65,000 in the UK, I found a world-class cardiac team in Bangkok for a fraction of the cost. The care was exceptional — better than anything I'd experienced at home. I'm fully recovered and so grateful.",
    savings: "$48,000",
    date: "March 2026",
  },
  {
    id: 2,
    name: "Fatima Al-Rashidi",
    country: "Saudi Arabia",
    flag: "🇸🇦",
    treatment: "IVF Treatment",
    hospital: "Repromed International, Bangkok",
    rating: 5,
    quote: "After three failed IVF cycles in Riyadh, we were devastated. Our consultant here arranged everything — from the clinic to accommodation. We're now expecting twins. I cannot thank the team enough.",
    savings: "$12,000",
    date: "January 2026",
  },
  {
    id: 3,
    name: "Michael Torres",
    country: "United States",
    flag: "🇺🇸",
    treatment: "Total Knee Replacement",
    hospital: "Apollo Hospitals, Chennai",
    rating: 5,
    quote: "My surgeon at Apollo trained at NYU and the facility was as advanced as any in New York. I saved over $40,000, received VIP-level care, and was walking normally within 6 weeks.",
    savings: "$41,000",
    date: "February 2026",
  },
  {
    id: 4,
    name: "Anna Kowalski",
    country: "Poland",
    flag: "🇵🇱",
    treatment: "Full Mouth Dental Restoration",
    hospital: "Dental World Clinic, Istanbul",
    rating: 5,
    quote: "20 veneers and 4 implants that would have cost me €35,000 in Warsaw cost a quarter of that in Istanbul — with superior quality. My dentist back home couldn't believe the workmanship.",
    savings: "$22,000",
    date: "April 2026",
  },
];

export const FAQS = [
  {
    id: 1,
    category: "Getting Started",
    question: "How does the medical tourism consultation process work?",
    answer: "The process begins with a free consultation request through our secure inquiry form. Our medical coordinators review your case within 24 hours and connect you with suitable hospitals and specialists. We then provide a personalized treatment plan with cost estimates, before coordinating your travel and hospital arrangements.",
  },
  {
    id: 2,
    category: "Getting Started",
    question: "Is my medical information kept confidential?",
    answer: "Absolutely. We follow strict GDPR and HIPAA-aligned protocols. Your medical information is encrypted, stored securely, and only shared with healthcare providers who are directly involved in your care — with your explicit consent.",
  },
  {
    id: 3,
    category: "Costs & Savings",
    question: "How much can I realistically save?",
    answer: "Most patients save 40–80% compared to their home country costs, depending on treatment type and destination. For example, a cardiac bypass costing $150,000 in the US can be performed at equivalent quality for $12,000–$25,000 in Thailand or India.",
  },
  {
    id: 4,
    category: "Costs & Savings",
    question: "Are the cost estimates binding?",
    answer: "Initial estimates are indicative ranges based on your condition and preferred destination. Final quotes are provided directly by hospitals after reviewing your medical records. We always get you a detailed written cost breakdown before you commit.",
  },
  {
    id: 5,
    category: "Quality & Safety",
    question: "How do you ensure hospital quality and safety standards?",
    answer: "We only partner with hospitals that hold international accreditations such as JCI (Joint Commission International) or NABH. We conduct regular quality assessments and our medical advisory board reviews all partner facilities annually.",
  },
  {
    id: 6,
    category: "Quality & Safety",
    question: "What if something goes wrong during treatment?",
    answer: "Patient safety is paramount. All our partner hospitals have comprehensive clinical governance, malpractice insurance, and emergency protocols. We also help you obtain travel insurance with medical repatriation coverage before your trip.",
  },
  {
    id: 7,
    category: "Logistics & Travel",
    question: "Do you help with travel and accommodation arrangements?",
    answer: "Yes. Our patient coordinators can assist with airport transfers, accommodation near your hospital, visa invitation letters, and ground transportation. We work with preferred hotel partners offering special rates for medical tourists.",
  },
  {
    id: 8,
    category: "Logistics & Travel",
    question: "How long will I need to stay in the destination country?",
    answer: "Duration varies by treatment. Dental work typically requires 1–2 weeks, joint replacements 2–4 weeks, and complex cardiac surgery may require 4–6 weeks including recovery. We plan your itinerary to optimize both treatment and recovery timelines.",
  },
];

export interface Lead {
  id: string;
  referenceCode: string;
  fullName: string;
  email: string;
  phone: string;
  countryOfResidence: string;
  nationality: string;
  treatmentInterests: string[];
  status: string;
  priority: string;
  sourceChannel: string;
  createdAt: string;
  assignedTo: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  conditionDescription?: string | null;
  preferredDestinationCountry?: string | null;
  estimatedTravelDate?: string | null;
}

export const MOCK_LEADS: Lead[] = [
  { id: "1", referenceCode: "MTB-2026-0001", fullName: "James Richardson", email: "james.r@email.com", phone: "+44 7700 900123", countryOfResidence: "United Kingdom", nationality: "British", treatmentInterests: ["Cardiology"], status: "NEW", priority: "HIGH", sourceChannel: "Google", createdAt: "2026-05-25T08:23:00Z", assignedTo: "Sarah Chen" },
  { id: "2", referenceCode: "MTB-2026-0002", fullName: "Fatima Al-Rashidi", email: "fatima.ar@email.com", phone: "+966 50 123 4567", countryOfResidence: "Saudi Arabia", nationality: "Saudi", treatmentInterests: ["IVF & Fertility"], status: "CONTACTED", priority: "URGENT", sourceChannel: "WhatsApp", createdAt: "2026-05-24T14:15:00Z", assignedTo: "Dr. Ahmad Hassan" },
  { id: "3", referenceCode: "MTB-2026-0003", fullName: "Michael Torres", email: "m.torres@email.com", phone: "+1 555 234 5678", countryOfResidence: "United States", nationality: "American", treatmentInterests: ["Orthopaedics"], status: "QUALIFIED", priority: "NORMAL", sourceChannel: "Referral", createdAt: "2026-05-23T11:30:00Z", assignedTo: "Sarah Chen" },
  { id: "4", referenceCode: "MTB-2026-0004", fullName: "Anna Kowalski", email: "anna.k@email.com", phone: "+48 601 234 567", countryOfResidence: "Poland", nationality: "Polish", treatmentInterests: ["Dental & Cosmetic"], status: "WAITING_FOR_DOCUMENTS", priority: "NORMAL", sourceChannel: "Social Media", createdAt: "2026-05-22T09:45:00Z", assignedTo: null },
  { id: "5", referenceCode: "MTB-2026-0005", fullName: "Nguyen Van Minh", email: "minh.nv@email.com", phone: "+84 91 234 5678", countryOfResidence: "Vietnam", nationality: "Vietnamese", treatmentInterests: ["Oncology"], status: "MEDICAL_REVIEW", priority: "URGENT", sourceChannel: "Zalo", createdAt: "2026-05-21T16:00:00Z", assignedTo: "Dr. Ahmad Hassan" },
  { id: "6", referenceCode: "MTB-2026-0006", fullName: "Elena Sorokina", email: "e.sorokina@email.com", phone: "+7 916 123 4567", countryOfResidence: "Russia", nationality: "Russian", treatmentInterests: ["Cardiology", "Wellness & Checkup"], status: "QUOTE_SENT", priority: "HIGH", sourceChannel: "Direct", createdAt: "2026-05-20T12:20:00Z", assignedTo: "Sarah Chen" },
  { id: "7", referenceCode: "MTB-2026-0007", fullName: "David Okonkwo", email: "d.okonkwo@email.com", phone: "+234 802 345 6789", countryOfResidence: "Nigeria", nationality: "Nigerian", treatmentInterests: ["Orthopaedics"], status: "APPOINTMENT_PLANNED", priority: "HIGH", sourceChannel: "Google", createdAt: "2026-05-19T10:10:00Z", assignedTo: "Sarah Chen" },
  { id: "8", referenceCode: "MTB-2026-0008", fullName: "Chen Wei", email: "chen.w@email.com", phone: "+86 138 0013 8000", countryOfResidence: "China", nationality: "Chinese", treatmentInterests: ["Oncology"], status: "CONVERTED", priority: "URGENT", sourceChannel: "WeChat", createdAt: "2026-05-18T08:30:00Z", assignedTo: "Dr. Ahmad Hassan" },
  { id: "9", referenceCode: "MTB-2026-0009", fullName: "Lisa Thompson", email: "lisa.t@email.com", phone: "+61 412 345 678", countryOfResidence: "Australia", nationality: "Australian", treatmentInterests: ["IVF & Fertility"], status: "LOST", priority: "LOW", sourceChannel: "Google", createdAt: "2026-05-17T14:45:00Z", assignedTo: null },
  { id: "10", referenceCode: "MTB-2026-0010", fullName: "Mohammed Al-Farsi", email: "m.alfarsi@email.com", phone: "+971 50 234 5678", countryOfResidence: "UAE", nationality: "Emirati", treatmentInterests: ["Cardiology"], status: "NEW", priority: "URGENT", sourceChannel: "WhatsApp", createdAt: "2026-05-25T07:00:00Z", assignedTo: null },
];

export const MOCK_USERS = [
  { id: "1", name: "Sarah Chen", email: "sarah.chen@medbridge.com", role: "CRM_MANAGER", isActive: true, leadsAssigned: 12 },
  { id: "2", name: "Dr. Ahmad Hassan", email: "a.hassan@medbridge.com", role: "MEDICAL_CONSULTANT", isActive: true, leadsAssigned: 8 },
  { id: "3", name: "Maria Santos", email: "m.santos@medbridge.com", role: "SALES_CONSULTANT", isActive: true, leadsAssigned: 6 },
  { id: "4", name: "Tom Williams", email: "t.williams@medbridge.com", role: "SALES_CONSULTANT", isActive: false, leadsAssigned: 0 },
  { id: "5", name: "Admin User", email: "admin@medbridge.com", role: "SUPER_ADMIN", isActive: true, leadsAssigned: 0 },
];

export function getStoredLeads(): Lead[] {
  if (typeof window === "undefined") return MOCK_LEADS;
  const saved = localStorage.getItem("medbridge_leads");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse stored leads:", e);
    }
  }
  localStorage.setItem("medbridge_leads", JSON.stringify(MOCK_LEADS));
  return MOCK_LEADS;
}

export function saveLeads(leads: Lead[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("medbridge_leads", JSON.stringify(leads));
}

export const DASHBOARD_METRICS = {
  totalLeads: 247,
  newToday: 8,
  pendingReview: 14,
  converted: 31,
  leadsByStatus: [
    { status: "NEW", count: 42 },
    { status: "CONTACTED", count: 38 },
    { status: "QUALIFIED", count: 29 },
    { status: "WAITING_FOR_DOCUMENTS", count: 18 },
    { status: "MEDICAL_REVIEW", count: 14 },
    { status: "QUOTE_SENT", count: 22 },
    { status: "APPOINTMENT_PLANNED", count: 11 },
    { status: "CONVERTED", count: 31 },
    { status: "LOST", count: 28 },
    { status: "ARCHIVED", count: 14 },
  ],
  leadsBySource: [
    { source: "Google", count: 89 },
    { source: "WhatsApp", count: 54 },
    { source: "Referral", count: 41 },
    { source: "Social Media", count: 33 },
    { source: "Zalo", count: 18 },
    { source: "WeChat", count: 12 },
  ],
  recentLeads: MOCK_LEADS.slice(0, 5),
};

export const INTERACTION_LOGS = [
  { id: "1", type: "NOTE", content: "Patient called to confirm interest. Requesting cost estimate for knee replacement in Bangkok.", createdAt: "2026-05-25T10:30:00Z", user: "Sarah Chen" },
  { id: "2", type: "EMAIL", content: "Sent welcome email with initial cost estimate PDF. Bumrungrad quote: $8,500. Sikarin quote: $7,200.", createdAt: "2026-05-24T14:00:00Z", user: "Sarah Chen" },
  { id: "3", type: "STATUS_CHANGE", content: "Status changed: NEW → CONTACTED", createdAt: "2026-05-24T09:00:00Z", user: "System" },
  { id: "4", type: "WHATSAPP", content: "Patient replied via WhatsApp. Preferred dates: June 15–July 5. Requesting doctor profiles.", createdAt: "2026-05-23T16:45:00Z", user: "Sarah Chen" },
  { id: "5", type: "DOCUMENT_REQUEST", content: "Requested medical records: recent MRI, X-rays, and GP referral letter.", createdAt: "2026-05-22T11:20:00Z", user: "Dr. Ahmad Hassan" },
];
