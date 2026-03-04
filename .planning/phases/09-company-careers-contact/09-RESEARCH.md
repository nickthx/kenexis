# Phase 9: Company, Careers & Contact - Research

**Researched:** 2026-03-03
**Domain:** Static marketing pages (About, Team, Representatives, Careers, Contact) with demo contact form
**Confidence:** HIGH

## Summary

Phase 9 builds five interconnected pages: Company overview (/about), Team (/about/team), Representatives (/about/representatives), Careers (/careers), and Contact (/contact). All content data is already scraped and structured in TypeScript files (`company.ts`, `careers.ts`, `contact.ts`) with typed interfaces. Team photos (10 members) are already stored locally in `/public/images/team/`. A stock `about-hero.jpg` image is also available.

The implementation follows the exact same patterns established in Phases 5-8: server component page files composing reusable section components, each section using `motion/react` for scroll-triggered animations, `shadcn/ui` Card/Badge/Button primitives, and consistent dark/light alternating section backgrounds. The contact form is demo-mode only (client-side state, no backend) following the same pattern as the existing newsletter form.

**Primary recommendation:** Build 5 pages using 8-10 new section components, reusing `ServicesHeroSection` for all page heroes, `ContactCTASection` as page terminators, and adding `shadcn/ui` Textarea and Label components for the contact form. No new npm packages needed.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| COMP-01 | Company overview page with history, mission, and key differentiators | `companyInfo` data object has all fields (founded, founders, description, mission, industries, regulatoryAlignment). Page at `/about` route. Reuse `ServicesHeroSection` with `about-hero.jpg`. |
| COMP-02 | Senior staff/team section with real photos, names, titles, and brief bios | `teamMembers` array has 10 members with photos in `/public/images/team/`. Can be inline on `/about` page or separate `/about/team` page (nav has both routes). Card grid with `isLeadership` flag for visual differentiation. |
| COMP-03 | Representatives page with global reps, regions, and contact details | `representatives` array has 11 entries with regions, phone, optional website/email/contactName. Group by geographic region for clarity. Page at `/about/representatives`. |
| CAREER-01 | Careers page with job listings and company culture | `jobListings` (3 jobs), `companyValues` (4 values), `benefits` (6 items), `applicationEmail` all defined in `careers.ts`. Page at `/careers`. |
| CONTACT-01 | Contact form with name, email, company, phone, message, and service interest dropdown (demo mode with success toast) | `contactFormFields` defined but needs updating: missing phone field and service interest dropdown per requirement. Demo mode follows newsletter pattern (useState, no backend). Add shadcn Textarea and Label. |
| CONTACT-02 | Phone (+1-614-451-7031) and email (info@kenexis.com) prominently displayed | `contactInfo` object already has phone, email, address, fax. Display in contact page info section AND verify already in header/footer (footer confirmed). |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router, server components, file-based routing | Project framework |
| React | 19.2.3 | UI rendering | Project framework |
| motion | 12.34.5 | Scroll-triggered animations (whileInView) | Used in all existing sections |
| shadcn/ui | 3.8.5 (CLI) | Card, Badge, Button, Input, Separator | Project component system |
| lucide-react | 0.576.0 | Icons (Building, Users, Globe, MapPin, Phone, Mail, Briefcase, etc.) | Project icon library |
| next-view-transitions | 0.3.5 | Link component for page transitions | Project routing |
| Tailwind CSS | 4.x | Styling with navy/orange brand tokens | Project styling |

### shadcn/ui Components Needed (Not Yet Installed)
| Component | Purpose | Install Command |
|-----------|---------|-----------------|
| Textarea | Contact form message field | `npx shadcn@latest add textarea` |
| Label | Contact form field labels | `npx shadcn@latest add label` |
| Select | Service interest dropdown on contact form | `npx shadcn@latest add select` |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| shadcn Select | Native HTML select | shadcn Select is consistent with design system, styled properly |
| Sonner toast for form success | Inline success message (like newsletter) | Newsletter pattern (inline message) is simpler and already proven; no need for toast library |

