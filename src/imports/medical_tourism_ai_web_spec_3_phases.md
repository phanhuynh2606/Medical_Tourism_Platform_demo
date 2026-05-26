# AI Build Spec — Medical Tourism Website Platform

> **Vai trò tài liệu:** Đây là file Markdown dùng để đưa cho AI Coding Agent / Dev Team triển khai website Medical Tourism theo hướng chuyên nghiệp, có CRM nội bộ, CMS, lead management, đa ngôn ngữ, chat đa kênh và bảo mật dữ liệu bệnh nhân.

> **Mục tiêu:** Xây dựng nền tảng web dynamic, responsive, SEO tốt, có hệ thống CRM ở Phase 1 để thu lead và quản lý quy trình tư vấn bệnh nhân trước khi mở rộng sang CMS, nội dung, đa ngôn ngữ, tích hợp nâng cao và tối ưu vận hành.

---

## 1. Product Vision

Xây dựng một nền tảng website Medical Tourism giúp bệnh nhân quốc tế:

- Tìm hiểu dịch vụ y tế, chuyên khoa, bệnh viện đối tác và điểm đến điều trị.
- Gửi yêu cầu tư vấn bảo mật qua form nhiều bước.
- Liên hệ nhanh qua WhatsApp, Zalo, WeChat.
- Theo dõi hành trình tư vấn từ inquiry đến consultation, treatment planning và follow-up.

Đối với đội ngũ vận hành, hệ thống phải có CRM nội bộ để:

- Quản lý lead/patient inquiry.
- Phân công lead cho tư vấn viên hoặc medical consultant.
- Theo dõi trạng thái xử lý.
- Lưu lịch sử tương tác.
- Quản lý file y tế tải lên theo chuẩn bảo mật.
- Xuất dữ liệu cơ bản phục vụ báo cáo và chăm sóc khách hàng.

---

## 2. Recommended Tech Stack

### 2.1 Frontend

- **Framework:** Next.js 14+ App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui hoặc custom components theo design system
- **Forms:** React Hook Form + Zod validation
- **State / Data Fetching:** TanStack Query hoặc server actions tùy kiến trúc
- **Icons:** Lucide React
- **Charts:** Recharts cho dashboard analytics

### 2.2 Backend

Có thể chọn 1 trong 2 hướng:

**Option A — Fullstack Next.js**

- Next.js API Routes / Route Handlers
- Prisma ORM
- PostgreSQL
- Auth.js / NextAuth hoặc Clerk/Auth0 nếu cần nhanh

**Option B — Separate Backend**

- Node.js + NestJS hoặc Express.js
- PostgreSQL
- Prisma ORM
- JWT/session authentication
- REST API hoặc tRPC

### 2.3 Infrastructure

- **Database:** PostgreSQL
- **Cache:** Redis, dùng sau Phase 2 nếu cần
- **File Storage:** AWS S3 hoặc Cloudflare R2
- **CDN/WAF:** Cloudflare
- **Email:** Google Workspace, Zoho Mail Business hoặc Microsoft 365
- **Hosting:** Vercel cho frontend, Render/Fly.io/DigitalOcean/AWS cho backend nếu tách riêng
- **Monitoring:** Sentry + uptime monitor

---

## 3. Core Business Objects

### 3.1 Lead / Patient Inquiry

Đây là object trung tâm của Phase 1 CRM.

**Fields:**

- `id`
- `referenceCode`, ví dụ `MTB-2026-0001`
- `fullName`
- `email`
- `phone`
- `countryOfResidence`
- `nationality`
- `dateOfBirth`
- `gender`
- `treatmentInterests[]`
- `preferredDestinationCountry`
- `estimatedTravelDate`
- `conditionDescription`
- `preferredContactMethods[]`
- `sourceChannel`, ví dụ Google, Social, Referral, Direct, Zalo, WhatsApp
- `gdprConsentAccepted`
- `status`
- `priority`
- `assignedToUserId`
- `createdAt`
- `updatedAt`
- `lastContactedAt`

### 3.2 Lead Status

Dùng pipeline dạng CRM Kanban/List.

