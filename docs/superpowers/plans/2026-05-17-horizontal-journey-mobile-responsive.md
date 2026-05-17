# Horizontal Journey Mobile Responsive — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the HorizontalJourney samurai scroll experience fluid and proportionally correct at every viewport width, from 375px mobile to 1920px desktop.

**Architecture:** A shared `useViewportScale` hook computes a continuous scale factor `clamp(windowWidth / 1920, 0.4, 1.0)`. Every journey component imports this hook and multiplies hardcoded pixel values by `viewportScale` — no binary mobile/desktop switch, just smooth proportional scaling. Native `overflow-x-auto` touch scroll already handles horizontal swipe on mobile; no touch handlers needed.

**Tech Stack:** React hooks, TypeScript, Framer Motion, Tailwind CSS (inline styles where dynamic sizing is needed)

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| **Create** | `src/hooks/useViewportScale.ts` | Shared hook: `{ windowSize, viewportScale }` |
| **Modify** | `src/components/journey/HorizontalJourney.tsx` | Replace local windowSize state with hook |
| **Modify** | `src/components/journey/JourneySection.tsx` | Replace local windowWidth state with hook |
| **Modify** | `src/components/journey/Character.tsx` | Scale character sprite and road height |
| **Modify** | `src/components/journey/WaypointSignpost.tsx` | Scale post height and text size |
| **Modify** | `src/components/journey/ProcessTimeline.tsx` | Scale tablet width, padding, min-height, fonts |
| **Modify** | `src/components/journey/FarewellChest.tsx` | Scale particle scatter and link offsets |
| **Modify** | `src/components/journey/ProjectBook.tsx` | Replace local windowSize state with hook |

---

## Task 1: Create `useViewportScale` hook

**Files:**
- Create: `src/hooks/useViewportScale.ts`

- [ ] **Step 1: Write the hook**

```typescript
// src/hooks/useViewportScale.ts
import { useState, useEffect } from 'react';

interface ViewportInfo {
  windowSize: { width: number; height: number };
  viewportScale: number;
}

export function useViewportScale(): ViewportInfo {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const update = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const viewportScale = Math.max(0.4, Math.min(1.0, windowSize.width / 1920));

  return { windowSize, viewportScale };
}
```

> `viewportScale` values: 375px → 0.4, 768px → 0.4, 960px → 0.5, 1280px → 0.667, 1920px → 1.0.
> Initial state `{ width: 1920, height: 1080 }` preserves current SSR/hydration behavior.

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useViewportScale.ts
git commit -m "feat(journey): add useViewportScale hook for fluid mobile scaling"
```

---

## Task 2: Update HorizontalJourney.tsx

**Files:**
- Modify: `src/components/journey/HorizontalJourney.tsx`

Remove the local `windowSize` state and its resize effect (lines 41–50). Replace with the hook.

- [ ] **Step 1: Add import and replace state**

Replace these lines at the top of the file:
```tsx
// REMOVE these lines (41-50):
const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

