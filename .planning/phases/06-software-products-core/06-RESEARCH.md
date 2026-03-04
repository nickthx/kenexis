# Phase 6: Software Products - Core - Research

**Researched:** 2026-03-03
**Domain:** SaaS-style product pages, interactive ecosystem visualization, Next.js App Router dynamic routes
**Confidence:** HIGH

## Summary

Phase 6 builds the software landing page, product ecosystem visualization, and two flagship product detail pages (Open-PHA and Vertigo) using the established pattern from Phase 5 (services pages). The data layer is already complete in `src/lib/data/software.ts` with all 7 products fully typed, including the `KISSOverview` object with login/store URLs, `SoftwareProduct` interfaces with pricing tiers, features, integrations, and SEO metadata. The navigation already links to `/software` and all 7 product slugs.

The core technical challenge is the interactive product ecosystem visualization (SOFT-02) -- showing how 7 products interrelate within the KISS platform. The data already includes `integrations` arrays on each product. The rest follows the established pattern: hero section, content sections with motion animations, and stagger-reveal grids using shadcn/ui Card components and Lucide icons via the existing `getNavIcon()` utility.

**Primary recommendation:** Follow the services pages pattern exactly for page structure and routing. Use the magicui `AnimatedBeam` component (already compatible -- uses `motion/react`) for the ecosystem visualization connecting product nodes with animated data-flow beams. Install shadcn/ui Badge component for product tags/labels on landing page cards.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SOFT-01 | Software landing page with KISS platform overview and 7-product grid with icons, names, descriptions, CTAs | Data layer complete (`kissOverview`, `softwareProducts` array). Follow `ServicesGridSection` pattern with 7 cards. Icons already mapped in `navigation-utils.ts`. |
| SOFT-02 | Interactive product ecosystem visualization showing product interrelations | Each `SoftwareProduct` has `integrations: string[]` field. Use magicui `AnimatedBeam` pattern from local design-repos with KISS hub in center and product nodes around it. |
| SOFT-03 | Open-PHA product page with SaaS-style hero, feature grid, benefits, CTA to KISS | Full product data in `softwareProducts[0]` including features, pricing, integrations. Create reusable `ProductHeroSection`, `ProductFeaturesGrid`, `ProductBenefitsSection`, `ProductCTASection`. |
| SOFT-04 | Vertigo product page with same SaaS-style structure | Same reusable components as SOFT-03. Data in `softwareProducts[1]`. Dynamic `[slug]` route like services pattern. |
| SOFT-11 | Clear CTAs linking to kiss.kenexis.com (login) and store.kenexis.com (purchase) opening in new tabs | URLs already in `kissOverview.loginUrl` and `kissOverview.storeUrl`. Use `target="_blank" rel="noopener noreferrer"` on all external CTA buttons. |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | App Router, dynamic routes, `generateStaticParams` | Already used in Phase 5 for services `[slug]` |
| React | 19.2.3 | Component rendering | Project baseline |
| motion | 12.34.5 | Scroll animations, stagger reveals, beam animations | Used throughout project via `motion/react` |
| lucide-react | 0.576.0 | Product icons (ClipboardCheck, Gauge, etc.) | All 7 product icons already mapped in `navigation-utils.ts` |
| shadcn/ui | (radix-ui 1.4.3) | Card, Button components | Used in all existing grid sections |
| next-view-transitions | 0.3.5 | Page transitions, Link component | All internal Links use this |

### New Components Needed
| Component | Source | Purpose | When to Use |
|-----------|--------|---------|-------------|
| Badge (shadcn/ui) | `npx shadcn@latest add badge` | Product labels (e.g., "Free Desktop", "Cloud") on pricing tiers | Product cards and detail pages |
| AnimatedBeam | Copy from `~/design-repos/magicui` | Animated SVG beams connecting product nodes | Ecosystem visualization (SOFT-02) |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| AnimatedBeam for ecosystem | OrbitingCircles from magicui | Orbiting circles are impressive but harder to show specific product-to-product connections. AnimatedBeam shows explicit data-flow paths between named products -- more informative for an enterprise audience. |
| AnimatedBeam for ecosystem | Pure CSS/SVG lines | No animation, less visual impact. The animated gradient beams convey "data flow" which aligns with the platform integration story. |
| AnimatedBeam for ecosystem | React Flow library | Overkill for a static marketing visualization. Adds a heavy dependency. Hand-crafted SVG with AnimatedBeam is lightweight and on-brand. |

