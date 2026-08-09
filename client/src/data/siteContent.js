export const serviceCategories = [
  {
    id: "home",
    label: "Home",
    title: "Residential electrical work, done with care.",
    description:
      "Safe, tidy electrical support for homes, upgrades, and everyday comfort.",
    services: ["Home wiring", "Switches and sockets", "Fan installation", "Lighting upgrades"],
  },
  {
    id: "office",
    label: "Office",
    title: "Power that keeps work moving.",
    description:
      "Practical power, lighting, and structured wiring for focused workplaces.",
    services: ["Office wiring", "Workstation power", "LED lighting", "Network cable routing"],
  },
  {
    id: "construction",
    label: "Construction",
    title: "Electrical infrastructure from the ground up.",
    description:
      "Planned wiring and distribution support for new builds and renovation projects.",
    services: ["Conduit routing", "Distribution planning", "New-build wiring", "Renovation upgrades"],
  },
  {
    id: "panel",
    label: "Panel",
    title: "Clearer, safer panel management.",
    description:
      "Professional assessment, installation, and repair for distribution boards and breakers.",
    services: ["DB installation", "MCB services", "Circuit inspection", "Load assessment"],
  },
  {
    id: "emergency",
    label: "Emergency",
    title: "When a fault needs professional attention.",
    description:
      "Fault diagnosis and repair support that puts electrical safety first.",
    services: ["Fault finding", "Power failure diagnosis", "Electrical repairs", "Safety assessment"],
  },
  {
    id: "lighting",
    label: "Lighting",
    title: "Lighting designed for the way you use a space.",
    description:
      "Functional, energy-conscious lighting installations for homes and workplaces.",
    services: ["LED lighting", "Fixture installation", "Lighting controls", "Smart-home electrical work"],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Request",
    description: "Tell us the service you need and the best way to contact you.",
  },
  {
    number: "02",
    title: "Assess",
    description: "We clarify the issue and discuss the appropriate next step.",
  },
  {
    number: "03",
    title: "Visit",
    description: "A qualified professional attends the property as arranged.",
  },
  {
    number: "04",
    title: "Solve",
    description: "The work is completed with attention to safety and the agreed scope.",
  },
  {
    number: "05",
    title: "Safe",
    description: "You receive a clear handover and know the work has been checked.",
  },
];

export const faqs = [
  {
    question: "What kinds of electrical work do you handle?",
    answer:
      "We cover residential, office, construction, lighting, panel, maintenance, and repair requests. The service request form will help us understand the scope before arranging a visit.",
  },
  {
    question: "Can I request help for an electrical fault?",
    answer:
      "Yes. Describe what you noticed, such as loss of power, tripping protection, damaged fittings, or unusual behaviour. Do not attempt to work on live electrical equipment yourself.",
  },
  {
    question: "Do you work on electrical panels and breakers?",
    answer:
      "Professional panel inspection, installation, and repair are part of the service scope. Electrical protection equipment should always be assessed by a qualified professional.",
  },
  {
    question: "How will I request a visit?",
    answer:
      "The next phase adds the full service-request form, including contact details, preferred timing, property type, and an optional image upload.",
  },
];

export const panelComponents = [
  {
    id: "main-breaker",
    label: "Main breaker",
    purpose: "The main breaker is the primary point for isolating the panel's electrical supply during professional service or an emergency response.",
    professionalNote: "Only a qualified professional should assess a panel, its supply, and any isolation procedure.",
  },
  {
    id: "rccb",
    label: "RCCB",
    purpose: "An RCCB is a protective device designed to respond to certain earth-leakage faults and improve electrical safety.",
    professionalNote: "Repeated tripping needs professional fault assessment; do not bypass protective devices.",
  },
  {
    id: "mcb",
    label: "MCB circuits",
    purpose: "MCBs protect individual circuits by interrupting power when the circuit experiences an abnormal electrical condition.",
    professionalNote: "The cause of a tripped breaker should be assessed before it is repeatedly reset.",
  },
  {
    id: "busbar",
    label: "Busbar",
    purpose: "A busbar distributes electrical supply within the panel to the protective devices that serve different circuits.",
    professionalNote: "Busbar work involves panel internals and must only be carried out by qualified professionals.",
  },
  {
    id: "neutral-bar",
    label: "Neutral bar",
    purpose: "The neutral bar provides an organised connection point for neutral conductors in the distribution system.",
    professionalNote: "Loose or damaged connections can be hazardous and need professional inspection.",
  },
  {
    id: "earth-connection",
    label: "Earth connection",
    purpose: "The earth connection forms part of the system that helps reduce risk from electrical faults by providing a protective path.",
    professionalNote: "Never disconnect or alter an earth connection yourself; request a qualified assessment instead.",
  },
  {
    id: "distribution-circuits",
    label: "Distribution circuits",
    purpose: "Distribution circuits carry protected power from the panel to areas such as lighting, sockets, and dedicated equipment.",
    professionalNote: "Circuit identification and alterations should be documented and completed professionally.",
  },
];