useEffect(() => {
  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };
  handleResize(); // Initial call
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

Add to imports at top of file:
```tsx
import { useViewportScale } from '@/hooks/useViewportScale';
```

Add inside the component body, after the other `useState` declarations:
```tsx
const { windowSize, viewportScale } = useViewportScale();
```

Also scale the dark road overlay height (currently `h-[200px]` class). Find this block near line 535:
```tsx
{/* Dark road overlay for final section */}
<div
  className="fixed bottom-0 left-0 w-full h-[200px] z-[41] pointer-events-none"
```

Change to:
```tsx
{/* Dark road overlay for final section */}
<div
  className="fixed bottom-0 left-0 w-full z-[41] pointer-events-none"
  style={{ height: Math.max(80, Math.round(200 * viewportScale)) }}
```

> Note: `windowSize` is now from the hook. All section width calculations (`windowSize.width * 1.5` etc.) automatically become mobile-correct.

- [ ] **Step 2: Commit**

```bash
git add src/components/journey/HorizontalJourney.tsx
git commit -m "feat(journey): use useViewportScale in HorizontalJourney"
```

---

## Task 3: Update JourneySection.tsx

**Files:**
- Modify: `src/components/journey/JourneySection.tsx`

Remove local `windowWidth` state (lines 22–29). Replace with hook.

- [ ] **Step 1: Add import and replace state**

Add import:
```tsx
import { useViewportScale } from '@/hooks/useViewportScale';
```

Replace lines 22–29:
```tsx
// REMOVE:
const [windowWidth, setWindowWidth] = React.useState(1920);

React.useEffect(() => {
  setWindowWidth(window.innerWidth);
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

With:
```tsx
const { windowSize: { width: windowWidth } } = useViewportScale();
```

No other changes needed — `windowWidth` usage in `sectionStartX` stays the same.

- [ ] **Step 2: Commit**

```bash
git add src/components/journey/JourneySection.tsx
git commit -m "feat(journey): use useViewportScale in JourneySection"
```

---

## Task 4: Update Character.tsx

**Files:**
- Modify: `src/components/journey/Character.tsx`

This is the most visible scaling change. Character renders at `scale(2.0)` hardcoded — must become `scale(2.0 * viewportScale)`. Road height also scales.

- [ ] **Step 1: Add import and replace windowWidth state**

Add import:
```tsx
import { useViewportScale } from '@/hooks/useViewportScale';
```

Replace lines 25–32:
```tsx
// REMOVE:
const [windowWidth, setWindowWidth] = useState(1920);

useEffect(() => {
  setWindowWidth(window.innerWidth);
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

With:
```tsx
const { windowSize: { width: windowWidth }, viewportScale } = useViewportScale();
```

- [ ] **Step 2: Scale character sprite transform**

Find line 224 (the `transform` style on the sprite div):
```tsx
transform: `scale(2.0) scaleX(${direction === 'left' ? -1 : 1})`,
```

Change to:
```tsx
transform: `scale(${2.0 * viewportScale}) scaleX(${direction === 'left' ? -1 : 1})`,
```

- [ ] **Step 3: Scale character bottom position**

Find line 186–187 (the outer `motion.div` style):
```tsx
style={{ left: characterX, bottom: 30 }}
```

Change to:
```tsx
style={{ left: characterX, bottom: Math.max(14, Math.round(30 * viewportScale)) }}
```

- [ ] **Step 4: Scale road height**

Find the road layer div (around line 234):
```tsx
className="fixed bottom-0 left-0 w-full h-[200px] z-40 pointer-events-none"
```

Change the className to remove `h-[200px]` and add `height` to the existing style prop:
```tsx
className="fixed bottom-0 left-0 w-full z-40 pointer-events-none"
style={{
  height: Math.max(80, Math.round(200 * viewportScale)),
  // keep existing background styles unchanged:
  backgroundImage: 'url(/road.png)',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: `${-scrollX}px center`,
  backgroundSize: 'auto 100%',
  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))',
}}
```

> The background styles are already inline — only `h-[200px]` is removed from className and replaced with the `height` style.

- [ ] **Step 5: Commit**

```bash
git add src/components/journey/Character.tsx
git commit -m "feat(journey): fluid character and road scaling via viewportScale"
```

---

## Task 5: Update WaypointSignpost.tsx

**Files:**
- Modify: `src/components/journey/WaypointSignpost.tsx`

Replace local state. Scale bottom position and text size.

- [ ] **Step 1: Add import and replace state**

Add import:
```tsx
import { useViewportScale } from '@/hooks/useViewportScale';
```

Replace lines 23–30:
```tsx
// REMOVE:
const [windowWidth, setWindowWidth] = React.useState(1920);

React.useEffect(() => {
  setWindowWidth(window.innerWidth);
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

With:
```tsx
const { windowSize: { width: windowWidth }, viewportScale } = useViewportScale();
```

- [ ] **Step 2: Scale bottom position**

Find line 42 (the `bottom: 30` in the outer motion.div style):
```tsx
style={{
  left: `calc(80vw + ${distance}px)`,
  bottom: 30,
}}
```

Change to:
```tsx
style={{
  left: `calc(80vw + ${distance}px)`,
  bottom: Math.max(14, Math.round(30 * viewportScale)),
}}
```

- [ ] **Step 3: Scale sign text**

Find line 51 (the span with `className="font-display font-light text-lg drop-shadow-md"`):
```tsx
<span style={{filter: 'url(#ink-rough)',}} className="font-display font-light text-lg drop-shadow-md">
```

Change to (remove `text-lg`, add inline fontSize):
```tsx
<span
  style={{
    filter: 'url(#ink-rough)',
    fontSize: Math.max(0.75, 1.125 * viewportScale) + 'rem',
  }}
  className="font-display font-light drop-shadow-md"
>
```

- [ ] **Step 4: Scale wooden post height**

Find line 61 (the post div with `className="w-2 h-12 ..."`):
```tsx
<div className="w-2 h-12 bg-[#5c3a21] border-l-2 border-r-4 border-[#3e2716] shadow-[10px_0_15px_rgba(0,0,0,0.4)]" />
```

Change to:
```tsx
<div
  className="w-2 bg-[#5c3a21] border-l-2 border-r-4 border-[#3e2716] shadow-[10px_0_15px_rgba(0,0,0,0.4)]"
  style={{ height: Math.max(24, Math.round(48 * viewportScale)) }}
/>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/journey/WaypointSignpost.tsx
git commit -m "feat(journey): scale signpost text, post, and position on mobile"
```

---

## Task 6: Update ProcessTimeline.tsx

**Files:**
- Modify: `src/components/journey/ProcessTimeline.tsx`

Tablets are currently 210px fixed width. At 375px viewport width with 4 tablets at 7%/30%/56%/76%, the minimum safe tablet width is ~90px. We scale to `Math.max(120, Math.round(210 * viewportScale))` for legibility, accepting minor overlap at very narrow screens (tablets still animate in sequentially so overlap only occurs after full scroll).

- [ ] **Step 1: Add import and hook**

Add import:
```tsx
import { useViewportScale } from '@/hooks/useViewportScale';
```

Add inside the component body (line 61, after the props destructuring):
```tsx
const { viewportScale } = useViewportScale();
const tabletWidth = Math.max(120, Math.round(210 * viewportScale));
const tabletMinHeight = Math.max(200, Math.round(320 * viewportScale));
const tabletPadX = Math.max(12, Math.round(28 * viewportScale));
const tabletPadY = Math.max(20, Math.round(40 * viewportScale));
const numeralSize = Math.max(4.5, 8 * viewportScale);
const titleSize = Math.max(1.1, 1.75 * viewportScale);
```

- [ ] **Step 2: Apply tablet width and padding**

Find the tablet container div (around line 165):
```tsx
<div
  className="relative w-[210px] py-10 px-7 overflow-hidden"
  style={{
    minHeight: '320px',
    ...
  }}
>
```

Change to:
```tsx
<div
  className="relative overflow-hidden"
  style={{
    width: tabletWidth,
    minHeight: tabletMinHeight,
    paddingTop: tabletPadY,
    paddingBottom: tabletPadY,
    paddingLeft: tabletPadX,
    paddingRight: tabletPadX,
    background: 'rgba(255,255,255,1)',
    borderTop: '2px solid rgba(234,40,4,0.65)',
    borderLeft: '2px solid rgba(234,40,4,0.30)',
    borderRight: '1px solid rgba(255,255,255,0.25)',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    WebkitBackdropFilter: 'blur(18px)',
    boxShadow: active
      ? '0 4px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)'
      : '0 2px 10px rgba(0,0,0,0.08)',
  }}
>
```

- [ ] **Step 3: Scale numeral watermark font**

Find the giant numeral div (around line 182):
```tsx
style={{
  fontSize: '8rem',
  color: 'rgba(234,40,4,0.08)',
  ...
}}
```

Change to:
```tsx
style={{
  fontSize: `${numeralSize}rem`,
  color: 'rgba(234,40,4,0.08)',
  lineHeight: 1,
  userSelect: 'none',
}}
```

- [ ] **Step 4: Scale title font**

Find the h3 title (around line 202):
```tsx
style={{
  fontSize: '1.75rem',
  color: 'rgba(20,10,5,0.92)',
}}
```

Change to:
```tsx
style={{
  fontSize: `${titleSize}rem`,
  color: 'rgba(20,10,5,0.92)',
}}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/journey/ProcessTimeline.tsx
git commit -m "feat(journey): fluid ProcessTimeline tablet sizing on mobile"
```

---

## Task 7: Update FarewellChest.tsx

**Files:**
- Modify: `src/components/journey/FarewellChest.tsx`

Replace local windowWidth state. Scale shard particle offsets and link landing positions so they stay on screen at mobile widths.

- [ ] **Step 1: Add import and replace state**

Add import:
```tsx
import { useViewportScale } from '@/hooks/useViewportScale';
```

Replace lines 41–48:
```tsx
// REMOVE:
const [windowWidth, setWindowWidth] = useState(1920);

useEffect(() => {
  setWindowWidth(window.innerWidth);
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', update);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

With (place after the `phase/frozenX` state, before the `visible` check):
```tsx
const { windowSize: { width: windowWidth }, viewportScale } = useViewportScale();
```

- [ ] **Step 2: Scale shard particle offsets**

Find the shard particles map (around line 128):
```tsx
animate={{
  opacity: 0,
  x: (i % 2 === 0 ? -1 : 1) * (30 + i * 22),
  y: -(50 + i * 30),
  rotate: (i % 2 === 0 ? -1 : 1) * (120 + i * 35),
}}
```

Change to:
```tsx
animate={{
  opacity: 0,
  x: (i % 2 === 0 ? -1 : 1) * Math.round((30 + i * 22) * viewportScale),
  y: -Math.round((50 + i * 30) * viewportScale),
  rotate: (i % 2 === 0 ? -1 : 1) * (120 + i * 35),
}}
```

- [ ] **Step 3: Scale link landing positions**

The `links` array defines `offset` and `landX` in desktop pixels. Compute scaled versions inside the component, just before the return statement:

```tsx
const scaledLinks = links.map(link => ({
  ...link,
  offset: {
    x: Math.round(link.offset.x * viewportScale),
    y: Math.round(link.offset.y * viewportScale),
  },
  landX: Math.round(link.landX * viewportScale),
}));
```

Then in the JSX, replace `links.map(...)` with `scaledLinks.map(...)`, and update the animate prop:
```tsx
{scaledLinks.map((link, i) => (
  <motion.a
    key={link.label}
    ...
    animate={{
      x: [0, link.offset.x, link.landX],
      y: [0, link.offset.y, 28],
      ...
    }}
  >
```

- [ ] **Step 4: Scale chest bottom position**

Find line 61:
```tsx
style={{
  left: screenX - 24,
  bottom: 34,
  ...
}}
```

Change to:
```tsx
style={{
  left: screenX - 24,
  bottom: Math.max(16, Math.round(34 * viewportScale)),
  ...
}}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/journey/FarewellChest.tsx
git commit -m "feat(journey): scale FarewellChest particles and links for mobile"
```

---

## Task 8: Update ProjectBook.tsx

**Files:**
- Modify: `src/components/journey/ProjectBook.tsx`

Replace local windowSize state. The book's `bookSize` calculation already uses vw/vh proportionally — this task ensures the hook initializes correctly and adds a guard for zero-size initial render.

- [ ] **Step 1: Add import and replace state**

Add import:
```tsx
import { useViewportScale } from '@/hooks/useViewportScale';
```

Replace lines 147–156:
```tsx
// REMOVE:
const [windowSize, setWindowSize] = React.useState({ width: 1920, height: 1080 });

React.useEffect(() => {
  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  };
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

With:
```tsx
const { windowSize } = useViewportScale();
```

The existing lines 158–159 (`const vw = windowSize.width; const vh = windowSize.height;`) stay unchanged.

- [ ] **Step 2: Guard zero sectionRange**

After line 164 (`const t = ...`), add:
```tsx
if (sectionRange === 0) return null;
```

This prevents division-by-zero on the very first render frame when `windowSize` hasn't hydrated yet.

- [ ] **Step 3: Commit**

```bash
git add src/components/journey/ProjectBook.tsx
git commit -m "feat(journey): use useViewportScale in ProjectBook, guard zero sectionRange"
```

---

## Task 9: Verify build and browser test

- [ ] **Step 1: Run type check**

```bash
npm run type-check
```

Expected: no new errors. If errors appear, they'll be in the modified files — fix before continuing.

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```

- [ ] **Step 3: Browser test at 375px**

Open `http://localhost:4028/journey` in DevTools with device emulation set to 375×667 (iPhone SE). Verify:
- Samurai character is ~40% of screen width (not clipped)
- Road is visible but not dominating screen height
- Scrolling horizontally with swipe works
- Signposts appear and scale proportionally
- ProjectBook opens and content is readable
- ProcessTimeline tablets are visible (may be tight but not clipped)
- FarewellChest links land within screen bounds on burst

- [ ] **Step 4: Test at 768px**

Set DevTools width to 768px. Verify same checklist — everything should look notably better than 375px.

- [ ] **Step 5: Verify desktop at 1920px is unchanged**

Full-width browser at 1920px. `viewportScale = 1.0`, all values identical to before. Spot-check: character at `scale(2.0)`, road at `h-[200px]`, ProcessTimeline tablets at 210px.

- [ ] **Step 6: Run production build**

```bash
npm run build
```

Expected: build succeeds (TypeScript errors are non-blocking per `next.config.mjs` `ignoreBuildErrors: true`, but fix any new errors regardless).
