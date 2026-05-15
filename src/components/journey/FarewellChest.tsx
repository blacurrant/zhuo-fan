'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FarewellChestProps {
  scrollX: number;
  chestWorldX: number;
  burst: boolean;
  atChest: boolean;
  onAttackClick: () => void;
}

const links = [
  { label: 'GitHub',   href: 'https://github.com/blacurrant',                 offset: { x: -220, y: -190 } },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nishant-choudhary-dev', offset: { x:  140, y: -210 } },
  { label: 'Twitter',  href: 'https://twitter.com/blacurrant',                offset: { x: -175, y: -330 } },
  { label: 'Résumé',   href: '/Nishant_fullstack_cv.pdf',                     offset: { x:  115, y: -350 } },
];

const FarewellChest: React.FC<FarewellChestProps> = ({ scrollX, chestWorldX, burst, atChest, onAttackClick }) => {
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'burst'>('idle');
  const [frozenX, setFrozenX] = useState(0);
  const liveScreenX = chestWorldX - scrollX;
  const screenX = phase === 'idle' ? liveScreenX : frozenX;

  useEffect(() => {
    if (!burst) {
      setPhase('idle');
      setFrozenX(0);
      return;
    }
    if (phase !== 'idle') return;
    setFrozenX(liveScreenX);
    setPhase('shaking');
    const t = setTimeout(() => setPhase('burst'), 500);
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
            animate={
              phase === 'shaking'
                ? {
                    x: [0, 38, -12, 22, -6, 8, -5, 5, -3, 3, -1, 1, 0],
                    rotate: [0, 14, -18, 10, -12, 4, -4, 4, -2, 2, 0],
                    y: [0, -4, 2, -2, 1, 0],
                  }
                : { x: 0, y: 0, rotate: 0 }
            }
            transition={phase === 'shaking' ? { duration: 0.5, ease: 'easeInOut' } : { duration: 0.2 }}
            exit={{ scale: 2.8, opacity: 0, transition: { duration: 0.18 } }}
          >
            <Crate atChest={atChest} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click prompt — appears when samurai is at chest */}
      <AnimatePresence>
        {atChest && phase === 'idle' && (
          <motion.button
            className="fixed z-[48]"
            style={{
              left: screenX - 40,
              bottom: 100,
              width: 80,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: [0, -5, 0] }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, y: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' } }}
            onClick={onAttackClick}
          >
            <div style={{
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontSize: '0.6rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.75)',
              textAlign: 'center',
              textShadow: '0 0 12px rgba(234,40,4,0.8)',
              whiteSpace: 'nowrap',
            }}>
              [ attack ]
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Burst particles */}
      <AnimatePresence>
        {phase === 'burst' && (
          <>
            <motion.div
              className="fixed z-[46] pointer-events-none rounded-full"
              style={{ left: screenX - 40, bottom: 24, width: 80, height: 80,
                background: 'radial-gradient(circle, rgba(234,40,4,0.9) 0%, transparent 70%)' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`shard-${i}`}
                className="fixed z-[46] pointer-events-none"
                style={{ left: screenX - 4, bottom: 44,
                  width: i % 3 === 0 ? 8 : 5, height: i % 3 === 0 ? 14 : 9,
                  background: i % 2 === 0 ? '#8B6914' : '#5C3D0A', borderRadius: 1 }}
                initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x: (i % 2 === 0 ? -1 : 1) * (30 + i * 22),
                  y: -(50 + i * 30),
                  rotate: (i % 2 === 0 ? -1 : 1) * (120 + i * 35),
                }}
                transition={{ duration: 0.55, delay: i * 0.025, ease: [0.2, 0.8, 0.4, 1] }}
              />
            ))}

            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="fixed z-[47]"
                style={{ left: screenX, bottom: 54 }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: (i % 2 === 0 ? -15 : 15) }}
                animate={{ x: link.offset.x, y: link.offset.y, opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.06 + i * 0.07 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.15 } }}
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

const Crate: React.FC<{ atChest: boolean }> = ({ atChest }) => (
  <div style={{
    width: 48, height: 44,
    background: '#7B4F1E',
    border: '2px solid #4A2E0A',
    boxShadow: `inset -3px -3px 0 #4A2E0A, inset 3px 3px 0 #B8762E, 0 0 ${atChest ? 18 : 0}px rgba(234,40,4,${atChest ? 0.6 : 0})`,
    imageRendering: 'pixelated',
    position: 'relative',
    transition: 'box-shadow 0.4s ease',
  }}>
    <div style={{ position: 'absolute', top: '48%', left: 0, right: 0, height: 2, background: '#4A2E0A' }} />
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, background: '#4A2E0A' }} />
    {[{ top: 2, left: 2 }, { top: 2, right: 2 }, { bottom: 2, left: 2 }, { bottom: 2, right: 2 }].map((pos, i) => (
      <div key={i} style={{ position: 'absolute', width: 6, height: 6, background: '#C8922E', border: '1px solid #4A2E0A', ...pos }} />
    ))}
  </div>
);

const LinkTag: React.FC<{ label: string }> = ({ label }) => (
  <div style={{
    fontFamily: '"Georgia", "Times New Roman", serif',
    fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.9)', background: 'rgba(10,6,2,0.82)',
    border: '1px solid rgba(234,40,4,0.6)', borderRadius: 2, padding: '5px 12px',
    backdropFilter: 'blur(6px)', whiteSpace: 'nowrap',
    boxShadow: '0 2px 16px rgba(234,40,4,0.35)', cursor: 'pointer',
  }}>
    {label}
  </div>
);

export default FarewellChest;
