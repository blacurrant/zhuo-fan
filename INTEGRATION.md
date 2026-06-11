# Journey Ambience — Integration

Two new components + two surgical edits. No new deps (canvas + CSS only — GSAP/three/pixi not needed for this; a second WebGL context would cost more than it adds here).

## 1. Copy files

```
AmbientCanvas.tsx      → src/components/journey/AmbientCanvas.tsx
AtmosphereOverlay.tsx  → src/components/journey/AtmosphereOverlay.tsx
```

## 2. Edit `src/components/journey/HorizontalJourney.tsx`

### 2a. Imports (top of file)

```tsx
import AmbientCanvas, { AmbientState } from './AmbientCanvas';
import AtmosphereOverlay from './AtmosphereOverlay';
```

### 2b. Add a mutable scroll ref (next to `lastScrollRef`)

The canvas reads scroll state per-frame through a ref so it never triggers React renders:

```tsx
const ambientRef = useRef<AmbientState>({ x: 0, velocity: 0, progress: 0 });
```

### 2c. Update it inside `handleScroll`, right after `setScrollState({...})`

```tsx
ambientRef.current.x = scrollLeft;
ambientRef.current.velocity = velocity;
ambientRef.current.progress = progress;
```

### 2d. Render — place these right after the `<Character ... />` element

```tsx
{/* Living world: petals → motes → fireflies + stars, footstep dust, speed lines */}
<AmbientCanvas stateRef={ambientRef} />

{/* Day → golden hour → night grading */}
<AtmosphereOverlay progress={scrollState.progress} />

{/* Lantern glow — the samurai carries light through the dark */}
<div
  className="fixed pointer-events-none"
  style={{
    left: '50%',
    bottom: Math.max(14, Math.round(30 * viewportScale)) - 20,
    transform: 'translateX(-50%)',
    width: 340 * viewportScale + 120,
    height: 340 * viewportScale + 120,
    borderRadius: '50%',
    background:
      'radial-gradient(circle, rgba(255,196,110,0.32) 0%, rgba(255,170,80,0.12) 40%, rgba(255,170,80,0) 70%)',
    zIndex: 56, // above the night-multiply layer (55) → punches a hole in the dark
    opacity: Math.max(0, Math.min(1, (scrollState.progress - 0.74) / 0.18)),
    transition: 'opacity 0.4s linear',
  }}
/>
```

## 3. Edit `src/components/journey/ParallaxBackground.tsx` — idle cloud drift

Right now the world is frozen when the user stops scrolling. Add this hook after Hook C. Clouds and birds keep drifting on their own (different speed per layer), using `backgroundPositionX` so it never fights Hook B's transforms:

```tsx
// Hook D: ambient drift — clouds/birds keep moving when scroll is idle
useLayoutEffect(() => {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
    return;

  const drifters = layers
    .filter((l) => l.includes('cloud') || l.includes('bird'))
    .map((l, i) => ({
      el: xRefsMap.current[`${backgroundNumber}-${l}`],
      speed: l.includes('bird') ? 16 : 3 + i * 2.2, // px/sec
    }))
    .filter((d): d is { el: HTMLDivElement; speed: number } => !!d.el);

  if (drifters.length === 0) return;

  let raf: number;
  let lastT = performance.now();
  const offsets = drifters.map(() => 0);

  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    if (document.hidden) { lastT = now; return; }
    const dt = (now - lastT) / 1000;
    lastT = now;
    drifters.forEach((d, i) => {
      offsets[i] = (offsets[i] - d.speed * dt) % 1920;
      d.el.style.backgroundPositionX = `${offsets[i]}px`;
    });
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}, [layers, backgroundNumber]);
```

## What you get

- **Day → night arc.** The sky grades from clear morning to golden hour (process section) into full night at the farewell — `goodnight` and the dark road overlay you already have now make narrative sense. Character, signposts, and book are graded with the world because the overlay sits above them (z-55).
- **Living air.** Petals on the wind early, sunlit dust motes through the middle, fireflies + twinkling stars at night. All particles have parallax depth and react to scroll velocity, so sprinting bends the wind.
- **Grounded movement.** Dust puffs kick up under the samurai's feet (direction-aware), faint speed lines appear at full sprint.
- **No dead frames.** Clouds and birds drift even when the user idles.
- **Lantern glow** punches warm light through the night layer around the character.

## Perf / a11y

- One canvas, one rAF, particle counts scale with width (mobile ≈ 45% budget), DPR capped at 1.5, pauses on `document.hidden`.
- Everything disabled under `prefers-reduced-motion`.
- Atmosphere layers are pure composited CSS (opacity only).
- Z-order used: parallax fg 20 < road overlay 41 < **ambient canvas 42** < signposts/book 45 < character 50 < **atmosphere 55 < lantern 56** < music 100 < Noise 200.

## Tuning knobs

- Particle budgets: the `budget(n)` calls in `AmbientCanvas.tsx` (`26` petals, `30` motes, `20` fireflies, `70` stars).
- Zone timing: `ramp()` breakpoints near the top of the `tick` in `AmbientCanvas.tsx` and at the top of `AtmosphereOverlay.tsx`. Mobile journey is 6.7vw wide vs 5.7 desktop, but both maps to the same 0–1 `progress`, so no per-device tuning needed.
- Night intensity: the `0.62/0.40/0.62` alphas in the night gradient.