- `NEW`
- `CONTACTED`
- `QUALIFIED`
- `WAITING_FOR_DOCUMENTS`
- `MEDICAL_REVIEW`
- `QUOTE_SENT`
- `APPOINTMENT_PLANNED`
- `CONVERTED`
- `LOST`
- `ARCHIVED`

### 3.3 User / Admin

**Roles:**

- `SUPER_ADMIN`: toàn quyền
- `CRM_MANAGER`: quản lý toàn bộ lead và assignment
- `SALES_CONSULTANT`: xử lý lead được giao
- `MEDICAL_CONSULTANT`: xem hồ sơ y tế được phân quyền, thêm ghi chú chuyên môn
- `CONTENT_EDITOR`: dùng ở Phase 2 cho CMS

### 3.4 Interaction Log

Lưu lịch sử tương tác với bệnh nhân.

**Fields:**

- `id`
- `leadId`
- `userId`
- `type`: `CALL`, `EMAIL`, `WHATSAPP`, `ZALO`, `WECHAT`, `NOTE`, `STATUS_CHANGE`, `DOCUMENT_REQUEST`
- `content`
- `createdAt`

### 3.5 Medical Document

**Fields:**

- `id`
- `leadId`
- `fileName`
- `fileType`
- `fileSize`
- `storageKey`
- `encrypted`
- `uploadedAt`
- `uploadedBy`: `PATIENT` hoặc `ADMIN`

**Rules:**

- Chỉ chấp nhận PDF/JPG/PNG.
- Tối đa 5 file mỗi inquiry.
- Tối đa 10MB mỗi file.
- Không expose public URL trực tiếp.
- File phải truy cập bằng signed URL có thời hạn.

---

## 4. Three-Phase Delivery Plan

## Phase 1 — CRM, Lead Capture & Operational Foundation

### 4.1 Objective

Xây dựng phiên bản MVP tập trung vào CRM và lead pipeline. Phase này không cần CMS đầy đủ, không cần toàn bộ trang marketing nâng cao, nhưng phải có nền tảng vận hành để nhận inquiry, lưu trữ an toàn, phân công và xử lý lead.

### 4.2 Public Website Scope

#### Required Pages

1. **Home**
   - Hero section
   - Trust badges
   - Top treatment categories
   - CTA: “Get a Free Quote”
   - CTA: “Talk to a Consultant”
   - Chat launcher: WhatsApp, Zalo, WeChat

2. **Medical Services Landing**
   - Danh sách chuyên khoa: Cardiology, Oncology, Orthopaedics, Dental, IVF, Wellness, Checkup
   - Card layout theo design system
   - CTA ở mỗi card: “Request Consultation”

3. **Patient Journey**
   - Step-by-step: Inquiry → Consultation → Medical Review → Quote → Treatment Plan → Travel → Follow-up

4. **Contact / Inquiry Form**
   - Form nhiều bước 3 phần:
     - Step 1: Personal Details
     - Step 2: Medical Information
     - Step 3: Documents & Consent
   - Sau khi submit hiển thị success page với reference code.

5. **Privacy Policy / Consent Page**
   - Nội dung placeholder, dễ thay thế sau khi legal review.

### 4.3 Patient Inquiry Form Requirements

#### Step 1 — Personal Details

- Full name — required
- Email — required, email validation
- Phone / WhatsApp number — required, country code
- Country of residence — required, searchable dropdown
- Nationality — required
- Date of birth — required
- Gender — required

#### Step 2 — Medical Information

- Treatment / service interest — required, multi-select
- Preferred destination country — optional
- Estimated travel date — optional
- Description of condition — required, max 1000 characters

#### Step 3 — Documents & Consent

- Medical reports upload — optional, max 5 files, 10MB/file, PDF/JPG/PNG
- Preferred contact method — required, multi-select: Email, WhatsApp, Zalo, WeChat, Phone
- How did you hear about us — optional
- GDPR / Privacy consent — required
- Bot protection: Cloudflare Turnstile hoặc reCAPTCHA

### 4.4 CRM Dashboard Scope

#### CRM Pages

1. **Login**
   - Email/password
   - MFA-ready architecture
   - Forgot password flow optional trong MVP nếu dùng provider

