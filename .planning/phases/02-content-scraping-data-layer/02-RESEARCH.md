# Phase 2: Content Scraping & Data Layer - Research

**Researched:** 2026-03-03
**Domain:** Content extraction from kenexis.com, TypeScript data modeling, image asset management
**Confidence:** HIGH

## Summary

Phase 2 requires extracting all real content from kenexis.com and structuring it into typed TypeScript data files, plus downloading all team headshots and sourcing industrial stock imagery. The kenexis.com site is a WordPress site with a well-defined structure: 8 page categories (home, services, software, training, resources, about, careers, contact) with ~25 distinct pages of content. The site has 10 identified team members with photos, 10+ global representatives with full contact details, 7 software products with detailed feature/pricing info, 4 service areas with methodology descriptions, and a training center with 16+ courses.

The data layer should be organized as typed TypeScript files in `src/lib/data/` using explicit interfaces and `as const` assertions where appropriate. Each page or content domain gets its own data file with corresponding type definitions. No external APIs or databases are needed -- all content is hardcoded as static TypeScript exports, which is the standard Next.js pattern for static marketing sites.

**Primary recommendation:** Create one data file per content domain (e.g., `services.ts`, `software.ts`, `team.ts`) with co-located type definitions, using strict TypeScript interfaces with no `any` types. Download team photos via curl/wget from kenexis.com WordPress uploads. Source stock images by manually selecting and downloading from Unsplash/Pexels (no API key needed for manual downloads).

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-03 | All real content scraped from kenexis.com and structured into typed TypeScript data files -- nothing invented | Full site content mapped below: 8 page categories, ~25 pages, all text content extracted and documented in this research. Data file structure and TypeScript patterns defined. |
| FOUND-04 | Real team photos and headshots downloaded from kenexis.com and stored locally | 10 team members identified with direct photo URLs from kenexis.com/wp-content/uploads/. All URLs verified and documented below. |
| FOUND-05 | Stock industrial imagery sourced from Unsplash/Pexels for heroes and section backgrounds | Unsplash and Pexels both offer free commercial-use licenses. Search categories identified: oil refinery, petrochemical, control room, safety equipment, industrial plant. 6-10 images needed. |
</phase_requirements>

## Standard Stack

### Core (already installed -- no new dependencies needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| TypeScript | ^5 | Type-safe data files | Already configured with strict mode in tsconfig.json |
| Next.js | 16.1.6 | Static site framework | Already installed; data files imported directly by page components |

### Supporting (one-time scripts, not production dependencies)

| Tool | Purpose | When to Use |
|------|---------|-------------|
| curl / wget | Download team photos from kenexis.com | One-time script to download ~10 headshot images |
| Node.js fs/https | Alternative image download script | If curl/wget unavailable on Windows |
| Manual browser download | Unsplash/Pexels stock images | Browse, select, and download 6-10 stock photos |

### No New Dependencies Needed

This phase adds NO new npm packages. All work is:
1. Creating `.ts` data files with typed content (pure TypeScript)
2. Downloading images to `public/images/` (one-time file operations)
3. No runtime libraries, no scraping frameworks, no API clients

## Architecture Patterns

### Recommended Data Layer Structure

```
src/lib/data/
  types.ts              # Shared type definitions used across data files
  navigation.ts         # Nav menu structure, mega menu items
  home.ts               # Homepage content: hero, pillars, stats, CTAs
  services.ts           # Service landing + 4 detail pages
  software.ts           # Software landing + 7 product pages, KISS platform
  training.ts           # Training courses, Kenexis Unlimited
  resources.ts          # Resource categories, webinar listings, podcast info
  company.ts            # About page, team members, representatives
  careers.ts            # Job listings, company culture, benefits
  contact.ts            # Contact info, form fields, social links
```

