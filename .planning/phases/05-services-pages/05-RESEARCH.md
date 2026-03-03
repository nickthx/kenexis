# Phase 5: Services Pages - Research

**Researched:** 2026-03-03
**Domain:** Next.js App Router dynamic routes, services landing page grid, service detail page layout
**Confidence:** HIGH

## Summary

Phase 5 builds the services section of the Kenexis website: a landing page with a grid of all four service areas (PHA, QRA, Fire & Gas Mapping, SIS), plus four individual detail pages. The data layer is already complete -- `src/lib/data/services.ts` contains fully typed `ServiceArea[]` with all content including `id`, `slug`, `name`, `shortDescription`, `fullDescription`, `methodology`, `subServices`, `deliverables`, `relatedServiceIds`, `heroImage`, `icon`, and `seo` metadata. Navigation data already maps correct routes (`/services/pha`, `/services/qra`, `/services/fire-gas-mapping`, `/services/sis`).

The implementation uses Next.js 16 App Router with dynamic `[slug]` routes and `generateStaticParams` to pre-render all four service pages at build time. The visual language is fully established from Phase 4: dark hero sections with gradient overlays, `motion/react` scroll animations with `whileInView`, alternating dark/light section backgrounds (navy-900 vs background/muted), shadcn/ui Card components, and orange accent buttons with `asChild` Link patterns. No new libraries are needed -- everything required is already installed.

**Primary recommendation:** Create `src/app/(marketing)/services/page.tsx` for the landing page and `src/app/(marketing)/services/[slug]/page.tsx` for detail pages, reusing established component patterns from Phase 4 sections. All content comes from the existing `services.ts` data file with no modifications needed.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SERV-01 | Services landing page with overview grid of all service areas (PHA, QRA, Fire & Gas Mapping, SIS) | Data: `serviceAreas` array in `services.ts` with 4 entries. Pattern: shadcn Card grid (see Pillars section). Route: `src/app/(marketing)/services/page.tsx`. SEO: `servicesSEO` already exported. |
| SERV-02 | Dedicated PHA/HAZOP/LOPA service detail page with problem statement, methodology, deliverables, and related services | Data: `serviceAreas[0]` (id: "pha") has `fullDescription`, `methodology[]`, `subServices[]`, `deliverables[]`, `relatedServiceIds[]`. Route: `src/app/(marketing)/services/[slug]/page.tsx` with `generateStaticParams`. |
| SERV-03 | Dedicated QRA service detail page with same structure | Data: `serviceAreas[1]` (id: "qra") -- same interface, same component. Slug-based routing handles this automatically. |
| SERV-04 | Dedicated Fire & Gas Mapping service detail page with same structure | Data: `serviceAreas[2]` (id: "fire-gas-mapping") -- same interface, same component. |
| SERV-05 | Dedicated SIS Design service detail page with same structure | Data: `serviceAreas[3]` (id: "sis") -- same interface, same component. |
| SERV-06 | Related services cross-links at the bottom of each service detail page | Data: `relatedServiceIds` on each `ServiceArea` maps to other services. Use `serviceAreas.filter()` to resolve related services and render as linked Cards. |
</phase_requirements>

## Standard Stack

### Core (Already Installed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router, `generateStaticParams`, `generateMetadata`, dynamic `[slug]` routes | Project framework, already scaffolded |
| React | 19.2.3 | Component rendering | Already installed |
| motion | 12.34.5 | Scroll animations (`whileInView`, stagger variants) | Established pattern from Phase 4 sections |
| lucide-react | 0.576.0 | Service icons (Shield, BarChart3, Flame, Cpu) | Icon map already exists in `navigation-utils.ts` |
| shadcn/ui | 3.8.5 (CLI) | Card, Button, Breadcrumb components | All needed components already installed |
| next-view-transitions | 0.3.5 | `Link` component for page transitions | Established pattern -- all internal links use this |

### Supporting (Already Available)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/image | (built-in) | Hero background images with optimization | Service hero sections |
| tailwind-merge / clsx | installed | Conditional class merging | Component styling |

### Alternatives Considered

None -- the stack is fully locked from Phase 1. No new installations needed for this phase.

