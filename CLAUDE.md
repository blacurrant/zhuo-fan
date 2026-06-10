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
- **Primary**: `#ea2804` (orange-red)
- **Canvas**: `#f9f7f3` (cream, light mode bg)
- **Dark**: `#202020` (dark mode bg)
- **Fonts**: Inter (body), Bricolage Grotesque (display), JetBrains Mono (code)

---

## Design Language

### Colour Palette

| Token | Value | Use |
|---|---|---|
| `replicate-canvas` | `#f9f7f3` | Page background (light), journey world floor |
| `replicate-surface-dark` | `#202020` | Page background (dark) |
| `replicate-ink` | `#202020` | Primary text (light mode) |
| `replicate-primary` | `#ea2804` | Accent — CTA, wax seal, progress bar, red ornament |
| `replicate-primary-deep` | `#c01f00` | Hover state for primary |
| `replicate-body` | `#3a3a3a` | Body copy |
| `replicate-charcoal` | `#575757` | Secondary text |
| `replicate-ash` | `#8d8d8d` | Muted / placeholder text |
| `replicate-hairline` | `rgba(32,32,32,0.12)` | Dividers, borders |
| `replicate-on-dark` | `#fcfcfc` | Text on dark bg |
| `replicate-on-dark-mute` | `rgba(252,252,252,0.72)` | Secondary text on dark |
| Warm ink (journey) | `rgba(20,12,5,0.92)` | Letterpress text — warmer than pure black |
| Sky white (journey) | `rgba(255,255,255,0.42–1.0)` | Text over mountain/sky backdrops |
| Hairline warm (journey) | `rgba(20,12,5,0.22)` | Ornament rules inside journey |

### Typography

Two co-existing type systems are used across the site:

#### System 1 — Replicate UI (landing, case studies)
- **Display / headings**: `font-display` → Bricolage Grotesque. Bold–medium weight. Uppercase for hero names.
- **Body**: `font-body` / `font-inter` → Inter. Light–medium.
- **Code / mono**: `font-mono` → JetBrains Mono.

#### System 2 — Editorial / Letterpress (journey page)
- **Hero name + "goodnight"**: `"Playfair Display", "Georgia", serif`. Weight 100 (ultra-light). `clamp(3.8rem, 8vw, 7rem)`. Line-height `0.88`. Tracking `-0.02em`. Always uses `#ink-rough` SVG filter.
- **Edition label**: Georgia. `0.6rem`. Tracking `0.32em`. Uppercase. `rgba(20,12,5,0.8)`.
- **Role / italic prose**: Georgia italic. `clamp(0.9rem, 1.4vw, 1.1rem)`. Tracking `0.06em`.
- **Body prose**: Georgia. `clamp(0.78rem, 1.05vw, 0.9rem)`. Line-height `1.9`.
- **CTA stamped text**: Georgia italic. `0.75rem`. Tracking `0.12em`. Uppercase.
- **Section sky title ("Adventures")**: `font-display` (Bricolage Grotesque). `9.2vw`. Bold. Tracking `-0.02em`. White, faded with `mask-image` bottom gradient.
- **Waypoint labels**: `font-display`. Light weight. Scaled by `viewportScale`.
- **Progress %**: `font-body`. `text-xs`. Tracking `0.18em`. Uppercase.

### The `#ink-rough` SVG Filter

A fractal-noise displacement filter that gives all letterpress elements a woodblock/handpress texture. Defined once per page as a hidden `<svg>` and applied via `filter: url(#ink-rough)`:

```xml
<filter id="ink-rough">
  <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="7" result="noise" />
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
</filter>
```

Apply to: hero name, edition label, ornament ✦, wax seal, any stamped text. **Do not apply to UI elements outside the journey page.**

### Decorative Elements (Journey)

- **✦ ornament**: used as divider centre-piece and wax seal icon.
- **Horizontal rule**: 44px × 1px, `rgba(20,12,5,0.22)`. Flanks ornaments.
- **Wax seal**: 46px circle, `rgba(234,40,4,0.85)` fill, `#ink-rough` filter, "NC" monogram in Georgia 0.38rem + ✦.
- **Wooden signpost**: bg `#8b5a2b`, border `#5c3a21`, text `#f4e4bc`. Post `#5c3a21`.
- **Music stamp**: 54px circle, dashed border when off, solid `rgba(234,40,4,0.92)` when on. Playfair ♪/♫ glyph.

### Motion Principles

- **Easing**: `[0.16, 1, 0.3, 1]` (expo-out) for entrances. `[0.4, 0, 0.2, 1]` (standard) for exits/transitions.
- **Fade-in duration**: `1.0–1.4s` for major elements. Staggered: `0.15 → 0.3 → 0.6 → 0.72 → 0.86 → 1.0 → 1.15`.
- **Scroll-fade**: `useTransform` scrollYProgress `[0,1] → opacity [1, 0.7]` + scale `[1, 0.7]` on hero.
- **Looping nudge**: `x: [0, 7, 0]`, `duration: 1.9`, `repeat: Infinity`, `ease: easeInOut` — used on arrow CTA.
- **Ink-rough animated elements**: always pair with `filter: url(#ink-rough)` inline style, not Tailwind class.

### Layout & Spacing

- Horizontal journey sections use `flex-shrink-0 h-full` with explicit pixel widths (`windowSize.width * N`).
- Tailwind spacing scale: `xs=4px sm=8px md=12px lg=16px xl=24px 2xl=32px 3xl=48px section=96px band=160px`.
- Radii: `xs=4px sm=6px md=10px lg=16px full=9999px`. Journey decorative elements use `border-radius: 50%` (wax seal) or `rounded-md` (signpost).
- Z-index layers (journey): background `z-0`, content `z-10`, foreground mountains `z-20`, overlays `z-[41]`, character/book UI `z-[45–50]`, music button `z-[100]`.

### Build Notes

- `next.config.mjs` sets `ignoreBuildErrors: true` — TypeScript errors do not block builds
- Source maps are disabled in production
- `@dhiwise/component-tagger` webpack loader runs on all JSX/TSX files
- Path alias `@/*` maps to `src/*`
