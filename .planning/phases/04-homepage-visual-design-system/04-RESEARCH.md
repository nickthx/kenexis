# Phase 4: Homepage & Visual Design System - Research

**Researched:** 2026-03-03
**Domain:** Homepage section composition, scroll-triggered animations, visual design system, responsive hero layouts
**Confidence:** HIGH

## Summary

Phase 4 transforms the existing placeholder homepage into a fully polished, production-quality marketing page that establishes the reusable visual language for the entire site. The current `src/app/(marketing)/page.tsx` contains showcase-style placeholder content (brand color swatches, typography samples) that must be completely replaced with real homepage sections composed from the scraped data in `src/lib/data/home.ts`.

The technical core of this phase centers on two capabilities: (1) composing six distinct homepage sections (hero, pillars, stats, featured content, newsletter, contact CTA) from existing data structures and shadcn/ui components, and (2) adding scroll-triggered animations via the `motion` library (v12.34.5, already installed) using `whileInView`, `useInView`, and `useSpring` hooks. A `NumberTicker` component adapted from Magic UI's pattern will handle the animated counters requirement.

All data is already scraped and typed (`homeHero`, `homePillars`, `homeStats`, `homeFeaturedContent`, `homeNewsletterCTA`, `homeContactCTA`). All stock images are already in `public/images/stock/`. The layout shell (header, footer, breadcrumbs) is complete from Phase 3. This phase is purely component composition and animation work with no data gathering or infrastructure setup needed.

**Primary recommendation:** Build each homepage section as an independent component in `src/components/sections/`, wire them into the homepage page component, and add motion animations as a final layer. Adapt the Magic UI `NumberTicker` pattern for animated stats counters.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HOME-01 | Full-width hero section with industrial imagery, value proposition, and dual CTAs | Next.js Image `fill` + `priority` for bg image; `homeHero` data already typed; `hero-refinery.jpg` available |
| HOME-02 | Three-pillar overview (Consulting, Software, Training) with icons, descriptions, CTAs | `homePillars` data with Lucide icon names; Card/grid pattern from launch-ui `items` section |
| HOME-03 | Social proof / trust signals with industry metrics | `homeStats` data with value/suffix/description; `NumberTicker` component for animated counting |
| HOME-04 | Recent content feed showing latest articles/webinars | `homeFeaturedContent` data with title/excerpt/category/href; Card-based grid layout |
| HOME-05 | Newsletter signup via inline form | `homeNewsletterCTA` data; shadcn `Input` component needed (install via CLI); demo-mode form handler |
| HOME-06 | Prominent contact CTA section near footer | `homeContactCTA` data; dark background CTA pattern from launch-ui |
| VIS-01 | Consistent navy/orange color palette across all sections | Already established in globals.css: `--color-navy-*`, `--color-orange-*`, semantic tokens mapped |
| VIS-02 | Inter font with clear typographic hierarchy | Inter loaded in root layout via `next/font/google`; `--font-sans` configured in @theme |
| VIS-03 | Scroll-triggered animations (fade-in, stagger reveals, counter animations) | `motion` v12.34.5 installed; `whileInView`, `stagger()`, `useInView` verified via Context7 |
| VIS-04 | Dark-mode hero sections with gradient accents and industrial photography overlays | Navy bg + Image fill + gradient overlay technique; hero-refinery.jpg with dark overlay |
| VIS-05 | Animated statistics counters that count up on scroll | Magic UI `NumberTicker` pattern: `useMotionValue` + `useSpring` + `useInView` from `motion/react` |
| VIS-06 | Generous whitespace, clear visual hierarchy, premium B2B aesthetic | Section component pattern with consistent `py-16 sm:py-24 md:py-32` spacing; `max-w-7xl` container |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| motion | 12.34.5 | Scroll-triggered animations, spring physics, viewport detection | Production-grade animation library already in the project; `motion/react` import path |
| next/image | 16.1.6 | Optimized hero background images with `fill` and `priority` | Built into Next.js; automatic WebP, lazy loading, responsive srcsets |
| lucide-react | 0.576.0 | Pillar icons (hard-hat, monitor, graduation-cap) | Already installed and used in footer/navigation |
| shadcn/ui | 3.8.5 | Card, Button, Input components | Already installed; CLI available for adding new components |
| tailwind-merge + clsx | installed | Conditional className merging | Standard pattern via `cn()` utility in `src/lib/utils.ts` |

### Supporting (Need to Add)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn Input | via CLI | Newsletter email input field | HOME-05 newsletter signup form |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Custom NumberTicker | `react-countup` package | Adds dependency; Magic UI pattern uses same `motion/react` hooks already installed -- no new dep needed |
| CSS-only animations | `motion` whileInView | CSS `@keyframes` with `IntersectionObserver` is more code and less maintainable than motion's declarative API |
| Framer Motion import | `motion/react` import | Project uses `motion` v12 package (renamed from framer-motion); import from `motion/react` not `framer-motion` |

