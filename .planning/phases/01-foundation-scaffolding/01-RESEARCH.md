# Phase 1: Foundation & Scaffolding - Research

**Researched:** 2026-03-03
**Domain:** Next.js 15 project scaffolding, Tailwind CSS v4, shadcn/ui, 21st.dev component integration, brand design system
**Confidence:** HIGH

## Summary

Phase 1 establishes a brand-new Next.js 15 project foundation with a complete brand design system. The phase requires initializing a Next.js 15 App Router project with Tailwind CSS v4 (the current default for new projects), configuring the brand palette (navy #0a1628, orange #e87722) as Tailwind theme variables, setting up Inter as the primary typeface via `next/font/google`, initializing shadcn/ui for the component library, installing at least one shadcn/ui component and one 21st.dev community component, and structuring the app directory with a `(marketing)` route group for public pages.

The existing project (Next.js 14, Tailwind 3, React 18) provides the prior art and lessons learned (especially around shadcn CSS variable naming collisions documented in PITFALLS.md), but this phase scaffolds a fresh Next.js 15 project. Tailwind CSS v4 fundamentally changes the configuration approach -- there is no `tailwind.config.ts` file. All theme customization happens in CSS via the `@theme` directive. shadcn/ui's latest version natively supports Tailwind v4 with OKLCH colors, `@theme inline` directives, and removed `forwardRef` patterns.

**Primary recommendation:** Use `npx create-next-app@latest` to scaffold Next.js 15 with TypeScript, App Router, and Tailwind CSS v4, then run `npx shadcn@latest init` to initialize the component library, configure brand colors via `@theme` in globals.css, and structure the app with a `(marketing)` route group.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Working Next.js 15 project with dev server starting cleanly | Standard Stack section covers exact `create-next-app` command, Tailwind v4 setup, and shadcn init sequence |
| FOUND-02 | Brand design system with navy (#0a1628) primary, orange (#e87722) accent, and Inter typography rendering through Tailwind CSS utility classes | Architecture Patterns section covers `@theme` directive for custom colors, `next/font/google` Inter setup, and CSS variable integration |
| FOUND-06 | shadcn/ui and 21st.dev components installed and rendering with brand colors | Standard Stack section covers shadcn init, component add commands, and 21st.dev registry URL pattern; Code Examples section shows component customization |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.x (latest stable) | App Router framework with React Server Components | Current production-stable version; supports Tailwind v4 natively via create-next-app |
| React | 19.x | UI library | Ships with Next.js 15; required for latest shadcn/ui components |
| TypeScript | 5.x | Type safety | Default in create-next-app; all shadcn components are typed |
| Tailwind CSS | 4.x | Utility-first CSS framework | Current major version; CSS-first configuration via `@theme` directive, no config file needed |
| `@tailwindcss/postcss` | 4.x | PostCSS plugin for Tailwind v4 | Replaces the old `tailwindcss` PostCSS plugin in v4 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `shadcn` CLI | latest | Component scaffolding tool (copies source into project) | Run `npx shadcn@latest init` once, then `add` for each component |
| `class-variance-authority` | ^0.7.x | Variant-based component styling | Installed by shadcn init; used for Button/Card variants |
| `clsx` | ^2.x | Conditional class merging | Installed by shadcn init |
| `tailwind-merge` | ^3.x | Tailwind class conflict resolution | v3.x for Tailwind v4 (NOT v1.x which was for Tailwind v3) |
| `tw-animate-css` | latest | Animation classes for shadcn components | Replaces deprecated `tailwindcss-animate` for Tailwind v4 |
| `@radix-ui/react-slot` | latest | `asChild` prop polymorphism | Installed by shadcn init |
| `lucide-react` | latest | Icon library | Default icon library for shadcn/ui |
| `next/font/google` | (built-in) | Font optimization for Inter | Built into Next.js; zero-config variable font loading |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Tailwind CSS v4 | Tailwind CSS v3.4 | v3 requires `tailwind.config.ts` file; v4 is CSS-native, faster compilation, recommended for new Next.js 15 projects |
| `tw-animate-css` | `tailwindcss-animate` | `tailwindcss-animate` only works with Tailwind v3; v4 requires `tw-animate-css` |
| `tailwind-merge` v3 | `tailwind-merge` v1 | v1 is for Tailwind v3 class resolution only; v3 understands Tailwind v4 class syntax |
| 21st.dev components | Only shadcn/ui components | 21st.dev extends the shadcn ecosystem with community components; same install pattern via `npx shadcn` |

**Installation:**
```bash
# Step 1: Create Next.js 15 project
npx create-next-app@latest . --typescript --eslint --tailwind --app --src-dir --turbopack

# Step 2: Initialize shadcn/ui
npx shadcn@latest init

# Step 3: Add components
npx shadcn@latest add button card

# Step 4: Add a 21st.dev component (example: a hero component)
npx shadcn@latest add "https://21st.dev/r/{username}/{component-name}"
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── app/
│   ├── (marketing)/          # Route group for public pages
│   │   ├── layout.tsx        # Marketing-specific layout (nav + footer)
│   │   ├── page.tsx          # Homepage (/)
│   │   └── [other-pages]/    # About, contact, etc.
│   ├── globals.css           # Tailwind import, @theme, CSS variables
│   ├── layout.tsx            # Root layout (fonts, html/body)
│   └── favicon.ico
├── components/
│   ├── ui/                   # shadcn/ui components (button, card, etc.)
│   └── [shared]/             # Project-wide shared components
├── lib/
│   └── utils.ts              # cn() utility from shadcn
└── hooks/                    # Custom React hooks
```

### Pattern 1: Route Groups for Layout Separation
**What:** Wrap public-facing pages in a `(marketing)` route group with its own layout that includes navigation and footer. The parentheses mean the folder name does not appear in the URL -- `app/(marketing)/page.tsx` maps to `/`, not `/marketing/`.
**When to use:** Always for this project. Separates marketing/public layout from potential admin or API routes.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/route-groups

// src/app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>{/* Navigation component */}</header>
      <main id="main-content">{children}</main>
      <footer>{/* Footer component */}</footer>
    </>
  );
}
```

**Caveats from official docs:**
- If the root `layout.tsx` is removed, the home route (`/`) must be defined inside one of the route groups
- Routes in different groups must not resolve to the same URL path
- Navigating between routes that use different root layouts triggers a full page reload

### Pattern 2: Tailwind v4 CSS-First Theme Configuration
**What:** All design tokens (colors, fonts, spacing) are defined in CSS using the `@theme` directive, NOT in a JavaScript/TypeScript config file. This is the fundamental shift from Tailwind v3 to v4.
**When to use:** All brand color and typography definitions in this phase.
**Example:**
```css
/* Source: https://tailwindcss.com/docs/customizing-colors */
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  --color-navy: #0a1628;
  --color-navy-50: #f0f2f5;
  --color-navy-100: #d9dee6;
  --color-navy-200: #b3bdcd;
  --color-navy-300: #8d9cb4;
  --color-navy-400: #677b9b;
  --color-navy-500: #415a82;
  --color-navy-600: #2e4068;
  --color-navy-700: #1e2f4e;
  --color-navy-800: #0f1f38;
  --color-navy-900: #0a1628;
  --color-navy-950: #060e1a;

  --color-orange: #e87722;
  --color-orange-50: #fef3eb;
  --color-orange-100: #fde0cc;
  --color-orange-200: #fbc199;
  --color-orange-300: #f9a266;
  --color-orange-400: #f08333;
  --color-orange-500: #e87722;
  --color-orange-600: #c4631b;
  --color-orange-700: #a05015;
  --color-orange-800: #7c3e10;
  --color-orange-900: #582c0b;

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

