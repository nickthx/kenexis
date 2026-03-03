import type { SEOMeta } from "./types";

export interface HeroContent {
  headline: string;
  subheadline: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  backgroundImage: string;
}

export interface Pillar {
  name: string;
  description: string;
  icon: string;
  href: string;
  ctaText: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description: string;
}

export interface FeaturedContent {
  title: string;
  excerpt: string;
  href: string;
  category: string;
}

export interface CTASection {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export const homeHero: HeroContent = {
  headline: "Process safety experts: Services, Software, Training",
  subheadline:
    "A leading technical safety consultancy specializing in risk analysis and engineered safeguards for the chemical process industry",
  primaryCTA: { text: "Explore Services", href: "/services" },
  secondaryCTA: { text: "Try Our Software", href: "/software" },
  backgroundImage: "/images/stock/hero-refinery.jpg",
};

export const homePillars: Pillar[] = [
  {
    name: "Engineering Consulting Services",
    description:
      "Process Hazards Analysis, Quantitative Risk Analysis, Fire & Gas Mapping, and Safety Instrumented Systems consulting for the chemical process industry",
    icon: "hard-hat",
    href: "/services",
    ctaText: "View Services",
  },
  {
    name: "Software Products",
    description:
      "Cloud-based KISS platform with seven integrated software modules for comprehensive process safety management",
    icon: "monitor",
    href: "/software",
    ctaText: "Explore Software",
  },
  {
    name: "Training",
    description:
      "Process safety training center offering online on-demand courses with video instruction, downloadable content, and completion certificates",
    icon: "graduation-cap",
    href: "/training",
    ctaText: "Browse Courses",
  },
];

export const homeStats: StatItem[] = [
  {
    label: "Years of Experience",
    value: 22,
    suffix: "+",
    description: "Founded in 2004, delivering process safety expertise",
  },
  {
    label: "Global Presence",
    value: 10,
    suffix: "+",
    prefix: "",
    description: "Representatives in countries worldwide",
  },
  {
    label: "Software Products",
    value: 7,
    description: "Integrated products on the KISS platform",
  },
];

export const homeFeaturedContent: FeaturedContent[] = [
  {
    title: "Safe and Clean Green Energy",
    excerpt:
      "Exploring safety considerations for energy storage and green energy facilities in the chemical process industry",
    href: "/news",
    category: "Energy Safety",
  },
  {
    title: "Oil & Gas, Petrochemical Changes",
    excerpt:
      "How the oil and gas and petrochemical industries are adapting to new safety standards and processing methodologies",
    href: "/news",
    category: "Industry Trends",
  },
  {
    title: "Kenexis Unlimited",
    excerpt:
      "Access all Kenexis software products and training courses with a single subscription for unlimited users",
    href: "/software",
    category: "Product Announcement",
  },
];

export const homeNewsletterCTA: CTASection = {
  title: "Stay Informed on Process Safety",
  description:
    "Subscribe to receive monthly safety articles, webinar announcements, and industry insights from Kenexis experts",
  buttonText: "Subscribe to Newsletter",
  href: "/newsletter",
};

export const homeContactCTA: CTASection = {
  title: "Ready to discuss your safety challenges?",
  description:
    "Our team of process safety experts is ready to help you address your risk analysis and safety engineering needs",
  buttonText: "Contact Us",
  href: "/contact",
};

export const homeSEO: SEOMeta = {
  title: "Kenexis - Process Safety Experts: Services, Software, Training",
  description:
    "Leading technical safety consultancy specializing in risk analysis and engineered safeguards for the chemical process industry. PHA, QRA, SIS, and Fire & Gas Mapping services.",
  ogImage: "/images/stock/hero-refinery.jpg",
};
