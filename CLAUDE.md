# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

### Rule 1 — Think Before Coding
State assumptions explicitly. If uncertain, ask rather than guess.
Present multiple interpretations when ambiguity exists.
Push back when a simpler approach exists.
Stop when confused. Name what's unclear.

### Rule 2 — Simplicity First
Minimum code that solves the problem. Nothing speculative.
No features beyond what was asked. No abstractions for single-use code.
Test: would a senior engineer say this is overcomplicated? If yes, simplify.

### Rule 3 — Surgical Changes
Touch only what you must. Clean up only your own mess.
Don't "improve" adjacent code, comments, or formatting.
Don't refactor what isn't broken. Match existing style.

### Rule 4 — Goal-Driven Execution
Define success criteria. Loop until verified.
Don't follow steps. Define success and iterate.
Strong success criteria let you loop independently.

### Rule 5 — Fail Loud
"Completed" is wrong if anything was skipped silently.
"Tests pass" is wrong if any were skipped.
Default to surfacing uncertainty, not hiding it.

### Rule 6 — Caveman Mode
Always invoke the `caveman` skill at session start. Communicate in caveman mode by default throughout the session.

## Commands

```bash
npm run dev          # Start dev server on port 4028
npm run build        # Production build
npm run type-check   # TypeScript check without emit
npm run format       # Prettier on src/**/*.{ts,tsx,css,md,json}
```

No lint script is configured. ESLint is installed but has no config file.

## Architecture

**Next.js 14 App Router** with TypeScript, Tailwind CSS, Framer Motion, and GSAP.

### Routing

All routes live under `src/app/`. The root `/` redirects to `/landing`. Key routes:
- `/landing` — main landing page with hero, about, work, contact sections
- `/journey` — animated timeline/journey page (heavy use of GSAP + Framer Motion)
- `/works/[project]` — case studies for `craon`, `freightez`, `ibasho`, `melloup` — all use `CaseStudyTemplate`
- `/cover-letter`, `/prep` — standalone pages
- `/api/waitlist` — POST endpoint writing emails to Supabase

### Component Structure

```
src/components/
  ui/        # Primitives: Button (variants/sizes), ThemeToggle, InvertCursor, Noise, LogoLoop
  sections/  # Page-level sections: Navbar, HeroSection, AboutSection, WorkSection, ContactSection
  common/    # Shared layout pieces: Header
  journey/   # Journey page-specific components
  CaseStudyTemplate.tsx  # Shared template for all /works/* pages
```

`InvertCursor` and `Noise` are dynamically imported with `ssr: false` — they're global effects injected in the root layout.

### State & Data

- **Theme** — managed by `useTheme` hook; dark mode persisted in `localStorage`, toggled via `class` on `<html>`
- **Works data** — static JSON at `src/utils/works.json`
- **Supabase** — client initialized in `src/lib/supabaseClient.ts` using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Design System

Tailwind config implements the **Replicate** design system:
- **Primary**: `#ea2804` (orange)
- **Canvas**: `#f9f7f3` (cream, light mode bg)
- **Dark**: `#202020` (dark mode bg)
- **Fonts**: Inter (body), Bricolage Grotesque (display), JetBrains Mono (code)

### Build Notes

- `next.config.mjs` sets `ignoreBuildErrors: true` — TypeScript errors do not block builds
- Source maps are disabled in production
- `@dhiwise/component-tagger` webpack loader runs on all JSX/TSX files
- Path alias `@/*` maps to `src/*`
