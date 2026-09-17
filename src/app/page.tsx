'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const PF = '"Playfair Display", "Georgia", "Times New Roman", serif';
const GEO = '"Georgia", "Times New Roman", serif';
const MONO = '"JetBrains Mono", monospace';
const PREF_KEY = 'nc_experience_pref';

type Side = 'journey' | 'editorial';

const ctaStyle = (dark: boolean, active: boolean): React.CSSProperties => ({
  fontFamily: GEO,
  fontStyle: 'italic',
  fontSize: '0.78rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  padding: '0.6rem 1.6rem',
  border: `1px solid ${active ? 'rgba(234,40,4,0.88)' : dark ? 'rgba(252,252,252,0.28)' : 'rgba(20,12,5,0.22)'}`,
  background: active ? 'rgba(234,40,4,0.88)' : 'transparent',
  color: active ? 'rgba(255,255,255,0.95)' : dark ? 'rgba(252,252,252,0.85)' : 'rgba(20,12,5,0.8)',
  transition: 'background 0.3s, border-color 0.3s, color 0.3s',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.6rem',
});

export default function EntryPage() {
  const router = useRouter();
  const [active, setActive] = useState<Side | null>(null);
  const [exiting, setExiting] = useState<Side | null>(null);
  const [lastVisited, setLastVisited] = useState<Side | null>(null);

  useEffect(() => {
    const pref = localStorage.getItem(PREF_KEY);
    if (pref === 'journey' || pref === 'editorial') setLastVisited(pref);
  }, []);

  const choose = (side: Side) => {
    localStorage.setItem(PREF_KEY, side);
    setExiting(side);
    setTimeout(() => router.push(side === 'journey' ? '/journey' : '/landing'), 550);
  };

  // Desktop: flex-row, animate widths. Mobile: flex-col, animate heights.
  const journeyFlex = active === 'journey' ? 62 : active === 'editorial' ? 38 : 50;
  const editorialFlex = 100 - journeyFlex;

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="entry"
          className="fixed inset-0 flex flex-col overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{ background: '#f9f7f3' }}
        >
          <style>{`
            .entry-panel:focus { outline: none; }
            .entry-panel:focus-visible { outline: 2px solid rgba(234,40,4,0.9); outline-offset: -8px; }
          `}</style>

          <svg style={{ position: 'absolute', width: 0, height: 0, zIndex: -1 }}>
            <defs>
              <filter id="ink-rough-entry">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="7" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
          </svg>

          {/* ── HEADER BAND — names the page, states the choice ── */}
          <header
            className="relative z-30 flex flex-col items-center text-center gap-2 px-6 py-6 md:py-8"
            style={{ flexShrink: 0, borderBottom: '1px solid rgba(20,12,5,0.1)' }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.7 }}
              style={{ fontFamily: GEO, fontSize: '0.55rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(20,12,5,0.45)', filter: 'url(#ink-rough-entry)' }}
            >
              Vol. I &nbsp;·&nbsp; Portfolio 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: PF, fontSize: 'clamp(1.15rem, 2.1vw, 1.7rem)', fontWeight: 400, color: 'rgba(12,7,2,0.9)', lineHeight: 1.15, letterSpacing: '-0.01em', filter: 'url(#ink-rough-entry)' }}
            >
              Nishant Choudhary &mdash; Design Engineer
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: 'clamp(0.72rem, 1vw, 0.84rem)', letterSpacing: '0.05em', color: 'rgba(20,12,5,0.5)' }}
            >
              Two ways in. Take your pick.
            </motion.p>
          </header>

          {/* ── THE SPLIT ── */}
          <div className="relative flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">

            {/* JOURNEY — dark half */}
            <motion.a
              href="/journey"
              aria-label="The Journey — scroll sideways through an immersive world"
              className="entry-panel relative flex flex-col items-center justify-center overflow-hidden text-center"
              style={{ background: 'rgba(12,7,2,0.96)', flexShrink: 0, border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'none' }}
              animate={{ flexBasis: `${journeyFlex}%` }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActive('journey')}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive('journey')}
              onBlur={() => setActive(null)}
              onClick={(e) => { e.preventDefault(); choose('journey'); }}
            >
              {/* OG image faded background — cropped to the landscape, below the wordmark and browser chrome */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'url("/og-image.png")', backgroundSize: 'auto 200%', backgroundPosition: 'center bottom', opacity: 0.08 }}
              />

              {/* Pixel mountain silhouette */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 pointer-events-none select-none hidden md:block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: active === 'journey' ? 0.18 : 0.08, y: 0 }}
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
                  transition={{ delay: 0.4, duration: 0.7 }}
                  style={{ fontFamily: GEO, fontSize: '0.55rem', letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(252,252,252,0.35)', filter: 'url(#ink-rough-entry)' }}
                >
                  Experience I
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: PF, fontSize: 'clamp(2.4rem, 4.2vw, 4.2rem)', fontWeight: 100, color: 'rgba(252,252,252,0.9)', lineHeight: 0.9, letterSpacing: '-0.02em', filter: 'url(#ink-rough-entry)' }}
                >
                  The<br />Journey
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65, duration: 0.7 }}
                  style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)', color: 'rgba(252,252,252,0.45)', letterSpacing: '0.04em', maxWidth: '22ch' }}
                >
                  Scroll sideways through an immersive world
                </motion.p>

                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={ctaStyle(true, active === 'journey')}
                >
                  Enter
                  <motion.span
                    animate={{ x: active === 'journey' ? [0, 5, 0] : 0 }}
                    transition={{ duration: 1.4, repeat: active === 'journey' ? Infinity : 0, ease: 'easeInOut' }}
                    style={{ display: 'inline-block' }}
                  >
                    →
                  </motion.span>
                </motion.span>

                {lastVisited === 'journey' && (
                  <span style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.62rem', letterSpacing: '0.06em', color: 'rgba(252,252,252,0.38)' }}>
                    ✦ where you left off
                  </span>
                )}
              </div>
            </motion.a>

            {/* CENTER DIVIDER — zero-size flex item so the seal tracks the seam as the halves resize */}
            <div className="relative z-20 flex-shrink-0 w-full h-0 md:w-0 md:h-full pointer-events-none">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row md:flex-col items-center gap-2">
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
            </div>

            {/* EDITORIAL — cream half */}
            <motion.a
              href="/landing"
              aria-label="The Editorial — read the portfolio at your own pace"
              className="entry-panel relative flex flex-col items-center justify-center overflow-hidden text-center"
              style={{ background: '#f9f7f3', flexShrink: 0, border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'none' }}
              animate={{ flexBasis: `${editorialFlex}%` }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActive('editorial')}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive('editorial')}
              onBlur={() => setActive(null)}
              onClick={(e) => { e.preventDefault(); choose('editorial'); }}
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
                  transition={{ delay: 0.45, duration: 0.7 }}
                  style={{ fontFamily: GEO, fontSize: '0.55rem', letterSpacing: '0.36em', textTransform: 'uppercase', color: 'rgba(20,12,5,0.35)', filter: 'url(#ink-rough-entry)' }}
                >
                  Experience II
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: PF, fontSize: 'clamp(2.4rem, 4.2vw, 4.2rem)', fontWeight: 100, color: 'rgba(12,7,2,0.88)', lineHeight: 0.9, letterSpacing: '-0.02em', filter: 'url(#ink-rough-entry)' }}
                >
                  The<br />Editorial
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.7 }}
                  style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: 'clamp(0.78rem, 1.1vw, 0.9rem)', color: 'rgba(20,12,5,0.45)', letterSpacing: '0.04em', maxWidth: '22ch' }}
                >
                  Read the portfolio at your own pace
                </motion.p>

                <motion.span
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={ctaStyle(false, active === 'editorial')}
                >
                  Enter
                  <motion.span
                    animate={{ x: active === 'editorial' ? [0, 5, 0] : 0 }}
                    transition={{ duration: 1.4, repeat: active === 'editorial' ? Infinity : 0, ease: 'easeInOut' }}
                    style={{ display: 'inline-block' }}
                  >
                    →
                  </motion.span>
                </motion.span>

                {lastVisited === 'editorial' && (
                  <span style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.62rem', letterSpacing: '0.06em', color: 'rgba(20,12,5,0.38)' }}>
                    ✦ where you left off
                  </span>
                )}
              </div>
            </motion.a>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
