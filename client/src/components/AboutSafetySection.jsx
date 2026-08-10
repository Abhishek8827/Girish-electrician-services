import { BadgeCheck, Eye, ShieldAlert, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { businessConfig } from "../data/businessConfig";

const principles = [
  {
    icon: ShieldAlert,
    title: "Safety-led work",
    description:
      "Electrical risks are treated seriously from assessment through handover.",
  },
  {
    icon: Eye,
    title: "Clear communication",
    description:
      "The scope and next step are explained in straightforward language.",
  },
  {
    icon: Wrench,
    title: "Technical care",
    description:
      "Installation, repair, and maintenance work is approached methodically.",
  },
  {
    icon: BadgeCheck,
    title: "Respect for your space",
    description:
      "Whether at home or work, the aim is a tidy, considered service visit.",
  },
];

function AboutSafetySection() {
  return (
    <>
      <motion.section
        id="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="scroll-mt-24 bg-brand-dark py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionHeading
              eyebrow="Why choose us"
              title="Technical service with a human standard."
              description="Girish Electrician Services is designed around professionalism, reliable communication, and safety-conscious electrical support."
            />
            <p className="max-w-xl text-lg leading-8 text-brand-gray">
              From a minor fitting to a planned upgrade, each request deserves a
              clear process and responsible professional attention.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {principles.map(({ icon: Icon, title, description }) => (
              <article key={title} className="bg-brand-dark p-7 sm:p-8">
                <Icon
                  size={24}
                  className="text-brand-yellow"
                  aria-hidden="true"
                />
                <h3 className="mt-6 text-xl font-bold text-brand-white">
                  {title}
                </h3>
                <p className="mt-3 leading-7 text-brand-gray">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      {/* New "Meet Girish" Section */}
      <motion.section
        id="meet-girish"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="scroll-mt-24 bg-brand-black py-20 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Your trusted electrician"
                title={`Meet ${businessConfig.shortName}`}
                description="Girish is dedicated to providing reliable, safe, and high-quality electrical services to the Nepanagar community."
              />
              <p className="mt-6 max-w-xl leading-7 text-brand-gray">
                With years of experience and a deep understanding of electrical systems, Girish ensures every job, big or small, is completed with meticulous attention to detail and adherence to the highest safety standards. He believes in clear communication and transparent service, making sure you understand the work being done and why it's necessary.
              </p>
              <p className="mt-4 max-w-xl leading-7 text-brand-gray">
                Whether it's a routine installation, a complex repair, or an emergency, you can count on Girish for professional and efficient service.
              </p>
            </div>
            <div className="relative flex justify-center">
              {/* Placeholder for an image of Girish, if available */}
              <div className="relative w-full max-w-sm aspect-square bg-brand-dark rounded-3xl border-2 border-brand-yellow/20 overflow-hidden shadow-2xl flex items-center justify-center text-brand-gray text-center p-4">
                <img
                  src={`${import.meta.env.BASE_URL}girish-profile.png`} {/* Placeholder: Replace with actual image path */}
                  alt="Girish, the electrician"
                  className="h-full w-full object-cover"
                  decoding="async"
                  fetchPriority="low"
                />
                {/* If no image, you could display text: "Image of Girish coming soon!" */}
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
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="scroll-mt-24 bg-brand-yellow py-16 sm:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <ShieldAlert
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
            <p className="mt-3 max-w-3xl leading-7 text-brand-black/75">
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