```
public/images/
  team/                 # Real headshot photos from kenexis.com
    edward-marszal.png
    kevin-mitchell.png
    christopher-weil.png
    sean-cunningham.png
    austin-bryan.png
    elizabeth-smith.png
    stephen-gorrell.png
    arthur-pierce.jpg
    mohammed-alzinati.png
    john-applegate.jpg
  stock/                # Industrial stock photos from Unsplash/Pexels
    hero-refinery.jpg
    hero-control-room.jpg
    hero-industrial-plant.jpg
    hero-safety-equipment.jpg
    bg-industrial-1.jpg
    bg-industrial-2.jpg
    services-hero.jpg
    software-hero.jpg
    training-hero.jpg
    about-hero.jpg
```

### Pattern 1: Typed Data File with Co-located Types

**What:** Each data file exports both its TypeScript interfaces AND the data objects.
**When to use:** Every data file in this phase.

```typescript
// src/lib/data/services.ts

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
}

export interface SubService {
  name: string;
  description: string;
}

export const serviceAreas: ServiceArea[] = [
  {
    id: "pha",
    name: "Process Hazards Analysis",
    slug: "pha",
    shortDescription: "Systematic approach to identifying and evaluating potential risks in industrial processes.",
    fullDescription: "Kenexis provides Process Hazards Analysis facilitation and documentation aligned with ISA/IEC 61511...",
    methodology: ["HAZOP Studies", "LOPA Analysis", "QRA"],
    subServices: [
      { name: "HAZID Studies", description: "Hazard Identification studies..." },
      // ...
    ],
    deliverables: ["Facilitated workshop documentation", "SIL calculations and verification", "Risk assessments"],
    relatedServiceIds: ["sis", "qra"],
    heroImage: "/images/stock/services-hero.jpg",
    icon: "shield",
  },
  // ... more services
];

export function getServiceBySlug(slug: string): ServiceArea | undefined {
  return serviceAreas.find((s) => s.slug === slug);
}
```

### Pattern 2: Shared Types Module

**What:** Common types used across multiple data files live in a shared `types.ts`.
**When to use:** For cross-cutting types like `NavItem`, `SocialLink`, `ContactInfo`.

```typescript
// src/lib/data/types.ts

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
```

### Pattern 3: Const Assertions for Enumerations

**What:** Use `as const` for fixed sets of values like service IDs, product IDs, etc.
**When to use:** Where values are fixed and should be narrow-typed.

```typescript
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
```

### Pattern 4: Image Path Constants

**What:** All image paths defined as constants in data files, never as inline strings in components.
**When to use:** Every reference to an image in public/.

```typescript
// Image paths are always relative to public/
export const TEAM_IMAGES = {
  "edward-marszal": "/images/team/edward-marszal.png",
  "kevin-mitchell": "/images/team/kevin-mitchell.png",
  // ...
} as const;

export const STOCK_IMAGES = {
  heroRefinery: "/images/stock/hero-refinery.jpg",
  heroControlRoom: "/images/stock/hero-control-room.jpg",
  // ...
} as const;
```

### Anti-Patterns to Avoid

- **Raw HTML in data files:** Strip ALL HTML tags, WordPress shortcodes (`[caption]`, `[gallery]`), and inline styles. Data files contain plain text only.
- **External CDN URLs for images:** Never reference `kenexis.com/wp-content/uploads/` or any external URL in data files. All images must be local in `public/images/`.
- **Using `any` type:** Every field must have an explicit type. No `Record<string, any>` or loose typing.
- **Monolithic data file:** Don't put all content in one massive file. Split by domain.
- **Duplicating content across files:** Use IDs and cross-references rather than copying content. E.g., `relatedServiceIds: ["pha", "sis"]` not embedding full service objects.
- **Storing full page copy in data:** Keep text in natural paragraph units. Don't try to encode layout or formatting -- that's the component's job.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| HTML-to-text conversion | Custom regex parser | Manual extraction (already done in research) | Content is straightforward prose; regex HTML parsing is fragile and unnecessary |
| Image downloading | Complex scraping framework | Simple curl commands or Node.js https.get | Only ~10 team photos with known URLs; no need for Puppeteer/Playwright |
| Stock image search | Unsplash/Pexels API integration | Manual browse-and-download from unsplash.com and pexels.com | Only need 6-10 images once; API setup overhead not justified |
| Content scraping | Automated web scraper | Content already extracted in this research document | All text content is captured below; no runtime scraping needed |
| Type generation | Schema-based code gen | Hand-written interfaces | Small number of types; codegen would add unnecessary complexity |

