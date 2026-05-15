# Journey Contact Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic contact section at the end of the journey page with a warm farewell — the samurai collapses via `Dead.png` sprite, then a handwritten-style thank-you note fades in.

**Architecture:** Two surgical changes — `Character.tsx` gains a `dead` state triggered by scroll progress, and the contact section JSX in `HorizontalJourney.tsx` is replaced with letter-style farewell text. No new files needed.

**Tech Stack:** React, Framer Motion, sprite sheet animation via CSS `background-position`, Tailwind CSS

---

### Task 1: Add `dead` state to `Character.tsx`

**Files:**
- Modify: `src/components/journey/Character.tsx`

`Dead.png` is 384×128 — 3 frames at 128×128. The animation plays once (frames 0→1→2) and holds on frame 2. It triggers when `progress > 0.88` and cannot be interrupted by scroll events once started.

- [ ] **Step 1: Add `dead` to sprite config and state type**

In `src/components/journey/Character.tsx`, update the top of the file:

```tsx
const spriteConfig = {
  idle: { url: '/Samurai/Idle.png', frames: 6, fps: 10 },
  walk: { url: '/Samurai/Walk.png', frames: 8, fps: 12 },
  run:  { url: '/Samurai/Run.png',  frames: 8, fps: 18 },
  dead: { url: '/Samurai/Dead.png', frames: 3, fps: 8 },
};

const Character: React.FC<CharacterProps> = ({ scrollX, velocity, progress }) => {
  const characterX = window.innerWidth / 2 - FRAME_SIZE / 2;

  const [state, setState] = useState<'idle' | 'walk' | 'run' | 'dead'>('idle');
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [timedFrame, setTimedFrame] = useState(0);
  const [deadFrame, setDeadFrame] = useState(0);
  const [deadDone, setDeadDone] = useState(false);
  const lastScrollTimeRef = useRef(Date.now());
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(performance.now());
  const deadStartedRef = useRef(false);
```

- [ ] **Step 2: Add progress-based dead trigger (before scroll effect)**

Add this effect after the state declarations, before the existing scroll useEffect:

```tsx
  // Trigger dead state when reaching end of journey
  useEffect(() => {
    if (progress > 0.88 && !deadStartedRef.current) {
      deadStartedRef.current = true;
      setState('dead');
      setDeadFrame(0);
      setDeadDone(false);
    }
  }, [progress]);
```

- [ ] **Step 3: Guard scroll effects against dead state**

Update the scroll-triggered state effect so it cannot override `dead`:

```tsx
  useEffect(() => {
    if (deadStartedRef.current) return;
    lastScrollTimeRef.current = Date.now();
    const absV = Math.abs(velocity);
    if (absV >= RUN_THRESHOLD) setState('run');
    else setState('walk');
    if (velocity > 0) setDirection('right');
    else if (velocity < 0) setDirection('left');
  }, [scrollX, velocity]);
```

Update the idle fallback effect:

```tsx
  useEffect(() => {
    const interval = setInterval(() => {
      if (deadStartedRef.current) return;
      if (Date.now() - lastScrollTimeRef.current > IDLE_TIMEOUT) {
        setState('idle');
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
```

- [ ] **Step 4: Add dead animation frame loop (play-once)**

Add this effect after the existing time-based frame loop effect:

```tsx
  // Dead animation: play frames 0→2 once, then hold on frame 2
  useEffect(() => {
    if (state !== 'dead' || deadDone) return;

    const fps = spriteConfig.dead.fps;
    const frameInterval = 1000 / fps;
    const totalFrames = spriteConfig.dead.frames;

    const tick = (now: number) => {
      if (now - lastFrameTimeRef.current >= frameInterval) {
        setDeadFrame((prev) => {
          if (prev >= totalFrames - 1) {
            setDeadDone(true);
            return totalFrames - 1;
          }
          lastFrameTimeRef.current = now;
          return prev + 1;
        });
        lastFrameTimeRef.current = now;
      }
      if (!deadDone) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state, deadDone]);
```

- [ ] **Step 5: Update frame index computation and render**

Replace the frame index block and return JSX in `Character.tsx`:

```tsx
  // Frame index
  let frameIndex = 0;
  if (state === 'dead') {
    frameIndex = deadFrame;
  } else if (state === 'walk') {
    frameIndex = Math.floor(Math.abs(scrollX) / 24) % spriteConfig.walk.frames;
  } else {
    frameIndex = timedFrame;
  }

  const currentConfig = spriteConfig[state];
  const bgPositionX = -(frameIndex * FRAME_SIZE);

  return (
    <>
      <motion.div
        className="fixed z-50 pointer-events-none"
        style={{ left: characterX, bottom: 30 }}
      >
        <div className="relative w-[128px] h-[128px] flex items-end justify-center">
          <div
            style={{
              width: `${FRAME_SIZE}px`,
              height: `${FRAME_SIZE}px`,
              backgroundImage: `url(${currentConfig.url})`,
              backgroundPosition: `${bgPositionX}px 0`,
              backgroundRepeat: 'no-repeat',
              transform: `scale(2.0) scaleX(${direction === 'left' ? -1 : 1})`,
              transformOrigin: 'bottom center',
              transition: state === 'dead' ? 'none' : 'transform 0.1s ease',
              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))',
            }}
          />
        </div>
      </motion.div>

      {/* Road layer */}
      <div
        className="fixed bottom-0 left-0 w-full h-[200px] z-40 pointer-events-none"
        style={{
          backgroundImage: 'url(/road.png)',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: `${-scrollX}px center`,
          backgroundSize: 'auto 100%',
          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.2))',
          opacity: state === 'dead' ? 0 : 1,
          transition: 'opacity 2s ease',
        }}
      />
    </>
  );
```

