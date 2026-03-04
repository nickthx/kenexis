# Phase 10: Polish, SEO & Deployment - Research

**Researched:** 2026-03-04
**Domain:** Responsive design audit, SEO metadata, image optimization, Vercel deployment
**Confidence:** HIGH

## Summary

Phase 10 is the final polish and deployment phase. The site is fully built with all 24 static pages rendering correctly. The build compiles cleanly (Next.js 16.1.6, Turbopack, ~6.5s build). The foundation for SEO is already partially in place -- most pages have OpenGraph metadata via data layer SEO objects, and all hero images use Next.js `<Image>` with `priority` and `sizes` props. However, several gaps exist that must be addressed.

Key gaps identified: (1) No `metadataBase` set in root layout, causing a build warning and preventing OG images from resolving to absolute URLs -- critical for social sharing. (2) No `sitemap.ts` or `robots.ts` files. (3) Several SEO data objects missing `ogImage` (careers, contact, resources, representatives, all individual service/product pages). (4) No `title.template` pattern -- each page manages its own full title string. (5) The product ecosystem visualization uses absolute percentage positioning that may not render well on narrow viewports (320px). (6) Total image payload is ~12MB (7.3MB team photos, 4.4MB stock) with team PNGs up to 1.7MB each -- Next.js Image component handles WebP conversion at serve time, but `sizes` props need review. (7) No Vercel project linked yet.

**Primary recommendation:** Three-plan approach: (1) SEO metadata layer (metadataBase, title template, missing OG images, sitemap, robots), (2) responsive audit and image optimization (viewport testing, sizes props, ecosystem section mobile fix), (3) Vercel deployment and external link verification.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TECH-01 | Site is fully responsive and mobile-first, working correctly from 320px to 1440px+ viewports | Responsive audit section, ecosystem section mobile concern, grid patterns already using sm/md/lg breakpoints |
| TECH-02 | All pages load under 3 seconds with optimized images (WebP, lazy loading) and minimal JS bundle | Image optimization section, Next.js Image auto-WebP, sizes prop audit, priority prop usage |
| TECH-03 | All pages have proper SEO metadata (title, description, Open Graph) so Vercel URL previews correctly when shared | SEO metadata section, metadataBase gap, missing ogImage data, title.template pattern |
| TECH-04 | Site is deployed to Vercel with a shareable URL | Vercel deployment section, CLI available (v50.26.1), static export builds cleanly |
| TECH-05 | All external links (KISS login, Kenexis Store, LinkedIn, YouTube, Spotify) open in new tabs and work correctly | External links audit, all use target="_blank" rel="noopener noreferrer" pattern |
</phase_requirements>

## Standard Stack

### Core (already installed -- no new dependencies needed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 16.1.6 | Framework with built-in Image optimization, metadata API, static generation | Already in use |
| next/image | 16.1.6 | Automatic WebP/AVIF conversion, responsive sizing, lazy loading | Built-in, handles TECH-02 |
| Vercel CLI | 50.26.1 | Deployment to Vercel platform | Already installed globally |

### No New Dependencies
This phase requires zero new npm packages. Everything needed is already available:
- `next/image` for image optimization
- Next.js Metadata API for SEO
- Vercel CLI for deployment
- Tailwind responsive utilities for viewport fixes

## Architecture Patterns