**Installation:**
```bash
npx shadcn@latest add input
```

No other packages need to be installed. Everything else is already in the project.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/(marketing)/
│   └── page.tsx                    # Homepage — composes all section components
├── components/
│   ├── layout/                     # [existing] Header, Footer, Breadcrumbs, MegaMenu, MobileNav
│   ├── sections/                   # [NEW] Reusable page sections
│   │   ├── hero-section.tsx        # Full-width hero with bg image + CTAs
│   │   ├── pillars-section.tsx     # Three-pillar overview grid
│   │   ├── stats-section.tsx       # Animated statistics counters
│   │   ├── featured-content-section.tsx  # Recent articles/content cards
│   │   ├── newsletter-section.tsx  # Newsletter signup form
│   │   └── contact-cta-section.tsx # Contact call-to-action banner
│   └── ui/
│       ├── number-ticker.tsx       # [NEW] Animated counter component
│       └── [existing shadcn components]
├── lib/
│   └── data/
│       └── home.ts                 # [existing] All homepage data already typed
└── hooks/
    └── use-scroll-header.ts        # [existing]
```

### Pattern 1: Section Component Pattern
**What:** Each homepage section is an independent React component that receives its data via imports (not props) from the co-located data files. Sections are composed vertically in the page component.
**When to use:** All homepage sections and future page sections across the site.
**Example:**
```typescript
// Source: Adapted from launch-ui Section pattern + project conventions
// src/components/sections/hero-section.tsx
"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { homeHero } from "@/lib/data/home";

export function HeroSection() {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <Image
        src={homeHero.backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-navy-900/70" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold sm:text-5xl md:text-6xl"
        >
          {homeHero.headline}
        </motion.h1>
        {/* ... CTAs */}
      </div>
    </section>
  );
}
```

### Pattern 2: Scroll-Triggered Animation with whileInView
**What:** Use motion's `whileInView` prop to trigger fade-in and stagger-reveal animations as sections scroll into view.
**When to use:** All major homepage sections below the fold.
**Example:**
```typescript
// Source: Context7 - motion.dev/docs/react-motion-component
"use client";

import { motion } from "motion/react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function PillarsSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {pillars.map((pillar) => (
        <motion.div key={pillar.name} variants={itemVariants}>
          {/* pillar card content */}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Pattern 3: NumberTicker Component (Animated Counter)
**What:** A self-contained component that animates from 0 to a target value using `useMotionValue`, `useSpring`, and `useInView` from `motion/react`. Triggers only once when scrolling into view.
**When to use:** Statistics/metrics section (HOME-03, VIS-05).
**Example:**
```typescript
// Source: Magic UI registry/magicui/number-ticker.tsx (adapted)
"use client";

import { useEffect, useRef, ComponentPropsWithoutRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  direction?: "up" | "down";
  delay?: number;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US").format(
            Math.round(latest)
          );
        }
      }),
    [springValue]
  );

  return (
    <span
      ref={ref}
      className={cn("inline-block tabular-nums", className)}
      {...props}
    >
      0
    </span>
  );
}
```

### Pattern 4: Hero Background Image with Next.js Image
**What:** Use `next/image` with `fill` prop inside a `relative` positioned container for optimized hero background images with a dark overlay.
**When to use:** Hero section (HOME-01, VIS-04).
**Example:**
```typescript
// Source: Context7 - next.js/docs/api-reference/components/image.mdx
<section className="relative h-[600px] overflow-hidden">
  <Image
    src="/images/stock/hero-refinery.jpg"
    alt=""
    fill
    priority
    sizes="100vw"
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 to-navy-900/60" />
  <div className="relative z-10">
    {/* Content on top of image */}
  </div>
</section>
```

### Pattern 5: Newsletter Form (Demo Mode)
**What:** Inline email form using shadcn Input + Button. Demo-mode only (no backend). Uses `e.preventDefault()` and shows a thank-you message via local state.
**When to use:** HOME-05 newsletter signup.
**Example:**
```typescript
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
      <Input
        type="email"
        placeholder="your@email.com"
        required
        disabled={submitted}
      />
      <Button type="submit" disabled={submitted}>
        {submitted ? "Subscribed!" : "Subscribe"}
      </Button>
    </form>
  );
}
```

