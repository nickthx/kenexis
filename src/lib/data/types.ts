export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
  icon?: string;
}

export interface SocialLink {
  platform: "linkedin" | "youtube" | "spotify" | "rss";
  url: string;
  label: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  fax?: string;
}

export interface SEOMeta {
  title: string;
  description: string;
  ogImage?: string;
}
