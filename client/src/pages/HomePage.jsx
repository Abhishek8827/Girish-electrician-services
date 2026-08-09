import AboutSafetySection from "../components/AboutSafetySection";
import ElectricalPanelSection from "../components/ElectricalPanelSection";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProcessSection from "../components/ProcessSection";
import RequestCta from "../components/RequestCta";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServicesSection />
        <ProcessSection />
        <TestimonialsSection />
        <ElectricalPanelSection />
        <AboutSafetySection />
        <FaqSection />
        <RequestCta />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
