import type { ContactInfo, SocialLink, SEOMeta } from "./types";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  credentials: string[];
  photo: string;
  isLeadership: boolean;
}

export interface Representative {
  id: string;
  company: string;
  contactName: string | null;
  regions: string[];
  phone: string;
  email: string | null;
  website: string | null;
}

export interface CompanyInfo {
  name: string;
  founded: number;
  founders: string[];
  headquarters: ContactInfo;
  houstonOffice: string;
  description: string;
  mission: string;
  industries: string[];
  regulatoryAlignment: string[];
  socialLinks: SocialLink[];
}

export const companyInfo: CompanyInfo = {
  name: "Kenexis Consulting Corporation",
  founded: 2004,
  founders: ["Edward Marszal", "Kevin Mitchell"],
  headquarters: {
    phone: "+1-614-451-7031",
    email: "info@Kenexis.com",
    address: "3366 Riverside Drive, Suite 200, Columbus, Ohio 43221 USA",
    fax: "+1-614-451-2643",
  },
  houstonOffice: "Houston, Texas",
  description:
    "A process safety consulting and engineering firm specializing in technical safety services for chemical and energy facilities.",
  mission:
    "Delivering performance-based fire and gas mapping, risk analysis, and engineered safeguards for companies in the chemical process industry.",
  industries: [
    "Oil & Gas",
    "Petrochemical",
    "Chemical",
    "Power Generation",
    "Manufacturing",
  ],
  regulatoryAlignment: ["OSHA PSM", "IEC 61511", "NFPA", "ISA 84"],
  socialLinks: [
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
  ],
};

export const teamMembers: TeamMember[] = [
  {
    id: "edward-marszal",
    name: "Edward Marszal",
    title: "President",
    credentials: ["PE", "P2SAC Purdue University"],
    photo: "/images/team/edward-marszal.png",
    isLeadership: true,
  },
  {
    id: "kevin-mitchell",
    name: "Kevin Mitchell",
    title: "Vice President",
    credentials: ["PE", "ISA/IEC 61511 SIS Expert", "CFSE"],
    photo: "/images/team/kevin-mitchell.png",
    isLeadership: true,
  },
  {
    id: "christopher-weil",
    name: "Christopher Weil",
    title: "Senior Consultant, Houston Regional Manager",
    credentials: ["ISA/IEC 61511 SIS Expert", "GICSP"],
    photo: "/images/team/christopher-weil.png",
    isLeadership: false,
  },
  {
    id: "sean-cunningham",
    name: "Sean Cunningham",
    title: "Senior Engineer",
    credentials: ["ISA/IEC 61511 SIS Expert"],
    photo: "/images/team/sean-cunningham.png",
    isLeadership: false,
  },
  {
    id: "austin-bryan",
    name: "Austin Bryan",
    title: "Senior Engineer",
    credentials: ["ISA/IEC 61511 SIS Expert"],
    photo: "/images/team/austin-bryan.png",
    isLeadership: false,
  },
  {
    id: "elizabeth-smith",
    name: "Elizabeth Smith",
    title: "Senior Engineer",
    credentials: ["PE", "ISA/IEC 61511 SIS Expert"],
    photo: "/images/team/elizabeth-smith.png",
    isLeadership: false,
  },
  {
    id: "stephen-gorrell",
    name: "Stephen Gorrell",
    title: "Senior Engineer",
    credentials: ["ISA/IEC 61511 SIS Expert"],
    photo: "/images/team/stephen-gorrell.png",
    isLeadership: false,
  },
  {
    id: "arthur-pierce",
    name: "Arthur Pierce",
    title: "Senior Engineer",
    credentials: ["ISA/IEC 61511 SIS Expert"],
    photo: "/images/team/arthur-pierce.jpg",
    isLeadership: false,
  },
  {
    id: "mohammed-alzinati",
    name: "Mohammed Alzinati",
    title: "Senior Engineer, Middle East Regional Manager",
    credentials: ["ISA/IEC 61511 SIS Expert"],
    photo: "/images/team/mohammed-alzinati.png",
    isLeadership: false,
  },
  {
    id: "john-applegate",
    name: "John Applegate",
    title: "Senior Engineer",
    credentials: ["ISA/IEC 61511 SIS Expert"],
    photo: "/images/team/john-applegate.jpg",
    isLeadership: false,
  },
];