After defining `--color-navy` and `--color-orange`, Tailwind v4 automatically generates utilities: `bg-navy`, `text-navy-500`, `border-orange-300`, etc.

### Pattern 3: shadcn/ui CSS Variables with @theme inline
**What:** shadcn/ui uses semantic CSS variables (--background, --foreground, --primary, etc.) that must be mapped to brand colors. In Tailwind v4, these are registered with `@theme inline` to make them available as utility classes.
**When to use:** After shadcn init, customize the generated CSS variables to use brand colors.
**Example:**
```css
/* Source: https://ui.shadcn.com/docs/tailwind-v4 */
:root {
  --background: hsl(220 30% 6%);     /* or use brand navy as bg */
  --foreground: hsl(0 0% 98%);
  --primary: #0a1628;                  /* navy */
  --primary-foreground: #ffffff;
  --accent: #e87722;                   /* orange */
  --accent-foreground: #ffffff;
  --ring: #e87722;                     /* orange focus ring */
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
}
```

### Pattern 4: Next.js Font Optimization with Inter
**What:** Load Inter as a variable font using `next/font/google`, expose it as a CSS variable, and use it as the default sans-serif font in Tailwind.
**When to use:** Root layout setup.
**Example:**
```typescript
// Source: https://nextjs.org/docs/app/getting-started/fonts
// src/app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

Then in globals.css with the `@theme` directive:
```css
@theme {
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}
```

### Anti-Patterns to Avoid
- **Creating tailwind.config.ts for a Tailwind v4 project:** Tailwind v4 is CSS-first. Do NOT create a JavaScript config file. Use `@theme` in globals.css instead. The shadcn init process correctly detects Tailwind v4 and leaves `tailwind.config` blank in components.json.
- **Using `@tailwind base/components/utilities` directives:** These are Tailwind v3 syntax. In v4, use `@import "tailwindcss"` as a single import.
- **Using `tailwindcss-animate` plugin:** This plugin is for Tailwind v3 only. For v4, use `tw-animate-css` which is imported in CSS, not configured as a plugin.
- **Using `tailwind-merge` v1.x:** v1.x resolves Tailwind v3 class names. For v4, you need `tailwind-merge` v3.x which understands v4's class syntax.
- **Hardcoding hex values in components:** Always use Tailwind utility classes (`bg-navy`, `text-orange-500`) rather than inline styles or arbitrary values.
- **Using `forwardRef` in new components:** React 19 no longer needs `forwardRef`; ref is passed as a regular prop. shadcn/ui components for v4 already reflect this change.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Component variant system | Custom className logic with if/else | `class-variance-authority` (cva) | Handles variant combinations, default variants, compound variants; type-safe |
| Class merging | String concatenation for className | `cn()` from `lib/utils.ts` (clsx + tailwind-merge) | Resolves Tailwind class conflicts correctly (e.g., `bg-red-500` overrides `bg-blue-500`) |
| Font loading | Manual `@font-face` declarations | `next/font/google` | Automatic subsetting, self-hosting, zero layout shift, CSS variable exposure |
| Accessible UI primitives | Custom dialog/sheet/dropdown | Radix UI via shadcn/ui | ARIA patterns, focus trapping, keyboard navigation are extremely hard to get right |
| CSS animation utilities | Custom `@keyframes` for component animations | `tw-animate-css` | Pre-built, tested animation classes that integrate with shadcn component states |

**Key insight:** The shadcn/ui + Tailwind v4 + Radix UI ecosystem provides a complete design system foundation. Building any of these primitives from scratch introduces accessibility bugs and maintenance burden with zero upside.

## Common Pitfalls

### Pitfall 1: shadcn CSS Variable Collision with Custom Brand Palette
**What goes wrong:** shadcn/ui generates CSS variables named `--primary`, `--accent`, etc. If you also define `--color-primary` and `--color-accent` in `@theme` for your brand colors, the two systems can conflict -- shadcn components use their variables while custom components use `@theme` variables, resulting in inconsistent colors.
**Why it happens:** shadcn's CSS variables (HSL-based in `:root`) and Tailwind v4's `@theme` variables (direct color values) are two separate systems that can coexist but need intentional mapping.
**How to avoid:** Map shadcn's semantic variables (--primary, --accent) directly to brand colors during init. Set `--primary` to navy (#0a1628) and `--accent` to orange (#e87722) in the `:root` block. Then use `@theme inline` to expose them as Tailwind utilities. This is the ONE source of truth.
**Warning signs:** Button components render with different colors than custom sections using the same color name.

### Pitfall 2: Tailwind v3 Patterns in a v4 Project
**What goes wrong:** Developers familiar with v3 create a `tailwind.config.ts` file, use `@tailwind base;` directives, install `tailwindcss-animate` as a plugin, or use `tailwind-merge` v1.x. The project appears to work initially but breaks when adding shadcn components that expect v4 patterns.
**Why it happens:** Most tutorials and Stack Overflow answers still reference v3 patterns. The existing project (Next.js 14) used v3 patterns exclusively.
**How to avoid:** Use `@import "tailwindcss"` not `@tailwind` directives. Use `@theme` not `tailwind.config.ts`. Use `tw-animate-css` not `tailwindcss-animate`. Use `tailwind-merge` v3.x not v1.x. Leave `tailwind.config` blank in `components.json`.
**Warning signs:** PostCSS warnings, utilities not generating, animation classes not working.

### Pitfall 3: Route Group Layout Misunderstanding
**What goes wrong:** Defining a root `layout.tsx` AND a `(marketing)/layout.tsx` where the marketing layout duplicates the `<html>` and `<body>` tags, or removing the root layout entirely and forgetting to define the home page inside a route group.
**Why it happens:** Developers confuse route group layouts with root layouts. The root layout (`app/layout.tsx`) MUST exist and contain `<html>` and `<body>`. Route group layouts (`app/(marketing)/layout.tsx`) add ADDITIONAL wrapping inside the body.
**How to avoid:** Keep `app/layout.tsx` as the root with `<html>`, `<body>`, font setup. Put `app/(marketing)/layout.tsx` as a nested layout with nav/footer. Put `app/(marketing)/page.tsx` as the homepage.
**Warning signs:** Hydration errors, duplicate `<html>` tags in source, 404 on `/`.

### Pitfall 4: 21st.dev Component Installation Failure
**What goes wrong:** Running `npx shadcn@latest add "https://21st.dev/r/..."` fails because shadcn does not recognize the 21st.dev registry URL, or the component has dependencies not installed in the project.
**Why it happens:** 21st.dev components use the shadcn registry protocol but are hosted externally. Network issues, API changes, or missing Tailwind theme variables that the component expects can cause failures.
**How to avoid:** First ensure shadcn is properly initialized (`components.json` exists). Run the add command and check the output for dependency warnings. After installation, verify the component renders by importing it into a test page. Have a fallback plan to use a standard shadcn component if the 21st.dev component fails.
**Warning signs:** CLI errors during `add`, TypeScript import errors, missing CSS variables referenced by the component.

### Pitfall 5: Orange/Accent Color Contrast on Light Backgrounds
**What goes wrong:** Orange (#e87722) used as text on white or light backgrounds fails WCAG AA contrast requirements. The contrast ratio of #e87722 on white is approximately 3.1:1 -- below the 4.5:1 minimum for normal text.
**Why it happens:** Orange is a medium-luminance color that looks vibrant but lacks sufficient contrast against light backgrounds.
**How to avoid:** Use `text-orange-700` or `text-orange-800` for text on light backgrounds. Reserve `text-orange-500` (#e87722) for large text (3:1 ratio acceptable), decorative elements, borders, and text on dark backgrounds. Always verify with a contrast checker.
**Warning signs:** Lighthouse accessibility audit flags contrast failures.

## Code Examples

Verified patterns from official sources:

### Create Next.js 15 Project with Tailwind v4
```bash
# Source: https://nextjs.org/docs/app/getting-started/installation
# Source: https://tailwindcss.com/docs/guides/nextjs
npx create-next-app@latest my-project --typescript --eslint --tailwind --app --src-dir
cd my-project
```

### PostCSS Configuration for Tailwind v4
```javascript
// Source: https://tailwindcss.com/docs/guides/nextjs
// postcss.config.mjs
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### Complete globals.css with Brand Theme
```css
/* Source: https://tailwindcss.com/docs/customizing-colors
   Source: https://ui.shadcn.com/docs/tailwind-v4 */
@import "tailwindcss";
@import "tw-animate-css";

/* Brand color palette */
@theme {
  --color-navy: #0a1628;
  --color-orange: #e87722;

  /* Font family override */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}

/* shadcn semantic tokens mapped to brand */
:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222 50% 10%);
  --primary: #0a1628;
  --primary-foreground: #ffffff;
  --accent: #e87722;
  --accent-foreground: #ffffff;
  --muted: hsl(220 14% 96%);
  --muted-foreground: hsl(220 9% 46%);
  --card: hsl(0 0% 100%);
  --card-foreground: hsl(222 50% 10%);
  --border: hsl(220 13% 91%);
  --input: hsl(220 13% 91%);
  --ring: #e87722;
  --radius: 0.75rem;
}

/* Register shadcn variables as Tailwind utilities */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}
```

