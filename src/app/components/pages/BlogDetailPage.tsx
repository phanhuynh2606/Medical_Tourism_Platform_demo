import { useParams, Link } from "react-router";
import { ChevronRight, Clock, ArrowRight, User, Tag, Share2, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
   FULL ARTICLE CONTENT — each keyed by slug
   Each article is structured for SEO:
   - Long-form (800–1400 words per article)
   - Targets a specific long-tail keyword cluster
   - Has H2/H3 structure, bullet lists, a FAQ block, and a CTA
───────────────────────────────────────────────────────────────────────── */
const ARTICLES: Record<string, {
  title: string;
  metaDescription: string;
  keyword: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  content: React.ReactNode;
  relatedSlugs: string[];
}> = {

  /* ─── 1 ─── */
  "how-to-choose-hospital-abroad": {
    title: "How to Choose the Right Hospital Abroad: A Step-by-Step Guide",
    metaDescription: "Looking for the best hospital abroad? Use these 7 expert criteria — JCI accreditation, surgeon credentials, outcome data — to choose safely and confidently.",
    keyword: "how to choose hospital abroad",
    category: "Medical Tourism Tips",
    author: "Dr. Sarah Chen", authorRole: "Medical Director", date: "May 20, 2026", readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    relatedSlugs: ["bangkok-medical-tourism-guide", "medical-tourism-insurance-guide", "cardiac-bypass-cost-comparison"],
    content: (
      <div className="prose-content">
        <p className="lead">Choosing a hospital in your home country is already a big decision. Choosing one 8,000 miles away — for a cardiac bypass, knee replacement, or cancer treatment — can feel overwhelming. This guide gives you the exact 7-point framework our medical team uses before recommending any hospital to MedBridge patients.</p>

        <h2>1. JCI Accreditation — The Non-Negotiable First Filter</h2>
        <p>Joint Commission International (JCI) is the global gold standard for hospital accreditation. A JCI-accredited hospital has passed independent audits covering patient safety, infection control, surgical outcomes, staff qualifications, and facility standards. As of 2026, there are approximately 1,100 JCI-accredited hospitals worldwide — a small fraction of all hospitals globally.</p>
        <p><strong>Why it matters:</strong> JCI hospitals have statistically lower infection rates, fewer surgical complications, and better documentation practices than non-accredited peers. In countries like Thailand and India, JCI accreditation also signals that the hospital actively treats international patients and has systems (English-speaking staff, international patient coordinators, translated documents) to support you.</p>
        <div className="tip-box">
          <AlertCircle size={16} />
          <p><strong>Quick check:</strong> Search the hospital name at <strong>jointcommissioninternational.org</strong> to verify current accreditation status. Accreditation lapses — always verify, don't rely on the hospital's own website claims.</p>
        </div>

        <h2>2. Surgeon Credentials — Go Beyond the Brochure</h2>
        <p>A hospital's reputation is only as good as the surgeon performing your procedure. For complex cases (cardiac surgery, spinal fusion, oncology), ask specifically about:</p>
        <ul>
          <li><strong>Training institution:</strong> Where did they do their residency and fellowship? Look for recognized programs — AIIMS (India), Mahidol University (Thailand), or international fellowships at Johns Hopkins, Mayo Clinic, or Royal College institutions.</li>
          <li><strong>Board certification:</strong> Are they certified by their national surgical board and/or a European or US board?</li>
          <li><strong>Volume:</strong> How many of your specific procedure has this surgeon performed in the last 12 months? For joint replacements, 100+ annually is a good benchmark. For cardiac surgery, 150+.</li>
          <li><strong>Published outcomes:</strong> Top surgeons publish complication rates, revision rates, and patient satisfaction data. Ask if this data is available.</li>
        </ul>

        <h2>3. Procedure Volume — Numbers Don't Lie</h2>
        <p>Research consistently shows that hospitals performing higher volumes of a specific procedure have better outcomes. A hospital that performs 2,000 knee replacements per year will statistically outperform one doing 200, even with comparable equipment. When evaluating hospitals, ask the coordinator how many of your procedure the hospital performs annually.</p>

        <h2>4. International Patient Infrastructure</h2>
        <p>The best clinical outcome can be undermined by a poor patient experience if the hospital lacks proper international support. Look for:</p>
        <ul>
          <li>A dedicated <strong>International Patient Department</strong> with English-speaking case managers</li>
          <li>Pre-arrival remote consultation capability (video call with your surgeon before you fly)</li>
          <li>Translated consent forms and discharge instructions</li>
          <li>Assistance with medical visa letters and insurance pre-authorization letters</li>
          <li>Airport pickup and hotel liaison services</li>
        </ul>

        <h2>5. Post-Operative Care Protocols</h2>
        <p>Many patients focus entirely on the surgery and neglect to ask about recovery. For procedures like joint replacements, cardiac surgery, or spinal fusion, the post-operative care is as important as the operation itself. Ask:</p>
        <ul>
          <li>Does the hospital have an in-house <strong>physiotherapy team</strong> experienced with international patients?</li>
          <li>What is the protocol if complications arise after you've returned home? Do they offer remote follow-up consultations?</li>
          <li>Can they communicate directly with your home country doctor to hand over care?</li>
        </ul>

        <h2>6. Transparent, Itemized Pricing</h2>
        <p>Reputable hospitals provide written, itemized cost estimates — not rough verbal figures. A proper quote should break down: surgeon fee, anaesthetist fee, operating theatre, hospital room (per night), ICU (if applicable), implants/consumables, and nursing care. Be wary of hospitals that refuse to provide written estimates or quote a suspiciously low "all-inclusive" number without itemization.</p>

        <h2>7. Independent Patient Reviews</h2>
        <p>Look beyond the hospital's own testimonials page. Check Google Reviews, Trustpilot, and condition-specific patient forums (e.g., BoneSmart for orthopaedic patients, HysterSisters for gynae procedures). Pay particular attention to reviews from patients of your nationality — they'll flag issues around communication, visa support, and post-discharge coordination that local patients wouldn't notice.</p>

        <div className="summary-box">
          <h3>The 7-Point Checklist at a Glance</h3>
          {[
            "JCI or equivalent international accreditation (verify independently)",
            "Surgeon credentials: training institution + board certification + volume",
            "Hospital annual procedure volume (higher = better outcomes)",
            "Dedicated International Patient Department",
            "Clear post-operative and remote follow-up protocols",
            "Written, itemized cost estimate",
            "Independent patient reviews from your nationality",
          ].map((item, i) => (
            <div key={i} className="checklist-item">
              <CheckCircle size={14} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <h2>How MedBridge Pre-Screens Every Hospital</h2>
        <p>Every hospital in the MedBridge network has passed all 7 criteria above before being listed. Our medical advisory board conducts annual on-site audits, reviews outcome data, and mystery-patient quality checks. We also collect structured feedback from every MedBridge patient post-treatment. If a hospital's quality falls below our standard, it is removed from the network — regardless of commercial relationships.</p>
        <p>When you submit a case to MedBridge, our coordinators don't just send you a list of hospitals. They review your diagnosis, your surgical complexity, your home country, and your timeline — and then recommend the specific hospital and surgeon most likely to give you the best outcome for your case.</p>
      </div>
    ),
  },

  /* ─── 2 ─── */
  "bangkok-medical-tourism-guide": {
    title: "Bangkok: Asia's Medical Tourism Capital — A Complete 2026 Guide",
    metaDescription: "Planning medical treatment in Bangkok? Complete 2026 guide covering JCI hospitals, costs, where to stay, visa requirements, and how to plan your trip.",
    keyword: "medical tourism Bangkok 2026",
    category: "Destination Guides",
    author: "James Whitfield", authorRole: "Patient Coordinator", date: "May 15, 2026", readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1504542982118-59308b40fe0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    relatedSlugs: ["how-to-choose-hospital-abroad", "medical-tourism-insurance-guide", "knee-replacement-recovery-tips"],
    content: (
      <div className="prose-content">
        <p className="lead">Bangkok is the undisputed capital of medical tourism in Asia. With 47 JCI-accredited hospitals, internationally trained surgeons, and costs 60–75% below US and UK prices, it attracts over 1.1 million international patients annually. This guide covers everything you need to plan your medical trip to Bangkok in 2026.</p>

        <h2>Why Bangkok for Medical Treatment?</h2>
        <p>Bangkok's rise as a medical hub wasn't accidental. The Thai government actively invested in medical infrastructure from the 1980s, creating a competitive private hospital market that has driven both quality and cost efficiency. Today, hospitals like Bumrungrad International are among the world's most advanced facilities — not just "good for Asia," but genuinely world-class by any metric.</p>
        <ul>
          <li><strong>47 JCI-accredited hospitals</strong> — more than any city outside the USA</li>
          <li>Surgeons who trained at Harvard, Johns Hopkins, Royal College institutions</li>
          <li>Average wait time for elective procedures: <strong>3–7 days</strong> (vs. months in the UK or Canada)</li>
          <li>Costs 60–75% lower than USA; 40–60% lower than UK/Australia</li>
          <li>Strong English language capability in hospitals; less so outside</li>
        </ul>

        <h2>Top Hospitals in Bangkok for International Patients</h2>

        <h3>Bumrungrad International Hospital</h3>
        <p>Thailand's flagship international hospital treats 1.1 million patients from 190 countries annually. With 580 beds, 30+ specialist centers, and a dedicated International Patient Service that operates like a five-star hotel concierge, Bumrungrad is the gold standard for international medical care in Asia. Strengths: cardiology, oncology, orthopaedics, neurology, and executive health checkups.</p>

        <h3>Vejthani Hospital</h3>
        <p>Bangkok's leading orthopaedic and spine surgery hospital, consistently ranked among Thailand's top facilities for joint replacement and sports medicine. Smaller and more specialized than Bumrungrad, which means faster scheduling and more surgeon attention. Particularly recommended for knee replacement, hip replacement, and spinal procedures.</p>

        <h3>Samitivej Sukhumvit</h3>
        <p>A premium 270-bed hospital in the heart of Bangkok's expat district, known for excellent maternity, fertility, and paediatric services. International patient infrastructure is excellent. Good for IVF, women's health, and general surgery.</p>

        <h2>Cost Comparison: Bangkok vs. USA/UK</h2>
        <div className="cost-table">
          {[
            ["Cardiac Bypass Surgery", "$123,000", "$11,000–$18,000"],
            ["Total Knee Replacement", "$52,000", "$8,000–$12,000"],
            ["Total Hip Replacement", "$52,000", "$9,000–$13,000"],
            ["Dental Implant (per tooth)", "$4,500", "$800–$1,200"],
            ["IVF (single cycle)", "$15,000", "$4,500–$7,000"],
            ["Executive Health Checkup", "$3,500", "$500–$1,200"],
          ].map(([proc, us, bkk]) => (
            <div key={proc} className="cost-row">
              <span>{proc}</span>
              <span style={{ color: "#DC3545" }}>{us} (USA)</span>
              <span style={{ color: "#198754", fontWeight: 700 }}>{bkk}</span>
            </div>
          ))}
        </div>

        <h2>Visa Requirements for Medical Travel to Thailand (2026)</h2>
        <p>Thailand offers <strong>visa-on-arrival</strong> for citizens of 64 countries, including the USA, UK, EU nations, Australia, and Canada. The standard tourist visa-on-arrival allows a 30-day stay, which is sufficient for most elective procedures and initial recovery. For longer stays (post-operative recovery from cardiac or orthopaedic surgery), the hospital's International Patient Department can provide a Medical Certificate to support a Non-Immigrant Medical Visa application, allowing stays of up to 90 days.</p>

        <h2>Where to Stay During Treatment</h2>
        <p>Most international patients stay in hotels within walking distance or a short taxi ride of their treating hospital. Bangkok's hospital neighborhoods have a well-developed ecosystem of serviced apartments and "medical hotels" that cater specifically to recovering patients — ground-floor rooms, grab bars, easy-access bathrooms, and meal delivery.</p>
        <ul>
          <li><strong>Near Bumrungrad:</strong> Sukhumvit Soi 1–11 area. The Marriott Marquis, Grande Centre Point Sukhumvit, and Rembrandt Hotel are popular choices.</li>
          <li><strong>Near Vejthani:</strong> Ram Inthra area. Less central but quieter — good for recovery. The Chatrium Grand Bangkok is a short ride away.</li>
        </ul>

        <h2>Practical Tips for Your Bangkok Medical Trip</h2>
        <ul>
          <li><strong>Fly business class if possible</strong> for long-haul flights — deep vein thrombosis (DVT) risk increases post-surgery</li>
          <li><strong>Arrive 2–3 days early</strong> before major procedures to acclimatize and complete pre-op consultations</li>
          <li><strong>Plan recovery time:</strong> Knee/hip replacement patients typically need 10–14 days before they're fit to fly home</li>
          <li><strong>Bangkok's Suvarnabhumi Airport</strong> (BKK) is the main international hub — well-connected to Europe, Middle East, USA via connecting hubs</li>
          <li>Bring all medical records, imaging (MRI/CT scans on CD or USB), and a referral letter from your home doctor</li>
        </ul>
      </div>
    ),
  },

  /* ─── 3 ─── */
  "cardiac-bypass-cost-comparison": {
    title: "Cardiac Bypass Surgery Abroad: Cost Comparison & What to Know",
    metaDescription: "Cardiac bypass costs $80,000–$150,000 in the USA. The same procedure in India or Thailand costs $9,000–$18,000. Here's the full quality and cost breakdown.",
    keyword: "cardiac bypass surgery cost abroad",
    category: "Cost & Savings",
    author: "Dr. Ahmad Hassan", authorRole: "Senior Medical Advisor", date: "May 10, 2026", readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    relatedSlugs: ["how-to-choose-hospital-abroad", "bangkok-medical-tourism-guide", "medical-tourism-insurance-guide"],
    content: (
      <div className="prose-content">
        <p className="lead">A coronary artery bypass graft (CABG) costs between $80,000 and $150,000 in the United States — making it one of the most common reasons patients consider medical travel. In India, the same procedure with a Harvard-trained cardiac surgeon costs $9,000–$16,000. This article breaks down why, and what you need to know to do it safely.</p>

        <h2>Why Does Cardiac Bypass Cost So Much in the USA?</h2>
        <p>The high cost of cardiac bypass in the US is not primarily driven by surgeon skill or hospital quality — it reflects structural factors: hospital administrative overhead, malpractice insurance, device manufacturer pricing power, and fragmented insurance billing. Studies show that the actual clinical cost of delivering bypass surgery (surgeon time, operating theatre, implants, nursing) is not dramatically different between the US and major international centers. The difference is in the billing layers on top.</p>

        <h2>Cost Breakdown by Country (2026)</h2>
        <div className="cost-table">
          {[
            ["United States", "$80,000–$150,000", "—"],
            ["United Kingdom (private)", "£45,000–£70,000", "Save ~55%"],
            ["India", "$9,000–$16,000", "Save up to 88%"],
            ["Thailand", "$11,000–$18,000", "Save up to 86%"],
            ["Turkey", "$14,000–$22,000", "Save up to 82%"],
            ["Malaysia", "$12,000–$19,000", "Save up to 84%"],
          ].map(([country, cost, save]) => (
            <div key={country} className="cost-row">
              <span>{country}</span>
              <span>{cost}</span>
              <span style={{ color: "#198754", fontWeight: 700 }}>{save}</span>
            </div>
          ))}
        </div>

        <h2>Is the Quality Comparable?</h2>
        <p>This is the most important question. The short answer: <strong>yes, at JCI-accredited centers with high-volume cardiac programs</strong>. The longer answer requires unpacking what "quality" means in cardiac surgery:</p>
        <ul>
          <li><strong>Surgeon training:</strong> Many of India's leading cardiac surgeons trained at Cleveland Clinic, Texas Heart Institute, or Royal Brompton. Apollo Hospitals' cardiac team publishes mortality and complication data comparable to US Centers of Excellence.</li>
          <li><strong>Equipment:</strong> JCI hospitals use the same equipment manufacturers — Medtronic, Abbott, Edwards Lifesciences — as US hospitals. There is no "budget" cardiac equipment at these centers.</li>
          <li><strong>Volume:</strong> Apollo Chennai performs over 8,000 open-heart procedures annually. High volume is one of the strongest predictors of good outcomes in cardiac surgery.</li>
          <li><strong>ICU standards:</strong> Post-operative cardiac ICU care at Bumrungrad or Apollo meets international standards. Nurse-to-patient ratios are often better than US hospitals.</li>
        </ul>

        <h2>What's Included in the Quoted Price?</h2>
        <p>When comparing costs, always verify what is included. A reputable hospital's cardiac bypass quote should include:</p>
        <ul>
          <li>Surgeon, anaesthetist, and perfusionist fees</li>
          <li>Operating theatre and bypass pump</li>
          <li>5–7 nights hospital stay (standard room)</li>
          <li>ICU stay (typically 1–2 nights post-op)</li>
          <li>Standard consumables and grafts</li>
          <li>Pre-operative cardiac workup (ECG, echo, angiogram review)</li>
          <li>Post-op follow-up during hospital stay</li>
        </ul>
        <p><em>Not typically included:</em> Flights, accommodation, travel insurance, medication on discharge, post-discharge remote follow-up consultations.</p>

        <h2>Key Questions to Ask Before Booking</h2>
        {[
          "How many CABGs does this specific surgeon perform per year?",
          "What is the hospital's 30-day mortality rate for CABG? (Ask for data, not anecdotes)",
          "Is the cardiac ICU separate from the general ICU?",
          "Can I have a video consultation with my surgeon before traveling?",
          "What happens if I develop complications after returning home — is remote follow-up available?",
          "Does the hospital provide a direct handover to my home cardiologist?",
        ].map((q, i) => (
          <div key={i} className="checklist-item">
            <CheckCircle size={14} />
            <span>{q}</span>
          </div>
        ))}
      </div>
    ),
  },

  /* ─── 4 ─── */
  "ivf-abroad-what-to-know": {
    title: "IVF Abroad: Everything Couples Need to Know Before Booking",
    metaDescription: "IVF abroad costs 60–70% less than the USA or UK. This guide covers success rates, legal frameworks, embryo regulations, and how to choose a fertility clinic overseas.",
    keyword: "IVF abroad cost success rates",
    category: "Treatment Guides",
    author: "Dr. Sarah Chen", authorRole: "Medical Director", date: "May 5, 2026", readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1690306816872-91063f6de36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    relatedSlugs: ["how-to-choose-hospital-abroad", "bangkok-medical-tourism-guide", "medical-tourism-insurance-guide"],
    content: (
      <div className="prose-content">
        <p className="lead">A single IVF cycle in the United States costs $15,000–$25,000 on average — and most couples need 2–3 cycles. The financial burden leads thousands of couples every year to explore fertility treatment abroad, where the same clinical quality costs $3,500–$7,000 per cycle. This guide covers what you need to know to do it safely and successfully.</p>

        <h2>IVF Cost Comparison by Country (2026)</h2>
        <div className="cost-table">
          {[
            ["United States", "$15,000–$25,000 per cycle", "—"],
            ["United Kingdom (private)", "£5,000–£8,000 per cycle", "Save ~40%"],
            ["Thailand", "$4,500–$7,000 per cycle", "Save ~65%"],
            ["India", "$3,500–$5,500 per cycle", "Save ~72%"],
            ["Czech Republic", "$3,500–$5,000 per cycle", "Save ~72%"],
            ["Cyprus", "$4,000–$6,500 per cycle", "Save ~65%"],
          ].map(([country, cost, save]) => (
            <div key={country} className="cost-row">
              <span>{country}</span>
              <span>{cost}</span>
              <span style={{ color: "#198754", fontWeight: 700 }}>{save}</span>
            </div>
          ))}
        </div>

        <h2>Success Rates: What to Expect</h2>
        <p>IVF success rates are primarily driven by <strong>maternal age</strong> — not by which country you're in. A well-equipped fertility clinic in Bangkok or Prague will deliver comparable success rates to a US clinic, assuming equivalent patient demographics. Key benchmarks for fresh embryo transfers (own eggs):</p>
        <ul>
          <li>Under 35: 45–55% live birth rate per cycle</li>
          <li>35–37: 35–42% live birth rate per cycle</li>
          <li>38–40: 22–30% live birth rate per cycle</li>
          <li>Over 40 (own eggs): 8–15%; egg donation significantly improves this</li>
        </ul>
        <p>When evaluating clinics abroad, ask specifically for their <strong>live birth rate</strong> (not "clinical pregnancy rate" or "positive pregnancy test rate") for your age group, for your specific protocol (fresh or frozen, own eggs or donor).</p>

        <h2>Legal and Regulatory Differences</h2>
        <p>IVF regulations vary significantly between countries and directly affect what treatments are available to you:</p>
        <ul>
          <li><strong>Embryo freezing:</strong> Permitted in Thailand, India, Czech Republic, Cyprus. Time limits vary.</li>
          <li><strong>Preimplantation Genetic Testing (PGT):</strong> Available in Thailand, India, Czech Republic. Regulated but accessible.</li>
          <li><strong>Egg donation:</strong> Legal in Thailand, Czech Republic, Cyprus, Georgia. Anonymous donation is standard in most countries.</li>
          <li><strong>Surrogacy:</strong> Legal in Georgia and some US states; heavily restricted in Thailand (since 2015) and India (for foreigners since 2022).</li>
          <li><strong>Same-sex couples:</strong> Accessible at most clinics in Thailand and Czech Republic without legal barriers.</li>
        </ul>

        <div className="tip-box">
          <AlertCircle size={16} />
          <p><strong>Important:</strong> Check your home country's rules on importing embryos before freezing them abroad. Some countries have restrictions on the number of embryos you can import or requirements for the donor's health screening documentation.</p>
        </div>

        <h2>How to Evaluate a Fertility Clinic Abroad</h2>
        {[
          "Ask for live birth rate data for your age group (not just positive pregnancy rates)",
          "Verify the lab's equipment — modern vitrification (freezing) equipment is critical",
          "Ensure the clinic has an embryologist with international training or certification (ESHRE, ASRM)",
          "Ask about their egg donor screening protocol (genetic, infectious disease testing)",
          "Confirm English-language coordination is available throughout the process",
          "Check if the clinic can synchronize treatment with your cycle remotely before you travel",
        ].map((item, i) => (
          <div key={i} className="checklist-item">
            <CheckCircle size={14} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    ),
  },

  /* ─── 5 ─── */
  "istanbul-dental-tourism": {
    title: "Istanbul Dental Tourism 2026: Veneers, Implants & All-on-4 Guide",
    metaDescription: "Istanbul is Europe's top dental tourism destination. Full 2026 guide to costs, best clinics, what's included, and what to watch out for.",
    keyword: "dental tourism Istanbul 2026",
    category: "Destination Guides",
    author: "Aylin Kaya", authorRole: "Turkey Regional Coordinator", date: "April 28, 2026", readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    relatedSlugs: ["medical-tourism-insurance-guide", "how-to-choose-hospital-abroad", "bangkok-medical-tourism-guide"],
    content: (
      <div className="prose-content">
        <p className="lead">Turkey has become the world's leading dental tourism destination, attracting over 500,000 international patients in 2025 — primarily from Germany, the UK, Scandinavia, and the Netherlands. Istanbul's dental clinics offer EU-trained dentists, state-of-the-art equipment, and prices 60–80% below Western Europe. Here's everything you need to know.</p>

        <h2>Dental Treatment Costs: Istanbul vs. Europe/USA</h2>
        <div className="cost-table">
          {[
            ["Porcelain Veneer (per tooth)", "€800–€1,200 (EU)", "€120–€200"],
            ["Dental Implant (per tooth)", "€2,500–€4,000 (EU)", "€450–€750"],
            ["All-on-4 (full arch)", "€18,000–€28,000 (EU)", "€3,500–€6,500"],
            ["Zirconia Crown", "€800–€1,200 (EU)", "€120–€180"],
            ["Full Hollywood Smile (20 veneers)", "€20,000+ (EU)", "€3,000–€4,500"],
          ].map(([proc, eu, ist]) => (
            <div key={proc} className="cost-row">
              <span>{proc}</span>
              <span style={{ color: "#DC3545" }}>{eu}</span>
              <span style={{ color: "#198754", fontWeight: 700 }}>{ist} (Istanbul)</span>
            </div>
          ))}
        </div>

        <h2>Why Is Dental Treatment So Much Cheaper in Istanbul?</h2>
        <p>Lower labor costs, lower clinic overheads, and a favorable exchange rate (Turkish Lira vs. Euro/GBP) combine to make Istanbul dramatically cheaper. Crucially, the clinical materials — zirconia, porcelain, titanium implants — are the same international brands (Nobel Biocare, Straumann, Osstem) used in Western clinics. You're not getting cheaper materials; you're getting lower operational costs passed on to you.</p>

        <h2>What to Watch Out For</h2>
        <p>Istanbul's dental tourism boom has unfortunately attracted some clinics that cut corners. The most common problems reported by patients:</p>
        <ul>
          <li><strong>Over-treatment:</strong> Aggressive upselling — shaving down healthy teeth for veneers when whitening would suffice</li>
          <li><strong>Rushed timelines:</strong> Some clinics offer "20 veneers in 5 days" — this is possible but requires 12–14 hour days. Quality clinics allow 7–10 days for a full smile makeover</li>
          <li><strong>No follow-up protocol:</strong> If something goes wrong after you're home, some clinics are unresponsive</li>
          <li><strong>Unqualified staff:</strong> Turkey requires dentists to have a 5-year university degree, but technician work quality varies widely</li>
        </ul>

        <h2>How to Choose a Safe Dental Clinic in Istanbul</h2>
        {[
          "Verify the dentist's registration with the Turkish Dental Association (TDB)",
          "Look for clinics accredited by ISO 9001 or international dental associations",
          "Ask to see before/after photos of at least 10 similar cases",
          "Request a digital smile simulation before committing to veneers",
          "Get a written treatment plan with material brands specified (e.g., 'Nobel Biocare implants')",
          "Confirm what warranty is offered (implants: 5+ years; veneers: 2+ years)",
          "Read Google Reviews specifically for your procedure — focus on reviews from your country",
        ].map((item, i) => (
          <div key={i} className="checklist-item">
            <CheckCircle size={14} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    ),
  },

  /* ─── 6 ─── */
  "medical-tourism-insurance-guide": {
    title: "Travel Insurance for Medical Tourists: What's Covered and What's Not",
    metaDescription: "Standard travel insurance won't cover planned procedures abroad. Here's exactly what insurance you need as a medical tourist — medical repatriation, complication cover, and gap insurance.",
    keyword: "travel insurance medical tourism",
    category: "Medical Tourism Tips",
    author: "Lisa Thornton", authorRole: "Risk & Compliance Lead", date: "April 20, 2026", readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1454496406107-dc34337da8d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    relatedSlugs: ["how-to-choose-hospital-abroad", "cardiac-bypass-cost-comparison", "knee-replacement-recovery-tips"],
    content: (
      <div className="prose-content">
        <p className="lead">One of the most overlooked aspects of medical tourism planning is insurance. Most people assume their standard travel insurance "has them covered." It almost certainly does not — standard travel policies explicitly exclude planned medical procedures. Here's what you actually need.</p>

        <h2>What Standard Travel Insurance Does NOT Cover</h2>
        <ul>
          <li>Any procedure that was planned before departure ("pre-existing condition" and "elective treatment" exclusions)</li>
          <li>Complications arising from a planned procedure</li>
          <li>Extended hospital stays due to post-operative recovery</li>
          <li>Medical repatriation if you need to be flown home in a medical aircraft</li>
        </ul>
        <div className="tip-box">
          <AlertCircle size={16} />
          <p>Medical repatriation — flying home in a medically equipped aircraft with nursing staff — costs $50,000–$150,000. Standard travel insurance will not cover this if the reason you need it is a complication from a planned procedure.</p>
        </div>

        <h2>The 3 Insurance Products You Actually Need</h2>

        <h3>1. Medical Tourism–Specific Policy</h3>
        <p>Several insurers now offer policies specifically designed for medical tourists. These cover: pre-travel cancellation due to health change, hospital stay costs abroad (including your planned procedure), complications and extended stay, and limited medical repatriation. Providers include HTH Worldwide, Cigna Global, and specialist brokers like Medipac International.</p>

        <h3>2. Surgical Complication Insurance</h3>
        <p>Even if your hospital abroad is excellent, complications happen. This policy covers additional treatment costs if your procedure results in a complication requiring further surgery or extended care. Some hospitals include this as part of their quote — always ask.</p>

        <h3>3. Home-Country Follow-Up Coverage</h3>
        <p>Many procedures require follow-up care after you return. Confirm with your home country insurer or national health service that follow-up treatment for a procedure performed abroad will be covered. In the UK, the NHS generally provides emergency treatment but may decline non-emergency follow-up for planned overseas procedures.</p>

        <h2>Practical Checklist Before You Travel</h2>
        {[
          "Read your standard travel policy — find the exact 'elective treatment' exclusion clause",
          "Purchase a medical tourism-specific policy at least 14 days before departure",
          "Get a written hospital guarantee (in writing, not verbal) covering complications during your stay",
          "Confirm your home-country doctor will provide follow-up care on return",
          "Keep all medical records, translated into English if needed, for your home physician",
          "Register with your country's embassy in the destination country before surgery",
        ].map((item, i) => (
          <div key={i} className="checklist-item">
            <CheckCircle size={14} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    ),
  },

  /* ─── 7 ─── */
  "my-knee-replacement-in-india": {
    title: "\"I Saved $43,000 on My Knee Replacement\" — Michael's Story",
    metaDescription: "Michael Torres saved $43,000 on his total knee replacement at Apollo Hospitals in Chennai, India. One year on, here's his honest review of the experience.",
    keyword: "knee replacement India patient story",
    category: "Patient Stories",
    author: "Editorial Team", authorRole: "MedBridge", date: "April 12, 2026", readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    relatedSlugs: ["knee-replacement-recovery-tips", "how-to-choose-hospital-abroad", "cardiac-bypass-cost-comparison"],
    content: (
      <div className="prose-content">
        <p className="lead">Michael Torres, 58, from Phoenix, Arizona, had been living with severe osteoarthritis in his right knee for three years. His US orthopedic surgeon quoted $50,000 for a total knee replacement — $12,000 of which would come out of pocket after his insurance deductible. A friend mentioned medical tourism. One year later, Michael shares his full, unfiltered story.</p>

        <h2>"I Was Terrified, Honestly"</h2>
        <p>"When my wife first suggested India, I thought she was joking," Michael recalls. "I pictured a developing country with overcrowded hospitals. The reality was completely different. Apollo Chennai looks like a five-star hotel. The corridors were cleaner than any hospital I'd been in back home."</p>
        <p>Michael spent six weeks researching before committing. He cross-referenced his surgeon — Dr. Arun Parthasarathy — on Apollo's website, on LinkedIn, on PubMed (where he had published research on minimally invasive knee replacement), and through a patient forum for Americans who'd had surgery at Apollo. "I found three other Americans who'd used the same surgeon. I emailed all of them. They all said go."</p>

        <h2>The Numbers</h2>
        <div className="cost-table">
          {[
            ["US surgeon's quote", "$50,000", ""],
            ["Apollo Chennai (total knee replacement)", "$6,800", ""],
            ["Business class flights (return)", "$3,200", ""],
            ["14 nights accommodation (5-star hotel)", "$1,400", ""],
            ["Recovery physiotherapy in Chennai", "$320", ""],
            ["Travel insurance (medical tourism policy)", "$480", ""],
            ["Total cost abroad", "$12,200", ""],
            ["Net saving vs. USA", "", "$37,800"],
          ].map(([item, cost, save]) => (
            <div key={item} className="cost-row">
              <span>{item}</span>
              <span>{cost}</span>
              <span style={{ color: "#198754", fontWeight: 700 }}>{save}</span>
            </div>
          ))}
        </div>

        <h2>The Experience</h2>
        <p>"From the moment I landed, I felt taken care of. Apollo sent a car to the airport. My coordinator — her name was Priya — met me at the hospital, walked me through every step, translated everything, and was available by WhatsApp 24/7."</p>
        <p>The surgery took 90 minutes. Michael spent four nights in hospital before moving to a serviced apartment nearby for his first week of physiotherapy. "The physio team at Apollo were exceptional. I was walking with a frame by day two and without a stick by day nine."</p>
        <p>He flew home to Phoenix 16 days after surgery, in business class as advised. "My Phoenix orthopedist reviewed my discharge notes and was genuinely impressed by the documentation. He said it was better than most US hospital records he receives."</p>

        <h2>One Year On</h2>
        <p>"My knee is perfect. I'm walking 8 miles a day. I have zero regrets — other than not doing it sooner." Michael has since referred four friends to MedBridge for various procedures.</p>
        <p><em>Michael's identity is verified. His name and details are published with his full consent.</em></p>
      </div>
    ),
  },

  /* ─── 8 ─── */
  "knee-replacement-recovery-tips": {
    title: "7 Things to Do Before Flying Home After Joint Replacement Surgery",
    metaDescription: "Planning to fly home after knee or hip replacement abroad? These 7 pre-flight steps from our physiotherapy team reduce DVT risk and protect your recovery.",
    keyword: "flying after knee replacement surgery",
    category: "Treatment Guides",
    author: "Dr. Ahmad Hassan", authorRole: "Senior Medical Advisor", date: "April 5, 2026", readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1587351021821-f871837248c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
    relatedSlugs: ["my-knee-replacement-in-india", "medical-tourism-insurance-guide", "how-to-choose-hospital-abroad"],
    content: (
      <div className="prose-content">
        <p className="lead">Flying long-haul after joint replacement surgery carries real risks — primarily deep vein thrombosis (DVT) and wound complications. Our physiotherapy and medical advisory team has developed this pre-flight checklist based on treating 12,000+ orthopaedic patients annually across our partner network.</p>

        <div className="tip-box warning">
          <AlertCircle size={16} />
          <p><strong>General guideline:</strong> Most surgeons recommend waiting a minimum of 10–14 days after knee or hip replacement before long-haul flying (&gt;4 hours). Your surgeon's specific clearance overrides any general advice.</p>
        </div>

        <h2>1. Get Formal Surgical Clearance in Writing</h2>
        <p>Before booking your return flight, obtain a signed letter from your surgeon confirming you are fit to fly. This letter should include: date of surgery, procedure performed, current mobility status, anticoagulation medication you're taking, and any restrictions. Airlines may ask for this documentation, and your travel insurer will require it if you make any claim related to your surgery.</p>

        <h2>2. Complete Your Minimum Physiotherapy Milestones</h2>
        <p>Your physiotherapist should confirm you have achieved these before flying:</p>
        <ul>
          <li>Walking independently (with or without a stick) for at least 50 metres</li>
          <li>Able to climb and descend a step (required for aircraft cabin)</li>
          <li>Knee flexion of at least 90° (to sit comfortably in an aircraft seat)</li>
          <li>Wound dry and no signs of infection (redness, warmth, discharge)</li>
        </ul>

        <h2>3. Book Business or Premium Economy</h2>
        <p>This is non-negotiable for flights over 6 hours after joint replacement. The ability to fully extend your leg significantly reduces DVT risk. Economy class seats — particularly in the middle of long-haul aircraft — make it impossible to elevate or extend your leg properly. If business class is cost-prohibitive, book an exit-row seat or bulkhead row and confirm leg room dimensions with the airline before booking.</p>

        <h2>4. Confirm Your Anticoagulation Protocol</h2>
        <p>Most patients after knee or hip replacement are prescribed blood thinners (typically low-molecular-weight heparin or rivaroxaban) to prevent DVT. Confirm with your surgeon:</p>
        <ul>
          <li>Exactly which anticoagulant you are taking and the dose</li>
          <li>Whether you need an additional injection before or after the flight</li>
          <li>How long to continue anticoagulation after you return home</li>
          <li>That your home GP or specialist has received your anticoagulation discharge instructions</li>
        </ul>

        <h2>5. Wear Compression Stockings</h2>
        <p>Graduated compression stockings (class 2, 15–20 mmHg) should be worn during the entire flight and for 2–4 hours afterward. Your hospital will typically provide these on discharge — if not, purchase them at a pharmacy before flying. Ensure they fit correctly and are applied when you are lying down (before standing).</p>

        <h2>6. Move Every 30–45 Minutes During the Flight</h2>
        <p>Set an alarm. Every 30–45 minutes: stand, walk to the rear of the aircraft and back (with your stick if needed), and do ankle pumping exercises in your seat (flex and point your feet 20 times each). Inform the cabin crew about your recent surgery — most will happily accommodate additional standing time near the galley.</p>

        <h2>7. Arrange Home Care Before You Land</h2>
        <p>Do not arrive home without a plan. Arrange in advance:</p>
        <ul>
          <li>A first follow-up appointment with your home orthopaedic surgeon or GP within 5–7 days of returning</li>
          <li>Continued physiotherapy — ideally starting within 3 days of landing</li>
          <li>Home modifications if needed (grab rails, raised toilet seat, removal of trip hazards)</li>
          <li>Someone to collect you from the airport — do not use public transport on day of arrival</li>
        </ul>
      </div>
    ),
  },
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Medical Tourism Tips": { bg: "#EEF7FF", text: "#005897" },
  "Destination Guides":   { bg: "#F0FFF4", text: "#198754" },
  "Cost & Savings":       { bg: "#FFF3CD", text: "#856404" },
  "Treatment Guides":     { bg: "#FFF0F1", text: "#DC3545" },
  "Patient Stories":      { bg: "#F3F0FF", text: "#6F42C1" },
};

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? ARTICLES[slug] : null;

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#333" }}>Article not found</h2>
          <Link to="/blog" style={{ color: "#005897" }}>← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const catColor = CATEGORY_COLORS[article.category] || { bg: "#EEF7FF", text: "#005897" };
  const related = article.relatedSlugs.map((s) => ARTICLES[s]).filter(Boolean);

  return (
    <>
      <style>{`
        .prose-content { color: #2d3748; line-height: 1.85; font-size: 16px; }
        .prose-content p { margin-bottom: 1.25rem; }
        .prose-content .lead { font-size: 17px; color: #4a5568; font-style: italic; border-left: 3px solid #005897; padding-left: 1rem; margin-bottom: 2rem; }
        .prose-content h2 { font-size: 22px; font-weight: 800; color: #003d6b; margin: 2rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #EEF7FF; }
        .prose-content h3 { font-size: 17px; font-weight: 700; color: #005897; margin: 1.5rem 0 0.75rem; }
        .prose-content ul { margin: 0.75rem 0 1.25rem 0; padding: 0; list-style: none; }
        .prose-content ul li { padding: 0.3rem 0 0.3rem 1.5rem; position: relative; color: #4a5568; }
        .prose-content ul li::before { content: "→"; position: absolute; left: 0; color: #005897; font-weight: 700; }
        .prose-content strong { color: #1a202c; font-weight: 700; }
        .prose-content em { color: #718096; }
        .tip-box { display: flex; gap: 12px; padding: 1rem 1.25rem; border-radius: 12px; margin: 1.5rem 0; background: #FFFBEB; border: 1px solid #FDE68A; color: #92400E; align-items: flex-start; }
        .tip-box svg { color: #F59E0B; flex-shrink: 0; margin-top: 2px; }
        .tip-box p { margin: 0; font-size: 14px; }
        .summary-box { background: #F0F4F8; border: 1px solid #c5ddf0; border-radius: 16px; padding: 1.5rem; margin: 2rem 0; }
        .summary-box h3 { font-size: 16px; font-weight: 800; color: #003d6b; margin: 0 0 1rem; }
        .checklist-item { display: flex; gap: 10px; align-items: flex-start; padding: 0.4rem 0; color: #4a5568; font-size: 14px; }
        .checklist-item svg { color: #005897; flex-shrink: 0; margin-top: 2px; }
        .cost-table { border: 1px solid #E9ECEF; border-radius: 12px; overflow: hidden; margin: 1.5rem 0; }
        .cost-row { display: flex; justify-content: space-between; align-items: center; gap: 1rem; padding: 0.75rem 1rem; border-bottom: 1px solid #F3F4F6; font-size: 14px; flex-wrap: wrap; }
        .cost-row:last-child { border-bottom: none; }
        .cost-row:nth-child(even) { background: #F8FAFC; }
        .cost-row span:first-child { color: #333; font-weight: 500; flex: 1; min-width: 140px; }
      `}</style>

      <div style={{ backgroundColor: "#F0F4F8" }}>

        {/* ── HERO ── */}
        <div className="relative overflow-hidden" style={{ height: "380px" }}>
          <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,15,40,0.97) 0%, rgba(0,20,50,0.75) 55%, rgba(0,0,0,0.3) 100%)" }} />
          <div className="relative h-full flex flex-col justify-end max-w-4xl mx-auto px-4 pb-10">
            <nav className="flex items-center gap-2 text-xs mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight size={11} />
              <Link to="/blog" className="hover:text-white">Blog</Link>
              <ChevronRight size={11} />
              <span style={{ color: "#0DCAF0" }}>Article</span>
            </nav>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full mb-3 self-start"
              style={{ backgroundColor: catColor.bg, color: catColor.text }}>
              {article.category}
            </span>
            <h1 className="text-white leading-tight mb-4" style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800 }}>
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: "rgba(255,255,255,0.65)" }}>
              <div className="flex items-center gap-1.5">
                <User size={12} />
                <span className="font-semibold text-white">{article.author}</span>
                <span>· {article.authorRole}</span>
              </div>
              <div className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</div>
              <div>{article.date}</div>
              <div className="flex items-center gap-1"><Tag size={12} /> {article.keyword}</div>
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">

              {/* Article body */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-8 lg:p-10" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
                  {article.content}

                  {/* Share + CTA */}
                  <div className="mt-10 pt-8 flex flex-wrap items-center justify-between gap-4" style={{ borderTop: "2px solid #EEF7FF" }}>
                    <div className="flex items-center gap-2 text-sm" style={{ color: "#6C757D" }}>
                      <Share2 size={14} /> Share this article
                    </div>
                    <Link to="/contact"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                      style={{ backgroundColor: "#005897" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#003d6b"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#005897"; }}>
                      Get a Free Consultation <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">

                {/* Author card */}
                <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-lg"
                      style={{ backgroundColor: "#005897" }}>
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: "#003d6b" }}>{article.author}</div>
                      <div className="text-xs" style={{ color: "#6C757D" }}>{article.authorRole} · MedBridge</div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "#4F4F4F" }}>
                    Our team of medical advisors, coordinators, and specialists brings decades of experience in international healthcare and medical tourism.
                  </p>
                </div>

                {/* CTA box */}
                <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #003d6b 0%, #005897 100%)" }}>
                  <div className="font-black text-base mb-2">Ready to Get Started?</div>
                  <p className="text-xs mb-4" style={{ color: "#a8cce0" }}>
                    Get a free medical opinion from our team within 24 hours. No commitment required.
                  </p>
                  <Link to="/contact"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold bg-white"
                    style={{ color: "#005897" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#EEF7FF"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; }}>
                    Free Consultation <ArrowRight size={13} />
                  </Link>
                </div>

                {/* WhatsApp */}
                <a href="https://wa.me/84900000000" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-2xl text-white"
                  style={{ backgroundColor: "#198754", boxShadow: "0 4px 12px rgba(25,135,84,0.25)" }}>
                  <MessageCircle size={18} />
                  <div>
                    <div className="font-bold text-sm">Chat on WhatsApp</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>Ask us anything</div>
                  </div>
                </a>

                {/* Related articles */}
                {related.length > 0 && (
                  <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
                    <div className="font-bold text-sm mb-4" style={{ color: "#003d6b" }}>Related Articles</div>
                    <div className="space-y-3">
                      {related.map((rel) => (
                        <Link key={rel.title} to={`/blog/${article.relatedSlugs[related.indexOf(rel)]}`}
                          className="flex items-start gap-3 group">
                          <img src={rel.image} alt={rel.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                          <div>
                            <div className="text-xs font-semibold leading-snug group-hover:underline" style={{ color: "#333" }}>
                              {rel.title}
                            </div>
                            <div className="text-xs mt-1 flex items-center gap-1" style={{ color: "#9CA3AF" }}>
                              <Clock size={9} /> {rel.readTime}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
