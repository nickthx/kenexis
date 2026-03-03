# Roadmap: Kenexis Website Redesign

## Overview

This roadmap delivers a complete, production-quality visual redesign of kenexis.com as a pitch demo for company president Edward Marszal. The 10 phases progress from project scaffolding and content scraping through layout, homepage, and all content pages, culminating in polish and Vercel deployment. Each phase delivers a coherent, verifiable capability. The homepage (Phase 3) serves as the visual proof of concept, Phases 4-8 build out every page section on the site, and Phases 9-10 ensure the demo is production-quality and deployed. Phases 1-5 constitute the minimum viable pitch; Phases 6-10 complete the full site mirror.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Scaffolding** - Next.js 15 project setup, brand design system, shadcn/ui initialization, and 21st.dev component evaluation
- [ ] **Phase 2: Content Scraping & Data Layer** - Scrape all kenexis.com content into typed TypeScript data files, download all images locally
- [x] **Phase 3: Layout Shell & Navigation** - Sticky header with mega menu, mobile navigation, footer, breadcrumbs, and page transition infrastructure (completed 2026-03-03)
- [ ] **Phase 4: Homepage & Visual Design System** - Complete homepage with all sections, reusable section components, scroll animations, and established visual language
- [ ] **Phase 5: Services Pages** - Services landing page plus all four service detail pages with cross-links
- [ ] **Phase 6: Software Products - Core** - Software landing page, product ecosystem visualization, Open-PHA and Vertigo product pages, KISS platform CTAs
- [ ] **Phase 7: Software Products - Complete** - Remaining five product pages (Arbor, Bowtie-Q, Open-Audit, Effigy, KISS API) plus comparison tables
- [ ] **Phase 8: Training & Resources** - Training page with courses and Kenexis Unlimited, resource hub with all content types
- [ ] **Phase 9: Company, Careers & Contact** - About page with team grid, representatives, careers page, and contact form
- [ ] **Phase 10: Polish, SEO & Deployment** - Responsive audit, performance optimization, SEO metadata, and Vercel deployment with shareable URL

## Phase Details

