'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useViewportScale } from '@/hooks/useViewportScale';

interface WaypointSignpostProps {
  label: string;
  position: number; // X position where waypoint is
  characterX: number;
  showArrow?: boolean;
  isVisible?: boolean;
}

const WaypointSignpost: React.FC<WaypointSignpostProps> = ({
  label,
  position,
  characterX,
  showArrow = true,
  isVisible = true,
}) => {
  const distance = position - characterX; // positive means it's ahead

  const { windowSize: { width: windowWidth }, viewportScale } = useViewportScale();

  // Show the sign until it naturally scrolls way off the left edge of the screen
  const isApproaching = distance > -windowWidth * 1.5 && distance < windowWidth * 1.5;

  if (!isApproaching || !isVisible) return null;

  return (
    <motion.div
      className="fixed z-45 pointer-events-none flex flex-col items-center justify-end"
      style={{
        left: `calc(80vw + ${distance}px)`,
        bottom: Math.max(14, Math.round(30 * viewportScale)),
      }}
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: 1, y: 20 }}
      // transition={{ duration: 0.5 }}
    >
      {/* Wooden Sign Board */}
      <div className="relative bg-[#8b5a2b] border-4 border-[#5c3a21] text-[#f4e4bc] px-3 py-1 shadow-xl flex items-center justify-center transform rounded-md z-10">
        {/* Right Arrow Cutout Shape effect (using CSS clip-path or border, but a simple arrow text works too) */}
        <span
          style={{
            filter: 'url(#ink-rough)',
            fontSize: `${Math.max(0.75, 1.125 * viewportScale)}rem`,
          }}
          className="font-display font-light drop-shadow-md"
        >
          {label}
        </span>
        {showArrow && <ArrowRight size={14} className="text-3xl font-bold drop-shadow-md" />}
        
        {/* Wooden texture stripes */}
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_4px,#000_5px,#000_6px)] pointer-events-none" />
      </div>

      {/* Wooden Post */}
      <div
        className="w-2 bg-[#5c3a21] border-l-2 border-r-4 border-[#3e2716] shadow-[10px_0_15px_rgba(0,0,0,0.4)]"
        style={{ height: Math.max(24, Math.round(48 * viewportScale)) }}
      />
    
    </motion.div>
  );
};

export default WaypointSignpost;
