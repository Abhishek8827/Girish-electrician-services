import { motion } from "framer-motion";
import { Building2, Check, CircuitBoard, HardHat, House, Lightbulb, ShieldCheck, Siren, Wrench } from "lucide-react";
import { useState } from "react";
import { serviceCategories } from "../data/siteContent";
import SectionHeading from "./SectionHeading";

const sceneByCategory = {
  home: { icon: House, label: "Residential environment", detail: "Rooms, fixtures, and protected home circuits" },
  office: { icon: Building2, label: "Workplace environment", detail: "Workstations, lighting zones, and structured power" },
  construction: { icon: HardHat, label: "Construction environment", detail: "Conduit routes, distribution planning, and new infrastructure" },
  panel: { icon: CircuitBoard, label: "Panel environment", detail: "Distribution circuits, breakers, and professional assessment" },
  emergency: { icon: Siren, label: "Fault-response environment", detail: "A clear route from reported fault to safe assessment" },
  lighting: { icon: Lightbulb, label: "Lighting environment", detail: "Purposeful fixtures, controls, and energy-conscious upgrades" },
};

function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0]);
  const activeScene = sceneByCategory[activeCategory.id];
  const SceneIcon = activeScene.icon;

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
            <div className="relative grid gap-10 xl:grid-cols-[1fr_0.8fr] xl:items-center">
              <div>
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
              </div>

              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="relative min-h-64 overflow-hidden rounded-2xl border border-brand-yellow/25 bg-brand-dark p-6"
                aria-label={`${activeScene.label}: ${activeScene.detail}`}
              >
                <div aria-hidden="true" className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(250,204,21,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.15)_1px,transparent_1px)] [background-size:28px_28px]" />
                <div className="relative flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg border border-brand-yellow/40 bg-brand-black/60 p-3 text-brand-yellow"><SceneIcon size={27} aria-hidden="true" /></span>
                    <Wrench size={22} className="text-brand-yellow/70" aria-hidden="true" />
                  </div>
                  <div className="my-7 grid grid-cols-4 gap-2" aria-hidden="true">
                    {[0, 1, 2, 3].map((index) => <span key={index} className={`h-12 rounded-md border ${index === 1 ? "border-brand-yellow bg-brand-yellow/25" : "border-white/15 bg-brand-black/50"}`} />)}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-yellow">{activeScene.label}</p>
                    <p className="mt-2 text-sm leading-6 text-brand-gray">{activeScene.detail}</p>
                  </div>
                </div>
              </motion.div>

              <div className="xl:col-span-2 flex items-start gap-3 border-t border-white/10 pt-6 text-sm leading-6 text-brand-gray">
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
