'use client';
/**
 * AmbientCanvas — the "life layer" of the journey world.
 *
 * One fixed <canvas>, one rAF loop, zero React re-renders per frame.
 * Reads scroll state through a mutable ref so it never causes renders.
 *
 * What it draws, by journey progress (p = 0 → 1):
 *   p 0.00 – 0.62   sakura/ink petals drifting on the wind (hero + adventures)
 *   p 0.50 – 0.85   warm dust motes (process section, golden hour)
 *   p 0.74 – 1.00   fireflies + twinkling stars (farewell, night)
 *   always          footstep dust puffs under the samurai when he moves,
 *                   horizontal speed-lines when he runs
 *
 * Wind reacts to scroll velocity, and every particle has a parallax depth
 * so the swarm shifts against the world while you travel — they live IN
 * the world, not on top of it.
 *
 * Perf notes:
 *   - particle budgets scale with viewport width (mobile gets ~45%)
 *   - DPR capped at 1.5
 *   - loop pauses on document.hidden
 *   - fully disabled for prefers-reduced-motion
 */
import React, { useEffect, useRef } from 'react';

export interface AmbientState {
  x: number;        // scrollLeft in px
  velocity: number; // px / ms (same value HorizontalJourney already computes)
  progress: number; // 0..1
}

interface AmbientCanvasProps {
  stateRef: React.MutableRefObject<AmbientState>;
}

const ramp = (v: number, a: number, b: number) =>
  Math.max(0, Math.min(1, (v - a) / (b - a)));

// ── particle shapes ────────────────────────────────────────────────────────
interface Petal { x: number; y: number; vy: number; sway: number; swayP: number; swayV: number; rot: number; rotV: number; size: number; depth: number; tone: number; }
interface Mote  { x: number; y: number; vy: number; phase: number; size: number; depth: number; }
interface Fly   { x: number; y: number; px: number; py: number; phase: number; speed: number; size: number; depth: number; }
interface Star  { x: number; y: number; r: number; tw: number; phase: number; }
interface Puff  { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; }

