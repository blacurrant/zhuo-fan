'use client';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CharacterProps {
  scrollX: number;
  velocity: number;
  progress: number;
}

const Character: React.FC<CharacterProps> = ({ scrollX, velocity, progress }) => {
  // Sprite frames are 128x128
  const FRAME_SIZE = 128;
  const characterX = window.innerWidth / 2 - FRAME_SIZE / 2;

  const [state, setState] = useState<'idle' | 'walk'>('idle');
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const lastScrollTimeRef = useRef(Date.now());

  // Update direction and mark as walking on any scroll
  useEffect(() => {
    lastScrollTimeRef.current = Date.now();
    setState('walk');
    if (velocity > 0) setDirection('right');
    else if (velocity < 0) setDirection('left');
  }, [scrollX, velocity]);

  // Transition to idle after 3.5 seconds of no scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastScrollTimeRef.current > 3500) {
        setState('idle');
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const spriteConfig = {
    idle: { url: '/Samurai/Idle.png', frames: 6, fps: 10 },
    walk: { url: '/Samurai/Walk.png', frames: 8, fps: 12 },
  };

  const [idleFrame, setIdleFrame] = useState(0);

  // Animate idle state via time
  useEffect(() => {
    if (state === 'idle') {
      const interval = setInterval(() => {
        setIdleFrame((prev) => (prev + 1) % spriteConfig.idle.frames);
      }, 1000 / spriteConfig.idle.fps);
      return () => clearInterval(interval);
    }
  }, [state]);

  // Calculate actual frame index
  let frameIndex = 0;
  if (state === 'idle') {
    frameIndex = idleFrame;
  } else {
    // Perfectly lock the walking animation frame to the scroll distance!
    // Every 24 pixels scrolled horizontally = 1 frame of animation forward.
    // If scrollX stops, the math freezes perfectly on the current frame.
    frameIndex = Math.floor(Math.abs(scrollX) / 24) % spriteConfig.walk.frames;
  }

  const currentConfig = spriteConfig[state];
  const bgPositionX = -(frameIndex * FRAME_SIZE);

  return (
    <>
      <motion.div
        className="fixed z-50 pointer-events-none"
        style={{
          left: characterX,
          bottom: 30, // Sits exactly on top of the ground
        }}
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
              transformOrigin: 'bottom center', // Scale from the feet up
              transition: 'transform 0.1s ease', // Smooth flip
            }}
          />
        </div>

        {/* State label */}
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-xs text-replicate-charcoal font-body whitespace-nowrap bg-replicate-canvas/80 px-2 py-1 rounded-full shadow-sm border border-replicate-hairline backdrop-blur-sm">
          {state === 'idle' ? '⏸ Standing' : state === 'walk' ? '🚶 Walking' : '💨 Running'}
        </div>
      </motion.div>

      {/* Road layer that stays fixed on screen but animates with scroll */}
      <div 
        className="fixed bottom-0 left-0 w-full h-[240px] z-40 pointer-events-none"
        style={{
          backgroundImage: 'url(/road.png)',
          backgroundRepeat: 'repeat-x',
          backgroundPosition: `${-scrollX}px center`,
          backgroundSize: 'auto 100%'
        }}
      />
    </>
  );
};

export default Character;
