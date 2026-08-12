import { AnimatePresence, motion } from "framer-motion";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-200 dark:text-brand-gray dark:hover:bg-white/10"
      aria-label="Toggle theme"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "light" ? (
            <MdDarkMode size={22} />
          ) : (
            <MdLightMode size={22} />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}

export default ThemeToggleButton;