### Pattern 1: metadataBase in Root Layout
**What:** Set `metadataBase` in `src/app/layout.tsx` so all relative OG image paths resolve to absolute URLs.
**Why critical:** The build currently warns: "metadataBase property in metadata export is not set for resolving social open graph or twitter images, using http://localhost:3000". This means OG images will not work when shared on LinkedIn/Slack.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadatabase
export const metadata: Metadata = {
  metadataBase: new URL("https://kenexis-website.vercel.app"), // Updated after deployment
  title: {
    default: "Kenexis Consulting Corporation",
    template: "%s | Kenexis",
  },
  description: "Globally recognized process safety consultancy...",
  openGraph: {
    siteName: "Kenexis Consulting Corporation",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/stock/hero-refinery.jpg", width: 1200, height: 630, alt: "Kenexis Consulting Corporation" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};
```

### Pattern 2: title.template for Consistent Page Titles
**What:** Use `title.template: "%s | Kenexis"` in root layout, then each page only exports the page-specific part.
**Current state:** Each page exports full title like "Process Hazards Analysis (PHA) Services - Kenexis". The `title.template` pattern would simplify this, but since all titles are already defined in data files with full strings, the safest approach is to keep existing title strings and add `title.absolute` or just use them as-is (template only affects child segments that set simple string titles).
**Recommendation:** Set `title.template` in root layout but keep existing page titles as-is since they already include "Kenexis" suffix. The template serves as fallback for any pages that might not set their own title.

### Pattern 3: sitemap.ts for Search Engines
**What:** Create `src/app/sitemap.ts` that exports all routes.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
import type { MetadataRoute } from "next";
import { serviceAreas } from "@/lib/data/services";
import { softwareProducts } from "@/lib/data/software";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kenexis-website.vercel.app";

  const staticRoutes = [
    "", "/services", "/software", "/training", "/resources",
    "/about", "/about/team", "/about/representatives",
    "/careers", "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = serviceAreas.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productRoutes = softwareProducts.map((p) => ({
    url: `${baseUrl}/software/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...productRoutes];
}
```

### Pattern 4: robots.ts for Crawl Control
**What:** Create `src/app/robots.ts` to allow crawling.
**Example:**
```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://kenexis-website.vercel.app/sitemap.xml",
  };
}
```

### Pattern 5: Vercel Deployment via CLI
**What:** Deploy using `vercel` CLI with production flag.
**Steps:**
1. Run `vercel` to link project (first time -- creates `.vercel/` directory)
2. Run `vercel --prod` to deploy to production
3. Note the production URL
4. Update `metadataBase` and sitemap base URL with actual Vercel URL
5. Redeploy with updated URL

### Recommended Project Structure Additions
```
src/app/
  sitemap.ts          # NEW: Auto-generated sitemap.xml
  robots.ts           # NEW: Crawl configuration
  layout.tsx          # MODIFIED: Add metadataBase, title.template, OG defaults
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image format conversion | Custom WebP converter or sharp pipeline | `next/image` component | Already converts to WebP/AVIF on serve, handles srcset, lazy loading |
| Sitemap generation | Manual XML file | `src/app/sitemap.ts` with MetadataRoute.Sitemap | Type-safe, auto-served at /sitemap.xml |
| Robots.txt | Static file in public/ | `src/app/robots.ts` with MetadataRoute.Robots | Type-safe, references sitemap URL |
| OG image generation | Custom canvas/sharp OG images | Static hero images as OG images | For a pitch demo, hero photos are sufficient -- no need for dynamic OG generation |
| Meta tag injection | Manual `<Head>` or `<meta>` tags | Next.js Metadata API exports | Framework handles deduplication, ordering, streaming |
| Responsive testing | Complex e2e test suite | Manual viewport audit with browser DevTools | Pitch demo scope -- visual verification is appropriate |

**Key insight:** Next.js 16 has a comprehensive, typed metadata API. Every SEO need for this project (OG tags, sitemap, robots, title templates) is handled by built-in conventions.

## Common Pitfalls

### Pitfall 1: metadataBase Not Set
**What goes wrong:** OG images show as broken or localhost URLs when shared on LinkedIn/Slack.
**Why it happens:** Without metadataBase, Next.js resolves relative image paths against localhost:3000.
**How to avoid:** Set `metadataBase: new URL("https://your-domain.vercel.app")` in root layout.tsx.
**Warning signs:** Build warning: "metadataBase property in metadata export is not set..."

### Pitfall 2: OG Image Dimensions Not Specified
**What goes wrong:** Social platforms may not display preview images correctly or may crop them unexpectedly.
**Why it happens:** OG images need explicit width/height for platforms to render them properly. Currently, OG images are just string paths without dimensions.
**How to avoid:** Use the full OG image object: `{ url: "/path.jpg", width: 1200, height: 630, alt: "description" }`.

### Pitfall 3: Product Ecosystem Section on Mobile
**What goes wrong:** The circular product visualization with absolute positioning overlaps or clips on 320px viewports.
**Why it happens:** Uses `getCirclePosition()` with 38% radius on a fixed min-h-[500px] container. On narrow screens, nodes at the edges may clip.
**How to avoid:** Add a mobile fallback (e.g., simple grid on `sm:` breakpoint, ecosystem only on `md:+`) or reduce radius on small screens.
**Warning signs:** Product labels overlapping, nodes cut off at container edges.