**Installation:**
```bash
npx shadcn@latest add badge
# AnimatedBeam: copy from ~/design-repos/magicui/apps/www/registry/magicui/animated-beam.tsx to src/components/ui/animated-beam.tsx
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/(marketing)/software/
│   ├── page.tsx                    # Software landing page (SOFT-01, SOFT-02, SOFT-11)
│   └── [slug]/
│       └── page.tsx                # Product detail pages (SOFT-03, SOFT-04)
├── components/sections/
│   ├── software-hero-section.tsx   # Landing page hero with KISS overview
│   ├── product-grid-section.tsx    # 7-product card grid
│   ├── product-ecosystem-section.tsx  # Interactive visualization (AnimatedBeam)
│   ├── product-hero-section.tsx    # SaaS-style product detail hero
│   ├── product-features-section.tsx   # Feature grid for individual products
│   ├── product-integrations-section.tsx # Integration connections
│   └── product-cta-section.tsx     # KISS login + Store CTAs
└── components/ui/
    ├── animated-beam.tsx           # Copied from magicui design repo
    └── badge.tsx                   # Installed via shadcn CLI
```

### Pattern 1: Dynamic Product Routes (Mirror Services Pattern)
**What:** Use `generateStaticParams` + `params: Promise<{ slug: string }>` for product detail pages, exactly as done in services.
**When to use:** All product detail pages.
**Example:**
```typescript
// Source: src/app/(marketing)/services/[slug]/page.tsx (existing pattern)
import { softwareProducts, getProductBySlug } from "@/lib/data/software";

export function generateStaticParams() {
  return softwareProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.seo.title,
    description: product.seo.description,
    openGraph: {
      title: product.seo.title,
      description: product.seo.description,
      images: product.seo.ogImage ? [product.seo.ogImage] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  // ... render sections
}
```

### Pattern 2: Reusable SaaS Product Section Components
**What:** Each product detail page section is a separate component receiving typed props, matching the service detail sections pattern.
**When to use:** Product hero, features grid, integrations, CTAs.
**Example:**
```typescript
// Product hero with SaaS-style layout (tagline + description + CTA)
interface ProductHeroSectionProps {
  product: SoftwareProduct;
}

export function ProductHeroSection({ product }: ProductHeroSectionProps) {
  return (
    <section className="relative min-h-[300px] lg:h-[400px] ...">
      {/* Background image, gradient overlay, product name + trademark + tagline */}
      {/* Dual CTA: "Try on KISS Platform" + "Visit Kenexis Store" */}
    </section>
  );
}
```

### Pattern 3: AnimatedBeam Ecosystem Visualization
**What:** Central KISS platform node with 7 product nodes positioned around it, connected by animated gradient beams.
**When to use:** Software landing page ecosystem section (SOFT-02).
**Example:**
```typescript
// Source: ~/design-repos/magicui animated-beam pattern
// Each product gets a ref, KISS center gets a ref, container gets a ref
const containerRef = useRef<HTMLDivElement>(null);
const kissRef = useRef<HTMLDivElement>(null);
const openPhaRef = useRef<HTMLDivElement>(null);
// ... refs for all 7 products

// Position nodes using CSS grid or absolute positioning
// AnimatedBeam connects each product to KISS center
<AnimatedBeam
  containerRef={containerRef}
  fromRef={openPhaRef}
  toRef={kissRef}
  gradientStartColor="#e87722"  // brand orange
  gradientStopColor="#0a1628"   // brand navy
/>
```

### Pattern 4: External Link CTAs with New Tab
**What:** KISS login and Store CTAs must open in new tabs.
**When to use:** All software pages wherever external links appear (SOFT-11).
**Example:**
```typescript
// External link button pattern
<Button
  size="lg"
  className="bg-accent text-accent-foreground hover:bg-orange-600"
  asChild
>
  <a
    href={kissOverview.loginUrl}
    target="_blank"
    rel="noopener noreferrer"
  >
    Login to KISS Platform
  </a>
</Button>
```

### Pattern 5: Alternating Section Backgrounds
**What:** Use alternating light/dark sections for visual rhythm, consistent with homepage and services.
**When to use:** All page layouts.
**Structure:**
```
Hero (dark navy gradient over image)
KISS Overview (bg-background -- light)
Product Grid (bg-muted/50 -- subtle gray)
Ecosystem Visualization (bg-navy-900 -- dark)
CTA Section (bg-background or bg-navy-900)
```