**Installation:**
```bash
npx shadcn@latest add textarea label select
```

## Architecture Patterns

### Recommended Project Structure
```
src/app/(marketing)/
  about/
    page.tsx                    # Company overview (COMP-01) + Team section (COMP-02)
    representatives/
      page.tsx                  # Representatives page (COMP-03)
  careers/
    page.tsx                    # Careers page (CAREER-01)
  contact/
    page.tsx                    # Contact page (CONTACT-01, CONTACT-02)

src/components/sections/
  company-overview-section.tsx  # History, mission, differentiators
  team-section.tsx              # Team member cards grid
  representatives-section.tsx   # Global reps grouped by region
  careers-hero-section.tsx      # (reuse ServicesHeroSection)
  job-listings-section.tsx      # Job cards with location and type
  company-culture-section.tsx   # Values and benefits
  contact-form-section.tsx      # Demo contact form
  contact-info-section.tsx      # Phone, email, address display

src/lib/data/
  company.ts                    # Already exists - companyInfo, teamMembers, representatives
  careers.ts                    # Already exists - jobListings, companyValues, benefits
  contact.ts                    # Already exists - contactInfo, contactFormFields (needs update)
```

### Pattern 1: Page Composition (Established Pattern)
**What:** Server component page file composes section components
**When to use:** Every page in this phase
**Example:**
```typescript
// src/app/(marketing)/about/page.tsx
import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { CompanyOverviewSection } from "@/components/sections/company-overview-section";
import { TeamSection } from "@/components/sections/team-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { aboutSEO } from "@/lib/data/company";

export const metadata: Metadata = {
  title: aboutSEO.title,
  description: aboutSEO.description,
  openGraph: {
    title: aboutSEO.title,
    description: aboutSEO.description,
    images: aboutSEO.ogImage ? [aboutSEO.ogImage] : undefined,
  },
};

export default function AboutPage() {
  return (
    <>
      <ServicesHeroSection
        title="About Kenexis"
        subtitle="Process safety experts since 2004"
        backgroundImage="/images/stock/about-hero.jpg"
      />
      <CompanyOverviewSection />
      <TeamSection />
      <ContactCTASection />
    </>
  );
}
```

### Pattern 2: Stagger Animation Grid (Established Pattern)
**What:** Container + item Framer Motion variants for card grids
**When to use:** Team cards, job listings, representative cards
**Example:**
```typescript
// Source: Existing ServicesGridSection pattern
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
```

### Pattern 3: Demo Mode Form (Established Pattern)
**What:** Client-side form with useState for submission, no backend
**When to use:** Contact form (matches newsletter form pattern)
**Example:**
```typescript
// Source: Existing NewsletterSection pattern
"use client";
import { useState } from "react";

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      {submitted && (
        <p className="text-accent mt-3">
          Thank you! We will respond within one business day.
        </p>
      )}
    </form>
  );
}
```

### Pattern 4: Section Background Alternation (Established Pattern)
**What:** Alternate between `bg-background`, `bg-muted/50`, and `bg-navy-900` sections
**When to use:** Every page to maintain visual rhythm
**Example sequence for About page:**
- Hero: dark (navy with image overlay)
- Overview: `bg-background` (white)
- Team: `bg-muted/50` (light gray)
- CTA: `bg-navy-900` (dark)

