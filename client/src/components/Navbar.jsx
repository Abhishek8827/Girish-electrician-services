import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdClose, MdFlashOn, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { businessConfig } from "../data/businessConfig";
import ScrollToTopButton from "./ScrollToTopButton";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#meet-girish" }, // Points to the "Meet Girish" section
  { name: "Safety", href: "#safety" }, // Points to the "Safety notice" section
];

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
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-brand-black/90 backdrop-blur-md py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 group">
            <div className="bg-brand-yellow p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <MdFlashOn className="text-brand-black" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tighter text-brand-white">
              {businessConfig.shortName.split(" ")[0].toUpperCase()}{" "}
              <span className="text-brand-yellow">
                {businessConfig.shortName
                  .split(" ")
                  .slice(1)
                  .join(" ")
                  .toUpperCase()}
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-brand-gray hover:text-brand-yellow transition-colors"
              >
                {item.name}
              </a>
            ))}
            <Link
              to="/track-request"
              className="text-sm font-bold text-brand-white transition-colors hover:text-brand-yellow"
            >
              Track Request
            </Link>
            <Link
              to="/admin"
              className="text-sm font-bold text-brand-white transition-colors hover:text-brand-yellow"
            >
              Admin Login
            </Link>
            <a
              href="#request-service"
              className="bg-brand-yellow text-brand-black px-5 py-2 rounded-full font-bold text-sm glow-yellow hover:bg-brand-yellow-glow transition-all active:scale-95"
            >
              Request Service
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden text-brand-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={
              isMobileMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
          >
            {isMobileMenuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-brand-dark border-t border-brand-black p-6 flex flex-col gap-4 md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-brand-gray hover:text-brand-yellow"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Link
                to="/track-request"
                className="text-lg font-bold text-brand-white hover:text-brand-yellow"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Track Request
              </Link>
              <Link
                to="/admin"
                className="text-lg font-bold text-brand-white hover:text-brand-yellow"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
              <a
                href="#request-service"
                className="bg-brand-yellow text-brand-black px-5 py-3 rounded-xl font-bold glow-yellow"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request Service
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <ScrollToTopButton />
    </>
  );
};

export default Navbar;