2. **Dashboard Overview**
   - Total leads
   - New leads today
   - Leads by status
   - Leads by source channel
   - Pending medical review
   - Quick list of latest inquiries

3. **Lead List**
   - Search by name, email, phone, reference code
   - Filter by status, treatment, country, assigned user, date range
   - Sort by created date, priority, last contacted
   - Bulk assign optional

4. **Lead Detail**
   - Patient profile summary
   - Medical information
   - Uploaded documents
   - Status pipeline selector
   - Priority selector
   - Assign owner
   - Interaction timeline
   - Internal notes
   - Add follow-up note

5. **Kanban Pipeline**
   - Columns by lead status
   - Drag & drop status update
   - Card shows name, treatment, country, source, assigned user, age of lead

6. **Users & Roles**
   - Super Admin can create/edit/deactivate users
   - Assign roles
   - Basic access control

7. **Settings**
   - Business contact details
   - Chat channel links
   - Email notification recipients
   - Lead auto-assignment toggle placeholder

### 4.5 Notifications

When new inquiry is submitted:

- Send confirmation email to patient.
- Send internal notification email to admin/team.
- Store lead in database.
- Generate unique reference code.

### 4.6 Security Requirements for Phase 1

- HTTPS only.
- Input sanitization server-side.
- Zod validation frontend and backend.
- CSRF protection where applicable.
- Rate limit inquiry form: max 5 submissions/IP/hour.
- Admin routes protected by authentication.
- Role-based access control.
- Audit log for key actions:
  - login
  - lead view
  - lead update
  - document access
  - status change
- File upload validation by MIME type and extension.
- Store uploaded files in private bucket.
- Do not log sensitive medical descriptions in plain server logs.

### 4.7 Phase 1 Acceptance Criteria

- Public website responsive on mobile/tablet/desktop.
- Inquiry form submits successfully.
- Success page displays unique reference code.
- Patient receives confirmation email.
- Admin receives notification email.
- Lead appears in CRM.
- Admin can update lead status.
- Admin can assign lead to a team member.
- Admin can add internal notes.
- Uploaded medical documents are stored privately and viewable only by authorized users.
- CRM list supports search and filters.
- Chat launcher displays WhatsApp, Zalo, WeChat options.

---

## Phase 2 — CMS, Full Marketing Website, SEO & Multilingual Foundation

### 5.1 Objective

Mở rộng từ CRM MVP thành website content-driven đầy đủ. Cho phép team nội bộ quản lý nội dung, dịch vụ, bệnh viện, điểm đến, testimonials, FAQ và blog mà không cần developer.

### 5.2 Public Website Expansion

Add pages:

1. **About Us**
   - Mission
   - Team profiles
   - Accreditations
   - Partnerships

2. **Medical Services Detail Pages**
   - One page per treatment category
   - Overview
   - Benefits
   - Candidate profile
   - Common procedures
   - Partner hospitals
   - FAQ
   - CTA form block

3. **Destinations**
   - Country/city guides
   - Hospitals by destination
   - Travel notes
   - Visa/logistics placeholder content

4. **Partner Hospitals**
   - Hospital list
   - Hospital detail page
   - Specializations
   - Accreditation badges
   - Contact CTA

5. **Patient Testimonials**
   - Video/text reviews
   - Star rating
   - Verified patient tag

6. **FAQ**
   - Accordion layout
   - Category filters

7. **Blog / Health Articles**
   - Category pages
   - Article detail pages
   - SEO metadata
   - Related articles

### 5.3 CMS Scope

CMS should allow non-technical staff to manage:

- Pages
- Medical services
- Destination guides
- Hospital profiles
- Blog posts
- FAQ items
- Testimonials
- Team members
- Media assets
- Chat channel settings
- Basic SEO fields

### 5.4 CMS Content Models

#### Medical Service

- `title`
- `slug`
- `shortDescription`
- `icon`
- `heroImage`
- `overview`
- `procedures[]`
- `benefits[]`
- `faq[]`
- `seoTitle`
- `seoDescription`

#### Destination

- `country`
- `city`
- `slug`
- `flag`
- `overview`
- `hospitals[]`
- `travelInfo`
- `seoTitle`
- `seoDescription`

#### Hospital

