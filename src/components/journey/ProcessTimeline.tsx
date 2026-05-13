'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ProcessTimelineProps {
  scrollProgress: number;
}

const TABLETS = [
  {
    numeral: 'I',
    title: 'Discovery',
    description: 'Understand the terrain.\nMap the unknown.',
    threshold: 0.05,
    left: '7%',
    bottom: '34%',
    rotate: -2.5,
  },
  {
    numeral: 'II',
    title: 'Design',
    description: 'Shape the language.\nTurn intent into form.',
    threshold: 0.14,
    left: '30%',
    bottom: '26%',
    rotate: 1.8,
  },
  {
    numeral: 'III',
    title: 'Build',
    description: 'Clean code.\nClean architecture.',
    threshold: 0.24,
    left: '56%',
    bottom: '32%',
    rotate: -1.5,
  },
  {
    numeral: 'IV',
    title: 'Ship',
    description: 'Release. Gather signal.\nIterate without mercy.',
    threshold: 0.35,
    left: '76%',
    bottom: '25%',
    rotate: 2.2,
  },
];

// Treasure-map path — viewBox 0 0 100 100
// Centers: left%+7%, 100%-bottom%-17% per tablet
// T1: (14,31)  T2: (37,39)  T3: (63,33)  T4: (83,40)
const PATH_D = 'M 14,31 C 22,35 29,39 37,39 C 50,39 55,33 63,33 C 72,33 77,40 83,40';

const DOT_POSITIONS: [number, number][] = [
  [14, 31],
  [37, 39],
  [63, 33],
  [83, 40],
];

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ scrollProgress }) => {
  const pathProgress = Math.min(scrollProgress * 1.3, 1);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Background title — z-0, sits behind tablets but above parallax */}
      <div
        className="absolute inset-0 flex items-start justify-center select-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="font-display font-bold whitespace-nowrap text-center w-full"
          style={{
            fontSize: '9.2vw',
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,1)',
            lineHeight: 1.0,
            paddingTop: '0.15em',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 88%)',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 88%)',
          }}
        >
          Creative Process
        </div>
      </div>

      {/* Section marker — top left, fades in on entry */}
      <motion.div
        className="absolute top-8 left-12 z-20 flex items-center gap-3 pointer-events-none"
        animate={{
          opacity: scrollProgress > 0.05 ? 1 : 0,
          x: scrollProgress > 0.05 ? 0 : -16,
        }}
        transition={{ duration: 0.5 }}
      >
        {/* <div className="w-6 h-[2px] bg-replicate-primary" />
        <span
          className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-replicate-primary"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
        >
          Creative Process
        </span> */}
      </motion.div>

      {/* SVG treasure-map path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Ghost trail */}
        <path
          d={PATH_D}
          fill="none"
          stroke="rgba(234,40,4,0.12)"
          strokeWidth="0.35"
          strokeDasharray="0.9 2.2"
          strokeLinecap="round"
        />
        {/* Animated draw */}
        <motion.path
          d={PATH_D}
          fill="none"
          stroke="rgba(234,40,4,0.5)"
          strokeWidth="0.35"
          strokeDasharray="0.9 2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: pathProgress }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        {/* Dots at tablet joints */}
        {DOT_POSITIONS.map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="0.8"
            fill="#ea2804"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: scrollProgress > TABLETS[i].threshold ? 1 : 0,
              opacity: scrollProgress > TABLETS[i].threshold ? 1 : 0,
            }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 280 }}
          />
        ))}
      </svg>

      {/* Codex Tablets */}
      {TABLETS.map((tablet, idx) => {
        const active = scrollProgress > tablet.threshold;
        return (
          <motion.div
            key={tablet.numeral}
            className="absolute z-20"
            style={{ left: tablet.left, bottom: tablet.bottom }}
            initial={{ y: 140, opacity: 0 }}
            animate={{ y: active ? 0 : 140, opacity: active ? 1 : 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Static tilt wrapper */}
            <div style={{ transform: `rotate(${tablet.rotate}deg)` }}>
              <div
                className="relative w-[210px] py-10 px-7 overflow-hidden"
                style={{
                  minHeight: '320px',
                  background: 'rgba(255,255,255,1)',
                  borderTop: '2px solid rgba(234,40,4,0.65)',
                  borderLeft: '2px solid rgba(234,40,4,0.30)',
                  borderRight: '1px solid rgba(255,255,255,0.25)',
                  borderBottom: '1px solid rgba(255,255,255,0.12)',
                  // backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  boxShadow: active
                    ? '0 4px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)'
                    : '0 2px 10px rgba(0,0,0,0.08)',
                }}
              >
                {/* Giant numeral watermark */}
                <div
                  className="absolute -right-3 -top-3 font-display font-bold select-none pointer-events-none leading-none"
                  style={{
                    fontSize: '8rem',
                    color: 'rgba(234,40,4,0.08)',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {tablet.numeral}
                </div>

                {/* Small numeral label */}
                <div
                  className="font-body text-[10px] font-bold uppercase tracking-[0.3em] mb-4"
                  style={{ color: 'rgba(234,40,4,0.9)' }}
                >
                  {tablet.numeral}
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold leading-tight mb-3"
                  style={{
                    fontSize: '1.75rem',
                    color: 'rgba(20,10,5,0.92)',
                  }}
                >
                  {tablet.title}
                </h3>

                {/* Rule */}
                <div
                  className="w-8 h-px mb-4"
                  style={{ background: 'rgba(234,40,4,0.5)' }}
                />

                {/* Description */}
                <p
                  className="font-body leading-relaxed"
                  style={{
                    fontSize: '0.82rem',
                    color: 'rgba(20,10,5,0.55)',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.75,
                  }}
                >
                  {tablet.description}
                </p>

                {/* Red wax seal — bottom right */}
                <div
                  className="absolute bottom-5 right-5 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(234,40,4,0.9)',
                    boxShadow: '0 0 6px rgba(234,40,4,0.25)',
                  }}
                >
                  <span style={{ color: '#fff', fontSize: '8px', fontWeight: 700 }}>✦</span>
                </div>

                {/* Ember glow — bottom edge */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px]"
                  style={{ background: 'rgba(234,40,4,0.5)' }}
                  animate={{ opacity: active ? [0.3, 0.9, 0.3] : 0 }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProcessTimeline;
