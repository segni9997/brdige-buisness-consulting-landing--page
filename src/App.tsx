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
    document.title = 'Bridge Consulting Services | Strategic Solutions for Growth';
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Bridge Consulting Services provides expert strategic consulting services to help businesses achieve sustainable growth and operational excellence.');
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