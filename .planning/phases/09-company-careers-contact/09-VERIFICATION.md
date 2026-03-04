---
phase: 09-company-careers-contact
verified: 2026-03-04T16:30:00Z
status: human_needed
score: 11/11 must-haves verified
re_verification: false
human_verification:
  - test: "Visit /about and confirm scroll animations fire on each section"
    expected: "Company overview, leadership preview each animate in as user scrolls down"
    why_human: "Animation behavior cannot be verified via static file inspection"
  - test: "Visit /about/team and confirm all 10 team member photos render at consistent sizes without layout shifts"
    expected: "10 circular photos display at 96px x 96px, no stretching or broken images"
    why_human: "Photo render quality and image load behavior require a live browser"
  - test: "Visit /about/representatives and confirm 11 representatives appear distributed across 6 region groups"
    expected: "North America (3 reps), South & Central America (2), Middle East & Central Asia (3), Europe (1 Anar with Turkey/Bulgaria), Africa (1), Asia Pacific & Oceania (2 SGS ECL + UIT) — with South Korea under Asia Pacific"
    why_human: "Region filter matching logic for South Korea (Asia Pacific) cannot be confirmed without runtime execution"
  - test: "Fill out and submit the contact form at /contact"
    expected: "After submit: all 6 fields disable, button changes to 'Message Sent!', success message 'Thank you for your inquiry! We will respond within one business day.' appears below the form"
    why_human: "React useState interaction requires a running browser"
  - test: "Verify About mega menu dropdown links"
    expected: "Clicking Company, Team, and Representatives in the About dropdown navigates to /about, /about/team, /about/representatives respectively without 404"
    why_human: "Navigation interaction requires a live browser"
---

# Phase 9: Company, Careers & Contact Verification Report

**Phase Goal:** Users can learn about Kenexis as a company, view the team, find representatives, explore career opportunities, and submit an inquiry
**Verified:** 2026-03-04T16:30:00Z
**Status:** human_needed — all automated checks pass; 5 items require live browser confirmation
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | User can read the About page with company history, mission, industries, and regulatory alignment | VERIFIED | `company-overview-section.tsx` renders `companyInfo.description`, `.mission`, `.founded`, `.founders`, `.industries` (5 badges), `.regulatoryAlignment` (4 badges), `.headquarters.address` |
| 2 | User sees leadership preview (Edward Marszal and Kevin Mitchell) on the About page with photos and titles | VERIFIED | `leadership-preview-section.tsx` calls `getLeadership()`, which filters `teamMembers` where `isLeadership: true`; both Edward Marszal (President) and Kevin Mitchell (VP) have `isLeadership: true` in `company.ts` |
| 3 | User can click "Meet Our Full Team" on About page and navigate to /about/team | VERIFIED | `leadership-preview-section.tsx` line 101: `<Link href="/about/team">Meet Our Full Team</Link>` inside a Button — link is present and wired |
| 4 | User sees all 10 team members on /about/team with photos, names, titles, and credential badges | VERIFIED | `team-section.tsx` iterates over `teamMembers` (10 entries confirmed in `company.ts`); renders `member.name`, `member.title`, `member.photo` in `next/image`, `member.credentials` as Badge components |
| 5 | User can view /about/representatives with 11 representatives grouped by geographic region | VERIFIED | `representatives-section.tsx` defines 6 region groups and filters the 11-entry `representatives` array; `return null` guard correctly skips empty groups; 11 reps confirmed in `company.ts` (10 teamMembers + 11 reps = 21 total IDs) |
| 6 | User sees phone numbers, websites, and contact names for each representative | VERIFIED | Each rep card renders `tel:` link with `rep.phone`, conditional `rep.website` as external link (hostname via `new URL().hostname`), conditional `rep.contactName`, conditional `rep.email` |
| 7 | User sees careers page with 3 job listings showing title, location, type, and description | VERIFIED | `job-listings-section.tsx` iterates `jobListings` (3 entries in `careers.ts`); renders `job.title`, `job.location` with MapPin, Badge "Full-time", `job.description` |
| 8 | User sees company values and benefits on the careers page | VERIFIED | `company-culture-section.tsx` imports `companyValues` (4 items) and `benefits` (6 items) from `careers.ts`; renders two-column layout with Heart and CheckCircle icons |
| 9 | User sees an application email link (employment@kenexis.com) on the careers page | VERIFIED | `job-listings-section.tsx` line 96: `href={\`mailto:${applicationEmail}\`}` where `applicationEmail = "employment@kenexis.com"` in `careers.ts` |
| 10 | User can fill out a contact form with name, email, company, phone, message, and service interest dropdown | VERIFIED | `contact-form-section.tsx` renders all 6 fields from `contactFormFields`: name (text), email (email), company (text), phone (tel), serviceInterest (shadcn Select with 7 options), message (Textarea with maxLength 500) |
| 11 | User sees phone (+1-614-451-7031) and email (info@kenexis.com) prominently on the contact page | VERIFIED | `contact-info-section.tsx` renders `contactInfo.phone` (+1-614-451-7031) and `contactInfo.email` (info@Kenexis.com) with icon containers and clickable `tel:` and `mailto:` links; `ContactInfoSection` appears before `ContactFormSection` in `contact/page.tsx` |

