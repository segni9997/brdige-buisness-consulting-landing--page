import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Feedback from './pages/admin/Feedback';
import Comments from './pages/admin/Comments';
import Stories from './pages/admin/Stories';
import AdminLayout from './pages/admin/AdminLayout';
import CaseStudyDetail from './pages/CaseStudyDetail';
import AllCaseStudies from './pages/AllCaseStudies';
import Layout from './components/Layout';

function Router() {
  return (
    <BrowserRouter>
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
          <Route path="stories" element={<Stories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;