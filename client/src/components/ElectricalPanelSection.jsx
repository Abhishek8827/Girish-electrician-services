import { motion } from "framer-motion";
import { CircuitBoard, Info, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { panelComponents } from "../data/siteContent";
import SectionHeading from "./SectionHeading";

function ElectricalPanelSection() {
  const [selectedId, setSelectedId] = useState("main-breaker");
  const selectedComponent = panelComponents.find((component) => component.id === selectedId) || panelComponents[0];

  return (
    <section id="panel-demo" className="scroll-mt-24 bg-brand-black py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <SectionHeading
            eyebrow="Panel demonstration"
            title="Explore a modern electrical distribution panel."
            description="Select a labelled part of this simplified visual to understand its general role in a professional electrical system."
          />
          <div className="flex items-start gap-3 rounded-2xl border border-brand-yellow/30 bg-brand-yellow/10 p-4 text-sm leading-6 text-brand-gray">
            <ShieldCheck size={20} className="mt-0.5 shrink-0 text-brand-yellow" aria-hidden="true" />
            This is an educational visual only. Do not open, alter, or work inside an electrical panel yourself.
          </div>
        </div>

        <div className="mt-12 grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.75fr)]">
          <div className="rounded-3xl border border-white/10 bg-brand-dark p-4 sm:p-7">
            <div className="rounded-2xl border-4 border-[#3b4142] bg-[#171c1d] p-4 shadow-2xl sm:p-7" aria-label="Simplified electrical panel diagram">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3"><CircuitBoard size={23} className="text-brand-yellow" aria-hidden="true" /><span className="text-sm font-bold tracking-wide">DISTRIBUTION PANEL</span></div>
                <span className="text-xs font-bold text-brand-gray">EDUCATIONAL DEMO</span>
              </div>

              <div className="mt-6 grid grid-cols-6 gap-3 sm:gap-4">
                <PanelPart componentId="main-breaker" className="col-span-3 min-h-24" selectedId={selectedId} onSelect={setSelectedId} />
                <PanelPart componentId="rccb" className="col-span-3 min-h-24" selectedId={selectedId} onSelect={setSelectedId} />
                <PanelPart componentId="busbar" className="col-span-6 min-h-12" selectedId={selectedId} onSelect={setSelectedId} />
                <PanelPart componentId="mcb" className="col-span-3 min-h-28" selectedId={selectedId} onSelect={setSelectedId} />
                <PanelPart componentId="distribution-circuits" className="col-span-3 min-h-28" selectedId={selectedId} onSelect={setSelectedId} />
                <PanelPart componentId="neutral-bar" className="col-span-3 min-h-20" selectedId={selectedId} onSelect={setSelectedId} />
                <PanelPart componentId="earth-connection" className="col-span-3 min-h-20" selectedId={selectedId} onSelect={setSelectedId} />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2" aria-label="Panel parts">
              {panelComponents.map((component) => (
                <button
                  key={component.id}
                  type="button"
                  onClick={() => setSelectedId(component.id)}
                  aria-pressed={component.id === selectedId}
                  className={`rounded-full border px-3 py-2 text-xs font-bold transition-colors ${component.id === selectedId ? "border-brand-yellow bg-brand-yellow text-brand-black" : "border-white/15 text-brand-gray hover:border-brand-yellow/50 hover:text-brand-white"}`}
                >
                  {component.label}
                </button>
              ))}
            </div>
          </div>

          <motion.aside
            key={selectedComponent.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl border border-brand-yellow/30 bg-brand-dark p-7 sm:p-9"
            aria-live="polite"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-yellow text-brand-black"><Info size={22} aria-hidden="true" /></div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-brand-yellow">Selected component</p>
            <h3 className="mt-3 text-3xl font-extrabold">{selectedComponent.label}</h3>
            <p className="mt-6 leading-8 text-brand-gray">{selectedComponent.purpose}</p>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-yellow">Professional safety note</p>
              <p className="mt-3 leading-7 text-brand-white">{selectedComponent.professionalNote}</p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function PanelPart({ componentId, className, selectedId, onSelect }) {
  const component = panelComponents.find((item) => item.id === componentId);
  const isSelected = selectedId === componentId;

  return (
    <button
      type="button"
      onClick={() => onSelect(componentId)}
      aria-pressed={isSelected}
      className={`${className} relative overflow-hidden rounded-xl border p-3 text-left transition-colors ${isSelected ? "border-brand-yellow bg-brand-yellow/15" : "border-white/15 bg-brand-black/35 hover:border-brand-yellow/50"}`}
    >
      <span aria-hidden="true" className={`absolute inset-x-3 top-3 h-1 rounded-full ${isSelected ? "bg-brand-yellow" : "bg-white/20"}`} />
      <span className="absolute bottom-3 left-3 text-xs font-bold uppercase tracking-wider text-brand-white">{component.label}</span>
      {(componentId === "mcb" || componentId === "distribution-circuits") && <span aria-hidden="true" className="absolute bottom-3 right-3 flex gap-1">{[0, 1, 2].map((index) => <i key={index} className={`h-6 w-2 rounded-sm ${isSelected ? "bg-brand-yellow/80" : "bg-white/25"}`} />)}</span>}
    </button>
  );
}

export default ElectricalPanelSection;
