'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FarewellChestProps {
  scrollX: number;
  chestWorldX: number;
  burst: boolean;
}

const links = [
  { label: 'GitHub',   href: 'https://github.com/blacurrant',                          offset: { x: -220, y: -180 } },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nishant-choudhary-dev',          offset: { x:  140, y: -200 } },
  { label: 'Twitter',  href: 'https://twitter.com/blacurrant',                         offset: { x: -180, y: -320 } },
  { label: 'Résumé',   href: '/Nishant_fullstack_cv.pdf',                              offset: { x:  120, y: -340 } },
];

const FarewellChest: React.FC<FarewellChestProps> = ({ scrollX, chestWorldX, burst }) => {
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'burst'>('idle');
  const [frozenX, setFrozenX] = useState(0);
  const liveScreenX = chestWorldX - scrollX;
  // Use live position while idle/approaching; freeze at the moment burst fires
  const screenX = phase === 'idle' ? liveScreenX : frozenX;

  useEffect(() => {
    if (!burst || phase !== 'idle') return;
    setFrozenX(liveScreenX);
    setPhase('shaking');
    const t = setTimeout(() => setPhase('burst'), 420);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burst]);

  const visible = screenX > -80 && screenX < window.innerWidth + 80;
  if (!visible && phase === 'idle') return null;

  return (
    <>
      {/* Crate */}
      <AnimatePresence>
        {phase !== 'burst' && (
          <motion.div
            className="fixed z-[45] pointer-events-none"
            style={{ left: screenX - 24, bottom: 34 }}
            animate={phase === 'shaking' ? {
              x: [0, -5, 5, -4, 4, -2, 2, 0],
              rotate: [0, -3, 3, -2, 2, 0],
            } : { x: 0, rotate: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            exit={{ scale: 2.5, opacity: 0, transition: { duration: 0.2 } }}
          >
            <Crate />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Burst particles */}
      <AnimatePresence>
        {phase === 'burst' && (
          <>
            {/* Impact flash */}
            <motion.div
              className="fixed z-[46] pointer-events-none rounded-full"
              style={{
                left: screenX - 40,
                bottom: 24,
                width: 80,
                height: 80,
                background: 'radial-gradient(circle, rgba(234,40,4,0.9) 0%, transparent 70%)',
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.35 }}
            />

            {/* Splinter shards */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`shard-${i}`}
                className="fixed z-[46] pointer-events-none"
                style={{
                  left: screenX - 4,
                  bottom: 44,
                  width: 6,
                  height: 10,
                  background: '#8B6914',
                  borderRadius: 1,
                }}
                initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x: (i % 2 === 0 ? -1 : 1) * (40 + i * 18),
                  y: -(60 + i * 25),
                  rotate: (i % 2 === 0 ? -1 : 1) * (90 + i * 30),
                }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: 'easeOut' }}
              />
            ))}

            {/* Links */}
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="fixed z-[47]"
                style={{ left: screenX, bottom: 54 }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                animate={{
                  x: link.offset.x,
                  y: link.offset.y,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 18,
                  delay: 0.08 + i * 0.06,
                }}
                whileHover={{ scale: 1.08 }}
              >
                <LinkTag label={link.label} />
              </motion.a>
            ))}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const Crate: React.FC = () => (
  <div
    style={{
      width: 48,
      height: 44,
      background: '#7B4F1E',
      border: '2px solid #4A2E0A',
      boxShadow: 'inset -3px -3px 0 #4A2E0A, inset 3px 3px 0 #B8762E',
      imageRendering: 'pixelated',
      position: 'relative',
    }}
  >
    {/* Horizontal plank line */}
    <div style={{
      position: 'absolute',
      top: '48%',
      left: 0,
      right: 0,
      height: 2,
      background: '#4A2E0A',
    }} />
    {/* Vertical plank line */}
    <div style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '50%',
      width: 2,
      background: '#4A2E0A',
    }} />
    {/* Corner brackets */}
    {[
      { top: 2, left: 2 }, { top: 2, right: 2 },
      { bottom: 2, left: 2 }, { bottom: 2, right: 2 },
    ].map((pos, i) => (
      <div key={i} style={{
        position: 'absolute',
        width: 6,
        height: 6,
        background: '#C8922E',
        border: '1px solid #4A2E0A',
        ...pos,
      }} />
    ))}
  </div>
);

const LinkTag: React.FC<{ label: string }> = ({ label }) => (
  <div
    style={{
      fontFamily: '"Georgia", "Times New Roman", serif',
      fontSize: '0.72rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.9)',
      background: 'rgba(10,6,2,0.75)',
      border: '1px solid rgba(234,40,4,0.6)',
      borderRadius: 2,
      padding: '5px 12px',
      backdropFilter: 'blur(6px)',
      whiteSpace: 'nowrap',
      boxShadow: '0 2px 12px rgba(234,40,4,0.3)',
      cursor: 'pointer',
    }}
  >
    {label}
  </div>
);

export default FarewellChest;