**Score:** 11/11 truths verified (automated)

---

### Required Artifacts

| Artifact | Min Lines | Actual Lines | Contains Check | Status |
|----------|-----------|--------------|----------------|--------|
| `src/app/(marketing)/about/page.tsx` | — | 31 | `ServicesHeroSection` | VERIFIED |
| `src/app/(marketing)/about/team/page.tsx` | — | 29 | `TeamSection` | VERIFIED |
| `src/app/(marketing)/about/representatives/page.tsx` | — | 31 | `RepresentativesSection` | VERIFIED |
| `src/components/sections/company-overview-section.tsx` | 40 | 95 | — | VERIFIED |
| `src/components/sections/leadership-preview-section.tsx` | 30 | 107 | — | VERIFIED |
| `src/components/sections/team-section.tsx` | 40 | 102 | — | VERIFIED |
| `src/components/sections/representatives-section.tsx` | 50 | 172 | — | VERIFIED |
| `src/app/(marketing)/careers/page.tsx` | — | 30 | `JobListingsSection` | VERIFIED |
| `src/app/(marketing)/contact/page.tsx` | — | 28 | `ContactFormSection` | VERIFIED |
| `src/components/sections/job-listings-section.tsx` | 40 | 106 | — | VERIFIED |
| `src/components/sections/company-culture-section.tsx` | 30 | 49 | — | VERIFIED |
| `src/components/sections/contact-form-section.tsx` | 60 | 158 | — | VERIFIED |
| `src/components/sections/contact-info-section.tsx` | 30 | 69 | — | VERIFIED |
| `src/lib/data/contact.ts` | — | 103 | `serviceInterest` | VERIFIED |
| `src/lib/data/careers.ts` | — | 61 | `jobListings`, `applicationEmail` | VERIFIED |
| `src/components/ui/textarea.tsx` | — | exists | — | VERIFIED |
| `src/components/ui/label.tsx` | — | exists | — | VERIFIED |
| `src/components/ui/select.tsx` | — | exists | — | VERIFIED |

All 18 artifacts: VERIFIED — exist, substantive (above minimums), and wired.

---

### Key Link Verification

| From | To | Via | Pattern Found | Status |
|------|----|-----|---------------|--------|
| `src/app/(marketing)/about/page.tsx` | `src/lib/data/company` | `aboutSEO` import for metadata | `import { aboutSEO } from "@/lib/data/company"` line 6 | WIRED |
| `src/components/sections/leadership-preview-section.tsx` | `/about/team` | Link CTA | `<Link href="/about/team">Meet Our Full Team</Link>` line 101 | WIRED |
| `src/components/sections/representatives-section.tsx` | `src/lib/data/company` | `representatives` import | `import { representatives, type Representative } from "@/lib/data/company"` line 12 | WIRED |
| `src/components/sections/contact-form-section.tsx` | `src/lib/data/contact` | `contactFormFields` import | `import { contactFormFields } from "@/lib/data/contact"` line 16 | WIRED |
| `src/components/sections/contact-info-section.tsx` | `src/lib/data/contact` | `contactInfo` import | `import { contactInfo } from "@/lib/data/contact"` line 5 | WIRED |
| `src/components/sections/job-listings-section.tsx` | `src/lib/data/careers` | `jobListings`, `applicationEmail` imports | `import { jobListings, applicationEmail } from "@/lib/data/careers"` line 13 | WIRED |
| `src/app/(marketing)/about/team/page.tsx` | `src/lib/data/company` | `teamSEO` import | `import { teamSEO } from "@/lib/data/company"` line 5 | WIRED |
| `src/app/(marketing)/about/representatives/page.tsx` | `src/lib/data/company` | `representativesSEO` import | `import { representativesSEO } from "@/lib/data/company"` line 5 | WIRED |

