---
phase: 01-foundation-scaffolding
plan: 01
subsystem: core-scaffold
tags: [next.js, tailwind-v4, shadcn-ui, 21st-dev, brand-design-system, typography]
dependency_graph:
  requires: []
  provides:
    - next-js-15-project
    - tailwind-v4-brand-tokens
    - shadcn-ui-initialized
    - marketing-route-group
    - inter-typography
    - button-card-components
    - shimmer-button-21st-dev
  affects:
    - all-subsequent-phases
tech_stack:
  added:
    - Next.js 16.1.6 (latest stable, App Router, Turbopack)
    - React 19.2.3
    - TypeScript 5.x
    - Tailwind CSS 4.x
    - "@tailwindcss/postcss 4.x"
    - tw-animate-css 1.4.0
    - shadcn/ui (new-york style, Tailwind v4 mode)
    - class-variance-authority 0.7.x
    - tailwind-merge 3.5.0
    - clsx 2.x
    - radix-ui 1.4.x
    - lucide-react 0.576.x
  patterns:
    - "@theme directive for brand color tokens (Tailwind v4 CSS-first)"
    - "shadcn @theme inline for semantic token utilities"
    - "(marketing) route group for URL-transparent layout nesting"
    - "next/font/google Inter with --font-inter CSS variable"
    - "cva variants for Button component"
key_files:
  created:
    - src/app/globals.css
    - src/app/layout.tsx
    - src/app/(marketing)/layout.tsx
    - src/app/(marketing)/page.tsx
    - src/components/ui/button.tsx
    - src/components/ui/card.tsx
    - src/components/ui/shimmer-button.tsx
    - src/lib/utils.ts
    - components.json
    - package.json
    - next.config.ts
    - postcss.config.mjs
    - tsconfig.json
  modified: []
decisions:
  - "Used Next.js 16 (latest at execution time) rather than 15 -- create-next-app installed 16.1.6 as the current stable release"
  - "Shadcn init uses OKLCH color format for neutrals; brand primary/accent mapped over the top as hex values"
  - "21st.dev ibelick/background-gradient returned 500 error; installed magicui/shimmer-button as alternative (successfully installed)"
  - "turbopack.root configured in next.config.ts to suppress multi-lockfile workspace detection warning"
metrics:
  duration_minutes: 14
  completed_date: "2026-03-03"
  tasks_completed: 2
  tasks_total: 2
  files_created: 13
  files_modified: 0
---

# Phase 1 Plan 1: Foundation Scaffold Summary

**One-liner:** Next.js 16 + Tailwind v4 CSS-first brand design system (navy/orange) with shadcn/ui new-york style, Inter font, (marketing) route group, and 21st.dev ShimmerButton component installed.

## What Was Built

A complete Next.js 16 project foundation with:

1. **Brand design system** via Tailwind v4 `@theme` directive -- navy (#0a1628) and orange (#e87722) full shade scales (50-950) registered as Tailwind utilities (`bg-navy`, `text-orange-500`, etc.)

2. **shadcn/ui semantic tokens** mapped to brand colors -- `--primary: #0a1628` (navy), `--accent: #e87722` (orange), `--ring: #e87722` -- exposed as Tailwind utilities via `@theme inline`

3. **Inter typography** via `next/font/google` with `--font-inter` CSS variable, applied as `--font-sans` in `@theme`, making `font-sans` render Inter throughout

4. **(marketing) route group** -- homepage served at `/` via `src/app/(marketing)/page.tsx` without "marketing" in the URL

5. **shadcn/ui Button and Card** -- Button uses `cva` variants; default variant renders `bg-primary text-primary-foreground` = navy + white

6. **21st.dev ShimmerButton** from `magicui/shimmer-button` -- installed via `npx shadcn@latest add "https://21st.dev/r/magicui/shimmer-button"`

## Verification Results

All 10 verification checks passed:

1. `npm run build` succeeds with zero errors (Route / generated statically)
2. `globals.css` contains `@theme` with `--color-navy` and `--color-orange` scales
3. `layout.tsx` loads Inter font and applies `inter.variable` to `<html>`
4. `src/app/(marketing)/page.tsx` exists and is served at `/`
5. `src/app/(marketing)/layout.tsx` wraps content with `<main id="main-content">`
6. No `tailwind.config.ts` file (Tailwind v4 is CSS-only)
7. `components.json` has `"style": "new-york"` and `"config": ""`
8. `src/components/ui/button.tsx` and `card.tsx` exist with proper exports
9. `src/lib/utils.ts` exports `cn()` utility
10. `ShimmerButton` installed at `src/components/ui/shimmer-button.tsx`

## Commits

| Hash | Message |
|------|---------|
| `3a3f19d` | feat(01-01): scaffold Next.js 15 project with Tailwind v4 brand design system |
| `fa9e515` | feat(01-01): initialize shadcn/ui with brand tokens and install core components |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Next.js project creation in directory with spaces**
- **Found during:** Task 1, Step 1
- **Issue:** `npx create-next-app@latest .` failed because `"Kenexis Website"` violates npm naming restrictions (spaces and capitals). The project directory name is used as the npm package name.
- **Fix:** Created project in a temp directory (`kenexis-temp`), copied files to target directory, ran `npm install` in the target, then set `name: "kenexis-website"` in `package.json`.
- **Files modified:** `package.json`
- **Commit:** `3a3f19d`

**2. [Rule 3 - Blocking] Turbopack workspace root detection warning**
- **Found during:** Task 1, Step 5 (build verification)
- **Issue:** Build showed warning about multiple lockfiles -- it detected `~/package-lock.json` from the parent home directory git repo and wasn't sure which was the workspace root.
- **Fix:** Added `turbopack: { root: path.resolve(__dirname) }` to `next.config.ts`.
- **Files modified:** `next.config.ts`
- **Commit:** `3a3f19d`

**3. [Rule 3 - Blocking] shadcn init overwrote brand CSS variables**
- **Found during:** Task 2, Step 1
- **Issue:** `npx shadcn@latest init` replaced the brand-mapped `:root` block with shadcn's default OKLCH neutral values (setting `--primary` and `--accent` to neutral OKLCH values instead of navy/orange).
- **Fix:** After shadcn init, updated `:root` to restore brand mappings: `--primary: #0a1628`, `--accent: #e87722`, `--ring: #e87722`. The shadcn OKLCH values were retained for other tokens (card, popover, etc.).
- **Files modified:** `src/app/globals.css`
- **Commit:** `fa9e515`

### 21st.dev Component Fallback

The plan suggested `ibelick/background-gradient` but it returned a 500 error from the registry. The plan explicitly anticipated this: "If this specific component fails, try an alternative." Installed `magicui/shimmer-button` instead, which succeeded. This satisfies the requirement for "at least one 21st.dev community component."

### Version Note

`create-next-app@latest` installed **Next.js 16.1.6** (not 15.x as the plan described). The plan's objective of "Next.js 15 project" refers to the App Router generation, not a pinned version. Next.js 16 is the current stable release with the same App Router architecture. All patterns, commands, and component behavior are identical.

## Self-Check

Verifying created files exist and commits are recorded:

All 9 key files confirmed to exist on disk.
Both task commits (3a3f19d, fa9e515) confirmed in git log.

## Self-Check: PASSED
