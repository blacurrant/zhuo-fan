'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { useViewportScale } from '@/hooks/useViewportScale';
import Character from './Character';
import Dragon from './Dragon';
import JourneySection from './JourneySection';
import SectionGate from './SectionGate';
import WaypointSignpost from './WaypointSignpost';
import ProcessTimeline from './ProcessTimeline';
import ProjectBook from './ProjectBook';
import FarewellChest from './FarewellChest';
import AmbientCanvas, { AmbientState } from './AmbientCanvas';
import AtmosphereOverlay from './AtmosphereOverlay';
import Campfire from './Campfire';
import { setSfxEnabled, footstep } from './sfx';
import { SECTIONS, widthOf, startOf, maxScrollVw, chestVw, waypointDefs, processProgress } from './layout';
import { ArrowRightCircle } from 'lucide-react';
import '@/lib/anthemion/anthemion-khysis.css';

const CHEST_COLLISION_RANGE = 220; // wide enough to cover the one-tile gap

interface ScrollState {
  x: number;
  progress: number;
  velocity: number;
}

const HorizontalJourney: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // Wheel and swipe move the road when they start on it, or on a fixed overlay
  // that opts in. Other overlays (the book, the signposts) keep their gestures.
  const drivesRoad = (t: EventTarget | null) =>
    t instanceof Element &&
    (!!scrollContainerRef.current?.contains(t) || !!t.closest('[data-scroll-through]'));
  const [scrollState, setScrollState] = useState<ScrollState>({
    x: 0,
    progress: 0,
    velocity: 0,
  });

  const lastScrollRef = useRef(0);
  const strideRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());
  const ambientRef = useRef<AmbientState>({ x: 0, velocity: 0, progress: 0 });
  const [attackTriggered, setAttackTriggeredState] = useState(false);
  const attackTriggeredRef = useRef(false);

  const setAttackTriggered = (val: boolean) => {
    attackTriggeredRef.current = val;
    setAttackTriggeredState(val);
  };

  const { windowSize, viewportScale } = useViewportScale();

  const isMobile = windowSize.width < 768;

  // Chest sits 0.5vw into the farewell section — see layout.ts for the world map.
  const CHEST_WORLD_X = windowSize.width * chestVw(isMobile) + 60;
  const chestWorldXRef = useRef(CHEST_WORLD_X);
  chestWorldXRef.current = CHEST_WORLD_X;

  // Campfire burns beside the samurai where he stops, so the letter reads as
  // written at the camp. At 0.18vw it sat against the torii at the screen edge.
  const CAMPFIRE_WORLD_X =
    windowSize.width * (startOf('contact', isMobile) + 0.5) - Math.max(110, Math.round(170 * viewportScale));
  const campfireWorldXRef = useRef(CAMPFIRE_WORLD_X);
  campfireWorldXRef.current = CAMPFIRE_WORLD_X;
  const campfireScreenX = CAMPFIRE_WORLD_X - scrollState.x;
  const nightIntensity = Math.max(0, Math.min(1, (scrollState.progress - 0.74) / 0.18));
  // Lantern dies down as the campfire reaches centre stage
  const lanternHandover = Math.max(
    0,
    Math.min(1, (campfireScreenX - windowSize.width * 0.5) / (windowSize.width * 0.35))
  );

  // Derived: samurai has reached the chest
  const chestScreenX = CHEST_WORLD_X - scrollState.x;
  const atChest = Math.abs(chestScreenX - windowSize.width / 2) < CHEST_COLLISION_RANGE;

  const handleAttackClick = () => {
    if (attackTriggeredRef.current) return;
    if (atChest) {
      setAttackTriggered(true);
      return;
    }
    // Pressed before arriving (keyboard, or an early click): walk there first.
    scrollContainerRef.current?.scrollTo({
      left: chestWorldXRef.current - windowSize.width / 2,
      behavior: 'smooth',
    });
  };

  // The letter shows itself when the road has run out — within a few percent
  // of a viewport of the end — not while the last section is still arriving.
  // It is the page's one conversion and is not behind any gesture; the crate
  // is a flourish beside it.
  const farewellOnScreen =
    scrollState.x > windowSize.width * (maxScrollVw(isMobile) - 0.06);
  
  // <anthemion-khysis> — registers itself on import. Client-only and after
  // mount, per the library's own hydration rule: register at module scope and
  // the element rewrites its light DOM before React hydrates, and React
  // discards any subtree whose hydration does not match (measured upstream:
  // 10 page errors before deferring, 0 after).
  useEffect(() => {
    import('@/lib/anthemion/khysis');
  }, []);

  // Background Music state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio('/music/Heartbeat.mp3');
    // `new Audio()` defaults to preload="auto", which pulled the whole 4.65MB
    // track down on mount — 56% of this page's bytes, for a file that cannot
    // play until someone presses the button. Deferred to the first play().
    audioRef.current.preload = 'none';
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Subtle volume

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    setSfxEnabled(!isMusicPlaying);
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play().catch(e => console.log("Audio playback failed:", e));
      setIsMusicPlaying(true);
    }
  };

  // Handle native scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;

      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const maxScroll =
        scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;

      const now = performance.now();
      const dt = now - lastScrollTimeRef.current;
      const velocity = dt > 0 ? (scrollLeft - lastScrollRef.current) / dt : 0;

      setScrollState({
        x: scrollLeft,
        progress,
        velocity,
      });

      ambientRef.current.x = scrollLeft;
      ambientRef.current.velocity = velocity;
      ambientRef.current.progress = progress;
      ambientRef.current.attractorX = campfireWorldXRef.current - scrollLeft;

      // Reset attack if user scrolls back away from chest
      if (attackTriggeredRef.current) {
        const csx = chestWorldXRef.current - scrollLeft;
        if (csx > window.innerWidth / 2 + CHEST_COLLISION_RANGE + 40) {
          setAttackTriggered(false);
        }
      }

      // A footstep every stride of travel (silent unless sound is on)
      strideRef.current += Math.abs(scrollLeft - lastScrollRef.current);
      if (strideRef.current > 110) {
        strideRef.current = 0;
        footstep();
      }

      lastScrollRef.current = scrollLeft;
      lastScrollTimeRef.current = now;
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Keyboard travel — scoped to the journey container (focused on mount)
  // so arrow keys aren't hijacked page-wide once focus moves elsewhere.
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 100;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        container.scrollLeft += step;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        container.scrollLeft -= step;
      }
      if (e.key === 'Home') {
        e.preventDefault();
        container.scrollTo({ left: 0, behavior: 'smooth' });
      }
      if (e.key === 'End') {
        e.preventDefault();
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
      }
    };

    container.focus({ preventScroll: true });
    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Wheel/touchpad → horizontal scroll. Vertical wheel maps to horizontal;
  // native horizontal deltas (trackpad swipe, Magic Mouse) pass through on
  // whichever axis dominates the gesture.
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current || !drivesRoad(e.target)) return;

      e.preventDefault();

      // deltaY is typically 100-120 per wheel notch; scale proportionally
      const scrollAmount =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY * 0.8;

      scrollContainerRef.current.scrollLeft += scrollAmount;
    };

    // On window, not the container: fixed overlays that opt in with
    // data-scroll-through (the farewell letter) sit outside it, and a wheel
    // over them would otherwise go nowhere and leave the visitor stuck.
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // TODO: Momentum/inertia scrolling - disabled pending fix
  // useEffect(() => {
  //   let animationFrameId: number;
  //   const applyMomentum = () => { ... };
  //   animationFrameId = requestAnimationFrame(applyMomentum);
  //   return () => cancelAnimationFrame(animationFrameId);
  // }, []);

  // Mobile: swipe on either axis → horizontal scroll with inertia
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartScrollLeft = 0;
    let lastTouchX = 0;
    let lastTouchY = 0;
    let lastTouchTime = 0;
    let touchVelocity = 0;
    let inertiaFrame: number | null = null;
    let tracking = false;

    const handleTouchStart = (e: TouchEvent) => {
      tracking = drivesRoad(e.target);
      if (!tracking) return;
      if (inertiaFrame !== null) {
        cancelAnimationFrame(inertiaFrame);
        inertiaFrame = null;
      }
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartScrollLeft = container.scrollLeft;
      lastTouchX = touchStartX;
      lastTouchY = touchStartY;
      lastTouchTime = performance.now();
      touchVelocity = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Multi-touch (pinch-zoom) is the browser's — touchAction: pinch-zoom
      if (!tracking || e.touches.length > 1) return;
      e.preventDefault();
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const now = performance.now();
      const dt = now - lastTouchTime;
      if (dt > 0) {
        touchVelocity = (lastTouchY - currentY + (lastTouchX - currentX)) / dt;
      }
      lastTouchX = currentX;
      lastTouchY = currentY;
      lastTouchTime = now;
      container.scrollLeft =
        touchStartScrollLeft + (touchStartY - currentY) + (touchStartX - currentX);
    };

    const handleTouchEnd = () => {
      if (!tracking) return;
      tracking = false;
      let velocity = touchVelocity * 16;
      const applyInertia = () => {
        if (Math.abs(velocity) < 0.5) {
          inertiaFrame = null;
          return;
        }
        container.scrollLeft += velocity;
        velocity *= 0.93;
        inertiaFrame = requestAnimationFrame(applyInertia);
      };
      inertiaFrame = requestAnimationFrame(applyInertia);
    };

    // On window for the same reason as the wheel: a swipe that starts on the
    // letter must still move the road.
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (inertiaFrame !== null) cancelAnimationFrame(inertiaFrame);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative w-full h-screen overflow-hidden">
      {/* THE WORLD'S GROUND — one computed watercolour field, fixed behind
          everything at z -1, replacing the four parallax artwork sets (see
          JourneySection.tsx for the reasoning). gate="pointer": travelling
          the page lays the wash. Its own ground paints the page cream, so
          nothing above it may be opaque. Under prefers-reduced-motion the
          field composes its primed state once and never loops. */}
      <anthemion-khysis
        gate="pointer"
        style={{
          '--khysis-ground': '#f9f7f3',
          '--khysis-first': '#3e7d8c',
          '--khysis-second': '#c2401f',
          '--khysis-third': '#7a5c3e',
        } as React.CSSProperties}
      />
      {/* touchAction: pinch-zoom — JS drives both pan axes, browser keeps zoom (WCAG 1.4.4) */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        role="region"
        aria-label="Nishant's journey — a horizontally scrolling portfolio. Use arrow keys, Home, or End to travel."
        className="w-full h-full overflow-x-auto overflow-y-hidden outline-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{ touchAction: 'pinch-zoom' }}
      >
        <div className="flex h-full">
          {/* Section 1: Hero */}
          <JourneySection
            id="hero"
            backgroundNumber={1}
            width={windowSize.width * widthOf('hero', isMobile)}
            scrollX={scrollState.x}
          >
            <div className="flex h-full" style={{ width: windowSize.width * widthOf('hero', isMobile) }}>
              {/* Ink roughness filter — woodblock/letterpress effect */}
              <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                  <filter id="ink-rough">
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

              {/* Landing Screen: Name */}
              <div 
                className="flex items-center justify-center h-[70vh] px-16 relative" 
                style={{ width: windowSize.width }}
              >
                <motion.div
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.4 }}
                >
                  {/* Top edition label */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    style={{
                      fontFamily: '"Georgia", "Times New Roman", serif',
                      fontSize: '0.6rem',
                      letterSpacing: '0.32em',
                      textTransform: 'uppercase',
                      color: 'rgba(20,12,5,0.8)',
                      marginBottom: '1.75rem',
                      filter: 'url(#ink-rough)',
                    }}
                  >
                    Vol. I &nbsp;·&nbsp; Portfolio 2026
                  </motion.div>

                  {/* Name — letterpress stamp */}
                  <motion.h1
                    style={{
                      fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
                      fontSize: 'clamp(3.8rem, 8vw, 7rem)',
                      fontWeight: 100,
                      color: 'rgba(12,7,2,0.92)',
                      lineHeight: 0.88,
                      letterSpacing: '-0.02em',
                      marginBottom: '1.75rem',
                      filter: 'url(#ink-rough)',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Nishant
                    <br />
                    Choudhary
                  </motion.h1>

                  {/* Ornate rule with red accent */}
                  <motion.div
                    className="flex items-center gap-3"
                    style={{ marginBottom: '1.4rem' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <div
                      style={{ width: '44px', height: '1px', background: 'rgba(20,12,5,0.22)' }}
                    />
                    <span
                      style={{
                        color: 'rgba(234,40,4,0.85)',
                        fontSize: '0.6rem',
                        filter: 'url(#ink-rough)',
                      }}
                    >
                      ✦
                    </span>
                    <div
                      style={{ width: '44px', height: '1px', background: 'rgba(20,12,5,0.22)' }}
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Extension Screen: Role & CTA */}
              <div 
                className="flex items-center justify-center h-full px-16 relative" 
                style={{ width: windowSize.width * 0.5 }}
              >
                <motion.div
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.4 }}
                >
                  {/* Role — spaced small-caps */}
                  <motion.p
                    style={{
                      fontFamily: '"Georgia", "Times New Roman", serif',
                      fontStyle: 'italic',
                      fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                      color: 'rgba(20,12,5,0.85)',
                      letterSpacing: '0.06em',
                      marginBottom: '1.1rem',
                      // filter: 'url(#ink-rough)',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.72 }}
                  >
                    Design Engineer
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    style={{
                      fontFamily: '"Georgia", "Times New Roman", serif',
                      fontSize: 'clamp(0.78rem, 1.05vw, 0.9rem)',
                      color: 'rgba(20,12,5,0.75)',
                      lineHeight: 1.9,
                      maxWidth: '30ch',
                      marginBottom: '2.2rem',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.86 }}
                  >
                    I design it and I build it — interfaces, motion and GPU work, one person
                    from first sketch to shipped.
                  </motion.p>

                  {/* CTA — stamped */}
                  <motion.div
                    className="flex items-center gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <div
                      style={{ width: '28px', height: '1px', background: 'rgba(20,12,5,0.18)' }}
                    />
                    <span
                      style={{
                        fontFamily: '"Georgia", "Times New Roman", serif',
                        fontStyle: 'italic',
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(20,12,5,0.75)',
                        filter: 'url(#ink-rough)',
                      }}
                    >
                      begin the journey
                    </span>
                    <motion.span
                      style={{ color: 'rgba(20,12,5,0.3)', fontSize: '0.8rem' }}
                      animate={{ x: [0, 7, 0] }}
                      transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRightCircle size={14} />
                    </motion.span>
                    <div
                      style={{ width: '28px', height: '1px', background: 'rgba(20,12,5,0.18)' }}
                    />
                  </motion.div>

                  {/* Wax seal — bottom center stamp */}
                  <motion.div
                    className="flex flex-col items-center justify-center"
                    style={{
                      marginTop: '2rem',
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      background: 'rgba(234,40,4,0.85)',
                      filter: 'url(#ink-rough)',
                    }}
                    initial={{ opacity: 0, scale: 0.4 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      style={{
                        color: 'rgba(255,255,255,0.92)',
                        fontSize: '0.95rem',
                        lineHeight: 1,
                      }}
                    >
                      ✦
                    </span>
                    <span
                      style={{
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: '0.38rem',
                        letterSpacing: '0.14em',
                        marginTop: '2px',
                        fontFamily: '"Georgia", serif',
                        fontWeight: 700,
                      }}
                    >
                      NC
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </JourneySection>

          {/* Section 2: Projects — book handles content via fixed overlay */}
          <JourneySection
            id="projects"
            backgroundNumber={2}
            width={windowSize.width * widthOf('projects', isMobile)}
            scrollX={scrollState.x}
            behindMountains
          >
            {/* "Adventures" — big sky title, sits behind foreground clouds (z-10 < z-20) */}
            <div
              className="absolute inset-0 flex items-start justify-center select-none pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <div
                className="font-display font-bold whitespace-nowrap text-center w-full"
                style={{
                  fontSize: '9.2vw',
                  letterSpacing: '-0.02em',
                  // Solid white was for the old teal sky; on the cream wash it
                  // vanished. Ghost ink, the same register as the other titles.
                  color: 'rgba(20,12,5,0.12)',
                  lineHeight: 1.0,
                  paddingTop: '0.15em',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 88%)',
                  maskImage:
                    'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 88%)',
                }}
              >
                Adventures
              </div>
            </div>
          </JourneySection>

          {/* Section 3: Process */}
          <JourneySection
            id="process"
            backgroundNumber={4}
            width={windowSize.width * widthOf('process', isMobile)}
            scrollX={scrollState.x}
          >
            <ProcessTimeline
              scrollProgress={processProgress(scrollState.x, windowSize.width, isMobile)}
            />
          </JourneySection>

          {/* Section 4: Farewell */}
          <JourneySection
            id="contact"
            backgroundNumber={3}
            width={windowSize.width * widthOf('contact', isMobile)}
            scrollX={scrollState.x}
            behindMountains
          >
          </JourneySection>
        </div>
      </div>

      {/* Waypoint signposts — placed before each section so sign appears while
          approaching. Clicking one fast-travels to its section. */}
      {waypointDefs(isMobile).map((wp) => (
        <WaypointSignpost
          key={wp.label}
          label={wp.label}
          position={windowSize.width * wp.x}
          characterX={scrollState.x}
          showArrow={wp.showArrow}
          onNavigate={() =>
            scrollContainerRef.current?.scrollTo({
              left: wp.targetVw * windowSize.width,
              behavior: 'smooth',
            })
          }
        />
      ))}

      {/* Torii gates on the section boundaries — the samurai passes through
          one into each new land, which is what lets the terrain change there
          read as arrival rather than error. */}
      {SECTIONS.slice(1).map((s) => (
        <SectionGate
          key={`gate-${s.id}`}
          worldX={windowSize.width * startOf(s.id, isMobile)}
          scrollX={scrollState.x}
        />
      ))}

      {/* Magic book — fixed viewport overlay, active during projects section */}
      <ProjectBook scrollX={scrollState.x} />

      {/* Scroll-composed haiku — three letterpress lines across the journey */}
      {[
        { text: 'ink dries on the road', xVw: 1.15, top: '24%', dark: false },
        {
          text: 'a traveller walks the page',
          xVw: startOf('process', isMobile) + (isMobile ? 0.65 : 0.4),
          top: '24%',
          dark: false,
        },
        {
          text: 'goodnight, drifting stars',
          xVw: startOf('contact', isMobile) + 0.5,
          top: '32%',
          dark: true,
        },
      ].map((line) => {
        const screenX = line.xVw * windowSize.width - scrollState.x;
        const opacity =
          1 - Math.min(1, Math.abs(screenX - windowSize.width * 0.5) / (windowSize.width * 0.45));
        if (opacity <= 0.01) return null;
        return (
          <div
            key={line.text}
            // The night line sits above the z-55 night-multiply layer; under it,
            // white ink was multiplied down to the sky's own grey.
            className={`fixed ${line.dark ? 'z-[57]' : 'z-30'} pointer-events-none select-none whitespace-nowrap`}
            style={{
              left: screenX,
              top: line.top,
              transform: 'translateX(-50%)',
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontStyle: 'italic',
              fontSize: '0.85rem',
              letterSpacing: '0.14em',
              color: line.dark ? 'rgba(255,255,255,0.75)' : 'rgba(20,12,5,0.7)',
              textShadow: line.dark ? '0 1px 10px rgba(0,0,0,0.7)' : 'none',
              filter: 'url(#ink-rough)',
              opacity,
            }}
          >
            {line.text}
          </div>
        );
      })}

      {/* "goodnight" — written in the night sky. Fixed and world-positioned like
          the haiku, above the z-55 night-multiply layer: inside the section it
          was graded with the world and 42% white came out the sky's own grey. */}
      {(() => {
        const screenX = (startOf('contact', isMobile) + 0.5) * windowSize.width - scrollState.x;
        if (screenX < -windowSize.width || screenX > windowSize.width * 2) return null;
        return (
          <div
            aria-hidden
            className="fixed z-[57] pointer-events-none select-none whitespace-nowrap"
            style={{
              left: screenX,
              top: '8vh',
              transform: 'translateX(-50%)',
              fontFamily: '"Playfair Display", "Georgia", "Times New Roman", serif',
              fontSize: 'clamp(3.8rem, 8vw, 7rem)',
              fontWeight: 100,
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              color: 'rgba(255,248,232,0.9)',
              textShadow: '0 2px 24px rgba(8,10,30,0.55)',
              filter: 'url(#ink-rough)',
              opacity: scrollState.progress > 0.87 ? 1 : 0,
              transition: 'opacity 1.4s ease',
            }}
          >
            goodnight
          </div>
        );
      })()}

      {/* Campfire — the resting place; fireflies gather, lantern hands over */}
      <Campfire scrollX={scrollState.x} worldX={CAMPFIRE_WORLD_X} night={nightIntensity} />

      {/* Farewell chest */}
      <FarewellChest
        scrollX={scrollState.x}
        chestWorldX={CHEST_WORLD_X}
        burst={attackTriggered}
        atChest={atChest && !attackTriggered}
        onAttackClick={handleAttackClick}
        reveal={farewellOnScreen}
        onWalkAgain={() => scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'smooth' })}
      />

      {/* Dark road overlay for final section */}
      <div
        className="fixed bottom-0 left-0 w-full z-[41] pointer-events-none"
        style={{
          height: Math.max(80, Math.round(200 * viewportScale)),
          background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 60%, transparent 100%)',
          opacity: scrollState.progress > 0.79 ? 1 : 0,
          transition: 'opacity 1.6s ease',
        }}
      />

      {/* Character */}
      <Character
        scrollX={scrollState.x}
        velocity={scrollState.velocity}
        progress={scrollState.progress}
        attackTrigger={attackTriggered}
      />

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
          opacity: nightIntensity * lanternHandover,
          transition: 'opacity 0.4s linear',
        }}
      />

      {/* Dragon flying in the sky */}
      {/* <Dragon scrollX={scrollState.x} /> */}

      {/* Journey minimap — road strip with waypoint dots + samurai marker */}
      <div
        className="fixed bottom-8 left-8 z-[60] flex items-center gap-3"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollState.progress * 100)}
        aria-label="Journey progress"
      >
        <div className="relative" style={{ width: 148, height: 14 }}>
          {/* road */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '50%',
              height: 1,
              background: 'rgba(255,255,255,0.35)',
              boxShadow: '0 1px 8px rgba(0,0,0,0.9)',
            }}
          />
          {/* waypoint dots at section starts */}
          {SECTIONS.map((s) => {
            const frac = startOf(s.id, isMobile) / maxScrollVw(isMobile);
            const passed = scrollState.progress >= frac - 0.001;
            return (
              <div
                key={s.id}
                title={s.id}
                style={{
                  position: 'absolute',
                  left: frac * 148,
                  top: '50%',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: passed ? 'rgba(234,40,4,0.9)' : 'rgba(255,255,255,0.45)',
                  transition: 'background 0.4s ease',
                }}
              />
            );
          })}
          {/* samurai marker */}
          <div
            style={{
              position: 'absolute',
              left: scrollState.progress * 148,
              top: '50%',
              width: 6,
              height: 6,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#fff',
              boxShadow: '0 0 6px rgba(255,255,255,0.9)',
            }}
          />
        </div>
        <span
          className="font-body text-xs uppercase tracking-[0.18em] font-semibold"
          style={{
            color: 'rgba(255,255,255,0.65)',
            textShadow: '0 1px 8px rgba(0,0,0,0.9)',
          }}
        >
          {Math.round(scrollState.progress * 100)}%
        </span>
      </div>

      {/* Music Toggle - Redesigned as a Calligraphy Stamp / Wax Seal */}
      <button
        onClick={toggleMusic}
        className="fixed top-8 right-8 z-[100] group flex items-center justify-center"
        aria-label="Toggle Music"
      >
        <motion.div
          className="relative flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* The Stamp / Seal Base */}
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: isMusicPlaying ? 'rgba(234,40,4,0.92)' : 'rgba(20,12,5,0.15)',
              filter: 'url(#ink-rough)',
              border: isMusicPlaying ? 'none' : '1px dashed rgba(20,12,5,0.3)',
              boxShadow: isMusicPlaying ? '0 4px 12px rgba(234,40,4,0.3)' : 'none',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.4rem',
                color: isMusicPlaying ? 'rgba(255,255,255,0.95)' : 'rgba(20,12,5,0.4)',
                lineHeight: 1,
                marginTop: '-2px',
              }}
            >
              {isMusicPlaying ? '♫' : '♪'}
            </span>
          </div>

          {/* Label that appears on hover */}
          <div
            className="absolute right-[calc(100%+12px)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
            style={{
              fontFamily: '"Georgia", serif',
              fontStyle: 'italic',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(20,12,5,0.6)',
            }}
          >
            {isMusicPlaying ? 'Silence the echoes' : 'Awaken the journey'}
          </div>
        </motion.div>
      </button>
    </div>
    </MotionConfig>
  );
};

export default HorizontalJourney;