export const representatives: Representative[] = [
  {
    id: "detection-measurement",
    company: "Detection & Measurement Systems",
    contactName: "Eric Sutton",
    regions: ["Texas, USA"],
    phone: "(713) 541-9800",
    email: null,
    website: "https://detect-measure.com",
  },
  {
    id: "westech",
    company: "Westech",
    contactName: "Adrian Petre",
    regions: ["Canada"],
    phone: "(403) 259-9701",
    email: null,
    website: "https://westech-ind.com",
  },
  {
    id: "ino-tek",
    company: "Ino-Tek",
    contactName: "Jim Parker",
    regions: ["Michigan/Midwest, USA"],
    phone: "(586) 336-0856",
    email: null,
    website: "https://ino-tek.com",
  },
  {
    id: "dynamis",
    company: "Dynamis",
    contactName: "Marcilio Pongitori",
    regions: ["Brazil", "Argentina", "Chile"],
    phone: "+55 (19) 3291 6163",
    email: null,
    website: "https://dynamiscursos.com.br",
  },
  {
    id: "keystone",
    company: "Keystone Risk Management",
    contactName: "Curtis Alexander",
    regions: ["Trinidad", "Caribbean", "Latin America"],
    phone: "1-868-678-7162",
    email: null,
    website: null,
  },
  {
    id: "exidasp",
    company: "ExidaSP",
    contactName: "Adam Yousif",
    regions: ["UAE", "Algeria", "India", "Iraq"],
    phone: "+971529901955",
    email: null,
    website: null,
  },
  {
    id: "sgs-ecl",
    company: "SGS ECL",
    contactName: "Paul Ganter",
    regions: ["Australia", "New Zealand"],
    phone: "+64 27 218 7523",
    email: null,
    website: "https://sgs.com/en-nz",
  },
  {
    id: "pinnacle",
    company: "Pinnacle Instruments",
    contactName: "Poon Schoeman",
    regions: ["South Africa"],
    phone: "+2721 7063963",
    email: null,
    website: "https://pinnacleinstruments.co.za",
  },
  {
    id: "anar",
    company: "Anar",
    contactName: null,
    regions: ["Turkey", "Bulgaria"],
    phone: "+90 212 438 46 32",
    email: null,
    website: "https://anar.com.tr",
  },
  {
    id: "velocis",
    company: "Velocis Solutions",
    contactName: null,
    regions: ["Azerbaijan"],
    phone: "+994502022624",
    email: null,
    website: "https://velocis-solutions.com",
  },
  {
    id: "uit",
    company: "UIT",
    contactName: "Leo Park",
    regions: ["South Korea"],
    phone: "+82-2-2051-2350",
    email: null,
    website: "https://uitsolutions.com",
  },
];

export function getTeamMember(id: string): TeamMember | undefined {
  return teamMembers.find((m) => m.id === id);
}

export function getLeadership(): TeamMember[] {
  return teamMembers.filter((m) => m.isLeadership);
}

export const aboutSEO: SEOMeta = {
  title: "About Kenexis - Process Safety Consulting",
  description:
    "Founded in 2004, Kenexis is a process safety consulting and engineering firm specializing in technical safety services for chemical and energy facilities.",
  ogImage: "/images/stock/about-hero.jpg",
};

export const teamSEO: SEOMeta = {
  title: "Meet the Team - Kenexis Process Safety",
  description:
    "Meet the experienced process safety engineers and consultants at Kenexis Consulting Corporation.",
  ogImage: "/images/stock/about-hero.jpg",
};

export const representativesSEO: SEOMeta = {
  title: "Global Representatives - Kenexis",
  description:
    "Find Kenexis representatives worldwide. Local support for process safety consulting, software, and training across North America, South America, Europe, Middle East, Asia Pacific, and Africa.",
};