All 8 key links: WIRED.

---

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| COMP-01 | 09-01 | Company overview page with Kenexis history, mission, key differentiators | SATISFIED | `/about/page.tsx` + `company-overview-section.tsx` render description, mission, founded year, industries, regulatory alignment, headquarters |
| COMP-02 | 09-01 | Senior staff/team section with real photos, names, titles | SATISFIED | `/about/team/page.tsx` + `team-section.tsx` render all 10 members with `next/image` photos, names, titles, credentials |
| COMP-03 | 09-01 | Representatives page with regions and contact details | SATISFIED | `/about/representatives/page.tsx` + `representatives-section.tsx` render 11 reps grouped by 6 regions with phone, website, email |
| CAREER-01 | 09-02 | Careers page with job listings and company culture | SATISFIED | `/careers/page.tsx` renders `JobListingsSection` (3 jobs) + `CompanyCultureSection` (4 values, 6 benefits) + application email link |
| CONTACT-01 | 09-02 | Contact form: name, email, company, phone, message, service interest dropdown | SATISFIED | `contactFormFields` in `contact.ts` has all 6 fields; `contact-form-section.tsx` renders them with proper shadcn Select for serviceInterest with 7 options |
| CONTACT-02 | 09-02 | Phone (+1-614-451-7031) and email prominently displayed on contact page | SATISFIED | `contact-info-section.tsx` renders phone and email first in the 4-column grid with icon containers; appears as first section after hero in `/contact/page.tsx` |

All 6 requirements: SATISFIED. No orphaned requirements found — all 6 IDs declared in plan frontmatter match the traceability table in REQUIREMENTS.md (all marked Complete for Phase 9).

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `representatives-section.tsx` | 85 | `return null` | Info | Intentional conditional guard for region groups with zero matching reps — not a stub |

No blockers or warnings found. The single `return null` is a correct conditional render guard, not an empty implementation.

---

### Human Verification Required

#### 1. Scroll animations on /about

**Test:** Open http://localhost:3000/about and scroll slowly through the page.
**Expected:** Each section (company overview, leadership preview) fades in as it enters the viewport; "Meet Our Full Team" button appears after the leadership cards.
**Why human:** `motion/react` `whileInView` animation behavior requires a live browser with JavaScript running.

#### 2. Team photo rendering at /about/team

**Test:** Open http://localhost:3000/about/team and inspect all 10 team member cards.
**Expected:** All photos render within the circular 96px x 96px container without stretching, broken images, or layout shifts. Edward Marszal and Kevin Mitchell show the orange ring and "Leadership" badge.
**Why human:** Image load, sizing, and visual presentation require a live browser.

#### 3. Representatives region distribution at /about/representatives

**Test:** Open http://localhost:3000/about/representatives and count the region groups and representatives.
**Expected:** 6 region headings with Globe icons; North America (3), South & Central America (2), Middle East & Central Asia (3 — ExidaSP covers UAE/Algeria/India/Iraq, but this is 1 rep card not 4), Europe (1), Africa (1), Asia Pacific & Oceania (2). Total visible rep cards = 11.
**Why human:** Filter logic needs runtime confirmation to verify South Korea (UIT) appears under Asia Pacific and that no reps are double-counted or missed.

#### 4. Contact form demo submission at /contact

**Test:** Visit http://localhost:3000/contact, fill in all fields including the service interest dropdown, and click "Send Message."
**Expected:** Button changes to "Message Sent!" and is disabled; all 6 input fields disable; success message "Thank you for your inquiry! We will respond within one business day." appears below the form.
**Why human:** React `useState` interaction requires a live browser.

#### 5. Navigation mega menu About dropdown

**Test:** Hover over "About" in the main navigation header. Click each sub-link in the dropdown.
**Expected:** Three links present — Company (/about), Team (/about/team), Representatives (/about/representatives) — each navigating to the correct page without a 404.
**Why human:** Navigation dropdown interaction and routing require a live browser.

---

### Summary

All 11 observable truths are verified against actual code. All 18 artifacts exist and are substantive. All 8 key links are wired. All 6 phase requirements (COMP-01, COMP-02, COMP-03, CAREER-01, CONTACT-01, CONTACT-02) are satisfied with implementation evidence. No anti-patterns block the goal. The 5 human verification items are standard visual/interaction checks that cannot be automated via static analysis — they require a running browser to confirm animations, photo rendering, form state behavior, and navigation.

---

*Verified: 2026-03-04T16:30:00Z*
*Verifier: Claude (gsd-verifier)*
