# Project Research Summary

**Project:** Kenexis Website Redesign
**Domain:** Premium B2B engineering consultancy + industrial SaaS marketing website (Next.js, static)
**Researched:** 2026-03-03
**Confidence:** HIGH

## Executive Summary

This project is a premium B2B marketing website redesign for Kenexis Consulting Corporation, a global process safety engineering firm with three business pillars: consulting services, proprietary SaaS software (the KISS platform with 7 products), and professional training. The primary audience is engineering decision-makers and plant safety managers evaluating a specialist consultancy — an audience that values technical credibility, visual authority, and information depth over flashy design trends. The pitch demo must convince company president Edward Marszal that a modern redesign is worth adopting for production, which means it needs to look categorically superior to competitors (Smith & Burgess, AcuTech, Sigma-HSE) while maintaining the authority signals expected in the industrial sector.

The recommended technical approach is Next.js 15 (not 16) with Tailwind CSS v4, shadcn/ui, and motion (formerly framer-motion), all deployed to Vercel. This stack is stable, battle-tested, and enables the quality of component ecosystem required — particularly 21st.dev's 730+ production-ready sections. The content strategy is a typed TypeScript data layer (lib/data/) that replaces a CMS for this pitch demo, with all page content scraped from kenexis.com and stored as typed constants. Architecture follows a route-group composition pattern: a `(marketing)` group wraps all public pages in a shared Navbar/Footer, with section-based page composition providing reusability across 20+ pages.

The dominant risk is scope and complexity creep. A 20+ page static site with SaaS-style product pages, resource filtering, mega-menu navigation, and scroll animations is substantial. The mitigation strategy is a clear v1/v2 split: the pitch demo delivers homepage, core service and software pages (2-3 of each), contact, and about pages at high polish — proving the design concept without building every page. The most dangerous technical pitfalls are all front-loaded: wrong Next.js configuration (output: export), Framer Motion client component sprawl, image management failures, and content scraping brittleness. All must be addressed in the first phase or they compound as technical debt across all subsequent pages.

## Key Findings

### Recommended Stack

