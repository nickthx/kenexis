# Requirements: Kenexis Website Redesign

**Defined:** 2026-03-03
**Core Value:** Every page of kenexis.com faithfully reproduced with a dramatically better, premium visual design — deployed live on Vercel as a convincing pitch demo.

## v1 Requirements

Requirements for the full pitch demo. Each maps to roadmap phases.

### Foundation

- [x] **FOUND-01**: Project scaffolded with Next.js 15, React, TypeScript, Tailwind CSS v4, shadcn/ui, and motion library
- [x] **FOUND-02**: Brand design system established — navy (#0a1628) primary, orange (#e87722) accent, Inter typography, consistent spacing and component tokens
- [x] **FOUND-03**: All real content scraped from kenexis.com and structured into typed TypeScript data files — nothing invented
- [x] **FOUND-04**: Real team photos and headshots downloaded from kenexis.com and stored locally
- [x] **FOUND-05**: Stock industrial imagery sourced from Unsplash/Pexels for heroes and section backgrounds
- [x] **FOUND-06**: 21st.dev and local design repo components evaluated and integrated where they elevate quality

### Navigation & Layout

- [x] **NAV-01**: User sees sticky header with Kenexis logo and primary navigation that transitions from transparent to solid on scroll
- [x] **NAV-02**: User can access all site sections via mega menu dropdowns grouped by pillar (Services, Software, Training) with descriptions and product icons
- [x] **NAV-03**: User on mobile can navigate full site via hamburger menu with accordion sub-navigation
- [x] **NAV-04**: User sees breadcrumb navigation on all sub-pages for orientation within service/product hierarchies
- [x] **NAV-05**: User sees comprehensive footer with sitemap links, contact info (phone, email, address), social links (LinkedIn, YouTube, Spotify), KISS login link, Kenexis Store link, and copyright
- [x] **NAV-06**: User experiences smooth page transitions between routes via Framer Motion

### Homepage

- [ ] **HOME-01**: User sees full-width hero section with clear value proposition, industrial imagery background, and dual CTA ("Explore Services" + "Try Our Software")
- [ ] **HOME-02**: User sees three-pillar overview section (Consulting, Software, Training) with icons, descriptions, and CTAs linking to each pillar
- [ ] **HOME-03**: User sees social proof / trust signals section with industry metrics (years in business, projects, global reach)
- [ ] **HOME-04**: User sees recent content feed showing 3-4 latest articles/webinars/podcast episodes with dates and thumbnails
- [ ] **HOME-05**: User can sign up for the Kenexis newsletter via inline form
- [ ] **HOME-06**: User sees prominent contact CTA section near footer ("Ready to discuss your safety challenges?")

### Services

- [ ] **SERV-01**: User sees services landing page with overview grid of all service areas (PHA, QRA, Fire & Gas Mapping, SIS)
- [ ] **SERV-02**: User can read dedicated PHA/HAZOP/LOPA service detail page with problem statement, methodology, deliverables, and related services
- [ ] **SERV-03**: User can read dedicated QRA service detail page with same structure
- [ ] **SERV-04**: User can read dedicated Fire & Gas Mapping service detail page with same structure
- [ ] **SERV-05**: User can read dedicated SIS Design service detail page with same structure
- [ ] **SERV-06**: User sees related services cross-links at the bottom of each service detail page

### Software Products

- [ ] **SOFT-01**: User sees software landing page with KISS platform overview and product suite grid showing all 7 products with icons, names, descriptions, and CTAs
- [ ] **SOFT-02**: User sees interactive product ecosystem visualization showing how all 7 KISS products interrelate within the platform
- [ ] **SOFT-03**: User can read dedicated Open-PHA® product page with SaaS-style hero, feature grid, benefits section, and CTA to KISS platform
- [ ] **SOFT-04**: User can read dedicated Vertigo™ product page with same SaaS-style structure
- [ ] **SOFT-05**: User can read dedicated Arbor™ product page with same structure
- [ ] **SOFT-06**: User can read dedicated Bowtie-Q™ product page with same structure
- [ ] **SOFT-07**: User can read dedicated Open-Audit™ product page with same structure
- [ ] **SOFT-08**: User can read dedicated Effigy® product page with same structure
- [ ] **SOFT-09**: User can read dedicated KISS API™ product page with same structure
- [ ] **SOFT-10**: User sees comparison tables on software product pages showing modern capabilities vs traditional approaches
- [ ] **SOFT-11**: User sees clear CTAs linking to KISS platform login (kiss.kenexis.com) and Kenexis Store (store.kenexis.com)

### Training

- [ ] **TRAIN-01**: User sees training page with course listings showing course names, descriptions, formats, and links to details/registration
- [ ] **TRAIN-02**: User sees Kenexis Unlimited subscription overview with SaaS-style presentation of what's included (all software + all training access)

### Resources

- [ ] **RES-01**: User sees centralized resource hub page with all content types organized and categorized
- [ ] **RES-02**: User can view recorded webinar listings with titles, descriptions, and embedded/linked YouTube videos
- [ ] **RES-03**: User can access papers, articles, and books listings
- [ ] **RES-04**: User can see Kenexis Functional Safety Podcast section with episode listings linking to Spotify
- [ ] **RES-05**: User sees links to YouTube channel and RSS feed
- [ ] **RES-06**: User can register for the newsletter from the resources page

### Company

- [ ] **COMP-01**: User can read company overview page with Kenexis history, mission, and key differentiators
- [ ] **COMP-02**: User sees senior staff/team section with real photos, names, titles, and brief bios scraped from kenexis.com
- [ ] **COMP-03**: User can view representatives page listing global representatives with regions and contact details

### Careers

- [ ] **CAREER-01**: User can view careers page with current job listings and company culture information

### Contact

- [ ] **CONTACT-01**: User can submit inquiry via contact form with fields: name, email, company, phone, message, and service interest dropdown
- [ ] **CONTACT-02**: User sees phone number (+1-614-451-7031) and email (info@kenexis.com) prominently displayed on contact page and in header/footer

### Visual Design & Animation

- [ ] **VIS-01**: All pages use consistent navy/dark blue primary, orange/amber accent, and white background color palette
- [ ] **VIS-02**: All pages use Inter font family with clear typographic hierarchy (headings, subheadings, body, captions)
- [ ] **VIS-03**: User sees subtle scroll-triggered animations (fade-in, stagger reveals, counter animations) on key sections via Framer Motion
- [ ] **VIS-04**: User sees dark-mode hero sections with gradient accents and industrial photography overlays
- [ ] **VIS-05**: User sees animated statistics counters (years, projects, clients) that count up when scrolling into view
- [ ] **VIS-06**: All sections use generous whitespace, clear visual hierarchy, and premium B2B engineering aesthetic

### Technical

- [ ] **TECH-01**: Site is fully responsive and mobile-first, working correctly from 320px to 1440px+ viewports
- [ ] **TECH-02**: All pages load under 3 seconds with optimized images (WebP, lazy loading) and minimal JS bundle
- [ ] **TECH-03**: All pages have proper SEO metadata (title, description, Open Graph) so Vercel URL previews correctly when shared
- [ ] **TECH-04**: Site is deployed to Vercel with a shareable URL
- [ ] **TECH-05**: All external links (KISS login, Kenexis Store, LinkedIn, YouTube, Spotify) open in new tabs and work correctly

## v2 Requirements

Deferred to production adoption phase. Not in current roadmap.

### Content Management

- **CMS-01**: Content editors can update pages without developer intervention via headless CMS
- **CMS-02**: Blog/news section with dynamic content creation and publishing

### Advanced Features

- **ADV-01**: Site search with indexed results across all content types
- **ADV-02**: Analytics integration (GA4, heatmaps) for visitor tracking
- **ADV-03**: Full WCAG 2.1 AA accessibility audit and remediation
- **ADV-04**: Multi-language support for international audiences
- **ADV-05**: A/B testing infrastructure for CTA and layout optimization

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS / dynamic content management | Static pitch demo — all content hardcoded from kenexis.com |
| Authentication / login system | KISS login exists at kiss.kenexis.com — external link only |
| E-commerce / payment processing | Kenexis Store exists at store.kenexis.com — external link only |
| Live chat / chatbot | No support team behind it for a demo; process safety too specialized for generic AI |
| Hero image carousel / slider | Research shows carousels reduce engagement; single strong hero preferred |
| Video backgrounds | Performance-killing on mobile; static imagery with subtle CSS animations instead |
| Custom illustrations | Delays build; real photography conveys more engineering authority |
| Blog CMS | Static articles for demo; CMS is a v2 production concern |
| Database / backend | No server-side data needed for static marketing site |
| Custom domain | Vercel default URL sufficient for pitch demo |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 2 | Complete |
| FOUND-04 | Phase 2 | Complete |
| FOUND-05 | Phase 2 | Complete |
| FOUND-06 | Phase 1 | Pending |
| NAV-01 | Phase 3 | Complete |
| NAV-02 | Phase 3 | Complete |
| NAV-03 | Phase 3 | Complete |
| NAV-04 | Phase 3 | Complete |
| NAV-05 | Phase 3 | Complete |
| NAV-06 | Phase 3 | Complete |
| HOME-01 | Phase 4 | Pending |
| HOME-02 | Phase 4 | Pending |
| HOME-03 | Phase 4 | Pending |
| HOME-04 | Phase 4 | Pending |
| HOME-05 | Phase 4 | Pending |
| HOME-06 | Phase 4 | Pending |
| SERV-01 | Phase 5 | Pending |
| SERV-02 | Phase 5 | Pending |
| SERV-03 | Phase 5 | Pending |
| SERV-04 | Phase 5 | Pending |
| SERV-05 | Phase 5 | Pending |
| SERV-06 | Phase 5 | Pending |
| SOFT-01 | Phase 6 | Pending |
| SOFT-02 | Phase 6 | Pending |
| SOFT-03 | Phase 6 | Pending |
| SOFT-04 | Phase 6 | Pending |
| SOFT-05 | Phase 7 | Pending |
| SOFT-06 | Phase 7 | Pending |
| SOFT-07 | Phase 7 | Pending |
| SOFT-08 | Phase 7 | Pending |
| SOFT-09 | Phase 7 | Pending |
| SOFT-10 | Phase 7 | Pending |
| SOFT-11 | Phase 6 | Pending |
| TRAIN-01 | Phase 8 | Pending |
| TRAIN-02 | Phase 8 | Pending |
| RES-01 | Phase 8 | Pending |
| RES-02 | Phase 8 | Pending |
| RES-03 | Phase 8 | Pending |
| RES-04 | Phase 8 | Pending |
| RES-05 | Phase 8 | Pending |
| RES-06 | Phase 8 | Pending |
| COMP-01 | Phase 9 | Pending |
| COMP-02 | Phase 9 | Pending |
| COMP-03 | Phase 9 | Pending |
| CAREER-01 | Phase 9 | Pending |
| CONTACT-01 | Phase 9 | Pending |
| CONTACT-02 | Phase 9 | Pending |
| VIS-01 | Phase 4 | Pending |
| VIS-02 | Phase 4 | Pending |
| VIS-03 | Phase 4 | Pending |
| VIS-04 | Phase 4 | Pending |
| VIS-05 | Phase 4 | Pending |
| VIS-06 | Phase 4 | Pending |
| TECH-01 | Phase 10 | Pending |
| TECH-02 | Phase 10 | Pending |
| TECH-03 | Phase 10 | Pending |
| TECH-04 | Phase 10 | Pending |
| TECH-05 | Phase 10 | Pending |

**Coverage:**
- v1 requirements: 60 total
- Mapped to phases: 60
- Unmapped: 0

---
*Requirements defined: 2026-03-03*
*Last updated: 2026-03-03 after roadmap creation*