### Pitfall 4: Vercel URL Chicken-and-Egg
**What goes wrong:** You set metadataBase before knowing the Vercel URL, then need to redeploy.
**Why it happens:** The production URL is only known after first deployment.
**How to avoid:** Deploy first with a placeholder URL, note the actual URL, update metadataBase, redeploy. Or use `VERCEL_PROJECT_PRODUCTION_URL` environment variable: `new URL(\`https://\${process.env.VERCEL_PROJECT_PRODUCTION_URL}\`)` with a fallback.

### Pitfall 5: OpenGraph Metadata Shallow Merge Overwriting
**What goes wrong:** Page-level OG metadata completely replaces root layout OG metadata instead of merging.
**Why it happens:** Next.js metadata merging is shallow -- if a page defines `openGraph`, it replaces the entire parent `openGraph` object.
**How to avoid:** Each page that sets `openGraph` must include all needed fields (title, description, images). The current codebase already does this correctly by defining complete OG objects per page.

### Pitfall 6: Missing sizes Prop on Images
**What goes wrong:** Browser downloads full-resolution images even for small display areas, hurting load time.
**Why it happens:** Without `sizes`, the browser assumes the image is 100vw and downloads the largest variant.
**How to avoid:** Set `sizes` on every `<Image>` component. Hero images: `sizes="100vw"`. Team photos: `sizes="96px"`. Already correct for heroes and team, but need to verify all Image usages.

## Code Examples

### Root Layout Metadata Enhancement
```typescript
// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"
  ),
  title: {
    default: "Kenexis Consulting Corporation",
    template: "%s | Kenexis",
  },
  description:
    "Kenexis Consulting Corporation -- globally recognized process safety consultancy specializing in risk analysis and engineered safeguards for the chemical process industry.",
  openGraph: {
    siteName: "Kenexis Consulting Corporation",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Adding Missing ogImage to Data Files
```typescript
// Pattern for data files missing ogImage
export const careersSEO: SEOMeta = {
  title: "Careers at Kenexis - Process Safety Jobs",
  description: "Join the Kenexis team...",
  ogImage: "/images/stock/hero-safety-equipment.jpg", // Use the hero from that page
};

export const contactSEO: SEOMeta = {
  title: "Contact Kenexis - Process Safety Consulting",
  description: "Get in touch with Kenexis...",
  ogImage: "/images/stock/hero-control-room.jpg",
};

export const resourcesSEO: SEOMeta = {
  title: "Process Safety Resources - Kenexis",
  description: "Access webinars, papers...",
  ogImage: "/images/stock/hero-control-room.jpg",
};
```

### Responsive Ecosystem Section Mobile Fallback
```typescript
// Mobile: simple grid. Desktop: circular visualization
<div className="block md:hidden">
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    {products.map((product) => (
      <div key={product.id} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5">
        {/* Icon + name */}
      </div>
    ))}
  </div>
</div>
<div className="hidden md:block">
  {/* Existing circular ecosystem visualization */}