const AmbientCanvas: React.FC<AmbientCanvasProps> = ({ stateRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, dpr = 1;
    let petals: Petal[] = [];
    let motes: Mote[] = [];
    let flies: Fly[] = [];
    let stars: Star[] = [];
    const puffs: Puff[] = [];

    const isMobile = () => W < 768;
    const budget = (desktop: number) =>
      Math.round(desktop * (isMobile() ? 0.45 : Math.min(1, W / 1600)));

    const seed = () => {
      petals = Array.from({ length: budget(26) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vy: 14 + Math.random() * 22,
        sway: 18 + Math.random() * 30,
        swayP: Math.random() * Math.PI * 2,
        swayV: 0.6 + Math.random() * 0.9,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 1.6,
        size: 3 + Math.random() * 4,
        depth: 0.25 + Math.random() * 0.55,
        tone: Math.random(),
      }));
      motes = Array.from({ length: budget(30) }, () => ({
        x: Math.random() * W,
        y: H * 0.35 + Math.random() * H * 0.6,
        vy: -4 - Math.random() * 8,
        phase: Math.random() * Math.PI * 2,
        size: 0.8 + Math.random() * 1.6,
        depth: 0.15 + Math.random() * 0.4,
      }));
      flies = Array.from({ length: budget(20) }, () => ({
        x: Math.random() * W,
        y: H * 0.45 + Math.random() * H * 0.45,
        px: Math.random() * Math.PI * 2,
        py: Math.random() * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.7,
        size: 1.2 + Math.random() * 1.4,
        depth: 0.2 + Math.random() * 0.35,
      }));
      stars = Array.from({ length: budget(70) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.55,
        r: 0.4 + Math.random() * 1.1,
        tw: 0.6 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let last = performance.now();
    let lastScrollX = stateRef.current.x;
    let travelAcc = 0; // px travelled since last footstep puff

    const groundY = () => {
      const scale = Math.max(0.4, Math.min(1, W / 1920));
      return H - Math.max(14, Math.round(30 * scale)) - 6;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden) { last = now; lastScrollX = stateRef.current.x; return; }

      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = now / 1000;

      const { x: scrollX, velocity, progress: p } = stateRef.current;
      const dx = scrollX - lastScrollX; // px scrolled this frame
      lastScrollX = scrollX;

      // wind: gentle base breeze + reaction to travel
      const wind = -12 + Math.max(-260, Math.min(260, -velocity * 140));

      // zone alphas
      const petalA = 1 - ramp(p, 0.55, 0.68);
      const moteA  = ramp(p, 0.5, 0.6) * (1 - ramp(p, 0.78, 0.88));
      const nightA = ramp(p, 0.76, 0.92);

      ctx.clearRect(0, 0, W, H);

      // ── stars (drawn first, deepest layer) ──
      if (nightA > 0.01) {
        ctx.fillStyle = '#fff';
        for (const s of stars) {
          const a = nightA * (0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.tw + s.phase)));
          ctx.globalAlpha = a * 0.9;
          ctx.beginPath();
          ctx.arc(s.x - dx * 0.02, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
          s.x -= dx * 0.02;
          if (s.x < -4) s.x += W + 8;
          if (s.x > W + 4) s.x -= W + 8;
        }
        ctx.globalAlpha = 1;
      }

      // ── petals ──
      if (petalA > 0.01) {
        for (const pt of petals) {
          pt.swayP += pt.swayV * dt;
          pt.rot += pt.rotV * dt;
          pt.x += (wind * pt.depth + Math.cos(pt.swayP) * pt.sway) * dt - dx * pt.depth;
          pt.y += pt.vy * dt;
          if (pt.y > H + 12) { pt.y = -12; pt.x = Math.random() * W; }
          if (pt.x < -20) pt.x += W + 40;
          if (pt.x > W + 20) pt.x -= W + 40;

          const a = petalA * (0.35 + pt.depth * 0.5);
          // most petals: soft warm white-pink; a few: ink-red flecks (brand accent)
          ctx.fillStyle = pt.tone > 0.85
            ? `rgba(234,40,4,${a * 0.45})`
            : `rgba(255,226,216,${a})`;
          ctx.save();
          ctx.translate(pt.x, pt.y);
          ctx.rotate(pt.rot);
          ctx.beginPath();
          ctx.ellipse(0, 0, pt.size, pt.size * 0.55, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ── dust motes (golden hour) ──
      if (moteA > 0.01) {
        for (const m of motes) {
          m.phase += dt;
          m.x += (wind * 0.4 * m.depth + Math.sin(m.phase) * 8) * dt - dx * m.depth;
          m.y += m.vy * dt;
          if (m.y < H * 0.25) { m.y = H * 0.95; m.x = Math.random() * W; }
          if (m.x < -10) m.x += W + 20;
          if (m.x > W + 10) m.x -= W + 20;
          ctx.fillStyle = `rgba(255,200,120,${moteA * (0.18 + m.depth * 0.35)})`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── fireflies ──
      if (nightA > 0.01) {
        for (const f of flies) {
          f.px += f.speed * dt;
          f.py += f.speed * 0.8 * dt;
          f.x += (Math.cos(f.px) * 24 + wind * 0.15 * f.depth) * dt - dx * f.depth;
          f.y += Math.sin(f.py) * 18 * dt;
          if (f.x < -16) f.x += W + 32;
          if (f.x > W + 16) f.x -= W + 32;
          f.y = Math.max(H * 0.3, Math.min(H * 0.96, f.y));

          const pulse = 0.25 + 0.75 * Math.max(0, Math.sin(t * 1.6 + f.phase)) ** 2;
          const a = nightA * pulse;
          // halo
          ctx.fillStyle = `rgba(255,214,90,${a * 0.16})`;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.size * 5, 0, Math.PI * 2);
          ctx.fill();
          // core
          ctx.fillStyle = `rgba(255,238,150,${a})`;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── footstep dust ──
      const speed = Math.abs(dx);
      travelAcc += speed;
      if (speed > 1.5 && travelAcc > 26 && puffs.length < 40) {
        travelAcc = 0;
        const dir = dx > 0 ? -1 : 1; // dust kicks back, opposite travel
        puffs.push({
          x: W / 2 + (Math.random() - 0.5) * 18,
          y: groundY() + 4,
          vx: dir * (20 + Math.random() * 40),
          vy: -(14 + Math.random() * 26),
          life: 0,
          max: 0.5 + Math.random() * 0.4,
          size: 2.5 + Math.random() * 3.5,
        });
      }
      for (let i = puffs.length - 1; i >= 0; i--) {
        const pf = puffs[i];
        pf.life += dt;
        if (pf.life >= pf.max) { puffs.splice(i, 1); continue; }
        const k = pf.life / pf.max;
        pf.x += pf.vx * dt - dx * 0.9;
        pf.y += pf.vy * dt;
        pf.vy += 10 * dt;
        const dark = nightA * 0.5;
        ctx.fillStyle = `rgba(${200 - dark * 120},${185 - dark * 115},${160 - dark * 100},${(1 - k) * 0.35})`;
        ctx.beginPath();
        ctx.arc(pf.x, pf.y, pf.size * (1 + k * 2), 0, Math.PI * 2);
        ctx.fill();
      }

      // ── speed lines when running hard ──
      if (speed > 14) {
        const a = Math.min(0.18, (speed - 14) / 90);
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          const y = (H * (0.18 + 0.62 * ((i * 137.5) % 100) / 100));
          const len = 60 + ((i * 89) % 90);
          const xo = (now * (0.4 + i * 0.12)) % (W + len) - len;
          const xx = dx > 0 ? W - xo : xo;
          ctx.beginPath();
          ctx.moveTo(xx, y);
          ctx.lineTo(xx + (dx > 0 ? len : -len), y);
          ctx.stroke();
        }
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [stateRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 42 }}
      aria-hidden
    />
  );
};

export default React.memo(AmbientCanvas);
