'use client';
import { useState, useEffect } from 'react';

interface ViewportInfo {
  windowSize: { width: number; height: number };
  viewportScale: number;
}

export function useViewportScale(): ViewportInfo {
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const update = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const viewportScale = Math.max(0.4, Math.min(1.0, windowSize.width / 1920));

  return { windowSize, viewportScale };
}
