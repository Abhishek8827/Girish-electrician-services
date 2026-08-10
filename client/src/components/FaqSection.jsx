import { motion } from "framer-motion";
import { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { faqs } from "../data/siteContent";
import SectionHeading from "./SectionHeading";

function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState(0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-brand-black py-20 sm:py-28"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Answers first"
          title={<span id="faq-title">Frequently asked questions.</span>}
          description="A few helpful answers before you make a service request."
        />
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((faq, index) => {
            const isOpen = openQuestion === index;
            const panelId = `faq-panel-${index}`;

            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold text-brand-white"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenQuestion(isOpen ? -1 : index)}
                >
                  {faq.question}
                  <MdExpandMore
                    size={22}
                    aria-hidden="true"
                    className={`shrink-0 text-brand-yellow transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <p
                    id={panelId}
                    className="max-w-2xl pb-6 leading-7 text-brand-gray"
                  >
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

export default FaqSection;
