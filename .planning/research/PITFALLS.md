# Pitfalls Research

**Domain:** Next.js static marketing site redesign (B2B process safety consultancy, ~20+ pages, pitch demo)
**Researched:** 2026-03-03
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Using `output: "export"` When Deploying to Vercel

**What goes wrong:**
Developers assume a "static marketing site" means they should use Next.js static export (`output: "export"` in next.config.js). This disables the default `next/image` optimizer, rewrites, redirects, headers, ISR, and middleware. You then need a custom image loader (Cloudinary, Imgix) or must serve unoptimized images. On Vercel, this is completely unnecessary -- Vercel runs a full Next.js server by default, including on-demand image optimization.

**Why it happens:**
Mental model confusion. "Static site" in content terms (no CMS, no database, hardcoded content) is conflated with "static export" in Next.js terms. The project has no dynamic data, so developers reach for `output: "export"` instinctively.

**How to avoid:**
Do NOT set `output: "export"`. Deploy to Vercel as a standard Next.js app. All pages will still be statically generated at build time (SSG is the default for pages without dynamic data fetching), but you retain the full Next.js image optimizer, middleware, rewrites, and headers. You get the best of both worlds: static pages with server-side image optimization.

**Warning signs:**
- `next/image` throwing errors about needing a custom loader
- Configuration for Cloudinary/Imgix when using Vercel
- `output: "export"` in next.config.js

**Phase to address:**
Project scaffolding / initial setup. This must be correct from day one.

---

### Pitfall 2: Framer Motion Forcing Entire Page Trees Into Client Components

**What goes wrong:**
Framer Motion requires the `"use client"` directive because it uses browser APIs. Developers wrap large page sections or even layout components with motion elements, causing entire component subtrees to become client-rendered. This balloons the JavaScript bundle, kills SSG benefits, and degrades Largest Contentful Paint (LCP) and Time to Interactive (TTI).

**Why it happens:**
The `"use client"` directive in Next.js App Router is a boundary -- everything imported by a client component also becomes client-side. Developers add `motion.div` wrappers around content sections without realizing they are pulling all child components (including text-heavy, static content) into the client bundle.

**How to avoid:**
1. Keep page-level components as Server Components. Extract ONLY the animated wrapper into a tiny Client Component that accepts `children` as a prop.
2. Use the `LazyMotion` + `m` component pattern to reduce Motion's bundle to ~4.6KB instead of the full ~32KB.
3. Animate only `transform` and `opacity` properties (GPU-composited) -- never animate `width`, `height`, `top`, `left`, or `padding`.
4. For scroll-triggered animations, create a single reusable `<AnimateOnScroll>` client component that wraps server-rendered children.

```tsx
// Good: Thin client wrapper, children stay server-rendered
"use client";
import { motion } from "framer-motion";

export function FadeInOnScroll({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
```

```tsx
// Bad: Entire page section is now a client component
"use client";
import { motion } from "framer-motion";

export function HeroSection() {
  // All this static content is now client-rendered
  return (
    <motion.section>
      <h1>Process Safety Engineering</h1>
      <p>Long paragraph of content...</p>
      <ServiceGrid /> {/* Also becomes client-side */}
      <TestimonialsCarousel /> {/* Also becomes client-side */}
    </motion.section>
  );
}
```

**Warning signs:**
- Client-side JS bundle exceeding 150KB on marketing pages
- Lighthouse reporting poor TTI or TBT scores
- `"use client"` on files that contain mostly static text/layout
- Page content flickering or flashing on initial load

**Phase to address:**
Component architecture phase. Establish the animation wrapper pattern before building any page sections.

---

### Pitfall 3: Scraped Content Becoming Stale or Breaking Silently

**What goes wrong:**
Content scraped from the live kenexis.com is a point-in-time snapshot. WordPress sites change constantly: pages get updated, images move to new URLs, team members join or leave, product names change. Scraped HTML contains WordPress-specific markup (shortcodes, plugin artifacts, weird class names) that does not translate cleanly to React components. Images referenced by URL may use WordPress CDN paths that return 404 or get hotlink-blocked.