### Anti-Patterns to Avoid
- **Nested anchor tags:** Never put `<Link>` inside `<Button asChild>` for external URLs. Use `<a>` directly with `asChild` for external links, `<Link>` only for internal routes.
- **Missing `await params`:** Next.js 16 requires `params: Promise<{ slug: string }>` -- always await. The services pages already demonstrate this pattern correctly.
- **Hard-coded external URLs:** Always reference `kissOverview.loginUrl` and `kissOverview.storeUrl` from the data layer, never hard-code strings in components.
- **Inconsistent icon loading:** Always use `getNavIcon()` from `navigation-utils.ts` with the icon string from product data. Never import Lucide icons directly in product components.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Animated connecting lines between nodes | Custom SVG path calculations | AnimatedBeam from magicui design repo | ResizeObserver handling, gradient animation, SVG path math all solved. Uses motion/react (already installed). |
| Product icon resolution | Local icon map per component | `getNavIcon()` from `navigation-utils.ts` | Already maps all 7 product icon strings to Lucide components. Single source of truth. |
| Pricing tier badges | Custom styled spans | shadcn/ui Badge component | Consistent styling, variant support, accessible. |
| Scroll animations | Custom IntersectionObserver | motion `whileInView` + `Variants` | Pattern established across all existing sections. Consistent timing and easing. |
| Static page generation | Manual route definitions | `generateStaticParams()` from `softwareProducts` array | Automatic, type-safe, mirrors services pattern exactly. |

**Key insight:** The entire service pages pattern (hero, grid, detail page with sections, related items) is directly reusable. The only genuinely new component is the ecosystem visualization -- everything else is established patterns with different data.

## Common Pitfalls

### Pitfall 1: AnimatedBeam SSR Incompatibility
**What goes wrong:** AnimatedBeam uses `useRef`, `useEffect`, `getBoundingClientRect()`, and `ResizeObserver` -- all client-only APIs. Rendering on the server will fail.
**Why it happens:** Next.js App Router defaults to server components.
**How to avoid:** Mark the ecosystem visualization component with `"use client"` directive. The AnimatedBeam component itself already has `"use client"`.
**Warning signs:** Hydration mismatch errors, "window is not defined", blank visualization on initial load.

### Pitfall 2: AnimatedBeam Container Sizing
**What goes wrong:** Beams don't render or render at wrong positions because the container has zero height or width.
**Why it happens:** The container ref needs explicit dimensions. If the container is flex/grid without a set height, the SVG overlay has nothing to measure against.
**How to avoid:** Give the ecosystem container a fixed `min-h-[400px]` or similar. Use `relative` positioning on the container so `absolute` SVG overlay positions correctly.
**Warning signs:** Beams rendering at (0,0), beams not visible, beams jumping on resize.

### Pitfall 3: Product Slug Mismatch Between Navigation and Routes
**What goes wrong:** Clicking a mega menu link goes to `/software/open-pha` but the page doesn't render because the slug doesn't match.
**Why it happens:** Navigation data uses `href: "/software/open-pha"` and product data uses `slug: "open-pha"` -- these MUST match.
**How to avoid:** The data is already consistent (verified: navigation.ts hrefs match software.ts slugs). Don't create new slug mappings.
**Warning signs:** 404 pages when clicking mega menu software links.

### Pitfall 4: External Links Not Opening in New Tabs
**What goes wrong:** KISS login and store links navigate away from the demo site.
**Why it happens:** Using Next.js `<Link>` instead of `<a>` for external URLs, or forgetting `target="_blank"`.
**How to avoid:** All external URLs (kiss.kenexis.com, store.kenexis.com) MUST use `<a target="_blank" rel="noopener noreferrer">`. Never use next-view-transitions `Link` for external URLs.
**Warning signs:** Clicking CTA navigates away from the site instead of opening a new tab.

### Pitfall 5: Too Many Products in One Grid Without Visual Hierarchy
**What goes wrong:** A flat grid of 7 identical cards makes no product stand out. Users can't tell which products are most important.
**Why it happens:** Treating all 7 products equally in the layout.
**How to avoid:** Consider making Open-PHA and Vertigo (the two flagship products getting dedicated pages in this phase) visually prominent -- larger cards, featured styling, or a "Popular" badge. The remaining 5 can be standard size.
**Warning signs:** The grid looks like a wall of cards with no entry point.