**Key insight:** This is a one-time content extraction task, not ongoing syncing. All the content has been extracted during this research phase. The implementation task is to organize and type it, not to build scraping infrastructure.

## Common Pitfalls

### Pitfall 1: Leaving External URLs in Data Files
**What goes wrong:** Data files reference images at `https://www.kenexis.com/wp-content/uploads/...` or Unsplash hotlinks instead of local paths.
**Why it happens:** Copy-pasting content without converting image references.
**How to avoid:** All image paths must start with `/images/`. Run a grep for `http` in data files as a verification step.
**Warning signs:** `npx next build` may succeed but images will fail in production or when kenexis.com changes.

### Pitfall 2: WordPress Artifacts in Content
**What goes wrong:** Data files contain WordPress shortcodes like `[caption id="..."]`, `&amp;`, `<br/>`, or inline CSS.
**Why it happens:** Copy-pasting raw page content without cleaning.
**How to avoid:** All content should be clean prose text. Grep for `[`, `<`, `&amp;` in data files.
**Warning signs:** Garbled text or markup appearing in rendered components.

### Pitfall 3: Missing or Incorrect Image Paths
**What goes wrong:** Data files reference `/images/team/edward-marszal.png` but the file is actually `edward_marszal.png` or doesn't exist.
**Why it happens:** Inconsistent naming between data files and downloaded files.
**How to avoid:** Establish a naming convention (lowercase-kebab-case) and verify every path resolves with a script.
**Warning signs:** Broken images showing alt text instead of photos.

### Pitfall 4: Overly Granular or Overly Flat Data Structure
**What goes wrong:** Either every paragraph is a separate field (too granular) or entire pages are single string fields (too flat).
**Why it happens:** Not thinking about how components will consume the data.
**How to avoid:** Structure data at the level components will use it: sections have headings and body text, products have features arrays, etc.
**Warning signs:** Components doing excessive string manipulation or not having enough structure to render distinct UI sections.

### Pitfall 5: Inconsistent Team Photo Formats
**What goes wrong:** Some team photos are `.png` (transparent background), some are `.jpg` (with background), different sizes/aspects.
**Why it happens:** Kenexis uploads are mixed formats and sizes.
**How to avoid:** Download all originals first, then note actual formats. The current site uses `.png` with no-background ("nb") for most and `.jpg` for newer hires.
**Warning signs:** Visual inconsistency in the team grid component.

### Pitfall 6: TypeScript Strict Mode Failures
**What goes wrong:** Build fails because optional fields are accessed without null checks, or arrays could be empty.
**Why it happens:** Not accounting for TypeScript strict mode (`strict: true` in tsconfig.json).
**How to avoid:** Use `?` for truly optional fields, provide defaults, and ensure arrays are typed even when empty.
**Warning signs:** `tsc` errors on `Object is possibly 'undefined'`.

## Scraped Content Reference

### Complete Site Content Map

All content below was extracted from live kenexis.com on 2026-03-03. This is the authoritative source for data file creation.

---

### Homepage Content

**Hero:**
- Headline: "Process safety experts: Services, Software, Training"
- Subheadline: "A leading technical safety consultancy specializing in risk analysis and engineered safeguards for the chemical process industry"

**Three Pillars:**
1. Engineering Consulting Services -- PHA, QRA, Fire & Gas Mapping, SIS
2. Software Products -- Cloud-based KISS platform with 7 products
3. Training -- Process safety training center with courses

**Statistics (for counter animations):**
- Founded: 2004 (22 years in 2026)
- Global representatives in 10+ countries
- 7 integrated software products

