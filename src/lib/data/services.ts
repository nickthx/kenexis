import type { SEOMeta } from "./types";

export interface SubService {
  name: string;
  description: string;
}

export interface ServiceArea {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  methodology: string[];
  subServices: SubService[];
  deliverables: string[];
  relatedServiceIds: string[];
  heroImage: string;
  icon: string;
  seo: SEOMeta;
}

export const serviceAreas: ServiceArea[] = [
  {
    id: "pha",
    name: "Process Hazards Analysis",
    slug: "pha",
    shortDescription:
      "Systematic approach to identifying and evaluating potential risks in industrial processes",
    fullDescription:
      "Kenexis provides Process Hazards Analysis facilitation and documentation aligned with ISA/IEC 61511 and OSHA PSM. Our experienced facilitators lead workshops that identify hazards, evaluate risks, and recommend safeguards across the full lifecycle of chemical process facilities.",
    methodology: [
      "Hazard Identification (HAZID)",
      "Hazard and Operability Studies (HAZOP)",
      "Layer of Protection Analysis (LOPA)",
      "Quantitative Risk Analysis (QRA)",
      "PHA Auditing and Revalidation",
    ],
    subServices: [
      {
        name: "HAZID Studies",
        description:
          "Hazard Identification studies to systematically identify potential hazards early in the design lifecycle",
      },
      {
        name: "HAZOP Studies",
        description:
          "Hazard and Operability studies using guide words to identify deviations from design intent and their consequences",
      },
      {
        name: "LOPA",
        description:
          "Layer of Protection Analysis to evaluate the adequacy of independent protection layers against identified hazard scenarios",
      },
      {
        name: "QRA",
        description:
          "Quantitative Risk Analysis providing probabilistic assessment of risk levels for facility siting and safety decisions",
      },
      {
        name: "Auditing",
        description:
          "PHA audit and revalidation services to ensure ongoing compliance with OSHA PSM and industry standards",
      },
      {
        name: "Continuing Engineering Support",
        description:
          "Ongoing process safety engineering support for Management of Change and facility modifications",
      },
    ],
    deliverables: [
      "Facilitated workshop documentation",
      "SIL calculations and verification",
      "Risk assessments and matrices",
      "Functional Safety Management maintenance support",
    ],
    relatedServiceIds: ["sis", "qra"],
    heroImage: "/images/stock/services-hero.jpg",
    icon: "shield",
    seo: {
      title: "Process Hazards Analysis (PHA) Services - Kenexis",
      description:
        "Expert PHA facilitation including HAZOP, LOPA, and QRA studies aligned with ISA/IEC 61511 and OSHA PSM requirements.",
      ogImage: "/images/stock/services-hero.jpg",
    },
  },
  {
    id: "qra",
    name: "Quantitative Risk Analysis",
    slug: "qra",
    shortDescription:
      "Advanced probabilistic evaluation quantifying risk through detailed modeling",
    fullDescription:
      "Kenexis delivers Quantitative Risk Analysis services that provide a rigorous, probabilistic evaluation of facility risks. Our QRA studies quantify risk through detailed modeling of release scenarios, dispersion patterns, and consequence analysis to support facility siting, land use planning, and safety investment decisions.",
    methodology: [
      "Failure Mode and Effects Analysis (FMEA)",
      "Facility Siting per API RP 752",
      "Gaussian Dispersion Modeling",
      "Computational Fluid Dynamics (CFD)",
      "Consequence Analysis",
    ],
    subServices: [
      {
        name: "FMEA",
        description:
          "Failure Mode and Effects Analysis to systematically evaluate potential failure modes and their impact on system performance",
      },
      {
        name: "Facility Siting",
        description:
          "Facility siting studies per API RP 752 to evaluate building occupant vulnerability to potential explosion, fire, and toxic release events",
      },
      {
        name: "Gaussian Modeling",
        description:
          "Atmospheric dispersion modeling using Gaussian distribution methods to predict toxic and flammable gas concentrations",
      },
      {
        name: "CFD Analysis",
        description:
          "Computational Fluid Dynamics analysis for complex geometries and ventilation scenarios requiring detailed flow modeling",
      },
      {
        name: "Continuing Engineering Support",
        description:
          "Ongoing QRA support for facility modifications, Management of Change evaluations, and risk reassessment",
      },
    ],
    deliverables: [
      "Quantified risk contour maps",
      "Individual and societal risk calculations",
      "Facility siting reports per API RP 752",
      "Consequence analysis documentation",
    ],
    relatedServiceIds: ["pha", "sis"],
    heroImage: "/images/stock/services-hero.jpg",
    icon: "chart-bar",
    seo: {
      title: "Quantitative Risk Analysis (QRA) Services - Kenexis",
      description:
        "Rigorous QRA studies including FMEA, facility siting, dispersion modeling, and consequence analysis per OSHA PSM and API standards.",
      ogImage: "/images/stock/services-hero.jpg",
    },
  },
  {
    id: "fire-gas-mapping",
    name: "Fire & Gas Mapping",
    slug: "fire-gas-mapping",
    shortDescription:
      "Performance-based fire and gas detection mapping per ISA TR84.00.07",
    fullDescription:
      "Kenexis specializes in performance-based fire and gas detection mapping per ISA TR84.00.07. Using our proprietary Effigy software, we design detection systems that achieve specified coverage grades through both scenario-based and geographical approaches, ensuring optimal detector placement for fire and gas hazards.",
    methodology: [
      "Detection Philosophy Development",
      "Hazard Assessment and Scenario Selection",
      "Detector Technology Selection",
      "Performance Target Setting",
      "Coverage Mapping and Optimization",
      "Detector Location Specification",
      "Management of Change Procedures",
      "Periodic Re-evaluation",
    ],
    subServices: [
      {
        name: "Scenario Coverage Analysis",
        description:
          "Evaluating detector coverage against specific release scenarios to ensure adequate detection probability",
      },
      {
        name: "Geographical Coverage Analysis",
        description:
          "Mapping detector coverage across the facility geography to identify gaps and optimize placement",
      },
      {
        name: "Coverage Grade Assessment",
        description:
          "Assessing and documenting achieved coverage grades: Grade A (90%), Grade B (80%), Grade C (60%)",
      },
      {
        name: "Detector Placement Optimization",
        description:
          "Using Effigy software to optimize detector locations for maximum coverage with minimum equipment",
      },
    ],
    deliverables: [
      "Fire and gas detection philosophy document",
      "Coverage maps with achieved grades",
      "Detector location specifications",
      "Performance verification reports",
    ],
    relatedServiceIds: ["sis", "pha"],
    heroImage: "/images/stock/services-hero.jpg",
    icon: "flame",
    seo: {
      title: "Fire & Gas Mapping Services - Kenexis",
      description:
        "Performance-based fire and gas detection mapping per ISA TR84.00.07 using proprietary Effigy software for optimal detector placement.",
      ogImage: "/images/stock/services-hero.jpg",
    },
  },
  {
    id: "sis",
    name: "Safety Instrumented Systems",
    slug: "sis",
    shortDescription:
      "Lifecycle services governed by IEC 61511 and IEC 61508",
    fullDescription:
      "Kenexis provides comprehensive Safety Instrumented Systems lifecycle services governed by IEC 61511 and IEC 61508. From SIL verification and safety requirements specifications through functional safety assessments and site acceptance testing, we ensure your SIS delivers the required risk reduction throughout its operational life.",
    methodology: [
      "SIL Verification per ISA TR84.00.02",
      "Safety Requirements Specification (SRS) Development",
      "Functional Safety Assessment (FSA)",
      "Site Acceptance Testing (SAT)",
      "SIS Lifecycle Management",
    ],
    subServices: [
      {
        name: "SIL Verification",
        description:
          "Safety Integrity Level verification calculations per ISA TR84.00.02 to confirm SIS architecture meets required risk reduction",
      },
      {
        name: "Test Plan Development",
        description:
          "Proof test procedure development to maintain SIS performance throughout the operational lifecycle",
      },
      {
        name: "Functional Safety Assessment",
        description:
          "Independent functional safety assessments per IEC 61511 lifecycle phases to verify compliance and identify gaps",
      },
      {
        name: "Site Acceptance Testing",
        description:
          "On-site acceptance testing of safety instrumented systems to verify correct installation and operation",
      },
      {
        name: "Safety Requirements Specification",
        description:
          "Comprehensive SRS documentation defining functional and integrity requirements for each safety instrumented function",
      },
    ],
    deliverables: [
      "SIL verification calculations and reports",
      "Safety Requirements Specifications (SRS)",
      "Proof test procedures",
      "Functional Safety Assessment reports",
    ],
    relatedServiceIds: ["pha", "qra"],
    heroImage: "/images/stock/services-hero.jpg",
    icon: "cpu",
    seo: {
      title: "Safety Instrumented Systems (SIS) Services - Kenexis",
      description:
        "Comprehensive SIS lifecycle services including SIL verification, SRS development, FSA, and SAT per IEC 61511 and IEC 61508.",
      ogImage: "/images/stock/services-hero.jpg",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((s) => s.slug === slug);
}

export const servicesSEO: SEOMeta = {
  title: "Process Safety Consulting Services - Kenexis",
  description:
    "Expert process safety consulting: PHA, QRA, Fire & Gas Mapping, and SIS services for the chemical process industry.",
  ogImage: "/images/stock/services-hero.jpg",
};
