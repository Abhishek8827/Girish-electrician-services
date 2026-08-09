import { Check, CircuitBoard, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { serviceCategories } from "../data/siteContent";
import SectionHeading from "./SectionHeading";

function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0]);

  return (
    <section id="services" className="scroll-mt-24 bg-brand-dark py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Service explorer"
          title="What do you need help with?"
          description="Choose a service area to see the kind of professional electrical support available."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible"
            role="tablist"
            aria-label="Electrical service categories"
          >
            {serviceCategories.map((category) => {
              const isActive = category.id === activeCategory.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 rounded-full border px-5 py-3 text-left text-sm font-bold transition-colors lg:w-full lg:rounded-xl ${
                    isActive
                      ? "border-brand-yellow bg-brand-yellow text-brand-black"
                      : "border-white/10 bg-brand-black/30 text-brand-gray hover:border-brand-yellow/50 hover:text-brand-white"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-black p-7 sm:p-10"
          >
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-brand-yellow/10 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 text-brand-yellow">
                <CircuitBoard size={22} />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">{activeCategory.label}</span>
              </div>
              <h3 className="mt-6 max-w-xl text-2xl font-bold text-brand-white sm:text-3xl">
                {activeCategory.title}
              </h3>
              <p className="mt-4 max-w-xl leading-7 text-brand-gray">{activeCategory.description}</p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {activeCategory.services.map((service) => (
                  <li key={service} className="flex items-center gap-3 text-sm font-medium text-brand-white">
                    <Check size={18} className="shrink-0 text-brand-yellow" aria-hidden="true" />
                    {service}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-start gap-3 border-t border-white/10 pt-6 text-sm leading-6 text-brand-gray">
                <ShieldCheck size={19} className="mt-0.5 shrink-0 text-brand-yellow" aria-hidden="true" />
                Complex electrical work should be assessed and carried out by a qualified professional.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
