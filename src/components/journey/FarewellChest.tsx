'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useViewportScale } from '@/hooks/useViewportScale';
import { chestBurst } from './sfx';

interface FarewellChestProps {
  scrollX: number;
  chestWorldX: number;
  burst: boolean;
  atChest: boolean;
  onAttackClick: () => void;
  /** The farewell is on screen — the letter is shown, unconditionally. */
  reveal: boolean;
  /** "walk again" — back to the start of the road. */
  onWalkAgain: () => void;
}

const EMAIL = 'nishantchoudhary.dev@gmail.com';

const elsewhere = [
  { label: 'GitHub',   href: 'https://github.com/blacurrant' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nishant-choudhary-dev' },
  { label: 'Twitter',  href: 'https://twitter.com/nishantcy' },
  { label: 'CV',       href: '/Nishant_Choudhary_CV.pdf' },
];

const INK = 'rgba(20,12,5,0.92)';
const INK_SOFT = 'rgba(20,12,5,0.62)';
const HAIRLINE = 'rgba(20,12,5,0.22)';

/**
 * The farewell is a letter, and it has one ask.
 *
 * It used to be four link tags of equal weight, which gave a visitor who had
 * walked the whole road nothing to do but pick one — and the email, the one
 * thing a hiring manager wants, was not among them. Now the wax seal is the
 * way in and the profiles are a colophon under the signature.
 *
 * NOT a reward for finding the crate: it lays itself out as the section
 * arrives, and the crate stays a flourish that can be smashed or ignored.
 * Screen-anchored, so it holds still while the world keeps scrolling. Sits
 * above the z-55 night-multiply layer, or the paper is graded to grey.
 */
const Letter: React.FC<{
  show: boolean; narrow: boolean; compact: boolean; tight: boolean; scale: number; onWalkAgain: () => void;
}> = ({ show, narrow, compact, tight, scale, onWalkAgain }) => {
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard refused (permissions, insecure origin): the address is on the page to select.
    }
  };

  return (
    <div
      className="fixed left-0 right-0 z-[57] flex justify-center"
      data-scroll-through
      style={{
        // Just clear of the samurai's head (~200px per unit of viewport scale)
        // and, on a phone, of the crate's hint. Any higher and a short screen
        // puts the letter over the haiku's last line.
        bottom: narrow ? 128 : Math.round(200 * scale + 30),
        padding: '0 16px',
        // The band is as wide as the screen; only the sheet takes the pointer.
        pointerEvents: 'none',
      }}
      aria-hidden={!show}
    >
      <motion.article
        aria-label="A letter from Nishant"
        initial={false}
        // Unrolls from the top edge; under reduced motion it is simply there.
        animate={{
          opacity: show ? 1 : 0,
          clipPath: show ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
          rotate: -0.6,
        }}
        transition={reduce ? { duration: 0 } : { duration: 1.1, delay: show ? 0.25 : 0, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 440,
          pointerEvents: show ? 'auto' : 'none',
          padding: compact ? '20px 20px 16px' : '28px 32px 22px',
          background: 'linear-gradient(170deg, #f1e3bf 0%, #e6d09c 55%, #eddcb0 100%)',
          border: '1px solid rgba(107,58,16,0.55)',
          borderRadius: '3px 6px 4px 5px',
          color: INK,
          boxShadow: '0 18px 40px -18px rgba(0,0,0,0.8), 0 0 80px rgba(255,150,60,0.14), inset 0 0 40px rgba(120,60,10,0.18)',
        }}
      >
        {/* parchment grain */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.06,
          background: 'repeating-linear-gradient(0deg,transparent,transparent 3px,#3a1a00 4px)',
        }} />

        {/* Dropped on a short phone, where the room it takes is the haiku's. */}
        {!tight && <p style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: '0.6rem',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(20,12,5,0.8)',
          filter: 'url(#ink-rough)',
          margin: 0,
        }}>
          Left by the fire
        </p>}

        <div style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: narrow ? '0.86rem' : 'clamp(0.95rem, 1.2vw, 1.05rem)',
          lineHeight: 1.7,
          margin: tight ? '0 0 8px' : compact ? '12px 0 8px' : '18px 0 12px',
        }}>
          <p style={{ fontStyle: 'italic', margin: 0 }}>You walked the whole road. Thank you for that.</p>
          <p style={{ margin: '8px 0 0' }}>
            I build interfaces that feel like places. If you have one in mind, write to me.
          </p>
        </div>

        <p style={{
          fontFamily: '"Playfair Display", "Georgia", serif',
          fontStyle: 'italic',
          fontSize: '1.15rem',
          textAlign: 'right',
          margin: 0,
          filter: 'url(#ink-rough)',
        }}>
          — Nishant
        </p>

        {/* The one ask: the seal opens a reply. */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          marginTop: compact ? 12 : 18, paddingTop: compact ? 12 : 18,
          borderTop: `1px solid ${HAIRLINE}`,
        }}>
          <motion.a
            href={`mailto:${EMAIL}`}
            aria-label={`Write back — email ${EMAIL}`}
            whileHover={{ scale: 1.08, rotate: -4 }}
            whileTap={{ scale: 0.94 }}
            style={{
              flexShrink: 0,
              width: 54, height: 54, borderRadius: '50%',
              background: 'rgba(234,40,4,0.85)',
              boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.18), 0 3px 8px -2px rgba(80,10,0,0.6)',
              color: '#f7e7d0',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              filter: 'url(#ink-rough)',
              textDecoration: 'none',
            }}
          >
            <span aria-hidden style={{ fontFamily: '"Georgia", serif', fontSize: '0.8rem', letterSpacing: '0.08em', lineHeight: 1 }}>NC</span>
            <span aria-hidden style={{ fontSize: '0.5rem', lineHeight: 1, marginTop: 3 }}>✦</span>
          </motion.a>
          <div style={{ minWidth: 0 }}>
            <a
              href={`mailto:${EMAIL}`}
              style={{
                fontFamily: '"Georgia", "Times New Roman", serif',
                fontStyle: 'italic',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: INK,
                textDecoration: 'none',
                filter: 'url(#ink-rough)',
                display: 'inline-block',
              }}
            >
              Write back
            </a>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap', marginTop: 3 }}>
              <span style={{
                fontFamily: '"Georgia", "Times New Roman", serif',
                fontSize: narrow ? '0.78rem' : '0.85rem',
                color: INK_SOFT,
                userSelect: 'all',
                overflowWrap: 'anywhere',
              }}>
                {EMAIL}
              </span>
              <button
                type="button"
                onClick={copy}
                style={{
                  fontFamily: '"Georgia", "Times New Roman", serif',
                  fontStyle: 'italic',
                  fontSize: '0.72rem',
                  color: copied ? 'rgba(192,31,0,0.95)' : INK_SOFT,
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                  textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: HAIRLINE,
                }}
              >
                <span aria-live="polite">{copied ? 'copied' : 'copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Colophon — the profiles, demoted from four buttons to one line. */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px 16px',
          marginTop: compact ? 12 : 18,
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontStyle: 'italic',
          fontSize: '0.74rem',
          color: INK_SOFT,
        }}>
          <nav aria-label="Elsewhere">
            also found at{' '}
            {elsewhere.map((l, i) => (
              <React.Fragment key={l.label}>
                {i > 0 && <span aria-hidden> · </span>}
                <a
                  href={l.href}
                  target={l.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  style={{ color: INK, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: HAIRLINE }}
                >
                  {l.label}
                </a>
              </React.Fragment>
            ))}
          </nav>
          <button
            type="button"
            onClick={onWalkAgain}
            style={{ fontStyle: 'italic', color: INK_SOFT, background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
          >
            ← walk again
          </button>
        </div>
      </motion.article>
    </div>
  );
};

const FarewellChest: React.FC<FarewellChestProps> = ({ scrollX, chestWorldX, burst, atChest, onAttackClick, reveal, onWalkAgain }) => {
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

  useEffect(() => {
    if (phase === 'burst') chestBurst();
  }, [phase]);

  const { windowSize: { width: windowWidth, height: windowHeight }, viewportScale } = useViewportScale();
  const crateW = Math.round(Math.max(60, 84 * viewportScale));

  const visible = screenX > -80 && screenX < windowWidth + 80;

  return (
    <>
      <Letter show={reveal} narrow={windowWidth < 768} compact={windowWidth < 768 || windowHeight < 800}
        tight={windowWidth < 768 && windowHeight < 760}
        scale={viewportScale} onWalkAgain={onWalkAgain} />
      {!visible && phase === 'idle' ? null : (
      <>
      {/* Crate — clickable when atChest */}
      <AnimatePresence>
        {phase !== 'burst' && (
          <motion.button
            type="button"
            // A flourish, not the way in: the links are already on screen. Kept
            // as a real button so it is not a click-only secret.
            aria-label="Smash the crate"
            className="fixed z-[45]"
            style={{
              left: screenX - crateW / 2,
              bottom: Math.max(16, Math.round(34 * viewportScale)),
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
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
            onClick={onAttackClick}
          >
            <Crate atChest={atChest} width={crateW} />

            {/* Hint label — floats above crate */}
            <AnimatePresence>
              {atChest && (
                <motion.div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    bottom: '115%',
                    left: '50%',
                    x: '-50%',
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
                    fontStyle: 'italic',
                    fontSize: '0.8rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,248,232,0.95)',
                    textShadow: '0 1px 10px rgba(0,0,0,0.9), 0 0 14px rgba(234,40,4,0.6)',
                  }}>
                    smash
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Burst particles */}
      <AnimatePresence>
        {phase === 'burst' && (
          <>
            <motion.div
              className="fixed z-[46] pointer-events-none rounded-full"
              style={{ left: screenX - 40, bottom: Math.round(24 * viewportScale), width: 80, height: 80,
                background: 'radial-gradient(circle, rgba(234,40,4,0.9) 0%, transparent 70%)' }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`shard-${i}`}
                className="fixed z-[46] pointer-events-none"
                style={{ left: screenX - 4, bottom: Math.round(44 * viewportScale),
                  width: i % 3 === 0 ? 8 : 5, height: i % 3 === 0 ? 14 : 9,
                  background: i % 2 === 0 ? '#8B6914' : '#5C3D0A', borderRadius: 1 }}
                initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x: (i % 2 === 0 ? -1 : 1) * Math.round((30 + i * 22) * viewportScale),
                  y: -Math.round((50 + i * 30) * viewportScale),
                  rotate: (i % 2 === 0 ? -1 : 1) * (120 + i * 35),
                }}
                transition={{ duration: 0.55, delay: i * 0.025, ease: [0.2, 0.8, 0.4, 1] }}
              />
            ))}

          </>
        )}
      </AnimatePresence>
      </>
      )}
    </>
  );
};

const Crate: React.FC<{ atChest: boolean; width: number }> = ({ atChest, width }) => (
  <div style={{
    width, height: Math.round(width * 0.92),
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

export default FarewellChest;
