# Phase 8: Training & Resources - Research

**Researched:** 2026-03-03
**Domain:** Content-driven landing pages (training catalog + resource hub) in Next.js 16 with existing design system
**Confidence:** HIGH

## Summary

Phase 8 delivers two new route groups -- `/training` and `/resources` -- each as content-rich landing pages that present Kenexis training offerings and a centralized resource hub. This is architecturally straightforward: the data layer already exists (`training.ts` with 15 courses, `kenexisUnlimited`, `trainingInfo`; `resources.ts` with 7 categories, sample content, external links), the design system is proven across 7 completed phases, and the component patterns (hero sections, card grids, CTA sections, newsletter forms) are all established and reusable.

The training page requires a hero section (stock image `training-hero.jpg` already exists), a course catalog grid organized by category (process-safety, software-training, fire-gas), training info (pricing, format, certificates), and a Kenexis Unlimited SaaS-style presentation section. The resources page requires a hero section (needs a stock image or reuse existing), resource category cards linking to sub-sections, content listings for webinars/papers/podcast, external links (YouTube, Spotify, RSS), and a newsletter signup form (the `NewsletterSection` component already exists from Phase 4).

**Primary recommendation:** Build two new page routes with reusable section components following the exact patterns from services/software pages. The data layer is complete -- no scraping or data creation needed. Reuse `ServicesHeroSection` (with props) for both hero sections, create new section components for training catalog, Kenexis Unlimited, and resource hub content, and reuse `NewsletterSection` and `ContactCTASection` directly.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TRAIN-01 | Training page with course listings (names, descriptions, formats, links) | Data exists in `trainingCourses[]` (15 courses). Use card grid grouped by `category` field. Format is uniform ("online-on-demand"). Link to KISS platform for registration. |
| TRAIN-02 | Kenexis Unlimited subscription in SaaS-style format | Data exists in `kenexisUnlimited` (name, description, includes[], pricingNote). Build a feature-card section similar to `ProductFeaturesSection` with check marks for includes. |
| RES-01 | Centralized resource hub page with all content types | Data exists in `resourceCategories[]` (7 categories). Build category card grid similar to `ServicesGridSection`. |
| RES-02 | Recorded webinar listings with titles, descriptions, YouTube links | Data exists in `sampleWebinars[]`. Expand with full webinar data from kenexis.com (25+ webinars). Link to YouTube channel. |
| RES-03 | Papers, articles, and books listings | Data exists in `sampleArticles[]`. Expand with real papers/books data scraped from kenexis.com (white papers, conference papers, magazine articles, handbooks). |
| RES-04 | Podcast section with episodes linking to Spotify | Spotify link in `externalLinks.spotify`. Create podcast section with show description and link. 45+ episodes exist on Spotify. |
| RES-05 | YouTube channel and RSS feed links | Links exist in `externalLinks` (youtube, rss). Display as prominent external link cards. |
| RES-06 | Newsletter registration from resources page | `NewsletterSection` component already exists from Phase 4 (demo mode). Import and reuse directly on resources page. |
</phase_requirements>

## Standard Stack

### Core (Already Installed -- No New Dependencies)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router, static pages, metadata | Project framework |
| React | 19.2.3 | Component rendering | Project framework |
| Tailwind CSS | v4 | Utility-first styling | Project design system |
| motion | 12.34.5 | Scroll animations, stagger reveals | Established animation pattern |
| lucide-react | 0.576.0 | Icons for categories and UI elements | Project icon library |
| shadcn/ui | 3.8.5 | Card, Badge, Button components | Project component library |
| next-view-transitions | 0.3.5 | Page transitions via CSS View Transitions | Project navigation pattern |

### Supporting (Already Installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| radix-ui | 1.4.3 | Accessible primitives (Tabs for category filtering) | Resource hub category tabs |
| class-variance-authority | 0.7.1 | Component variant styling | Any new variant components |