### Anti-Patterns to Avoid
- **Monolithic page component:** Do NOT put all section markup in `page.tsx`. Each section is its own component file in `src/components/sections/`.
- **Prop drilling data:** Homepage data is imported directly from `@/lib/data/home` inside each section component, not passed through props from the page. This keeps the page component clean and sections self-contained.
- **Importing from `framer-motion`:** The project uses the `motion` package v12. Always import from `motion/react`, never from `framer-motion`.
- **Forgetting `"use client"` on animated components:** Any component using motion's hooks (`useInView`, `useMotionValue`, `useSpring`) or interactive state (`useState`) must be a Client Component.
- **Using `<img>` instead of `next/image`:** Always use the `Image` component from `next/image` for automatic optimization.
- **Animating too aggressively:** Keep animations subtle. Use `once: true` on viewport triggers so animations do not replay on scroll-back. Keep durations under 0.8s for fade-ins.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Animated number counter | Custom requestAnimationFrame counter | Magic UI NumberTicker pattern with `useMotionValue` + `useSpring` from `motion/react` | Spring physics look natural; automatic viewport triggering via `useInView`; handles decimal formatting |
| Scroll-triggered animations | Manual `IntersectionObserver` setup | `motion` `whileInView` prop or `useInView` hook | Declarative, handles cleanup, supports `once` option, works with variants for stagger |
| Background image overlay | CSS `background-image` with manual responsive handling | `next/image` with `fill` + CSS gradient overlay | Automatic WebP conversion, srcset generation, lazy loading, priority hints |
| Icon resolution from string names | Custom icon map component | `lucide-react` dynamic import or explicit icon mapping object | Lucide already installed; map icon string names from data to components |
| Form submission UX | Complex form library | Simple `useState` + `onSubmit` handler | Demo mode only -- no validation, no API calls, just visual feedback |

**Key insight:** This phase is almost entirely UI composition -- wiring existing data into existing component patterns with existing libraries. The complexity is in getting the visual design premium, not in solving technical problems.

## Common Pitfalls

### Pitfall 1: Hero Image Blocking Page Load
**What goes wrong:** Using a large hero image without optimization causes visible loading delay and layout shift.
**Why it happens:** Hero images are above the fold and block first paint if not handled correctly.
**How to avoid:** Use `priority` prop on the hero `Image` component (disables lazy loading), use `fill` with a `sizes="100vw"` hint so the browser picks the right srcset, and ensure the parent container has a fixed height (e.g., `h-[600px]`) to prevent layout shift.
**Warning signs:** Visible white flash before hero appears; CLS (Cumulative Layout Shift) in Lighthouse.

### Pitfall 2: Motion Animations on Server Components
**What goes wrong:** Using `motion.div` or motion hooks in a Server Component causes a build error.
**Why it happens:** Motion requires browser APIs (`IntersectionObserver`, `requestAnimationFrame`) and React state.
**How to avoid:** Always add `"use client"` directive at the top of any file that imports from `motion/react` or uses motion components.
**Warning signs:** Build error: "useRef is not defined" or "createContext is not a function".

### Pitfall 3: Animations Replaying on Every Scroll
**What goes wrong:** Users scroll past a section, scroll back up, then see the animation replay every time.
**Why it happens:** Default `whileInView` triggers every enter/leave cycle.
**How to avoid:** Set `viewport={{ once: true }}` on all `whileInView` animations so they trigger only once.
**Warning signs:** Animations feel jittery or distracting on repeated scrolling.

### Pitfall 4: NumberTicker Showing "0" Before Animation
**What goes wrong:** The counter briefly shows "0" before animating to the target value, looking broken.
**Why it happens:** Spring animation needs a frame to start; initial render shows the starting value.
**How to avoid:** This is expected behavior -- the "0" is intentional as the starting point. Ensure the animation triggers when in viewport, not on mount. Use `once: true` on `useInView`.
**Warning signs:** Counter appears to "flash" 0 then jump to the final value. If this happens, check spring damping/stiffness values -- reduce stiffness for smoother ramp-up.

### Pitfall 5: Icon String-to-Component Mapping
**What goes wrong:** The `homePillars` data uses string icon names like `"hard-hat"`, `"monitor"`, `"graduation-cap"` which don't resolve automatically.
**Why it happens:** Lucide exports named components (e.g., `HardHat`, `Monitor`, `GraduationCap`) -- there's no built-in string-to-component resolver.
**How to avoid:** Create a simple icon map object: `{ "hard-hat": HardHat, "monitor": Monitor, "graduation-cap": GraduationCap }` and look up icons from it.
**Warning signs:** TypeScript errors or missing icons at runtime.

### Pitfall 6: Breadcrumb Showing on Homepage
**What goes wrong:** The breadcrumb component from Phase 3 renders a breadcrumb bar on the homepage, which is unnecessary.
**Why it happens:** Breadcrumbs are in the marketing layout and render on all routes.
**How to avoid:** Check if the existing `Breadcrumbs` component already handles the root `/` route by hiding itself. If not, add a pathname check to suppress breadcrumbs on the homepage.
**Warning signs:** Breadcrumb bar showing "Home" on the homepage with no useful navigation.

## Code Examples

Verified patterns from official sources:

