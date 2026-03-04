---
phase: 09-company-careers-contact
plan: 02
subsystem: ui
tags: [careers, contact, form, shadcn-select, shadcn-textarea, shadcn-label, demo-form]

# Dependency graph
requires:
  - phase: 04-homepage
    provides: ServicesHeroSection, ContactCTASection, alternating section pattern
  - phase: 02-data-scaffold
    provides: careers.ts, contact.ts data files with typed interfaces
provides:
  - "/careers page with 3 job listings, company values, benefits, application email"
  - "/contact page with demo form (6 fields), contact info grid (phone, email, address, fax)"
  - "shadcn textarea, label, and select UI components installed"
  - "Updated contactFormFields with phone and serviceInterest fields"
affects: [09-company-careers-contact]

# Tech tracking
tech-stack:
  added: [shadcn-textarea, shadcn-label, shadcn-select]
  patterns: [demo-form-with-select, contact-info-grid-with-icons]

key-files:
  created:
    - src/app/(marketing)/careers/page.tsx
    - src/app/(marketing)/contact/page.tsx
    - src/components/sections/job-listings-section.tsx
    - src/components/sections/company-culture-section.tsx
    - src/components/sections/contact-form-section.tsx
    - src/components/sections/contact-info-section.tsx
    - src/components/ui/textarea.tsx
    - src/components/ui/label.tsx
    - src/components/ui/select.tsx
  modified:
    - src/lib/data/contact.ts

key-decisions:
  - "ContactFormSection uses filter-based field rendering for layout control (paired rows vs full-width)"
  - "ContactInfoSection uses static infoItems array with conditional href for clickable phone/email"
  - "No ContactCTASection on contact page to avoid self-referential 'Contact Us' link"

patterns-established:
  - "Demo form with Select: shadcn Select + useState pattern for forms with dropdowns"
  - "Contact info grid: circular icon containers with accent/10 bg, 4-column responsive layout"

requirements-completed: [CAREER-01, CONTACT-01, CONTACT-02]

# Metrics
duration: 13min
completed: 2026-03-04
---

# Phase 9 Plan 02: Careers & Contact Pages Summary

**Careers page with 3 job listings and application email, Contact page with 6-field demo form (including service interest dropdown) and prominently displayed phone/email**

## Performance

- **Duration:** 13 min
- **Started:** 2026-03-04T15:33:09Z
- **Completed:** 2026-03-04T15:45:43Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- Careers page at /careers with hero, 3 job listing cards (title, location, type, description), application email mailto link, company values, benefits, and contact CTA
- Contact page at /contact with hero, contact info grid (phone, email, address, fax with icons), and 6-field demo contact form
- Contact form includes name, email, company, phone, service interest dropdown (7 options via shadcn Select), and message textarea
- Phone (+1-614-451-7031) and email (info@Kenexis.com) prominently displayed with icons on contact page
- Installed shadcn textarea, label, and select components for form infrastructure

## Task Commits

Each task was committed atomically:

1. **Task 1: Install shadcn components, update contact data, and build careers page** - `9aabcff` (feat)
2. **Task 2: Build contact page with demo form and contact info display** - `0597214` (feat)

## Files Created/Modified
- `src/app/(marketing)/careers/page.tsx` - Careers page composing hero, job listings, culture, CTA
- `src/app/(marketing)/contact/page.tsx` - Contact page composing hero, info grid, demo form
- `src/components/sections/job-listings-section.tsx` - 3 job cards with stagger animation, application email link
- `src/components/sections/company-culture-section.tsx` - Two-column values and benefits with Heart/CheckCircle icons
- `src/components/sections/contact-form-section.tsx` - 6-field demo form with shadcn Select, success message
- `src/components/sections/contact-info-section.tsx` - 4-column info grid with circular icon containers
- `src/lib/data/contact.ts` - Updated contactFormFields with phone and serviceInterest fields
- `src/components/ui/textarea.tsx` - shadcn Textarea component
- `src/components/ui/label.tsx` - shadcn Label component
- `src/components/ui/select.tsx` - shadcn Select component

## Decisions Made
- ContactFormSection renders fields via filter-based approach for layout control (name+email paired, company+phone paired, serviceInterest full-width, message full-width)
- ContactInfoSection uses a static infoItems array with conditional href rendering (clickable for phone/email, plain text for address/fax)
- No ContactCTASection included on the contact page to avoid self-referential "Contact Us" link pointing to /contact

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- Turbopack build had intermittent ENOENT race conditions on Windows (missing build-manifest.json, pages-manifest.json) requiring multiple build retries. Not a code issue -- TypeScript compilation passed cleanly every time. Build eventually succeeded on retry.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Careers and Contact pages complete, ready for Phase 9 visual verification (Plan 03)
- All CAREER-01, CONTACT-01, CONTACT-02 requirements satisfied
- Demo contact form ready (no backend needed for pitch demo)

## Self-Check: PASSED

- All 10 files verified present on disk
- Commit 9aabcff (Task 1) verified in git log
- Commit 0597214 (Task 2) verified in git log
- TypeScript compilation passes with zero errors
- Next.js build passes with 22 pages (including /careers and /contact)

---
*Phase: 09-company-careers-contact*
*Completed: 2026-03-04*