### New shadcn/ui Components Needed
| Component | Purpose | Install Command |
|-----------|---------|-----------------|
| Tabs | Resource hub category filtering/navigation | `npx shadcn@latest add tabs` |
| Separator | Visual dividers between content sections | `npx shadcn@latest add separator` |

**Installation:**
```bash
npx shadcn@latest add tabs separator
```

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tabs for category nav | Separate pages per category | Tabs keep user on one page, simpler for demo; separate pages better for SEO in production |
| Inline content listings | Accordion per category | Cards with listings match existing grid pattern better |

## Architecture Patterns

### Recommended Project Structure
```
src/
  app/(marketing)/
    training/
      page.tsx               # Training landing page
    resources/
      page.tsx               # Resource hub landing page
  components/sections/
    training-hero-section.tsx       # Reuse ServicesHeroSection pattern or create dedicated
    training-courses-section.tsx    # Course catalog grid by category
    training-info-section.tsx       # Format, pricing, certificates info
    kenexis-unlimited-section.tsx   # SaaS-style Unlimited subscription card
    resources-hero-section.tsx      # Reuse ServicesHeroSection pattern
    resource-categories-section.tsx # Category card grid
    webinars-section.tsx            # Webinar listings
    papers-section.tsx              # Papers/articles/books listings
    podcast-section.tsx             # Podcast section with Spotify link
    external-links-section.tsx      # YouTube, RSS feed links
  lib/data/
    training.ts              # ALREADY EXISTS -- 15 courses, Unlimited, training info, SEO
    resources.ts             # ALREADY EXISTS -- 7 categories, sample content, external links, SEO
```

### Pattern 1: Hero Section Reuse
**What:** Reuse `ServicesHeroSection` with custom title/subtitle props for both training and resources heroes
**When to use:** Any interior page hero that needs dark overlay + industrial photo + centered text
**Example:**
```typescript
// Source: Established pattern from src/components/sections/services-hero-section.tsx
<ServicesHeroSection
  title="Process Safety Training Center"
  subtitle="Online on-demand courses for process safety professionals"
  backgroundImage="/images/stock/training-hero.jpg"
/>
```

### Pattern 2: Category-Grouped Card Grid
**What:** Cards grouped by category with section headings, using stagger animations
**When to use:** Training courses grouped by category, resource types
**Example:**
```typescript
// Source: Established pattern from services-grid-section.tsx and product-grid-section.tsx
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Group courses by category
const grouped = Object.groupBy(trainingCourses, (c) => c.category);
```

### Pattern 3: SaaS-Style Feature Card (Kenexis Unlimited)
**What:** Prominent card with check-mark feature list, description, and CTA -- similar to product pages
**When to use:** Kenexis Unlimited subscription presentation
**Example:**
```typescript
// Source: Established pattern from product-features-section.tsx
import { Check } from "lucide-react";

{kenexisUnlimited.includes.map((item) => (
  <li className="flex items-start gap-3">
    <Check className="text-accent flex-shrink-0 mt-1" size={20} strokeWidth={2.5} />
    <span className="text-lg text-muted-foreground">{item}</span>
  </li>
))}
```

### Pattern 4: External Link Cards
**What:** Cards for YouTube, Spotify, RSS that open in new tabs using anchor tags (not Link)
**When to use:** External resource links (RES-04, RES-05)
**Example:**
```typescript
// Source: Established pattern from product-cta-section.tsx
import { ExternalLink } from "lucide-react";

<Button size="lg" asChild>
  <a href={externalLinks.youtube} target="_blank" rel="noopener noreferrer">
    Watch on YouTube
    <ExternalLink className="ml-2 h-4 w-4" />
  </a>
</Button>
```

### Pattern 5: Page Composition
**What:** Pages composed of imported section components with metadata from data layer
**When to use:** Every page in this phase
**Example:**
```typescript
// Source: Established pattern from services/page.tsx, software/page.tsx
import type { Metadata } from "next";
import { trainingSEO } from "@/lib/data/training";

export const metadata: Metadata = {
  title: trainingSEO.title,
  description: trainingSEO.description,
  openGraph: { ... },
};

export default function TrainingPage() {
  return (
    <>
      <ServicesHeroSection title="..." subtitle="..." backgroundImage="..." />
      <TrainingCoursesSection />
      <TrainingInfoSection />
      <KenexisUnlimitedSection />
      <ContactCTASection />
    </>
  );
}
```