**Why it happens:**
Scraping captures raw HTML, not semantic content. WordPress themes inject extensive wrapper divs, inline styles, and plugin-generated markup. Image paths may be relative, CDN-hosted, or behind lazy-loading attributes (`data-src` instead of `src`). Team photos may be served from WordPress media library URLs that rate-limit or block external referrers.

**How to avoid:**
1. Download ALL images locally during the scrape phase. Store them in `/public/images/` with organized subdirectories (`/team/`, `/services/`, `/software/`). Never hotlink to kenexis.com.
2. Extract text content only -- strip all WordPress markup. Re-compose content into clean React components manually. Do not try to render scraped HTML directly.
3. Normalize all image URLs before download: handle relative paths, CDN variants, `data-src` lazy-load attributes, and srcset variants.
4. Create a content manifest (JSON/TS files) mapping each page's content, so there is a single source of truth for all scraped data.
5. Screenshot every current kenexis.com page before starting, as a reference for content fidelity verification.

**Warning signs:**
- Broken images (404s) when viewing the built site
- WordPress shortcodes like `[gallery]` or `[contact-form-7]` appearing as raw text
- Inline styles from WordPress theme bleeding into Tailwind-styled components
- Team member photos not loading or showing wrong dimensions

**Phase to address:**
Content scraping should be its own dedicated phase, completed BEFORE any page building begins. Pages should consume structured data files, not raw HTML.

---

### Pitfall 4: Image Optimization Failures With External Stock Photos

**What goes wrong:**
The project uses Unsplash/Pexels stock photos for hero sections and industrial imagery. Without proper `remotePatterns` configuration in `next.config.js`, `next/image` throws "Un-configured Host" errors. Even with correct config, external images require explicit `width` and `height` props (Next.js cannot introspect remote image dimensions at build time). Missing dimensions cause layout shift (poor CLS scores). Using `fill` prop without a sized container causes images to collapse to 0px.

**Why it happens:**
`next/image` strictly validates remote image sources for security. Each hostname needs an explicit entry in `remotePatterns` -- and the matching is exact and case-sensitive (`images.unsplash.com` is different from `unsplash.com`). Developers configure one hostname and miss others (Pexels has multiple CDN subdomains). The `fill` prop requires the parent element to have `position: relative` and explicit dimensions.

**How to avoid:**
1. Download stock photos locally instead of hotlinking. Store in `/public/images/heroes/` and `/public/images/sections/`. This eliminates all remote image configuration, ensures build-time availability, and avoids Unsplash/Pexels rate limits.
2. If using remote images, configure ALL required hostnames upfront:
```js
// next.config.js
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "images.pexels.com" },
    // Also the kenexis domain for scraped team photos
    { protocol: "https", hostname: "kenexis.com" },
    { protocol: "https", hostname: "www.kenexis.com" },
  ],
}
```
3. Always provide explicit `width` and `height` for remote images, or use `fill` with a properly sized parent container.
4. Generate `blurDataURL` placeholders for hero images to prevent layout shift during load.

**Warning signs:**
- "Un-configured Host" errors in dev or build
- Images showing as broken boxes in production
- Cumulative Layout Shift (CLS) over 0.1 in Lighthouse
- Hero sections showing blank/collapsed areas before images load

**Phase to address:**
Project scaffolding (next.config.js) and image strategy must be decided in the first phase. Recommend downloading all images locally.

---

### Pitfall 5: Missing or Duplicate SEO Metadata Across 20+ Pages

**What goes wrong:**
With 20+ pages, developers either forget per-page metadata entirely (relying on a single root layout metadata), copy-paste the same title/description across pages, or fail to set `metadataBase` causing OG images to use relative URLs that social platforms cannot fetch. For a pitch demo being shared with a company president, a broken social preview when sharing the Vercel URL is embarrassing.

