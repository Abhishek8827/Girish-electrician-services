import { motion } from "framer-motion";
import { processSteps } from "../data/siteContent";
import { MdArrowDownward } from "react-icons/md";
import SectionHeading from "./SectionHeading";

function ProcessSection() {
  return (
    <motion.section
      id="process"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }} // Increased section padding
      className="scroll-mt-24 bg-brand-black py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Clear process"
          title="A professional route from request to resolution."
          description="We keep the process easy to understand, so you know what happens before work begins."
          align="center"
        />

        <ol className="mx-auto mt-16 max-w-4xl">
          {processSteps.map((step, index) => (
            <li
              key={step.number}
              className="relative grid gap-6 pb-10 sm:grid-cols-[8rem_1fr] sm:gap-12"
            >
              <div className="flex items-start gap-4 sm:block">
                <span className="font-mono text-5xl font-bold text-brand-yellow">
                  {step.number}
                </span>
                <span className="mt-2 block text-sm font-bold uppercase tracking-[0.18em] text-brand-gray">
                  {step.title}
                </span>
              </div>
              <div className="border-l border-brand-yellow/30 pb-10 pl-8 sm:pl-12">
                <h3 className="text-2xl font-bold text-brand-white">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl leading-8 text-brand-gray">
                  {step.description}
                </p>
              </div>
              {index < processSteps.length - 1 && (
                <MdArrowDownward
                  size={18}
                  aria-hidden="true" // Adjusted position for larger numbers/spacing
                  className="absolute bottom-2 left-[3.5rem] text-brand-yellow sm:left-[8rem]"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </motion.section>
  );
}

export default ProcessSection;
