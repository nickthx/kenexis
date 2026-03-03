# Stack Research

**Domain:** Premium B2B engineering consultancy marketing website (static)
**Researched:** 2026-03-03
**Confidence:** HIGH

## Decision: Next.js 15 (not 16)

Next.js 16.1.6 is the latest version, but **this project should use Next.js 15** (latest 15.5.x). Rationale:

1. **Next.js 16 has significant breaking changes** -- middleware renamed to proxy, async request APIs fully enforced, Turbopack is default (webpack config breaks builds), `next lint` removed entirely, ESLint flat config default, numerous `next/image` breaking changes.
2. **shadcn/ui ecosystem maturity** -- The vast majority of shadcn/ui examples, 21st.dev components, and community templates target Next.js 15. Using v16 means fighting compatibility issues in a presentation-focused project.
3. **This is a pitch demo, not a long-term product** -- Stability and speed of development trump being on the bleeding edge. Next.js 15 is fully stable, battle-tested, and will receive security patches through its support window.
4. **React 19 support is solid in Next.js 15** -- We get React 19 features without the churn of v16's async parameter changes.

**Confidence: HIGH** -- Verified via official Next.js upgrade guide, npm registry, and shadcn/ui compatibility docs.

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | ^15.5.12 | React framework, SSG, routing, image optimization | Industry standard for React sites. App Router provides file-based routing, built-in metadata API for SEO, next/image for automatic image optimization. SSG output gives perfect Lighthouse scores. Deploying to Vercel (its creator) means zero-config deployment. |
| React | ^19.2.4 | UI rendering | Latest stable. Required by Next.js 15. Server Components reduce client JS bundle. |
| TypeScript | ^5.9.3 | Type safety | Non-negotiable for any 2026 project. Catches bugs at build time, enables IDE autocompletion, self-documents component props. |
| Tailwind CSS | ^4.2.1 | Utility-first CSS | v4 is production-stable since Jan 2025. Up to 5x faster builds via Oxide engine. CSS-first configuration (no tailwind.config.js needed). shadcn/ui requires it. |
| shadcn/ui | latest CLI | Component system | Not a package -- it's a CLI that copies component source into your project. Full ownership, full customization. Built on Radix UI primitives for accessibility. All components updated for Tailwind v4 + React 19. |

### Animation & Interaction

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| motion (React) | ^12.34.5 | Scroll animations, page transitions, micro-interactions | The `motion` package is the renamed successor to `framer-motion`. Same API, same team, now framework-agnostic. Install `motion` not `framer-motion`. Provides `useScroll`, `useInView`, `AnimatePresence` for professional scroll-triggered animations. The standard animation library for React in 2026. |
| tw-animate-css | ^1.4.0 | CSS animation utilities for shadcn/ui components | Replaces deprecated `tailwindcss-animate`. Required by shadcn/ui for accordion, dialog, and dropdown animations. Import in CSS, not a plugin. |

### Component Sources

| Source | Type | Purpose | When to Use |
|--------|------|---------|-------------|
| shadcn/ui | CLI-installed components | Base components (Button, Card, Dialog, Sheet, NavigationMenu, etc.) | Foundation for all UI. Use `npx shadcn@latest add [component]` |
| 21st.dev | CLI-installed premium components | Hero sections, feature grids, pricing tables, testimonials, CTAs | Premium pre-built sections. Use `npx shadcn@latest add "https://21st.dev/r/{author}/{component}"`. 730+ production-ready components. All MIT licensed, free. |
| ~/design-repos/launch-ui | Local reference repo | Hero sections, CTAs, testimonials, landing page patterns | Copy and adapt patterns. Reference for section layouts and composition. |
| ~/design-repos/magicui | Local reference repo | Animated components (text animations, backgrounds, interactive effects) | Reference for scroll effects, particle backgrounds, animated counters. |
| ~/design-repos/shadcn-ui-landing-page | Local reference repo | Full landing page layouts | Reference for page structure and section ordering. |

### Icons & Typography

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| lucide-react | ^0.576.0 | Icon library | Default icon library for shadcn/ui. Tree-shakeable, consistent 24x24 grid, 1500+ icons. Includes industry-relevant icons (Shield, Factory, Gauge, etc.). |
| Inter font | via next/font | Primary typeface | Already specified in design direction. next/font/google auto-optimizes: zero layout shift, subset loading, self-hosted (no external Google Fonts request). |

