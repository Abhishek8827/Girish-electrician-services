import { motion } from "framer-motion";
import { MdArrowForward, MdShield } from "react-icons/md";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24">
      {/* Background Decorative Element - Electric Grid */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#facc15 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Background Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-yellow/20 rounded-full blur-[120px] z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] z-0"></div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-yellow/30 bg-brand-dark px-3 py-1.5 text-xs font-bold uppercase tracking-widest">
            <MdShield size={14} />
            Certified Master Electricians
          </div>

          <h1 className="mb-8 text-5xl font-extrabold leading-tight text-brand-white sm:text-6xl md:text-7xl">
            POWERING HOMES. <br />
            <span className="text-brand-yellow text-glow-yellow">
              PROTECTING
            </span>{" "}
            BUSINESSES.
          </h1>

          <p className="mb-12 max-w-lg text-xl leading-relaxed text-brand-gray md:text-2xl">
            Premium electrical installation, repair, and maintenance. Combining
            technical precision with uncompromising safety standards.
          </p>

          <div className="flex flex-col gap-5 sm:flex-row">
            <motion.a
              href="#request-service"
              className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-bold text-lg glow-yellow hover:bg-brand-yellow-glow transition-all active:scale-95"
              animate={{
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              Request a Service <MdArrowForward size={20} />
            </motion.a>
            <a
              href="#services"
              className="text-center rounded-full border border-brand-gray/30 px-9 py-4.5 text-lg font-bold text-brand-white transition-all hover:bg-brand-dark"
            >
              Explore Services
            </a>
          </div>
        </motion.div>

        {/* Visual Side (AI Character Placeholder) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center pt-10 md:pt-0"
        >
          <div className="relative aspect-square w-full max-w-sm rounded-3xl border-2 border-brand-yellow/20 bg-brand-dark shadow-2xl sm:max-w-md">
            <img
              src={`${import.meta.env.BASE_URL}electrician.png`}
              alt="Professional electrician standing beside an electrical distribution panel"
              className="h-full w-full object-cover"
              decoding="async"
              fetchPriority="high"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-3xl border-4 border-brand-yellow/20 animate-pulse"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
