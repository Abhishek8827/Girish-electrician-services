import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import { businessConfig } from "../data/businessConfig";
import {
  MdBuild,
  MdOutlineShield,
  MdOutlineVisibility,
  MdVerifiedUser,
} from "react-icons/md";

const principles = [
  {
    icon: MdOutlineShield,
    title: "Safety-led work",
    description:
      "Electrical risks are treated seriously from assessment through handover.",
  },
  {
    icon: MdOutlineVisibility,
    title: "Clear communication",
    description:
      "The scope and next step are explained in straightforward language.",
  },
  {
    icon: MdBuild,
    title: "Technical care",
    description:
      "Installation, repair, and maintenance work is approached methodically.",
  },
  {
    icon: MdVerifiedUser,
    title: "Respect for your space",
    description:
      "Whether at home or work, the aim is a tidy, considered service visit.",
  },
];

function AboutSafetySection() {
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <>
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }} // Increased section padding
        className="scroll-mt-24 bg-gray-100 py-24 dark:bg-brand-dark sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeading
              eyebrow="Why choose us"
              title="Technical service with a human standard."
              description="Girish Electrician Services is designed around professionalism, reliable communication, and safety-conscious electrical support."
            />
            <p className="max-w-xl text-xl leading-9 text-gray-600 dark:text-brand-gray">
              {" "}
              {/* Increased font size and line-height */}
              From a minor fitting to a planned upgrade, each request deserves a
              clear process and responsible professional attention.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/10 sm:grid-cols-2">
            {" "}
            {/* Increased top margin */}
            {principles.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="bg-gray-100 p-8 dark:bg-brand-dark sm:p-9"
              >
                {" "}
                {/* Increased padding */}
                <Icon
                  size={24}
                  className="text-brand-yellow"
                  aria-hidden="true"
                />
                <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-brand-white">
                  {" "}
                  {/* Increased font size */}
                  {title}
                </h3>
                <p className="mt-3 leading-8 text-gray-600 dark:text-brand-gray">
                  {description}
                </p>{" "}
                {/* Increased line-height */}
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* New "Meet Girish" Section */}
      <motion.section
        ref={parallaxRef}
        id="meet-girish"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }} // Increased section padding
        className="scroll-mt-24 bg-white py-24 dark:bg-brand-black sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Your trusted electrician"
                title={`Meet ${businessConfig.shortName}`}
                description="Girish is dedicated to providing reliable, safe, and high-quality electrical services to the Nepanagar community."
              />
              <p className="mt-6 max-w-xl leading-8 text-gray-600 dark:text-brand-gray">
                {" "}
                {/* Increased line-height */}
                With years of experience and a deep understanding of electrical
                systems, Girish ensures every job, big or small, is completed
                with meticulous attention to detail and adherence to the highest
                safety standards. He believes in clear communication and
                transparent service, making sure you understand the work being
                done and why it's necessary.
              </p>
              <p className="mt-4 max-w-xl leading-8 text-gray-600 dark:text-brand-gray">
                {" "}
                {/* Increased line-height */}
                Whether it's a routine installation, a complex repair, or an
                emergency, you can count on Girish for professional and
                efficient service.
              </p>
            </div>
            <div className="relative flex justify-center">
              {/* Placeholder for an image of Girish, if available */}
              <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl border-2 border-brand-yellow/20 bg-gray-100 shadow-2xl dark:bg-brand-dark">
                <motion.img
                  src={`${import.meta.env.BASE_URL}${businessConfig.profileImage}`}
                  alt={businessConfig.profileImageAlt}
                  className="absolute -bottom-1/4 -left-1/4 h-[150%] w-[150%] max-w-none object-cover"
                  style={{ y: imageY }}
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="safety"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }} // Increased section padding
        className="scroll-mt-24 bg-brand-yellow py-20 sm:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <MdOutlineShield
            size={52}
            className="text-brand-black"
            aria-hidden="true"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-black/70">
              Safety notice
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-brand-black">
              Leave live electrical work to qualified professionals.
            </h2>
            <p className="mt-3 max-w-3xl leading-8 text-brand-black/75">
              {" "}
              {/* Increased line-height */}
              If an electrical issue seems unsafe, avoid touching damaged
              equipment or attempting a repair yourself. Request professional
              assessment instead.
            </p>
          </div>
          <a
            href="#request-service"
            className="inline-flex justify-center rounded-full bg-brand-black px-6 py-3 text-sm font-bold text-brand-white transition-transform hover:scale-[1.02]"
          >
            Request support
          </a>
        </div>
      </motion.section>
    </>
  );
}

export default AboutSafetySection;
