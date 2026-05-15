'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Character from './Character';
import JourneySection from './JourneySection';
import WaypointSignpost from './WaypointSignpost';
import ProcessTimeline from './ProcessTimeline';
import ProjectBook from './ProjectBook';
import FarewellChest from './FarewellChest';
import { ArrowRightCircle } from 'lucide-react';

// World-space X of the chest — 35% into section 4
// Section 4 starts at vw*(1.5+2.2+1) = vw*4.7; chest at vw*5.05
const CHEST_WORLD_X = typeof window !== 'undefined' ? window.innerWidth * 5.05 : 0;
// Character is always at viewport center; attack fires when character reaches chest
const ATTACK_TRIGGER_SCROLL = CHEST_WORLD_X - (typeof window !== 'undefined' ? window.innerWidth * 0.5 : 0);

interface ScrollState {
  x: number;
  progress: number;
  velocity: number;
}

const HorizontalJourney: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    x: 0,
    progress: 0,
    velocity: 0,
  });

  const lastScrollRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());
  const [attackTriggered, setAttackTriggered] = useState(false);
  
  // Background Music state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio('/music/Heartbeat.mp3');
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

      if (!attackTriggered && scrollLeft >= ATTACK_TRIGGER_SCROLL) {
        setAttackTriggered(true);
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

  // Arrow keys for scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollContainerRef.current) return;

      const step = 100;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += step;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft -= step;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Vertical scroll (wheel/touchpad) → horizontal scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current) return;

      e.preventDefault();

      // Map vertical wheel movement to horizontal scroll
      // deltaY is typically 100-120 per wheel notch; scale proportionally
      const scrollAmount = e.deltaY * 0.8;

      scrollContainerRef.current.scrollLeft += scrollAmount;
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  // TODO: Momentum/inertia scrolling - disabled pending fix
  // useEffect(() => {
  //   let animationFrameId: number;
  //   const applyMomentum = () => { ... };
  //   animationFrameId = requestAnimationFrame(applyMomentum);
  //   return () => cancelAnimationFrame(animationFrameId);
  // }, []);

  return (
    <div className="relative w-full h-screen bg-replicate-canvas overflow-hidden">
      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="w-full h-full overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div className="flex h-full">
          {/* Section 1: Hero */}
          <JourneySection
            id="hero"
            backgroundNumber={1}
            width={window.innerWidth * 1.5}
            scrollX={scrollState.x}
          >
            <div className="flex h-full" style={{ width: window.innerWidth * 1.5 }}>
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
                style={{ width: window.innerWidth }}
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
                style={{ width: window.innerWidth * 0.5 }}
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
                    Full-Stack Creative Developer
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
                    Charting immersive digital worlds through code, design, and obsessive attention
                    to craft.
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
            width={window.innerWidth * 2.2}
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
                  color: 'rgba(255,255,255,1)',
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
            width={window.innerWidth}
            scrollX={scrollState.x}
          >
            <ProcessTimeline
              scrollProgress={Math.max(0, Math.min(1, scrollState.progress * 4.7 - 2.7))}
            />
          </JourneySection>

          {/* Section 4: Farewell */}
          <JourneySection
            id="contact"
            backgroundNumber={3}
            width={window.innerWidth}
            scrollX={scrollState.x}
          >
            {/* Ink-rough filter — matches hero letterpress aesthetic */}
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

                {/* Farewell text */}
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
        </div>
      </div>

      {/* Waypoint signposts — placed before each section so sign appears while approaching */}
      <WaypointSignpost label="work" position={window.innerWidth * 0.5} characterX={scrollState.x} />
      <WaypointSignpost
        label="process"
        position={window.innerWidth * 2.6}
        characterX={scrollState.x}
      />
      <WaypointSignpost
        label="contact"
        position={window.innerWidth * 3.7}
        characterX={scrollState.x}
      />
      <WaypointSignpost
        label="rest, traveller."
        position={window.innerWidth * 4.7}
        characterX={scrollState.x}
        showArrow={false}
      />

      {/* Magic book — fixed viewport overlay, active during projects section */}
      <ProjectBook scrollX={scrollState.x} />

      {/* Farewell chest */}
      <FarewellChest
        scrollX={scrollState.x}
        chestWorldX={CHEST_WORLD_X}
        burst={attackTriggered}
      />

      {/* Character */}
      <Character
        scrollX={scrollState.x}
        velocity={scrollState.velocity}
        progress={scrollState.progress}
        attackTrigger={attackTriggered}
      />

      {/* Progress indicator */}
      <div
        className="fixed bottom-8 left-8 font-body text-xs uppercase tracking-[0.18em] font-semibold"
        style={{
          color: 'rgba(255,255,255,0.65)',
          textShadow: '0 1px 8px rgba(0,0,0,0.9)',
        }}
      >
        {Math.round(scrollState.progress * 100)}%
      </div>

      {/* Music Toggle Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-8 right-8 z-[100] flex items-center gap-3 px-5 py-2.5 bg-replicate-canvas/60 backdrop-blur-md border border-replicate-hairline rounded-full shadow-lg hover:bg-replicate-canvas/80 transition-all duration-300 group"
        style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: '0.7rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: isMusicPlaying ? 'rgba(234,40,4,0.9)' : 'rgba(20,12,5,0.6)',
        }}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isMusicPlaying ? 'bg-replicate-primary animate-pulse' : 'bg-replicate-charcoal/30'}`} />
        <span className="font-bold">{isMusicPlaying ? '♪ Music On' : '♪ Music Off'}</span>
        <div className="absolute inset-0 rounded-full bg-replicate-primary/5 scale-0 group-hover:scale-100 transition-transform duration-500" />
      </button>
    </div>
  );
};

export default HorizontalJourney;
