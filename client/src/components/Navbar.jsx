import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MdClose, MdFlashOn, MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import { businessConfig } from "../data/businessConfig";
import ScrollToTopButton from "./ScrollToTopButton";
import ThemeToggleButton from "./ThemeToggleButton";

const navItems = [
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#meet-girish" },
  { name: "Safety", href: "#safety" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastY = useRef(0);
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);

      // Don't hide if mobile menu is open or if near the top of the page
      if (isMobileMenuOpen || currentY < 200) {
        setIsHidden(false);
      } else if (currentY > lastY.current) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }
      lastY.current = currentY;

      // Active link highlighting on scroll
      let currentSection = "";
      for (const item of navItems) {
        const section = document.querySelector(item.href);
        if (section) {
          // 150px offset for navbar height and breathing room
          if (currentY >= section.offsetTop - 150) {
            currentSection = item.href;
          }
        }
      }
      setActiveHash(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]); // No need to add navItems here as it's constant

  return (
    <>
      <motion.nav
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          isScrolled // Light mode: white with blur, Dark mode: black with blur
            ? "bg-white/80 py-4 shadow-lg backdrop-blur-md dark:bg-brand-black/90"
            : "bg-transparent py-6" // Transparent at top
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 group">
            <div className="bg-brand-yellow p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <MdFlashOn className="text-brand-black" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tighter text-gray-900 dark:text-brand-white">
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
          <div className="hidden items-center gap-4 md:flex">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-base font-medium transition-colors ${
                      activeHash === item.href
                        ? "text-brand-yellow"
                        : "text-gray-600 hover:text-brand-yellow dark:text-brand-gray"
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/track-request"
                  className="rounded-md px-3 py-2 text-sm font-bold text-gray-700 transition-colors hover:text-brand-yellow dark:text-brand-white"
                >
                  Track Request
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="rounded-md px-3 py-2 text-sm font-bold text-gray-700 transition-colors hover:text-brand-yellow dark:text-brand-white"
                >
                  Admin Login
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-3">
              <ThemeToggleButton />
              <a
                href="#request-service"
                className="bg-brand-yellow text-brand-black px-5 py-2 rounded-full font-bold text-sm glow-yellow hover:bg-brand-yellow-glow transition-all active:scale-95"
              >
                Request Service
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden text-gray-900 dark:text-brand-white"
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
              className="absolute top-full left-0 w-full border-t border-black/10 bg-white p-6 dark:border-white/10 dark:bg-brand-dark md:hidden"
            >
              <ul className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block rounded-lg px-4 py-2.5 text-lg font-medium transition-colors ${
                        activeHash === item.href
                          ? "bg-gray-100 text-brand-yellow dark:bg-white/5"
                          : "text-gray-600 hover:bg-gray-100 hover:text-brand-yellow dark:text-brand-gray dark:hover:bg-white/5"
                      }`}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
                <li>
                  <Link
                    to="/track-request"
                    className="block rounded-lg px-4 py-2.5 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-brand-yellow dark:text-brand-white dark:hover:bg-white/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Track Request
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="block rounded-lg px-4 py-2.5 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-brand-yellow dark:text-brand-white dark:hover:bg-white/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin Login
                  </Link>
                </li>
              </ul>
              <div className="my-6 border-t border-black/10 pt-6 dark:border-white/10">
                <ThemeToggleButton />
              </div>
              <a
                href="#request-service"
                className="block w-full rounded-full bg-brand-yellow px-5 py-3 text-center font-bold text-brand-black glow-yellow"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Request Service
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <ScrollToTopButton />
    </>
  );
};

export default Navbar;
