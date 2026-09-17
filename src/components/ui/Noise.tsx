"use client"

import React, { useRef, useEffect } from 'react';

interface NoiseProps {
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
}

/**
 * Film grain overlay.
 *
 * THE COST OF GRAIN IS IN GENERATING IT, NEVER IN DRAWING IT — and the previous
 * implementation regenerated all of it, every other frame, forever. It
 * allocated a fresh 1024x1024 ImageData (4MB) and ran 1,048,576 Math.random()
 * iterations 30 times a second, then blitted the result onto a
 * `position: fixed` layer covering the whole viewport at z-index 200.
 *
 * Measured, production build, 5 interleaved runs against an unmodified
 * baseline (paired medians, /journey, 70 wheel notches):
 *
 *                    p50      p90      frames over 33ms
 *   baseline         22.0ms   45.1ms   23%
 *   this version     19.8ms   40.2ms   14%
 *
 * TREAT THOSE NUMBERS AS SOFT. Repeating one identical configuration six times
 * gave a dropped-frame range of 13-20% with a clear upward drift, so the run to
 * run noise is comparable to the effect. What is NOT in doubt is the amount of
 * work removed: ~31 million Math.random() calls and thirty 4MB allocations per
 * second, every second, on every route.
 *
 * So the grain is generated ONCE — a few small tiles built at mount, then
 * cycled. A frame is now one pattern fill: no allocation, no RNG, no garbage.
 * The tile REPEATS at 1:1 pixels instead of a big buffer being stretched by
 * CSS, which keeps the grain fine rather than chunky, and a random sub-tile
 * offset on every draw stops a four-tile cycle from reading as a repeat.
 *
 * `patternSize` used to be accepted and then ignored — the buffer was hardcoded
 * to 1024, i.e. 16.8x the pixels the caller asked for. It is honoured now, as
 * are `patternScaleX` / `patternScaleY`.
 *
 * The IntersectionObserver this used to carry could never fire: the canvas is
 * absolutely positioned inside a fixed, full-viewport wrapper, so it is always
 * intersecting. Page Visibility does work, and is kept.
 */

/** Enough distinct tiles to scintillate; each one costs `patternSize²` RNG calls, once. */
const TILE_COUNT = 4;

const Noise: React.FC<NoiseProps> = ({
  patternSize = 128,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 2,
  patternAlpha = 15,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const tile = Math.max(8, Math.round(patternSize));
    const interval = Math.max(1, Math.round(patternRefreshInterval));
    const sx = patternScaleX || 1;
    const sy = patternScaleY || 1;

    // ── Generated once. One ImageData, reused across all tiles. ──
    const patterns: CanvasPattern[] = [];
    const buf = ctx.createImageData(tile, tile);
    const data = buf.data;
    for (let t = 0; t < TILE_COUNT; t++) {
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 256) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = patternAlpha;
      }
      const off = document.createElement('canvas');
      off.width = tile;
      off.height = tile;
      const offCtx = off.getContext('2d');
      if (!offCtx) continue;
      offCtx.putImageData(buf, 0, 0);
      const pat = ctx.createPattern(off, 'repeat');
      if (pat) patterns.push(pat);
    }
    if (patterns.length === 0) return;

    let w = 0;
    let h = 0;
    let tick = 0;

    const draw = () => {
      const pat = patterns[tick % patterns.length];
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, w, h);
      // Sub-tile jitter: the cycle is only four frames long, so without this the
      // eye locks onto the repeat almost immediately.
      ctx.setTransform(sx, 0, 0, sy, -Math.random() * tile, -Math.random() * tile);
      ctx.fillStyle = pat;
      ctx.fillRect(0, 0, w / sx + tile, h / sy + tile);
      tick++;
    };

    const resize = () => {
      w = Math.max(1, Math.ceil(window.innerWidth));
      h = Math.max(1, Math.ceil(window.innerHeight));
      // Assigning width/height clears the backing store, so redraw immediately —
      // otherwise a resize leaves the overlay blank until the next tick.
      canvas.width = w;
      canvas.height = h;
      draw();
    };

    // Reduced motion gets the finished state: grain, not flickering grain.
    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let frame = 0;
    const loop = () => {
      if (frame % interval === 0) draw();
      frame++;
      rafRef.current = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const start = () => {
      if (reduced || rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(loop);
    };

    const handleVisibility = () => (document.hidden ? stop() : start());

    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibility);
    resize();
    start();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      stop();
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      className="pointer-events-none absolute top-0 left-0 h-screen w-screen"
      ref={canvasRef}
      /**
       * Promotes the overlay to its own compositor layer, so repainting the
       * grain does not invalidate the scene underneath it.
       *
       * HONEST PROVENANCE: a single measurement suggested this was worth ~14
       * percentage points of dropped frames, and that result DID NOT REPRODUCE
       * when the benchmark was repeated properly. The benchmark turned out to
       * carry +-7pp of run-to-run variance on a machine that was degrading over
       * the session, which is wider than the effect being claimed.
       *
       * It is kept because it is theoretically right for an element that
       * repaints continuously and costs nothing, NOT because it is a proven
       * win here. Do not cite a number for it without re-measuring on a quiet
       * machine.
       */
      style={{ willChange: 'transform' }}
    />
  );
};

export default React.memo(Noise);
