'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const PF = '"Playfair Display", "Georgia", "Times New Roman", serif';
const GEO = '"Georgia", "Times New Roman", serif';
const MONO = '"JetBrains Mono", monospace';
const PREF_KEY = 'nc_experience_pref';

export default function EntryPage() {
  const router = useRouter();
  const [hovered, setHovered] = useState<'journey' | 'editorial' | null>(null);
  const [exiting, setExiting] = useState<'journey' | 'editorial' | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const pref = localStorage.getItem(PREF_KEY);
    if (pref === 'journey' || pref === 'editorial') {
      router.replace(pref === 'journey' ? '/journey' : '/landing');
    } else {
      setReady(true);
    }
  }, [router]);

  const choose = (side: 'journey' | 'editorial') => {
    localStorage.setItem(PREF_KEY, side);
    setExiting(side);
    setTimeout(() => router.push(side === 'journey' ? '/journey' : '/landing'), 550);
  };

  if (!ready) return null;

  // Desktop: flex-row, animate widths. Mobile: flex-col, animate heights.
  const journeyFlex  = hovered === 'journey' ? 62 : hovered === 'editorial' ? 38 : 50;
  const editorialFlex = 100 - journeyFlex;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="entry"
          className="fixed inset-0 flex flex-col md:flex-row overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg style={{ position: 'absolute', width: 0, height: 0, zIndex: -1 }}>
            <defs>
              <filter id="ink-rough-entry">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="7" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* JOURNEY — dark half */}
          <motion.div
            className="relative flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            style={{ background: 'rgba(12,7,2,0.96)', flexShrink: 0 }}
            animate={{ flexBasis: `${journeyFlex}%` }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered('journey')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => choose('journey')}
          >
            {/* OG image faded background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'url("/og-image.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }}
            />

            {/* Pixel mountain silhouette */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 pointer-events-none select-none hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: hovered === 'journey' ? 0.18 : 0.08, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ fontFamily: MONO, fontSize: 'clamp(0.35rem, 0.7vw, 0.55rem)', lineHeight: 1.15, letterSpacing: '0.02em', color: 'rgba(252,252,252,1)', textAlign: 'center', padding: '0 1rem 2rem', whiteSpace: 'pre' }}
            >
              {`          /\\
         /  \\   /\\
        /    \\ /  \\  /\\
_______/      X    \\/  \\______`}
            </motion.div>

            <div className="relative z-10 flex flex-col items-center text-center px-8 gap-4 md:gap-5">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{ fontFamily: GEO, fontSize: '0.55rem', letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(252,252,252,0.35)', filter: 'url(#ink-rough-entry)' }}
              >
                Experience I
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: PF, fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)', fontWeight: 100, color: 'rgba(252,252,252,0.9)', lineHeight: 0.9, letterSpacing: '-0.02em', filter: 'url(#ink-rough-entry)' }}
              >
                The<br />Journey
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.7 }}
                style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)', color: 'rgba(252,252,252,0.45)', letterSpacing: '0.04em', maxWidth: '22ch' }}
              >
                Scroll sideways through an immersive world
              </motion.p>

              <motion.div
                animate={{ x: hovered === 'journey' ? [0, 6, 0] : 0 }}
                transition={{ duration: 1.4, repeat: hovered === 'journey' ? Infinity : 0, ease: 'easeInOut' }}
                style={{ fontFamily: GEO, fontSize: '0.7rem', color: 'rgba(234,40,4,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.25rem' }}
              >
                enter →
              </motion.div>
            </div>
          </motion.div>

          {/* CENTER DIVIDER — flex-row on mobile, flex-col on desktop */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-row md:flex-col items-center gap-2 pointer-events-none">
            {/* Mobile: horizontal fade-in lines */}
            <div className="md:hidden" style={{ height: '1px', width: '56px', background: 'linear-gradient(to right, transparent, rgba(180,160,130,0.4))' }} />
            {/* Desktop: vertical lines */}
            <div className="hidden md:block" style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, rgba(180,160,130,0.3))' }} />

            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center flex-shrink-0"
              style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(234,40,4,0.88)', filter: 'url(#ink-rough-entry)', boxShadow: '0 2px 16px rgba(234,40,4,0.25)' }}
            >
              <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem', lineHeight: 1 }}>✦</span>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.36rem', letterSpacing: '0.14em', marginTop: '2px', fontFamily: GEO, fontWeight: 700 }}>NC</span>
            </motion.div>

            <div className="md:hidden" style={{ height: '1px', width: '56px', background: 'linear-gradient(to left, transparent, rgba(180,160,130,0.4))' }} />
            <div className="hidden md:block" style={{ width: '1px', height: '80px', background: 'linear-gradient(to top, transparent, rgba(180,160,130,0.3))' }} />
          </div>

          {/* EDITORIAL — cream half */}
          <motion.div
            className="relative flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            style={{ background: '#f9f7f3', flexShrink: 0 }}
            animate={{ flexBasis: `${editorialFlex}%` }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHovered('editorial')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => choose('editorial')}
          >
            {/* Faint ruled lines */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 27px, rgba(20,12,5,0.05) 28px)', backgroundSize: '100% 28px' }}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-8 gap-4 md:gap-5">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                style={{ fontFamily: GEO, fontSize: '0.55rem', letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(20,12,5,0.35)', filter: 'url(#ink-rough-entry)' }}
              >
                Experience II
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontFamily: PF, fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)', fontWeight: 100, color: 'rgba(12,7,2,0.88)', lineHeight: 0.9, letterSpacing: '-0.02em', filter: 'url(#ink-rough-entry)' }}
              >
                The<br />Editorial
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.7 }}
                style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)', color: 'rgba(20,12,5,0.45)', letterSpacing: '0.04em', maxWidth: '22ch' }}
              >
                Read the portfolio at your own pace
              </motion.p>

              <motion.div
                animate={{ x: hovered === 'editorial' ? [0, 6, 0] : 0 }}
                transition={{ duration: 1.4, repeat: hovered === 'editorial' ? Infinity : 0, ease: 'easeInOut' }}
                style={{ fontFamily: GEO, fontSize: '0.7rem', color: 'rgba(234,40,4,0.65)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.25rem' }}
              >
                enter →
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="absolute bottom-6 right-6 pointer-events-none hidden md:block"
              style={{ fontFamily: GEO, fontSize: '0.55rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(20,12,5,0.2)', filter: 'url(#ink-rough-entry)' }}
            >
              Vol. I · 2026
            </motion.div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