### Root Layout with Inter Font
```typescript
// Source: https://nextjs.org/docs/app/getting-started/fonts
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPSJOA",
  description: "St. Joan of Arc Catholic Church",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
```

### Marketing Route Group Layout
```typescript
// src/app/(marketing)/layout.tsx
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Navigation will be added in later phases */}
      <main id="main-content">{children}</main>
      {/* Footer will be added in later phases */}
    </>
  );
}
```

### shadcn/ui Component with Brand Colors
```typescript
// After: npx shadcn@latest add button
// src/components/ui/button.tsx will be generated
// Usage with brand colors:
import { Button } from "@/components/ui/button";

export function Example() {
  return (
    <div>
      {/* Uses --primary (navy) by default */}
      <Button>Primary Action</Button>

      {/* Uses brand orange via className override */}
      <Button className="bg-orange text-white hover:bg-orange-600">
        Accent Action
      </Button>
    </div>
  );
}
```

### Installing a 21st.dev Component
```bash
# Source: https://github.com/serafimcloud/21st
# Browse components at https://21st.dev and copy the install command
# Pattern: npx shadcn@latest add "https://21st.dev/r/{username}/{component-name}"
npx shadcn@latest add "https://21st.dev/r/shadcn/button"
```

### components.json for Tailwind v4
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

