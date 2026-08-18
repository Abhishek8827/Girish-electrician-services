import { motion } from "framer-motion";
import React, { useCallback, useId, useState } from "react";
import {
  MdArrowForward,
  MdBuild,
  MdBusiness,
  MdCheck,
  MdConstruction,
  MdDeveloperBoard,
  MdEmergency,
  MdHouse,
  MdLightbulbOutline,
  MdShield,
} from "react-icons/md";
import { serviceCategories } from "../data/siteContent";
import SectionHeading from "./SectionHeading";

const sceneByCategory = {
  home: {
    icon: MdHouse,
    label: "Residential environment",
    detail: "Rooms, fixtures, and protected home circuits",
  },
  office: {
    icon: MdBusiness,
    label: "Workplace environment",
    detail: "Workstations, lighting zones, and structured power",
  },
  construction: {
    icon: MdConstruction,
    label: "Construction environment",
    detail: "Conduit routes, distribution planning, and new infrastructure",
  },
  panel: {
    icon: MdDeveloperBoard,
    label: "Panel environment",
    detail: "Distribution circuits, breakers, and professional assessment",
  },
  emergency: {
    icon: MdEmergency,
    label: "Fault-response environment",
    detail: "A clear route from reported fault to safe assessment",
  },
  lighting: {
    icon: MdLightbulbOutline,
    label: "Lighting environment",
    detail: "Purposeful fixtures, controls, and energy-conscious upgrades",
  },
};

const ServiceTab = React.memo(function ServiceTab({
  category,
  isActive,
  onSelect,
  tabId,
  panelId,
}) {
  return (
    <motion.button
      type="button"
      role="tab"
      id={tabId}
      aria-controls={panelId}
      aria-selected={isActive}
      onClick={() => onSelect(category)}
      className={`shrink-0 rounded-full border px-6 py-3.5 text-left text-base font-bold transition-colors lg:w-full lg:rounded-xl ${
        isActive // Active state is the same for both themes
          ? "border-brand-yellow bg-brand-yellow text-brand-black" // Inactive state changes with theme
          : "border-gray-300 bg-white text-gray-600 hover:border-brand-yellow/50 hover:text-gray-900 dark:border-white/10 dark:bg-brand-black/30 dark:text-brand-gray dark:hover:text-brand-white"
      }`}
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {category.label}
    </motion.button>
  );
});

function ServiceTabPanel({ category, scene, panelId, tabId, onSelectService }) {
  const SceneIcon = scene.icon;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      className="relative overflow-hidden rounded-3xl border border-black/10 bg-white p-8 dark:border-white/10 dark:bg-brand-black sm:p-12"
    >
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-brand-yellow/10 blur-3xl"
      />
      <div className="relative grid gap-10 xl:grid-cols-[1fr_0.8fr] xl:items-center">
        <div>
          <div className="flex items-center gap-3 text-brand-yellow">
            <MdDeveloperBoard size={22} />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              {category.label} {/* Kept this small as it's an eyebrow */}
            </span>
          </div>
          <h3 className="mt-6 max-w-xl text-3xl font-bold text-gray-900 dark:text-brand-white sm:text-4xl">
            {category.title}
          </h3>
          <p className="mt-4 max-w-xl leading-8 text-gray-600 dark:text-brand-gray">
            {category.description}
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {category.services.map((service) => (
              <li
                key={service}
                className="flex items-center gap-4 text-base font-medium text-gray-800 dark:text-brand-white"
              >
                <MdCheck
                  size={18}
                  className="shrink-0 text-brand-yellow"
                  aria-hidden="true"
                />
                {service}
              </li>
            ))}
          </ul>

          <a
            href="#request-service"
            onClick={() => onSelectService(category.title)}
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-brand-yellow px-7 py-3.5 text-base font-bold text-brand-black transition-transform hover:scale-[1.02] active:scale-95"
          >
            Request Service
            <MdArrowForward size={18} />
          </a>
        </div>

        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative min-h-64 overflow-hidden rounded-2xl border border-brand-yellow/25 bg-gray-200 p-6 dark:bg-brand-dark"
          aria-label={`${scene.label}: ${scene.detail}`}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(rgba(250,204,21,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(250,204,21,0.15)_1px,transparent_1px)] bg-size-[28px_28px] opacity-30"
          />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center justify-between ">
              <span className="rounded-lg border border-brand-yellow/40 bg-brand-black/60 p-3 text-brand-yellow">
                <SceneIcon size={27} aria-hidden="true" />
              </span>
              <MdBuild
                size={22}
                className="text-brand-yellow/70"
                aria-hidden="true"
              />
            </div>
            <div className="my-7 grid grid-cols-4 gap-2" aria-hidden="true">
              {[0, 1, 2, 3].map((index) => (
                <span
                  key={index}
                  className={`h-12 rounded-md border ${index === 1 ? "border-brand-yellow bg-brand-yellow/25" : "border-gray-400 bg-white/50 dark:border-white/15 dark:bg-brand-black/50"}`}
                />
              ))}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-yellow">
                {scene.label} {/* Kept this small as it's an eyebrow */}
              </p>
              <p className="mt-2 text-base leading-7 text-gray-600 dark:text-brand-gray">
                {scene.detail}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="flex items-start gap-4 border-t border-black/10 pt-6 text-base leading-7 text-gray-600 dark:border-white/10 dark:text-brand-gray xl:col-span-2">
          <MdShield
            size={19}
            className="mt-1 shrink-0 text-brand-yellow"
            aria-hidden="true"
          />
          Complex electrical work should be assessed and carried out by a
          qualified professional.
        </div>
      </div>
    </div>
  );
}

function ServicesSection({ onSelectService }) {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0]);
  const id = useId();

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  return (
    <motion.section
      id="services"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="scroll-mt-24 bg-gray-100 py-24 dark:bg-brand-dark sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Service explorer"
          title="What do you need help with?"
          description="Choose a service area to see the kind of professional electrical support available."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible"
            role="tablist"
            aria-label="Electrical service categories"
          >
            {serviceCategories.map((category, index) => {
              const tabId = `${id}-tab-${index}`;
              const panelId = `${id}-panel-${index}`;
              return (
                <ServiceTab
                  key={category.id}
                  category={category}
                  isActive={category.id === activeCategory.id}
                  onSelect={handleCategoryChange}
                  tabId={tabId}
                  panelId={panelId}
                />
              );
            })}
          </div>

          {serviceCategories.map((category, index) => {
            const isActive = category.id === activeCategory.id;
            return isActive ? (
              <ServiceTabPanel
                key={category.id}
                category={category}
                scene={sceneByCategory[category.id]}
                panelId={`${id}-panel-${index}`}
                tabId={`${id}-tab-${index}`}
                onSelectService={onSelectService}
              />
            ) : null;
          })}
        </div>
      </div>
    </motion.section>
  );
}

export default ServicesSection;
