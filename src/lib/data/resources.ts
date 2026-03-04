import type { SEOMeta } from "./types";

export interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
}

export interface SampleContent {
  title: string;
  description: string;
  category: string;
  href: string;
}

export const resourceCategories: ResourceCategory[] = [
  {
    id: "news",
    name: "News",
    description:
      "Latest news and updates from Kenexis on process safety topics and company developments",
    href: "/news",
    icon: "newspaper",
  },
  {
    id: "recorded-webinars",
    name: "Recorded Webinars",
    description:
      "Watch recorded webinars on process safety topics presented by Kenexis experts",
    href: "/resources/recorded",
    icon: "video",
  },
  {
    id: "newsletter",
    name: "Newsletter",
    description:
      "Subscribe to receive monthly safety articles and webinar announcements from Kenexis",
    href: "/newsletter",
    icon: "mail",
  },
  {
    id: "tools",
    name: "Tools",
    description:
      "Free process safety tools and calculators for engineering professionals",
    href: "/resources/tools",
    icon: "wrench",
  },
  {
    id: "papers",
    name: "Papers, Articles & Books",
    description:
      "Technical papers, articles, and books on process safety by Kenexis engineers",
    href: "/resources/papers",
    icon: "book-open",
  },
  {
    id: "videos",
    name: "Videos",
    description:
      "Watch Kenexis process safety videos and product demonstrations on YouTube",
    href: "https://www.youtube.com/@Kenexis",
    icon: "play-circle",
  },
  {
    id: "podcast",
    name: "Functional Safety Podcast",
    description:
      "Listen to the Kenexis Functional Safety Podcast on Spotify for expert discussions on safety topics",
    href: "https://open.spotify.com/show/77uAv2QNmFPqDaDT6gK8Ag",
    icon: "headphones",
  },
];

export const externalLinks = {
  youtube: "https://www.youtube.com/@Kenexis",
  spotify: "https://open.spotify.com/show/77uAv2QNmFPqDaDT6gK8Ag",
  rss: "https://www.kenexis.com/news/feed/",
};

export const sampleWebinars: SampleContent[] = [
  {
    title: "Process Safety Trends in Chemical Manufacturing",
    description:
      "An overview of emerging process safety trends and best practices for chemical manufacturing facilities",
    category: "Webinar",
    href: "/resources/recorded",
  },
  {
    title: "Introduction to Performance-Based Fire and Gas Mapping",
    description:
      "Learn the fundamentals of performance-based fire and gas detection mapping per ISA TR84.00.07",
    category: "Webinar",
    href: "/resources/recorded",
  },
  {
    title: "SIL Verification Best Practices",
    description:
      "Best practices for conducting SIL verification calculations and documenting results per ISA TR84.00.02",
    category: "Webinar",
    href: "/resources/recorded",
  },
];

export const sampleArticles: SampleContent[] = [
  {
    title: "Safe and Clean Green Energy",
    description:
      "Exploring safety considerations for energy storage and green energy facilities in the chemical process industry",
    category: "Article",
    href: "/news",
  },
  {
    title: "Oil & Gas, Petrochemical Changes",
    description:
      "How the oil and gas and petrochemical industries are adapting to new safety standards and processing methodologies",
    category: "Article",
    href: "/news",
  },
];

export const resourcesSEO: SEOMeta = {
  title: "Process Safety Resources - Kenexis",
  description:
    "Access webinars, papers, tools, podcast episodes, and videos on process safety topics from Kenexis experts.",
  ogImage: "/images/stock/hero-control-room.jpg",
};