### SEO & Metadata

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js Metadata API | built-in | Page titles, descriptions, Open Graph, Twitter cards | Built into App Router. Export `metadata` object or `generateMetadata()` function per page. No extra packages needed. Handles OG images, canonical URLs, robots directives natively. |
| next-sitemap | ^4.2.3 | XML sitemap + robots.txt generation | Automates sitemap creation at build time. Critical for SEO on a 30+ page site. Generates both sitemap.xml and robots.txt. |
| JSON-LD structured data | manual | Rich search results (Organization, Service, LocalBusiness schemas) | Implement as `<script type="application/ld+json">` in Server Components. No package needed -- embed directly. Enables rich snippets in Google (company info, services, reviews). |

### Image Optimization

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| next/image | built-in | Automatic image optimization, lazy loading, responsive sizing | Automatic WebP/AVIF conversion, responsive srcset, lazy loading, blur placeholders. On Vercel, optimization happens at the edge with zero config. |
| sharp | ^0.34.5 | Build-time image processing | Required by next/image for local image optimization during build. Auto-installed by Next.js but pin it explicitly for reproducible builds. |

### Deployment & Analytics

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Vercel | platform | Hosting, CDN, image optimization | Created by Next.js team. Zero-config deployment. Free tier is sufficient for a demo/pitch site. Automatic preview deployments per git push. Global CDN. |
| @vercel/analytics | ^1.6.1 | Privacy-friendly page view tracking | Lightweight, no-cookie analytics. Shows which pages the prospect (Ed Marszal) visits. Free tier included with Vercel Hobby plan. |
| @vercel/speed-insights | ^1.3.1 | Core Web Vitals monitoring | Real-user performance metrics (LCP, FID, CLS). Proves the site is fast. Free tier included. |

### Utility Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx | ^2.1.1 | Conditional class name joining | Use everywhere you conditionally apply classes. Tiny (228B). |
| tailwind-merge | ^3.5.0 | Intelligent Tailwind class merging | Resolves conflicting Tailwind classes (e.g., `px-4` + `px-2` = `px-2`). Used in shadcn/ui's `cn()` utility. |
| class-variance-authority | ^0.7.1 | Component variant management | Define typed component variants (size, color, state). Used by shadcn/ui Button, Badge, etc. |
| @radix-ui/react-slot | ^1.2.4 | Polymorphic component composition | Used by shadcn/ui for asChild pattern. Installed as shadcn/ui dependency. |
| embla-carousel-react | ^8.6.0 | Carousel/slider component | Only if needed for testimonial carousels or image galleries. Lightweight, accessible, touch-friendly. Used by shadcn/ui Carousel component. |
| next-themes | ^0.4.6 | Dark/light mode toggle | Only if dark mode is desired. Handles system preference detection and theme persistence. Note: for this project, likely unnecessary -- B2B industrial sites rarely need dark mode. |

### Development Tools

| Tool | Version | Purpose | Notes |
|------|---------|---------|-------|
| ESLint | ^10.0.2 | Code linting | Next.js 15 includes `next lint` command with `eslint-config-next`. Use flat config format. |
| Prettier | ^3.8.1 | Code formatting | Use `prettier-plugin-tailwindcss` to auto-sort Tailwind classes. |
| prettier-plugin-tailwindcss | latest | Tailwind class sorting | Sorts utility classes in the official recommended order. Reduces diff noise in PRs. |

---

## Installation