**Featured Content Sections:**
- "Safe and Clean Green Energy" -- energy storage safety
- "Oil & Gas, Petrochemical Changes" -- processing hydrocarbons
- Newsletter signup for monthly safety articles and webinar announcements
- Kenexis Unlimited cloud-based software and training suite promotion

---

### Services Content (4 service areas)

**1. Process Hazards Analysis (PHA)**
- URL: /services/pha/
- Description: Systematic approach to identifying and evaluating potential risks aligned with ISA/IEC 61511 and OSHA PSM
- Sub-services: HAZID, HAZOP, LOPA, QRA, Auditing, Continuing Engineering Support
- Deliverables: Workshop documentation, SIL calculations, Risk assessments, FSM maintenance support
- Related: Open-PHA software, Open-Audit software

**2. Quantitative Risk Analysis (QRA)**
- URL: /services/qra/
- Description: Advanced probabilistic evaluation quantifying risk through detailed modeling
- Sub-services: FMEA, Facility Siting (API RP 752), Gaussian Modeling, CFD, Continuing Engineering Support
- Regulatory: OSHA PSM Standard 29 CFR 1910.119

**3. Fire & Gas Mapping**
- URL: /services/fire-gas-mapping/ (actual URL is long legacy slug)
- Description: Performance-based fire and gas detection mapping per ISA TR84.00.07
- Coverage Grades: A (90%), B (80%), C (60%)
- Sub-services: 8 core elements from philosophy to re-evaluation
- Software: Effigy proprietary tool
- Methods: Scenario Coverage, Geographical Coverage

**4. Safety Instrumented Systems (SIS)**
- URL: /services/sis/
- Description: Lifecycle services governed by IEC 61511 and IEC 61508
- Sub-services: SIL Verification, Test Plan Development, Functional Safety Assessment, Site Acceptance Testing, Safety Requirements Specification
- Software: Vertigo for SIL verification

---

### Software Products (7 products + platform)

**KISS Platform Overview:**
- Name: Kenexis Integrated Safety Suite (KISS)
- Description: Seamlessly integrated software modules for comprehensive process safety management
- Features: Single platform, individual or combined modules, built-in dashboards, AI-powered help, integrated training, Microsoft Azure security
- Login: kiss.kenexis.com
- Store: store.kenexis.com

**1. Open-PHA (R)**
- Purpose: PHA, HAZOP, LOPA, checklists
- Tagline: "Simplified PHA Management with Clear Pricing, Easy Access & Legacy Study Migration"
- Desktop: Free download (Windows/Mac/Linux)
- Cloud: $2,300 USD/year per concurrent user
- Key Features: Configurable worksheets, risk matrices, recommendation tracking, LOPA support, bowtie diagrams (cloud), custom reporting
- URL: /software/openpha/

**2. Vertigo(TM)**
- Purpose: SIS Lifecycle Management and SIL Verification
- Pricing: $5,700 USD/year single concurrent user
- Key Features: Equipment failure rate database, SIL verification engine (ISA TR84.00.02), IPF management, SRS documentation, cause & effect diagrams, dashboards
- Integration: Open-PHA, Arbor
- URL: /software/sis-lifecycle-management-and-sil-verification/

**3. Arbor(TM)**
- Purpose: Fault-tree analysis for system reliability modeling
- Pricing: $1,450 USD/year single concurrent user
- Key Features: Minimum cut set analysis, failure rate database, sensitivity analysis, Vertigo integration
- URL: /software/arbor/

**4. Bowtie-Q(TM)**
- Purpose: Quantitative bowtie analysis
- Pricing: $3,500 USD/year per concurrent user
- Key Features: Interactive diagram builder, study dashboards, risk criteria view, automatic quantitative calculations (TMEL compliance), revision tracking
- URL: /software/quantitative-bowtie-analysis/

**5. Open-Audit(TM)**
- Purpose: Validation and auditing (IEC 61511, OSHA 1910.119)
- Desktop: Free (Windows/Mac/Linux)
- Cloud: $1,450 USD/year single concurrent user
- Key Features: Assessor worksheets, evidence documentation, scoring criteria, audit tracking, template libraries, custom reports
- URL: /software/open-audit/

