import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import App from './App';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Feedback from './pages/admin/Feedback';
import Comments from './pages/admin/Comments';
import AdminLayout from './pages/admin/AdminLayout';
import HeroManagement from './pages/admin/HeroManagement';
import AboutManagement from './pages/admin/AboutManagement';
import ServicesManagement from './pages/admin/ServicesManagement';
import HowItWorksManagement from './pages/admin/HowItWorksManagement';
import TestimonialsManagement from './pages/admin/TestimonialsManagement';
import CaseStudyDetail from './pages/CaseStudyDetail';
import AllCaseStudies from './pages/AllCaseStudies';
import Layout from './components/Layout';
import StoriesManagement from './pages/admin/StoriesManagement';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
  }, [pathname]);
  return null;
}

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/case-studies" element={<Layout><AllCaseStudies /></Layout>} />
        <Route path="/case-study/:id" element={<Layout><CaseStudyDetail /></Layout>} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="comments" element={<Comments />} />
          <Route path="stories" element={<StoriesManagement />} />
          <Route path="hero" element={<HeroManagement />} />
          <Route path="about" element={<AboutManagement />} />
          <Route path="services" element={<ServicesManagement />} />
          <Route path="how-it-works" element={<HowItWorksManagement />} />
          <Route path="testimonials" element={<TestimonialsManagement />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;