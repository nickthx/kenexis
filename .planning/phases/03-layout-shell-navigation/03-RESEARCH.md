# Phase 3: Layout Shell & Navigation - Research

**Researched:** 2026-03-03
**Domain:** Navigation UI, layout shell, responsive menus, page transitions (Next.js 16 + shadcn/ui + Tailwind v4)
**Confidence:** HIGH

## Summary

Phase 3 builds the persistent site shell: sticky header with mega menus, mobile hamburger drawer with accordion sub-navigation, breadcrumbs, footer, and page transition infrastructure. The existing project (Next.js 16.1.6, React 19.2.3, Tailwind v4, shadcn/ui new-york style, radix-ui 1.4.3) already has the `(marketing)/layout.tsx` with placeholder comments for nav and footer. All navigation data is fully typed and available in `src/lib/data/navigation.ts`.

The standard approach uses shadcn/ui components for all navigation primitives: `navigation-menu` for the desktop mega menus (built on Radix NavigationMenu), `sheet` for the mobile drawer, `accordion` for mobile sub-navigation, and `breadcrumb` for hierarchy indicators. The `motion` library (v12.x) should be installed for scroll-triggered animations and the transparent-to-solid header transition. For page transitions (NAV-06), use the lightweight `next-view-transitions` library (v0.3.5) rather than React's experimental `ViewTransition` component (which is NOT available in stable React 19.2.3).

**Primary recommendation:** Install shadcn/ui `navigation-menu`, `sheet`, `accordion`, `breadcrumb` components via CLI, install `motion` and `next-view-transitions` npm packages, and build the header/footer/breadcrumb as dedicated components composed in the `(marketing)/layout.tsx`. Reference the launch-ui navbar/footer section patterns from `~/design-repos/launch-ui` for structural guidance.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Sticky header with transparent-to-solid scroll transition, Kenexis logo, primary nav links | useScroll hook pattern with motion; sticky header with backdrop-blur from launch-ui navbar pattern; logo from `/public/images/logo/kenexis-logo.jpg` |
| NAV-02 | Mega menu dropdowns for Services, Software, Training grouped by pillar with descriptions and icons | shadcn/ui `navigation-menu` component with `NavigationMenuTrigger` + `NavigationMenuContent`; data already structured in `navigation.ts` with `children` arrays and `icon` fields mapping to lucide-react icons |
| NAV-03 | Mobile hamburger menu with accordion sub-navigation at 375px viewport | shadcn/ui `sheet` (side="right") + `accordion` for collapsible sections; launch-ui mobile pattern with `SheetTrigger` hamburger button hidden on md+ |
| NAV-04 | Breadcrumb navigation on sub-pages showing hierarchy | shadcn/ui `breadcrumb` component; auto-generate from Next.js route segments via `usePathname()` mapped against `navigation.ts` data |
| NAV-05 | Comprehensive footer with sitemap, contact info, social links, external links, copyright | launch-ui footer section pattern adapted; data fully available in `footerNavigation` export from `navigation.ts` including sections, socialLinks, externalLinks, contactInfo, copyright |
| NAV-06 | Smooth page transitions between routes | `next-view-transitions` library (v0.3.5) wrapping layout with `<ViewTransitions>` component and using its `<Link>` export; CSS `::view-transition-old` / `::view-transition-new` pseudo-selectors for custom fade animation |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| shadcn/ui `navigation-menu` | latest (via CLI) | Desktop mega menu dropdowns | Built on Radix NavigationMenu primitive; accessible, keyboard-navigable, animation-ready; used by the shadcn/ui ecosystem and launch-ui reference repo |
| shadcn/ui `sheet` | latest (via CLI) | Mobile navigation drawer | Radix Dialog-based slide panel; handles focus trap, overlay, and animation out of the box |
| shadcn/ui `accordion` | latest (via CLI) | Mobile sub-navigation collapsible sections | Radix Accordion primitive; collapsible content with smooth open/close animations |
| shadcn/ui `breadcrumb` | latest (via CLI) | Breadcrumb hierarchy navigation | Semantic `<nav aria-label="breadcrumb">` with proper ARIA; ChevronRight separators |
| motion | ^12.x | Scroll-triggered animations, header scroll detection | Successor to framer-motion; 18M+ monthly npm downloads; `useScroll`, `useMotionValueEvent`, `whileInView` for scroll interactions; needed in Phase 4 too |
| next-view-transitions | ^0.3.5 | CSS View Transitions API for page transitions | Lightweight (by Shu Ding / Vercel); works with stable React 19 + Next.js App Router; provides `<ViewTransitions>` wrapper, custom `<Link>`, and `useTransitionRouter` |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | ^0.576.0 (already installed) | Icons for nav items, social links, hamburger menu | Map icon string names from navigation data to Lucide React components |
| next/image | built-in | Logo rendering in header/footer | Optimize the kenexis-logo.jpg for header display |
| next/link | built-in | Internal navigation links (within nav-menu, breadcrumbs, footer) | All internal site links; next-view-transitions provides its own `<Link>` that wraps this |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-view-transitions | React `<ViewTransition>` component | ViewTransition is only in React canary channel, NOT available in stable React 19.2.3; would require upgrading to canary React which is not production-safe |
| next-view-transitions | motion `AnimateView` | AnimateView requires Motion+ paid subscription (Early Access); not freely available |
| next-view-transitions | framer-motion `AnimatePresence` + FrozenRouter | Fragile pattern in App Router (STATE.md flagged this); components unmount/remount during navigation disrupting animations |
| Custom scroll detection | Intersection Observer API | motion's `useScroll` + `useMotionValueEvent` is more ergonomic for the header transparency transition and will be reused in Phase 4 for scroll animations |