</div>
```

## Current State Audit

### SEO Metadata Coverage
| Page | Title | Description | OG Title | OG Description | OG Image |
|------|-------|-------------|----------|----------------|----------|
| Homepage | Yes (data) | Yes (data) | Yes | Yes | Yes (hero-refinery.jpg) |
| Services landing | Yes (data) | Yes (data) | Yes | Yes | Yes (services-hero.jpg) |
| Service detail (x4) | Yes (generateMetadata) | Yes | Yes | Yes | No (missing ogImage in data) |
| Software landing | Yes (data) | Yes (data) | Yes | Yes | Yes (software-hero.jpg) |
| Product detail (x7) | Yes (generateMetadata) | Yes | Yes | Yes | No (missing ogImage in data) |
| Training | Yes (data) | Yes (data) | Yes | Yes | Yes (training-hero.jpg) |
| Resources | Yes (data) | Yes (data) | Yes | Yes | No (missing ogImage) |
| About | Yes (data) | Yes (data) | Yes | Yes | Yes (about-hero.jpg) |
| Team | Yes (data) | Yes (data) | Yes | Yes | Yes (about-hero.jpg) |
| Representatives | Yes (data) | Yes (data) | Yes | Yes | No (missing ogImage) |
| Careers | Yes (data) | Yes (data) | Yes | Yes | No (missing ogImage) |
| Contact | Yes (data) | Yes (data) | Yes | Yes | No (missing ogImage) |

**Gap:** 15 of 24 pages are missing ogImage in their SEO data objects. The pages with ogImage reference relative paths. Without metadataBase, none of these resolve to absolute URLs.

### Image Optimization Status
| Image Usage | Component | next/image | priority | sizes | Status |
|-------------|-----------|------------|----------|-------|--------|
| Homepage hero | hero-section.tsx | Yes | Yes | "100vw" | Good |
| Service hero | services-hero-section.tsx | Yes | Yes | "100vw" | Good |
| Software hero | software-hero-section.tsx | Yes | Yes | "100vw" | Good |
| Product hero | product-hero-section.tsx | Yes | Yes | "100vw" | Good |
| Logo (header) | site-header.tsx | Yes | Yes | N/A (fixed w/h) | Good |
| Logo (mobile) | mobile-nav.tsx | Yes | No | N/A (fixed w/h) | OK (below fold) |
| Logo (footer) | site-footer.tsx | Yes | No | N/A (fixed w/h) | OK (below fold) |
| Team photos | team-section.tsx | Yes | No | "96px" | Good |
| Leadership preview | leadership-preview-section.tsx | Yes | No | "112px" | Good |

**All images use next/image** -- WebP conversion is automatic. Priority correctly set on above-the-fold hero images.

### External Links Status
| Link | Where Used | target="_blank" | rel="noopener noreferrer" |
|------|-----------|-----------------|---------------------------|
| kiss.kenexis.com | mobile-nav, training-courses, product-cta, product-detail-cta | Yes | Yes |
| store.kenexis.com | mobile-nav, product-cta, product-detail-cta | Yes | Yes |
| LinkedIn | footer, company, contact | Yes | Yes |
| YouTube | footer, resources | Yes | Yes |
| Spotify | footer, podcast-section | Yes | Yes |

**All external links correctly use `target="_blank" rel="noopener noreferrer"`.**

### Responsive Classes Usage
The project consistently uses Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) for:
- Grid columns: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Text sizing: `text-4xl sm:text-5xl lg:text-6xl`
- Padding: `py-16 sm:py-24`
- Visibility: `hidden lg:flex` (desktop nav), `lg:hidden` (mobile nav trigger)

**Primary concern:** Product ecosystem section absolute positioning on 320px viewports.

## Open Questions

1. **Vercel account/team setup**
   - What we know: Vercel CLI (v50.26.1) is installed globally
   - What's unclear: Whether a Vercel account is already authenticated, which team/scope to deploy under
   - Recommendation: Run `vercel whoami` to check auth status; if not logged in, `vercel login` first

2. **OG preview image quality for social sharing**
   - What we know: Using hero JPG photos as OG images. Standard OG size is 1200x630px.
   - What's unclear: Whether the stock photos are exactly 1200x630 or will be cropped by platforms
   - Recommendation: Verify stock image dimensions. If not 1200x630, platforms will handle cropping from center, which is acceptable for a pitch demo.

3. **Vercel URL format**
   - What we know: Default Vercel URLs follow `project-name.vercel.app` pattern
   - What's unclear: Exact URL until first deployment
   - Recommendation: Use `VERCEL_PROJECT_PRODUCTION_URL` environment variable in metadataBase to avoid hardcoding

## Sources

### Primary (HIGH confidence)
- [Next.js generateMetadata docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) - metadataBase, title.template, openGraph, twitter card configuration
- [Next.js sitemap.ts docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) - MetadataRoute.Sitemap type and convention
- [Next.js robots.ts docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) - MetadataRoute.Robots type and convention
- [Next.js Image component docs](https://nextjs.org/docs/app/api-reference/components/image) - sizes, priority, quality props
- [Vercel Next.js deployment docs](https://vercel.com/docs/frameworks/full-stack/nextjs) - Zero-config deployment

### Secondary (MEDIUM confidence)
- Build output analysis (local `next build` run) - 24 static pages, metadataBase warning confirmed
- Codebase audit - All source files examined for metadata, image, and external link patterns

### Tertiary (LOW confidence)
- None

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - No new dependencies, all built-in Next.js features
- Architecture: HIGH - Direct from Next.js 16.1.6 official docs (dated 2026-02-27)
- Pitfalls: HIGH - metadataBase warning confirmed in build output; OG gaps confirmed via code audit
- Responsive concerns: MEDIUM - Ecosystem section concern is based on code analysis, not viewport testing
- Deployment: MEDIUM - Vercel CLI installed but auth status unknown

**Research date:** 2026-03-04
**Valid until:** 2026-04-04 (stable -- no fast-moving dependencies)
