import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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
        {/* Future sections will be added here */}
      </main>
    </div>
  );
}

export default App;
