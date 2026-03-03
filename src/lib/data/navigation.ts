import type { NavItem, SocialLink, ContactInfo } from "./types";

export const mainNavigation: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    description: "Process safety consulting services",
    children: [
      {
        label: "Process Hazards Analysis",
        href: "/services/pha",
        description: "HAZOP, LOPA, and risk assessment",
        icon: "shield",
      },
      {
        label: "Quantitative Risk Analysis",
        href: "/services/qra",
        description: "Probabilistic risk evaluation and modeling",
        icon: "chart-bar",
      },
      {
        label: "Fire & Gas Mapping",
        href: "/services/fire-gas-mapping",
        description: "Performance-based detection mapping",
        icon: "flame",
      },
      {
        label: "Safety Instrumented Systems",
        href: "/services/sis",
        description: "SIL verification and lifecycle management",
        icon: "cpu",
      },
    ],
  },
  {
    label: "Software",
    href: "/software",
    description: "KISS platform and software products",
    children: [
      {
        label: "Open-PHA",
        href: "/software/open-pha",
        description: "PHA, HAZOP, and LOPA management",
        icon: "clipboard-check",
      },
      {
        label: "Vertigo",
        href: "/software/vertigo",
        description: "SIS lifecycle and SIL verification",
        icon: "gauge",
      },
      {
        label: "Arbor",
        href: "/software/arbor",
        description: "Fault-tree analysis",
        icon: "git-branch",
      },
      {
        label: "Bowtie-Q",
        href: "/software/bowtie-q",
        description: "Quantitative bowtie analysis",
        icon: "target",
      },
      {
        label: "Open-Audit",
        href: "/software/open-audit",
        description: "Validation and auditing",
        icon: "check-square",
      },
      {
        label: "Effigy",
        href: "/software/effigy",
        description: "Fire and gas mapping software",
        icon: "map",
      },
      {
        label: "KISS API",
        href: "/software/kiss-api",
        description: "Data integration API",
        icon: "code",
      },
    ],
  },
  {
    label: "Training",
    href: "/training",
    description: "Process safety training center",
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Webinars, papers, podcast, and tools",
  },
  {
    label: "About",
    href: "/about",
    description: "Company information",
    children: [
      {
        label: "Company",
        href: "/about",
        description: "About Kenexis",
        icon: "building",
      },
      {
        label: "Team",
        href: "/about/team",
        description: "Meet our senior staff",
        icon: "users",
      },
      {
        label: "Representatives",
        href: "/about/representatives",
        description: "Global representatives",
        icon: "globe",
      },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
    description: "Join the Kenexis team",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch with us",
  },
];

export const footerNavigation = {
  sections: [
    {
      title: "Services",
      links: [
        { label: "Process Hazards Analysis", href: "/services/pha" },
        { label: "Quantitative Risk Analysis", href: "/services/qra" },
        { label: "Fire & Gas Mapping", href: "/services/fire-gas-mapping" },
        { label: "Safety Instrumented Systems", href: "/services/sis" },
      ],
    },
    {
      title: "Software",
      links: [
        { label: "KISS Platform", href: "/software" },
        { label: "Open-PHA", href: "/software/open-pha" },
        { label: "Vertigo", href: "/software/vertigo" },
        { label: "Arbor", href: "/software/arbor" },
        { label: "Bowtie-Q", href: "/software/bowtie-q" },
        { label: "Open-Audit", href: "/software/open-audit" },
        { label: "Effigy", href: "/software/effigy" },
        { label: "KISS API", href: "/software/kiss-api" },
      ],
    },
    {
      title: "Training & Resources",
      links: [
        { label: "Training Center", href: "/training" },
        { label: "Resources", href: "/resources" },
        { label: "Newsletter", href: "/newsletter" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Kenexis", href: "/about" },
        { label: "Meet the Team", href: "/about/team" },
        { label: "Representatives", href: "/about/representatives" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ],
  externalLinks: [
    { label: "KISS Login", href: "https://kiss.kenexis.com", external: true },
    {
      label: "Kenexis Store",
      href: "https://store.kenexis.com",
      external: true,
    },
  ],
  socialLinks: [
    {
      platform: "linkedin" as const,
      url: "https://www.linkedin.com/company/kenexis-consulting-corporation",
      label: "LinkedIn",
    },
    {
      platform: "youtube" as const,
      url: "https://www.youtube.com/@Kenexis",
      label: "YouTube",
    },
    {
      platform: "spotify" as const,
      url: "https://open.spotify.com/show/77uAv2QNmFPqDaDT6gK8Ag",
      label: "Kenexis Functional Safety Podcast",
    },
    {
      platform: "rss" as const,
      url: "https://www.kenexis.com/news/feed/",
      label: "RSS Feed",
    },
  ] satisfies SocialLink[],
  contactInfo: {
    phone: "+1-614-451-7031",
    email: "info@Kenexis.com",
    address: "3366 Riverside Drive, Suite 200, Columbus, Ohio 43221 USA",
    fax: "+1-614-451-2643",
  } satisfies ContactInfo,
  copyright: `\u00A9 ${new Date().getFullYear()} Kenexis Consulting Corporation. All rights reserved.`,
};
