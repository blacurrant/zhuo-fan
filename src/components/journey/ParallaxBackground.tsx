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
    return allLayers
      // THE SKY IS NOT DRAWN HERE ANY MORE. One continuous <anthemion-khysis>
      // wash behind the whole journey is the sky; each set's sky.png was a
      // full-height gradient wall that met the next set's along a 1px seam.
      // Terrain and clouds stay — silhouettes meeting is landscape, skies
      // meeting is a rendering error.
      .filter((l) => !l.includes('sky'))
      .filter((l) => {
        if (foregroundOnly === undefined) return true;          // all layers
        if (foregroundOnly === true) return isForeground(l);   // rocks/ground only
        return !isForeground(l);                               // clouds/pines only
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

      // OFF BY ONE VIEWPORT WIDTH, and it was visible as a hard vertical seam at
      // every section boundary. This measured the distance from the SCROLL
      // POSITION to the section, not from the EDGE OF THE SCREEN to the section
      // — so a section counted as "1 viewport away" at the exact moment its
      // first pixel came on screen. With the fade completing at 0.6 x viewport
      // width, a section was fully transparent while a slice of it was already
      // in view, and its layers were still mid-flight vertically. On a 2560-wide
      // screen that slice is ~450px of bare container.
      //
      // What both the fade and the vertical offset actually want is: zero while
      // ANY part of the section overlaps the viewport, growing only once it is
      // genuinely off screen. A parallax layer should never be caught in
      // transit while someone is looking at it.
      const viewLeft = scrollX;
      const viewRight = scrollX + windowSize.width;
      const sectionEndX = sectionStartX + sectionWidth;

      let distFromVisible = 0;
      if (sectionEndX < viewLeft) {
        distFromVisible = viewLeft - sectionEndX;        // passed, off to the left
      } else if (sectionStartX > viewRight) {
        distFromVisible = sectionStartX - viewRight;     // not yet, off to the right
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

        // autoAlpha = opacity + visibility:hidden at zero. A fully faded
        // section's layers leave the compositor entirely instead of sitting
        // as invisible full-viewport textures over the canvas.
        gsap.set(elX, { x: 0, y: direction * yOffset, autoAlpha: opacity });
      } else {
        // Sky never fades — it's the atmosphere; fading it reveals the raw container bg
        gsap.set(elX, { x: 0, y: 0, autoAlpha: 1 });
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

      // Reduced motion: skip the entrance tween, place layers immediately
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        [...bgLayers, ...fgLayers].forEach((l) =>
          gsap.set(yRefsMap.current[`1-${l}`], { y: 0 })
        );
        return;
      }

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

  // Hook D: ambient drift — clouds/birds keep moving when scroll is idle
  useLayoutEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;

    const drifters = layers
      .filter((l) => l.includes('cloud') || l.includes('bird'))
      .map((l, i) => ({
        el: xRefsMap.current[`${backgroundNumber}-${l}`],
        speed: l.includes('bird') ? 16 : 3 + i * 2.2, // px/sec
      }))
      .filter((d): d is { el: HTMLDivElement; speed: number } => !!d.el);

    if (drifters.length === 0) return;

    let raf: number;
    let lastT = performance.now();
    const offsets = drifters.map(() => 0);

    // The wrap has to happen at ONE TILE, and the tile is no longer 1920 wide:
    // 'auto 100%' scales it with the viewport height. Wrapping at a hardcoded
    // 1920 on a 1440-tall screen (2560px tiles) lurched the clouds 640px
    // sideways every cycle.
    const tileWidth = () => Math.max(1, window.innerHeight * (1920 / 1080));

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) { lastT = now; return; }
      const dt = (now - lastT) / 1000;
      lastT = now;
      const wrap = tileWidth();
      drifters.forEach((d, i) => {
        offsets[i] = (offsets[i] - d.speed * dt) % wrap;
        d.el.style.backgroundPositionX = `${offsets[i]}px`;
      });
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [layers, backgroundNumber]);

  // No flat-blue backstop on the container any more: it was the ground behind
  // the old sky.png, and opaque, it would sit exactly on top of the fixed
  // khysis field. The wash is the atmosphere now.
  return (
    <div className="absolute inset-0 overflow-hidden">
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
                // ARTWORK IS 1920x1080 AND THE VIEWPORT IS NOT. Pinning the
                // background to '1920px 1080px' left every layer's artwork
                // ending at y=1080 with bare div below it, so on any screen
                // taller than 1080 CSS px the layer's rectangular bottom edge
                // was visible — pines sliced mid-tree, a flat slab beneath, the
                // character standing on nothing. Worse, Hook B then translates
                // each layer vertically by its own depth, so all those hard
                // edges slid across each other at different rates.
                //
                // 'auto 100%' scales to the viewport height and lets the width
                // follow the aspect ratio, so it always covers vertically and
                // still tiles horizontally for the drift below.
                backgroundSize: 'auto 100%',
                backgroundPosition: '0 0',
                backgroundRepeat: 'repeat-x',
                backgroundAttachment: 'local',
                /* willChange REMOVED. With the opaque sky gone, every one of
                   these transparent layers composites over the live khysis
                   canvas, and a will-change hint on all of them asks the GPU
                   to hold ~25 viewport-sized layers at once. Exhaust that
                   budget and the compositor starts promoting and demoting
                   layers per frame, which looks exactly like elements
                   flickering and fighting. The browser promotes transformed
                   layers on its own when it is worth it. */
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