**Installation:**
```bash
npx shadcn@latest add navigation-menu sheet accordion breadcrumb -y
npm install motion next-view-transitions
```

## Architecture Patterns

### Recommended Project Structure
```
src/
  components/
    layout/
      site-header.tsx           # Sticky header with desktop nav + mobile trigger
      site-footer.tsx           # Comprehensive footer with sitemap columns
      mobile-nav.tsx            # Sheet-based mobile navigation with accordion
      mega-menu.tsx             # Desktop mega menu content panels
      breadcrumbs.tsx           # Auto-generated breadcrumb from route
    ui/
      navigation-menu.tsx       # shadcn component (installed via CLI)
      sheet.tsx                 # shadcn component (installed via CLI)
      accordion.tsx             # shadcn component (installed via CLI)
      breadcrumb.tsx            # shadcn component (installed via CLI)
      button.tsx                # existing
      card.tsx                  # existing
      shimmer-button.tsx        # existing
  hooks/
    use-scroll-header.ts        # Custom hook for header scroll state
  lib/
    data/
      navigation.ts             # Already contains all nav data (mainNavigation, footerNavigation)
      types.ts                  # NavItem, SocialLink, ContactInfo types
    navigation-utils.ts         # Icon mapping, breadcrumb generation utilities
    utils.ts                    # existing cn() utility
  app/
    (marketing)/
      layout.tsx                # Updated: wraps children with SiteHeader + SiteFooter + ViewTransitions
    layout.tsx                  # Root layout (unchanged)
    globals.css                 # Add view transition CSS animations
```

### Pattern 1: Sticky Header with Scroll Transparency
**What:** Header starts transparent (for dark hero sections) and transitions to solid white with shadow when user scrolls past a threshold.
**When to use:** Homepage and pages with full-width hero sections.
**Example:**
```typescript
// src/hooks/use-scroll-header.ts
"use client";
import { useState, useEffect } from "react";

export function useScrollHeader(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };
    handleScroll(); // check initial state
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
```