**6. Effigy(R)**
- Purpose: Fire and gas mapping with patented plume modeling
- Pricing: $13,250 USD/year single concurrent user
- Key Features: Geographic and scenario coverage, 3D CAD import (STL), ISA-TR84.00.07 compliance, patented tech (US Pat 10,600,057), color-coded maps
- URL: /software/effigy/

**7. KISS API(TM)**
- Purpose: Application Programming Interface for data integration
- Pricing: $5,000 USD/year (1M API calls)
- Key Features: JSON data format, Power BI/Tableau/CMMS/ERP integration, Open-PHA and Vertigo data access, workflow automation
- URL: /software/kiss-api-application-programming-interface/

---

### Training Content

**Process Safety Training Center:**
- Format: Online on-demand with video instruction, downloadable content, quizzes
- Pricing: $950 USD/year per person
- Trial: 3-day trial available
- Certificates: Completion certificates (not industry certifications)

**Courses (16+ identified):**
1. Layer of Protection Analysis (LOPA) -- Participant Training
2. Safety Instrumented Systems Overview and Awareness
3. Safety Requirements Specifications (SRS)
4. Security PHA Review
5. SIL Verification
6. SIS -- Maintenance, Management, and Operations Responsibilities
7. Effigy software training
8. Open-PHA software training
9. Vertigo software training
10. Bowtie for Open-PHA
11. Fire Detector Coverage Calculations
12. Introduction to Fire and Gas Mapping
13. ISA TR 84.00.07-2019 Changes
14. Open-PHA Custom Reporting
15. Gas Detector Placement
16. OpScope Procedure Design & Execution

**Kenexis Unlimited:**
- Bundle: All software + all training access
- Includes: Unlimited users, migration services
- Pricing: Contact for quote

---

### Resources Content

**Categories:**
1. News -- /news/
2. Recorded Webinars -- /recorded/ (or /resources/recorded/)
3. Newsletter Registration -- /newsletter/
4. Tools -- /resources/tools/
5. Papers, Articles & Books -- /resources/papers/
6. Videos -- YouTube channel (@Kenexis)
7. Functional Safety Podcast -- Spotify (Kenexis Functional Safety Podcast)

**External Links:**
- YouTube: https://www.youtube.com/@Kenexis
- Spotify: https://open.spotify.com/show/77uAv2QNmFPqDaDT6gK8Ag
- RSS: https://www.kenexis.com/news/feed/

---

### Company/About Content

**Company Info:**
- Founded: 2004
- Founders: Edward Marszal and Kevin Mitchell
- Ownership: Privately owned
- HQ: 3366 Riverside Drive, Suite 200, Columbus, Ohio 43221 USA
- Additional Office: Houston, Texas
- Phone: +1 (614) 451-7031
- Fax: +1 (614) 451-2643
- Email: info@Kenexis.com

**Mission/Description:**
"A process safety consulting and engineering firm specializing in technical safety services for chemical and energy facilities" delivering "performance-based fire and gas mapping, as well as risk analysis" solutions.

**Industries Served:** Oil & gas, petrochemical, chemical, power, manufacturing
**Regulatory Alignment:** OSHA PSM, IEC 61511, NFPA, ISA 84

---

### Team Members (10 identified)