**Why it happens:**
SEO metadata is invisible during development -- you do not see it until you inspect the HTML source or share a link on LinkedIn/Slack. With many pages to build, metadata becomes an afterthought. Next.js App Router's metadata API requires `metadataBase` in the root layout for OG images to work correctly, but this is not obvious.

**How to avoid:**
1. Set `metadataBase` in root layout.tsx immediately:
```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://your-vercel-url.vercel.app"),
};
```
2. Create a metadata utility function that generates per-page metadata from a standard template:
```tsx
export function createPageMeta(title: string, description: string): Metadata {
  return {
    title: `${title} | Kenexis`,
    description,
    openGraph: { title, description },
  };
}
```
3. Export metadata from EVERY page.tsx and layout.tsx. No page should rely solely on parent layout metadata.
4. Use the `title.template` pattern in root layout: `title: { template: "%s | Kenexis", default: "Kenexis - Process Safety Solutions" }`.
5. Add OG image generation or static OG images for the key pages (home, services, software).

**Warning signs:**
- Multiple pages showing the same `<title>` tag in browser tabs
- Sharing the Vercel URL on Slack/LinkedIn shows no preview or generic text
- OG images returning 404 in social preview debuggers
- No `sitemap.xml` or `robots.txt` in the build output

**Phase to address:**
SEO metadata should be part of the page layout/template system, established before individual pages are built. Verification should happen in a final QA phase.

---

### Pitfall 6: Page Transitions Breaking in Next.js App Router

**What goes wrong:**
Developers attempt full page transition animations (fade out old page, fade in new page) using Framer Motion's `AnimatePresence`. In the App Router, this fundamentally does not work as expected because the router updates `LayoutRouterContext` during navigation, causing components to unmount and remount abruptly before exit animations can complete. The result is jarring transitions, flickering, or no animation at all.

**Why it happens:**
The Pages Router had a clear component lifecycle that AnimatePresence could hook into. The App Router's streaming architecture and concurrent rendering model breaks this pattern. This is a known, long-standing issue (GitHub Discussion #42658 has hundreds of comments). Workarounds exist but are fragile.

**How to avoid:**
1. Do NOT attempt full page transitions. For a 20+ page marketing site, they add complexity without meaningful UX value. B2B decision-makers care about content, not page animation flourishes.
2. Instead, use scroll-triggered entrance animations (`whileInView`) on individual sections. These work perfectly in App Router and provide the premium feel without the fragility.
3. If page transitions are truly desired, use the `template.tsx` file convention with a simple opacity fade, not full AnimatePresence exit animations.
4. Consider the CSS View Transitions API as a simpler alternative for basic cross-page fades.

**Warning signs:**
- AnimatePresence `onExitComplete` never firing
- Pages flashing white during navigation
- Content from old page visible briefly alongside new page
- Console warnings about LayoutRouterContext

