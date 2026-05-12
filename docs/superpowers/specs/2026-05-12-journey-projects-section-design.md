# Journey — Projects Section Redesign
**Date:** 2026-05-12  
**Status:** Approved

---

## Problem

The current `ProjectCard` component uses image + gradient scrim + text overlay — standard modern portfolio UI. It violates the visual grammar already established by `ProcessTimeline`, which uses codex tablets: white parchment, red accents, tilt, wax seal, ember glow, rise-from-ground entrance. The cards look dropped in from a different world.

---

## Design Language Reference

`ProcessTimeline` established the canon:
- White background, `borderTop: 2px solid rgba(234,40,4,0.65)`
- Giant Roman numeral watermark: `rgba(234,40,4,0.08)`, `8rem`
- Wax seal: `20px` red circle, `✦` glyph, bottom-right
- Ember glow: 1px bottom edge, `opacity: [0.3, 0.9, 0.3]` loop
- Rise entrance: `y: 140 → 0`, `opacity: 0 → 1`
- Slight rotation tilt per card
- Treasure map SVG path connecting nodes

The redesigned `ProjectCard` extends this vocabulary exactly.

---

## Card Anatomy

**Dimensions:** `260px wide × 380px tall` (portrait, vs old landscape `~520×338`)

**Structure top to bottom:**

1. **Image area** — top `55%` (~`209px`). `next/image` fill, `object-cover`.  
   Clipped with irregular bottom edge:  
   `clip-path: polygon(0 0, 100% 0, 100% 96%, 97% 100%, 3% 100%)`  
   Feels hand-cut, not a hard rectangle.

2. **Red hairline rule** — `1px solid rgba(234,40,4,0.5)`, full width, immediately below image clip.

3. **Content area** — `45%` remaining height, `px-5 pt-4 pb-5`, white background.  
   - Giant numeral watermark: absolute, `-right-2 -top-2`, `6rem`, `rgba(234,40,4,0.06)`
   - Role stamp badge: `rotate(-6deg)`, `border: 1px solid rgba(234,40,4,0.7)`, `px-2 py-0.5`, `font-body text-[8px] uppercase tracking-[0.2em]`, color `rgba(234,40,4,0.85)`. Displayed inline-block, margin-bottom `8px`.
   - Project title: `font-display font-bold`, `~1.35rem`, `rgba(20,10,5,0.92)`, `leading-tight`
   - Subtitle: `font-body`, `0.72rem`, `rgba(20,10,5,0.45)`, `leading-relaxed`, margin-top `4px`
   - Wax seal: absolute `bottom-4 right-4`, `18px` circle, `background: rgba(234,40,4,0.9)`, `✦` white `7px` bold. Box shadow `0 0 6px rgba(234,40,4,0.25)`.

4. **Red top border** — `borderTop: 2px solid rgba(234,40,4,0.65)` on the card root (identical to process tablets).

5. **Ember glow** — absolute `bottom-0 left-0 right-0 h-[1px]`, `background: rgba(234,40,4,0.5)`. Animated `opacity: [0.3, 0.9, 0.3]` on `2.8s` loop when `isNear`.

---

## Layout

Cards positioned absolutely within the projects section (`width: window.innerWidth * 2.2`).

**Vertical stagger:**
- Index 0, 2 → `bottom: 18%`
- Index 1, 3 → `bottom: 28%`

**Tilt** (existing logic preserved):
- Even index → `rotate: 1.8deg`
- Odd index → `rotate: -1.8deg`
- `isNear` → `rotate: 0deg`

**Horizontal spacing:** each card centered in its chunk (`sectionWidth / 4` chunks), existing `absoluteX` calculation preserved.

---

## Connecting Path

SVG overlay spanning the full projects section width. Same pattern as `ProcessTimeline`:
- Ghost trail: `stroke="rgba(234,40,4,0.10)"`, `strokeDasharray="0.9 2.2"`, `strokeWidth="0.4"`
- Animated draw: `stroke="rgba(234,40,4,0.45)"`, `pathLength: 0 → 1` keyed off scroll entry
- Dot at each card base: `r="0.8"`, `fill="#ea2804"`, spring-in when card enters view

Path drawn in `viewBox="0 0 100 100"` with `preserveAspectRatio="none"`. Y coordinates sit at ground level (~`75–80` in viewBox space, above the road). Curve passes through all 4 card base positions.

Scroll trigger: path animates when `scrollX` enters the projects section (`scrollX > window.innerWidth`). Progress = `(scrollX - window.innerWidth) / (window.innerWidth * 2.2 - window.innerWidth)`, clamped `0–1`.

---

## Character Proximity Interaction

Threshold: `distance < 300` (unchanged).

**`isNear = true` state:**
- Card: `scale: 1.06`, `y: -32px` (was `-24px`)
- Tilt → `0deg`
- Box shadow: white border `5px`, dark outer stroke `8px`, red glow `0 32px 80px rgba(234,40,4,0.35)`
- Wax seal: `scale: 1.3` pulse loop, `background: rgba(234,40,4,1)`, brighter shadow
- Ember glow: animates at full intensity
- Scroll banner unfurls from top of card (see below)

**Scroll banner** (replaces `✨ Click to explore` badge):
- Positioned `top: -36px`, centered on card
- `width: 140px`, `height: 28px`
- White background, `border: 1px solid rgba(234,40,4,0.5)`
- Text: `"OPEN COMMISSION"`, `font-body font-bold text-[8px] uppercase tracking-[0.25em]`, color `rgba(234,40,4,0.9)`
- Entrance: `scaleY: 0 → 1`, `transformOrigin: bottom`, `duration: 0.25s`
- Small `✦` glyph left of text, red

**Click animation (before route push):**
- Red `✦` stamp scales in at card center: `scale: 0 → 1.4 → 1`, `opacity: 0 → 1`, `duration: 0.3s`
- After `300ms` → `router.push(route)`

---

## Content

| # | Title | Role Badge | Subtitle |
|---|-------|-----------|----------|
| 0 | Craon | Lead Frontend Engineer | AI Video Editor · SaaS |
| 1 | MelloUp | Founding Engineer | Event Marketing · MVP |
| 2 | Ibasho | Lead Designer & Developer | Brand · UI/UX · Web |
| 3 | FreightEZ | Frontend Engineer | Fleet TMS · B2B SaaS |

Roman numeral watermarks: `I`, `II`, `III`, `IV`.

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/journey/ProjectCard.tsx` | Full rewrite — new card anatomy, interaction, content |
| `src/components/journey/HorizontalJourney.tsx` | Add connecting SVG path overlay in projects section |

No other files change.

---

## Success Criteria

- Cards visually match the codex tablet language from `ProcessTimeline`
- Portrait format, staggered heights, irregular image clip visible
- Scroll banner unfurls correctly on character approach
- Connecting path draws in as section enters viewport
- Click stamp animation plays before navigation
- No layout regressions on other sections