| # | Name | Title | Credentials | Photo URL |
|---|------|-------|-------------|-----------|
| 1 | Edward Marszal | President | PE, P2SAC Purdue University | wp-content/uploads/2019/08/EM-nb.png |
| 2 | Kevin Mitchell | Vice President | PE, ISA/IEC 61511 SIS Expert, CFSE | wp-content/uploads/2019/08/KM-nb.png |
| 3 | Christopher Weil | Senior Consultant, Houston Regional Manager | ISA/IEC 61511 SIS Expert, GICSP | wp-content/uploads/2019/08/CW-nb.png |
| 4 | Sean Cunningham | Senior Engineer | ISA/IEC 61511 SIS Expert | wp-content/uploads/2019/08/SC-nb.png |
| 5 | Austin Bryan | Senior Engineer | ISA/IEC 61511 SIS Expert | wp-content/uploads/2019/08/AB-nb.png |
| 6 | Elizabeth Smith | Senior Engineer | PE, ISA/IEC 61511 SIS Expert | wp-content/uploads/2019/08/ES-nb.png |
| 7 | Stephen Gorrell | Senior Engineer | ISA/IEC 61511 SIS Expert | wp-content/uploads/2019/08/SG-nb.png |
| 8 | Arthur Pierce | Senior Engineer | ISA/IEC 61511 SIS Expert | wp-content/uploads/2022/06/AK-Pierce-968-2-scaled-e1656344437241.jpg |
| 9 | Mohammed Alzinati | Senior Engineer, Middle East Regional Manager | ISA/IEC 61511 SIS Expert | wp-content/uploads/2019/08/MA-nb.png |
| 10 | John Applegate | Senior Engineer | ISA/IEC 61511 SIS Expert | wp-content/uploads/2022/06/John-Applegate-964-2-scaled-e1656344521302.jpg |

All photo URLs are relative to `https://www.kenexis.com/`.

---

### Representatives (10 regions)

| # | Company | Contact | Region | Phone | Email/Website |
|---|---------|---------|--------|-------|---------------|
| 1 | Detection & Measurement Systems | Eric Sutton | Texas, USA | (713) 541-9800 | detect-measure.com |
| 2 | Westech | Adrian Petre | Canada | (403) 259-9701 | westech-ind.com |
| 3 | Ino-Tek | Jim Parker | Michigan/Midwest, USA | (586) 336-0856 | ino-tek.com |
| 4 | Dynamis | Marcilio Pongitori | Brazil/Argentina/Chile | +55 (19) 3291 6163 | dynamiscursos.com.br |
| 5 | Keystone Risk Management | Curtis Alexander | Trinidad/Caribbean/Latin America | 1-868-678-7162 | -- |
| 6 | ExidaSP | Adam Yousif | UAE/Algeria/India/Iraq | +971529901955 | -- |
| 7 | SGS ECL | Paul Ganter | Australia/New Zealand | +64 27 218 7523 | sgs.com/en-nz |
| 8 | Pinnacle Instruments | Poon Schoeman | South Africa | +2721 7063963 | pinnacleinstruments.co.za |
| 9 | Anar | -- | Turkey/Bulgaria | +90 212 438 46 32 | anar.com.tr |
| 10 | Velocis Solutions | -- | Azerbaijan | +994502022624 | velocis-solutions.com |
| 11 | UIT | Leo Park | South Korea | +82-2-2051-2350 | uitsolutions.com |

---

### Careers Content

**Current Openings (3):**
1. Process Safety Engineer (Senior) -- Columbus, OH or Houston, TX
2. Process Safety Engineer (Staff) -- Columbus, OH
3. Senior Electrical Engineer -- location not specified

**Company Values:** Safety and Quality, Integrity and Trust, Customer Focus and Innovation, Teamwork and Accountability

**Benefits:** Competitive salary, health/wellness/income protection, retirement with match, PTO, educational reimbursement, flexible work arrangements

**Application:** Submit resumes to employment@kenexis.com

---

### Contact Content

**Form Fields:**
1. Subject (required)
2. Message (required, 300 char limit)
3. Name (required, first/last)
4. Email (required)
5. Company Information (optional, for proposals)
6. CAPTCHA

**Contact Info:**
- Phone: +1-614-451-7031
- Email: info@Kenexis.com
- Address: 3366 Riverside Drive, Suite 200, Columbus, Ohio 43221 USA

**Social Links:**
- LinkedIn: https://www.linkedin.com/company/kenexis-consulting-corporation
- YouTube: https://www.youtube.com/@Kenexis
- Spotify: https://open.spotify.com/show/77uAv2QNmFPqDaDT6gK8Ag
- RSS: https://www.kenexis.com/news/feed/

