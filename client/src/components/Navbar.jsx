import React, { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Add scroll listener to change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-black/90 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-brand-yellow p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
            <Zap className="text-brand-black fill-brand-black" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tighter text-brand-white">
            GIRISH <span className="text-brand-yellow">ELECTRIC</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {["Services", "Process", "About", "Safety"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-brand-gray hover:text-brand-yellow transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="bg-brand-yellow text-brand-black px-5 py-2 rounded-full font-bold text-sm glow-yellow hover:bg-brand-yellow-glow transition-all active:scale-95">
            Request Service
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brand-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-dark border-t border-brand-black p-6 flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-5">
          {["Services", "Process", "About", "Safety"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-lg font-medium text-brand-gray hover:text-brand-yellow"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="bg-brand-yellow text-brand-black px-5 py-3 rounded-xl font-bold glow-yellow">
            Request Service
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
