import AboutSafetySection from "../components/AboutSafetySection";
import { useState } from "react";
import ElectricalPanelSection from "../components/ElectricalPanelSection";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ProcessSection from "../components/ProcessSection";
import RequestCta from "../components/RequestCta";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import { useSEOMeta } from "../hooks/useSEOMeta";
import JsonLdSchema from "../components/JsonLdSchema";

function HomePage() {
  const [initialServiceType, setInitialServiceType] = useState("");

  useSEOMeta({
    title: "Girish Electrician Services | Professional Electrical Installation & Repair in Nepanagar",
    description: "Licensed electrician with 15+ years experience. Expert electrical installation, repair & maintenance. Emergency services available 24/7 in Nepanagar, MP. Residential & commercial electrical solutions.",
    ogTitle: "Professional Electrician Services in Nepanagar, MP",
    ogDescription: "Expert electrical installation, repair & maintenance by certified electrician. 24/7 emergency services available.",
    canonical: "https://abhishek8827.github.io/Girish-electrician-services/",
  });
  return (
    <>
      <JsonLdSchema />
      <Navbar />
      <main>
        <Hero />
        <ServicesSection onSelectService={setInitialServiceType} />
        <ProcessSection />
        <TestimonialsSection />
        <ElectricalPanelSection />
        <AboutSafetySection />
        <FaqSection />
        <RequestCta initialServiceType={initialServiceType} />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
