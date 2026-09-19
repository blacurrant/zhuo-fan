/**
 * sfx — procedural sound for the journey, synthesised with Web Audio.
 *
 * No files: a footstep, a page turn and a chest bursting are all short shaped
 * noise, which costs nothing to download. Silent until the visitor turns sound
 * on with the music stamp — the same opt-in, and the AudioContext is created
 * inside that click, which is the user gesture browsers require.
 */

let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let enabled = false;

const getNoise = (c: AudioContext): AudioBuffer => {
  if (noise) return noise;
  const len = Math.round(c.sampleRate * 0.5);
  noise = c.createBuffer(1, len, c.sampleRate);
  const d = noise.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  return noise;
};

/** Call from the click that turns sound on or off. */
export function setSfxEnabled(on: boolean): void {
  enabled = on;
  if (!on || typeof window === 'undefined') return;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  ctx ??= new AC();
  if (ctx.state === 'suspended') void ctx.resume();
}

/** A burst of filtered noise with an attack/decay envelope. */
function burst(opts: {
  dur: number;
  gain: number;
  type: BiquadFilterType;
  freq: number;
  freqEnd?: number;
  q?: number;
  delay?: number;
}): void {
  if (!enabled || !ctx) return;
  const c = ctx;
  const t = c.currentTime + (opts.delay ?? 0);
  const src = c.createBufferSource();
  src.buffer = getNoise(c);
  src.playbackRate.value = 0.9 + Math.random() * 0.2;
  const f = c.createBiquadFilter();
  f.type = opts.type;
  f.Q.value = opts.q ?? 1;
  f.frequency.setValueAtTime(opts.freq, t);
  if (opts.freqEnd) f.frequency.exponentialRampToValueAtTime(opts.freqEnd, t + opts.dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(opts.gain, t + Math.min(0.012, opts.dur * 0.2));
  g.gain.exponentialRampToValueAtTime(0.0001, t + opts.dur);
  src.connect(f).connect(g).connect(c.destination);
  src.start(t, Math.random() * 0.3, opts.dur + 0.05);
}

/** Soft step on gravel. */
export function footstep(): void {
  burst({ dur: 0.07, gain: 0.05, type: 'bandpass', freq: 900 + Math.random() * 500, q: 0.8 });
}

/** A page lifting and settling — a rising, then falling, papery sweep. */
export function pageTurn(): void {
  burst({ dur: 0.22, gain: 0.07, type: 'bandpass', freq: 1800, freqEnd: 4200, q: 0.7 });
  burst({ dur: 0.16, gain: 0.05, type: 'bandpass', freq: 3000, freqEnd: 900, q: 0.7, delay: 0.2 });
}

/** The crate giving way: a low thump, then splinters. */
export function chestBurst(): void {
  if (!enabled || !ctx) return;
  const c = ctx;
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(140, t);
  o.frequency.exponentialRampToValueAtTime(45, t + 0.25);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.35, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + 0.32);
  for (let i = 0; i < 4; i++) {
    burst({ dur: 0.05, gain: 0.08, type: 'highpass', freq: 2500 + i * 700, delay: 0.02 + i * 0.045 });
  }
}