**Phase to address:**
Animation strategy must be decided during component architecture. "No page transitions, yes scroll animations" should be a documented decision.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Using `<img>` instead of `next/image` | No config needed, images just work | No optimization, poor Core Web Vitals, large image downloads on mobile | Never -- `next/image` with local files is trivial to set up |
| Hardcoding content strings in JSX | Fast page development, no data layer | Content updates require finding strings across 20+ component files | Acceptable for pitch demo IF content is organized into const objects at top of files. Prefer separate data files. |
| Using full `motion` import instead of `LazyMotion` + `m` | Simpler API, less boilerplate | ~28KB extra JS in bundle, slower initial load | Acceptable for pitch demo if total bundle stays under 200KB JS |
| Copy-pasting component sections between pages | Fastest way to build 20 similar pages | Changing header/footer/CTA requires editing every page | Never -- extract shared sections into reusable components from the start |
| Inline Tailwind classes 50+ classes deep | Quick visual iteration | Unreadable markup, hard to maintain consistent spacing/colors | Acceptable IF using @apply or cn() utility to compose. Create design tokens for colors/spacing. |
| Skipping responsive testing until end | Build desktop fast, fix mobile later | Fundamental layout assumptions baked in, mobile rework is painful | Never -- test mobile at each component level, not at the end |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| 21st.dev components | Installing via npx without checking peer dependencies; assuming components match your Tailwind config | Run the install command, then verify the component works with your color palette and typography. 21st.dev components may use different CSS variables or Tailwind theme extensions than your project. Audit and adapt after installing. |
| shadcn/ui init | Running `npx shadcn@latest init` on a project with existing Tailwind config and getting path resolution errors | Ensure `tsconfig.json` has `"@/*": ["./*"]` path alias. Ensure both `tailwind.config.ts` and `next.config.ts` exist before init. Use `-d` flag for defaults. |
| Unsplash/Pexels images | Using the browser URL instead of the direct image URL (e.g., `unsplash.com/photos/abc` vs `images.unsplash.com/photo-abc`) | Use the direct CDN image URL. Better yet, download the images locally to `/public/` to avoid all remote configuration. |
| WordPress content scraping | Using a generic scraper that grabs full HTML including nav, footer, sidebars, ads | Target specific content selectors. WordPress typically uses `article`, `.entry-content`, or `.post-content` for main content. Inspect the kenexis.com markup structure first. |
| Vercel deployment | Forgetting to set environment variables or `metadataBase` to the actual Vercel URL (which is not known until first deploy) | Deploy once to get the URL, then update `metadataBase` and redeploy. Or use `VERCEL_URL` env var: `metadataBase: new URL(\`https://${process.env.VERCEL_URL}\`)` |
| Inter font loading | Using a Google Fonts `<link>` tag instead of `next/font` | Use `next/font/google` to load Inter. This enables automatic font optimization, self-hosting, and eliminates layout shift from font loading. |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Animating non-composited CSS properties | Scroll jank, dropped frames, high CPU usage on mobile | Only animate `transform` (translate, scale, rotate) and `opacity`. Use `will-change: transform` sparingly. | Noticeable on mid-range mobile devices immediately; desktop may mask the issue |
| Too many simultaneous scroll-triggered animations | Page stutters during scroll, especially on pages with 8+ animated sections | Use `viewport: { once: true }` so animations only fire once. Stagger animations with delays. Limit to 3-4 animated sections per page. | Noticeable on pages with 6+ animated elements in viewport simultaneously |
| Unoptimized hero images (2000x1500+ stock photos) | 3-5 second LCP, blank hero area during load | Use `next/image` with `priority` prop on above-the-fold hero images. Size images to actual display dimensions. Use WebP/AVIF format. | Immediately on mobile connections (3G/4G); Lighthouse will flag this on first audit |
| Loading all 20+ pages of content in shared layout | Large initial JS payload, slow navigation | Each page should be its own route segment with isolated data. Use dynamic imports for heavy components (charts, maps, interactive demos). | When total JS bundle exceeds 300KB; Lighthouse TTI degrades noticeably |
| Excessive Tailwind CSS utility combinations without JIT | CSS bundle grows beyond 50KB | Tailwind v4 uses JIT by default, so this is auto-handled. Ensure content paths in tailwind config cover all component files. Verify no dynamic class construction like `` `text-${color}-500` `` which JIT cannot detect. | Rarely an issue with Tailwind v3+ JIT, but dynamic class names silently break |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing the pitch demo URL publicly before it is ready | Kenexis staff see an incomplete/broken demo, damages credibility of the pitch | Use Vercel's password protection (Pro plan) or deploy to a non-obvious URL. Do not share until QA is complete. |
| Hotlinking to kenexis.com images in production | Kenexis server logs show unknown referer hitting their images; looks like scraping/theft rather than a professional pitch | Download all images locally. Never reference kenexis.com assets directly from the demo site. |
| Hardcoding real email addresses or phone numbers in forms that actually submit | Accidental form submissions to real Kenexis contact channels from a demo site | Make all forms non-functional in the demo. Use `onSubmit={(e) => e.preventDefault()}` with a toast message like "Demo mode - form not connected." |
| Including scraped internal/admin content | Pages or links that reference WordPress admin, internal tools, or staff-only resources appearing on the demo | Audit all scraped content. Remove any links to wp-admin, internal dashboards, or staging URLs. |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Animations that delay content visibility | Edward Marszal (the target viewer) has to wait for fade-in animations before reading content. Engineers value efficiency over flourish. | Keep animations fast (300-500ms max). Use `once: true` so revisited sections show instantly. No animation on critical above-the-fold content. |
| Inconsistent navigation across 20+ pages | User gets lost, pages feel disconnected, some pages missing from nav | Build the navigation component first with ALL pages mapped. Use a shared layout with sticky header. Test the full nav flow before building page content. |
| Missing hover/focus states on interactive elements | CTAs and links feel dead/unresponsive, reduces perceived quality | shadcn/ui provides hover states by default. Verify all custom buttons, cards, and links have visible hover, focus, and active states. |
| Content layout breaking at tablet widths (768-1024px) | The pitch may be viewed on an iPad or laptop with narrow browser window | Test at 768px, 1024px, and 1280px explicitly. Tailwind's `md:` breakpoint (768px) is where most marketing layouts break. Do not assume desktop (lg:) and mobile (sm:) covers everything. |
| Hero images with text overlay unreadable on certain stock photos | Light-colored industrial photos make white text invisible | Always use a dark gradient overlay on hero images. Test with multiple stock photo options. Use `bg-gradient-to-t from-black/70` or similar. |
| Footer/header inconsistency between pages | Some pages have different footers or missing CTAs, feels like an incomplete site | Build header and footer as layout-level components. Every page inherits them automatically via the root layout.tsx. |

