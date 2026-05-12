'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface CommissionPathProps {
  scrollX: number;
  sectionStartX: number;
  sectionWidth: number;
}

// Curve connecting card bases: T0(12.5,82) T1(37.5,72) T2(62.5,82) T3(87.5,72)
const PATH_D =
  'M 12.5,82 C 20,82 30,72 37.5,72 C 50,72 55,82 62.5,82 C 72,82 80,72 87.5,72';

const DOT_POSITIONS: [number, number][] = [
  [12.5, 82],
  [37.5, 72],
  [62.5, 82],
  [87.5, 72],
];

// Each dot appears when path progress passes this fraction
const DOT_THRESHOLDS = [0.05, 0.3, 0.58, 0.83];

const CommissionPath: React.FC<CommissionPathProps> = ({
  scrollX,
  sectionStartX,
  sectionWidth,
}) => {
  const progress = Math.max(
    0,
    Math.min(1, (scrollX - sectionStartX) / (sectionWidth * 0.75))
  );

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 10 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Ghost trail */}
      <path
        d={PATH_D}
        fill="none"
        stroke="rgba(234,40,4,0.10)"
        strokeWidth="0.35"
        strokeDasharray="0.9 2.2"
        strokeLinecap="round"
      />

      {/* Animated draw */}
      <motion.path
        d={PATH_D}
        fill="none"
        stroke="rgba(234,40,4,0.45)"
        strokeWidth="0.35"
        strokeDasharray="0.9 2.2"
        strokeLinecap="round"
        style={{ pathLength: progress }}
      />

      {/* Dots at each card base */}
      {DOT_POSITIONS.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="0.8"
          fill="#ea2804"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={{
            scale: progress > DOT_THRESHOLDS[i] ? 1 : 0,
            opacity: progress > DOT_THRESHOLDS[i] ? 1 : 0,
          }}
          initial={{ scale: 0, opacity: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 280 }}
        />
      ))}
    </svg>
  );
};

export default CommissionPath;
