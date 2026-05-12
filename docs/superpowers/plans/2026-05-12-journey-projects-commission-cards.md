# Journey Projects — Commission Notice Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace generic image+gradient project cards with parchment commission-notice cards that match the codex tablet visual language from ProcessTimeline.

**Architecture:** Rewrite `ProjectCard.tsx` with portrait-format parchment anatomy (clipped image, role stamp, wax seal, ember glow). Add `CommissionPath.tsx` — a scroll-driven SVG treasure-map path connecting card bases. Wire both into the projects section in `HorizontalJourney.tsx`.

**Tech Stack:** React, Framer Motion (animate/AnimatePresence), Next.js Image, Tailwind CSS, TypeScript

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/components/journey/ProjectCard.tsx` | Rewrite | Portrait commission card — anatomy, interaction, animations |
| `src/components/journey/CommissionPath.tsx` | Create | SVG dashed path + dots connecting the 4 card bases |
| `src/components/journey/HorizontalJourney.tsx` | Modify | Update PROJECTS data, remove dynamic cardWidth, import + place CommissionPath |

---

## Task 1: Update PROJECTS data and ProjectCard call in HorizontalJourney

**Files:**
- Modify: `src/components/journey/HorizontalJourney.tsx`

- [ ] **Step 1: Update the PROJECTS array** (lines 16–41)

Replace the existing `PROJECTS` constant with:

```typescript
const PROJECTS = [
  {
    title: 'Craon',
    subtitle: 'AI Video Editor · SaaS',
    image: '/craon/craon-hero.png',
    role: 'Lead Frontend Engineer',
  },
  {
    title: 'MelloUp',
    subtitle: 'Event Marketing · MVP',
    image: '/melloup/melloup.png',
    role: 'Founding Engineer',
  },
  {
    title: 'Ibasho',
    subtitle: 'Brand · UI/UX · Web',
    image: '/ibasho/ibashoo.png',
    role: 'Lead Designer & Developer',
  },
  {
    title: 'FreightEZ',
    subtitle: 'Fleet TMS · B2B SaaS',
    image: '/freightez/freightez-hero.png',
    role: 'Frontend Engineer',
  },
];
```

- [ ] **Step 2: Update the ProjectCard render call** inside the projects section map (around line 292–313)

Replace the existing `{PROJECTS.map(...)}` block with:

```tsx
{PROJECTS.map((project, idx) => {
  const sectionWidth = window.innerWidth * 2.2;
  const chunkWidth = sectionWidth / PROJECTS.length;
  const cardAbsoluteX = chunkWidth * idx + chunkWidth / 2;
  const cardScrollX = window.innerWidth + cardAbsoluteX;
  return (
    <ProjectCard
      key={project.title}
      title={project.title}
      subtitle={project.subtitle}
      image={project.image}
      role={project.role}
      characterX={scrollState.x + window.innerWidth / 2}
      cardX={cardScrollX}
      index={idx}
      absoluteX={cardAbsoluteX}
    />
  );
})}
```

Note: `cardWidth` prop is removed — the new card has a fixed 260px width.

- [ ] **Step 3: Run type-check**

```bash
npm run type-check
```

Expected: no errors (ProjectCard still accepts all passed props — cardWidth was optional with a default).

- [ ] **Step 4: Commit**

```bash
git add src/components/journey/HorizontalJourney.tsx
git commit -m "refactor(journey): update projects data and remove dynamic cardWidth"
```

---

## Task 2: Rewrite ProjectCard.tsx

**Files:**
- Modify: `src/components/journey/ProjectCard.tsx`

- [ ] **Step 1: Replace the entire file content**

```tsx
'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  image: string;
  role: string;
  characterX: number;
  cardX: number;
  index: number;
  absoluteX?: number;
}