### Pitfall 6: Trademark Symbols Missing or Inconsistent
**What goes wrong:** Product names displayed without their proper trademark symbols.
**Why it happens:** Using `product.name` alone without `product.trademark`.
**How to avoid:** Always render `{product.name}{product.trademark}` together. The data layer has `trademark: "\u00AE"` (registered) or `trademark: "\u2122"` (trademark) for each product.
**Warning signs:** "Open-PHA" displayed without the (R) symbol.

## Code Examples

Verified patterns from the existing codebase:

### Software Landing Page (follows services landing pattern)
```typescript
// Source: src/app/(marketing)/services/page.tsx (to replicate)
import type { Metadata } from "next";
import { SoftwareHeroSection } from "@/components/sections/software-hero-section";
import { ProductGridSection } from "@/components/sections/product-grid-section";
import { ProductEcosystemSection } from "@/components/sections/product-ecosystem-section";
import { ProductCTASection } from "@/components/sections/product-cta-section";
import { softwareProducts, kissOverview, softwareSEO } from "@/lib/data/software";

export const metadata: Metadata = {
  title: softwareSEO.title,
  description: softwareSEO.description,
  openGraph: {
    title: softwareSEO.title,
    description: softwareSEO.description,
    images: softwareSEO.ogImage ? [softwareSEO.ogImage] : undefined,
  },
};

export default function SoftwarePage() {
  return (
    <>
      <SoftwareHeroSection overview={kissOverview} />
      <ProductGridSection products={softwareProducts} />
      <ProductEcosystemSection products={softwareProducts} />
      <ProductCTASection overview={kissOverview} />
    </>
  );
}
```

### Product Grid Card with Badge
```typescript
// Product card with pricing badge and trademark
import { Badge } from "@/components/ui/badge";

{products.map((product) => {
  const Icon = getNavIcon(product.icon);
  const hasFree = product.pricing.some(t => t.type === "free");
  return (
    <motion.div key={product.id} variants={itemVariants}>
      <Card className="h-full">
        <CardHeader>
          {Icon && <Icon className="text-accent mb-2" size={40} strokeWidth={1.5} />}
          <CardTitle className="text-xl">
            {product.name}<sup className="text-xs">{product.trademark}</sup>
          </CardTitle>
          {hasFree && <Badge variant="secondary">Free Desktop Version</Badge>}
          <CardDescription className="text-base">
            {product.tagline}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link href={`/software/${product.slug}`}>Explore</Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
})}
```

### Ecosystem Visualization with AnimatedBeam
```typescript
"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { getNavIcon } from "@/lib/navigation-utils";
import type { SoftwareProduct } from "@/lib/data/software";

interface ProductEcosystemSectionProps {
  products: SoftwareProduct[];
}

export function ProductEcosystemSection({ products }: ProductEcosystemSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <section className="py-16 sm:py-24 bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">
          The KISS Ecosystem
        </h2>
        <p className="text-lg text-navy-200 mb-12 text-center max-w-2xl mx-auto">
          Seven integrated modules working together on a single platform
        </p>

        <div
          ref={containerRef}
          className="relative min-h-[400px] mx-auto max-w-4xl"
        >
          {/* Center KISS node */}
          <div
            ref={centerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-20 h-20 rounded-full bg-accent flex items-center justify-center
                       text-white font-bold text-sm shadow-lg z-10"
          >
            KISS
          </div>

          {/* Product nodes positioned around center */}
          {/* AnimatedBeams connecting each product to center */}
        </div>
      </div>
    </section>
  );
}
```

### External CTA Button Pattern
```typescript
// Source: Pattern from existing services + external link requirements
import { Button } from "@/components/ui/button";
import { kissOverview } from "@/lib/data/software";
import { ExternalLink } from "lucide-react";

<div className="flex flex-wrap gap-4 justify-center">
  <Button
    size="lg"
    className="bg-accent text-accent-foreground hover:bg-orange-600"
    asChild
  >
    <a
      href={kissOverview.loginUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      Login to KISS <ExternalLink className="ml-2 size-4" />
    </a>
  </Button>
  <Button
    size="lg"
    variant="outline"
    className="border-white text-white hover:bg-white/10"
    asChild
  >
    <a
      href={kissOverview.storeUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      Visit Kenexis Store <ExternalLink className="ml-2 size-4" />
    </a>
  </Button>
</div>
```

