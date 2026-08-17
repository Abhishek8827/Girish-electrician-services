import { motion } from "framer-motion";
import { useState } from "react";
import { panelComponents } from "../data/siteContent";
import { MdDeveloperBoard, MdInfoOutline } from "react-icons/md";
import SectionHeading from "./SectionHeading";

function ElectricalPanelSection() {
  const [selectedId, setSelectedId] = useState("main-breaker");
  const selectedComponent =
    panelComponents.find((component) => component.id === selectedId) ||
    panelComponents[0];
  const componentCategories = panelComponents.reduce(
    (categories, component) => {
      categories[component.category] = [
        ...(categories[component.category] || []),
        component,
      ];
      return categories;
    },
    {},
  );

  return (
    <motion.section
      id="panel-demo" // Note: The user mentioned a navbar overlap issue. The `scroll-mt-24` class is the standard way to handle this for sticky navbars.
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }} // Increased section padding
      className="scroll-mt-24 bg-white py-24 dark:bg-brand-black sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Panel demonstration"
          title="Explore a modern electrical distribution panel."
          description="Select a labelled part of this simplified visual to understand its role in a professional electrical system."
          align="center"
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {" "}
          {/* Increased grid gap */}
          {/* Left Column: Panel Visualization */}
          <div className="rounded-3xl border border-black/10 bg-gray-100 p-5 dark:border-white/10 dark:bg-brand-dark sm:p-7">
            {" "}
            {/* Increased padding */}
            <div
              className="rounded-xl border-4 border-gray-300 bg-gray-200 p-5 shadow-2xl dark:border-[#3b4142] dark:bg-[#171c1d] sm:p-7" // Increased padding
              aria-label="Simplified electrical panel diagram"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <MdDeveloperBoard
                    size={20}
                    className="text-brand-yellow"
                    aria-hidden="true"
                  />
                  <span className="text-base font-bold tracking-wide text-gray-900 dark:text-white">
                    {" "}
                    {/* Increased font size */}
                    DISTRIBUTION PANEL
                  </span>
                </div>
                <span className="text-sm font-bold text-gray-600 dark:text-brand-gray">
                  {" "}
                  {/* Increased font size */}
                  EDUCATIONAL DEMO
                </span>
              </div>
              {/* Compact Panel Grid */} {/* Increased gap */}
              <div className="mt-5 grid grid-cols-6 gap-3 sm:gap-4">
                <PanelPart
                  id="main-breaker"
                  className="col-span-3"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="rccb"
                  className="col-span-3"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="rcbo-unit"
                  className="col-span-2"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="surge-protector"
                  className="col-span-2"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="phase-indicators"
                  className="col-span-2"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="mcb"
                  className="col-span-3"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="distribution-circuits"
                  className="col-span-3"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="busbar"
                  className="col-span-6"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="neutral-bar"
                  className="col-span-3"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="earth-connection"
                  className="col-span-3"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="terminal-blocks"
                  className="col-span-3"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="cable-glands"
                  className="col-span-3"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="wiring-ducts"
                  className="col-span-6"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="din-rail"
                  className="col-span-6"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
                <PanelPart
                  id="panel-enclosure"
                  className="col-span-6"
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>
            </div>
            {/* Compact Component Selector */}
            <section
              className="mt-6 border-t border-white/10 pt-6"
              aria-labelledby="component-categories-title"
            >
              <h3
                id="component-categories-title"
                className="text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow"
              >
                {" "}
                {/* Increased font size */}
                Explore by category
              </h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {" "}
                {/* Increased gap */}
                {Object.values(componentCategories)
                  .flat()
                  .map((component) => (
                    <motion.button
                      key={component.id}
                      type="button"
                      onClick={() => setSelectedId(component.id)}
                      aria-pressed={component.id === selectedId}
                      className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${component.id === selectedId ? "border-brand-yellow bg-brand-yellow text-brand-black" : "border-gray-300 text-gray-500 hover:border-brand-yellow/50 hover:text-gray-900 dark:border-white/15 dark:text-brand-gray dark:hover:text-brand-white"}`} // Increased padding and font size
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      {component.label}
                    </motion.button>
                  ))}
              </div>
            </section>
          </div>
          {/* Right Column: Information Card */}
          <motion.aside
            key={selectedComponent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="sticky top-28 rounded-3xl border border-brand-yellow/30 bg-gray-100 p-8 dark:bg-brand-dark sm:p-9" // Increased padding
            aria-labelledby="selected-component-title"
            aria-live="assertive"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-yellow text-brand-black">
              <MdInfoOutline size={22} aria-hidden="true" />
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
              Selected component {/* Kept this small as it's an eyebrow */}
            </p>
            <h3
              id="selected-component-title"
              className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white" // Increased font size
            >
              {selectedComponent.label}
            </h3>
            <p className="mt-1 text-sm font-bold text-gray-600 dark:text-brand-gray">
              {selectedComponent.category}
            </p>

            {selectedComponent.image && (
              <figure className="mt-5 overflow-hidden rounded-xl border border-white/10">
                <img
                  src={selectedComponent.image}
                  alt={`${selectedComponent.label} - electrical panel component for ${selectedComponent.category}`}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            )}

            <p className="mt-5 leading-8 text-gray-600 dark:text-brand-gray">
              {" "}
              {/* Increased line-height */}
              {selectedComponent.purpose}
            </p>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow">
                Professional safety note{" "}
                {/* Kept this small as it's an eyebrow */}
              </p>
              <p className="mt-3 text-base leading-7 text-gray-800 dark:text-brand-white">
                {" "}
                {/* Increased font size and line-height */}
                {selectedComponent.professionalNote}
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.section>
  );
}

function PanelPart({ id, className, selectedId, onSelect }) {
  const component = panelComponents.find((item) => item.id === id);
  if (!component) return null;
  const isSelected = selectedId === id;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(id)}
      aria-pressed={isSelected}
      className={`${className} relative flex h-18 items-end overflow-hidden rounded-lg border p-2.5 text-left transition-colors sm:h-22 ${isSelected ? "border-brand-yellow bg-brand-yellow/15" : "border-gray-300 bg-gray-200 hover:border-brand-yellow/50 dark:border-white/15 dark:bg-brand-black/35 dark:hover:border-brand-yellow/50"}`} // Increased height for better tap target
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span
        aria-hidden="true"
        className={`absolute left-2.5 right-2.5 top-2.5 h-1 rounded-full ${isSelected ? "bg-brand-yellow" : "bg-white/20"}`}
      />
      <span className="text-xs font-bold uppercase leading-tight tracking-wider text-gray-800 dark:text-brand-white">
        {" "}
        {/* Increased font size */}
        {component.label}
      </span>
    </motion.button>
  );
}

export default ElectricalPanelSection;
