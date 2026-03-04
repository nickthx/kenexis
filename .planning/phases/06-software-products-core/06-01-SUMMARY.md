---
phase: 06-software-products-core
plan: 01
subsystem: ui
tags: [next.js, shadcn, motion, animated-beam, magicui, landing-page, software]

# Dependency graph
requires:
  - phase: 02-data-architecture
    provides: SoftwareProduct type, kissOverview, softwareProducts data, softwareSEO
  - phase: 03-navigation-layout
    provides: getNavIcon utility for product icon mapping
  - phase: 05-services-pages
    provides: ServicesHeroSection pattern, ServicesGridSection pattern for mirroring
provides:
  - Software landing page at /software with KISS platform overview
  - 7-product card grid with icons, badges, and explore CTAs
  - Interactive ecosystem visualization with AnimatedBeam connecting products to KISS hub
  - External CTA section linking to kiss.kenexis.com and store.kenexis.com
  - Badge UI component (shadcn) for pricing tier labels
  - AnimatedBeam UI component (magicui) for beam visualizations
affects: [06-software-products-core, 07-software-detail-pages]

# Tech tracking
tech-stack:
  added: [shadcn/badge, magicui/animated-beam]
  patterns: [circular-node-layout, animated-beam-ecosystem, external-link-cta]

key-files:
  created:
    - src/components/ui/badge.tsx
    - src/components/ui/animated-beam.tsx
    - src/components/sections/software-hero-section.tsx
    - src/components/sections/product-grid-section.tsx
    - src/components/sections/product-ecosystem-section.tsx
    - src/components/sections/product-cta-section.tsx
    - src/app/(marketing)/software/page.tsx
  modified: []

key-decisions:
  - "AnimatedBeam copied from magicui with zero modifications (uses motion/react and cn() already in project)"
  - "Ecosystem nodes use CSS percentage-based circular positioning (trigonometric calculation) for responsive layout"
  - "Product refs use callback-ref pattern with array for dynamic ref assignment to 7 product nodes"
  - "External CTAs use anchor tags via Button asChild pattern (not next-view-transitions Link) for proper target=_blank behavior"

patterns-established:
  - "Circular node layout: getCirclePosition(index, total, radius) utility for evenly spacing items around a center point"
  - "AnimatedBeam ecosystem: containerRef + nodeRefs + centerRef pattern for hub-and-spoke beam visualizations"
  - "Free tier badge: product.pricing.some(t => t.type === 'free') check with Badge variant=secondary"

requirements-completed: [SOFT-01, SOFT-02, SOFT-11]

# Metrics
duration: 3min
completed: 2026-03-04
---

# Phase 6 Plan 1: Software Landing Page Summary

**Software landing page at /software with KISS platform hero, 7-product grid with free-tier badges, interactive AnimatedBeam ecosystem visualization, and external CTAs to KISS login and Kenexis Store**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-04T02:28:59Z
- **Completed:** 2026-03-04T02:32:26Z
- **Tasks:** 2
- **Files created:** 7

## Accomplishments
- Software landing page with 4 sections rendering at /software with SEO metadata
- 7-product card grid with Lucide icons, trademark symbols, taglines, and "Free Desktop Version" badges for Open-PHA and Open-Audit
- Interactive ecosystem visualization with animated gradient beams connecting 7 product nodes to central KISS hub in a circular layout
- External CTA buttons linking to kiss.kenexis.com and store.kenexis.com with target="_blank" and rel="noopener noreferrer"

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Badge, AnimatedBeam, and create 4 section components** - `9e83de0` (feat)
2. **Task 2: Create software landing page composing all sections** - `a3e8d7a` (feat)

## Files Created/Modified
- `src/components/ui/badge.tsx` - shadcn Badge component for pricing tier labels
- `src/components/ui/animated-beam.tsx` - AnimatedBeam from magicui for ecosystem visualization
- `src/components/sections/software-hero-section.tsx` - KISS platform overview hero with background image
- `src/components/sections/product-grid-section.tsx` - 7-product card grid with icons, badges, explore CTAs
- `src/components/sections/product-ecosystem-section.tsx` - Interactive circular ecosystem with animated beams
- `src/components/sections/product-cta-section.tsx` - External CTA section with KISS login and Store links
- `src/app/(marketing)/software/page.tsx` - Server component composing all 4 sections

## Decisions Made
- AnimatedBeam copied verbatim from magicui (no modifications needed -- already uses motion/react and @/lib/utils cn())
- Ecosystem nodes positioned using CSS percentage-based trigonometric calculation for responsive circular layout
- Product refs use callback-ref pattern with mutable array (productRefs.current[i]) for dynamic ref assignment
- External CTAs use `<a>` tags via Button asChild pattern (not next-view-transitions Link) for proper external link behavior

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Software landing page complete with all 4 sections
- Product grid links to /software/[slug] routes (detail pages to be built in 06-02)
- Badge and AnimatedBeam UI components available for reuse
- Untracked [slug]/page.tsx and product detail section components exist from research phase (ready for 06-02)

## Self-Check: PASSED

- All 7 created files verified present on disk
- Both task commits (9e83de0, a3e8d7a) verified in git log
- Line count minimums met: animated-beam (180/50), hero (49/30), grid (100/50), ecosystem (124/80), cta (69/30)
- Build passes with zero TypeScript errors

---
*Phase: 06-software-products-core*
*Completed: 2026-03-04*
