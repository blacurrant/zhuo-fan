'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useViewportScale } from '@/hooks/useViewportScale';

interface DragonProps {
  scrollX: number;
}

const TOTAL_FRAMES = 12;
const COLUMNS = 4;
const ROWS = 3;

const Dragon: React.FC<DragonProps> = ({ scrollX }) => {
  const { viewportScale } = useViewportScale();

  // Advance frame based on scroll position
  // Adjust the divisor (e.g., 30) to control animation speed relative to scroll
  const frameIndex = Math.floor(Math.abs(scrollX) / 30) % TOTAL_FRAMES;

  const col = frameIndex % COLUMNS;
  const row = Math.floor(frameIndex / COLUMNS);

  const bgPosX = col * (100 / (COLUMNS - 1));
  const bgPosY = row * (100 / (ROWS - 1));

  // Base dimensions of the dragon frame (703x501 roughly)
  // We'll scale it down for the screen
  const width = 350 * viewportScale;
  const height = 250 * viewportScale;

  return (
    <motion.div
      className="fixed z-20 pointer-events-none"
      style={{
        // Position it in the sky, e.g., upper right or upper middle
        top: '15%',
        right: '25%',
        width,
        height,
      }}
      // Optional: add a slight floating up/down motion to make it look alive
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/Samurai/dragon.png)',
          backgroundSize: `${COLUMNS * 100}% ${ROWS * 100}%`,
          backgroundPosition: `${bgPosX}% ${bgPosY}%`,
          backgroundRepeat: 'no-repeat',
          opacity: 0.85,
          filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))',
        }}
      />
    </motion.div>
  );
};

export default Dragon;