**Installation:**
```bash
# No installation needed -- all dependencies are present
```

## Architecture Patterns

### Recommended Project Structure

```
src/app/(marketing)/services/
├── page.tsx                    # Services landing page (SERV-01)
└── [slug]/
    ├── page.tsx                # Service detail page (SERV-02 through SERV-05, SERV-06)
    └── not-found.tsx           # 404 for invalid slugs (optional safety net)
src/components/sections/
├── services-hero-section.tsx   # Reusable dark hero for services pages
├── services-grid-section.tsx   # Landing page grid of 4 service cards
└── related-services-section.tsx # Cross-links at bottom of detail pages (SERV-06)
```

### Pattern 1: Dynamic Route with generateStaticParams (Next.js 16)

**What:** Pre-render all four service detail pages at build time using `[slug]` dynamic segments.
**When to use:** For the four service detail pages.
**Critical Next.js 16 detail:** `params` is a Promise that must be awaited.

```typescript
// src/app/(marketing)/services/[slug]/page.tsx
// Source: Context7 /vercel/next.js/v16.1.6

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { serviceAreas, getServiceBySlug } from "@/lib/data/services";

// Pre-render all 4 service slugs at build time
export function generateStaticParams() {
  return serviceAreas.map((service) => ({
    slug: service.slug,
  }));
}

// Dynamic metadata per service
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.seo.title,
    description: service.seo.description,
    openGraph: {
      title: service.seo.title,
      description: service.seo.description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const relatedServices = serviceAreas.filter((s) =>
    service.relatedServiceIds.includes(s.id)
  );

  return (
    <>
      {/* Hero Section */}
      {/* Problem Statement / Full Description */}
      {/* Methodology Section */}
      {/* Sub-Services Section */}
      {/* Deliverables Section */}
      {/* Related Services (SERV-06) */}
    </>
  );
}
```

### Pattern 2: Section Component with Motion Animations (Established)

**What:** Each page section as a separate client component with `whileInView` scroll-triggered animations.
**When to use:** For all visual sections on services pages.

```typescript
// Established pattern from Phase 4 (hero-section.tsx, pillars-section.tsx, etc.)
"use client";

import { motion, type Variants } from "motion/react";

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

// Use: whileInView="visible" viewport={{ once: true, margin: "-100px" }}
```

### Pattern 3: Data-Driven Card Grid (Established)

**What:** Map over data array to render Card grids with icons, descriptions, and CTA links.
**When to use:** Services landing page grid, related services section.

```typescript
// Adapted from pillars-section.tsx pattern
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import { getNavIcon } from "@/lib/navigation-utils";

// For each service:
const Icon = getNavIcon(service.icon); // Already maps "shield" -> Shield, etc.
// Render Card with Icon, name, shortDescription, and Link to /services/{slug}
```

### Pattern 4: Dark Hero Section with Background Image

**What:** Full-width dark hero with stock photo, gradient overlay, and white text.
**When to use:** Top of services landing page and each service detail page.

```typescript
// Established pattern from hero-section.tsx
// Key classes: "relative min-h-[400px] flex items-center overflow-hidden"
// Background: next/image with fill + "object-cover"
// Overlay: "absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900/80"
// Content: "relative z-10 text-white text-center"
// Note: services pages DON'T need -mt-16 (only homepage extends behind header)
```

### Pattern 5: Alternating Section Backgrounds

**What:** Alternate between dark (navy-900) and light (background/muted-50) section backgrounds.
**When to use:** Service detail pages with multiple sections.

```
Hero:         bg-navy-900 (dark, with image)
Description:  bg-background (white)
Methodology:  bg-muted/50 (light gray)
Sub-Services: bg-background (white)
Deliverables: bg-navy-900 (dark)
Related:      bg-muted/50 (light gray)
```

### Anti-Patterns to Avoid

