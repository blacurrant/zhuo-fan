'use client';
import React from 'react';
import { useViewportScale } from '@/hooks/useViewportScale';

interface SectionGateProps {
  worldX: number; // px — the section boundary this gate stands on
  scrollX: number;
}

/**
 * A torii at every section boundary.
 *
 * The terrain changes at each boundary because each land uses its own artwork
 * set, and a change with no marker reads as an error. A gate turns the same
 * cut into an ARRIVAL: the samurai walks through the torii and the world on
 * the other side is allowed to be different. The vermilion is the site's own
 * red family, the ink-rough filter is the journey's standing letterpress
 * treatment, and a torii is drawn — not photographed — which keeps it on the
 * right side of "the reference goes in the object, never in the surface".
 *
 * World-positioned like WaypointSignpost, culled the same way. z-35: over the
 * terrain and clouds, UNDER the road and the samurai (z-40), so he crosses in
 * front of the posts with the lintel above his head.
 */
const SectionGate: React.FC<SectionGateProps> = ({ worldX, scrollX }) => {
  const {
    windowSize: { width: windowWidth },
    viewportScale,
  } = useViewportScale();

  const screenX = worldX - scrollX;
  if (screenX < -windowWidth * 0.75 || screenX > windowWidth * 1.75) return null;

  const h = Math.max(170, Math.round(320 * viewportScale));
  const w = Math.round(h * 0.86);
  const beam = Math.max(8, Math.round(h * 0.045));
  const ink = '#241610';
  const vermilion = '#b73a1e';

  return (
    <div
      aria-hidden
      className="fixed z-[35] pointer-events-none"
      style={{
        left: screenX,
        bottom: Math.max(10, Math.round(26 * viewportScale)),
        width: w,
        height: h,
        transform: 'translateX(-50%)',
        filter: 'url(#ink-rough)',
      }}
    >
      {/* kasagi + shimaki — the double top lintel, dark cap over vermilion */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '-7%',
          width: '114%',
          height: beam * 1.15,
          background: ink,
          borderRadius: `${beam}px ${beam}px ${beam / 3}px ${beam / 3}px`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: beam * 1.1,
          left: '-4%',
          width: '108%',
          height: beam,
          background: vermilion,
          borderRadius: beam / 2,
        }}
      />
      {/* nuki — the tie beam the pillars pass through */}
      <div
        style={{
          position: 'absolute',
          top: h * 0.24,
          left: '1%',
          width: '98%',
          height: beam * 0.8,
          background: vermilion,
        }}
      />
      {/* gakuzuka — centre strut between the lintels */}
      <div
        style={{
          position: 'absolute',
          top: beam * 2.1,
          left: '50%',
          width: beam * 0.7,
          height: h * 0.24 - beam * 2.1,
          background: vermilion,
          transform: 'translateX(-50%)',
        }}
      />
      {/* pillars — a hair of inward lean, the way a real torii stands */}
      <div
        style={{
          position: 'absolute',
          top: beam * 1.9,
          left: '8%',
          width: beam,
          height: h - beam * 1.9,
          background: vermilion,
          transform: 'rotate(1.6deg)',
          transformOrigin: 'top center',
          borderRadius: `0 0 ${beam / 3}px ${beam / 3}px`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: beam * 1.9,
          right: '8%',
          width: beam,
          height: h - beam * 1.9,
          background: vermilion,
          transform: 'rotate(-1.6deg)',
          transformOrigin: 'top center',
          borderRadius: `0 0 ${beam / 3}px ${beam / 3}px`,
        }}
      />
    </div>
  );
};

export default React.memo(SectionGate);