## "Looks Done But Isn't" Checklist

- [ ] **Metadata:** Every page has unique `<title>` and `<meta description>` -- inspect with View Source, not just visual appearance
- [ ] **OG images:** Share the Vercel URL on Slack/LinkedIn -- does a proper preview card appear with image, title, description?
- [ ] **Mobile responsive:** Test EVERY page at 375px width (iPhone SE), not just the homepage
- [ ] **Navigation:** Click every nav link and verify it goes to the correct page. Test the mobile hamburger menu on actual mobile viewport.
- [ ] **Images loading:** Check the Network tab -- are any images 404ing? Are hero images loading in WebP/AVIF format?
- [ ] **External links:** KISS Login, Kenexis Store, LinkedIn, YouTube, Spotify podcast links all point to correct external URLs and open in new tabs
- [ ] **Font loading:** Does Inter load correctly? Check that there is no flash of unstyled text (FOUT) or invisible text (FOIT)
- [ ] **Favicon:** Is there a custom favicon, or is it the default Next.js icon?
- [ ] **404 page:** Navigate to a non-existent URL -- is there a styled 404 page or the default Next.js one?
- [ ] **Scroll animations:** Do animations trigger correctly on first visit? Do they replay annoyingly on back-navigation?
- [ ] **Contact form:** Does the form show a demo-mode message? Does it NOT actually submit to Kenexis?
- [ ] **Performance:** Run Lighthouse on the homepage -- is the score above 90 for Performance, Accessibility, Best Practices, SEO?
- [ ] **Console errors:** Open browser DevTools -- are there any red errors or warnings?
- [ ] **Print stylesheet:** If someone tries to print a page (unlikely but possible for a pitch), does it look reasonable?

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Used `output: "export"` and built 10+ pages | MEDIUM | Remove `output: "export"` from next.config.js. Remove any custom image loaders. Switch back to default `next/image`. Redeploy to Vercel. Pages will still be SSG. |
| Framer Motion in large client component trees | HIGH | Refactor each page: extract animated wrappers into thin client components, move static content back to server components. May require restructuring 20+ page files. |
| Scraped content with WordPress artifacts | MEDIUM | Re-scrape with better selectors, or manually clean the content data files. This is tedious but mechanical work for 20+ pages. |
| Broken images from hotlinking | LOW | Download all images locally to `/public/`. Find-and-replace image URLs in content data files. Quick but must be thorough. |
| Missing per-page metadata | LOW | Create a metadata generation utility. Add metadata export to each page.tsx. Mechanical work, ~5 minutes per page. |
| Page transitions not working | LOW | Remove AnimatePresence page transition code. Replace with scroll-triggered section animations. Less code, more reliable. |
| Inconsistent responsive design | HIGH | Requires reviewing and fixing every page at every breakpoint. Much harder to retrofit than to build mobile-first from the start. |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| `output: "export"` misconfiguration | Phase 1: Project Scaffolding | Confirm `next.config.js` does NOT have `output: "export"`. Run `next build` and verify it produces `.next/` not `out/`. |
| Framer Motion client component bloat | Phase 2: Component Architecture | Audit every `"use client"` file. Animated wrappers should be under 20 lines each. Check bundle size with `@next/bundle-analyzer`. |
| Scraped content brittleness | Phase 1: Content Scraping (dedicated sub-phase) | All content in structured TypeScript data files. All images in `/public/`. Zero references to kenexis.com URLs in component code. |
| Image optimization failures | Phase 1: Project Scaffolding | `remotePatterns` configured if using remote images. Better: all images local. Hero images have `priority` prop. Run Lighthouse image audit. |
| Missing SEO metadata | Phase 2: Layout/Template System | `metadataBase` set in root layout. Metadata utility created. Verify with `curl -s URL | grep "<title>"` for each page after build. |
| Page transitions broken | Phase 2: Animation Strategy Decision | Documented decision: "scroll animations yes, page transitions no." No `AnimatePresence` wrapping route changes. |
| Responsive design failures | Every phase (continuous) | Test at 375px, 768px, 1024px, 1440px at each page completion. Do not defer mobile testing to a final phase. |
| Stale/broken demo | Final Phase: QA | Full checklist pass (see "Looks Done But Isn't" above). Share URL with a test viewer before pitching to Edward Marszal. |

