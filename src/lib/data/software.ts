import type { SEOMeta } from "./types";

export const PRODUCT_IDS = [
  "open-pha",
  "vertigo",
  "arbor",
  "bowtie-q",
  "open-audit",
  "effigy",
  "kiss-api",
] as const;

export type ProductId = (typeof PRODUCT_IDS)[number];

export interface PricingTier {
  type: "free" | "yearly" | "contact";
  label: string;
  amount?: number;
  unit?: string;
  note?: string;
}

export interface SoftwareProduct {
  id: ProductId;
  name: string;
  slug: string;
  trademark: string;
  tagline: string;
  description: string;
  pricing: PricingTier[];
  features: string[];
  integrations: string[];
  url: string;
  heroImage: string;
  icon: string;
  seo: SEOMeta;
}

export interface KISSOverview {
  name: string;
  description: string;
  features: string[];
  loginUrl: string;
  storeUrl: string;
}

export const kissOverview: KISSOverview = {
  name: "Kenexis Integrated Safety Suite (KISS)",
  description:
    "Seamlessly integrated software modules for comprehensive process safety management. The KISS platform brings together seven specialized tools under a single platform with built-in dashboards, AI-powered help, integrated training, and Microsoft Azure security.",
  features: [
    "Single integrated platform for all process safety software",
    "Individual or combined module licensing",
    "Built-in dashboards and reporting",
    "AI-powered contextual help",
    "Integrated training within each product",
    "Microsoft Azure enterprise security",
    "Cloud-based with browser access",
  ],
  loginUrl: "https://kiss.kenexis.com",
  storeUrl: "https://store.kenexis.com",
};