### Phase 1: Foundation & Scaffolding
**Goal**: A working Next.js 15 project with the complete brand design system, component library, and project architecture ready for page building
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-06
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` starts a Next.js 15 development server with zero errors on a blank page
  2. The navy (#0a1628) primary color, orange (#e87722) accent color, and Inter typography render correctly through Tailwind CSS utility classes
  3. At least one shadcn/ui component and one 21st.dev component are installed and render with the project's brand colors
  4. The project structure follows the (marketing) route group pattern with separate layout for public pages
**Plans**: 1 plan

Plans:
- [x] 01-01: Scaffold Next.js 16 + Tailwind v4 brand design system + shadcn/ui + 21st.dev ShimmerButton

### Phase 2: Content Scraping & Data Layer
**Goal**: All real kenexis.com content captured in typed TypeScript data files and all images stored locally, ready to feed into page components
**Depends on**: Phase 1
**Requirements**: FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. Every page listed in PROJECT.md (home, services, software, training, resources, about, careers, contact) has a corresponding typed data file in lib/data/ with real content from kenexis.com
  2. All team member photos and headshots from kenexis.com are downloaded and accessible in public/images/team/
  3. Industrial stock images for hero sections and backgrounds are downloaded and accessible in public/images/stock/
  4. TypeScript compilation succeeds with strict mode -- all data files are fully typed with no `any` types
  5. No data file contains raw HTML, WordPress shortcodes, or external CDN image URLs
**Plans**: 2 plans

Plans:
- [ ] 02-01-PLAN.md — Complete TypeScript data layer (10 typed data files with all site content)
- [ ] 02-02-PLAN.md — Image assets (team photos, logo, and industrial stock imagery)

### Phase 3: Layout Shell & Navigation
**Goal**: Users can navigate the full site structure via a polished, responsive navigation system that persists across all pages
**Depends on**: Phase 2
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05, NAV-06
**Success Criteria** (what must be TRUE):
  1. User sees a sticky header that transitions from transparent to solid background on scroll, with the Kenexis logo and primary navigation links
  2. User can hover over Services, Software, and Training nav items to see mega menu dropdowns with grouped sub-links, descriptions, and icons
  3. User on a 375px mobile viewport can open a hamburger menu and navigate to any page via accordion sub-navigation
  4. User sees breadcrumb navigation on service and product sub-pages showing the hierarchy (e.g., Home > Software > Open-PHA)
  5. User sees a comprehensive footer with sitemap links, phone/email, social links (LinkedIn, YouTube, Spotify), KISS login, Kenexis Store link, and copyright
**Plans**: 2 plans

Plans:
- [ ] 03-01-PLAN.md — Install deps, navigation utilities, sticky header with mega menu, mobile nav, and breadcrumbs
- [ ] 03-02-PLAN.md — Comprehensive footer, layout wiring with ViewTransitions, and visual verification

### Phase 4: Homepage & Visual Design System
**Goal**: Users see a complete, polished homepage that establishes the premium visual language and creates all reusable section components used by subsequent pages
**Depends on**: Phase 3
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, VIS-01, VIS-02, VIS-03, VIS-04, VIS-05, VIS-06
**Success Criteria** (what must be TRUE):
  1. User sees a full-width hero section with industrial imagery, clear value proposition, and dual CTAs ("Explore Services" and "Try Our Software") that link to their respective pages
  2. User sees a three-pillar overview (Consulting, Software, Training) with icons, descriptions, and working CTAs to each section
  3. User sees animated statistics counters (years in business, projects completed, global reach) that count up when scrolling into view
  4. User sees a recent content feed, newsletter signup form, and prominent contact CTA section -- all with consistent navy/orange palette, Inter typography, and generous whitespace
  5. User sees subtle scroll-triggered fade-in and stagger-reveal animations on all major sections via motion library
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD
- [ ] 04-03: TBD

### Phase 5: Services Pages
**Goal**: Users can explore all four Kenexis consulting service areas through a polished landing page and individual detail pages
**Depends on**: Phase 4
**Requirements**: SERV-01, SERV-02, SERV-03, SERV-04, SERV-05, SERV-06
**Success Criteria** (what must be TRUE):
  1. User sees a services landing page with a grid of all four service areas (PHA, QRA, Fire & Gas Mapping, SIS) with descriptions and links to detail pages
  2. User can read each of the four service detail pages (PHA/HAZOP/LOPA, QRA, Fire & Gas Mapping, SIS) with problem statement, methodology, deliverables sections
  3. User sees related services cross-links at the bottom of each service detail page that navigate to other service pages
  4. All service pages follow the established visual language (dark hero sections, scroll animations, consistent typography and color palette)
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD

### Phase 6: Software Products - Core
**Goal**: Users can explore the KISS software platform overview and the two flagship product pages in a modern SaaS-style presentation
**Depends on**: Phase 4
**Requirements**: SOFT-01, SOFT-02, SOFT-03, SOFT-04, SOFT-11
**Success Criteria** (what must be TRUE):
  1. User sees a software landing page with the KISS platform overview and a product suite grid showing all 7 products with icons, names, descriptions, and CTAs
  2. User sees an interactive product ecosystem visualization showing how the 7 KISS products interrelate within the platform
  3. User can read the Open-PHA product page with SaaS-style hero, feature grid, benefits section, and CTA linking to KISS platform
  4. User can read the Vertigo product page with the same SaaS-style structure
  5. User sees clear CTAs linking to kiss.kenexis.com (login) and store.kenexis.com (purchase) that open in new tabs
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD
- [ ] 06-03: TBD

### Phase 7: Software Products - Complete
**Goal**: Users can explore every KISS platform product with dedicated pages and comparison tables showing modern vs. traditional approaches
**Depends on**: Phase 6
**Requirements**: SOFT-05, SOFT-06, SOFT-07, SOFT-08, SOFT-09, SOFT-10
**Success Criteria** (what must be TRUE):
  1. User can read dedicated product pages for Arbor, Bowtie-Q, Open-Audit, Effigy, and KISS API -- each with the same SaaS-style structure established in Phase 6
  2. User sees comparison tables on software product pages showing modern KISS capabilities versus traditional approaches
  3. All seven product pages are accessible from the software landing page grid and from the mega menu navigation
**Plans**: TBD

Plans:
- [ ] 07-01: TBD
- [ ] 07-02: TBD

### Phase 8: Training & Resources
**Goal**: Users can explore Kenexis training offerings and access all resource content types from a centralized hub
**Depends on**: Phase 4
**Requirements**: TRAIN-01, TRAIN-02, RES-01, RES-02, RES-03, RES-04, RES-05, RES-06
**Success Criteria** (what must be TRUE):
  1. User sees a training page with course listings showing names, descriptions, formats, and links to details
  2. User sees Kenexis Unlimited subscription presented in a SaaS-style format showing what is included (all software + all training access)
  3. User sees a centralized resource hub page with all content types organized and categorized (webinars, papers, podcast, tools)
  4. User can view recorded webinar listings, papers/articles/books listings, and podcast episodes linking to Spotify
  5. User can register for the newsletter from the resources page and sees links to YouTube channel and RSS feed
**Plans**: TBD

Plans:
- [ ] 08-01: TBD
- [ ] 08-02: TBD

### Phase 9: Company, Careers & Contact
**Goal**: Users can learn about Kenexis as a company, view the team, find representatives, explore career opportunities, and submit an inquiry
**Depends on**: Phase 4
**Requirements**: COMP-01, COMP-02, COMP-03, CAREER-01, CONTACT-01, CONTACT-02
**Success Criteria** (what must be TRUE):
  1. User can read the company overview page with Kenexis history, mission, and key differentiators
  2. User sees senior staff/team section with real photos, names, titles, and brief bios from kenexis.com
  3. User can view the representatives page listing global representatives with regions and contact details
  4. User can view the careers page with job listings and company culture information
  5. User can fill out and submit a contact form (demo mode with success toast) and sees phone (+1-614-451-7031) and email (info@kenexis.com) prominently displayed
**Plans**: TBD

Plans:
- [ ] 09-01: TBD
- [ ] 09-02: TBD

### Phase 10: Polish, SEO & Deployment
**Goal**: The complete site is responsive, performant, SEO-ready, and deployed to Vercel with a shareable URL that previews correctly when shared
**Depends on**: Phase 5, Phase 6, Phase 7, Phase 8, Phase 9
**Requirements**: TECH-01, TECH-02, TECH-03, TECH-04, TECH-05
**Success Criteria** (what must be TRUE):
  1. All pages render correctly and are fully usable on viewports from 320px to 1440px+ with no layout breaks
  2. All pages load under 3 seconds with optimized images (WebP, lazy loading) and minimal JavaScript bundle
  3. Sharing the Vercel URL on LinkedIn or Slack shows correct title, description, and Open Graph preview image for every page
  4. The site is live on Vercel with a shareable URL that loads without errors
  5. All external links (KISS login, Kenexis Store, LinkedIn, YouTube, Spotify) open in new tabs and resolve correctly

**Plans**: TBD

Plans:
- [ ] 10-01: TBD
- [ ] 10-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 (and 6, 8, 9 can parallelize after 4) -> 7 -> 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Scaffolding | 1/1 | Complete | 2026-03-03 |
| 2. Content Scraping & Data Layer | 2/2 | Complete | 2026-03-03 |
| 3. Layout Shell & Navigation | 2/2 | Complete   | 2026-03-03 |
| 4. Homepage & Visual Design System | 0/0 | Not started | - |
| 5. Services Pages | 0/0 | Not started | - |
| 6. Software Products - Core | 0/0 | Not started | - |
| 7. Software Products - Complete | 0/0 | Not started | - |
| 8. Training & Resources | 0/0 | Not started | - |
| 9. Company, Careers & Contact | 0/0 | Not started | - |
| 10. Polish, SEO & Deployment | 0/0 | Not started | - |
