'use client';
import React, { useMemo } from 'react';
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
  const sectionStartX = useMemo(() => {
    switch (id) {
      case 'hero': return 0;
      case 'projects': return window.innerWidth;
      case 'process': return window.innerWidth * 3.2;
      case 'contact': return window.innerWidth * 4.2;
      default: return 0;
    }
  }, [id]);

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
