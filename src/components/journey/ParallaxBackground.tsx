'use client';
import React, { useMemo, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

interface ParallaxBackgroundProps {
  backgroundNumber: number;
  sectionStartX: number;
  sectionWidth: number;
  scrollX: number;
  /**
   * undefined → render ALL layers (normal sections)
   * false     → render only background layers: sky/clouds/birds/pines
   * true      → render only foreground layers: rocks/ground/plant
   */
  foregroundOnly?: boolean;
}

const FOREGROUND_KEYWORDS = ['rock', 'ground', 'plant'];

const getDepthForLayer = (layerName: string, position: number, totalLayers: number): number => {
  if (layerName.includes('sky')) return 0.05;
  if (layerName.includes('cloud')) return 0.15 + position * 0.1;
  if (layerName.includes('bird')) return 0.4;
  if (layerName.includes('pine')) return 0.55;
  if (layerName.includes('plant')) return 0.6;
  if (layerName.includes('ground')) return 0.7 + position * 0.08;
  if (layerName.includes('rock')) return 0.75 + position * 0.1;
  return 0.3 + (position / totalLayers) * 0.5;
};

const isForeground = (name: string) =>
  FOREGROUND_KEYWORDS.some((kw) => name.includes(kw));

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  backgroundNumber,
  sectionStartX,
  sectionWidth,
  scrollX,
  foregroundOnly,
}) => {
  const yRefsMap = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const xRefsMap = useRef<{ [key: string]: HTMLDivElement | null }>({});
  // Section 1 starts already "entered"
  const animationFiredRef = useRef(false);

  const [windowSize, setWindowSize] = React.useState({ width: 1920, height: 1080 });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const allLayers = useMemo(() => {
    const layerMap: { [key: number]: string[] } = {
      1: ['sky', 'clouds_1', 'clouds_2', 'clouds_3', 'clouds_4', 'rocks_1', 'rocks_2'],
      2: ['sky', 'clouds_1', 'clouds_2', 'clouds_3', 'birds', 'pines', 'rocks_1', 'rocks_2', 'rocks_3'],
      3: ['sky', 'clouds_1', 'clouds_2', 'ground_1', 'ground_2', 'ground_3', 'plant', 'rocks'],
      4: ['sky', 'clouds_1', 'clouds_2', 'ground', 'rocks'],
    };
    return layerMap[backgroundNumber] || [];
  }, [backgroundNumber]);

  const layers = useMemo(() => {
    return allLayers.filter((l) => {
      if (foregroundOnly === undefined) return true;          // all layers
      if (foregroundOnly === true) return isForeground(l);   // rocks/ground only
      return !isForeground(l);                               // sky/clouds/pines only
    });
  }, [allLayers, foregroundOnly]);

  // Hook A: Set initial state once on mount
  useLayoutEffect(() => {
    layers.forEach((layer) => {
      const elY = yRefsMap.current[`${backgroundNumber}-${layer}`];
      if (!elY) return;
      
      // Sky is always visible everywhere
      if (layer.includes('sky')) {
        gsap.set(elY, { opacity: 1, y: 0 });
        return;
      }

      let initialY = 0;
      // Section 1 layers start off-screen so Hook C can animate them in on load
      if (backgroundNumber === 1) {
        initialY = isForeground(layer) ? windowSize.height : -windowSize.height;
      }
      gsap.set(elY, { opacity: 1, y: initialY });
    });
  }, [backgroundNumber, layers, windowSize.height]);

  // Hook B: Update parallax x/y on every scroll tick
  useLayoutEffect(() => {
    layers.forEach((layer, idx) => {
      const elX = xRefsMap.current[`${backgroundNumber}-${layer}`];
      if (!elX) return;

      let distFromVisible = 0;
      const sectionEndScroll = sectionStartX + sectionWidth - windowSize.width;

      if (scrollX < sectionStartX) {
        distFromVisible = sectionStartX - scrollX;
      } else if (scrollX > sectionEndScroll) {
        distFromVisible = scrollX - sectionEndScroll;
      }

      let opacity = 1;
      const transitionDist = windowSize.width;

      if (backgroundNumber !== 1) {
        if (distFromVisible > transitionDist) {
          opacity = 0;
        } else {
          // Tighter fade zone — clouds reach full opacity sooner
          const fadeZone = transitionDist * 0.15;
          const fadeStart = transitionDist * 0.45;
          if (distFromVisible > fadeStart) {
            opacity = Math.max(0, 1 - (distFromVisible - fadeStart) / fadeZone);
          }
        }
      }

      if (!layer.includes('sky')) {
        const depth = getDepthForLayer(layer, idx, allLayers.length);
        const direction = isForeground(layer) ? 1 : -1;
        const yOffset = distFromVisible * depth * 0.8;

        gsap.set(elX, { x: 0, y: direction * yOffset, opacity });
      } else {
        // Sky never fades — it's the atmosphere; fading it reveals the raw container bg
        gsap.set(elX, { x: 0, y: 0, opacity: 1 });
      }
    });
  }, [scrollX, sectionStartX, sectionWidth, layers, allLayers, backgroundNumber]);

  // Hook C: Entrance animations (only for Section 1 on load)
  useLayoutEffect(() => {
    // Only Section 1 has an on-load entrance animation
    if (backgroundNumber !== 1) return;

    if (!animationFiredRef.current) {
      animationFiredRef.current = true;

      const bgLayers = layers.filter((l) => !isForeground(l) && !l.includes('sky'));
      const fgLayers = layers.filter((l) => isForeground(l) && !l.includes('sky'));

      if (bgLayers.length > 0) {
        gsap.to(bgLayers.map((l) => yRefsMap.current[`1-${l}`]), {
          duration: 1.2,
          y: 0,
          ease: 'power2.out',
          stagger: 0.1,
          overwrite: 'auto',
        });
      }

      if (fgLayers.length > 0) {
        gsap.to(fgLayers.map((l) => yRefsMap.current[`1-${l}`]), {
          duration: 1.2,
          y: 0,
          ease: 'power2.out',
          stagger: 0.1,
          overwrite: 'auto',
        });
      }
    }
  }, [layers, backgroundNumber]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${foregroundOnly ? '' : 'bg-[#7ab0d4]'}`}>
      {layers.map((layer) => {
        const layerKey = `${backgroundNumber}-${layer}`;

        return (
          <div
            key={layerKey}
            ref={(el) => { if (el) yRefsMap.current[layerKey] = el; }}
            className="absolute inset-0"
          >
            <div
              ref={(el) => { if (el) xRefsMap.current[layerKey] = el; }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url(/parallax-backgrounds/game_background_${backgroundNumber}/layers/${layer}.png)`,
                backgroundSize: '1920px 1080px',
                backgroundPosition: '0 0',
                backgroundRepeat: 'repeat-x',
                backgroundAttachment: 'local',
                willChange: 'transform',
              }}
            />
          </div>
        );
      })}

      {/* Vignette only on the background pass */}
      {!foregroundOnly && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-replicate-canvas/5 pointer-events-none" />
      )}
    </div>
  );
};

export default ParallaxBackground;
