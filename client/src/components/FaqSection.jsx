import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { faqs } from "../data/siteContent";
import SectionHeading from "./SectionHeading";

const FaqItem = React.memo(({ faq, index, isOpen, onToggle }) => {
  const panelId = `faq-panel-${index}`;

  return (
    <div key={faq.question}>
      <button
        type="button"
        className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold text-gray-900 dark:text-brand-white"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(index)}
      >
        {faq.question}
        <MdExpandMore
          size={22}
          aria-hidden="true"
          className={`shrink-0 text-brand-yellow transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <p
          id={panelId}
          className="max-w-3xl pb-7 leading-8 text-gray-600 dark:text-brand-gray" // Increased max-width, padding, and line-height
        >
          {faq.answer}
        </p>
      )}
    </div>
  );
});

function FaqSection() {
  const [openQuestion, setOpenQuestion] = useState(0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const handleToggle = useCallback((index) => {
    setOpenQuestion((current) => (current === index ? -1 : index));
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }} // Increased section padding
      className="bg-white py-24 dark:bg-brand-black sm:py-32"
      aria-labelledby="faq-title"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Answers first"
          title={<span id="faq-title">Frequently asked questions.</span>}
          description="A few helpful answers before you make a service request."
        />
        <div className="divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-y dark:border-white/10">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openQuestion === index}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default FaqSection;