## Sources

- [Next.js Static Exports Guide (official docs, v16.1.6)](https://nextjs.org/docs/app/guides/static-exports) -- HIGH confidence
- [Next.js Metadata and OG Images (official docs)](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) -- HIGH confidence
- [Next.js Image Component docs](https://nextjs.org/docs/app/api-reference/components/image) -- HIGH confidence
- [Next.js `remotePatterns` configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/images) -- HIGH confidence
- [Motion bundle size reduction](https://motion.dev/docs/react-reduce-bundle-size) -- HIGH confidence
- [Framer Motion Next.js optimization feature request (GitHub #2206)](https://github.com/framer/motion/issues/2206) -- MEDIUM confidence
- [Next.js App Router page transitions discussion (GitHub #42658)](https://github.com/vercel/next.js/discussions/42658) -- MEDIUM confidence
- [Vercel free tier limits](https://vercel.com/docs/limits) -- HIGH confidence
- [Vercel pricing breakdown (Flexprice, 2025)](https://flexprice.io/blog/vercel-pricing-breakdown) -- MEDIUM confidence
- [Framer Motion compatibility with Next.js 14+ (Medium)](https://medium.com/@dolce-emmy/resolving-framer-motion-compatibility-in-next-js-14-the-use-client-workaround-1ec82e5a0c75) -- MEDIUM confidence
- [shadcn/ui Next.js installation (official docs)](https://ui.shadcn.com/docs/installation/next) -- HIGH confidence
- [21st.dev repository and documentation](https://github.com/serafimcloud/21st) -- MEDIUM confidence
- [Next.js Image optimization for static sites (whereisthemouse.com)](https://whereisthemouse.com/image-optimization-for-static-nextjs-sites) -- MEDIUM confidence
- [Web scraping challenges (AIMultiple, 2026)](https://research.aimultiple.com/web-scraping-challenges/) -- LOW confidence
- [B2B mobile performance statistics (Webstacks, 2025)](https://www.webstacks.com/blog/responsive-design-guide) -- MEDIUM confidence

---
*Pitfalls research for: Kenexis Website Redesign (Next.js B2B marketing site)*
*Researched: 2026-03-03*