### Anti-Patterns to Avoid
- **Creating new hero components from scratch:** Reuse `ServicesHeroSection` with props -- it already handles dark overlay, gradient, motion animations, and responsive sizing
- **Hardcoding content in components:** All content comes from data files (`training.ts`, `resources.ts`) -- components receive props or import from data layer
- **Using `Link` for external URLs:** Use `<a>` tags with `target="_blank"` and `rel="noopener noreferrer"` for YouTube, Spotify, RSS, KISS login links
- **Adding `"use client"` to page files:** Page files stay as server components; only section components with motion animations or interactivity need `"use client"`
- **Inconsistent section spacing:** All sections use `py-16 sm:py-24` with `mx-auto max-w-7xl px-4` containers -- match established rhythm

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Newsletter form | Custom form with validation | Existing `NewsletterSection` component | Already built in Phase 4, demo mode, tested |
| Contact CTA | New CTA section | Existing `ContactCTASection` component | Already built, consistent styling |
| Icon mapping | New icon utility | Existing `getNavIcon()` from navigation-utils | Already maps string names to Lucide icons |
| Card layouts | Custom card HTML | shadcn/ui `Card`, `CardHeader`, `CardContent` | Consistent with project design system |
| Page transitions | Manual transition code | `Link` from `next-view-transitions` | Already wired project-wide |
| Breadcrumbs | Custom breadcrumb | Existing breadcrumb infrastructure | Already handles path-based rendering |
| Category badge styling | Custom colored spans | shadcn/ui `Badge` component | Already installed, handles variants |

**Key insight:** This phase should create almost zero new primitives. The design system and reusable components from Phases 3-7 cover every UI pattern needed. The work is composing existing patterns with training/resources data.

## Common Pitfalls

### Pitfall 1: Data Layer Expansion Without Types
**What goes wrong:** Adding new webinar/paper data to resources.ts without updating TypeScript interfaces
**Why it happens:** The existing `SampleContent` interface is minimal (title, description, category, href) -- real content may need additional fields (date, author, thumbnail, duration)
**How to avoid:** If expanding data, extend the interface first. If keeping sample data as-is, ensure the component handles the existing shape.
**Warning signs:** TypeScript errors on build, missing fields in UI

### Pitfall 2: Inconsistent Section Background Alternation
**What goes wrong:** All sections have the same background, creating a flat visual
**Why it happens:** Not following the established alternating pattern (bg-background / bg-muted/50 / bg-navy-900)
**How to avoid:** Plan the section order and assign alternating backgrounds before building. Established pattern: hero (dark) -> content (light) -> content (muted) -> content (light) -> CTA (dark).
**Warning signs:** Visual monotony when scrolling, no clear section boundaries

### Pitfall 3: Newsletter Section Data Coupling
**What goes wrong:** `NewsletterSection` imports `homeNewsletterCTA` from `home.ts` -- title says "Stay Informed on Process Safety"
**Why it happens:** Component was built for homepage only
**How to avoid:** Either (a) make `NewsletterSection` accept props for title/description/buttonText with defaults from home.ts, or (b) create a lightweight wrapper that passes resources-specific copy. Option (a) is cleaner.
**Warning signs:** Newsletter section on resources page has homepage-specific copy

### Pitfall 4: Missing Lucide Icons for New Categories
**What goes wrong:** Resource category icons (e.g., "newspaper", "video", "headphones", "wrench", "book-open", "play-circle") are not in the existing `iconMap` in `navigation-utils.ts`
**Why it happens:** The icon map was built for navigation items only
**How to avoid:** Either extend the `iconMap` with new icons, or import Lucide icons directly in the resource components (simpler for one-off use). Direct import is cleaner since these icons are section-specific, not navigation-related.
**Warning signs:** Null icons rendering, missing visual indicators

