# Journey Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the /journey page responsive, browser/agent-friendly, and add six approved creative features — with zero visual regressions to the existing experience.

**Architecture:** Introduce a single layout manifest (`layout.ts`) as the source of truth for the horizontal world's geometry; all other work (fast travel, minimap, haiku placement) derives from it. Creative features extend existing systems (AmbientCanvas zones, AtmosphereOverlay progress ramps, ProjectBook state) rather than adding new ones.

**Tech Stack:** Next.js 14, TypeScript, Framer Motion, GSAP, canvas 2D.

## Global Constraints

- Zero visual change for Tasks 1–3 at current breakpoints (desktop / <768px mobile).
- All world positions expressed in viewport-width (vw) units via the manifest; no new hardcoded multipliers outside `layout.ts`.
- `#ink-rough` filter only inside journey page elements (per CLAUDE.md).
- Verification per task: `npm run type-check` passes. Final: `npm run build` + visual check on port 4028.
- No test framework exists in this repo — no unit tests are added (deviation from skill default, approved reasoning in session).

---

### Task 1: Layout manifest

**Files:**
- Create: `src/components/journey/layout.ts`
- Modify: `src/components/journey/HorizontalJourney.tsx`, `src/components/journey/JourneySection.tsx`, `src/components/journey/ProjectBook.tsx`

**Interfaces (produced):**
```ts
SECTIONS: { id: 'hero'|'projects'|'process'|'contact'; bg: number; width: number; widthMobile?: number }[]
widthOf(id, isMobile): number      // vw units
startOf(id, isMobile): number      // vw units — cumulative sum of prior widths
totalWidth(isMobile): number       // 5.7 desktop / 6.7 mobile
maxScrollVw(isMobile): number      // totalWidth - 1
waypointDefs(isMobile): { label; x; targetVw; showArrow }[]
chestVw(isMobile): number          // startOf('contact') + 0.5
processProgress(scrollX, vw, isMobile): number  // 0..1
```

**Equivalence table (must reproduce current values exactly):**
| Value | Desktop | Mobile |
|---|---|---|
| starts | 0, 1.5, 3.7, 4.7 | 0, 1.5, 3.7, 5.7 |
| chest | 5.2vw + 60px | 6.2vw + 60px |
| waypoints | 0.5, 2.6, 3.7, 4.7 | 0.5, 2.6, 4.7, 5.7 |
| processProgress | (x/vw − 2.7) / 1 | (x/vw − 3.7) / 2 |

processProgress formula: `clamp((x/vw − (startOf('process') − leadIn)) / span)` with `leadIn = isMobile ? 0 : 1`, `span = isMobile ? 2 : 1`.

- [ ] Create layout.ts with the interface above
- [ ] Replace literals in HorizontalJourney (widths, chest, waypoints, process progress)
- [ ] Replace the switch in JourneySection with `startOf(id, isMobile) * windowWidth`
- [ ] Replace `vw * 1.5` in ProjectBook with `startOf('projects', isMobile) * vw`
- [ ] `npm run type-check`

### Task 2: Semantic mirror + noscript

**Files:**
- Create: `src/components/journey/projects.ts` (PROJECTS array moved out of ProjectBook so the server component can import it)
- Modify: `src/app/journey/page.tsx`, `src/components/journey/ProjectBook.tsx`

Page gains a `<section className="sr-only">`: h1 name + role, intro line, project list linking `/works/*` with subtitle/role, contact links (GitHub, LinkedIn, Twitter, résumé PDF — inlined; FarewellChest is a client module), and a link to `/landing`. Plus `<noscript>` banner pointing to `/landing`. Contact URLs duplicated from FarewellChest — acceptable, 4 lines.

- [ ] Move PROJECTS to projects.ts; import in ProjectBook
- [ ] Add sr-only section + noscript to page.tsx
- [ ] `npm run type-check`

### Task 3: Input fixes

**Files:** Modify: `HorizontalJourney.tsx`, `ParallaxBackground.tsx`

- Wheel: use dominant axis — `Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY * 0.8`.
- Touch: track both axes (`scrollLeft = start + (startY − y) + (startX − x)`); container `touchAction: 'pinch-zoom'` (restores zoom — WCAG 1.4.4 — browser handles pinch, JS handles pans on both axes).
- Keyboard: move keydown from `window` to the container (`tabIndex=0`, `role="region"`, `aria-label`, focused on mount, `outline-none`); add Home/End → smooth-scroll to start/end.
- Reduced motion: wrap root in `<MotionConfig reducedMotion="user">`; ParallaxBackground Hook C entrance becomes `gsap.set(y: 0)` under `prefers-reduced-motion`. (AmbientCanvas + drift already gated.)

