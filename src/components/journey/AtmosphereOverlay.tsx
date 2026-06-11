'use client';
/**
 * AtmosphereOverlay — time-of-day grading for the journey.
 *
 * The trip becomes a day: clear morning at the hero, golden hour through the
 * process section, full night at the farewell ("goodnight" finally earns its
 * name). Three blend-mode layers + a vignette, all opacity-driven from
 * progress — no JS animation, no repaint cost beyond compositing.
 *
 * Sits ABOVE the character (z-55) so the samurai, signposts and book are
 * graded with the world, and BELOW the music button / experience switch.
 */
import React from 'react';

const ramp = (v: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (v - a) / (b - a)));

interface AtmosphereOverlayProps {
  progress: number; // 0..1
}

const AtmosphereOverlay: React.FC<AtmosphereOverlayProps> = ({ progress }) => {
  // golden hour rises mid-journey, hands over to night near the end
  const dusk  = ramp(progress, 0.42, 0.6) * (1 - ramp(progress, 0.74, 0.88));
  const night = ramp(progress, 0.74, 0.93);

  const layer: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 55,
    willChange: 'opacity',
  };

  return (
    <>
      {/* golden-hour warmth — multiply pulls the whole frame amber */}
      <div
        aria-hidden
        style={{
          ...layer,
          opacity: dusk * 0.85,
          mixBlendMode: 'multiply',
          background:
            'linear-gradient(180deg, rgba(255,196,130,0.10) 0%, rgba(255,158,82,0.22) 55%, rgba(244,110,52,0.34) 100%)',
        }}
      />
      {/* low sun glow on the horizon */}
      <div
        aria-hidden
        style={{
          ...layer,
          opacity: dusk * 0.7,
          mixBlendMode: 'screen',
          background:
            'radial-gradient(120% 55% at 50% 96%, rgba(255,140,60,0.30) 0%, rgba(255,140,60,0.0) 60%)',
        }}
      />
      {/* night — deep indigo multiply */}
      <div
        aria-hidden
        style={{
          ...layer,
          opacity: night,
          mixBlendMode: 'multiply',
          background:
            'linear-gradient(180deg, rgba(16,20,52,0.62) 0%, rgba(20,22,52,0.40) 55%, rgba(8,10,30,0.62) 100%)',
        }}
      />
      {/* vignette — quiet by day, heavy by night */}
      <div
        aria-hidden
        style={{
          ...layer,
          opacity: 0.18 + night * 0.5,
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 52%, rgba(2,4,14,0.42) 100%)',
        }}
      />
    </>
  );
};

export default React.memo(AtmosphereOverlay);