### Anti-Patterns to Avoid
- **Nested anchor tags:** Use `Button asChild` with `Link` for internal CTAs, plain `<a>` for external links (already established)
- **Using `<img>` instead of `next/image`:** Always use `next/image` Image component for team photos with proper alt text
- **Client component pages:** Page files should be server components; only section components with animations/interactivity need `"use client"`
- **Hardcoding contact info:** Always reference `contactInfo` from data files, never hardcode phone/email strings

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Contact form validation | Custom regex validation | HTML5 required + type attributes | Demo mode, no real submission; HTML5 validation sufficient |
| Toast notifications | Custom toast component | Inline success message (like newsletter) | Simpler, already proven in project, no extra dependency |
| Image optimization | Manual WebP conversion | Next.js Image component with fill/sizes | Built-in optimization, lazy loading, format negotiation |
| Select dropdown | Custom dropdown component | shadcn/ui Select (Radix-based) | Accessible, keyboard navigable, styled to match design system |
| Responsive grid | Custom media query layouts | Tailwind grid-cols responsive breakpoints | Consistent with all existing sections |
| Map/location embed | Google Maps iframe | Static address text with link | Demo site; no API key management needed |

**Key insight:** This phase has zero novel UI challenges. Every component pattern (card grids, hero sections, forms, info displays) has been implemented in prior phases. The only new element is the contact form, which follows the newsletter form pattern exactly.

## Common Pitfalls

### Pitfall 1: Contact Form Field Mismatch
**What goes wrong:** The existing `contactFormFields` in `contact.ts` does not match the CONTACT-01 requirement which specifies: name, email, company, phone, message, and service interest dropdown. The current data has subject, message, firstName, lastName, email, company -- missing phone and service interest dropdown.
**Why it happens:** Data was scraped from kenexis.com which has a slightly different form structure than what was specified in requirements.
**How to avoid:** Update `contactFormFields` in `contact.ts` to include phone (type: "tel") and serviceInterest (type: "select" with options array). Can keep firstName/lastName split but add the missing fields. The subject field from the original site can be kept or replaced with service interest dropdown.
**Warning signs:** Form renders without phone or service interest fields.

### Pitfall 2: Team Photo Sizing Inconsistency
**What goes wrong:** Team photos are a mix of .png and .jpg files at potentially different dimensions. Some may have transparent backgrounds (PNG), others not (JPG).
**Why it happens:** Photos were scraped from kenexis.com where different upload dates produced different formats.
**How to avoid:** Use `next/image` with `fill` prop inside a fixed-size container with `object-cover` class. Apply consistent aspect-ratio (1:1 square or 3:4 portrait) wrapper divs. Use rounded-full for circular headshots or rounded-lg for rectangular.
**Warning signs:** Cards are different heights, photos look stretched or cropped badly.

### Pitfall 3: Representatives Grouping Logic
**What goes wrong:** Representatives are stored as a flat array but should display grouped by geographic region for usability.
**Why it happens:** Data structure is flat; no region grouping field exists directly (regions is per-representative).
**How to avoid:** Create a display grouping in the section component based on high-level region categories (North America, South America, Middle East, Asia Pacific, Europe, Africa, Australia/NZ). This can be a simple mapping function or a constant that groups rep IDs.
**Warning signs:** All 11 representatives listed in a single flat list with no visual organization.

### Pitfall 4: Missing SEO Metadata for New Pages
**What goes wrong:** New pages render without proper title/description/OG tags.
**Why it happens:** Forgetting to export metadata from page files.
**How to avoid:** Every page.tsx must export `metadata: Metadata` using the SEO objects already defined (`aboutSEO` in company.ts, `careersSEO` in careers.ts, `contactSEO` in contact.ts). Need to add SEO objects for representatives page.
**Warning signs:** Browser tab shows default "Next.js" title or no OG preview.

### Pitfall 5: Navigation Routes Not Matching
**What goes wrong:** Links in header/footer nav point to routes that don't exist yet or use wrong paths.
**Why it happens:** Navigation data was defined early (Phase 3) before pages were built.
**How to avoid:** Verify navigation.ts routes match the actual page file paths. Current nav routes: `/about`, `/about/team`, `/about/representatives`, `/careers`, `/contact`. The team section could be on `/about` page directly or as a separate `/about/team` page -- nav expects separate page, so build both or combine with in-page anchor.
**Warning signs:** Clicking nav links shows 404 pages.

