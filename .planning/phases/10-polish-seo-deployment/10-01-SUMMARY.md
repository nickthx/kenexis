---
phase: 10-polish-seo-deployment
plan: 01
subsystem: seo
tags: [next-metadata, opengraph, sitemap, robots, seo, social-sharing]

# Dependency graph
requires:
  - phase: 02-data-layer
    provides: SEOMeta type and data files for all pages
  - phase: 01-scaffolding
    provides: Root layout.tsx with base metadata
provides:
  - metadataBase for absolute OG image URL resolution
  - title.template fallback pattern
  - ogImage on all 24 pages
  - sitemap.xml with all 24 routes
  - robots.txt with sitemap reference
  - Verified external links (target="_blank" rel="noopener noreferrer")
affects: [10-polish-seo-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns: [metadataBase with VERCEL_PROJECT_PRODUCTION_URL env, title.template fallback, sitemap.ts dynamic route generation, robots.ts with env-based sitemap URL]

key-files:
  created:
    - src/app/sitemap.ts
    - src/app/robots.ts
  modified:
    - src/app/layout.tsx
    - src/lib/data/careers.ts
    - src/lib/data/contact.ts
    - src/lib/data/resources.ts
    - src/lib/data/company.ts
    - src/lib/data/services.ts
    - src/lib/data/software.ts

key-decisions:
  - "metadataBase uses VERCEL_PROJECT_PRODUCTION_URL env with localhost:3000 fallback to avoid hardcoding Vercel URL"
  - "ogImage mapped to hero image used on each page for visual consistency in social previews"
  - "title.template set as fallback only -- existing page titles kept as-is since they already include Kenexis suffix"

patterns-established:
  - "SEO data pattern: every SEOMeta object includes title, description, and ogImage"
  - "sitemap.ts imports data arrays to dynamically generate routes for service and product pages"

requirements-completed: [TECH-03, TECH-05]

# Metrics
duration: 3min
completed: 2026-03-04
---

# Phase 10 Plan 01: SEO Metadata & External Links Summary

**metadataBase with env-based URL resolution, ogImage on all 24 pages, sitemap.xml/robots.txt generation, and external link verification**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-04T16:13:06Z
- **Completed:** 2026-03-04T16:16:17Z
- **Tasks:** 2
- **Files modified:** 9 (1 modified layout + 6 modified data files + 2 new files)

## Accomplishments
- Root layout metadata enhanced with metadataBase, title.template, openGraph defaults, and twitter card config
- ogImage added to all 15 pages that were missing it (4 standalone SEO objects + 4 service areas + 7 products)
- sitemap.ts dynamically lists all 24 routes (10 static + 4 service + 7 product)
- robots.ts allows crawling and references sitemap.xml
- All external links verified using target="_blank" rel="noopener noreferrer"
- Build succeeds cleanly with 26 routes (24 pages + sitemap.xml + robots.txt)

## Task Commits

Each task was committed atomically:

1. **Task 1: Add metadataBase, title.template, and default OG to root layout** - `0fd43eb` (feat)
2. **Task 2: Add ogImage to 15 pages, create sitemap.ts and robots.ts** - `b5c8bf7` (feat)

## Files Created/Modified
- `src/app/layout.tsx` - Added metadataBase, title.template, openGraph defaults, twitter card
- `src/app/sitemap.ts` - NEW: Dynamic sitemap generation for all 24 routes
- `src/app/robots.ts` - NEW: Robots.txt allowing all crawling with sitemap reference
- `src/lib/data/careers.ts` - Added ogImage to careersSEO
- `src/lib/data/contact.ts` - Added ogImage to contactSEO
- `src/lib/data/resources.ts` - Added ogImage to resourcesSEO
- `src/lib/data/company.ts` - Added ogImage to representativesSEO
- `src/lib/data/services.ts` - Added ogImage to all 4 service area seo objects
- `src/lib/data/software.ts` - Added ogImage to all 7 product seo objects

## Decisions Made
- metadataBase uses `process.env.VERCEL_PROJECT_PRODUCTION_URL` with localhost:3000 fallback to avoid the Vercel URL chicken-and-egg problem
- ogImage mapped to the hero image used on each page for visual consistency when shared on social platforms
- title.template set as `"%s | Kenexis"` fallback only -- existing page titles kept unchanged since they already include "Kenexis" suffix

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- SEO metadata layer complete, all pages have full OG coverage
- Ready for Phase 10 Plan 02 (responsive audit and image optimization)
- Ready for Phase 10 Plan 03 (Vercel deployment) -- metadataBase and sitemap will auto-resolve using VERCEL_PROJECT_PRODUCTION_URL env var

## Self-Check: PASSED

All 10 files verified present. Both commit hashes (0fd43eb, b5c8bf7) confirmed in git log.

---
*Phase: 10-polish-seo-deployment*
*Completed: 2026-03-04*
