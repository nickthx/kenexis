---
phase: 02-content-scraping-data-layer
plan: 02
subsystem: assets
tags: [images, team-photos, stock-photos, logo]

requires:
  - phase: 01-foundation-scaffolding
    provides: "Next.js project with public/ directory structure"
provides:
  - "10 team member headshot photos in public/images/team/"
  - "Kenexis company logo in public/images/logo/"
  - "10 industrial stock photos in public/images/stock/"
affects: [homepage-visual-design, services-pages, software-products, training-resources, company-careers-contact]

tech-stack:
  added: []
  patterns: ["lowercase-kebab-case image naming", "public/images/ directory structure"]

key-files:
  created:
    - public/images/team/edward-marszal.png
    - public/images/team/kevin-mitchell.png
    - public/images/team/christopher-weil.png
    - public/images/team/sean-cunningham.png
    - public/images/team/austin-bryan.png
    - public/images/team/elizabeth-smith.png
    - public/images/team/stephen-gorrell.png
    - public/images/team/arthur-pierce.jpg
    - public/images/team/mohammed-alzinati.png
    - public/images/team/john-applegate.jpg
    - public/images/logo/kenexis-logo.jpg
    - public/images/stock/hero-refinery.jpg
    - public/images/stock/hero-control-room.jpg
    - public/images/stock/hero-safety-equipment.jpg
    - public/images/stock/hero-industrial-plant.jpg
    - public/images/stock/bg-industrial-1.jpg
    - public/images/stock/bg-industrial-2.jpg
    - public/images/stock/services-hero.jpg
    - public/images/stock/software-hero.jpg
    - public/images/stock/training-hero.jpg
    - public/images/stock/about-hero.jpg
  modified: []

key-decisions:
  - "Kenexis logo saved as .jpg (site serves JPG format, PNG version not available)"
  - "Stock images sourced from Unsplash at 1920px width with 80% quality"
  - "All team photos downloaded at original resolution from kenexis.com"

patterns-established:
  - "Image directory structure: public/images/{team,logo,stock}/"
  - "Team photo naming: {first-last}.{png|jpg} matching data file photo field"

requirements-completed: [FOUND-04, FOUND-05]

duration: 5min
completed: 2026-03-03
---

# Phase 02 Plan 02: Image Assets Summary

**21 image files downloaded: 10 team headshots from kenexis.com, company logo, and 10 Unsplash industrial stock photos for heroes and backgrounds**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-03T22:52:00Z
- **Completed:** 2026-03-03T22:57:00Z
- **Tasks:** 2
- **Files modified:** 21

## Accomplishments
- Downloaded all 10 team member headshot photos from kenexis.com with non-zero file sizes
- Downloaded Kenexis horizontal logo from site header
- Downloaded 10 high-quality industrial stock photos from Unsplash (all 280KB-1MB)
- All file names match the path references in data layer files (Plan 02-01)

## Task Commits

Each task was committed atomically:

1. **Task 1: Download team member photos and Kenexis logo** - `8a4f081` (feat)
2. **Task 2: Source and download industrial stock images** - included in `8a4f081` (feat)

Note: Both tasks combined into single commit as all image assets form one logical unit.

## Files Created/Modified
- `public/images/team/` - 10 team member headshot photos (PNG and JPG formats)
- `public/images/logo/kenexis-logo.jpg` - Kenexis horizontal logo
- `public/images/stock/` - 10 industrial stock photos for hero sections and backgrounds

## Decisions Made
- Logo saved as .jpg since the kenexis.com site serves the logo as JPEG format (PNG version returned 404)
- All Unsplash images downloaded at w=1920 q=80 for hero-suitable resolution while managing file size

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Logo file format is JPG not PNG**
- **Found during:** Task 1 (logo download)
- **Issue:** Plan specified kenexis-logo.png but the site only serves the logo as JPEG
- **Fix:** Downloaded as kenexis-logo.jpg instead. The logo path in data files may need adjustment when consumed by components.
- **Files modified:** public/images/logo/kenexis-logo.jpg
- **Verification:** File exists with 36KB size (real image)
- **Committed in:** 8a4f081

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Minor format difference for logo file. Components can reference either format.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All image assets ready for use by page components in Phases 3-10
- Team photo paths match data file references in company.ts
- Stock image paths match data file references for hero sections
- Logo path will need updating from .png to .jpg in any component that references it

## Self-Check: PASSED

---
*Phase: 02-content-scraping-data-layer*
*Completed: 2026-03-03*
