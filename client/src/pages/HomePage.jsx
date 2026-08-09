import AboutSafetySection from "../components/AboutSafetySection";
import ElectricalPanelSection from "../components/ElectricalPanelSection";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProcessSection from "../components/ProcessSection";
import RequestCta from "../components/RequestCta";
import ServicesSection from "../components/ServicesSection";

function HomePage() {
  return (
    <div id="top" className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black">
      <a href="#main-content" className="sr-only fixed left-4 top-4 z-[60] rounded-md bg-brand-yellow px-4 py-2 font-bold text-brand-black focus:not-sr-only">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ServicesSection />
        <ElectricalPanelSection />
        <ProcessSection />
        <AboutSafetySection />
        <FaqSection />
        <RequestCta />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
