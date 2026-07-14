import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
// import Benefits from './components/Benefits';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Projects from './components/Projects';
// import Team from './components/Team';
import FeedbackCarousel from './components/FeedbackCarousel';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import Testimonials from './components/Testimonials';
function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Bridge Management Consultancy | Project Proposal, Feasibility Study, EIA, ESIA, Training, Asset Evaluation, Organizational Structure & Environmental Audit';

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Expert consulting: EIA, ESIA, Feasibility Study, Project Proposal, Asset Evaluation, Organizational Structure & Environmental Audit. Serving Ethiopia & East Africa.');

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'Bridge Consulting, Project Proposal, Feasibility Study, Environmental Impact Assessment, EIA, Environmental and Social Impact Assessment, ESIA, Training, Asset Evaluation, Organizational Structure, Environmental Audit Report, management consulting Ethiopia, Addis Ababa, East Africa');
  }, []);

  // Scroll to hash section after navigation (e.g. from footer links like /#services)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Delay to ensure sections have rendered before scrolling
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen w-full bg-white">
      <Header />
      <Hero />
      {/* <Benefits /> */}
      <Services />
      <HowItWorks />
      <About />
      <Projects />
      {/* <Team /> */}
      <FeedbackCarousel />
      {/* <Testimonials/> */}
      <Contact />
      <Footer />
    </div>
  );
}

export default App;