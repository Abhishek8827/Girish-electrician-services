import { motion } from "framer-motion";
import {
  MdArrowForward,
  MdShield,
  MdVerified,
  MdThumbUp,
} from "react-icons/md";

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const stats = [
    { label: "Happy Customers", value: "1000+" },
    { label: "Years Experience", value: "15+" },
    { label: "Projects Completed", value: "2500+" },
  ];

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

      {/* Animated Background Glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-yellow/20 rounded-full blur-[120px] z-0"
      ></motion.div>
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-yellow/10 rounded-full blur-[120px] z-0"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        {/* Text Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-yellow/30 bg-brand-dark px-4 py-2 text-xs font-bold uppercase tracking-widest"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <MdShield size={14} />
            </motion.div>
            Certified Master Electricians
          </motion.div>

          {/* Headline with Gradient Effect */}
          <motion.h1
            variants={itemVariants}
            className="mb-8 text-5xl font-extrabold leading-tight text-brand-white sm:text-6xl md:text-7xl"
          >
            POWERING{" "}
            <motion.span
              className="inline-block"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              HOMES
            </motion.span>
            . <br />
            <span className="text-brand-yellow text-glow-yellow">
              PROTECTING
            </span>{" "}
            <motion.span
              className="inline-block"
              animate={{ y: [2, -2, 2] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
            >
              BUSINESSES
            </motion.span>
            .
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mb-12 max-w-lg text-xl leading-relaxed text-brand-gray md:text-2xl"
          >
            Premium electrical installation, repair, and maintenance. Combining
            technical precision with uncompromising safety standards.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-5 sm:flex-row"
          >
            <motion.a
              href="#request-service"
              className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-bold text-lg glow-yellow transition-all active:scale-95"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(250, 204, 21, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
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
            <motion.a
              href="#services"
              className="text-center rounded-full border border-brand-gray/30 px-9 py-4.5 text-lg font-bold text-brand-white transition-all hover:bg-brand-dark/50"
              whileHover={{ borderColor: "#facc15", borderWidth: 2 }}
            >
              Explore Services
            </motion.a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap gap-4 pt-8 border-t border-brand-gray/20"
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <div className="bg-brand-yellow/20 rounded-full p-2">
                <MdVerified size={20} className="text-brand-yellow" />
              </div>
              <span className="text-sm font-semibold text-brand-gray">
                Licensed & Insured
              </span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 5 }}
            >
              <div className="bg-brand-yellow/20 rounded-full p-2">
                <MdThumbUp size={20} className="text-brand-yellow" />
              </div>
              <span className="text-sm font-semibold text-brand-gray">
                100% Satisfaction
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <div className="flex flex-col gap-12">
          {/* Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center pt-10 md:pt-0"
          >
            <div className="relative aspect-square w-full max-w-sm rounded-3xl border-2 border-brand-yellow/20 bg-brand-dark shadow-2xl sm:max-w-md overflow-hidden">
              <motion.img
                src={`${import.meta.env.BASE_URL}electrician.png`}
                alt="Professional electrician standing beside an electrical distribution panel"
                className="h-full w-full object-cover"
                decoding="async"
                fetchPriority="high"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-brand-black/40 via-transparent to-transparent"
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl border-4 border-brand-yellow/20"
                animate={{
                  boxShadow: "inset 0 0 20px rgba(250, 204, 21, 0.2)",
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="rounded-lg border border-brand-yellow/20 bg-brand-dark/40 backdrop-blur-sm p-4 text-center"
                whileHover={{
                  borderColor: "#facc15",
                  backgroundColor: "rgba(30, 30, 30, 0.7)",
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                  className="text-2xl font-bold text-brand-yellow mb-1"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-brand-gray font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