### SaaS-Style Feature Grid
```typescript
// Feature grid using existing card components + check icons
import { Check } from "lucide-react";

interface ProductFeaturesSectionProps {
  features: string[];
  productName: string;
}

export function ProductFeaturesSection({ features, productName }: ProductFeaturesSectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          {productName} Features
        </h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={itemVariants} className="flex items-start gap-3">
              <Check className="text-accent flex-shrink-0 mt-1" size={20} strokeWidth={2.5} />
              <span className="text-lg text-muted-foreground">{feature}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Flat product listing pages | SaaS-style with hero, feature grid, benefits, CTA | 2024+ | Users expect interactive, benefit-focused layouts for software products |
| Static integration diagrams | Animated beam/connection visualizations | 2024+ | Shows "live platform" feel, conveys data flow between products |
| Single CTA per product | Dual CTA (try free + purchase) | Ongoing | Higher conversion with clear path for different buyer intents |
| Framer Motion package | motion package (same API, `motion/react` import) | 2024 | Already using `motion` -- no change needed |

**Deprecated/outdated:**
- `framer-motion` package: This project correctly uses `motion` (the renamed package) with `motion/react` imports.

## Open Questions

1. **Product Node Layout for Ecosystem Visualization**
   - What we know: 7 products need to connect to a central KISS hub. AnimatedBeam works with refs positioned in a container.
   - What's unclear: Best visual layout for 7 nodes (circular arrangement, hexagonal, or custom grid). Circular is cleanest for an odd number.
   - Recommendation: Use a circular arrangement with KISS in the center. Position 7 product nodes at evenly spaced angles around the center using CSS transforms. This avoids complex grid layouts and scales cleanly.

2. **Phase 7 Reusability**
   - What we know: Phase 7 adds 5 more product pages using the same components.
   - What's unclear: Whether all components from Phase 6 will perfectly serve Phase 7 without modification.
   - Recommendation: Build product detail components as generic as possible (receive `SoftwareProduct` type, not hard-coded to Open-PHA/Vertigo). The `[slug]` route with `generateStaticParams` already covers this -- Phase 7 just adds content, not new routes.

3. **Hero Image for Software Products**
   - What we know: All products currently reference `/images/stock/software-hero.jpg` as their `heroImage`. There is one stock software hero image available.
   - What's unclear: Whether a single shared hero image for all product pages is acceptable or if variety is needed.
   - Recommendation: Use the single `software-hero.jpg` for now. If the visual review (verification plan) flags it, more stock images can be added in a future pass. A single strong image is better than seven mediocre ones.

## Sources

### Primary (HIGH confidence)
- `src/lib/data/software.ts` -- Complete data layer with all 7 products, types, KISS overview, SEO metadata
- `src/lib/data/navigation.ts` -- Navigation already links all 7 product slugs under Software
- `src/lib/navigation-utils.ts` -- Icon mapping for all 7 product icon strings
- `src/app/(marketing)/services/[slug]/page.tsx` -- Next.js 16 dynamic route pattern with params-as-Promise
- `src/components/sections/service-detail-sections.tsx` -- Section component patterns (description, methodology, deliverables)
- `~/design-repos/magicui/apps/www/registry/magicui/animated-beam.tsx` -- AnimatedBeam component source (uses motion/react, compatible)
- `package.json` -- Verified all dependencies (motion 12.34.5, next 16.1.6, radix-ui 1.4.3, lucide-react 0.576.0)
- `src/app/globals.css` -- Navy/orange color system, CSS custom properties

### Secondary (MEDIUM confidence)
- [SaaS Landing Page Trends 2026](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples) -- Feature grid, benefits section, CTA patterns
- [Bento Grid Design Guide](https://landdding.com/blog/blog-bento-grid-design-guide) -- Layout patterns for multi-product displays
- [SaaS Website Design Best Practices](https://www.stan.vision/journal/saas-website-design) -- Conversion-focused design patterns

### Tertiary (LOW confidence)
- None -- all findings verified against codebase or design repos

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- All libraries already installed and proven across 5 phases. Only Badge needs adding.
- Architecture: HIGH -- Services pages provide exact template. Dynamic `[slug]` routing pattern verified working.
- Pitfalls: HIGH -- Based on actual codebase patterns and Next.js 16 behavior observed in Phase 5.
- Ecosystem visualization: MEDIUM -- AnimatedBeam is from local design repo and uses motion/react (compatible), but exact layout of 7 nodes around a center needs implementation-time tuning.

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (stable stack, no fast-moving dependencies)
