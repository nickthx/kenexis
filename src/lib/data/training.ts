import type { SEOMeta } from "./types";

export interface TrainingCourse {
  id: string;
  name: string;
  description: string;
  format: "online-on-demand";
  category: "process-safety" | "software-training" | "fire-gas";
  relatedProductId?: string;
}

export interface TrainingInfo {
  format: string;
  pricing: string;
  trialInfo: string;
  certificates: string;
}

export interface KenexisUnlimited {
  name: string;
  description: string;
  includes: string[];
  pricingNote: string;
}

export const trainingInfo: TrainingInfo = {
  format:
    "Online on-demand with video instruction, downloadable content, and quizzes",
  pricing: "$950 USD/year per person",
  trialInfo: "3-day trial available",
  certificates: "Completion certificates provided upon course completion",
};

export const trainingCourses: TrainingCourse[] = [
  {
    id: "lopa-participant",
    name: "Layer of Protection Analysis (LOPA) Participant Training",
    description:
      "Comprehensive training on Layer of Protection Analysis methodology for process safety professionals participating in LOPA workshops",
    format: "online-on-demand",
    category: "process-safety",
  },
  {
    id: "sis-overview",
    name: "Safety Instrumented Systems Overview and Awareness",
    description:
      "Foundational course covering SIS concepts, terminology, and lifecycle phases for personnel working with safety instrumented systems",
    format: "online-on-demand",
    category: "process-safety",
  },
  {
    id: "srs",
    name: "Safety Requirements Specifications (SRS)",
    description:
      "Training on developing and documenting Safety Requirements Specifications for safety instrumented functions",
    format: "online-on-demand",
    category: "process-safety",
  },
  {
    id: "security-pha",
    name: "Security PHA Review",
    description:
      "Training on conducting security-focused Process Hazards Analysis reviews for cybersecurity risk assessment of process control systems",
    format: "online-on-demand",
    category: "process-safety",
  },
  {
    id: "sil-verification",
    name: "SIL Verification",
    description:
      "Training on Safety Integrity Level verification calculations and methodologies per ISA TR84.00.02",
    format: "online-on-demand",
    category: "process-safety",
  },
  {
    id: "sis-maintenance",
    name: "SIS Maintenance, Management, and Operations Responsibilities",
    description:
      "Training on the ongoing responsibilities for maintaining, managing, and operating safety instrumented systems throughout their lifecycle",
    format: "online-on-demand",
    category: "process-safety",
  },
  {
    id: "effigy-training",
    name: "Effigy Software Training",
    description:
      "Comprehensive training on using the Effigy fire and gas mapping software for detection system design and coverage analysis",
    format: "online-on-demand",
    category: "software-training",
    relatedProductId: "effigy",
  },
  {
    id: "open-pha-training",
    name: "Open-PHA Software Training",
    description:
      "Training on using Open-PHA software for Process Hazards Analysis management, including HAZOP, LOPA, and checklist studies",
    format: "online-on-demand",
    category: "software-training",
    relatedProductId: "open-pha",
  },
  {
    id: "vertigo-training",
    name: "Vertigo Software Training",
    description:
      "Training on using Vertigo software for SIS lifecycle management, SIL verification, and safety requirements documentation",
    format: "online-on-demand",
    category: "software-training",
    relatedProductId: "vertigo",
  },
  {
    id: "bowtie-open-pha",
    name: "Bowtie for Open-PHA",
    description:
      "Specialized training on creating and managing bowtie diagrams within the Open-PHA software environment",
    format: "online-on-demand",
    category: "software-training",
    relatedProductId: "open-pha",
  },
  {
    id: "fire-detector-coverage",
    name: "Fire Detector Coverage Calculations",
    description:
      "Training on calculating fire detector coverage for performance-based fire detection system design",
    format: "online-on-demand",
    category: "fire-gas",
  },
  {
    id: "intro-fire-gas-mapping",
    name: "Introduction to Fire and Gas Mapping",
    description:
      "Foundational course on fire and gas mapping concepts, methodologies, and ISA TR84.00.07 requirements",
    format: "online-on-demand",
    category: "fire-gas",
  },
  {
    id: "isa-tr84-changes",
    name: "ISA TR 84.00.07-2019 Changes",
    description:
      "Training on the updates and changes in the ISA TR 84.00.07-2019 standard for fire and gas system engineering",
    format: "online-on-demand",
    category: "fire-gas",
  },
  {
    id: "open-pha-custom-reporting",
    name: "Open-PHA Custom Reporting",
    description:
      "Advanced training on creating custom reports and templates within the Open-PHA software platform",
    format: "online-on-demand",
    category: "software-training",
    relatedProductId: "open-pha",
  },
  {
    id: "gas-detector-placement",
    name: "Gas Detector Placement",
    description:
      "Training on gas detector placement strategies and methodologies for effective gas detection system design",
    format: "online-on-demand",
    category: "fire-gas",
  },
  {
    id: "opscope-procedure",
    name: "OpScope Procedure Design & Execution",
    description:
      "Training on OpScope methodology for designing and executing operational safety procedures in process facilities",
    format: "online-on-demand",
    category: "process-safety",
  },
];

export const kenexisUnlimited: KenexisUnlimited = {
  name: "Kenexis Unlimited",
  description:
    "Access all Kenexis software products and training courses with a single subscription. Kenexis Unlimited provides unlimited users, full software access, and complete training library access with migration services included.",
  includes: [
    "All seven KISS platform software products",
    "All process safety training courses",
    "Unlimited user seats",
    "Migration services for legacy studies",
    "Priority technical support",
  ],
  pricingNote: "Contact for quote",
};

export const trainingSEO: SEOMeta = {
  title: "Process Safety Training Center - Kenexis",
  description:
    "Online on-demand process safety training courses covering PHA, SIS, fire & gas mapping, and Kenexis software products. $950/year per person.",
  ogImage: "/images/stock/training-hero.jpg",
};
