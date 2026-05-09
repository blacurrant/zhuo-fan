'use client';
import React, { useMemo } from 'react';
import ParallaxBackground from './ParallaxBackground';

interface JourneySectionProps {
  id: string;
  backgroundNumber: number;
  width: number;
  scrollX: number;
  children?: React.ReactNode;
}

const JourneySection: React.FC<JourneySectionProps> = ({
  id,
  backgroundNumber,
  width,
  scrollX,
  children,
}) => {
  // Calculate section start position for parallax offset
  // Hero: 0, Projects: vw, Process: vw + 3.5*vw = 4.5*vw, Contact: 5.5*vw
  const sectionStartX = useMemo(() => {
    switch (backgroundNumber) {
      case 1: return 0;
      case 2: return window.innerWidth;
      case 3: return window.innerWidth * 4.5;
      case 4: return window.innerWidth * 5.5;
      default: return 0;
    }
  }, [backgroundNumber]);

  return (
    <div
      className="relative flex-shrink-0 h-full bg-replicate-canvas overflow-hidden"
      style={{
        width: `${width}px`,
      }}
    >
      {/* Parallax background layers */}
      <ParallaxBackground
        backgroundNumber={backgroundNumber}
        sectionStartX={sectionStartX}
        scrollX={scrollX}
      />

      {/* Content overlay */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default JourneySection;
