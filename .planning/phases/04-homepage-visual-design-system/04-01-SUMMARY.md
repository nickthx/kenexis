---
phase: 04-homepage-visual-design-system
plan: 01
subsystem: ui
tags: [motion, next-image, lucide, shadcn, hero, animation, number-ticker]

# Dependency graph
requires:
  - phase: 02-content-scraping-data-layer
    provides: home.ts data exports (homeHero, homePillars, homeSEO)
  - phase: 03-layout-shell-navigation
    provides: SiteHeader, SiteFooter, marketing layout with pt-16
provides:
  - HeroSection component with full-width background, gradient overlay, animated headline, dual CTAs
  - PillarsSection component with 3-column grid, Lucide icons, stagger animations
  - NumberTicker reusable animation component (spring-physics counter)
  - shadcn Input component
  - Homepage SEO metadata
affects: [04-02, 04-03, 05, 06]

# Tech tracking
tech-stack:
  added: [shadcn/input]
  patterns: [motion/react animate+whileInView, section component pattern, pillarIconMap lookup, asChild Button+Link composition]

key-files:
  created:
    - src/components/ui/number-ticker.tsx
    - src/components/ui/input.tsx
    - src/components/sections/hero-section.tsx
    - src/components/sections/pillars-section.tsx
  modified:
    - src/app/(marketing)/page.tsx

key-decisions:
  - "Hero uses -mt-16 to extend behind sticky header for full-bleed effect"
  - "Button asChild with Link for accessible CTA routing without nested anchors"
  - "Pillar icons use local Record<string, LucideIcon> map rather than extending navigation-utils"

patterns-established:
  - "Section component pattern: 'use client' components in src/components/sections/ composed by server page.tsx"
  - "Motion stagger pattern: containerVariants + itemVariants with whileInView viewport trigger"
  - "Icon map pattern: local Record<string, LucideIcon> for data-driven icon rendering"

requirements-completed: [HOME-01, HOME-02, VIS-01, VIS-02, VIS-04, VIS-06]

# Metrics
duration: 3min
completed: 2026-03-03
---

# Phase 4 Plan 1: Foundation UI & Hero/Pillars Summary

**Hero section with refinery background and motion animations, 3-pillar grid with Lucide icons, NumberTicker component, and shadcn Input**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-03T23:13:45Z
- **Completed:** 2026-03-03T23:16:34Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Full-width hero section with industrial refinery background, dark gradient overlay, motion-animated headline/subheadline, and dual CTA buttons linking to /services and /software
- Three-pillar overview grid (Consulting, Software, Training) with Lucide icons, descriptions, and working CTA links using stagger animation
- NumberTicker reusable animation component using motion/react spring physics for plan 04-02 stats section
- shadcn Input component installed for plan 04-02 newsletter form
- All placeholder content removed from homepage, replaced with real data-driven sections

## Task Commits

Each task was committed atomically:

1. **Task 1: Install shadcn Input and create NumberTicker component** - `c8bd338` (feat)
2. **Task 2: Create HeroSection and PillarsSection components, update homepage** - `887bf33` (feat)

## Files Created/Modified
- `src/components/ui/input.tsx` - shadcn Input component for forms
- `src/components/ui/number-ticker.tsx` - Animated counter with spring physics, triggers on scroll
- `src/components/sections/hero-section.tsx` - Full-width hero with next/image background, gradient overlay, motion animations
- `src/components/sections/pillars-section.tsx` - 3-column grid with Lucide icons, stagger animations, CTA links
- `src/app/(marketing)/page.tsx` - Updated to compose HeroSection + PillarsSection with SEO metadata

## Decisions Made
- Hero uses `-mt-16` to extend behind sticky header for classic full-bleed hero effect, with `pt-16` on content container to push below header
- Used `Button asChild` with `Link` for accessible CTA routing without nested anchor elements
- Pillar icons use a local `Record<string, LucideIcon>` map in the component rather than extending the shared navigation-utils icon map (cleaner separation of concerns)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- HeroSection and PillarsSection render correctly on homepage
- NumberTicker component ready for stats section in plan 04-02
- Input component ready for newsletter form in plan 04-02
- Section component pattern established for remaining homepage sections

## Self-Check: PASSED

- All 5 files verified present on disk
- Both task commits verified: c8bd338, 887bf33

---
*Phase: 04-homepage-visual-design-system*
*Completed: 2026-03-03*