### whileInView with Stagger Children
```typescript
// Source: Context7 - motion.dev/docs/react-motion-component + motion.dev/docs/animate
import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

<motion.div
  variants={container}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-50px" }}
>
  {items.map((i) => (
    <motion.div key={i.id} variants={item}>
      {/* content */}
    </motion.div>
  ))}
</motion.div>
```

### Next.js Image as Hero Background
```typescript
// Source: Context7 - next.js/docs/api-reference/components/image.mdx
import Image from "next/image";

<section className="relative h-[600px] lg:h-[700px] overflow-hidden">
  <Image
    src="/images/stock/hero-refinery.jpg"
    alt=""
    fill
    priority
    sizes="100vw"
    style={{ objectFit: "cover" }}
  />
  {/* Gradient overlay for text readability */}
  <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/60 to-navy-900/80" />
</section>
```

### NumberTicker with useInView + useSpring
```typescript
// Source: Magic UI registry/magicui/number-ticker.tsx (design repo)
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

const ref = useRef<HTMLSpanElement>(null);
const motionValue = useMotionValue(0);
const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
const isInView = useInView(ref, { once: true, margin: "0px" });

useEffect(() => {
  if (isInView) {
    motionValue.set(targetValue);
  }
}, [isInView]);

useEffect(() =>
  springValue.on("change", (latest) => {
    if (ref.current) {
      ref.current.textContent = Math.round(latest).toString();
    }
  }),
  [springValue]
);
```

### shadcn Input Component Usage
```typescript
// Source: shadcn-ui-landing-page design repo Newsletter.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

<form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
  <Input
    type="email"
    placeholder="you@company.com"
    required
    className="bg-muted/50"
    aria-label="Email address"
  />
  <Button type="submit">Subscribe</Button>
</form>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package | `motion` package (import from `motion/react`) | 2024 rebrand | Same API, new package name; this project already uses `motion` v12 |
| CSS `background-image` for heroes | `next/image` with `fill` prop | Next.js 13+ | Automatic optimization, WebP, responsive srcsets |
| `IntersectionObserver` + custom hooks | `whileInView` prop on motion components | motion v10+ | Declarative, one-line viewport animation triggering |
| `react-countup` for number animations | `useMotionValue` + `useSpring` + `useInView` | motion v10+ | No extra dependency; spring physics; consistent animation library |

**Deprecated/outdated:**
- `framer-motion` package name: Renamed to `motion`. Still works but the project correctly uses `motion`.
- `next/legacy/image`: Replaced by current `next/image` with `fill` prop instead of `layout="fill"`.
- Manual `IntersectionObserver` for scroll animations: Replaced by `whileInView` and `useInView` in motion library.

## Open Questions

1. **Responsive hero height**
   - What we know: Desktop heroes typically use `h-[600px]` to `h-[700px]`. Mobile can be taller due to wrapping text.
   - What's unclear: Exact height that works well with the Kenexis headline length across all breakpoints.
   - Recommendation: Use `min-h-[500px] lg:h-[650px]` with flexbox centering so content determines minimum height on mobile.

2. **Newsletter form submission feedback**
   - What we know: This is demo mode only -- no real API endpoint.
   - What's unclear: Whether to show an inline success message, a toast, or just disable the button.
   - Recommendation: Simple inline state change -- button text changes to "Subscribed!" and input disables. Minimal, no toast library needed.

3. **Featured content thumbnails**
   - What we know: `homeFeaturedContent` data has no `image` field. HOME-04 mentions "dates and thumbnails."
   - What's unclear: Whether to add stock images to the content feed or use icon/category badges instead.
   - Recommendation: Use category-colored badges/icons as visual elements since no per-article images exist in the scraped data. This is honest to the real content.

## Sources

### Primary (HIGH confidence)
- Context7 `/websites/motion_dev` - whileInView, useInView, useMotionValue, useSpring, stagger, variants
- Context7 `/vercel/next.js/v16.1.6` - Image component fill prop, priority, sizes, background image pattern
- Magic UI design repo `registry/magicui/number-ticker.tsx` - NumberTicker component pattern using motion/react hooks

### Secondary (MEDIUM confidence)
- launch-ui design repo `components/sections/` - Hero, Stats, CTA, Items section patterns and structure
- shadcn-ui-landing-page design repo `components/` - Newsletter form, Statistics, Services, CTA patterns

### Tertiary (LOW confidence)
- None. All findings verified against official docs or design repo source code.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and verified via Context7; only `input` component needs adding via CLI
- Architecture: HIGH - Section component pattern proven in Phase 3 (header, footer); design repos provide clear templates
- Pitfalls: HIGH - All pitfalls verified against actual project code and Context7 documentation
- Animation patterns: HIGH - Verified `motion/react` imports, `whileInView`, `useInView`, `useSpring` via Context7

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (30 days -- stable domain, all libraries pinned)
