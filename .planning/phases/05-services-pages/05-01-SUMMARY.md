---
phase: 05-services-pages
plan: 01
subsystem: ui
tags: [nextjs, react, motion, shadcn, services, dynamic-routes, ssg]

# Dependency graph
requires:
  - phase: 04-homepage-visual-design
    provides: Section component patterns (hero, pillars, CTA), shadcn Card, motion animation variants, navigation-utils
  - phase: 02-data-layer
    provides: ServiceArea data model, serviceAreas array, getServiceBySlug, servicesSEO
provides:
  - Services landing page at /services with hero and 4-card grid
  - Dynamic service detail pages at /services/[slug] for all 4 service areas
  - Reusable ServicesHeroSection with optional title/subtitle props
  - ServicesGridSection for service area card grids
  - ServiceDetailSections (Description, Methodology, SubServices, Deliverables)
  - RelatedServicesSection for cross-linking between services
affects: [06-software-pages, 07-training-pages, navigation, seo]

# Tech tracking
tech-stack:
  added: []
  patterns: [interior-page-hero-without-mt-16, dynamic-route-with-generateStaticParams, params-as-Promise-for-Next16]

key-files:
  created:
    - src/components/sections/services-hero-section.tsx
    - src/components/sections/services-grid-section.tsx
    - src/components/sections/service-detail-sections.tsx
    - src/components/sections/related-services-section.tsx
    - src/app/(marketing)/services/page.tsx
    - src/app/(marketing)/services/[slug]/page.tsx
  modified: []

key-decisions:
  - "ServicesHeroSection uses optional title/subtitle props with landing page defaults -- reusable for both landing and detail pages"
  - "Interior hero sections use min-h-[300px] lg:h-[400px] without -mt-16 (shorter than homepage hero)"
  - "Next.js 16 params-as-Promise pattern used for generateMetadata and page component"

patterns-established:
  - "Interior page hero: shorter height, no -mt-16, optional title/subtitle props for reuse across landing and detail pages"
  - "Dynamic detail pages: generateStaticParams + generateMetadata + notFound() pattern for content-driven routes"
  - "Section background alternation: hero(dark) > description(white) > methodology(muted) > sub-services(white) > deliverables(dark) > related(muted)"

requirements-completed: [SERV-01, SERV-02, SERV-03, SERV-04, SERV-05, SERV-06]

# Metrics
duration: 3min
completed: 2026-03-04
---

# Phase 05 Plan 01: Services Pages Summary

**Services landing page with 4-card grid and dynamic detail pages for PHA, QRA, Fire & Gas Mapping, and SIS with full content sections and cross-links**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-04T00:05:27Z
- **Completed:** 2026-03-04T00:08:04Z
- **Tasks:** 2
- **Files created:** 6

## Accomplishments
- Services landing page at /services with dark hero, 4-card animated grid with icons, and contact CTA
- Dynamic detail pages at /services/[slug] for all 4 service areas with 7-section layout (hero, description, methodology, sub-services, deliverables, related services, CTA)
- Related services cross-links at bottom of each detail page navigating to sibling services
- All 5 routes pre-rendered at build time via generateStaticParams

## Task Commits

Each task was committed atomically:

1. **Task 1: Create services landing page with hero and grid sections** - `ed507dc` (feat)
2. **Task 2: Create service detail pages with all content sections and related services** - `170d976` (feat)

## Files Created/Modified
- `src/components/sections/services-hero-section.tsx` - Reusable dark hero section with optional title/subtitle props
- `src/components/sections/services-grid-section.tsx` - 4-card responsive grid with icons, descriptions, and CTA links
- `src/components/sections/service-detail-sections.tsx` - Description, Methodology, SubServices, and Deliverables sections
- `src/components/sections/related-services-section.tsx` - Cross-links to related services with card grid
- `src/app/(marketing)/services/page.tsx` - Server component composing services landing page with SEO metadata
- `src/app/(marketing)/services/[slug]/page.tsx` - Dynamic route with generateStaticParams, generateMetadata, and notFound()

## Decisions Made
- ServicesHeroSection designed with optional title/subtitle props so it can serve both landing page (defaults) and detail pages (service-specific text) without duplication
- Interior page heroes are shorter (min-h-[300px] lg:h-[400px]) and do not use -mt-16 to bleed behind header (homepage-only effect)
- Used Next.js 16 params-as-Promise pattern for generateMetadata and page component async signatures

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Services section fully complete with all 5 routes and cross-navigation
- Same patterns (interior hero, detail sections, related links) can be reused for software and training pages
- Contact CTA section reuse pattern proven across homepage and services pages

## Self-Check: PASSED

- All 6 created files verified on disk
- Both task commits verified in git log (ed507dc, 170d976)
- Build succeeds with all 5 routes pre-rendered

---
*Phase: 05-services-pages*
*Completed: 2026-03-04*
