'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Twitter, FileText, type LucideIcon } from 'lucide-react';

interface FarewellChestProps {
  scrollX: number;
  chestWorldX: number;
  burst: boolean;
  atChest: boolean;
  onAttackClick: () => void;
}

const links = [
  { label: 'GitHub',   href: 'https://github.com/blacurrant',                 offset: { x: -520, y: -260 }, icon: Github,   landRotate: -1, landX: -520 },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nishant-choudhary-dev', offset: { x:  420, y: -280 }, icon: Linkedin,  landRotate:   1, landX:  420 },
  { label: 'Twitter',  href: 'https://twitter.com/nishantcy',                offset: { x: -250, y: -420 }, icon: Twitter,   landRotate:  1, landX: -250 },
  { label: 'Résumé',   href: '/Nishant_fullstack_cv.pdf',                     offset: { x:  200, y: -440 }, icon: FileText,  landRotate:  -1, landX:  200 },
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

  const [windowWidth, setWindowWidth] = useState(1920);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visible = screenX > -80 && screenX < windowWidth + 80;
  if (!visible && phase === 'idle') return null;

  return (
    <>
      {/* Crate — clickable when atChest */}
      <AnimatePresence>
        {phase !== 'burst' && (
          <motion.div
            className="fixed z-[45]"
            style={{
              left: screenX - 24,
              bottom: 34,
              cursor: atChest ? 'pointer' : 'default',
              pointerEvents: atChest ? 'auto' : 'none',
            }}
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
            onClick={atChest ? onAttackClick : undefined}
          >
            <Crate atChest={atChest} />

            {/* Hint label — floats above crate, not a button */}
            <AnimatePresence>
              {atChest && (
                <motion.div
                  style={{
                    position: 'absolute',
                    bottom: '110%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    pointerEvents: 'none',
                    whiteSpace: 'nowrap',
                  }}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: [0, -4, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, y: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' } }}
                >
                  <span style={{
                    fontFamily: '"Georgia", "Times New Roman", serif',
                    fontSize: '0.58rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.65)',
                    textShadow: '0 0 10px rgba(234,40,4,0.7)',
                  }}>
                    click
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
                style={{ left: screenX, bottom: 64 }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: (i % 2 === 0 ? -20 : 20) }}
                animate={{
                  x: [0, link.offset.x, link.landX],
                  y: [0, link.offset.y, 28],
                  scale: [0.3, 1, 1.25],
                  rotate: [i % 2 === 0 ? -20 : 20, 0, link.landRotate],
                  opacity: [0, 1, 1],
                }}
                transition={{
                  duration: 1.6,
                  times: [0, 0.38, 1],
                  ease: ['easeOut', [0.4, 0, 1, 0.6]],
                  delay: 0.06 + i * 0.07,
                }}
                whileHover={{ scale: 1.35, rotate: 0, transition: { duration: 0.18 } }}
              >
                <LinkTag label={link.label} Icon={link.icon} />
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

const LinkTag: React.FC<{ label: string; Icon: LucideIcon }> = ({ label, Icon }) => (
  <div style={{
    fontFamily: '"Georgia", "Times New Roman", serif',
    fontSize: '0.82rem',
    fontStyle: 'italic',
    letterSpacing: '0.02em',
    color: '#1e0e04',
    background: 'linear-gradient(160deg, #f5e4a8 0%, #e8c96e 45%, #f2dfa0 100%)',
    border: '2px solid #6b3a10',
    borderRadius: '2px 5px 3px 4px',
    padding: '6px 14px 7px 10px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -2px 0 rgba(0,0,0,0.18), 0 2px 12px -4px rgba(0,0,0,0.65)',
  }}>
    {/* parchment grain */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.07,
      background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,#3a1a00 4px)',
    }} />
    {/* aged edge vignette */}
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse at center, transparent 55%, rgba(90,40,5,0.25) 100%)',
    }} />
    <Icon size={13} strokeWidth={2.2} />
    <span style={{ position: 'relative' }}>{label}</span>
  </div>
);

export default FarewellChest;
