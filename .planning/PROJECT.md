# Kenexis Website Redesign

## What This Is

A complete, production-quality visual redesign of kenexis.com — the website for Kenexis Consulting Corporation, a globally recognized process safety consultancy headquartered in Columbus, Ohio. This is a pitch/demo site built to show company president Edward Marszal what a modern version of their website could look like. All content, data, product names, service descriptions, team information, and page structure mirror the real kenexis.com exactly — only the visual design changes.

## Core Value

Every page of kenexis.com faithfully reproduced with a dramatically better, premium visual design that matches the caliber of the company — deployed live on Vercel as a convincing pitch demo.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Full production-quality redesign of all kenexis.com pages
- [ ] All real content scraped from live kenexis.com — nothing invented
- [ ] Real team photos and headshots pulled from current site
- [ ] Live Vercel deployment with shareable URL
- [ ] Next.js + React + TypeScript + Tailwind CSS stack
- [ ] shadcn/ui base component system with 21st.dev premium components
- [ ] Framer Motion scroll animations and page transitions
- [ ] Mobile-first responsive design
- [ ] Navy/orange brand palette with Inter typography
- [ ] Premium B2B engineering consultancy aesthetic

### Out of Scope

- CMS integration — static site, all content hardcoded
- Database or backend — no server-side data
- Authentication — no login system (KISS login is external link)
- Payment processing — Kenexis Store is external link
- Blog/content management — articles hardcoded as static pages
- Custom domain — Vercel default URL is sufficient for the pitch

## Context

### Company Background

Kenexis is a globally recognized technical safety consultancy specializing in risk analysis and engineered safeguards for the chemical process industry. Three main pillars:

1. **Engineering Consulting Services** — Process Hazards Analysis (PHA/HAZOP/LOPA), Quantitative Risk Analysis (QRA), Fire and Gas Mapping, Safety Instrumented Systems (SIS) design
2. **Software Products** — Cloud-based KISS (Kenexis Integrated Safety Suite) platform with individual products: Open-PHA®, Vertigo™, Arbor™, Bowtie-Q™, Open-Audit™, Effigy®, KISS API™
3. **Training** — Process safety training center with courses, plus Kenexis Unlimited subscription bundle

### Target Audience

Process safety engineers, plant managers, HSE directors, and VP-level decision makers at oil & gas, petrochemical, chemical, power generation, and manufacturing companies.

### Page Structure (mirrors current site)

- **Home** — Hero, three pillars overview, recent news/articles, newsletter signup CTA, contact CTA
- **Services** — Landing page + sub-pages: PHA, QRA, Fire & Gas Mapping, SIS
- **Software** — Landing page + individual product pages: Open-PHA, Vertigo, Arbor, Bowtie-Q, Open-Audit, Effigy, KISS API + software support/docs link
- **Training** — Courses and Kenexis Unlimited
- **Resources** — Recorded webinars, newsletter registration, tools, papers/articles/books, YouTube channel, Spotify podcast (Kenexis Functional Safety Podcast)
- **About/Company** — Company overview, senior staff/team, representatives
- **Careers** — Job listings
- **Contact** — Contact form

### Content Sourcing

All content scraped from live kenexis.com. Real text, real product descriptions, real team names and photos, real service details. Nothing fabricated.

### Hardcoded Details

- Phone: +1-614-451-7031
- Email: info@kenexis.com
- LinkedIn: linkedin.com/company/kenexis-consulting-corporation
- YouTube: @Kenexis
- Spotify: Kenexis Functional Safety Podcast
- KISS Login: kiss.kenexis.com (external link)
- Kenexis Store: store.kenexis.com (external link)
- Copyright: Kenexis Consulting Corporation

### Design Direction

- **Primary color:** Navy/dark blue (#0a1628 or similar)
- **Accent color:** Orange/amber (#e87722 or similar)
- **Typography:** Inter (clean modern sans-serif)
- **Feel:** Premium, authoritative B2B engineering consultancy — think Honeywell, Emerson, Schlumberger
- **Heroes:** Big confident sections with industrial stock photos (refineries, control rooms, safety equipment) from Unsplash/Pexels
- **Section backgrounds:** Abstract/geometric patterns and gradients
- **Animations:** Subtle, professional scroll-triggered via Framer Motion
- **Software pages:** Polished modern SaaS style — feature grids, comparison tables, clear CTAs
- **Overall:** Professional, credible, logical — not trendy or startup-y

### Design Reference Sources

- Local repos: `~/design-repos/launch-ui`, `~/design-repos/shadcn-ui`, `~/design-repos/shadcn-ui-landing-page`, `~/design-repos/magicui`
- 21st.dev component library for premium shadcn/ui-based components
- Install via: `npx shadcn@latest add "https://21st.dev/r/{author}/{component}"`

### Imagery Strategy

- **Heroes/headers:** High-quality industrial stock photos (Unsplash/Pexels)
- **Section accents:** Abstract geometric backgrounds, gradients
- **Team:** Real photos scraped from current kenexis.com
- **Software:** Clean UI mockups/screenshots where available from current site

## Constraints

- **Tech stack**: Next.js + React + TypeScript + Tailwind CSS — non-negotiable
- **Content fidelity**: Must mirror real kenexis.com exactly — no invented content
- **Deployment**: Must deploy to Vercel with shareable URL
- **Design quality**: Must look like it was designed by a top-tier agency, not AI-generated
- **Component sources**: Must leverage 21st.dev and local design repos before building from scratch

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static site, no CMS | This is a pitch demo, not a production CMS — simplicity and speed | — Pending |
| Scrape content from live site | Ensures 100% content fidelity with current kenexis.com | — Pending |
| 21st.dev + shadcn/ui components | Highest quality UI components without building from scratch | — Pending |
| Stock + abstract imagery mix | Stock photos for heroes add realism; abstract backgrounds keep it clean | — Pending |
| Vercel deployment | Fast, free tier sufficient for demo, shareable URL | — Pending |

---
*Last updated: 2026-03-03 after initialization*
