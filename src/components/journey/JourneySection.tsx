'use client';
import React, { useMemo } from 'react';
import { useViewportScale } from '@/hooks/useViewportScale';
import ParallaxBackground from './ParallaxBackground';
import { startOf, type SectionId } from './layout';

interface JourneySectionProps {
  id: SectionId;
  backgroundNumber: number;
  width: number;
  scrollX: number;
  behindMountains?: boolean;
  children?: React.ReactNode;
}

/**
 * THE SKY IS COMPUTED NOW; THE TERRAIN IS STILL DRAWN. One <anthemion-khysis>
 * watercolour field (mounted once in HorizontalJourney, fixed at z -1) is the
 * sky for the whole journey, and each section's ParallaxBackground draws only
 * its terrain and clouds over it — the sky.png layers are filtered out inside
 * ParallaxBackground, and this section carries no opaque background, because
 * either one would sit exactly on top of the fixed field and hide it.
 *
 * Why the split: the razor seams at section boundaries were mostly SKY —
 * full-height gradient walls (teal day / violet dusk / starlit night) meeting
 * along a 1px line. Terrain silhouettes meeting is ordinary landscape;
 * atmospheres meeting is a rendering error. One continuous wash under
 * everything removes the worst of the cut while the mountains, pines and
 * clouds keep the world a world. AtmosphereOverlay still grades day to night
 * over the lot.
 */
const JourneySection: React.FC<JourneySectionProps> = ({
  id,
  backgroundNumber,
  width,
  scrollX,
  behindMountains = false,
  children,
}) => {
  const { windowSize: { width: windowWidth } } = useViewportScale();

  const sectionStartX = useMemo(
    () => windowWidth * startOf(id, windowWidth < 768),
    [id, windowWidth]
  );

  return (
    <div
      id={id}
      className="relative flex-shrink-0 h-full overflow-hidden"
      style={{ width: `${width}px` }}
    >
      <ParallaxBackground
        backgroundNumber={backgroundNumber}
        sectionStartX={sectionStartX}
        sectionWidth={width}
        scrollX={scrollX}
        foregroundOnly={behindMountains ? false : undefined}
      />

      <div className="relative z-10 h-full w-full">
        {children}
      </div>

      {behindMountains && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <ParallaxBackground
            backgroundNumber={backgroundNumber}
            sectionStartX={sectionStartX}
            sectionWidth={width}
            scrollX={scrollX}
            foregroundOnly={true}
          />
        </div>
      )}
    </div>
  );
};

export default JourneySection;
