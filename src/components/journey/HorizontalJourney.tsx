'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Character from './Character';
import JourneySection from './JourneySection';
import ProjectCard from './ProjectCard';
import WaypointSignpost from './WaypointSignpost';
import ProcessTimeline from './ProcessTimeline';

interface ScrollState {
  x: number;
  progress: number;
  velocity: number;
}

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

const HorizontalJourney: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    x: 0,
    progress: 0,
    velocity: 0,
  });

  const lastScrollRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());

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
            width={window.innerWidth}
            scrollX={scrollState.x}
          >
            <div className="flex items-start justify-start h-full px-16 pt-16 pb-48">
              <motion.div
                className="max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Red eyebrow tag */}
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="w-8 h-[2px] bg-replicate-primary" />
                  <span
                    className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-replicate-primary"
                    style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
                  >
                    Portfolio · 2025
                  </span>
                </motion.div>

                {/* Name — massive */}
                <motion.h1
                  className="font-display font-bold text-white leading-[0.92] mb-6"
                  style={{
                    fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
                    textShadow: '0 4px 40px rgba(0,0,0,0.9), 0 1px 6px rgba(0,0,0,0.95)',
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Nishant<br />Choudhary
                </motion.h1>

                {/* Rule */}
                <motion.div
                  className="w-24 h-[3px] bg-replicate-primary mb-6"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                />

                {/* Role */}
                <motion.p
                  className="font-display font-semibold text-white mb-4"
                  style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    textShadow: '0 2px 20px rgba(0,0,0,0.9)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.65 }}
                >
                  Full-Stack Creative Developer
                </motion.p>

                {/* Description */}
                <motion.p
                  className="font-body leading-relaxed mb-10"
                  style={{
                    fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
                    color: 'rgba(255,255,255,0.78)',
                    textShadow: '0 2px 16px rgba(0,0,0,0.85)',
                    maxWidth: '38ch',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.75 }}
                >
                  Building immersive digital experiences through code, design, and obsessive
                  attention to detail.
                </motion.p>

                {/* Scroll CTA */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <span
                    className="font-body text-sm font-medium uppercase tracking-[0.15em]"
                    style={{ color: 'rgba(255,255,255,0.55)', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
                  >
                    Scroll to begin
                  </span>
                  <motion.span
                    className="text-replicate-primary font-bold text-lg"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ textShadow: '0 0 12px rgba(234,40,4,0.6)' }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </motion.div>
            </div>
          </JourneySection>

          {/* Section 2: Projects — each card owns equal chunk of the 3vw section */}
          <JourneySection
            id="projects"
            backgroundNumber={2}
            width={window.innerWidth * 2.2}
            scrollX={scrollState.x}
            behindMountains
          >
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

            {/* Cards: each owns 1/4 of the 3vw section, centered in its chunk */}
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

          {/* Section 3: Process */}
          <JourneySection
            id="process"
            backgroundNumber={4}
            width={window.innerWidth}
            scrollX={scrollState.x}
          >
            <ProcessTimeline
              scrollProgress={scrollState.progress > 0.5 ? (scrollState.progress - 0.5) * 2 : 0}
            />
          </JourneySection>

          {/* Section 4: Contact */}
          <JourneySection
            id="contact"
            backgroundNumber={3}
            width={window.innerWidth}
            scrollX={scrollState.x}
          >
            <div className="flex items-start justify-start h-full px-16 pt-16 pb-48">
              <motion.div
                className="max-w-2xl"
                animate={{
                  opacity: scrollState.progress > 0.85 ? 1 : 0,
                  y: scrollState.progress > 0.85 ? 0 : 32,
                }}
                transition={{ duration: 0.7 }}
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[2px] bg-replicate-primary" />
                  <span
                    className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-replicate-primary"
                    style={{ textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
                  >
                    End of Journey
                  </span>
                </div>

                {/* Heading */}
                <h2
                  className="font-display font-bold text-white leading-[0.92] mb-6"
                  style={{
                    fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                    textShadow: '0 4px 40px rgba(0,0,0,0.95), 0 1px 6px rgba(0,0,0,0.9)',
                  }}
                >
                  Let's build<br />something.
                </h2>

                <div className="w-20 h-[3px] bg-replicate-primary mb-6" />

                <p
                  className="font-body leading-relaxed mb-10"
                  style={{
                    fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                    color: 'rgba(255,255,255,0.72)',
                    textShadow: '0 2px 16px rgba(0,0,0,0.85)',
                    maxWidth: '36ch',
                  }}
                >
                  Open to roles, freelance, and ambitious side projects. Let's make something
                  extraordinary.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 items-center">
                  <motion.a
                    href="mailto:nishantchoudhary.dev@gmail.com"
                    className="px-7 py-3 bg-replicate-primary text-white rounded-full font-display font-bold text-sm uppercase tracking-wide hover:bg-replicate-primary-deep transition-colors"
                    style={{ boxShadow: '0 4px 24px rgba(234,40,4,0.45)' }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Get in Touch
                  </motion.a>
                  <motion.a
                    href="https://github.com/blacurrant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3 font-display font-bold text-sm uppercase tracking-wide text-white transition-colors"
                    style={{
                      border: '2px solid rgba(255,255,255,0.35)',
                      borderRadius: '9999px',
                      backdropFilter: 'blur(4px)',
                    }}
                    whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.8)' }}
                    whileTap={{ scale: 0.96 }}
                  >
                    GitHub
                  </motion.a>
                </div>

                <p
                  className="font-body mt-8 text-xs uppercase tracking-[0.15em]"
                  style={{ color: 'rgba(255,255,255,0.35)', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}
                >
                  nishantchoudhary.dev@gmail.com
                </p>
              </motion.div>
            </div>
          </JourneySection>
        </div>
      </div>

      {/* Waypoint signposts — positions match 1 + 2.2 + 1 + 1 = 5.2vw total */}
      <WaypointSignpost
        label="work"
        position={0}
        characterX={scrollState.x}
      />
      <WaypointSignpost label="process" position={window.innerWidth * 2.2} characterX={scrollState.x} />
      <WaypointSignpost
        label="contact"
        position={window.innerWidth * 3.2}
        characterX={scrollState.x}
      />
      <WaypointSignpost
        label="death valley"
        position={window.innerWidth * 4.2}
        characterX={scrollState.x}
      />

      {/* Character */}
      <Character
        scrollX={scrollState.x}
        velocity={scrollState.velocity}
        progress={scrollState.progress}
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
    </div>
  );
};

export default HorizontalJourney;