## Code Examples

### Team Member Card
```typescript
// Pattern from design-repos/shadcn-ui-landing-page/src/components/Team.tsx adapted for project
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { TeamMember } from "@/lib/data/company";

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <Card className="text-center">
      <CardHeader className="items-center">
        <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4">
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
        <CardTitle>{member.name}</CardTitle>
        <CardDescription>{member.title}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-1 justify-center">
        {member.credentials.map((cred) => (
          <Badge key={cred} variant="secondary" className="text-xs">
            {cred}
          </Badge>
        ))}
      </CardContent>
    </Card>
  );
}
```

### Representative Card with Region Badge
```typescript
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Phone, ExternalLink } from "lucide-react";
import type { Representative } from "@/lib/data/company";

function RepresentativeCard({ rep }: { rep: Representative }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{rep.company}</CardTitle>
        {rep.contactName && (
          <p className="text-sm text-muted-foreground">{rep.contactName}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-1">
          {rep.regions.map((region) => (
            <Badge key={region} variant="outline" className="text-xs">
              <Globe className="mr-1" size={12} />
              {region}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Phone size={14} className="text-muted-foreground" />
          <span>{rep.phone}</span>
        </div>
        {rep.website && (
          <a
            href={rep.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-accent hover:underline"
          >
            <ExternalLink size={14} />
            Website
          </a>
        )}
      </CardContent>
    </Card>
  );
}
```

### Contact Form with Demo Submission
```typescript
"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const serviceOptions = [
  "Process Hazards Analysis",
  "Quantitative Risk Analysis",
  "Fire & Gas Mapping",
  "Safety Instrumented Systems",
  "Software Products",
  "Training",
  "General Inquiry",
];

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="mx-auto max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Send Us a Message</h2>
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input id="name" required disabled={submitted} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" required disabled={submitted} placeholder="your@email.com" />
              </div>
            </div>
            {/* ... more fields */}
            <Button
              type="submit"
              disabled={submitted}
              className="w-full bg-accent text-accent-foreground hover:bg-orange-600"
            >
              {submitted ? "Message Sent!" : "Submit Inquiry"}
            </Button>
          </form>
          {submitted && (
            <p className="text-center text-accent mt-4">
              Thank you for your inquiry! We will respond within one business day.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
```

