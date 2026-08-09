import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
          <div className="inline-flex items-center gap-2 bg-brand-dark border border-brand-yellow/30 px-3 py-1 rounded-full text-brand-yellow text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} />
            Certified Master Electricians
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-brand-white mb-6">
            POWERING HOMES. <br />
            <span className="text-brand-yellow text-glow-yellow">
              PROTECTING
            </span>{" "}
            BUSINESSES.
          </h1>

          <p className="text-brand-gray text-lg md:text-xl mb-10 max-w-lg leading-relaxed">
            Premium electrical installation, repair, and maintenance. Combining
            technical precision with uncompromising safety standards.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-bold text-lg glow-yellow hover:bg-brand-yellow-glow transition-all active:scale-95">
              Request a Service <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 rounded-full font-bold text-lg border border-brand-gray/30 text-brand-white hover:bg-brand-dark transition-all">
              Explore Services
            </button>
          </div>
        </motion.div>

        {/* Visual Side (AI Character Placeholder) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center"
        >
          {/* This is the container for the AI Image */}
          <div className="relative w-full max-w-md aspect-square bg-brand-dark rounded-3xl border-2 border-brand-yellow/20 overflow-hidden shadow-2xl">
            {/* Placeholder for the AI Image */}
            <div className="absolute inset-0 flex items-center justify-center text-brand-gray text-center p-8 italic">
              [ AI Visual: Professional Electrician with tools, cinematic
              lighting, standing in front of a modern electrical panel ]
            </div>
            {/* Animated Glow ring behind image */}
            <div className="absolute inset-0 border-4 border-brand-yellow opacity-20 animate-pulse rounded-3xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
