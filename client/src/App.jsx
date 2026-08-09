import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import ProcessSection from "./components/ProcessSection";
import AboutSafetySection from "./components/AboutSafetySection";
import FaqSection from "./components/FaqSection";
import RequestCta from "./components/RequestCta";
import Footer from "./components/Footer";
import { businessConfig } from "./data/businessConfig";

function App() {
  useEffect(() => {
    document.title = `${businessConfig.name} | Professional Electrical Services`;
  }, []);

  return (
    <div
      id="top"
      className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black"
    >
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-md bg-brand-yellow px-4 py-2 font-bold text-brand-black focus:not-sr-only"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ServicesSection />
        <ProcessSection />
        <AboutSafetySection />
        <FaqSection />
        <RequestCta />
      </main>
      <Footer />
    </div>
  );
}

export default App;