### Company Info Display
```typescript
import { Phone, Mail, MapPin, Printer } from "lucide-react";
import { contactInfo } from "@/lib/data/contact";

function ContactInfoSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
              <Phone className="text-accent" size={24} />
            </div>
            <h3 className="font-semibold mb-1">Phone</h3>
            <a href={`tel:${contactInfo.phone}`} className="text-muted-foreground hover:text-accent">
              {contactInfo.phone}
            </a>
          </div>
          {/* ... email, address, fax similarly */}
        </div>
      </div>
    </section>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Form libraries (react-hook-form, formik) | Native HTML5 form + useState for demo | Project decision | No extra dependency for demo-only form |
| Google Maps embed | Static address display | Project decision (out of scope) | No API key management |
| Individual route pages for each about sub-page | Nested route group `/about/[sub]` | Next.js App Router | Clean URL hierarchy with shared layout possible |
| Client-side form validation | HTML5 required + type attributes | N/A | Sufficient for demo mode |

**Deprecated/outdated:**
- None relevant. All patterns are current and established in the project.

## Data File Updates Required

### contact.ts - Fields Mismatch
The existing `contactFormFields` array needs updating to match CONTACT-01 requirement:

**Current fields:** subject, message, firstName, lastName, email, company
**Required fields:** name, email, company, phone, message, service interest dropdown

**Recommended update:**
- Merge firstName/lastName into single "name" field OR keep the split (either works)
- Add phone field (type: "tel", required: false)
- Replace subject field with serviceInterest (type: "select" with options for each service area)
- Keep message and company fields as-is

### company.ts - Representatives Region Grouping
Representatives data may benefit from adding a `regionGroup` field for display grouping:

| Region Group | Representatives |
|--------------|-----------------|
| North America | Detection & Measurement, Westech, Ino-Tek |
| South & Central America | Dynamis, Keystone |
| Middle East | ExidaSP |
| Europe | Anar, Velocis |
| Africa | Pinnacle |
| Asia Pacific | UIT |
| Australia/NZ | SGS ECL |

This grouping can be done in the component without modifying the data file, using a simple mapping constant.

### SEO Objects Needed
- `aboutSEO` - Already exists in company.ts
- `careersSEO` - Already exists in careers.ts
- `contactSEO` - Already exists in contact.ts
- `representativesSEO` - **Needs to be added** to company.ts
- `teamSEO` - **Needs to be added** to company.ts (if separate page)

## Route Structure Decision

The navigation data defines these routes:
- `/about` - Company info (nav label: "Company")
- `/about/team` - Meet the team (nav label: "Team")
- `/about/representatives` - Global reps (nav label: "Representatives")
- `/careers` - Careers
- `/contact` - Contact

**Recommendation:** Build all five as separate pages matching the navigation structure. The `/about` page can include a brief team preview with a "Meet the Full Team" link to `/about/team`, but the full team grid should be at `/about/team` to match the nav expectation.

**Alternative considered:** Putting team inline on `/about` page only. Rejected because the navigation mega menu explicitly has a "Team" link to `/about/team`.

## Open Questions

1. **Team section scope: inline vs. separate page**
   - What we know: Navigation defines `/about/team` as separate route. About page should have company overview content.
   - What's unclear: Should the about page show a team preview (leadership only) + link, or just skip team entirely?
   - Recommendation: Show leadership (2 people with `isLeadership: true`) on `/about` page with "Meet Our Full Team" CTA. Full team grid on `/about/team` page.

2. **Contact form field alignment with requirement vs. original site**
   - What we know: CONTACT-01 specifies "service interest dropdown" but original kenexis.com has "subject" field. Data file follows original site.
   - What's unclear: Should we follow the requirement (service interest dropdown) or original site (subject text field)?
   - Recommendation: Follow the requirement (CONTACT-01). Use shadcn Select for service interest dropdown. This is an improvement over the original site.

3. **Representatives page - need additional email data?**
   - What we know: Original kenexis.com reps page shows emails for some representatives. Our data file has `email: null` for all.
   - What's unclear: Should we add the email addresses from the scraped data?
   - Recommendation: The data file already has the structure (`email: string | null`). Implementer can update with scraped emails if desired, but the UI should handle null gracefully either way.

## Sources

### Primary (HIGH confidence)
- Project codebase analysis - all data files, existing section components, page patterns, navigation structure, package.json
- Kenexis.com /about/ page - company info, contact details verified
- Kenexis.com /about/meet-the-team/ - all 10 team members confirmed with photos
- Kenexis.com /about/representatives/ - all 11 representatives with regions and contacts
- Kenexis.com /about/employment/ - 3 job listings, benefits, company values, application email
- Kenexis.com /contact/ - form fields, contact info, response time promise

### Secondary (MEDIUM confidence)
- Design repo patterns (shadcn-ui-landing-page Team.tsx, About.tsx) - team card layout patterns

### Tertiary (LOW confidence)
- None. All findings verified against project codebase and original kenexis.com.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and used extensively in 8 prior phases
- Architecture: HIGH - Exact same patterns used in all prior phases; zero new architectural decisions
- Pitfalls: HIGH - Based on direct analysis of data file contents vs. requirements, plus prior phase experience
- Data completeness: HIGH - All data files exist with typed interfaces; only minor updates needed (contact form fields, SEO objects)

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (stable; no external dependencies or fast-moving APIs)
