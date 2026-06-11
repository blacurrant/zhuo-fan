'use client';
import React, { useMemo } from 'react';
import { useViewportScale } from '@/hooks/useViewportScale';
import ParallaxBackground from './ParallaxBackground';

interface JourneySectionProps {
  id: string;
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

  const sectionStartX = useMemo(() => {
    // Process is 2vw wide on mobile vs 1vw desktop, so everything after it
    // shifts right by one viewport. Sections up to and including process are
    // unaffected (they sit before the wide bit).
    const isMobile = windowWidth < 768;
    switch (id) {
      case 'hero': return 0;
      case 'projects': return windowWidth * 1.5;
      case 'process': return windowWidth * 3.7;
      case 'contact': return windowWidth * (isMobile ? 5.7 : 4.7);
      default: return 0;
    }
  }, [id, windowWidth]);

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