```typescript
// Usage in site-header.tsx
"use client";
import { useScrollHeader } from "@/hooks/use-scroll-header";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const scrolled = useScrollHeader(50);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b"
          : "bg-transparent"
      )}
    >
      {/* ... nav content */}
    </header>
  );
}
```

### Pattern 2: Mega Menu with Grouped Content
**What:** Desktop navigation items with dropdown panels containing grouped sub-links with icons and descriptions.
**When to use:** Services (4 items), Software (7 items), About (3 items) nav sections.
**Example:**
```typescript
// Source: shadcn/ui navigation-menu demo + launch-ui navigation pattern
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { mainNavigation } from "@/lib/data/navigation";

// For items WITH children (Services, Software, About):
<NavigationMenuItem>
  <NavigationMenuTrigger>Services</NavigationMenuTrigger>
  <NavigationMenuContent>
    <ul className="grid gap-2 p-4 md:w-[500px] md:grid-cols-2">
      {item.children.map((child) => (
        <li key={child.href}>
          <NavigationMenuLink asChild>
            <Link href={child.href}>
              <div className="flex items-center gap-2">
                <IconComponent name={child.icon} className="size-4 text-orange" />
                <span className="text-sm font-medium">{child.label}</span>
              </div>
              <p className="text-muted-foreground text-sm">{child.description}</p>
            </Link>
          </NavigationMenuLink>
        </li>
      ))}
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>

// For items WITHOUT children (Training, Resources, Careers, Contact):
<NavigationMenuItem>
  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
    <Link href={item.href}>{item.label}</Link>
  </NavigationMenuLink>
</NavigationMenuItem>
```

### Pattern 3: Mobile Navigation with Sheet + Accordion
**What:** Hamburger button opens a right-side sheet drawer with accordion sections for items that have children.
**When to use:** All viewports below md (768px) breakpoint.
**Example:**
```typescript
// Source: launch-ui navbar pattern adapted
"use client";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <nav className="flex flex-col gap-4 pt-8">
          <Accordion type="multiple">
            {mainNavigation.map((item) =>
              item.children ? (
                <AccordionItem key={item.href} value={item.label}>
                  <AccordionTrigger>{item.label}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="text-muted-foreground hover:text-foreground py-1 text-sm"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium border-b"
                >
                  {item.label}
                </Link>
              )
            )}
          </Accordion>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

### Pattern 4: Auto-Generated Breadcrumbs
**What:** Breadcrumb derived from current route path segments, mapped to human-readable labels from navigation data.
**When to use:** All sub-pages (services/*, software/*, about/*) -- NOT on homepage.
**Example:**
```typescript
// src/lib/navigation-utils.ts
import { mainNavigation } from "@/lib/data/navigation";

// Build a flat lookup: { "/services/pha": "Process Hazards Analysis", ... }
export function buildBreadcrumbMap(): Record<string, string> {
  const map: Record<string, string> = { "/": "Home" };
  for (const item of mainNavigation) {
    map[item.href] = item.label;
    if (item.children) {
      for (const child of item.children) {
        map[child.href] = child.label;
      }
    }
  }
  return map;
}

// src/components/layout/breadcrumbs.tsx
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { buildBreadcrumbMap } from "@/lib/navigation-utils";

