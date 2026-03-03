# Architecture Research

**Domain:** Premium multi-page B2B marketing website (Next.js)
**Researched:** 2026-03-03
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                         PRESENTATION LAYER                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐     │
│  │  Navbar   │  │  Hero    │  │  Footer  │  │  Page Sections   │     │
│  │(shared)   │  │(variant) │  │(shared)  │  │(per-page compose)│     │
│  └─────┬─────┘  └─────┬────┘  └─────┬────┘  └────────┬─────────┘    │
│        │              │             │                 │              │
├────────┴──────────────┴─────────────┴─────────────────┴──────────────┤
│                        LAYOUT COMPOSITION LAYER                      │
│  ┌───────────────────────────────────────────────────────────────┐   │
│  │  RootLayout (html, body, fonts, metadata defaults, providers) │   │
│  │  └─ MarketingLayout (navbar, footer, page transitions)        │   │
│  │     └─ template.tsx (Framer Motion transition wrapper)        │   │
│  │        └─ page.tsx (page-specific content)                    │   │
│  └───────────────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────────────┤
│                          CONTENT DATA LAYER                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Services │  │ Software │  │  Team    │  │Navigation│            │
│  │  data/   │  │  data/   │  │  data/   │  │  data/   │            │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │
├──────────────────────────────────────────────────────────────────────┤
│                        UI COMPONENT LAYER                            │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                     │
│  │ shadcn/ui  │  │ 21st.dev   │  │  Custom    │                     │
│  │ primitives │  │ premium    │  │  sections  │                     │
│  └────────────┘  └────────────┘  └────────────┘                     │
├──────────────────────────────────────────────────────────────────────┤
│                       ANIMATION LAYER                                │
│  ┌──────────────────┐  ┌────────────────┐  ┌──────────────────┐     │
│  │ Framer Motion    │  │ CSS Animations │  │ magicui effects  │     │
│  │ scroll-triggered │  │ appear/fade    │  │ text, background │     │
│  └──────────────────┘  └────────────────┘  └──────────────────┘     │
└──────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| RootLayout | HTML shell, `<html>`, `<body>`, global fonts, base metadata, ThemeProvider | `app/layout.tsx` -- Server Component, sets Inter font, navy color scheme, metadata defaults |
| MarketingLayout | Shared Navbar + Footer wrapper for all marketing pages | `app/(marketing)/layout.tsx` -- wraps children with persistent nav/footer |
| PageTransitionTemplate | Framer Motion AnimatePresence + motion.div wrapper | `app/(marketing)/template.tsx` -- Client Component, re-mounts on every navigation |
| Navbar | Site-wide navigation, logo, mega-menu dropdowns for Services/Software, mobile hamburger | `components/layout/navbar.tsx` -- Client Component (interactive) |
| Footer | Contact info, social links, sitemap links, newsletter CTA | `components/layout/footer.tsx` -- Server Component |
| Hero sections | Full-width hero with image/gradient, heading, description, CTAs | `components/sections/hero-*.tsx` -- variant per page type |
| Page sections | Composable content blocks: feature grids, team cards, comparison tables, CTAs | `components/sections/*.tsx` -- composed per page |
| Content data files | TypeScript objects exporting all page content (scraped from kenexis.com) | `lib/data/*.ts` -- typed constants, no CMS |
| UI primitives | Buttons, cards, badges, inputs, dialogs, sheets | `components/ui/*.tsx` -- shadcn/ui + 21st.dev installed components |
| Animation utilities | Scroll-triggered reveals, text animations, background effects | `components/animations/*.tsx` -- Framer Motion wrappers |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout: <html>, <body>, Inter font, providers
│   ├── (marketing)/
│   │   ├── layout.tsx                # Marketing layout: Navbar + Footer
│   │   ├── template.tsx              # Framer Motion page transition wrapper
│   │   ├── page.tsx                  # Home page (/)
│   │   ├── services/
│   │   │   ├── page.tsx              # Services landing (/services)
│   │   │   ├── pha/page.tsx          # PHA sub-page
│   │   │   ├── qra/page.tsx          # QRA sub-page
│   │   │   ├── fire-gas-mapping/page.tsx
│   │   │   └── sis/page.tsx          # SIS sub-page
│   │   ├── software/
│   │   │   ├── page.tsx              # Software landing (/software)
│   │   │   ├── [slug]/page.tsx       # Dynamic: individual product pages
│   │   │   └── support/page.tsx      # Software support page
│   │   ├── training/
│   │   │   └── page.tsx              # Training page
│   │   ├── resources/
│   │   │   └── page.tsx              # Resources page
│   │   ├── about/
│   │   │   ├── page.tsx              # Company overview
│   │   │   ├── team/page.tsx         # Senior staff
│   │   │   └── representatives/page.tsx
│   │   ├── careers/
│   │   │   └── page.tsx              # Careers page
│   │   └── contact/
│   │       └── page.tsx              # Contact form page
│   ├── api/
│   │   └── contact/route.ts          # Contact form API route (Vercel serverless)
│   ├── not-found.tsx                 # Custom 404
│   ├── sitemap.ts                    # Dynamic sitemap generation
│   └── robots.ts                     # robots.txt generation
├── components/
│   ├── layout/
│   │   ├── navbar.tsx                # Main navigation (Client Component)
│   │   ├── mobile-nav.tsx            # Mobile navigation sheet
│   │   └── footer.tsx                # Site footer
│   ├── sections/
│   │   ├── hero-home.tsx             # Home page hero
│   │   ├── hero-page.tsx             # Interior page hero (reusable)
│   │   ├── services-grid.tsx         # Services card grid
│   │   ├── software-showcase.tsx     # Software product cards
│   │   ├── feature-grid.tsx          # Generic feature grid (reusable)
│   │   ├── comparison-table.tsx      # Product comparison table
│   │   ├── team-grid.tsx             # Team member cards
│   │   ├── testimonials.tsx          # Client testimonials/logos
│   │   ├── cta-section.tsx           # Call-to-action banner
│   │   ├── newsletter-signup.tsx     # Newsletter form section
│   │   ├── stats-section.tsx         # Statistics/metrics display
│   │   ├── pillar-cards.tsx          # Three-pillar overview (home)
│   │   └── contact-form.tsx          # Contact form component
│   ├── ui/                           # shadcn/ui + 21st.dev primitives
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── sheet.tsx
│   │   ├── accordion.tsx
│   │   ├── tabs.tsx
│   │   └── ...                       # Additional as needed
│   └── animations/
│       ├── scroll-reveal.tsx          # Scroll-triggered fade/slide in
│       ├── stagger-children.tsx       # Staggered children animation
│       ├── counter.tsx                # Animated number counter
│       └── page-transition.tsx        # LayoutTransition + FrozenRouter
├── lib/
│   ├── data/
│   │   ├── services.ts               # Services content + metadata
│   │   ├── software.ts               # Software products content
│   │   ├── team.ts                    # Team members data
│   │   ├── training.ts               # Training courses data
│   │   ├── resources.ts              # Resources content
│   │   ├── navigation.ts             # Nav structure + links
│   │   └── site.ts                   # Site-wide config (company info, socials)
│   ├── utils.ts                       # cn() utility, shared helpers
│   └── fonts.ts                       # Inter font configuration
├── public/
│   ├── images/
│   │   ├── heroes/                   # Hero section background images
│   │   ├── team/                     # Team member photos
│   │   ├── software/                 # Software screenshots/mockups
│   │   └── logos/                    # Client logos, certifications
│   ├── favicon.ico
│   └── og-image.png                  # Default Open Graph image
├── styles/
│   └── globals.css                   # Tailwind directives, CSS custom properties
├── next.config.ts                    # Next.js configuration
├── tailwind.config.ts                # Tailwind theme (navy/orange palette)
├── tsconfig.json
└── components.json                   # shadcn/ui configuration
```

### Structure Rationale

- **`app/(marketing)/`:** Route group wraps all public pages without adding `/marketing` to URLs. Enables a shared marketing layout (navbar + footer) separate from the root layout. This is the standard Next.js pattern for multi-page marketing sites.
- **`app/(marketing)/template.tsx`:** The `template.tsx` file re-mounts on every navigation (unlike `layout.tsx` which persists). This is where Framer Motion's AnimatePresence lives, enabling page transition animations between routes.
- **`app/api/contact/route.ts`:** Vercel serverless function for contact form submission. Keeps the site "static" from a rendering perspective while supporting the one dynamic feature.
- **`components/sections/`:** Page-level section components composed into pages. Each page is a composition of these sections with page-specific data. Mirrors the launch-ui pattern of `components/sections/{type}/default.tsx`.
- **`components/ui/`:** shadcn/ui primitives. Installed via CLI, not hand-written. The single source for all base UI elements.
- **`components/animations/`:** Reusable Framer Motion wrappers. Separates animation logic from content components. Used as wrapper components around section content.
- **`lib/data/`:** TypeScript content files. All scraped content lives here as typed constants. Pages import from these files. This replaces a CMS -- appropriate for a pitch demo where content is fixed.
- **`public/images/`:** Organized by purpose. Local images get full Next.js Image optimization on Vercel without any custom loader configuration.

## Architectural Patterns

### Pattern 1: Route Group Layout Composition

**What:** Use `(marketing)` route group to wrap all public pages with shared Navbar/Footer without affecting URL paths. The root `layout.tsx` handles HTML shell and providers only; the route group `layout.tsx` handles the visual chrome.

**When to use:** Any multi-page site with consistent header/footer across pages.

**Trade-offs:** Slightly deeper file nesting, but clean separation between HTML infrastructure and visual layout. Allows future route groups like `(auth)` or `(admin)` with different layouts.

**Example:**
```typescript
// app/layout.tsx -- Root layout (infrastructure only)
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kenexis Consulting Corporation",
    template: "%s | Kenexis",
  },
  description: "Global leaders in process safety consulting...",
  metadataBase: new URL("https://kenexis-redesign.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

```typescript
// app/(marketing)/layout.tsx -- Marketing layout (visual chrome)
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
```

### Pattern 2: Template-Based Page Transitions with FrozenRouter

**What:** Use `template.tsx` (not `layout.tsx`) for Framer Motion AnimatePresence. The template re-mounts on navigation, giving AnimatePresence the key change it needs to trigger exit/enter animations. A FrozenRouter component prevents Next.js from unmounting the outgoing page before the exit animation completes.

**When to use:** Any Next.js App Router project needing page transition animations.

**Trade-offs:** Relies on importing `LayoutRouterContext` from Next.js internal path (`next/dist/shared/lib/app-router-context.shared-runtime`), which could break on major Next.js updates. The pattern is well-documented and widely used, but monitor Next.js changelogs. If Next.js adds native transition support (ViewTransitions API), migrate to that.

**Example:**
```typescript
// app/(marketing)/template.tsx
"use client";

import { LayoutTransition } from "@/components/animations/page-transition";

export default function MarketingTemplate({ children }: { children: React.ReactNode }) {
  return (
    <LayoutTransition
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
    >
      {children}
    </LayoutTransition>
  );
}
```

```typescript
// components/animations/page-transition.tsx
"use client";

import { useRef, useEffect, useContext, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T>();
  useEffect(() => {
    prevValue.current = value;
    return () => { prevValue.current = undefined; };
  });
  return prevValue.current;
}

function FrozenRouter({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;
  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);
  const changed = segment !== prevSegment && segment !== undefined && prevSegment !== undefined;

  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {children}
    </LayoutRouterContext.Provider>
  );
}

interface LayoutTransitionProps {
  children: ReactNode;
  className?: string;
  initial: object;
  animate: object;
  exit: object;
}

export function LayoutTransition({ children, className, initial, animate, exit }: LayoutTransitionProps) {
  const segment = useSelectedLayoutSegment();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={segment} className={className} initial={initial} animate={animate} exit={exit}>
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}
```

### Pattern 3: Typed Content Data Layer (CMS Replacement)

**What:** All scraped content stored as TypeScript constants in `lib/data/` with full type definitions. Pages import typed data and pass it to presentational section components. This creates a clear boundary between content and presentation.

**When to use:** Static sites with fixed content, pitch demos, or sites where a CMS is out of scope. Also useful as a migration path -- when you later add a CMS, you only change the data layer, not the components.

**Trade-offs:** Content changes require code changes and redeploy. Acceptable for a pitch demo. The type safety catches missing fields at build time rather than runtime.

**Example:**
```typescript
// lib/data/software.ts
export interface SoftwareProduct {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: { title: string; description: string; icon: string }[];
  heroImage: string;
  ctaText: string;
  ctaHref: string;
}

export const softwareProducts: SoftwareProduct[] = [
  {
    slug: "open-pha",
    name: "Open-PHA\u00ae",
    tagline: "Cloud-based process hazards analysis",
    description: "The industry-leading PHA software...",
    features: [
      { title: "HAZOP Worksheets", description: "...", icon: "clipboard" },
      { title: "LOPA Integration", description: "...", icon: "layers" },
    ],
    heroImage: "/images/software/open-pha-hero.png",
    ctaText: "Request Demo",
    ctaHref: "https://kiss.kenexis.com",
  },
  // ... more products
];

export function getProduct(slug: string): SoftwareProduct | undefined {
  return softwareProducts.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return softwareProducts.map((p) => p.slug);
}
```

```typescript
// app/(marketing)/software/[slug]/page.tsx
import { getProduct, getAllProductSlugs } from "@/lib/data/software";
import { notFound } from "next/navigation";
import { HeroPage } from "@/components/sections/hero-page";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { CtaSection } from "@/components/sections/cta-section";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.tagline,
  };
}

export default function SoftwareProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <>
      <HeroPage title={product.name} subtitle={product.tagline} image={product.heroImage} />
      <FeatureGrid features={product.features} />
      <CtaSection text={product.ctaText} href={product.ctaHref} />
    </>
  );
}
```

### Pattern 4: Section-Based Page Composition

**What:** Each page is composed of reusable section components stacked vertically. Sections are self-contained blocks (hero, feature grid, CTA, stats) that accept content via props. Pages are thin orchestrators that import data and compose sections.

**When to use:** Multi-page marketing sites where different pages share visual patterns but different content.

**Trade-offs:** More files than putting everything inline, but dramatically improves consistency and reduces duplication. A change to the CTA pattern updates every page that uses it.

**Example:**
```typescript
// app/(marketing)/page.tsx -- Home page composition
import { HeroHome } from "@/components/sections/hero-home";
import { PillarCards } from "@/components/sections/pillar-cards";
import { StatsSection } from "@/components/sections/stats-section";
import { NewsletterSignup } from "@/components/sections/newsletter-signup";
import { CtaSection } from "@/components/sections/cta-section";
import { siteConfig } from "@/lib/data/site";

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <PillarCards />
      <StatsSection stats={siteConfig.stats} />
      <NewsletterSignup />
      <CtaSection
        title="Ready to improve your process safety?"
        description="Contact our team of experts."
        buttonText="Get in Touch"
        buttonHref="/contact"
      />
    </>
  );
}
```

### Pattern 5: Scroll-Triggered Animation Wrapper

**What:** A reusable `ScrollReveal` component wraps any content block and applies Framer Motion `whileInView` animations. Keeps animation config out of content components. Uses Intersection Observer under the hood via Framer Motion.

**When to use:** Professional marketing sites needing subtle scroll-triggered entrance animations on sections, cards, and content blocks.

**Trade-offs:** Adds a Client Component boundary around Server Components (the wrapper must be a Client Component). Keep the wrapper thin and the content passed as children.

**Example:**
```typescript
// components/animations/scroll-reveal.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  variant = "fadeUp",
  delay = 0,
  className,
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      variants={variants[variant]}
    >
      {children}
    </motion.div>
  );
}
```

## Data Flow

### Page Render Flow

```
[User navigates to /software/open-pha]
    |
    v
[Next.js App Router matches route]
    |
    v
[RootLayout] --> provides HTML shell, fonts, base metadata
    |
    v
[(marketing)/layout.tsx] --> renders Navbar + Footer (persistent)
    |
    v
[(marketing)/template.tsx] --> AnimatePresence triggers enter animation
    |
    v
[software/[slug]/page.tsx] --> Server Component
    |   |
    |   +--> generateStaticParams() --> pre-renders all product pages at build
    |   +--> generateMetadata() --> sets page-specific title, description, OG
    |   +--> getProduct(slug) --> reads from lib/data/software.ts
    |   |
    |   v
    |   [Compose sections with product data as props]
    |       |
    |       +--> <HeroPage title={...} image={...} />
    |       +--> <FeatureGrid features={...} />
    |       +--> <CtaSection text={...} href={...} />
    |
    v
[Vercel CDN serves pre-rendered HTML] --> fast first paint
    |
    v
[Client hydration] --> Framer Motion animations activate, nav becomes interactive
```

### Content Data Flow

```
lib/data/*.ts (TypeScript constants)
    |
    +--> Imported by page.tsx files (Server Components)
    |       |
    |       +--> Passed as props to section components
    |       +--> Used by generateMetadata() for SEO
    |       +--> Used by generateStaticParams() for build-time route generation
    |
    +--> Imported by components/layout/navbar.tsx
    |       (navigation structure from lib/data/navigation.ts)
    |
    +--> Imported by components/layout/footer.tsx
            (site config from lib/data/site.ts)
```

### Contact Form Data Flow

```
[User fills form in /contact]
    |
    v
[contact-form.tsx] (Client Component)
    |
    +--> Client-side validation (react-hook-form + zod)
    |
    v
[POST /api/contact] --> Vercel Serverless Function
    |
    +--> Server-side validation (zod)
    +--> Send email via Resend/SendGrid API
    +--> Return success/error JSON
    |
    v
[contact-form.tsx] --> Shows success toast or error message
```

### Key Data Flows

1. **Static content flow:** TypeScript data files --> Server Component pages --> section component props --> rendered HTML at build time. No runtime data fetching for content.
2. **Navigation flow:** `lib/data/navigation.ts` defines the full nav tree (with nested dropdowns for Services and Software). Navbar and Footer both consume this single source of truth.
3. **SEO metadata flow:** Root layout sets defaults (`title.template: "%s | Kenexis"`). Each page exports `generateMetadata()` that provides page-specific overrides. Next.js merges parent and child metadata automatically.
4. **Image flow:** Local images in `public/images/` served via `next/image` with automatic Vercel-side optimization (WebP, sizing, lazy loading). No custom loader needed when deploying to Vercel.
5. **Animation flow:** Page transitions handled at the template level (runs on every navigation). Section-level animations handled by `ScrollReveal` wrappers (runs when element enters viewport). These are independent -- a section animates in via scroll regardless of page transition state.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Pitch demo (current) | Hardcoded TypeScript data layer. All pages statically generated at build time. Zero runtime cost. This is the right architecture for the scope. |
| Production website | Swap `lib/data/*.ts` imports for CMS API calls (Sanity, Contentful). Add ISR with `revalidate` tags. Pages stay the same, only data source changes. |
| Multi-language | Add `[locale]` route segment above `(marketing)` group. Use `next-intl` or similar. Content data files become keyed by locale. |

### Scaling Priorities

1. **First bottleneck (unlikely for static site):** Image file sizes. Mitigate with aggressive `next/image` sizing, WebP format, and `priority` prop on above-the-fold hero images only.
2. **Second bottleneck:** Build time if page count grows significantly. Mitigate with `generateStaticParams()` returning all slugs and Vercel's incremental builds.

## Anti-Patterns

### Anti-Pattern 1: Putting Everything in Client Components

**What people do:** Mark every component `"use client"` because Framer Motion or interactivity is needed somewhere in the tree.
**Why it's wrong:** Sends unnecessary JavaScript to the client. Defeats Next.js Server Component benefits (smaller bundles, faster loads). A marketing site should ship minimal JS.
**Do this instead:** Keep pages and section components as Server Components. Only add `"use client"` to the specific interactive pieces: Navbar (dropdowns), ScrollReveal wrappers, contact form, page transition template. Pass Server Component content as `children` through Client Component wrappers.

### Anti-Pattern 2: One Giant Page Component

**What people do:** Put all sections for a page (hero, features, CTA, footer) into a single 500-line page.tsx file.
**Why it's wrong:** Impossible to reuse sections across pages. Hard to maintain. Every page ends up as a unique snowflake.
**Do this instead:** Page files should be thin compositors -- 20-40 lines that import section components and pass them content data. All visual logic lives in the section components.

### Anti-Pattern 3: Inline Content Strings

**What people do:** Hardcode content text directly in JSX: `<h1>Process Hazards Analysis</h1>`.
**Why it's wrong:** Content scattered across dozens of component files. Impossible to audit for accuracy against the real kenexis.com. Cannot be batch-updated.
**Do this instead:** All content in `lib/data/*.ts` files. Pages and sections receive content via props or imports. Single source of truth for all scraped content.

### Anti-Pattern 4: AnimatePresence in layout.tsx

**What people do:** Put Framer Motion page transitions in `layout.tsx` instead of `template.tsx`.
**Why it's wrong:** `layout.tsx` persists across navigations and does not re-mount. AnimatePresence needs its direct child to unmount/remount to trigger exit animations. Layout children never unmount.
**Do this instead:** Use `template.tsx` which re-creates a new instance on every navigation, giving AnimatePresence the component lifecycle it needs.

### Anti-Pattern 5: Using `output: "export"` with Vercel

**What people do:** Set `output: "export"` in next.config.ts for a "static" site deployed to Vercel.
**Why it's wrong:** Disables the Vercel Image Optimization API, API routes (needed for contact form), and ISR. Vercel natively supports Next.js -- it statically generates pages automatically via `generateStaticParams()` without needing export mode.
**Do this instead:** Deploy as a normal Next.js app to Vercel. Pages with `generateStaticParams()` are statically generated at build time. You get Image Optimization and API routes for free.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Vercel | Default Next.js deployment, zero config | Image optimization, serverless functions, CDN all included. Free tier sufficient for pitch demo. |
| Email service (Resend or SendGrid) | API route in `app/api/contact/route.ts` calls email API | Resend is simpler for low volume. SendGrid for higher volume. Either works. API key in Vercel environment variable. |
| Unsplash/Pexels | Download stock images at build time, place in `public/images/heroes/` | Do NOT hotlink. Download and self-host for reliability and performance. |
| 21st.dev | Install components via `npx shadcn@latest add "https://21st.dev/r/{author}/{component}"` | Components are copied into project. No runtime dependency on 21st.dev. |
| kenexis.com (content source) | One-time scrape, stored in `lib/data/*.ts` | Content is static after initial scrape. No runtime connection to kenexis.com. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Page --> Sections | Props (typed data) | Pages compose sections and pass content data as typed props. Sections are presentation-only. |
| Page --> Data layer | Direct import from `lib/data/*.ts` | Server Components import typed constants. No API layer needed for static content. |
| Layout --> Navbar/Footer | Direct render in JSX | Navbar and Footer are rendered directly in the marketing layout. They import their own data from `lib/data/navigation.ts` and `lib/data/site.ts`. |
| Template --> Animation | Wraps children in motion.div | Template is the only place page-level transitions happen. Section animations are independent. |
| Contact form --> API route | `fetch("/api/contact", { method: "POST" })` | Client Component form submits to local API route. API route handles email sending server-side. |
| Components --> UI primitives | Direct import from `@/components/ui/*` | shadcn/ui components are project-local files, not node_modules. Import paths are stable. |

## SEO Architecture

### Metadata Hierarchy

```
RootLayout metadata (defaults)
├── title.template: "%s | Kenexis"
├── description: "Global leaders in process safety..."
├── metadataBase: new URL("https://kenexis-redesign.vercel.app")
├── openGraph: { type: "website", locale: "en_US", ... }
├── twitter: { card: "summary_large_image" }
└── icons: { icon: "/favicon.ico" }

Each page.tsx generateMetadata() overrides:
├── title: "Process Hazards Analysis"     --> renders as "Process Hazards Analysis | Kenexis"
├── description: "Page-specific description..."
└── openGraph: { images: [page-specific-og-image] }
```

### Static Generation

- `generateStaticParams()` on dynamic routes (`software/[slug]`) pre-renders all product pages at build time
- `sitemap.ts` in app root generates sitemap.xml automatically from route structure + data files
- `robots.ts` in app root generates robots.txt allowing all crawlers

### Structured Data (JSON-LD)

Add organization and service schema to the home page and relevant service pages for rich search results:

```typescript
// In page head via metadata or script tag
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kenexis Consulting Corporation",
  url: "https://kenexis.com",
  telephone: "+1-614-451-7031",
  // ...
};
```

## Build Order (Dependencies)

This is the recommended implementation order based on architectural dependencies:

```
Phase 1: Foundation (no dependencies)
├── Next.js project setup + Tailwind + shadcn/ui config
├── Tailwind theme (navy/orange palette, Inter font)
├── Root layout (app/layout.tsx)
├── Site config (lib/data/site.ts)
└── UI primitives installation (shadcn/ui + 21st.dev)

Phase 2: Layout Shell (depends on Phase 1)
├── Navigation data (lib/data/navigation.ts)
├── Marketing layout (app/(marketing)/layout.tsx)
├── Navbar component
├── Footer component
└── Page transition template (app/(marketing)/template.tsx)

Phase 3: Content Data Layer (depends on Phase 1)
├── Content scraping from kenexis.com
├── TypeScript data files (lib/data/services.ts, software.ts, team.ts, etc.)
└── Type definitions for all content structures

Phase 4: Section Components (depends on Phase 1 + 2)
├── Hero variants (home hero, interior page hero)
├── Feature grid, comparison table, stats section
├── Team grid, CTA section, newsletter signup
└── ScrollReveal animation wrapper

Phase 5: Page Composition (depends on Phase 2 + 3 + 4)
├── Home page
├── Services landing + sub-pages
├── Software landing + dynamic product pages
├── Training, Resources, About, Team, Careers pages
├── Contact page + API route
└── Per-page SEO metadata

Phase 6: Polish (depends on Phase 5)
├── 404 page
├── Sitemap + robots.txt generation
├── OG images
├── Performance optimization (priority images, preloading)
├── Mobile responsiveness audit
└── Vercel deployment + environment variables
```

## Sources

- [Next.js Layouts and Pages (official docs, v16.1.6)](https://nextjs.org/docs/app/getting-started/layouts-and-pages) -- HIGH confidence
- [Next.js Route Groups (official docs)](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups) -- HIGH confidence
- [Next.js Image Optimization (official docs, v16.1.6)](https://nextjs.org/docs/app/getting-started/images) -- HIGH confidence
- [Next.js Metadata and OG Images (official docs)](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) -- HIGH confidence
- [Next.js generateMetadata (official docs)](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) -- HIGH confidence
- [Next.js Project Structure (official docs)](https://nextjs.org/docs/app/getting-started/project-structure) -- HIGH confidence
- [Framer Motion Page Transitions in App Router (imcorfitz.com)](https://www.imcorfitz.com/posts/adding-framer-motion-page-transitions-to-next-js-app-router) -- MEDIUM confidence (FrozenRouter pattern)
- [Creative Page Transitions with Next.js (olivierlarose.com)](https://blog.olivierlarose.com/articles/nextjs-page-transition-guide) -- MEDIUM confidence
- [Next.js App Router Shared Layout Animations Issue #49279](https://github.com/vercel/next.js/issues/49279) -- HIGH confidence (confirms limitation)
- [Next.js Architecture 2026 (yogijs.tech)](https://www.yogijs.tech/blog/nextjs-project-architecture-app-router) -- LOW confidence (blog, cross-referenced with official docs)
- [launch-ui repo structure](~/design-repos/launch-ui) -- LOCAL reference, HIGH confidence
- [shadcn-ui-landing-page repo](~/design-repos/shadcn-ui-landing-page) -- LOCAL reference, HIGH confidence

---
*Architecture research for: Kenexis Website Redesign -- Premium B2B multi-page marketing site*
*Researched: 2026-03-03*