### Pitfall 5: External Links Not Opening in New Tabs
**What goes wrong:** YouTube, Spotify, RSS links navigate away from the site
**Why it happens:** Using `Link` from next-view-transitions instead of `<a>` tags
**How to avoid:** All external links use `<a href="..." target="_blank" rel="noopener noreferrer">`. Established pattern in `ProductCTASection`.
**Warning signs:** Clicking YouTube/Spotify navigates away from the demo site

### Pitfall 6: Forgetting Resources Page Hero Image
**What goes wrong:** Resources page has no hero background image
**Why it happens:** `training-hero.jpg` exists but no `resources-hero.jpg` in stock images
**How to avoid:** Either (a) download a new stock image for resources, (b) reuse an existing stock image like `bg-industrial-1.jpg` or `hero-control-room.jpg`, or (c) use a solid navy gradient hero without image. Option (b) is fastest and still on-brand.
**Warning signs:** Broken image path, unstyled hero section

## Code Examples

Verified patterns from existing project codebase:

### Training Page Composition
```typescript
// Source: Pattern from src/app/(marketing)/services/page.tsx
import type { Metadata } from "next";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { trainingSEO } from "@/lib/data/training";

export const metadata: Metadata = {
  title: trainingSEO.title,
  description: trainingSEO.description,
  openGraph: {
    title: trainingSEO.title,
    description: trainingSEO.description,
    images: trainingSEO.ogImage ? [trainingSEO.ogImage] : undefined,
  },
};

export default function TrainingPage() {
  return (
    <>
      <ServicesHeroSection
        title="Process Safety Training Center"
        subtitle="Online on-demand courses with video instruction, quizzes, and completion certificates"
        backgroundImage="/images/stock/training-hero.jpg"
      />
      <TrainingCoursesSection />
      <TrainingInfoSection />
      <KenexisUnlimitedSection />
      <ContactCTASection />
    </>
  );
}
```

### Course Card Grid with Category Grouping
```typescript
// Source: Pattern from services-grid-section.tsx + training.ts data
"use client";

import { motion, type Variants } from "motion/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trainingCourses, type TrainingCourse } from "@/lib/data/training";

const categoryLabels: Record<string, string> = {
  "process-safety": "Process Safety",
  "software-training": "Software Training",
  "fire-gas": "Fire & Gas",
};

// Group courses by category
const grouped = trainingCourses.reduce<Record<string, TrainingCourse[]>>((acc, course) => {
  const key = course.category;
  if (!acc[key]) acc[key] = [];
  acc[key].push(course);
  return acc;
}, {});
```

### Kenexis Unlimited SaaS-Style Section
```typescript
// Source: Pattern from product-features-section.tsx + product-cta-section.tsx
"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { kenexisUnlimited } from "@/lib/data/training";

export function KenexisUnlimitedSection() {
  return (
    <section className="py-16 sm:py-24 bg-navy-900 text-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <motion.h2 ...>{kenexisUnlimited.name}</motion.h2>
        <motion.p ...>{kenexisUnlimited.description}</motion.p>
        <ul>
          {kenexisUnlimited.includes.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="text-accent" size={20} strokeWidth={2.5} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>{kenexisUnlimited.pricingNote}</p>
        <Button size="lg" className="bg-accent ...">Contact for Quote</Button>
      </div>
    </section>
  );
}
```

### Resource Category Grid
```typescript
// Source: Pattern from services-grid-section.tsx + resources.ts data
import { resourceCategories } from "@/lib/data/resources";
import { Newspaper, Video, Mail, Wrench, BookOpen, PlayCircle, Headphones } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  newspaper: Newspaper,
  video: Video,
  mail: Mail,
  wrench: Wrench,
  "book-open": BookOpen,
  "play-circle": PlayCircle,
  headphones: Headphones,
};
```