The stack is centered on Next.js 15 (explicitly not v16, which has breaking changes incompatible with shadcn/ui and the pitch demo timeline), React 19, TypeScript 5.9+, and Tailwind CSS v4. The animation library is `motion` (the renamed successor to `framer-motion` — install `motion`, not `framer-motion`). Component sourcing combines shadcn/ui CLI-installed primitives with 21st.dev premium sections. The design system uses CSS-first Tailwind v4 configuration (`@theme inline` in globals.css, no tailwind.config.js), with navy (#0a1628) and orange (#e87722) CSS custom properties mapped to Tailwind utility classes.

See `.planning/research/STACK.md` for complete version table and installation commands.

**Core technologies:**
- **Next.js 15.5.x**: React framework, App Router, SSG, routing, metadata API — stable, shadcn-compatible, Vercel-native
- **React 19.x**: Required by Next.js 15; Server Components reduce client JS bundle
- **TypeScript 5.9+**: Non-negotiable; catches content data mismatches at build time
- **Tailwind CSS v4**: CSS-first config, 5x faster builds via Oxide engine; required by shadcn/ui
- **shadcn/ui (latest CLI)**: CLI-copied components with full ownership; Radix UI accessibility primitives
- **motion 12.x**: Scroll animations, page transitions, counter animations — renamed from framer-motion
- **tw-animate-css 1.x**: Replaces deprecated tailwindcss-animate for Tailwind v4 compatibility
- **21st.dev**: 730+ MIT-licensed production sections installable via shadcn CLI
- **lucide-react 0.576+**: Default shadcn icon library, tree-shakeable, 1500+ icons
- **Vercel**: Zero-config hosting with native Next.js image optimization and serverless functions
- **next-sitemap 4.x**: Automated sitemap.xml + robots.txt at build time

### Expected Features

See `.planning/research/FEATURES.md` for full feature table with complexity ratings and competitor analysis.

**Must have (table stakes, v1 pitch demo):**
- Sticky header with mega-menu dropdowns (Services, Software columns with icons and descriptions)
- Mobile hamburger menu with accordion sub-navigation (full-screen overlay)
- Homepage: hero + three-pillar section + trust signals + recent content + newsletter CTA + contact CTA
- Service landing page + at least 2 individual service detail pages (PHA, SIS)
- Software landing page + at least 2 SaaS-style product pages (Open-PHA, Vertigo)
- Contact page with form (demo mode — no actual submission)
- About/Company page with team photo grid
- Footer with sitemap, contact info, social links
- Mobile-first responsive design across all pages
- Scroll-triggered animations (the visual differentiator from all competitors)
- Dark navy/orange brand palette applied consistently

**Should have (competitive differentiators, v1.x):**
- Remaining service pages (QRA, Fire & Gas Mapping) following established template
- Remaining 5 software product pages (Arbor, Bowtie-Q, Open-Audit, Effigy, KISS API)
- Training section with course listings and Kenexis Unlimited SaaS-style presentation
- Resource center with content-type and topic filtering
- Interactive product ecosystem visualization (KISS suite interconnection diagram)
- Page transitions between routes (AnimatePresence with FrozenRouter pattern)
- Careers and Representatives pages

**Defer (v2+, production adoption only):**
- CMS integration (headless Sanity/Contentful)
- Search with full-text indexing
- Analytics with heatmaps
- Full WCAG 2.1 AA audit and remediation
- Multi-language/i18n

**Explicit anti-features (do not build):**
- Hero image carousel/slider (kills conversions; single strong hero only)
- Live chat widget or AI chatbot (no real agents behind it; damages credibility)
- CMS for pitch demo (out of scope; hardcoded TypeScript data is correct)
- Client portal/e-commerce (external KISS and Store links only)
- Video backgrounds on every section (kills performance)

### Architecture Approach

The architecture follows five established Next.js App Router patterns: route-group layout composition (`(marketing)` group for shared Navbar/Footer without affecting URLs), template-based page transitions (`template.tsx` re-mounts on navigation for AnimatePresence), a typed TypeScript content data layer replacing a CMS (`lib/data/*.ts` as single source of truth), section-based page composition (pages are 20-40 line thin orchestrators importing reusable section components), and reusable scroll-reveal animation wrappers (thin Client Components wrapping Server Component children). Content flows from TypeScript data files to Server Component pages to section component props, with zero runtime data fetching.

See `.planning/research/ARCHITECTURE.md` for full project structure, code patterns, data flow diagrams, and build order.

**Major components:**
1. **RootLayout** (`app/layout.tsx`) — HTML shell, Inter font, base metadata defaults, providers only
2. **MarketingLayout** (`app/(marketing)/layout.tsx`) — Persistent Navbar + Footer for all public pages
3. **PageTransitionTemplate** (`app/(marketing)/template.tsx`) — AnimatePresence + FrozenRouter; re-mounts on navigation
4. **Navbar** (`components/layout/navbar.tsx`) — Client Component; sticky header, mega-menu, mobile sheet
5. **Section components** (`components/sections/*.tsx`) — Reusable content blocks (hero, feature-grid, CTA, stats, team-grid, etc.)
6. **Content data layer** (`lib/data/*.ts`) — Typed TypeScript constants for all scraped content; replaces CMS
7. **Animation wrappers** (`components/animations/*.tsx`) — Thin Client Components (ScrollReveal, StaggerChildren, Counter)
8. **UI primitives** (`components/ui/*.tsx`) — shadcn/ui + 21st.dev installed components

### Critical Pitfalls

See `.planning/research/PITFALLS.md` for full pitfall details, warning signs, and recovery strategies.

1. **`output: "export"` misconfiguration** — Do NOT set this in next.config.ts when deploying to Vercel. It disables image optimization, API routes, and ISR. Standard Next.js on Vercel statically generates all pages without it. Must be correct from project initialization.

2. **Framer Motion / motion forcing client component sprawl** — Adding `"use client"` to large page sections to enable animations balloons the JS bundle (32KB+ for full motion import vs ~4.6KB LazyMotion). Solution: thin Client Component wrappers (`ScrollReveal`, `FadeInOnScroll`) that accept `children` as props — Server Component content passes through, only the animation wrapper is client-side.

3. **Scraped content brittleness** — Kenexis.com is WordPress; scraped HTML contains shortcodes, plugin artifacts, CDN image URLs, and inline styles. Never render scraped HTML directly. Extract text content only, re-compose into clean React components, and download all images locally to `/public/images/` during a dedicated scraping phase before page building begins.

4. **Image optimization failures** — Hotlinking stock photos or kenexis.com images causes `next/image` "Un-configured Host" errors and layout shift. Prevention: download all images locally. If using remote images, configure every CDN hostname in `remotePatterns` and provide explicit dimensions (or properly sized `fill` containers). Use `priority` prop only on above-the-fold hero images.

5. **Missing per-page SEO metadata** — With 20+ pages, metadata becomes an afterthought. Set `metadataBase` in root layout immediately. Create a `createPageMeta()` utility. Export metadata from every `page.tsx`. Verify by sharing the Vercel URL on Slack/LinkedIn — a broken OG preview before pitching to Edward Marszal is a credibility failure.

6. **Page transitions breaking in App Router** — Full AnimatePresence page transitions require the FrozenRouter pattern (consuming `LayoutRouterContext` from Next.js internals). This is fragile across Next.js updates. Decision: prefer scroll-triggered section animations over full page transitions for reliability. If page transitions are added, use `template.tsx` with simple opacity fade only.

## Implications for Roadmap

The architecture research explicitly defines a 6-phase build order based on dependencies. This maps cleanly to a roadmap with a clear MVP cut point between Phases 5 and 6.

### Phase 1: Foundation and Content Scraping
**Rationale:** All other phases depend on the project scaffold and content data. Getting these wrong early (wrong Next.js config, hotlinked images, raw HTML in components) creates compounding technical debt. This is the highest-risk phase because mistakes are expensive to fix later — especially `output: "export"` misconfiguration and image strategy decisions.
**Delivers:** Working Next.js 15 project with Tailwind v4, shadcn/ui initialized, brand palette (navy/orange) configured in globals.css, all kenexis.com content scraped and stored as typed TypeScript data files in `lib/data/`, all images downloaded locally to `public/images/`
**Addresses:** Content data layer, site configuration, image asset strategy
**Avoids:** `output: "export"` pitfall, scraped content brittleness, image optimization failures — all of which must be correct before any page exists

### Phase 2: Layout Shell and Navigation
**Rationale:** Navbar and Footer are shared across every page; they must exist and work correctly before page-specific content is meaningful. Navigation defines the site's information architecture — all page links and mega-menu structure must be real and functional. The animation strategy (scroll animations yes, full page transitions only if feasible) must be decided here before any components are built.
**Delivers:** Functional sticky header with mega-menu dropdowns, mobile hamburger with accordion sub-navigation, Footer with all links, page transition template (`template.tsx`), `ScrollReveal` and animation wrapper components
**Uses:** shadcn NavigationMenu, Sheet for mobile, motion for transitions
**Avoids:** Framer Motion client component sprawl (establish wrapper pattern here), inconsistent navigation across pages, AnimatePresence page transition fragility

### Phase 3: Homepage and Core Section Components
**Rationale:** The homepage is the pitch centerpiece. Building it forces creation of every reusable section component (hero, pillar-cards, stats, CTA, newsletter). Once these sections exist, remaining pages are compositions — not new builds. Homepage completeness is the visual proof of concept for Edward Marszal.
**Delivers:** Complete homepage (hero + three-pillar section + animated stats + trust signals + newsletter CTA + contact CTA), plus reusable section components: `HeroHome`, `HeroPage`, `PillarCards`, `StatsSection`, `FeatureGrid`, `CtaSection`, `NewsletterSignup`, `TestimonialsLogos`
**Implements:** Section-based page composition pattern; all sections are Server Components wrapping Client Component animation wrappers
**Avoids:** One-giant-page-component anti-pattern; inline content strings in JSX

### Phase 4: Core Content Pages (Services, Software, Contact, About)
**Rationale:** These are the P1 features that constitute the minimum viable pitch demo. Services and Software pages demonstrate the two specialized page design patterns (consultancy detail page and SaaS product page) that differentiate the redesign from the current site. At minimum: 2 service sub-pages (PHA, SIS), 2 software product pages (Open-PHA, Vertigo), contact form (demo mode), and about/team page.
**Delivers:** Services landing + PHA + SIS sub-pages; Software landing + Open-PHA + Vertigo product pages (dynamic `[slug]` route with `generateStaticParams`); Contact page (form in demo mode); About page with team grid
**Addresses:** SaaS-style product pages (the strongest visual differentiator), service detail depth, primary conversion path
**Avoids:** Real form submission to Kenexis (demo mode with toast), per-page SEO metadata gaps (metadata utility applied to all pages)

### Phase 5: Complete Demo (Remaining Pages)
**Rationale:** Once the design patterns are proven in Phase 4, remaining pages follow established templates. This phase completes the full site mirror so the pitch demo can be navigated end-to-end without hitting dead links.
**Delivers:** Remaining service pages (QRA, Fire & Gas Mapping); remaining software product pages (Arbor, Bowtie-Q, Open-Audit, Effigy, KISS API); Training section; Resource center with filtering; Careers and Representatives pages
**Addresses:** v1.x feature completeness, Training pillar, Resource hub with content-type/topic tags
**Implements:** Resource filtering (client-side, no backend), product ecosystem visualization (KISS suite diagram)

### Phase 6: Polish, SEO, and QA
**Rationale:** Performance, SEO, and QA are non-negotiable before sharing the demo URL with Edward Marszal. A visually impressive site with broken OG previews, missing favicons, or 90ms layout shift on mobile will undermine the pitch. This phase is distinct because these concerns apply across all pages.
**Delivers:** Custom 404 page; sitemap.xml + robots.txt generation; Open Graph images for key pages; Vercel analytics + speed insights; Lighthouse 90+ scores; mobile responsiveness audit at 375px/768px/1024px/1440px; "Looks Done But Isn't" checklist completion; Vercel deployment with environment variables
**Avoids:** Missing per-page metadata, broken OG social previews, performance traps (unoptimized hero images, excessive concurrent scroll animations), responsive design failures at tablet widths

### Phase Ordering Rationale

- Foundation before content because the data architecture (typed TypeScript files vs. raw HTML) determines every page's structure
- Layout before pages because 20+ pages share the same Navbar/Footer — these must be bug-free before page content is testable
- Homepage before sub-pages because it creates all reusable section components; sub-pages reuse them rather than re-inventing
- Core pages (Phase 4) before complete demo (Phase 5) creates a natural MVP cut point — if time is short, Phases 1-4 deliver a compelling pitch; Phase 5 fills it out
- Polish last but not optional — pitched to a company president, the demo must be production-quality in perceived quality even if not in technical depth

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 2 (Page Transitions):** The FrozenRouter pattern for AnimatePresence in App Router accesses Next.js internal APIs (`next/dist/shared/lib/app-router-context.shared-runtime`). This is fragile. If implementing page transitions, research current Next.js 15.5.x compatibility before committing to the pattern. Alternative: CSS View Transitions API (simpler, no internal dependency).
- **Phase 5 (Resource Filtering):** Client-side filtering of 50+ resources across multiple content types needs a decision on state management approach. React `useState` + derived arrays is sufficient for a demo; if content grows, consider fuse.js for fuzzy search.
- **Phase 5 (Product Ecosystem Visualization):** The interactive KISS suite interconnection diagram has no clear implementation reference in the research. This is the highest-complexity single feature. It may warrant its own research spike — SVG-based interaction vs. a library like react-flow vs. a simpler static diagram with hover states.

Phases with established patterns (skip research-phase):

- **Phase 1:** Next.js 15 setup with Tailwind v4 + shadcn/ui is comprehensively documented. Follow `npx create-next-app@15` with the install commands in STACK.md exactly.
- **Phase 3 (Homepage sections):** All section patterns are well-documented in launch-ui, shadcn-ui-landing-page, and 21st.dev. Reference local design repos directly.
- **Phase 4 (Dynamic product pages):** `generateStaticParams` + typed data layer pattern is fully specified in ARCHITECTURE.md with working code examples.
- **Phase 6 (SEO/Vercel):** Next.js Metadata API + next-sitemap are well-documented with no ambiguity. Follow ARCHITECTURE.md SEO section exactly.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified directly against npm registry on 2026-03-03. Official docs confirm compatibility matrix. The one exception is Next.js 16 vs. 15 decision — verified via official upgrade guide. |
| Features | HIGH | Based on live competitor analysis (WebFetch of Smith & Burgess, AcuTech, Sigma-HSE, Kenexis.com directly) plus B2B web design research. Feature priorities reflect actual current site gaps vs. competitors. |
| Architecture | HIGH | All patterns are from official Next.js docs or widely-used community patterns with multiple confirming sources. The FrozenRouter page transition pattern is MEDIUM confidence — it accesses Next.js internals and is flagged accordingly. |
| Pitfalls | HIGH | Six critical pitfalls identified with official documentation backing for most. The `output: "export"` and image optimization pitfalls have HIGH confidence from official Next.js docs. The page transition pitfall has MEDIUM confidence (GitHub discussions, not official docs). |

**Overall confidence:** HIGH

### Gaps to Address

- **Contact form email provider:** ARCHITECTURE.md identifies Resend or SendGrid as options but does not recommend one. For pitch demo, the form should be non-functional (demo mode toast). If real email sending is added, Resend is simpler for low volume. Decide before Phase 4.

- **Stock photography selection:** No specific industrial photography sources are committed. PITFALLS.md warns against hotlinking; images must be downloaded locally. During Phase 1, identify and download hero images (refinery, control room, industrial facility) before beginning page builds.

- **Kenexis.com content scraping depth:** The full content inventory (exact team member names, software feature lists, service descriptions) depends on what can be scraped from kenexis.com. Some content may be behind authentication or poorly structured in WordPress. Plan for manual content reconstruction for any pages that scrape poorly.

- **Demo URL security:** PITFALLS.md flags the risk of Kenexis staff seeing an incomplete demo. Vercel password protection requires a Pro plan. Alternative: use a non-obvious Vercel subdomain and avoid sharing until QA is complete. Decide before first deployment.

- **Product ecosystem visualization scope:** The interactive KISS suite diagram is listed as a differentiator but has no committed implementation approach. It's a P2 feature (Phase 5) — if time is limited, a static diagram with CSS hover states is sufficient for the pitch.

## Sources

### Primary (HIGH confidence)

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) — Confirmed v16 breaking changes; justifies v15 recommendation
- [shadcn/ui Tailwind v4 Guide](https://ui.shadcn.com/docs/tailwind-v4) — tw-animate-css migration, @theme inline pattern
- [shadcn/ui Changelog](https://ui.shadcn.com/docs/changelog) — CLI 3.0, component updates
- [Tailwind CSS v4 Release](https://tailwindcss.com/blog/tailwindcss-v4) — CSS-first config, Oxide engine, stable Jan 2025
- [Motion Upgrade Guide](https://motion.dev/docs/react-upgrade-guide) — framer-motion to motion rename, API compatibility
- [Next.js Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) — Built-in SEO, OG image generation
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) — Structured data approach
- [Next.js Static Exports Guide](https://nextjs.org/docs/app/guides/static-exports) — `output: "export"` pitfall documentation
- [Next.js Image Component docs](https://nextjs.org/docs/app/api-reference/components/image) — Image optimization, remotePatterns
- [Next.js Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups) — (marketing) route group pattern
- [21st.dev GitHub](https://github.com/serafimcloud/21st) — 730+ components, MIT license, CLI integration
- [Motion bundle size reduction](https://motion.dev/docs/react-reduce-bundle-size) — LazyMotion pattern
- npm registry (`npm view` on 2026-03-03) — All version numbers verified directly
- [Kenexis.com](https://kenexis.com) — Current site analysis for feature gaps
- [Smith & Burgess](https://www.smithburgess.com/) — Competitor feature analysis
- [AcuTech Consulting](https://acutech-consulting.com/) — Competitor feature analysis
- [Sigma-HSE](https://sigma-hse.com/) — Competitor feature analysis
- Local design repos (`~/design-repos/launch-ui`, `~/design-repos/shadcn-ui-landing-page`) — Section patterns

### Secondary (MEDIUM confidence)

- [Windmill Strategy: B2B Web Design Trends 2026](https://www.windmillstrategy.com/top-9-b2b-web-design-trends/) — B2B design patterns
- [Webstacks: SaaS Website Best Practices](https://www.webstacks.com/blog/saas-website-best-practices) — SaaS product page patterns
- [Trajectory Web Design: B2B Trust Signals](https://www.trajectorywebdesign.com/blog/b2b-website-trust-signals) — Trust signal patterns
- [Framer Motion Page Transitions in App Router (imcorfitz.com)](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router) — FrozenRouter pattern
- [Next.js App Router Page Transitions Discussion #42658](https://github.com/vercel/next.js/discussions/42658) — Known App Router limitation
- [Framer Motion Next.js optimization issue #2206](https://github.com/framer/motion/issues/2206) — Client component bloat pattern
- [Vercel pricing breakdown](https://flexprice.io/blog/vercel-pricing-breakdown) — Free tier sufficiency for pitch demo

### Tertiary (LOW confidence)

- [Web scraping challenges (AIMultiple, 2026)](https://research.aimultiple.com/web-scraping-challenges/) — WordPress scraping brittleness patterns (needs validation against actual kenexis.com markup)
- [Next.js Architecture 2026 (yogijs.tech)](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) — Project structure patterns (cross-referenced with official docs)

---
*Research completed: 2026-03-03*
*Ready for roadmap: yes*