- `name`
- `slug`
- `logo`
- `images[]`
- `country`
- `city`
- `specializations[]`
- `accreditations[]`
- `description`
- `contactCTA`

#### Blog Article

- `title`
- `slug`
- `excerpt`
- `coverImage`
- `content`
- `category`
- `tags[]`
- `author`
- `publishedAt`
- `seoTitle`
- `seoDescription`

### 5.5 Multilingual Foundation

Prepare architecture for:

- English
- Vietnamese
- Simplified Chinese
- Arabic
- Russian

Requirements:

- URL structure: `/en`, `/vi`, `/zh`, `/ar`, `/ru`
- Hreflang tags
- Language switcher in header
- CMS translation fields or separate localized entries
- RTL-ready layout for Arabic, even if Arabic content is added later

### 5.6 SEO Requirements

- Unique title/meta description per page.
- XML sitemap.
- Robots.txt.
- Canonical URLs.
- Schema markup:
  - `MedicalClinic`
  - `FAQPage`
  - `Article`
  - `Organization`
- Image alt text fields required in CMS.
- WebP image optimization.
- Lazy loading below-fold images.

### 5.7 Phase 2 Acceptance Criteria

- Admin/content editor can create and publish a blog article.
- Admin/content editor can update a medical service page.
- Service, destination, hospital and blog pages are generated dynamically from CMS/database.
- Language switcher exists and routing supports localized paths.
- SEO metadata renders correctly.
- Sitemap and robots.txt are generated.
- FAQ schema renders on FAQ pages.
- CMS media upload works.

---

## Phase 3 — Advanced Integrations, Automation, Cost Estimator & Growth Optimization

### 6.1 Objective

Biến platform thành hệ thống acquisition + operations hoàn chỉnh với tích hợp messaging/API nâng cao, cost estimator, analytics, automation và security hardening.

### 6.2 Messaging Integrations

#### Unified Chat Launcher

- Floating bottom-right button on all pages.
- Expands to show WhatsApp, Zalo, WeChat.
- CMS can toggle channels on/off.
- CMS can update contact details/links/QR codes.
- Browser language or geolocation can highlight recommended channel.

#### WhatsApp

- Click-to-chat MVP.
- Future: WhatsApp Business API via BSP such as Twilio, Vonage or 360dialog.
- Pre-filled inquiry message.
- Track click events via analytics.

#### Zalo

- Zalo Official Account link/widget.
- Vietnamese labels.
- Follow OA/share button if applicable.

#### WeChat

- QR code widget as reliable fallback.
- Service Account integration if business verification supports it.

### 6.3 Cost Estimator

Interactive tool for treatment cost comparison.

#### Inputs

- Treatment category
- Destination country
- Preferred hospital tier
- Travel date
- Number of companions

#### Outputs

- Estimated medical cost range
- Travel/logistics note
- CTA to request official quote
- Disclaimer: estimate only, not medical/financial advice

#### Admin Management

- Manage base price ranges by treatment/destination.
- Manage currency display.
- Toggle estimator visibility.

### 6.4 CRM Automation

Add:

- Lead scoring
- SLA reminders
- Auto-tagging by treatment/country/source
- Follow-up task creation
- Email templates
- Status automation, for example:
  - New inquiry → assign to CRM manager
  - Waiting for documents > 3 days → reminder task
  - Quote sent > 7 days → follow-up reminder

### 6.5 Analytics Dashboard

Track:

- Page views
- Form conversion rate
- CTA click rate
- Chat click rate by channel
- Leads by source
- Leads by country
- Leads by treatment
- Conversion by status

### 6.6 Security Hardening

- MFA mandatory for all admin users.
- HSTS.
- Security headers:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
- WAF rules via Cloudflare.
- OWASP Top 10 scan.
- Encrypted backups.
- Data retention workflow.
- GDPR right-to-erasure workflow.

### 6.7 Phase 3 Acceptance Criteria

- Cost estimator works and creates quote CTA conversion path.
- Chat clicks are tracked by channel.
- CRM automation creates follow-up tasks.
- Analytics dashboard shows core conversion metrics.
- MFA is enabled for admins.
- Security headers are active.
- Backup and retention policy are documented.
- Performance meets target: PageSpeed mobile >= 80, desktop >= 90.

