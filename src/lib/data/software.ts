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

export interface ComparisonRow {
  aspect: string;
  traditional: string;
  modern: string;
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
  comparisonTable: {
    title?: string;
    rows: ComparisonRow[];
  };
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
      ogImage: "/images/stock/software-hero.jpg",
    },
    comparisonTable: {
      rows: [
        {
          aspect: "Pricing Transparency",
          traditional: "Hidden fees and restrictive per-seat licensing",
          modern: "Clear pricing with free desktop version and concurrent user licensing",
        },
        {
          aspect: "Data Portability",
          traditional: "Proprietary file formats with vendor lock-in",
          modern: "Non-proprietary JSON data structure, exportable and integrable",
        },
        {
          aspect: "Platform Access",
          traditional: "Windows-only desktop applications",
          modern: "Cross-platform (Windows, Mac, Linux) with cloud option",
        },
        {
          aspect: "Updates & Maintenance",
          traditional: "Manual updates, often charged separately",
          modern: "Automatic cloud updates at no additional cost",
        },
        {
          aspect: "Collaboration",
          traditional: "Single-user or file-sharing workarounds",
          modern: "Multi-user cloud with dashboards and revision management",
        },
        {
          aspect: "Integration",
          traditional: "Standalone tool with no ecosystem connectivity",
          modern: "Seamless integration with KISS platform modules",
        },
      ],
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
      ogImage: "/images/stock/software-hero.jpg",
    },
    comparisonTable: {
      rows: [
        {
          aspect: "SIL Verification Speed",
          traditional: "Weeks of manual calculations using spreadsheets",
          modern: "Automated SIL verification engine with instant results",
        },
        {
          aspect: "Failure Rate Data",
          traditional: "Manual lookup from published literature and standards",
          modern: "Integrated curated failure rate database included at no cost",
        },
        {
          aspect: "Proof Test Optimization",
          traditional: "Fixed intervals based on conservative assumptions",
          modern: "Data-driven proof test interval optimization for cost savings",
        },
        {
          aspect: "Documentation",
          traditional: "Manual SRS creation in Word documents",
          modern: "Automated Safety Requirements Specification generation",
        },
        {
          aspect: "Compliance Tracking",
          traditional: "Spreadsheet-based tracking prone to version conflicts",
          modern: "Built-in dashboards with real-time compliance status",
        },
        {
          aspect: "Integration",
          traditional: "Isolated SIS tool with manual data re-entry",
          modern: "Direct linkage to Open-PHA, Arbor, and KISS platform",
        },
      ],
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
      ogImage: "/images/stock/software-hero.jpg",
    },
    comparisonTable: {
      rows: [
        {
          aspect: "Complexity Handling",
          traditional: "Simplified equations adequate only for simple systems",
          modern: "Full fault-tree analysis for complex system verification",
        },
        {
          aspect: "Failure Rate Data",
          traditional: "Manual lookup and entry of failure rates from literature",
          modern: "Integrated curated failure rate database included at no cost",
        },
        {
          aspect: "SIS Integration",
          traditional: "Separate tools with manual data transfer to SIS software",
          modern: "Direct linkage to Vertigo for seamless SIS lifecycle management",
        },
        {
          aspect: "Vulnerability Analysis",
          traditional: "Manual identification of system weak points",
          modern: "Automated minimum cut set analysis with interactive reporting",
        },
        {
          aspect: "Sensitivity Analysis",
          traditional: "Time-consuming manual recalculation for each scenario",
          modern: "Built-in statistical sensitivity analysis tools",
        },
      ],
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
      ogImage: "/images/stock/software-hero.jpg",
    },
    comparisonTable: {
      rows: [
        {
          aspect: "Diagram Building",
          traditional: "Static diagrams in Visio or PowerPoint with no data linkage",
          modern: "Interactive bowtie builder with automatic risk calculations",
        },
        {
          aspect: "Risk Quantification",
          traditional: "Qualitative assessments based on subjective judgment",
          modern: "Quantitative risk calculations with TMEL compliance tracking",
        },
        {
          aspect: "Revision Tracking",
          traditional: "Manual version control with filename conventions",
          modern: "Built-in revision tracking and version history",
        },
        {
          aspect: "TMEL Compliance",
          traditional: "Separate compliance tracking in spreadsheets",
          modern: "Automatic TMEL compliance verification within the analysis",
        },
        {
          aspect: "Visualization",
          traditional: "Flat diagrams that cannot show risk magnitude",
          modern: "Dynamic risk-weighted visualization of threats and barriers",
        },
        {
          aspect: "Reporting",
          traditional: "Manual report assembly from multiple sources",
          modern: "One-click export with integrated study dashboards",
        },
      ],
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
      ogImage: "/images/stock/software-hero.jpg",
    },
    comparisonTable: {
      rows: [
        {
          aspect: "Pricing",
          traditional: "Expensive per-seat licensing for audit software",
          modern: "Free desktop version with affordable cloud upgrade",
        },
        {
          aspect: "Assessment Workflow",
          traditional: "Unstructured checklists in spreadsheets or documents",
          modern: "Guided assessor worksheets with built-in scoring criteria",
        },
        {
          aspect: "Evidence Management",
          traditional: "Scattered files across shared drives and email",
          modern: "Centralized evidence documentation attached to each finding",
        },
        {
          aspect: "Compliance Standards",
          traditional: "Manual cross-referencing of IEC 61511 and OSHA requirements",
          modern: "Pre-built template libraries mapped to common standards",
        },
        {
          aspect: "Audit Tracking",
          traditional: "Spreadsheet-based action item tracking with no follow-up",
          modern: "Integrated audit tracking with follow-up management",
        },
        {
          aspect: "Platform Access",
          traditional: "Windows-only desktop applications",
          modern: "Cross-platform (Windows, Mac, Linux) with cloud option",
        },
      ],
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
      ogImage: "/images/stock/software-hero.jpg",
    },
    comparisonTable: {
      rows: [
        {
          aspect: "Detection Coverage Analysis",
          traditional: "Rule-of-thumb detector placement without verification",
          modern: "Quantitative coverage analysis with grade-based reporting",
        },
        {
          aspect: "3D Modeling",
          traditional: "2D floor plans that miss vertical obstructions",
          modern: "Full 3D CAD import (STL) for realistic facility modeling",
        },
        {
          aspect: "Plume Simulation",
          traditional: "Simplified dispersion estimates or no simulation at all",
          modern: "Patented plume modeling technology for accurate gas dispersion",
        },
        {
          aspect: "Coverage Grading",
          traditional: "Subjective assessment of detection adequacy",
          modern: "ISA-TR84.00.07 compliant coverage grades (A/B/C)",
        },
        {
          aspect: "Detector Optimization",
          traditional: "Trial and error placement with manual recalculation",
          modern: "Automated detector placement optimization for maximum coverage",
        },
        {
          aspect: "Standards Compliance",
          traditional: "Manual documentation of compliance with safety standards",
          modern: "Built-in ISA-TR84.00.07 compliance verification and reporting",
        },
      ],
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
      ogImage: "/images/stock/software-hero.jpg",
    },
    comparisonTable: {
      rows: [
        {
          aspect: "Data Access",
          traditional: "Manual data export via spreadsheets and file transfers",
          modern: "Programmatic JSON API with up to 1M calls per year",
        },
        {
          aspect: "Business Intelligence",
          traditional: "Static reports requiring manual assembly",
          modern: "Direct integration with Power BI, Tableau, and custom dashboards",
        },
        {
          aspect: "Data Silos",
          traditional: "Disconnected safety studies isolated in separate tools",
          modern: "Unified data access across all KISS platform modules",
        },
        {
          aspect: "Human Error Risk",
          traditional: "Manual data entry and transcription between systems",
          modern: "Automated data synchronization eliminating manual re-entry",
        },
        {
          aspect: "Enterprise Integration",
          traditional: "No connectivity with CMMS, ERP, or business systems",
          modern: "Direct CMMS and ERP system connectivity via standard API",
        },
      ],
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
