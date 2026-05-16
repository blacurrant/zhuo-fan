'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CharacterProps {
  scrollX: number;
  velocity: number;
  progress: number;
  attackTrigger: boolean;
}

const FRAME_SIZE = 128;
const RUN_THRESHOLD = 2.5;
const IDLE_TIMEOUT = 1000;

const spriteConfig = {
  idle:     { url: '/Samurai/Idle.png',     frames: 6, fps: 10 },
  walk:     { url: '/Samurai/Walk.png',     frames: 8, fps: 12 },
  run:      { url: '/Samurai/Run.png',      frames: 8, fps: 18 },
  attack:   { url: '/Samurai/Attack_1.png', frames: 6, fps: 14 },
  dead:     { url: '/Samurai/Dead.png',     frames: 3, fps: 8  },
};

const Character: React.FC<CharacterProps> = ({ scrollX, velocity, attackTrigger }) => {
  const [windowWidth, setWindowWidth] = useState(1920);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const characterX = windowWidth / 2 - FRAME_SIZE / 2;

  const [state, setState] = useState<'idle' | 'walk' | 'run' | 'attack' | 'dead'>('idle');
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const [timedFrame, setTimedFrame] = useState(0);
  const [deadFrame, setDeadFrame] = useState(0);
  const [deadDone, setDeadDone] = useState(false);
  const [attackFrame, setAttackFrame] = useState(0);
  const [attackDone, setAttackDone] = useState(false);

  const lastScrollTimeRef = useRef(Date.now());
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef(performance.now());
  const sequenceStartedRef = useRef(false);

  // Attack trigger → play attack → then dead; reset on scroll back
  useEffect(() => {
    if (attackTrigger && !sequenceStartedRef.current) {
      sequenceStartedRef.current = true;
      setState('attack');
      setAttackFrame(0);
      setAttackDone(false);
      setDeadFrame(0);
      setDeadDone(false);
    } else if (!attackTrigger && sequenceStartedRef.current) {
      sequenceStartedRef.current = false;
      setState('idle');
      setAttackFrame(0);
      setAttackDone(false);
      setDeadFrame(0);
      setDeadDone(false);
    }
  }, [attackTrigger]);

  // When attack finishes → transition to dead
  useEffect(() => {
    if (attackDone) {
      setState('dead');
      setDeadFrame(0);
      setDeadDone(false);
    }
  }, [attackDone]);

  // Scroll-driven state — locked out once sequence starts
  useEffect(() => {
    if (sequenceStartedRef.current) return;
    lastScrollTimeRef.current = Date.now();
    const absV = Math.abs(velocity);
    if (absV >= RUN_THRESHOLD) setState('run');
    else setState('walk');
    if (velocity > 0) setDirection('right');
    else if (velocity < 0) setDirection('left');
  }, [scrollX, velocity]);

  // Idle fallback
  useEffect(() => {
    const interval = setInterval(() => {
      if (sequenceStartedRef.current) return;
      if (Date.now() - lastScrollTimeRef.current > IDLE_TIMEOUT) setState('idle');
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Time-based loop for idle/run
  useEffect(() => {
    if (state === 'walk' || state === 'attack' || state === 'dead') {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const { fps, frames } = spriteConfig[state];
    const frameInterval = 1000 / fps;

    const tick = (now: number) => {
      if (now - lastFrameTimeRef.current >= frameInterval) {
        setTimedFrame((prev) => (prev + 1) % frames);
        lastFrameTimeRef.current = now;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [state]);

  // Attack animation — play once then set attackDone
  useEffect(() => {
    if (state !== 'attack' || attackDone) return;

    const { fps, frames } = spriteConfig.attack;
    const frameInterval = 1000 / fps;

    const tick = (now: number) => {
      if (now - lastFrameTimeRef.current >= frameInterval) {
        setAttackFrame((prev) => {
          if (prev >= frames - 1) {
            setAttackDone(true);
            return frames - 1;
          }
          lastFrameTimeRef.current = now;
          return prev + 1;
        });
        lastFrameTimeRef.current = now;
      }
      if (!attackDone) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [state, attackDone]);

  // Dead animation — play once then hold on last frame
  useEffect(() => {
    if (state !== 'dead' || deadDone) return;

    const { fps, frames } = spriteConfig.dead;
    const frameInterval = 1000 / fps;

    const tick = (now: number) => {
      if (now - lastFrameTimeRef.current >= frameInterval) {
        setDeadFrame((prev) => {
          if (prev >= frames - 1) {
            setDeadDone(true);
            return frames - 1;
          }
          lastFrameTimeRef.current = now;
          return prev + 1;
        });
        lastFrameTimeRef.current = now;
      }
      if (!deadDone) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [state, deadDone]);

  // Frame index
  let frameIndex = 0;
  if (state === 'attack')     frameIndex = attackFrame;
  else if (state === 'dead')  frameIndex = deadFrame;
  else if (state === 'walk')  frameIndex = Math.floor(Math.abs(scrollX) / 24) % spriteConfig.walk.frames;
  else                        frameIndex = timedFrame;

  const currentConfig = spriteConfig[state];
  const bgPositionX = -(frameIndex * FRAME_SIZE);

  return (
    <>
      <motion.div
        className="fixed z-50 pointer-events-none"
        style={{ left: characterX, bottom: 30 }}
      >
        <div className="relative w-[128px] h-[128px] flex items-end justify-center">
          {/* Dynamic Contact Shadow */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 2, // sitting directly under the feet
              left: '50%',
              width: 50,
              height: 10,
              background: 'rgba(0,0,0,0.22)',
              borderRadius: '50%',
              filter: 'blur(4px)',
              x: '-50%',
            }}
            animate={{
              scale: (state === 'walk' || state === 'run') 
                ? [0.8, 1.1, 0.8] 
                : state === 'idle' ? [0.95, 1.05, 0.95] : 1,
              opacity: (state === 'walk' || state === 'run')
                ? [0.4, 0.7, 0.4]
                : 0.6,
            }}
            transition={{
              duration: state === 'run' ? 0.4 : state === 'walk' ? 0.7 : 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          <div
            style={{
              width: `${FRAME_SIZE}px`,
              height: `${FRAME_SIZE}px`,
              backgroundImage: `url(${currentConfig.url})`,
              backgroundPosition: `${bgPositionX}px 0`,
              backgroundRepeat: 'no-repeat',
              transform: `scale(2.0) scaleX(${direction === 'left' ? -1 : 1})`,
              transformOrigin: 'bottom center',
              transition: (state === 'dead' || state === 'attack') ? 'none' : 'transform 0.1s ease',
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
        }}
      />
    </>
  );
};

export default Character;