---

## 7. UX/UI Design System

Use a clean medical tourism design inspired by Vaidam Health: trustworthy, calm, accessible and conversion-focused.

### 7.1 Colors

```css
:root {
  --primary-teal: #005897;
  --primary-blue: #0D6EFD;
  --cta-red: #DC3545;
  --cta-red-hover: #BB2D3B;
  --success-green: #198754;
  --cyan-accent: #0DCAF0;
  --text-dark: #333333;
  --text-secondary: #4F4F4F;
  --text-muted: #6C757D;
  --surface-white: #FFFFFF;
  --surface-light: #F8F9FA;
  --border-gray: #DEE2E6;
  --input-border: #CCCCCC;
  --warning-amber: #FFC107;
}
```

### 7.2 Typography

Use:

```css
font-family: "MyriadPro-Regular", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
```

Fallback is required because Myriad Pro may not be available on all systems.

Scale:

| Role | Size | Weight | Line height |
| --- | ---: | ---: | ---: |
| H1 | 32px | 500 | 39px |
| H2 | 26px | 500 | 31px |
| H3 | 16px | 500 | 19px |
| H4 | 20px | 500 | 23px |
| Body | 19px | 400 | 29px |
| Link | 15px | 400 | 23px |
| Input | 14px | 400 | 21px |
| Caption | 13px | 400 | 19px |
| Button | 14px | 400/700 | 21px |

### 7.3 Buttons

#### Primary CTA

- Background: `#DC3545`
- Text: white
- Height: `42px`
- Border radius: `6px`
- Padding: `0 12px`
- Hover: `#BB2D3B`
- Use only for high-intent actions:
  - Get a Free Quote
  - Submit Inquiry
  - Request Consultation

#### Trust / Secondary Action

- Background: `#005897` or outline teal
- Text: white or teal
- Use for secondary navigation or trust actions.

#### Chat Button

- Background: `#198754`
- Text: white
- Use for WhatsApp/chat entry points only.

### 7.4 Cards

#### Service Card

- Background: white
- Border: `1px solid #DEE2E6`
- Border radius: `8px`
- Padding: `20px`
- Shadow: `0px 2px 8px rgba(0,0,0,0.06)`
- Hover shadow: `0px 4px 16px rgba(0,0,0,0.12)`
- Hover transform: `translateY(-2px)`
- Icon color: teal
- Plus badge: red circle top-right

### 7.5 Forms

#### Standard Input

- Height: `35px`
- Border: `1px solid #CCCCCC`
- Border radius: `8px`
- Padding: `6px 12px 6px 18px`
- Focus: border `#0D6EFD`, box-shadow `0 0 0 2px rgba(13,110,253,0.1)`

#### Form Container

- Background: white
- Border radius: `12px`
- Padding: `32px`
- Shadow: `0px 8px 32px rgba(0,0,0,0.12)`
- Field gap: `16px`

### 7.6 Navigation

- Background: `#005897`
- Height: `57px`
- Text: white
- Active state: `#0DCAF0` with bottom border `3px solid #0DCAF0`
- Mobile: hamburger menu under 640px

### 7.7 Responsive Breakpoints

| Breakpoint | Width | Layout |
| --- | --- | --- |
| Mobile | 320–639px | 1 column, hamburger nav, stacked forms |
| Tablet | 640–1023px | 2 columns, collapsible nav |
| Desktop | 1024–1439px | 3 columns, full nav |
| Large Desktop | 1440px+ | 4 columns where useful |

### 7.8 Accessibility

- WCAG 2.1 AA target.
- Minimum interactive target: 44px x 44px.
- Keyboard navigable menus, forms, modals.
- Visible focus states.
- ARIA labels for icons and chat launcher.
- Alt text required for all meaningful images.
- Color contrast >= 4.5:1 for text.

---

## 8. Information Architecture

### 8.1 Public Routes

```txt
/
/about
/services
/services/[slug]
/destinations
/destinations/[slug]
/hospitals
/hospitals/[slug]
/patient-journey
/testimonials
/cost-estimator
/blog
/blog/[slug]
/faq
/contact
/privacy-policy
/thank-you/[referenceCode]
```