export function SiteBreadcrumbs() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const map = buildBreadcrumbMap();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((_, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    return { href, label: map[href] || segments[i] };
  });

  return (
    <Breadcrumb className="px-4 py-3 max-w-7xl mx-auto">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {crumbs.map((crumb, i) => (
          <Fragment key={crumb.href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {i === crumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### Pattern 5: Page Transitions with next-view-transitions
**What:** Smooth cross-fade between pages using the CSS View Transitions API.
**When to use:** Root marketing layout wrapping all page content.
**Example:**
```typescript
// src/app/(marketing)/layout.tsx
import { ViewTransitions } from "next-view-transitions";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </ViewTransitions>
  );
}

// Use next-view-transitions Link throughout the site for transitions:
import { Link } from "next-view-transitions";
// Instead of next/link for internal navigation
```

```css
/* In globals.css -- simple fade transition */
::view-transition-old(root) {
  animation: fade-out 150ms ease-out;
}

::view-transition-new(root) {
  animation: fade-in 150ms ease-in;
}

@keyframes fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
  }
}
```

### Pattern 6: Icon String-to-Component Mapping
**What:** Map the string icon names in navigation data (e.g., "shield", "flame") to Lucide React icon components.
**When to use:** Rendering icons in mega menus and mobile navigation.
**Example:**
```typescript
// src/lib/navigation-utils.ts
import {
  Shield, BarChart3, Flame, Cpu,
  ClipboardCheck, Gauge, GitBranch, Target,
  CheckSquare, Map, Code,
  Building, Users, Globe,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "shield": Shield,
  "chart-bar": BarChart3,
  "flame": Flame,
  "cpu": Cpu,
  "clipboard-check": ClipboardCheck,
  "gauge": Gauge,
  "git-branch": GitBranch,
  "target": Target,
  "check-square": CheckSquare,
  "map": Map,
  "code": Code,
  "building": Building,
  "users": Users,
  "globe": Globe,
};

export function getNavIcon(iconName?: string): LucideIcon | null {
  if (!iconName) return null;
  return iconMap[iconName] || null;
}
```

### Anti-Patterns to Avoid
- **Using React `<ViewTransition>` on stable React 19.2.3:** This component does NOT exist in stable React. It is only in the canary release channel. Attempting to import it will cause a build error. Use `next-view-transitions` instead.
- **Using framer-motion `AnimatePresence` + FrozenRouter for page transitions:** This pattern is fragile in the App Router (noted in STATE.md). The router's frequent context updates cause components to unmount/remount, breaking exit animations.
- **Installing `framer-motion` instead of `motion`:** The `framer-motion` npm package is deprecated in favor of `motion`. Same library, new name. Install `motion`, import from `motion/react`.
- **Hardcoding nav structure in components:** All navigation data is already in `src/lib/data/navigation.ts`. Components should consume this data, not duplicate it.
- **Forgetting `"use client"` on interactive components:** The header (scroll detection), mobile nav (Sheet state), and breadcrumbs (usePathname) all require client-side hooks. Mark them `"use client"`.
- **Fixed header without offsetting content:** A `fixed top-0` header overlaps page content. Add `pt-[header-height]` to the main content wrapper or use a spacer div.
- **Omitting SheetTitle from mobile nav:** Radix Dialog (which Sheet is built on) requires a Title for accessibility. Use `<SheetTitle className="sr-only">` if no visible title is desired.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Desktop dropdown menus | Custom hover/focus dropdown | shadcn/ui `navigation-menu` (Radix NavigationMenu) | Handles keyboard navigation, focus management, smart hover delays, viewport collision, enter/exit animations |
| Mobile slide drawer | Custom CSS slide panel | shadcn/ui `sheet` (Radix Dialog) | Focus trap, scroll lock, overlay, close-on-escape, portal rendering, accessibility |
| Collapsible sections | Custom toggle state | shadcn/ui `accordion` (Radix Accordion) | Animated open/close with proper ARIA attributes, keyboard support |
| Breadcrumb markup | Custom `<nav>` with dividers | shadcn/ui `breadcrumb` | Proper `aria-label="breadcrumb"`, `aria-current="page"`, semantic `<ol>` |
| Page transitions | AnimatePresence + FrozenRouter | `next-view-transitions` | 3 lines of code vs. fragile lifecycle hacks; uses native browser View Transitions API |
| Scroll detection | Raw `window.addEventListener("scroll")` | Custom hook with passive listener | Encapsulate the pattern for reuse; ensure passive listener for performance |

**Key insight:** Every interactive navigation primitive in this phase has a battle-tested Radix/shadcn implementation. Building custom versions wastes time and introduces accessibility gaps (focus management, keyboard navigation, ARIA attributes) that take days to fix correctly.

## Common Pitfalls

### Pitfall 1: Header Overlapping Page Content
**What goes wrong:** `position: fixed` removes the header from document flow, causing page content to render behind it.
**Why it happens:** Developers add `fixed top-0` to the header but forget to offset the content.
**How to avoid:** Add a spacer div matching the header height, or set `pt-16` (or `pt-20`) on the `<main>` element. The exact value depends on header height.
**Warning signs:** Hero section text is hidden behind the header on page load.

### Pitfall 2: NavigationMenu Hover Trigger Sensitivity
**What goes wrong:** Mega menu opens/closes erratically on mouse movement between trigger and content panel.
**Why it happens:** The Radix NavigationMenu has smart hover delay logic, but if the content panel is positioned too far from the trigger, the mouse path leaves the active zone.
**How to avoid:** Use the standard viewport positioning (NavigationMenuViewport). Don't add large gaps between trigger row and dropdown content. The shadcn component handles this by default.
**Warning signs:** Menu closes when moving mouse diagonally from trigger to content.

### Pitfall 3: Mobile Sheet Not Closing on Navigation
**What goes wrong:** User taps a link in the mobile nav sheet, the page navigates, but the sheet stays open.
**Why it happens:** Next.js navigation doesn't automatically close Radix dialogs. The sheet's `onOpenChange` callback isn't triggered by route changes.
**How to avoid:** Track `open` state in the mobile nav component. On each link click, call `setOpen(false)` before navigation. Alternatively, listen to `pathname` changes via `usePathname()` in a `useEffect` to close the sheet.
**Warning signs:** After tapping a mobile nav link, the overlay and sheet remain visible over the new page.

### Pitfall 4: Breadcrumbs on Homepage
**What goes wrong:** Homepage shows a breadcrumb with just "Home" or an empty breadcrumb.
**Why it happens:** The breadcrumb component renders on every page including the homepage.
**How to avoid:** Return `null` from the breadcrumb component when `pathname === "/"`. Only render breadcrumbs on sub-pages.
**Warning signs:** Awkward empty breadcrumb bar on the homepage.

### Pitfall 5: View Transitions Not Working
**What goes wrong:** Page transitions show no animation.
**Why it happens:** Several possible causes: (1) using `next/link` instead of `next-view-transitions`'s `Link`, (2) browser doesn't support View Transitions API (Safari < 18), (3) user has `prefers-reduced-motion` enabled.
**How to avoid:** Use `import { Link } from "next-view-transitions"` for all internal navigation links. The library falls back gracefully in unsupported browsers -- no animation, but no error. The `::view-transition-*` CSS pseudo-selectors will simply not apply.
**Warning signs:** Navigation works but there is no cross-fade effect between pages.

### Pitfall 6: Logo JPG Quality and Sizing
**What goes wrong:** The Kenexis logo (`kenexis-logo.jpg`, 36KB) renders blurry or at wrong size in header.
**Why it happens:** JPG compression artifacts; logo not optimized for header use at small display sizes.
**How to avoid:** Use `next/image` with explicit width/height for crisp rendering. Consider a max height of 32-40px for the header logo. Use `priority` prop since it's above the fold.
**Warning signs:** Blurry or pixelated logo in the header.

### Pitfall 7: Social Icons (LinkedIn, YouTube, Spotify) Not in Lucide
**What goes wrong:** Attempting to import brand icons from lucide-react and they don't exist or look generic.
**Why it happens:** Lucide has limited brand icons. LinkedIn is not in lucide-react by default.
**How to avoid:** Use inline SVGs for brand icons (LinkedIn, YouTube, Spotify), or import from a lightweight brand icon source. Lucide has `Youtube` but not `LinkedIn` or `Spotify` -- check availability at build time.
**Warning signs:** Missing or placeholder icons for social links.

## Code Examples

Verified patterns from official sources and design reference repos:

### Marketing Layout with ViewTransitions
```typescript
// src/app/(marketing)/layout.tsx
import { ViewTransitions } from "next-view-transitions";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteBreadcrumbs } from "@/components/layout/breadcrumbs";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <SiteHeader />
      <SiteBreadcrumbs />
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <SiteFooter />
    </ViewTransitions>
  );
}
```

### Footer with Sitemap Columns, Contact, Social, External Links
```typescript
// Source: launch-ui footer pattern adapted for Kenexis
// src/components/layout/site-footer.tsx
import Link from "next/link";
import Image from "next/image";
import { Linkedin, Youtube, Rss } from "lucide-react";
import { footerNavigation } from "@/lib/data/navigation";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        {/* Top section: Logo + description */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
          {/* Logo column */}
          <div className="col-span-2 sm:col-span-3 md:col-span-2">
            <Image src="/images/logo/kenexis-logo.jpg" alt="Kenexis" width={160} height={40} />
            <p className="mt-4 text-sm text-navy-300">
              Globally recognized process safety consultancy
            </p>
            <div className="mt-4 text-sm text-navy-300">
              <p>{footerNavigation.contactInfo.phone}</p>
              <p>{footerNavigation.contactInfo.email}</p>
              <p>{footerNavigation.contactInfo.address}</p>
            </div>
          </div>

          {/* Sitemap columns */}
          {footerNavigation.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-navy-300 hover:text-orange transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-navy-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-navy-400">{footerNavigation.copyright}</p>
          <div className="flex items-center gap-4">
            {/* Social links */}
            {footerNavigation.socialLinks.map((social) => (
              <a key={social.platform} href={social.url} target="_blank" rel="noopener noreferrer"
                className="text-navy-400 hover:text-orange transition-colors">
                <span className="sr-only">{social.label}</span>
                {/* Map platform to icon */}
              </a>
            ))}
            {/* External links */}
            {footerNavigation.externalLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="text-sm text-navy-300 hover:text-orange transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

### Importing from motion (not framer-motion)
```typescript
// Correct: import from "motion/react"
import { motion, useScroll, useMotionValueEvent } from "motion/react";

// NOT from "framer-motion" (deprecated package name)
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` npm package | `motion` npm package | 2024 (motion v11+) | Same API, different package name. Import from `motion/react` not `framer-motion` |
| AnimatePresence + FrozenRouter for page transitions | CSS View Transitions API via `next-view-transitions` | 2024-2025 | Native browser API, much lighter, no React lifecycle hacks needed |
| React `<ViewTransition>` component | Still experimental/canary only | As of React 19.2.3 (March 2026) | Cannot use in stable React; `next-view-transitions` is the stable alternative |
| Radix UI separate packages (@radix-ui/react-*) | Unified `radix-ui` package | 2024-2025 (radix-ui v1.x) | Already installed in project as `radix-ui@1.4.3`; shadcn/ui components import from `radix-ui` |
| Tailwind config in JS file | CSS-first `@theme` directive | Tailwind v4 (2025) | Already configured; no tailwind.config.ts in this project |

**Deprecated/outdated:**
- `framer-motion` package: Renamed to `motion`. Still works but `motion` is the canonical name going forward.
- FrozenRouter pattern: Workaround for AnimatePresence in App Router. Fragile and unnecessary now that View Transitions API exists.
- `@radix-ui/react-navigation-menu` separate package: Now part of the unified `radix-ui` package; shadcn/ui handles this import path automatically.

## Open Questions

1. **Header transparency on non-hero pages**
   - What we know: The header should be transparent on dark hero sections (homepage, possibly service landing pages) and transition to solid on scroll
   - What's unclear: Should the header START solid on pages without dark heroes (e.g., contact page)?
   - Recommendation: Default to solid background with the transparent-to-solid transition only active on pages that opt-in via a prop or CSS class. The marketing layout can pass a `transparentHeader` prop, or the header can detect if the page starts with a dark section.

2. **Software mega menu with 7 products**
   - What we know: Software has 7 child items (Open-PHA, Vertigo, Arbor, Bowtie-Q, Open-Audit, Effigy, KISS API) plus the "KISS Platform" parent link
   - What's unclear: Whether to display all 7 products in a single mega menu panel or group them (e.g., 2 columns with a "View all" link)
   - Recommendation: Use a 2-column grid layout in the mega menu content panel (matching the shadcn navigation-menu demo pattern). 7 items fit naturally in a ~600px wide 2-column grid with a "View all software" featured link.

3. **LinkedIn/Spotify brand icons**
   - What we know: Lucide has limited brand icon support
   - What's unclear: Whether lucide-react includes LinkedIn and Spotify icons
   - Recommendation: Check at implementation time. If not available, use inline SVGs for the 3 brand icons (LinkedIn, YouTube, Spotify). YouTube is available in lucide-react as `Youtube`.

## Sources

### Primary (HIGH confidence)
- shadcn/ui navigation-menu component source: `~/design-repos/shadcn-ui/apps/v4/registry/new-york-v4/ui/navigation-menu.tsx` - Full component API and styling
- shadcn/ui breadcrumb component source: `~/design-repos/shadcn-ui/apps/v4/registry/new-york-v4/ui/breadcrumb.tsx` - Full component API
- shadcn/ui sheet component source: `~/design-repos/shadcn-ui/apps/v4/registry/new-york-v4/ui/sheet.tsx` - Full component API
- shadcn/ui accordion component source: `~/design-repos/shadcn-ui/apps/v4/registry/new-york-v4/ui/accordion.tsx` - Full component API
- launch-ui navbar section: `~/design-repos/launch-ui/components/sections/navbar/default.tsx` - Sticky header + hamburger + Sheet pattern
- launch-ui footer section: `~/design-repos/launch-ui/components/sections/footer/default.tsx` - Multi-column footer pattern
- launch-ui navigation: `~/design-repos/launch-ui/components/ui/navigation.tsx` - NavigationMenu mega menu pattern
- Project navigation data: `src/lib/data/navigation.ts` - All nav structure, footer data, social links, contact info
- Next.js viewTransition docs: https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition - experimental flag
- React ViewTransition API: https://react.dev/reference/react/ViewTransition - Canary only, full API documented
- Vercel view transition example repo: https://github.com/vercel/next-view-transition-example - Working implementation

### Secondary (MEDIUM confidence)
- next-view-transitions library: https://github.com/shuding/next-view-transitions - v0.3.5, MIT, by Shu Ding (Vercel)
- motion npm package: https://www.npmjs.com/package/motion - v12.34.5 latest, 18M+ monthly downloads
- motion scroll animations docs: https://motion.dev/docs/react-scroll-animations - useScroll, whileInView
- shadcn navigation-menu docs: https://ui.shadcn.com/docs/components/radix/navigation-menu

### Tertiary (LOW confidence)
- AnimateView (Motion+): Paid early access only; not viable for this project. Confirmed via search results that it requires motion-plus package with private token.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All components verified in local design repos with exact source code; npm packages verified; React 19.2.3 `ViewTransition` unavailability confirmed by runtime test
- Architecture: HIGH - Patterns derived from official shadcn/ui examples and launch-ui reference repo with real code examined
- Pitfalls: HIGH - FrozenRouter fragility confirmed by STATE.md; header overlap is a well-documented CSS issue; mobile sheet close behavior is a known Radix pattern

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (30 days -- stable libraries, no fast-moving APIs except view transitions which are covered)
