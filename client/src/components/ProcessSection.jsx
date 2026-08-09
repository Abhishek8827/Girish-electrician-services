import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { processSteps } from "../data/siteContent";
import SectionHeading from "./SectionHeading";

function ProcessSection() {
  return (
    <motion.section
      id="process"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="scroll-mt-24 bg-brand-black py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Clear process"
          title="A professional route from request to resolution."
          description="We keep the process easy to understand, so you know what happens before work begins."
          align="center"
        />

        <ol className="mx-auto mt-14 max-w-4xl">
          {processSteps.map((step, index) => (
            <li
              key={step.number}
              className="relative grid gap-5 pb-8 sm:grid-cols-[8rem_1fr] sm:gap-10"
            >
              <div className="flex items-start gap-4 sm:block">
                <span className="font-mono text-4xl font-bold text-brand-yellow">
                  {step.number}
                </span>
                <span className="mt-2 block text-xs font-bold uppercase tracking-[0.18em] text-brand-gray">
                  {step.title}
                </span>
              </div>
              <div className="border-l border-brand-yellow/30 pb-8 pl-6 sm:pl-10">
                <h3 className="text-xl font-bold text-brand-white">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl leading-7 text-brand-gray">
                  {step.description}
                </p>
              </div>
              {index < processSteps.length - 1 && (
                <ArrowDown
                  size={18}
                  aria-hidden="true"
                  className="absolute bottom-1 left-[3.25rem] text-brand-yellow sm:left-[7.45rem]"
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