### 8.2 Admin / CRM Routes

```txt
/admin/login
/admin
/admin/leads
/admin/leads/kanban
/admin/leads/[id]
/admin/users
/admin/settings
/admin/cms/pages
/admin/cms/services
/admin/cms/destinations
/admin/cms/hospitals
/admin/cms/blog
/admin/cms/faqs
/admin/analytics
```

---

## 9. Suggested Database Schema

Use this as starting point. Adapt naming to ORM conventions.

```prisma
model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String?
  role         UserRole
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  assignedLeads Lead[]
  notes         InteractionLog[]
}

enum UserRole {
  SUPER_ADMIN
  CRM_MANAGER
  SALES_CONSULTANT
  MEDICAL_CONSULTANT
  CONTENT_EDITOR
}

model Lead {
  id                          String      @id @default(cuid())
  referenceCode               String      @unique
  fullName                    String
  email                       String
  phone                       String
  countryOfResidence          String
  nationality                 String
  dateOfBirth                 DateTime
  gender                      String
  treatmentInterests          String[]
  preferredDestinationCountry String?
  estimatedTravelDate         DateTime?
  conditionDescription        String
  preferredContactMethods     String[]
  sourceChannel               String?
  gdprConsentAccepted         Boolean
  status                      LeadStatus  @default(NEW)
  priority                    LeadPriority @default(NORMAL)
  assignedToUserId            String?
  assignedTo                  User?       @relation(fields: [assignedToUserId], references: [id])
  createdAt                   DateTime    @default(now())
  updatedAt                   DateTime    @updatedAt
  lastContactedAt             DateTime?

  documents                   MedicalDocument[]
  interactions                InteractionLog[]
}

enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  WAITING_FOR_DOCUMENTS
  MEDICAL_REVIEW
  QUOTE_SENT
  APPOINTMENT_PLANNED
  CONVERTED
  LOST
  ARCHIVED
}

enum LeadPriority {
  LOW
  NORMAL
  HIGH
  URGENT
}

model MedicalDocument {
  id          String   @id @default(cuid())
  leadId      String
  lead        Lead     @relation(fields: [leadId], references: [id])
  fileName    String
  fileType    String
  fileSize    Int
  storageKey  String
  encrypted   Boolean  @default(true)
  uploadedBy  String
  uploadedAt  DateTime @default(now())
}

model InteractionLog {
  id        String          @id @default(cuid())
  leadId    String
  lead      Lead            @relation(fields: [leadId], references: [id])
  userId    String?
  user      User?           @relation(fields: [userId], references: [id])
  type      InteractionType
  content   String
  createdAt DateTime        @default(now())
}

enum InteractionType {
  CALL
  EMAIL
  WHATSAPP
  ZALO
  WECHAT
  NOTE
  STATUS_CHANGE
  DOCUMENT_REQUEST
}
```

---

## 10. API Requirements

### 10.1 Public APIs

```txt
POST /api/inquiries
POST /api/upload-medical-document
GET  /api/public/services
GET  /api/public/destinations
GET  /api/public/hospitals
GET  /api/public/blog
```

### 10.2 CRM APIs

```txt
GET    /api/admin/leads
GET    /api/admin/leads/:id
PATCH  /api/admin/leads/:id
POST   /api/admin/leads/:id/notes
POST   /api/admin/leads/:id/assign
POST   /api/admin/leads/:id/status
GET    /api/admin/leads/:id/documents/:documentId/signed-url
GET    /api/admin/dashboard/metrics
GET    /api/admin/users
POST   /api/admin/users
PATCH  /api/admin/users/:id
```

### 10.3 Validation

All public and admin input must use shared schema validation.

Example Zod schema:

```ts
const inquirySchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(30),
  countryOfResidence: z.string().min(2),
  nationality: z.string().min(2),
  dateOfBirth: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Prefer not to say"]),
  treatmentInterests: z.array(z.string()).min(1),
  preferredDestinationCountry: z.string().optional(),
  estimatedTravelDate: z.coerce.date().optional(),
  conditionDescription: z.string().min(10).max(1000),
  preferredContactMethods: z.array(z.string()).min(1),
  sourceChannel: z.string().optional(),
  gdprConsentAccepted: z.literal(true),
});
```

