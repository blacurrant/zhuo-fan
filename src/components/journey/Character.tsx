'use client';
import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CharacterProps {
  scrollX: number;
  velocity: number;
  progress: number;
}

const Character: React.FC<CharacterProps> = ({ scrollX, velocity, progress }) => {
  const CHAR_WIDTH = 80;
  const CHAR_HEIGHT = 100;
  const characterX = window.innerWidth / 2 - CHAR_WIDTH / 2;

  // Animation state based on velocity
  const [state, setState] = useState<'idle' | 'walk' | 'run'>('idle');
  const animationSpeed = useMemo(() => {
    const speed = Math.abs(velocity);
    if (speed < 5) return 0;
    if (speed < 30) return 1.2;
    return 0.6;
  }, [velocity]);

  useEffect(() => {
    const speed = Math.abs(velocity);
    if (speed < 5) setState('idle');
    else if (speed < 30) setState('walk');
    else setState('run');
  }, [velocity]);

  // Walk cycle frames (8 frame animation)
  const walkFrames = [0, 1, 2, 3, 4, 5, 6, 7];
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (state === 'idle') {
      setFrameIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setFrameIndex(prev => (prev + 1) % walkFrames.length);
    }, animationSpeed * 50);

    return () => clearInterval(interval);
  }, [state, animationSpeed]);

  // Simple ASCII character sprite system
  const getSpriteChar = () => {
    const frames = {
      idle: '🧑',
      walk: ['🚶', '🚶‍♂️', '🧑', '🚶'][frameIndex % 4],
      run: ['🏃', '🏃‍♂️'][frameIndex % 2],
    };
    return frames[state] || '🧑';
  };

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      style={{
        left: characterX,
        bottom: 120,
      }}
    >
      {/* Character sprite */}
      <motion.div
        className="relative w-20 h-24 flex items-end justify-center"
        animate={{
          y: state !== 'idle' ? [0, -6, 0] : 0,
        }}
        transition={{
          duration: animationSpeed,
          repeat: state !== 'idle' ? Infinity : 0,
          ease: 'easeInOut',
        }}
      >
        <div className="text-6xl select-none">
          {getSpriteChar()}
        </div>
      </motion.div>

      {/* State label */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-xs text-replicate-charcoal font-body whitespace-nowrap">
        {state === 'idle' ? '⏸ Standing' : state === 'walk' ? '🚶 Walking' : '💨 Running'}
      </div>

      {/* Progress arc around character */}
      <svg className="absolute -top-3 -right-3 w-28 h-28 opacity-30" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          className="text-replicate-primary"
          strokeWidth="2"
          opacity="0.5"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          className="text-replicate-primary"
          strokeWidth="2"
          strokeDasharray={`${(progress * 282).toFixed(0)} 282`}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
    </motion.div>
  );
};

export default Character;