### Newsletter Section Reuse on Resources Page
```typescript
// Source: Existing component from src/components/sections/newsletter-section.tsx
// Option A: Reuse as-is (copy says "Stay Informed on Process Safety" -- acceptable)
import { NewsletterSection } from "@/components/sections/newsletter-section";

// Option B: Make props-driven (recommended for resources page context)
// Modify NewsletterSection to accept optional title/description/buttonText props
// with defaults from homeNewsletterCTA
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Separate pages per resource type | Single resource hub with filtered sections | Current project pattern | Simpler navigation, single landing page |
| Custom CSS animations | motion/react stagger animations | Phase 4 established | Consistent reveal pattern across all pages |
| next/link for all navigation | next-view-transitions Link + `<a>` for external | Phase 3 established | CSS View Transitions for internal, proper target="_blank" for external |

**Deprecated/outdated:**
- `framer-motion` package name: Project uses `motion` (the renamed package), import from `motion/react`

## Open Questions

1. **Resources data completeness**
   - What we know: `resources.ts` has `sampleWebinars` (3 items) and `sampleArticles` (2 items) -- these are labeled "sample"
   - What's unclear: Should we expand with full real webinar/paper data (25+ webinars, 12+ papers from kenexis.com), or is sample data sufficient for the pitch demo?
   - Recommendation: Keep sample data for MVP speed. The existing data demonstrates the pattern. If richer content is desired, a separate data expansion task can add more items. The component design should support any number of items.

2. **Resources page hero image**
   - What we know: No `resources-hero.jpg` exists in stock images. `training-hero.jpg` exists.
   - What's unclear: Whether a dedicated resources hero image is needed or an existing image suffices
   - Recommendation: Reuse `hero-control-room.jpg` or `bg-industrial-1.jpg` for the resources hero. Both are on-brand industrial imagery. Download a new one only if visual quality demands it.

3. **Podcast episode listings**
   - What we know: 45+ episodes on Spotify. Current data has only the Spotify show link.
   - What's unclear: Should we list individual episodes or just link to the Spotify show page?
   - Recommendation: Show podcast description, show link, and perhaps 3-5 recent episode titles as static text. Fetching live from Spotify API is out of scope (static demo site). If episode titles are needed, add them to `resources.ts` as static data.

4. **Training course detail pages**
   - What we know: Requirement TRAIN-01 says "links to details/registration" -- courses link to KISS platform for actual registration
   - What's unclear: Do individual courses need their own detail pages, or is the catalog listing sufficient?
   - Recommendation: No individual course pages. The catalog listing with "Register on KISS" external link per course is sufficient for the demo. Individual course pages would add complexity without pitch value.

## Sources

### Primary (HIGH confidence)
- Existing codebase (`src/lib/data/training.ts`) -- 15 courses, Kenexis Unlimited, training info, SEO data
- Existing codebase (`src/lib/data/resources.ts`) -- 7 resource categories, sample content, external links, SEO data
- Existing codebase (`src/components/sections/`) -- 19 section components establishing all design patterns
- Existing codebase (`package.json`) -- exact dependency versions

### Secondary (MEDIUM confidence)
- kenexis.com/training/ -- verified training page structure (customized training + ISA courses)
- kenexis.com/process-safety-training-center/ -- verified pricing ($600-$900/yr), on-demand format, KISS integration
- kenexis.com/resources/ -- verified 7 resource categories matching data layer
- kenexis.com/recorded/ -- verified 25+ recorded webinars with titles
- kenexis.com/papers/ -- verified papers organized into white papers, conference papers, articles, handbooks
- open.spotify.com -- verified podcast has 45+ episodes, hosted by Ed Marszal

### Tertiary (LOW confidence)
- None -- all findings verified against existing codebase or official kenexis.com content

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all libraries already installed, no new dependencies beyond 2 shadcn components
- Architecture: HIGH - follows exact patterns established in Phases 4-7, all proven
- Pitfalls: HIGH - identified from direct examination of existing codebase and component interfaces

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (stable -- no external dependency changes expected)