- [ ] **Step 6: Verify in dev server**

Run `npm run dev`. Scroll to the end of the journey. The samurai should play the 3-frame death animation and collapse. Road fades out. Character holds on frame 2.

- [ ] **Step 7: Commit**

```bash
git add src/components/journey/Character.tsx
git commit -m "feat(journey): add dead state to character at end of journey"
```

---

### Task 2: Replace contact section with farewell letter

**Files:**
- Modify: `src/components/journey/HorizontalJourney.tsx` (Section 4 JSX only)

Replace the current contact section content with a letterpress-style farewell. Text fades in with stagger after `progress > 0.9` (giving the death animation time to play). Matches the hero section's Georgia serif / ink-rough aesthetic — warm, personal, not designed.

- [ ] **Step 1: Replace Section 4 content in `HorizontalJourney.tsx`**

Find and replace the entire Section 4 `<JourneySection>` block (lines 419–513):

```tsx
          {/* Section 4: Farewell */}
          <JourneySection
            id="contact"
            backgroundNumber={3}
            width={window.innerWidth}
            scrollX={scrollState.x}
          >
            {/* Reuse ink-rough filter from hero */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
              <defs>
                <filter id="ink-rough-farewell">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.04"
                    numOctaves="4"
                    seed="7"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="2.2"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
            </svg>

            <div className="flex items-center justify-center h-full px-16">
              <motion.div
                className="flex flex-col"
                style={{ maxWidth: '42ch' }}
                animate={{
                  opacity: scrollState.progress > 0.9 ? 1 : 0,
                  y: scrollState.progress > 0.9 ? 0 : 20,
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Ornate rule — mirrors hero */}
                <motion.div
                  className="flex items-center gap-3"
                  style={{ marginBottom: '2rem' }}
                  animate={{ opacity: scrollState.progress > 0.9 ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div style={{ width: '44px', height: '1px', background: 'rgba(255,255,255,0.18)' }} />
                  <span style={{ color: 'rgba(234,40,4,0.85)', fontSize: '0.6rem', filter: 'url(#ink-rough-farewell)' }}>✦</span>
                  <div style={{ width: '44px', height: '1px', background: 'rgba(255,255,255,0.18)' }} />
                </motion.div>

                {/* Main farewell text */}
                <motion.p
                  style={{
                    fontFamily: '"Georgia", "Times New Roman", serif',
                    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                    color: 'rgba(255,255,255,0.82)',
                    lineHeight: 2.0,
                    letterSpacing: '0.01em',
                    marginBottom: '1.8rem',
                    filter: 'url(#ink-rough-farewell)',
                  }}
                  animate={{ opacity: scrollState.progress > 0.9 ? 1 : 0 }}
                  transition={{ duration: 1.0, delay: 0.4 }}
                >
                  thank you for walking with me.
                  <br /><br />
                  hope you have a nice day
                  <br />
                  and your pillow is cold when you sleep,
                  <br />
                  both sides.
                </motion.p>

                {/* Sign-off — right-aligned, quiet */}
                <motion.div
                  style={{ textAlign: 'right' }}
                  animate={{ opacity: scrollState.progress > 0.9 ? 1 : 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '1rem' }} />
                  <a
                    href="mailto:nishantchoudhary.dev@gmail.com"
                    style={{
                      fontFamily: '"Georgia", "Times New Roman", serif',
                      fontStyle: 'italic',
                      fontSize: '0.78rem',
                      letterSpacing: '0.06em',
                      color: 'rgba(255,255,255,0.38)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                      filter: 'url(#ink-rough-farewell)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(234,40,4,0.75)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.38)')}
                  >
                    — nishantchoudhary.dev@gmail.com
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </JourneySection>
```

- [ ] **Step 2: Verify in dev server**

Scroll to the end. After the samurai collapses, the farewell text should fade in — Georgia serif, letterpress texture, warm but quiet. Email glows red on hover. No buttons, no noise.

- [ ] **Step 3: Commit**

```bash
git add src/components/journey/HorizontalJourney.tsx
git commit -m "feat(journey): replace contact section with farewell letter"
```

---

### Task 3: Type-check

- [ ] **Step 1: Run type check**

```bash
npm run type-check
```

Expected: no errors related to the new `dead` state or `deadDone`/`deadFrame` props. If errors appear, fix them before proceeding.

- [ ] **Step 2: Final scroll-through**

Open `http://localhost:4028/journey`. Scroll from start to end. Verify:
- Samurai plays death animation on entering final section
- Road fades out
- Character holds on collapsed frame 2
- Text fades in after a beat
- Email turns red on hover
- No console errors
