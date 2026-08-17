export const serviceCategories = [
  {
    id: "home",
    label: "Home",
    title: "Residential electrical work, done with care.",
    description:
      "Safe, tidy electrical support for homes, upgrades, and everyday comfort.",
    services: [
      "Home wiring",
      "Switches and sockets",
      "Fan installation",
      "Lighting upgrades",
    ],
  },
  {
    id: "office",
    label: "Office",
    title: "Power that keeps work moving.",
    description:
      "Practical power, lighting, and structured wiring for focused workplaces.",
    services: [
      "Office wiring",
      "Workstation power",
      "LED lighting",
      "Network cable routing",
    ],
  },
  {
    id: "construction",
    label: "Construction",
    title: "Electrical infrastructure from the ground up.",
    description:
      "Planned wiring and distribution support for new builds and renovation projects.",
    services: [
      "Conduit routing",
      "Distribution planning",
      "New-build wiring",
      "Renovation upgrades",
    ],
  },
  {
    id: "panel",
    label: "Panel",
    title: "Clearer, safer panel management.",
    description:
      "Professional assessment, installation, and repair for distribution boards and breakers.",
    services: [
      "DB installation",
      "MCB services",
      "Circuit inspection",
      "Load assessment",
    ],
  },
  {
    id: "emergency",
    label: "Emergency",
    title: "When a fault needs professional attention.",
    description:
      "Fault diagnosis and repair support that puts electrical safety first.",
    services: [
      "Fault finding",
      "Power failure diagnosis",
      "Electrical repairs",
      "Safety assessment",
    ],
  },
  {
    id: "lighting",
    label: "Lighting",
    title: "Lighting designed for the way you use a space.",
    description:
      "Functional, energy-conscious lighting installations for homes and workplaces.",
    services: [
      "LED lighting",
      "Fixture installation",
      "Lighting controls",
      "Smart-home electrical work",
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Request",
    description:
      "Tell us the service you need and the best way to contact you.",
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
    description:
      "The work is completed with attention to safety and the agreed scope.",
  },
  {
    number: "05",
    title: "Safe",
    description:
      "You receive a clear handover and know the work has been checked.",
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
      "Use the service request form on our website. Provide your contact details, describe the issue, and choose a preferred time. You can also upload an image to help us understand the problem.",
  },
];

export const panelComponents = [
  {
    id: "main-breaker",
    label: "Main breaker",
    category: "Protection & isolation",
    purpose:
      "The main breaker is the primary point for isolating the panel's electrical supply during professional service or an emergency response.",
    professionalNote:
      "Only a qualified professional should assess a panel, its supply, and any isolation procedure.",
    image: "/panel-images/main-breaker.png",
  },
  {
    id: "rccb",
    label: "RCCB",
    category: "Protection & isolation",
    purpose:
      "An RCCB is a protective device designed to respond to certain earth-leakage faults and improve electrical safety.",
    professionalNote:
      "Repeated tripping needs professional fault assessment; do not bypass protective devices.",
    image: "/panel-images/rccb.png",
  },
  {
    id: "mcb",
    label: "MCB circuits",
    category: "Circuit distribution",
    purpose:
      "MCBs protect individual circuits by interrupting power when the circuit experiences an abnormal electrical condition.",
    professionalNote:
      "The cause of a tripped breaker should be assessed before it is repeatedly reset.",
    image: "/panel-images/mcb.png",
  },
  {
    id: "busbar",
    label: "Busbar",
    category: "Circuit distribution",
    purpose:
      "A busbar distributes electrical supply within the panel to the protective devices that serve different circuits.",
    professionalNote:
      "Busbar work involves panel internals and must only be carried out by qualified professionals.",
    image: "/panel-images/busbar.png",
  },
  {
    id: "neutral-bar",
    label: "Neutral bar",
    category: "Connection system",
    purpose:
      "The neutral bar provides an organised connection point for neutral conductors in the distribution system.",
    professionalNote:
      "Loose or damaged connections can be hazardous and need professional inspection.",
    image: "/panel-images/neutral-bar.png",
  },
  {
    id: "earth-connection",
    label: "Earth connection",
    category: "Connection system",
    purpose:
      "The earth connection forms part of the system that helps reduce risk from electrical faults by providing a protective path.",
    professionalNote:
      "Never disconnect or alter an earth connection yourself; request a qualified assessment instead.",
    image: "/panel-images/earth-connection.png",
  },
  {
    id: "distribution-circuits",
    label: "Distribution circuits",
    category: "Circuit distribution",
    purpose:
      "Distribution circuits carry protected power from the panel to areas such as lighting, sockets, and dedicated equipment.",
    professionalNote:
      "Circuit identification and alterations should be documented and completed professionally.",
    image: "/panel-images/distribution-circuits.png",
  },
  {
    id: "surge-protector",
    label: "Surge protector",
    category: "Protection & isolation",
    purpose:
      "A Surge Protection Device (SPD) is designed to protect electrical equipment from voltage spikes or transient overvoltages.",
    professionalNote:
      "The correct selection and installation of an SPD is critical for its effectiveness and should be performed by a qualified professional.",
    image: "/panel-images/surge-protector.png",
  },
  {
    id: "wiring-ducts",
    label: "Wiring ducts",
    category: "Connection system",
    purpose:
      "Wiring ducts or trunking provide a neat and protected channel for routing wires within the panel, improving organisation and safety.",
    professionalNote:
      "Properly sized and installed ducts prevent wire damage and overheating. Overcrowding should be avoided.",
    image: "/panel-images/wiring-ducts.png",
  },
  {
    id: "din-rail",
    label: "DIN Rail",
    category: "Mounting system",
    purpose:
      "A DIN rail is a standardized metal rail used for mounting circuit breakers and other industrial control equipment inside a panel.",
    professionalNote:
      "Secure mounting on a DIN rail is essential for component stability and proper alignment. Rails should be cut and installed correctly.",
    image: "/panel-images/din-rail.png",
  },
  {
    id: "terminal-blocks",
    label: "Terminal Blocks",
    category: "Connection system",
    purpose:
      "Terminal blocks are modular, insulated blocks that secure two or more wires together, providing a safe and organized connection point.",
    professionalNote:
      "Connections must be torqued to the manufacturer's specification to prevent overheating from loose connections.",
    image: "/panel-images/terminal-blocks.png",
  },
  {
    id: "rcbo-unit",
    label: "RCBO",
    category: "Protection & isolation",
    purpose:
      "An RCBO combines the functions of an MCB and an RCCB into a single unit, providing protection against both overcurrents and earth leakage faults.",
    professionalNote:
      "RCBOs offer a high level of safety for individual circuits and are often used in modern installations. Selection must match circuit requirements.",
    image: "/panel-images/rcbo.png",
  },
  {
    id: "phase-indicators",
    label: "Phase Indicators",
    category: "Circuit distribution",
    purpose:
      "Phase indicator lights show the presence of voltage on the incoming phases, helping to quickly verify that the panel is live.",
    professionalNote:
      "While useful for a quick visual check, they are not a substitute for proper voltage testing with a calibrated meter.",
    image: "/panel-images/phase-indicators.png",
  },
  {
    id: "cable-glands",
    label: "Cable Glands",
    category: "Connection system",
    purpose:
      "Cable glands are used to attach and secure the end of an electrical cable to the equipment, providing strain-relief and sealing.",
    professionalNote:
      "Properly installed glands protect the cable and enclosure from moisture, dust, and mechanical stress.",
    image: "/panel-images/cable-glands.png",
  },
  {
    id: "panel-enclosure",
    label: "Panel Enclosure",
    category: "Mounting system",
    purpose:
      "The enclosure is the physical housing of the panel, protecting the components from the environment and preventing accidental contact.",
    professionalNote:
      "Enclosures must have an appropriate IP rating for the installation environment and be securely earthed.",
    image: "/panel-images/panel-enclosure.png",
  },
];

export const testimonials = [
  {
    quote:
      "The team was incredibly professional and tidy. They fixed a complex wiring issue in our old house that others couldn't diagnose. Highly recommended for their expertise and clear communication.",
    name: "Priya Sharma",
    service: "Residential Fault Finding",
    image: "/testimonials/priya-sharma.png",
  },
  {
    quote:
      "Fast, efficient, and very safety-conscious. They upgraded the entire lighting system in our office over a weekend with minimal disruption. The result is fantastic.",
    name: "Amit Singh",
    service: "Commercial Lighting Upgrade",
    image: "/testimonials/amit-singh.png",
  },
  {
    quote:
      "From the initial request to the final handover, the process was seamless. The electrician who visited was knowledgeable and explained everything clearly. I felt confident in their work.",
    name: "Rohan Desai",
    service: "Panel & MCB Service",
    image: "/testimonials/rohan-desai.png",
  },
  {
    quote:
      "I was impressed with the quick response for an emergency callout. The issue was resolved safely and efficiently. Girish Electrician Services is now my go-to for any electrical needs.",
    name: "Anjali Mehta",
    service: "Emergency Electrical Support",
    image: "/testimonials/anjali-mehta.png",
  },
  {
    quote:
      "They installed new ceiling fans and sockets throughout our new apartment. The work was neat, and they cleaned up perfectly afterwards. Very professional service.",
    name: "Vikram Patel",
    service: "Home Wiring & Installation",
    image: "/testimonials/vikram-patel.png",
  },
  {
    quote:
      "Our office's network cabling was a mess. The team came in and organized everything with new trunking and structured cabling. Our connectivity issues are finally gone!",
    name: "Sunita Rao",
    service: "Office Network Cabling",
    image: "/testimonials/sunita-rao.png",
  },
  {
    quote:
      "The safety inspection was thorough and gave us peace of mind. They identified a potential hazard we were unaware of and fixed it on the spot. Excellent service.",
    name: "Rajesh Kumar",
    service: "Electrical Safety Inspection",
    image: "/testimonials/rajesh-kumar.png",
  },
  {
    quote:
      "We had a complete panel upgrade. The process was smooth and well-planned. The new distribution board is much safer and more organized. I'm very satisfied with the quality of work.",
    name: "Deepika Iyer",
    service: "Electrical Panel Upgrade",
    image: "/testimonials/deepika-iyer.png",
  },
];
