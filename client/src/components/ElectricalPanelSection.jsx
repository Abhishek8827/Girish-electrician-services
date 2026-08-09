import { motion } from "framer-motion";
import { CircuitBoard, Info } from "lucide-react";
import { useState } from "react";
import { panelComponents } from "../data/siteContent";
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
    <section
      id="panel-demo" // Note: The user mentioned a navbar overlap issue. The `scroll-mt-24` class is the standard way to handle this for sticky navbars.
      className="scroll-mt-24 bg-brand-black py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Panel demonstration"
          title="Explore a modern electrical distribution panel."
          description="Select a labelled part of this simplified visual to understand its role in a professional electrical system."
          align="center"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {/* Left Column: Panel Visualization */}
          <div className="rounded-3xl border border-white/10 bg-brand-dark p-4 sm:p-6">
            <div
              className="rounded-xl border-4 border-[#3b4142] bg-[#171c1d] p-4 shadow-2xl sm:p-6"
              aria-label="Simplified electrical panel diagram"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <CircuitBoard
                    size={20}
                    className="text-brand-yellow"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-bold tracking-wide">
                    DISTRIBUTION PANEL
                  </span>
                </div>
                <span className="text-xs font-bold text-brand-gray">
                  EDUCATIONAL DEMO
                </span>
              </div>

              {/* Compact Panel Grid */}
              <div className="mt-5 grid grid-cols-6 gap-2 sm:gap-3">
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
                Explore by category
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {Object.values(componentCategories)
                  .flat()
                  .map((component) => (
                    <button
                      key={component.id}
                      type="button"
                      onClick={() => setSelectedId(component.id)}
                      aria-pressed={component.id === selectedId}
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${component.id === selectedId ? "border-brand-yellow bg-brand-yellow text-brand-black" : "border-white/15 text-brand-gray hover:border-brand-yellow/50 hover:text-brand-white"}`}
                    >
                      {component.label}
                    </button>
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
            className="sticky top-28 rounded-3xl border border-brand-yellow/30 bg-brand-dark p-7 sm:p-8"
            aria-labelledby="selected-component-title"
            aria-live="assertive"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-yellow text-brand-black">
              <Info size={22} aria-hidden="true" />
            </div>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">
              Selected component
            </p>
            <h3
              id="selected-component-title"
              className="mt-2 text-3xl font-extrabold"
            >
              {selectedComponent.label}
            </h3>
            <p className="mt-1 text-sm font-bold text-brand-gray">
              {selectedComponent.category}
            </p>

            {selectedComponent.image && (
              <figure className="mt-5 overflow-hidden rounded-xl border border-white/10">
                <img
                  src={selectedComponent.image}
                  alt={selectedComponent.label}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                />
              </figure>
            )}

            <p className="mt-5 leading-7 text-brand-gray">
              {selectedComponent.purpose}
            </p>

            <div className="mt-6 border-t border-white/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow">
                Professional safety note
              </p>
              <p className="mt-3 text-sm leading-6 text-brand-white">
                {selectedComponent.professionalNote}
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function PanelPart({ id, className, selectedId, onSelect }) {
  const component = panelComponents.find((item) => item.id === id);
  if (!component) return null;
  const isSelected = selectedId === id;

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      aria-pressed={isSelected}
      className={`${className} relative flex h-16 items-end overflow-hidden rounded-lg border p-2.5 text-left transition-colors sm:h-20 ${isSelected ? "border-brand-yellow bg-brand-yellow/15" : "border-white/15 bg-brand-black/35 hover:border-brand-yellow/50"}`}
    >
      <span
        aria-hidden="true"
        className={`absolute left-2.5 right-2.5 top-2.5 h-1 rounded-full ${isSelected ? "bg-brand-yellow" : "bg-white/20"}`}
      />
      <span className="text-[11px] font-bold uppercase leading-tight tracking-wider text-brand-white">
        {component.label}
      </span>
    </button>
  );
}

export default ElectricalPanelSection;