- **Client components for static content:** The services landing page and detail pages should be Server Components by default. Only wrap sections needing `motion` animations in `"use client"`. The page.tsx files themselves should be async Server Components for `generateStaticParams`/`generateMetadata`.
- **Hardcoding service data in components:** All content is in `services.ts` -- components should accept data as props.
- **Using `useParams` for slug access:** Next.js 16 passes `params` as a prop (Promise) to page components. Do NOT use `useParams()` hook in Server Components.
- **Nested `<a>` tags:** Use `Button asChild` with `Link` (from next-view-transitions), not nested anchors. This is an established project convention.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Service icon mapping | Custom icon lookup | `getNavIcon()` from `navigation-utils.ts` | Already maps all service icons (shield, chart-bar, flame, cpu) to Lucide components |
| Breadcrumb labels | Custom label generation | `buildBreadcrumbMap()` from `navigation-utils.ts` | Breadcrumbs component already reads from `mainNavigation` data which includes all service routes |
| Page transitions | Custom animation wrappers | `next-view-transitions` `Link` component | Already integrated project-wide in Phase 3 |
| Scroll animations | Custom intersection observer | `motion/react` `whileInView` | Pattern established in all Phase 4 sections |
| Card components | Custom card markup | shadcn `Card`/`CardHeader`/`CardTitle`/`CardDescription`/`CardContent` | Already installed and used throughout |

**Key insight:** Phase 4 established every reusable pattern needed. Phase 5 is primarily about assembling existing patterns with new route structures and the existing services data.

## Common Pitfalls

### Pitfall 1: Forgetting to Await `params` in Next.js 16
**What goes wrong:** TypeScript error or runtime crash because `params` is a Promise in Next.js 16, not a plain object.
**Why it happens:** Next.js 15 used synchronous params; Next.js 16 changed to async.
**How to avoid:** Always `const { slug } = await params;` in both page components and `generateMetadata`.
**Warning signs:** TypeScript complaining about `params.slug` not existing on type `Promise`.

### Pitfall 2: Services Landing Page Not Showing Grid on Mobile
**What goes wrong:** Four cards stacking vertically looks like a long list instead of a scannable overview.
**Why it happens:** Only using `grid-cols-1 md:grid-cols-2` without considering the 4-card layout.
**How to avoid:** Use `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2` (2x2 grid at medium+). With exactly 4 services, a 2x2 grid works best at all breakpoints above mobile.
**Warning signs:** Cards looking cramped or too spaced on tablet views.

### Pitfall 3: Missing `notFound()` for Invalid Slugs
**What goes wrong:** Application crashes or shows empty page for `/services/invalid-slug`.
**Why it happens:** `getServiceBySlug()` returns `undefined` for non-existent slugs.
**How to avoid:** Always check `if (!service) notFound();` before rendering.
**Warning signs:** Blank pages or unhandled errors in production.

### Pitfall 4: Hero Section Pushing Content Below Fold
**What goes wrong:** Service detail pages have huge hero that requires scrolling to see any content.
**Why it happens:** Copying homepage hero dimensions (min-h-[500px] lg:h-[650px]) for interior pages.
**How to avoid:** Interior page heroes should be shorter: `min-h-[300px] lg:h-[400px]` -- enough for title and subtitle without dominating the page.
**Warning signs:** Users having to scroll to see what the page is about.

### Pitfall 5: Related Services Linking Back to Current Page
**What goes wrong:** "Related Services" section includes a link to the current service page.
**Why it happens:** Not filtering out the current service from the related list.
**How to avoid:** `relatedServiceIds` in the data already excludes self, but verify by filtering: `serviceAreas.filter(s => service.relatedServiceIds.includes(s.id) && s.id !== service.id)`.
**Warning signs:** User clicking a "related" link and landing on the same page.

## Code Examples

### Services Landing Page Structure
```typescript
// src/app/(marketing)/services/page.tsx
import type { Metadata } from "next";
import { servicesSEO, serviceAreas } from "@/lib/data/services";
import { ServicesHeroSection } from "@/components/sections/services-hero-section";
import { ServicesGridSection } from "@/components/sections/services-grid-section";
import { ContactCTASection } from "@/components/sections/contact-cta-section";

export const metadata: Metadata = {
  title: servicesSEO.title,
  description: servicesSEO.description,
  openGraph: {
    title: servicesSEO.title,
    description: servicesSEO.description,
    images: servicesSEO.ogImage ? [servicesSEO.ogImage] : undefined,
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServicesGridSection services={serviceAreas} />
      <ContactCTASection /> {/* Reuse from Phase 4 */}
    </>
  );
}
```

