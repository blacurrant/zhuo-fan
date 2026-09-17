/**
 * Shared reveal plumbing.
 *
 * Every component in this library follows the same contract:
 *   - the server-rendered markup is complete and visible without JavaScript
 *   - JS only *adds* motion, never content
 *   - `prefers-reduced-motion: reduce` resolves to the finished state instantly
 */

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observed = new WeakSet<Element>();

let observer: IntersectionObserver | null = null;

const getObserver = () => {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-revealed', '');
        observer?.unobserve(entry.target);
      }
    },
    // Fire a little before the element is fully in view so motion begins
    // as it arrives rather than after it has settled.
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  );
  return observer;
};

/** Marks `el` with `data-revealed` when it enters the viewport (or immediately). */
export const revealOnEnter = (el: Element) => {
  if (observed.has(el)) return;
  observed.add(el);

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    el.setAttribute('data-revealed', '');
    return;
  }
  getObserver().observe(el);
};

/** Deterministic 0–1 pseudo-random from an integer seed. No Math.random: the
 *  same element must produce the same pattern on every render, including SSR. */
export const seeded = (n: number) => {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

export const clampInt = (value: string | null, fallback: number, min: number, max: number) => {
  const n = Number.parseInt(value ?? '', 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
};
