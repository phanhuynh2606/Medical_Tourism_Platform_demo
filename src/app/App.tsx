import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { HelmetProvider } from "react-helmet-async";

// Public layout
import { PublicLayout } from "./components/public/PublicLayout";

// Public pages
import { HomePage } from "./components/pages/HomePage";
import { ServicesPage } from "./components/pages/ServicesPage";
import { ServiceDetailPage } from "./components/pages/ServiceDetailPage";
import { DestinationsPage } from "./components/pages/DestinationsPage";
import { DestinationDetailPage } from "./components/pages/DestinationDetailPage";
import { HospitalsPage } from "./components/pages/HospitalsPage";
import { PatientJourneyPage } from "./components/pages/PatientJourneyPage";
import { TestimonialsPage } from "./components/pages/TestimonialsPage";
import { FAQPage } from "./components/pages/FAQPage";
import { ContactPage } from "./components/pages/ContactPage";
import { PrivacyPage } from "./components/pages/PrivacyPage";
import { ThankYouPage } from "./components/pages/ThankYouPage";

// CRM
import { AdminLayout } from "./components/crm/AdminLayout";
import { LoginPage } from "./components/crm/LoginPage";
import { DashboardPage } from "./components/crm/DashboardPage";
import { LeadsListPage } from "./components/crm/LeadsListPage";
import { LeadDetailPage } from "./components/crm/LeadDetailPage";
import { KanbanPage } from "./components/crm/KanbanPage";
import { UsersPage } from "./components/crm/UsersPage";
import { SettingsPage } from "./components/crm/SettingsPage";
import { AnalyticsPage } from "./components/crm/AnalyticsPage";
import { CostEstimatorPage } from "./components/pages/CostEstimatorPage";
import { WellnessPage } from "./components/pages/WellnessPage";
import { BlogPage } from "./components/pages/BlogPage";
import { BlogDetailPage } from "./components/pages/BlogDetailPage";
import { VideosPage } from "./components/pages/VideosPage";
import { MedicalVisaPage } from "./components/pages/MedicalVisaPage";

export default function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
      <Routes>
        {/* ── PUBLIC WEBSITE ── */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/wellness" element={<WellnessPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="destinations/:slug" element={<DestinationDetailPage />} />
          <Route path="hospitals" element={<HospitalsPage />} />
          <Route path="patient-journey" element={<PatientJourneyPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPage />} />
          <Route path="cost-estimator" element={<CostEstimatorPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="medical-visa" element={<MedicalVisaPage />} />
          <Route path="thank-you/:referenceCode" element={<ThankYouPage />} />
        </Route>

        {/* ── CRM / ADMIN ── */}
        <Route path="admin/login" element={<LoginPage />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="leads" element={<LeadsListPage />} />
          <Route path="leads/kanban" element={<KanbanPage />} />
          <Route path="leads/:id" element={<LeadDetailPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </HelmetProvider>
  );
}