---

## Code Examples

### Example: Complete Team Member Data File

```typescript
// src/lib/data/company.ts

import type { ContactInfo, SocialLink } from "./types";

// --- Types ---

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
  address: string;
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

// --- Data ---

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
    credentials: ["PE", "Member Scientific Advisory Board", "P2SAC Purdue University"],
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
  // ... (8 more members following same pattern)
];

// --- Helpers ---

export function getTeamMember(id: string): TeamMember | undefined {
  return teamMembers.find((m) => m.id === id);
}

export function getLeadership(): TeamMember[] {
  return teamMembers.filter((m) => m.isLeadership);
}
```

### Example: Image Download Script (One-time Use)

```bash
#!/bin/bash
# scripts/download-team-photos.sh
# Run once to download all team headshots from kenexis.com

mkdir -p public/images/team

BASE="https://www.kenexis.com/wp-content/uploads"

curl -o public/images/team/edward-marszal.png "$BASE/2019/08/EM-nb.png"
curl -o public/images/team/kevin-mitchell.png "$BASE/2019/08/KM-nb.png"
curl -o public/images/team/christopher-weil.png "$BASE/2019/08/CW-nb.png"
curl -o public/images/team/sean-cunningham.png "$BASE/2019/08/SC-nb.png"
curl -o public/images/team/austin-bryan.png "$BASE/2019/08/AB-nb.png"
curl -o public/images/team/elizabeth-smith.png "$BASE/2019/08/ES-nb.png"
curl -o public/images/team/stephen-gorrell.png "$BASE/2019/08/SG-nb.png"
curl -o public/images/team/arthur-pierce.jpg "$BASE/2022/06/AK-Pierce-968-2-scaled-e1656344437241.jpg"
curl -o public/images/team/mohammed-alzinati.png "$BASE/2019/08/MA-nb.png"
curl -o public/images/team/john-applegate.jpg "$BASE/2022/06/John-Applegate-964-2-scaled-e1656344521302.jpg"

echo "Downloaded $(ls public/images/team/ | wc -l) team photos"
```

### Example: Stock Image Selection Guide

