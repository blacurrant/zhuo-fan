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
      className="relative flex-shrink-0 h-full bg-replicate-canvas overflow-hidden"
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
