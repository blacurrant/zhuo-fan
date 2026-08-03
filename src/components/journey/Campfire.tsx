'use client';
/**
 * Campfire — the resting place at the end of the journey.
 *
 * World-anchored like the chest; fades in with the night. The lantern glow
 * in HorizontalJourney hands over to this fire, and AmbientCanvas fireflies
 * drift toward it (via AmbientState.attractorX).
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useViewportScale } from '@/hooks/useViewportScale';

interface CampfireProps {
  scrollX: number;
  worldX: number;
  night: number; // 0..1 — ramp(progress, 0.74, 0.92)
}

const Campfire: React.FC<CampfireProps> = ({ scrollX, worldX, night }) => {
  const { windowSize: { width: windowWidth }, viewportScale } = useViewportScale();

  const screenX = worldX - scrollX;
  if (night <= 0.02 || screenX < -120 || screenX > windowWidth + 120) return null;

  const s = Math.max(0.6, viewportScale);

  return (
    <div
      className="fixed z-[44] pointer-events-none"
      style={{
        left: screenX,
        bottom: Math.max(16, Math.round(34 * viewportScale)),
        opacity: night,
        transform: `scale(${s})`,
        transformOrigin: 'bottom center',
      }}
      aria-hidden
    >
      {/* fire glow — breathes */}
      <motion.div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: -20,
          width: 260,
          height: 260,
          borderRadius: '50%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(255,150,50,0.30) 0%, rgba(255,120,40,0.12) 45%, rgba(255,120,40,0) 70%)',
        }}
        animate={{ opacity: [0.75, 1, 0.85, 1, 0.75], scale: [1, 1.06, 0.98, 1.04, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* flames — three layered tongues, offset flicker */}
      {[
        { w: 26, h: 38, bottom: 8, color: 'rgba(255,110,30,0.85)', dur: 0.9 },
        { w: 18, h: 28, bottom: 10, color: 'rgba(255,170,60,0.9)', dur: 0.7 },
        { w: 10, h: 17, bottom: 12, color: 'rgba(255,230,140,0.95)', dur: 0.5 },
      ].map((f, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            bottom: f.bottom,
            width: f.w,
            height: f.h,
            marginLeft: -f.w / 2,
            background: `radial-gradient(ellipse 50% 65% at 50% 85%, ${f.color} 0%, transparent 75%)`,
            borderRadius: '50% 50% 42% 42%',
            filter: 'blur(1px)',
          }}
          animate={{
            scaleY: [1, 1.25, 0.9, 1.15, 1],
            scaleX: [1, 0.9, 1.08, 0.94, 1],
            x: [0, 1.5, -1.5, 1, 0],
          }}
          transition={{ duration: f.dur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
        />
      ))}

      {/* crossed logs */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 2,
          width: 42,
          height: 8,
          marginLeft: -21,
          background: '#5C3D0A',
          border: '1px solid #3e2716',
          borderRadius: 3,
          transform: 'rotate(14deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 2,
          width: 42,
          height: 8,
          marginLeft: -21,
          background: '#6b4a14',
          border: '1px solid #3e2716',
          borderRadius: 3,
          transform: 'rotate(-14deg)',
        }}
      />
    </div>
  );
};

export default Campfire;