---

## 11. Component Checklist for AI Agent

Build reusable components:

### Public Components

- `Header`
- `MobileDrawer`
- `Footer`
- `HeroSection`
- `TrustBadges`
- `ServiceCard`
- `DestinationCard`
- `HospitalCard`
- `TestimonialCard`
- `FAQAccordion`
- `MultiStepInquiryForm`
- `FileUploadField`
- `ConsentCheckbox`
- `UnifiedChatLauncher`
- `CTASection`
- `SEOHead`

### CRM Components

- `AdminLayout`
- `SidebarNav`
- `DashboardMetricCard`
- `LeadStatusBadge`
- `LeadPriorityBadge`
- `LeadTable`
- `LeadFilters`
- `LeadKanbanBoard`
- `LeadKanbanCard`
- `LeadProfilePanel`
- `MedicalInfoPanel`
- `DocumentList`
- `InteractionTimeline`
- `InternalNoteForm`
- `UserRoleBadge`

---

## 12. Non-Functional Requirements

### Performance

- Mobile PageSpeed >= 80.
- Desktop PageSpeed >= 90.
- LCP < 2.5s.
- CLS < 0.1.
- TTFB < 600ms globally where possible with CDN.

### Browser Support

- Chrome latest
- Safari latest
- Firefox latest
- Edge latest
- iOS Safari
- Android Chrome

### Privacy & Compliance

- Explicit consent before collecting personal or medical data.
- Cookie consent for analytics/marketing cookies.
- Ability to export/delete patient inquiry on request in later phase.
- Do not send PHI to analytics tools.
- Do not include medical condition text in email subject lines.

---

## 13. AI Coding Agent Instructions

When implementing this project:

1. Build Phase 1 first. Do not start CMS or cost estimator before CRM MVP works.
2. Use TypeScript strictly.
3. Use server-side validation for all form submissions.
4. Keep public website and CRM admin layouts separate.
5. Use reusable components and avoid duplicated UI code.
6. Follow the design system exactly: teal for trust, red for primary CTA, green for chat/success.
7. All admin pages must be protected.
8. Never expose private medical document URLs publicly.
9. Add loading, empty, error and success states for every major UI flow.
10. Add seed data for development:
    - 5 users
    - 20 sample leads
    - 6 medical services
    - 4 destinations
    - 5 hospitals
11. Write clean README instructions for local setup.
12. Include `.env.example` with required environment variables.

---

## 14. Phase 1 Implementation Order

Recommended build sequence:

1. Project setup: Next.js, TypeScript, Tailwind, shadcn/ui.
2. Design tokens and base layout.
3. Database schema and Prisma migrations.
4. Authentication and admin route protection.
5. Public home/contact/inquiry pages.
6. Multi-step inquiry form.
7. File upload to private storage.
8. Lead creation API.
9. Email confirmation/internal notification.
10. CRM lead list.
11. CRM lead detail.
12. Lead status update and assignment.
13. Interaction notes/timeline.
14. Dashboard metrics.
15. Chat launcher.
16. QA, responsive polish, security checks.

---

## 15. Definition of Done

A feature is done only when:

- UI matches design system.
- Works on mobile and desktop.
- Form validation exists on client and server.
- Loading, error and empty states are implemented.
- Role permissions are respected.
- Sensitive data is protected.
- Basic tests or manual QA checklist exists.
- No console errors.
- No TypeScript errors.
- Acceptance criteria are met.

---

## 16. Environment Variables

```bash
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=
ADMIN_NOTIFICATION_EMAIL=
CLOUDFLARE_TURNSTILE_SITE_KEY=
CLOUDFLARE_TURNSTILE_SECRET_KEY=
S3_ENDPOINT=
S3_REGION=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
WHATSAPP_LINK=
ZALO_LINK=
WECHAT_QR_IMAGE_URL=
```

---

## 17. Final Product Principle

The website must feel like a trusted international healthcare concierge platform, not a generic landing page. Every screen should reduce patient anxiety, increase confidence and move qualified visitors toward a secure consultation request.