- [ ] All four changes, `npm run type-check`

### Task 4: Fast-travel signposts

**Files:** Modify: `WaypointSignpost.tsx`, `HorizontalJourney.tsx`

Signpost gains `onNavigate?: () => void`; when present the board renders inside a `<button aria-label="Travel to {label}">` with pointer-events restored + hover scale. HorizontalJourney maps `waypointDefs(isMobile)` and passes `() => container.scrollTo({ left: targetVw * vw, behavior: 'smooth' })`. Targets: work→projects start, process→process start, contact/rest→contact start.

- [ ] Implement, `npm run type-check`

### Task 5: Journey minimap

**Files:** Modify: `HorizontalJourney.tsx`

Replace the bare % counter: 148px road strip (1px line), dots at `startOf(section)/maxScrollVw` (passed dots turn `replicate-primary`), white glowing samurai marker at `progress`, small % label kept beside it. `role="progressbar"` + aria values. `z-[60]` so it stays readable at night.

- [ ] Implement, `npm run type-check`

### Task 6: Weather zones (AmbientCanvas)

**Files:** Modify: `AmbientCanvas.tsx`

- Leaves: new particle pool (budget 14, amber/brown tones), active during the mote/dusk window (`moteA`), gust envelope `max(0, sin(t·0.35))³ · 2.2` multiplying wind.
- Shooting star: single meteor slot, spawns when `nightA > 0.5` after a 7–17s cooldown; ~0.9s diagonal streak with fading tail; alpha `sin(π·life/max) · nightA`.

- [ ] Implement, `npm run type-check`

### Task 7: Moon rise (AtmosphereOverlay)

**Files:** Modify: `AtmosphereOverlay.tsx`

Screen-blend layer after the night layer, before vignette: 74px cream disc (radial gradient + double glow shadow) at `right: 16%`, `top: 38% − night·22%`, opacity = night. Pure CSS, progress-driven like the rest of the file.

- [ ] Implement, `npm run type-check`

### Task 8: Wax-seal visited stamps (ProjectBook)

**Files:** Modify: `ProjectBook.tsx`

`visited: string[]` from `sessionStorage['journey-visited']` (read in effect, guarded); "View Work" writes route before `router.push`. When visited, a 28px tilted wax seal (`rgba(234,40,4,0.75)`, ink-rough, ✦) stamps the text page corner (both desktop and mobile layouts). Hooks declared before existing early returns.

- [ ] Implement, `npm run type-check`

### Task 9: Campfire finale

**Files:**
- Create: `src/components/journey/Campfire.tsx`
- Modify: `HorizontalJourney.tsx`, `AmbientCanvas.tsx`

- Campfire world-anchored at `startOf('contact') + 0.18` vw: crossed log divs, 3 layered flame gradients with framer flicker, breathing glow; opacity driven by night intensity `ramp(progress, 0.74, 0.92)`; z-44.
- Fireflies attracted: `AmbientState` gains `attractorX: number | null` (campfire screen-x, set in the scroll handler); firefly update eases toward it when on-screen.
- Lantern handover: lantern glow opacity × `clamp((campfireScreenX − 0.5vw) / 0.35vw)` — lantern dies as the fire takes over.

- [ ] Implement, `npm run type-check`

### Task 10: Scroll-composed haiku

**Files:** Modify: `HorizontalJourney.tsx`

Three world-anchored fixed lines (Georgia italic, 0.85rem, tracking 0.14em, ink-rough, pointer-events-none, z-30), opacity `1 − min(1, |screenX − 0.5vw| / 0.45vw)`:
1. "ink dries on the road" — 1.15vw, warm ink
2. "a traveller walks the page" — process start + 0.4 (desktop) / + 0.65 (mobile), warm ink
3. "goodnight, drifting stars" — contact start + 0.5, top 32%, sky white

- [ ] Implement, `npm run type-check`

### Final verification

- [ ] `npm run type-check` clean
- [ ] `npm run build` succeeds
- [ ] Visual check: dev server on 4028, screenshot hero / book / process / night-end at desktop + 390px mobile widths