```bash
# Initialize Next.js project with latest 15.x
npx create-next-app@15 kenexis-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Core dependencies (most already included by create-next-app)
npm install motion clsx tailwind-merge class-variance-authority lucide-react

# SEO
npm install next-sitemap

# Analytics (optional but recommended for pitch)
npm install @vercel/analytics @vercel/speed-insights

# Animation CSS for shadcn/ui
npm install tw-animate-css

# Dev dependencies
npm install -D prettier prettier-plugin-tailwindcss @types/node

# Initialize shadcn/ui
npx shadcn@latest init

# Add base components
npx shadcn@latest add button card dialog sheet navigation-menu separator badge accordion tabs

# Add 21st.dev premium components (examples)
npx shadcn@latest add "https://21st.dev/r/[author]/[hero-component]"
```

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js 15 | Next.js 16 | Too many breaking changes for a pitch demo. v16 renames middleware, removes `next lint`, changes image defaults, enforces async params. All pain, no gain for a static site. |
| Framework | Next.js 15 | Astro | Astro is excellent for static sites, but this project requires React component ecosystem (shadcn/ui, 21st.dev, motion). Astro's React integration adds complexity. The team knows Next.js. |
| Framework | Next.js 15 | Remix/React Router v7 | Remix is server-focused. No advantage for a fully static marketing site. Smaller ecosystem. |
| CSS | Tailwind CSS v4 | Tailwind CSS v3 | v4 is stable and significantly faster. shadcn/ui CLI now defaults to v4. No reason to use v3 for a new project. |
| Animation | motion | GSAP | GSAP is more powerful for complex timeline animations but overkill for scroll-triggered fades and slides. motion integrates natively with React component lifecycle. GSAP requires manual cleanup. |
| Animation | motion | CSS-only animations | Insufficient for scroll-triggered, staggered, or physics-based animations. CSS @keyframes work for simple hovers but not professional scroll choreography. |
| Animation | motion | react-spring | Smaller community, less maintained. motion has 20x the user base and better documentation. |
| Icons | lucide-react | react-icons | react-icons bundles entire icon sets, inflating bundle size. lucide-react is tree-shakeable and is shadcn/ui's default. |
| Icons | lucide-react | Heroicons | Good library but smaller set. lucide-react has more icons and is the shadcn/ui ecosystem default. |
| Deployment | Vercel | Netlify | Both work for static sites. Vercel has first-class Next.js support (they build it), better image optimization, and the project spec requires Vercel. |
| Deployment | Vercel | Cloudflare Pages | Cloudflare lacks native next/image support. Requires @cloudflare/next-on-pages workarounds. Not worth the complexity for a demo. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `framer-motion` package | Deprecated package name. Still works but receives no new features. The library was renamed to `motion` in 2024. | `motion` (same API, same team, new package name) |
| `tailwindcss-animate` | Deprecated by shadcn/ui in favor of `tw-animate-css` for Tailwind v4 compatibility. Plugin-based approach incompatible with v4's CSS-first config. | `tw-animate-css` (CSS import, not a plugin) |
| `tailwind.config.js` | Tailwind v4 uses CSS-first configuration. JS config files are legacy. | `@theme` directive in your CSS file |
| CMS (Contentful, Sanity, Strapi) | Explicitly out of scope. This is a static pitch demo. Adding a CMS adds deployment complexity, API keys, and build-time data fetching for zero benefit. | Hardcoded content in TypeScript files/constants |
| Database (Supabase, Postgres) | No dynamic data. No user accounts. No forms that save to DB. | Static content, mailto: links or external form services |
| `next-seo` package | Redundant since Next.js 13+. The App Router's built-in Metadata API does everything `next-seo` does, natively. | Next.js Metadata API (export `metadata` from page.tsx) |
| Styled Components / CSS Modules | Tailwind CSS is the styling system. Mixing paradigms creates inconsistency and increases bundle size. | Tailwind CSS utility classes exclusively |
| React Query / SWR | No client-side data fetching needed. All content is static/hardcoded. These add unnecessary client JS. | Static data in TypeScript constants |
| Redux / Zustand | No global state management needed for a marketing site. | React's built-in useState/useContext if needed (unlikely) |
| jQuery | It's 2026. | Nothing. React handles DOM. |
| Bootstrap / Material UI | Conflict with Tailwind. Different design language. shadcn/ui is the component system. | shadcn/ui + Tailwind CSS |
| Webpack custom config | Next.js 15 uses Turbopack for dev by default. Custom webpack configs add complexity and break Turbopack. | Default Next.js bundler configuration |

---

## Stack Patterns by Variant

**If adding a contact form:**
- Use a static form service (Formspree, Netlify Forms, or Web3Forms) that works via POST without a backend
- Do NOT add a database or API route just for one form
- Progressive enhancement: form works without JS

**If adding dark mode:**
- Use `next-themes` for system preference detection
- Ensure all shadcn/ui CSS variables have dark variants
- B2B industrial sites rarely benefit from dark mode -- skip unless specifically requested