```
Required stock images (manually download from Unsplash/Pexels):

1. hero-refinery.jpg
   Search: "oil refinery night" or "petrochemical plant sunset"
   Use: Homepage hero background
   Size: 1920x1080 minimum

2. hero-control-room.jpg
   Search: "industrial control room" or "SCADA control panel"
   Use: Software pages hero
   Size: 1920x1080 minimum

3. hero-safety-equipment.jpg
   Search: "industrial safety helmet" or "PPE industrial worker"
   Use: Services pages hero
   Size: 1920x1080 minimum

4. hero-industrial-plant.jpg
   Search: "chemical plant" or "industrial facility"
   Use: About/company hero
   Size: 1920x1080 minimum

5. bg-industrial-1.jpg
   Search: "refinery pipes" or "industrial piping"
   Use: Section background accent
   Size: 1920x800 minimum

6. bg-industrial-2.jpg
   Search: "gas pipeline" or "industrial valve"
   Use: Section background accent
   Size: 1920x800 minimum

7. training-hero.jpg
   Search: "engineering training" or "professional development classroom"
   Use: Training page hero
   Size: 1920x1080 minimum

8. careers-hero.jpg
   Search: "engineering team" or "professional collaboration"
   Use: Careers page hero
   Size: 1920x1080 minimum

Sources:
- https://unsplash.com/s/photos/oil-refinery
- https://unsplash.com/s/photos/petrochemical
- https://unsplash.com/s/photos/industrial
- https://www.pexels.com/search/oil%20and%20gas/
- https://www.pexels.com/search/oil%20and%20gas%20industry/

License: All Unsplash and Pexels images are free for commercial use, no attribution required.
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JSON data files with separate type definitions | TypeScript data files with co-located types and `satisfies` operator | TypeScript 4.9+ (2022) | Single source of truth; types checked at definition site |
| CMS content fetching at build time | Static TypeScript data imports | N/A (always valid for static sites) | Zero build-time API calls; instant builds |
| Runtime image URL resolution | Static paths in public/ with Next.js Image component | Next.js 13+ (2022) | Automatic optimization, WebP conversion, lazy loading |

## Open Questions

1. **Additional team members not on senior staff page?**
   - What we know: 10 team members identified on /about/meet-the-team/
   - What's unclear: There may be additional staff not listed on the senior staff page
   - Recommendation: Use the 10 identified members. The pitch demo only needs the senior staff page content.

2. **Exact stock images to use?**
   - What we know: Need 6-10 industrial stock photos from Unsplash/Pexels
   - What's unclear: Exact photos depend on visual taste/composition
   - Recommendation: Select during implementation. The search categories and size requirements are defined above.

3. **News/articles content depth?**
   - What we know: Resources page links to news, webinars, papers, podcast
   - What's unclear: How many individual articles/webinars to include in data files
   - Recommendation: Include 3-4 recent items per category as sample content. The resources page is a category overview, not a complete archive.

4. **Kenexis logo file?**
   - What we know: The site uses a Kenexis logo in the header
   - What's unclear: Whether to download the logo or recreate it
   - Recommendation: Download the actual logo from the site header. Check /wp-content/ for logo files or extract from page source.

## Sources

### Primary (HIGH confidence)
- https://www.kenexis.com -- Homepage content extracted 2026-03-03
- https://www.kenexis.com/about/ -- Company info extracted 2026-03-03
- https://www.kenexis.com/about/meet-the-team/ -- All 10 team members with photo URLs
- https://www.kenexis.com/about/representatives/ -- All 11 global representatives
- https://www.kenexis.com/services/ -- All 4 service areas with sub-services
- https://www.kenexis.com/services/pha/ -- PHA service detail
- https://www.kenexis.com/services/qra/ -- QRA service detail
- https://www.kenexis.com/services/sis/ -- SIS service detail
- https://www.kenexis.com/services/analyze-loss-of-containment-leak-characteristics-risk-appropriately-and-design-a-solution-to-provide-the-appropriate-performance-level-of-risk-reduction/ -- Fire & Gas Mapping detail
- https://www.kenexis.com/software/ -- All 7 software products
- https://www.kenexis.com/software/openpha/ -- Open-PHA product detail
- https://www.kenexis.com/software/sis-lifecycle-management-and-sil-verification/ -- Vertigo detail
- https://www.kenexis.com/software/arbor/ -- Arbor detail
- https://www.kenexis.com/software/quantitative-bowtie-analysis/ -- Bowtie-Q detail
- https://www.kenexis.com/software/open-audit/ -- Open-Audit detail
- https://www.kenexis.com/software/effigy/ -- Effigy detail
- https://www.kenexis.com/software/kiss-api-application-programming-interface/ -- KISS API detail
- https://www.kenexis.com/technical-safety-training/ -- Training center
- https://www.kenexis.com/resources/ -- Resource categories
- https://www.kenexis.com/about/employment/ -- Careers and job listings
- https://www.kenexis.com/contact/ -- Contact form and info

### Secondary (MEDIUM confidence)
- Unsplash search results for industrial/refinery imagery -- verified free commercial license
- Pexels search results for oil & gas imagery -- verified free commercial license

### Tertiary (LOW confidence)
- Exact number of additional team members beyond senior staff page -- may exist but not indexed
- Precise article/webinar counts for resources page -- sample content sufficient for demo

## Metadata

**Confidence breakdown:**
- Content extraction: HIGH -- All major pages scraped directly, content verified
- Team member data: HIGH -- All 10 members with photo URLs verified from live site
- Data architecture: HIGH -- Standard Next.js TypeScript patterns, no novel approaches
- Stock imagery strategy: MEDIUM -- Sources identified, exact images require manual selection
- Completeness of content: MEDIUM -- Major pages covered, some sub-pages (individual articles, webinar pages) sampled rather than exhaustively scraped

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (content changes infrequently on corporate sites; team/products stable)