const CARD_WIDTH = 260;
const CARD_HEIGHT = 380;
const IMAGE_HEIGHT = Math.round(CARD_HEIGHT * 0.55);
const CONTENT_HEIGHT = CARD_HEIGHT - IMAGE_HEIGHT - 1; // 1px for hairline
const NUMERALS = ['I', 'II', 'III', 'IV'];
const ROUTES: Record<number, string> = {
  0: '/works/craon',
  1: '/works/melloup',
  2: '/works/ibasho',
  3: '/works/freightez',
};
const BOTTOM_POSITIONS = ['18%', '28%', '18%', '28%'];

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  image,
  role,
  characterX,
  cardX,
  index,
  absoluteX,
}) => {
  const [isNear, setIsNear] = useState(false);
  const [stampVisible, setStampVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsNear(Math.abs(characterX - cardX) < 300);
  }, [characterX, cardX]);

  const handleClick = () => {
    setStampVisible(true);
    setTimeout(() => router.push(ROUTES[index] ?? '/'), 300);
  };

  const tilt = isNear ? 0 : index % 2 === 0 ? 1.8 : -1.8;
  const numeral = NUMERALS[index] ?? 'I';

  const positionStyle: React.CSSProperties =
    absoluteX !== undefined
      ? {
          position: 'absolute',
          left: `${absoluteX - CARD_WIDTH / 2}px`,
          bottom: BOTTOM_POSITIONS[index],
          width: `${CARD_WIDTH}px`,
          height: `${CARD_HEIGHT}px`,
        }
      : { flexShrink: 0, width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px` };

  return (
    <motion.div
      onClick={handleClick}
      className="cursor-pointer"
      style={positionStyle}
      animate={{ scale: isNear ? 1.06 : 1, y: isNear ? -32 : 0, rotate: tilt }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Scroll banner — unfurls from top when near */}
      <AnimatePresence>
        {isNear && (
          <motion.div
            className="absolute flex items-center justify-center gap-1.5 bg-white pointer-events-none"
            style={{
              top: '-36px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '140px',
              height: '28px',
              border: '1px solid rgba(234,40,4,0.5)',
              transformOrigin: 'bottom center',
              zIndex: 10,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span style={{ color: 'rgba(234,40,4,0.9)', fontSize: '7px', fontWeight: 700 }}>
              ✦
            </span>
            <span
              className="font-body font-bold uppercase"
              style={{ fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(234,40,4,0.9)' }}
            >
              OPEN COMMISSION
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card body */}
      <motion.div
        className="relative w-full h-full overflow-hidden"
        style={{
          background: '#ffffff',
          borderTop: '2px solid rgba(234,40,4,0.65)',
          borderLeft: '1px solid rgba(234,40,4,0.20)',
          borderRight: '1px solid rgba(234,40,4,0.20)',
          borderBottom: '1px solid rgba(234,40,4,0.20)',
        }}
        animate={{
          boxShadow: isNear
            ? '0 0 0 4px #ffffff, 0 0 0 6px rgba(20,12,5,0.8), 0 32px 80px rgba(234,40,4,0.35)'
            : '0 0 0 4px #ffffff, 0 0 0 6px rgba(20,12,5,0.7), 0 12px 40px rgba(0,0,0,0.35)',
        }}
        transition={{ duration: 0.35 }}
      >
        {/* Image — top 55%, hand-cut clip */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: `${IMAGE_HEIGHT}px`,
            clipPath: 'polygon(0 0, 100% 0, 100% 96%, 97% 100%, 3% 100%)',
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes={`${CARD_WIDTH}px`}
          />
        </div>

        {/* Red hairline below image */}
        <div style={{ height: '1px', background: 'rgba(234,40,4,0.5)' }} />

        {/* Content area */}
        <div
          className="relative overflow-hidden px-5 pt-4 pb-5"
          style={{ height: `${CONTENT_HEIGHT}px` }}
        >
          {/* Giant numeral watermark */}
          <div
            className="absolute font-display font-bold select-none pointer-events-none"
            style={{
              fontSize: '6rem',
              color: 'rgba(234,40,4,0.06)',
              right: '-4px',
              top: '-4px',
              lineHeight: 1,
            }}
          >
            {numeral}
          </div>

          {/* Role stamp */}
          <div
            className="inline-block font-body font-bold uppercase mb-2"
            style={{
              fontSize: '8px',
              letterSpacing: '0.2em',
              color: 'rgba(234,40,4,0.85)',
              border: '1px solid rgba(234,40,4,0.7)',
              padding: '2px 6px',
              transform: 'rotate(-6deg)',
              transformOrigin: 'left center',
            }}
          >
            {role}
          </div>

          {/* Title */}
          <h3
            className="font-display font-bold leading-tight mt-1"
            style={{ fontSize: '1.35rem', color: 'rgba(20,10,5,0.92)' }}
          >
            {title}
          </h3>

          {/* Subtitle */}
          <p
            className="font-body leading-relaxed mt-1"
            style={{ fontSize: '0.72rem', color: 'rgba(20,10,5,0.45)' }}
          >
            {subtitle}
          </p>

          {/* Wax seal */}
          <motion.div
            className="absolute bottom-4 right-4 rounded-full flex items-center justify-center"
            style={{ width: '18px', height: '18px', background: 'rgba(234,40,4,0.9)' }}
            animate={
              isNear
                ? {
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 6px rgba(234,40,4,0.25)',
                      '0 0 14px rgba(234,40,4,0.6)',
                      '0 0 6px rgba(234,40,4,0.25)',
                    ],
                  }
                : { scale: 1, boxShadow: '0 0 6px rgba(234,40,4,0.25)' }
            }
            transition={
              isNear
                ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
          >
            <span style={{ color: '#fff', fontSize: '7px', fontWeight: 700 }}>✦</span>
          </motion.div>
        </div>

        {/* Ember glow — bottom edge */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '1px', background: 'rgba(234,40,4,0.5)' }}
          animate={{ opacity: isNear ? [0.3, 0.9, 0.3] : 0.2 }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.4,
          }}
        />

        {/* Click stamp */}
        <AnimatePresence>
          {stampVisible && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 20 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 1] }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <span style={{ fontSize: '4rem', color: 'rgba(234,40,4,0.9)' }}>✦</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
```

- [ ] **Step 2: Run type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Spot-check in browser**

```bash
npm run dev
```

Open `http://localhost:4028/journey`. Scroll into the projects section. Verify:
- Cards are portrait format (~260×380px)
- Staggered heights (alternating higher/lower)
- Tilted at rest
- Character approach triggers: card lifts, scroll banner unfurls, wax seal pulses, ember glows
- Click shows red ✦ stamp then navigates

- [ ] **Step 4: Commit**

```bash
git add src/components/journey/ProjectCard.tsx
git commit -m "feat(journey): rewrite ProjectCard as parchment commission notice"
```

---

## Task 3: Create CommissionPath.tsx

**Files:**
- Create: `src/components/journey/CommissionPath.tsx`

The SVG uses `viewBox="0 0 100 100"` with `preserveAspectRatio="none"`. Card centers in viewBox x-space: chunks of 25 each, centers at 12.5 / 37.5 / 62.5 / 87.5. Y-positions reflect the staggered card bottoms (18% → y≈82, 28% → y≈72).

- [ ] **Step 1: Create the file**

```tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface CommissionPathProps {
  scrollX: number;
  sectionStartX: number;
  sectionWidth: number;
}

// Curve connecting card bases: T0(12.5,82) T1(37.5,72) T2(62.5,82) T3(87.5,72)
const PATH_D =
  'M 12.5,82 C 20,82 30,72 37.5,72 C 50,72 55,82 62.5,82 C 72,82 80,72 87.5,72';

const DOT_POSITIONS: [number, number][] = [
  [12.5, 82],
  [37.5, 72],
  [62.5, 82],
  [87.5, 72],
];

// Each dot appears when path progress passes this fraction
const DOT_THRESHOLDS = [0.05, 0.3, 0.58, 0.83];

const CommissionPath: React.FC<CommissionPathProps> = ({
  scrollX,
  sectionStartX,
  sectionWidth,
}) => {
  const progress = Math.max(
    0,
    Math.min(1, (scrollX - sectionStartX) / (sectionWidth * 0.75))
  );

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Ghost trail */}
      <path
        d={PATH_D}
        fill="none"
        stroke="rgba(234,40,4,0.10)"
        strokeWidth="0.35"
        strokeDasharray="0.9 2.2"
        strokeLinecap="round"
      />

      {/* Animated draw */}
      <motion.path
        d={PATH_D}
        fill="none"
        stroke="rgba(234,40,4,0.45)"
        strokeWidth="0.35"
        strokeDasharray="0.9 2.2"
        strokeLinecap="round"
        animate={{ pathLength: progress }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* Dots at each card base */}
      {DOT_POSITIONS.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="0.8"
          fill="#ea2804"
          animate={{
            scale: progress > DOT_THRESHOLDS[i] ? 1 : 0,
            opacity: progress > DOT_THRESHOLDS[i] ? 1 : 0,
          }}
          initial={{ scale: 0, opacity: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 280 }}
        />
      ))}
    </svg>
  );
};

export default CommissionPath;
```

- [ ] **Step 2: Run type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/journey/CommissionPath.tsx
git commit -m "feat(journey): add CommissionPath treasure-map SVG overlay"
```

---

## Task 4: Wire CommissionPath into HorizontalJourney

**Files:**
- Modify: `src/components/journey/HorizontalJourney.tsx`

- [ ] **Step 1: Add CommissionPath import** at the top with the other imports

```typescript
import CommissionPath from './CommissionPath';
```

- [ ] **Step 2: Place CommissionPath inside the projects JourneySection**

Inside the projects `JourneySection` (id="projects"), add `CommissionPath` as the first child — before the section label `<div>` and before the cards map. The full projects section JSX becomes:

```tsx
<JourneySection
  id="projects"
  backgroundNumber={2}
  width={window.innerWidth * 2.2}
  scrollX={scrollState.x}
  behindMountains
>
  {/* Connecting path */}
  <CommissionPath
    scrollX={scrollState.x}
    sectionStartX={window.innerWidth}
    sectionWidth={window.innerWidth * 2.2}
  />

  {/* Section label — top-left */}
  <div className="absolute top-10 left-16 z-10">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-6 h-[2px] bg-replicate-primary" />
      <span
        className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-replicate-primary"
        style={{ textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}
      >
        Selected Work
      </span>
    </div>
    <h2
      className="font-display font-bold text-white leading-none"
      style={{
        fontSize: 'clamp(3rem, 5vw, 4.5rem)',
        textShadow: '0 4px 32px rgba(0,0,0,0.95), 0 1px 6px rgba(0,0,0,0.9)',
      }}
    >
      Projects
    </h2>
    <p
      className="font-body mt-2"
      style={{
        fontSize: '0.9rem',
        color: 'rgba(255,255,255,0.55)',
        textShadow: '0 1px 10px rgba(0,0,0,0.9)',
      }}
    >
      Scroll to explore
    </p>
  </div>

  {/* Cards */}
  {PROJECTS.map((project, idx) => {
    const sectionWidth = window.innerWidth * 2.2;
    const chunkWidth = sectionWidth / PROJECTS.length;
    const cardAbsoluteX = chunkWidth * idx + chunkWidth / 2;
    const cardScrollX = window.innerWidth + cardAbsoluteX;
    return (
      <ProjectCard
        key={project.title}
        title={project.title}
        subtitle={project.subtitle}
        image={project.image}
        role={project.role}
        characterX={scrollState.x + window.innerWidth / 2}
        cardX={cardScrollX}
        index={idx}
        absoluteX={cardAbsoluteX}
      />
    );
  })}
</JourneySection>
```

- [ ] **Step 3: Run type-check**

```bash
npm run type-check
```

Expected: no errors.

- [ ] **Step 4: Visual verification in browser**

```bash
npm run dev
```

Open `http://localhost:4028/journey`. Verify the full experience:

1. Scroll into projects section — dashed red path draws left-to-right as you enter
2. Red dots appear at each card base as path reaches them
3. Each card is portrait format, alternating heights, tilted
4. Role stamp is rotated, red-bordered
5. Giant faded numeral watermark visible in card content area
6. Character approach (scroll until character reaches a card): scroll banner unfurls from top, wax seal pulses, ember glows
7. Click: red ✦ stamp scales in over card, then navigates to case study
8. Other sections (hero, process, contact) unchanged

- [ ] **Step 5: Commit**

```bash
git add src/components/journey/HorizontalJourney.tsx
git commit -m "feat(journey): wire CommissionPath into projects section"
```

---

## Self-Review

**Spec coverage:**
- Portrait format 260×380 ✓ (CARD_WIDTH/CARD_HEIGHT constants, Task 2)
- Clipped image with irregular bottom edge ✓ (clip-path polygon, Task 2)
- Red hairline below image ✓ (Task 2)
- Role stamp rotated ✓ (Task 2)
- Giant numeral watermark ✓ (Task 2)
- Wax seal with pulse ✓ (Task 2)
- Ember glow ✓ (Task 2)
- Red top border ✓ (Task 2)
- Staggered heights ✓ (BOTTOM_POSITIONS array, Task 2)
- Scroll banner replaces floating badge ✓ (Task 2)
- Click stamp animation ✓ (Task 2)
- Connecting path draws on scroll entry ✓ (Task 3)
- Dots at card bases ✓ (Task 3)
- Updated subtitle content ✓ (Task 1)
- No other sections touched ✓

**Placeholder scan:** No TBDs. All code blocks complete.

**Type consistency:**
- `ProjectCardProps` — `cardWidth` removed from interface and from call site (Task 1 step 2 + Task 2 step 1). Consistent.
- `CommissionPath` props (`scrollX`, `sectionStartX`, `sectionWidth`) defined in Task 3, used in Task 4. Consistent.
- `ROUTES` uses `Record<number, string>` with `??` fallback. Safe.
