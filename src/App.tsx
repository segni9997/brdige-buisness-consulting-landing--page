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

function App() {
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
      <Contact />
      <Footer />
    </div>
  );
}

export default App;