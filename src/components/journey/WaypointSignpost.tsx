'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface WaypointSignpostProps {
  label: string;
  position: number; // X position where waypoint is
  characterX: number;
  isVisible?: boolean;
}

const WaypointSignpost: React.FC<WaypointSignpostProps> = ({
  label,
  position,
  characterX,
  isVisible = true,
}) => {
  const distance = Math.abs(position - characterX);
  const isApproaching = distance < 400 && distance > 0;
  const isPassed = characterX > position;

  const relativeX = position - characterX;

  // Only show if ahead (positive distance)
  if (relativeX < -100 || relativeX > 800 || !isVisible) return null;

  return (
    <motion.div
      className="fixed z-40 pointer-events-none"
      style={{
        left: `calc(50vw + ${relativeX}px)`,
        top: '20%',
      }}
      animate={{
        opacity: isApproaching ? 1 : 0.5,
        scale: isApproaching ? 1.1 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Signpost pole */}
      <div className="flex flex-col items-center">
        {/* Sign */}
        <motion.div
          className="bg-replicate-primary text-replicate-on-primary px-4 py-2 rounded-lg font-display font-bold text-sm whitespace-nowrap shadow-lg"
          animate={{
            y: isApproaching ? [0, -8, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isApproaching ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          {label}
        </motion.div>

        {/* Pole */}
        <div className="w-1 h-16 bg-gradient-to-b from-replicate-primary to-replicate-primary-deep opacity-60" />

        {/* Distance indicator */}
        <motion.div
          className="text-xs text-replicate-charcoal font-body mt-2 opacity-60"
          animate={{
            opacity: isApproaching ? 1 : 0.3,
          }}
        >
          {Math.round(distance)}m
        </motion.div>
      </div>

      {/* Arrow pointing direction */}
      {!isPassed && (
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 text-2xl mt-2"
          animate={{
            x: isApproaching ? [0, 8, 0] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: isApproaching ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          →
        </motion.div>
      )}
    </motion.div>
  );
};

export default WaypointSignpost;
