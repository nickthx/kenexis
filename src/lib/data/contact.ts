import type { ContactInfo, SocialLink, SEOMeta } from "./types";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required: boolean;
  placeholder?: string;
  options?: string[];
  maxLength?: number;
}

export const contactInfo: ContactInfo = {
  phone: "+1-614-451-7031",
  email: "info@Kenexis.com",
  address: "3366 Riverside Drive, Suite 200, Columbus, Ohio 43221 USA",
  fax: "+1-614-451-2643",
};

export const contactFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Your full name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "your.email@company.com",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    required: false,
    placeholder: "Your company name (optional)",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    required: false,
    placeholder: "+1 (555) 000-0000 (optional)",
  },
  {
    name: "serviceInterest",
    label: "Service Interest",
    type: "select",
    required: false,
    options: [
      "Process Hazards Analysis",
      "Quantitative Risk Analysis",
      "Fire & Gas Mapping",
      "Safety Instrumented Systems",
      "Software Products",
      "Training",
      "General Inquiry",
    ],
    placeholder: "Select a service area",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    placeholder: "Tell us about your project or question...",
    maxLength: 500,
  },
];

export const socialLinks: SocialLink[] = [
  {
    platform: "linkedin",
    url: "https://www.linkedin.com/company/kenexis-consulting-corporation",
    label: "LinkedIn",
  },
  {
    platform: "youtube",
    url: "https://www.youtube.com/@Kenexis",
    label: "YouTube",
  },
  {
    platform: "spotify",
    url: "https://open.spotify.com/show/77uAv2QNmFPqDaDT6gK8Ag",
    label: "Kenexis Functional Safety Podcast",
  },
  {
    platform: "rss",
    url: "https://www.kenexis.com/news/feed/",
    label: "RSS Feed",
  },
];

export const contactSEO: SEOMeta = {
  title: "Contact Kenexis - Process Safety Consulting",
  description:
    "Get in touch with Kenexis for process safety consulting, software inquiries, and training information. Phone: +1-614-451-7031.",
  ogImage: "/images/stock/hero-control-room.jpg",
};