**If deploying to non-Vercel:**
- Use `output: 'export'` in next.config.ts for full static HTML export
- Replace next/image with standard `<img>` tags or use a CDN image service
- next-sitemap still works with static export

**If upgrading to Next.js 16 later:**
- Run `npx @next/codemod@canary upgrade latest` to automate migration
- Key changes: rename middleware.ts to proxy.ts, make all params/searchParams async, update ESLint to flat config
- Test all image configurations (defaults changed)

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next@15.5.x | react@19.x, react-dom@19.x | Next.js 15 requires React 19 |
| next@15.5.x | typescript@5.x | Minimum TS 5.0, recommend 5.9+ |
| tailwindcss@4.x | next@15.5.x | Works via PostCSS or @tailwindcss/vite. Next.js uses PostCSS by default. |
| shadcn/ui CLI | tailwindcss@4.x, react@19.x | CLI auto-detects Tailwind version and generates appropriate code |
| motion@12.x | react@19.x | Full React 19 support confirmed |
| tw-animate-css@1.x | tailwindcss@4.x | Designed specifically for Tailwind v4's CSS-first approach |
| lucide-react@0.576.x | react@19.x | Compatible with React 19 |
| next-sitemap@4.x | next@15.x | Generates sitemap during `next build` postbuild script |

---

## CSS Architecture (Tailwind v4 + shadcn/ui)

The CSS setup for this project follows shadcn/ui's Tailwind v4 pattern:

```css
/* globals.css */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: hsl(210 40% 98%);
  --foreground: hsl(222 84% 5%);
  --primary: hsl(222 84% 8%);      /* Navy: #0a1628 */
  --primary-foreground: hsl(0 0% 100%);
  --accent: hsl(24 82% 53%);        /* Orange: #e87722 */
  --accent-foreground: hsl(0 0% 100%);
  /* ... full shadcn/ui variable set ... */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  /* ... map all CSS variables to Tailwind theme ... */
}
```

This approach:
- Uses CSS variables for the navy/orange brand palette
- Maps them through `@theme inline` so Tailwind classes like `bg-primary` and `text-accent` work
- No `tailwind.config.js` file needed
- Dark mode variant available if needed later

---

## Sources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16) -- Official docs, verified 2026-02-27. Used to confirm v16 breaking changes and justify v15 recommendation. **HIGH confidence.**
- [shadcn/ui Tailwind v4 Guide](https://ui.shadcn.com/docs/tailwind-v4) -- Official shadcn/ui docs. Confirmed tw-animate-css migration, @theme inline pattern, data-slot attributes. **HIGH confidence.**
- [shadcn/ui Changelog](https://ui.shadcn.com/docs/changelog) -- Confirmed CLI 3.0, RTL support, Base UI additions. **HIGH confidence.**
- [21st.dev GitHub](https://github.com/serafimcloud/21st) -- Confirmed 730+ components, MIT license, shadcn CLI integration. **HIGH confidence.**
- [Tailwind CSS v4 Release](https://tailwindcss.com/blog/tailwindcss-v4) -- Confirmed CSS-first config, Oxide engine performance, stable since Jan 2025. **HIGH confidence.**
- [Motion Upgrade Guide](https://motion.dev/docs/react-upgrade-guide) -- Confirmed framer-motion to motion rename, API compatibility. **HIGH confidence.**
- [Next.js Metadata API](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) -- Confirmed built-in SEO capabilities, OG image generation. **HIGH confidence.**
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) -- Confirmed server-side script tag approach for structured data. **HIGH confidence.**
- [Vercel Image Optimization](https://vercel.com/docs/image-optimization) -- Confirmed zero-config image optimization for Next.js on Vercel. **HIGH confidence.**
- [B2B Web Design Trends 2026](https://www.windmillstrategy.com/top-9-b2b-web-design-trends/) -- Design patterns for industrial B2B sites. **MEDIUM confidence** (industry blog, not official docs).
- npm registry (via `npm view`) -- All version numbers verified directly against npm registry on 2026-03-03. **HIGH confidence.**

---
*Stack research for: Kenexis Website Redesign -- Premium B2B Engineering Consultancy Marketing Site*
*Researched: 2026-03-03*