export const softwareProducts: SoftwareProduct[] = [
  {
    id: "open-pha",
    name: "Open-PHA",
    slug: "open-pha",
    trademark: "\u00AE",
    tagline:
      "Simplified PHA Management with Clear Pricing, Easy Access & Legacy Study Migration",
    description:
      "Open-PHA is a comprehensive tool for Process Hazards Analysis management, supporting HAZOP, LOPA, checklists, and more. Available as a free desktop application or a cloud-based solution with advanced collaboration features.",
    pricing: [
      {
        type: "free",
        label: "Desktop",
        note: "Free download for Windows, Mac, and Linux",
      },
      {
        type: "yearly",
        label: "Cloud",
        amount: 2300,
        unit: "per concurrent user",
        note: "USD/year",
      },
    ],
    features: [
      "Configurable worksheets for HAZOP, What-If, FMEA, and checklists",
      "Risk matrix with customizable categories and criteria",
      "Recommendation tracking and management",
      "Layer of Protection Analysis (LOPA) support",
      "Bowtie diagrams (cloud version)",
      "Custom reporting and export",
      "Legacy study migration tools",
      "Multi-user collaboration (cloud version)",
    ],
    integrations: ["Vertigo", "Bowtie-Q", "KISS API"],
    url: "https://www.kenexis.com/software/openpha/",
    heroImage: "/images/stock/software-hero.jpg",
    icon: "clipboard-check",
    seo: {
      title: "Open-PHA - PHA Management Software - Kenexis",
      description:
        "Simplified PHA management with HAZOP, LOPA, and checklist support. Free desktop version or cloud-based collaboration.",
    },
  },
  {
    id: "vertigo",
    name: "Vertigo",
    slug: "vertigo",
    trademark: "\u2122",
    tagline: "SIS Lifecycle Management and SIL Verification",
    description:
      "Vertigo is a comprehensive SIS lifecycle management tool for SIL verification, IPF management, and safety requirements documentation. Built on the ISA TR84.00.02 methodology with an integrated equipment failure rate database.",
    pricing: [
      {
        type: "yearly",
        label: "Cloud",
        amount: 5700,
        unit: "single concurrent user",
        note: "USD/year",
      },
    ],
    features: [
      "Equipment failure rate database",
      "SIL verification engine per ISA TR84.00.02",
      "Instrumented Protective Function (IPF) management",
      "Safety Requirements Specification (SRS) documentation",
      "Cause and effect diagrams",
      "Study dashboards and reporting",
      "Proof test interval optimization",
    ],
    integrations: ["Open-PHA", "Arbor", "KISS API"],
    url: "https://www.kenexis.com/software/sis-lifecycle-management-and-sil-verification/",
    heroImage: "/images/stock/software-hero.jpg",
    icon: "gauge",
    seo: {
      title: "Vertigo - SIS Lifecycle Management - Kenexis",
      description:
        "Comprehensive SIS lifecycle management and SIL verification per ISA TR84.00.02 with integrated failure rate database.",
    },
  },
  {
    id: "arbor",
    name: "Arbor",
    slug: "arbor",
    trademark: "\u2122",
    tagline: "Fault-Tree Analysis for System Reliability Modeling",
    description:
      "Arbor provides fault-tree analysis capabilities for modeling system reliability. Use Arbor to perform minimum cut set analysis, evaluate failure rates, and conduct sensitivity analysis with integration into Vertigo for SIS design.",
    pricing: [
      {
        type: "yearly",
        label: "Cloud",
        amount: 1450,
        unit: "single concurrent user",
        note: "USD/year",
      },
    ],
    features: [
      "Minimum cut set analysis",
      "Equipment failure rate database",
      "Sensitivity analysis tools",
      "Vertigo integration for SIS design",
      "Graphical fault-tree editor",
      "Export and reporting",
    ],
    integrations: ["Vertigo", "KISS API"],
    url: "https://www.kenexis.com/software/arbor/",
    heroImage: "/images/stock/software-hero.jpg",
    icon: "git-branch",
    seo: {
      title: "Arbor - Fault-Tree Analysis Software - Kenexis",
      description:
        "Fault-tree analysis for system reliability modeling with minimum cut set analysis and Vertigo integration.",
    },
  },
  {
    id: "bowtie-q",
    name: "Bowtie-Q",
    slug: "bowtie-q",
    trademark: "\u2122",
    tagline: "Quantitative Bowtie Analysis",
    description:
      "Bowtie-Q delivers quantitative bowtie analysis with interactive diagram building, automatic risk calculations, and TMEL compliance tracking. Visualize threats, barriers, and consequences in a single integrated view.",
    pricing: [
      {
        type: "yearly",
        label: "Cloud",
        amount: 3500,
        unit: "per concurrent user",
        note: "USD/year",
      },
    ],
    features: [
      "Interactive bowtie diagram builder",
      "Study dashboards with risk overview",
      "Risk criteria view and compliance tracking",
      "Automatic quantitative calculations (TMEL compliance)",
      "Revision tracking and version history",
      "Export and custom reporting",
    ],
    integrations: ["Open-PHA", "KISS API"],
    url: "https://www.kenexis.com/software/quantitative-bowtie-analysis/",
    heroImage: "/images/stock/software-hero.jpg",
    icon: "target",
    seo: {
      title: "Bowtie-Q - Quantitative Bowtie Analysis - Kenexis",
      description:
        "Interactive quantitative bowtie analysis with automatic risk calculations and TMEL compliance tracking.",
    },
  },
  {
    id: "open-audit",
    name: "Open-Audit",
    slug: "open-audit",
    trademark: "\u2122",
    tagline: "Validation and Auditing for IEC 61511 and OSHA 1910.119",
    description:
      "Open-Audit provides structured validation and auditing tools for IEC 61511 and OSHA 1910.119 compliance. Available as a free desktop application or cloud-based solution with assessor worksheets, evidence documentation, and audit tracking.",
    pricing: [
      {
        type: "free",
        label: "Desktop",
        note: "Free download for Windows, Mac, and Linux",
      },
      {
        type: "yearly",
        label: "Cloud",
        amount: 1450,
        unit: "single concurrent user",
        note: "USD/year",
      },
    ],
    features: [
      "Assessor worksheets with guided evaluation",
      "Evidence documentation and attachment",
      "Scoring criteria and compliance tracking",
      "Audit tracking and follow-up management",
      "Template libraries for common standards",
      "Custom report generation",
    ],
    integrations: ["Open-PHA", "KISS API"],
    url: "https://www.kenexis.com/software/open-audit/",
    heroImage: "/images/stock/software-hero.jpg",
    icon: "check-square",
    seo: {
      title: "Open-Audit - Validation & Auditing Software - Kenexis",
      description:
        "Structured validation and auditing for IEC 61511 and OSHA 1910.119 with assessor worksheets and compliance tracking.",
    },
  },
  {
    id: "effigy",
    name: "Effigy",
    slug: "effigy",
    trademark: "\u00AE",
    tagline: "Fire and Gas Mapping with Patented Plume Modeling",
    description:
      "Effigy is a proprietary fire and gas mapping tool with patented plume modeling technology. Design detection systems that achieve specified coverage grades through scenario-based and geographical approaches with 3D CAD import and ISA-TR84.00.07 compliance.",
    pricing: [
      {
        type: "yearly",
        label: "Cloud",
        amount: 13250,
        unit: "single concurrent user",
        note: "USD/year",
      },
    ],
    features: [
      "Geographic and scenario-based coverage analysis",
      "3D CAD import (STL file format)",
      "ISA-TR84.00.07 compliance verification",
      "Patented plume modeling technology (US Pat 10,600,057)",
      "Color-coded coverage maps and visualization",
      "Detector placement optimization",
      "Coverage grade reporting (A/B/C)",
    ],
    integrations: ["KISS API"],
    url: "https://www.kenexis.com/software/effigy/",
    heroImage: "/images/stock/software-hero.jpg",
    icon: "map",
    seo: {
      title: "Effigy - Fire & Gas Mapping Software - Kenexis",
      description:
        "Patented fire and gas mapping with plume modeling, 3D CAD import, and ISA-TR84.00.07 compliance for optimal detector placement.",
    },
  },
  {
    id: "kiss-api",
    name: "KISS API",
    slug: "kiss-api",
    trademark: "\u2122",
    tagline: "Application Programming Interface for Data Integration",
    description:
      "The KISS API provides programmatic access to your KISS platform data for integration with business intelligence tools, CMMS, ERP systems, and custom workflows. Access Open-PHA and Vertigo data in JSON format with up to 1 million API calls per year.",
    pricing: [
      {
        type: "yearly",
        label: "Standard",
        amount: 5000,
        unit: "1M API calls",
        note: "USD/year",
      },
    ],
    features: [
      "JSON data format for universal compatibility",
      "Power BI and Tableau integration",
      "CMMS and ERP system connectivity",
      "Open-PHA data access and export",
      "Vertigo data access and export",
      "Workflow automation support",
      "Up to 1 million API calls per year",
    ],
    integrations: ["Open-PHA", "Vertigo", "Arbor", "Bowtie-Q", "Open-Audit", "Effigy"],
    url: "https://www.kenexis.com/software/kiss-api-application-programming-interface/",
    heroImage: "/images/stock/software-hero.jpg",
    icon: "code",
    seo: {
      title: "KISS API - Data Integration - Kenexis",
      description:
        "Programmatic access to KISS platform data for Power BI, Tableau, CMMS, and ERP integration with JSON format.",
    },
  },
];

export function getProductBySlug(slug: string): SoftwareProduct | undefined {
  return softwareProducts.find((p) => p.slug === slug);
}

export const softwareSEO: SEOMeta = {
  title: "KISS Software Platform - Process Safety Software - Kenexis",
  description:
    "Seven integrated software products for process safety management: Open-PHA, Vertigo, Arbor, Bowtie-Q, Open-Audit, Effigy, and KISS API.",
  ogImage: "/images/stock/software-hero.jpg",
};