### Service Detail Page Section Layout
```typescript
// Sections for service detail pages:
// 1. Hero (dark, shorter than homepage)
// 2. Problem Statement / Full Description (white bg)
// 3. Methodology list (muted bg)
// 4. Sub-Services cards (white bg)
// 5. Deliverables (dark bg)
// 6. Related Services cross-links (muted bg) -- SERV-06
```

### Related Services Component Pattern
```typescript
// src/components/sections/related-services-section.tsx
"use client";

import { Link } from "next-view-transitions";
import { motion, type Variants } from "motion/react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getNavIcon } from "@/lib/navigation-utils";
import type { ServiceArea } from "@/lib/data/services";

interface RelatedServicesSectionProps {
  services: ServiceArea[];
}

export function RelatedServicesSection({ services }: RelatedServicesSectionProps) {
  if (services.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Related Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {services.map((service) => {
            const Icon = getNavIcon(service.icon);
            return (
              <Card key={service.id} className="h-full">
                <CardHeader>
                  {Icon && <Icon className="text-accent mb-2" size={36} strokeWidth={1.5} />}
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <CardDescription>{service.shortDescription}</CardDescription>
                </CardHeader>
                {/* CardContent with Button Link */}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `params: { slug: string }` (sync) | `params: Promise<{ slug: string }>` (async) | Next.js 16 | Must await params in page components and generateMetadata |
| `getStaticPaths` (Pages Router) | `generateStaticParams` (App Router) | Next.js 13+ | Simpler API, no `fallback` config needed |
| Framer Motion package | `motion/react` package | motion v11+ | Import from "motion/react" not "framer-motion" |

**Deprecated/outdated:**
- `framer-motion` import path: Use `motion/react` (project already does this correctly)
- Synchronous `params`: Next.js 16 requires awaiting params -- do not use old pattern

## Open Questions

1. **Service hero images per service vs shared image**
   - What we know: All four services currently point to the same `heroImage: "/images/stock/services-hero.jpg"`. The file exists at `public/images/stock/services-hero.jpg`.
   - What's unclear: Whether individual hero images per service would look better.
   - Recommendation: Start with the shared image for consistency. If the planner wants variety, the data structure already supports per-service images that can be swapped in later.

2. **Contact CTA reuse vs services-specific CTA**
   - What we know: `ContactCTASection` from Phase 4 is a reusable component with a generic "Ready to discuss your safety challenges?" message.
   - What's unclear: Whether service pages should have a service-specific CTA (e.g., "Ready to discuss your PHA needs?").
   - Recommendation: Reuse the generic `ContactCTASection` on the services landing page. On detail pages, consider a light parameterization of the CTA message, but the generic version works well as-is.

## Sources

### Primary (HIGH confidence)
- Context7 `/vercel/next.js/v16.1.6` - `generateStaticParams`, `generateMetadata` with async params, `notFound()` function
- Project codebase analysis - `src/lib/data/services.ts` (complete data layer), `src/components/sections/*.tsx` (established component patterns), `src/lib/navigation-utils.ts` (icon mapping, breadcrumb map)

### Secondary (MEDIUM confidence)
- WebFetch `kenexis.com/services/` - Confirmed page structure: 4 service areas with narrative descriptions and bullet-point methodologies
- WebFetch `kenexis.com/services/pha/` - Confirmed detail page structure: overview, sub-service breakdowns, contact CTA
- WebFetch `kenexis.com/services/sis/` - Confirmed detail page structure matches PHA pattern
- Design reference repos (`shadcn-ui-landing-page/Services.tsx`, `launch-ui/sections/items`) - Card grid patterns for services

### Tertiary (LOW confidence)
- None -- all findings verified with primary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and proven in Phases 1-4
- Architecture: HIGH - Dynamic routes with `generateStaticParams` is well-documented Next.js 16 pattern, verified with Context7
- Pitfalls: HIGH - Async params change is the primary gotcha, confirmed in official docs
- Content data: HIGH - `services.ts` data layer is complete with all required fields

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (stable -- no fast-moving dependencies)
