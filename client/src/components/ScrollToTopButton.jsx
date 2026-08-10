import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MdArrowUpward } from "react-icons/md";

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 300);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-brand-black shadow-lg transition-transform hover:scale-105 active:scale-95"
          aria-label="Go to top"
        >
          <MdArrowUpward size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTopButton;
