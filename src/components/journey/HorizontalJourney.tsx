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
    subtitle: 'Next-Generation Web-Based Video Editor',
    image: '/craon/craon-hero.png',
    role: 'Lead Frontend Engineer',
  },
  {
    title: 'MelloUp',
    subtitle: 'AI-Powered Event Marketing ROI Platform',
    image: '/melloup/melloup.png',
    role: 'Founding Engineer',
  },
  {
    title: 'Ibasho',
    subtitle: 'Digital Sanctuary for Emotional Expression',
    image: '/ibasho/ibashoo.png',
    role: 'Lead Designer & Developer',
  },
  {
    title: 'FreightEZ',
    subtitle: 'Transportation Management System',
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
            <motion.div
              className="flex items-center justify-center h-full px-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="max-w-2xl text-center">
                <motion.h1
                  className="text-8xl font-display font-bold text-replicate-ink mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Nishant Choudhary
                </motion.h1>

                <motion.p
                  className="text-3xl text-replicate-body font-display mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Full-Stack Creative Developer
                </motion.p>

                <motion.p
                  className="text-xl text-replicate-charcoal font-body leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Building immersive digital experiences through code, design, and obsessive
                  attention to detail.
                </motion.p>

                <motion.div
                  className="flex items-center justify-center gap-2 text-replicate-primary font-body text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <span>Scroll right to begin</span>
                  <motion.span
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
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
              <h2 className="text-6xl font-display font-bold text-replicate-ink drop-shadow-lg">
                Work
              </h2>
              <p className="text-lg text-replicate-body font-body mt-2 drop-shadow">
                Selected projects · scroll to explore
              </p>
            </div>

            {/* Cards: each owns 1/4 of the 3vw section, centered in its chunk */}
            {PROJECTS.map((project, idx) => {
              const sectionWidth = window.innerWidth * 2.2;
              const chunkWidth = sectionWidth / PROJECTS.length;
              // Card = 58% of each chunk — smaller, with more breathing room
              const cardWidth = Math.round(chunkWidth * 0.58);
              // Center card in the middle of its chunk
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
                  cardWidth={cardWidth}
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
            <div className="flex items-center justify-center h-full px-16">
              <motion.div
                className="text-center max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: scrollState.progress > 0.85 ? 1 : 0,
                  y: scrollState.progress > 0.85 ? 0 : 30,
                }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-6xl font-display font-bold text-replicate-ink mb-6">
                  Journey Complete
                </h2>
                <p className="text-xl text-replicate-body font-body mb-8">
                  Let's create something extraordinary together.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <motion.a
                    href="mailto:nishantchoudhary.dev@gmail.com"
                    className="px-8 py-3 bg-replicate-primary text-replicate-on-primary rounded-full font-display font-bold hover:bg-replicate-primary-deep transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get in Touch
                  </motion.a>
                  <motion.a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 border-2 border-replicate-ink text-replicate-ink rounded-full font-display font-bold hover:bg-replicate-canvas transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                </div>

                <p className="text-sm text-replicate-charcoal font-body">
                  Email: nishantchoudhary.dev@gmail.com
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
      <div className="fixed bottom-8 left-8 text-replicate-ink font-body text-sm">
        {Math.round(scrollState.progress * 100)}% Complete
      </div>
    </div>
  );
};

export default HorizontalJourney;