Note: `tailwind.config` is BLANK (empty string) for Tailwind v4 projects. This is correct and expected.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.ts` for colors/fonts | `@theme` directive in CSS | Tailwind v4 (Jan 2025) | No JS config file needed; faster compilation |
| `@tailwind base; @tailwind components; @tailwind utilities;` | `@import "tailwindcss";` | Tailwind v4 | Single CSS import replaces three directives |
| `tailwindcss-animate` plugin | `tw-animate-css` CSS import | shadcn/ui Tailwind v4 migration (Mar 2025) | Animation classes via CSS import, not plugin |
| HSL color format in CSS variables | OKLCH recommended (HSL still supported) | Tailwind v4 | Wider color gamut; better perceptual uniformity |
| `React.forwardRef` in components | Direct ref prop (React 19) | React 19 / shadcn v4 update | Simpler component definitions |
| `tailwind-merge` v1.x | `tailwind-merge` v3.x | Tailwind v4 | Understands v4 class syntax |
| `"default"` shadcn style | `"new-york"` style (default deprecated) | shadcn/ui 2025 | New York is now the only maintained style |

**Deprecated/outdated:**
- `tailwindcss-animate`: Replaced by `tw-animate-css` for Tailwind v4
- `"default"` shadcn style: Deprecated; use `"new-york"`
- `tailwind.config.ts` / `tailwind.config.js`: Not needed for Tailwind v4 projects
- `@tailwind` directives: Replaced by `@import "tailwindcss"`
- `React.forwardRef`: Not needed in React 19

## Open Questions

1. **Which specific 21st.dev component to install?**
   - What we know: 21st.dev has hundreds of community components across categories (heroes, buttons, cards, etc.). Installation uses `npx shadcn@latest add "https://21st.dev/r/{username}/{component}"`.
   - What's unclear: The phase requirement says "at least one 21st.dev component" but does not specify which one. The choice should align with the project's visual needs.
   - Recommendation: Browse 21st.dev for a component that demonstrates the brand colors well (e.g., a hero section or an animated button variant). The specific component is at the planner's discretion, but it should be something visually verifiable.

2. **Exact navy color shade scale**
   - What we know: The primary navy is #0a1628. A full shade scale (50-950) is needed for Tailwind utilities.
   - What's unclear: Whether the shade scale should be hand-crafted or generated.
   - Recommendation: Generate the scale using a color tool or define at minimum: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950. The base (#0a1628) is very dark, so it should map to the 900 or 950 position.

3. **React 19 peer dependency handling with npm**
   - What we know: When using npm (not pnpm/yarn), some packages may need `--legacy-peer-deps` flag due to React 19 peer dependency conflicts.
   - What's unclear: Whether the project will use npm, pnpm, or another package manager.
   - Recommendation: If using npm and encountering peer dependency errors during `shadcn add`, use `--legacy-peer-deps`. Consider using pnpm for smoother dependency resolution.

## Sources

### Primary (HIGH confidence)
- [Next.js Installation Docs](https://nextjs.org/docs/app/getting-started/installation) - create-next-app setup, App Router, TypeScript
- [Tailwind CSS v4 Next.js Guide](https://tailwindcss.com/docs/guides/nextjs) - v4.2 setup with PostCSS, `@import "tailwindcss"`
- [Tailwind CSS Customizing Colors](https://tailwindcss.com/docs/customizing-colors) - `@theme` directive for custom color palette
- [shadcn/ui Next.js Installation](https://ui.shadcn.com/docs/installation/next) - init and component add commands
- [shadcn/ui Tailwind v4 Guide](https://ui.shadcn.com/docs/tailwind-v4) - CSS variable migration, OKLCH, `@theme inline`, tw-animate-css
- [shadcn/ui components.json Docs](https://ui.shadcn.com/docs/components-json) - Full schema including registries, Tailwind v4 config (blank)
- [Next.js Route Groups](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups) - `(marketing)` folder convention, caveats
- [Next.js Font Optimization](https://nextjs.org/docs/app/getting-started/fonts) - Inter variable font, CSS variable approach

### Secondary (MEDIUM confidence)
- [21st.dev GitHub Repository](https://github.com/serafimcloud/21st) - Component installation via `npx shadcn@latest add` with 21st.dev URLs
- [21st.dev CLI](https://github.com/21st-dev/cli) - MCP server installation for AI IDE integration
- Multiple Medium articles from 2025-2026 confirming Next.js 15 + Tailwind v4 + shadcn setup patterns

### Tertiary (LOW confidence)
- Exact shade scale values for navy #0a1628 and orange #e87722 (should be generated/validated with a color tool)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Verified against official Next.js, Tailwind CSS, and shadcn/ui documentation
- Architecture: HIGH - Route groups documented in official Next.js docs; Tailwind v4 `@theme` pattern verified
- Pitfalls: HIGH - CSS variable collision is well-documented from prior project experience (PITFALLS.md); Tailwind v3/v4 confusion is a known issue in the ecosystem

**Research date:** 2026-03-03
**Valid until:** 2026-04-03 (30 days - stable technologies with mature documentation)
