'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CharacterProps {
  scrollX: number;
  velocity: number;
  progress: number;
}

const FRAME_SIZE = 128;
const RUN_THRESHOLD = 2.5;   // px/ms
const IDLE_TIMEOUT = 1000;   // ms

const spriteConfig = {
  idle: { url: '/Samurai/Idle.png', frames: 6, fps: 10 },
  walk: { url: '/Samurai/Walk.png', frames: 8, fps: 12 },
  run:  { url: '/Samurai/Run.png',  frames: 8, fps: 18 },
};

const Character: React.FC<CharacterProps> = ({ scrollX, velocity }) => {
  const characterX = window.innerWidth / 2 - FRAME_SIZE / 2;

  const [state, setState] = useState<'idle' | 'walk' | 'run'>('idle');
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [timedFrame, setTimedFrame] = useState(0);
  const lastScrollTimeRef = useRef(Date.now());
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(performance.now());

  // Update state and direction on scroll
  useEffect(() => {
    lastScrollTimeRef.current = Date.now();
    const absV = Math.abs(velocity);
    if (absV >= RUN_THRESHOLD) setState('run');
    else setState('walk');
    if (velocity > 0) setDirection('right');
    else if (velocity < 0) setDirection('left');
  }, [scrollX, velocity]);

  // Idle fallback after IDLE_TIMEOUT ms of no scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastScrollTimeRef.current > IDLE_TIMEOUT) {
        setState('idle');
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Time-based frame loop for idle and run
  useEffect(() => {
    if (state === 'walk') {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const fps = spriteConfig[state].fps;
    const frameInterval = 1000 / fps;
    const frames = spriteConfig[state].frames;

    const tick = (now: number) => {
      if (now - lastFrameTimeRef.current >= frameInterval) {
        setTimedFrame((prev) => (prev + 1) % frames);
        lastFrameTimeRef.current = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state]);

  // Frame index: walk = position-locked, idle/run = time-based
  let frameIndex = 0;
  if (state === 'walk') {
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
        {/* Character sprite */}
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
              transition: 'transform 0.1s ease',
              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 15px rgba(255, 255, 255, 0.3))',
            }}
          />
        </div>

        {/* State label */}
        {/* <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-xs text-replicate-charcoal font-body whitespace-nowrap bg-replicate-canvas/80 px-2 py-1 rounded-full shadow-sm border border-replicate-hairline backdrop-blur-sm">
          {state === 'idle' ? '⏸ Standing' : state === 'walk' ? '🚶 Walking' : '💨 Running'}
        </div> */}
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

        }}
      />
    </>
  );
};

export default Character;
