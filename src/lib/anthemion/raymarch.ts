/**
 * The shelf's shared drawing harness — canvas, context, loop, governor.
 *
 * Extracted from `nephele` and `selas` after they had both been written and
 * before a third existed, which is later than a tidy-minded refactor would have
 * done it and earlier than the rule of three would allow. The deciding evidence
 * was a bug rather than an aesthetic: the frame-time governor was wrong in both
 * copies, in exactly the same way, and had to be found and fixed twice. It
 * compared `requestAnimationFrame` deltas against a fixed millisecond budget —
 * but rAF fires on the display's refresh, so the delta is ~16.7ms on a 60Hz
 * screen whether the shader cost two milliseconds or twelve. Every machine read
 * as over budget, both components ground down to their quality floor and stayed
 * there, and the only symptom was a render that looked noisier than it should.
 * Two copies of a silent bug is the signal; a third would have inherited it.
 *
 * THE LINE THIS MODULE DOES NOT CROSS. It owns the *machinery* and knows
 * nothing about the *picture*. Canvas and probe, context and context loss,
 * compile and link, the fullscreen triangle, the resolution ladder, the
 * governor, the visibility gating, the fallback. It never sees a field
 * function, a colour ramp, a uniform's meaning or an attribute that describes
 * what is being drawn.
 *
 * THE VERTEX PATH, ADDED FOR `desme`. Four of the five components on the shelf
 * are one triangle and a fragment shader; a point cloud is the same machinery
 * with different geometry, and duplicating this file to get it would have made
 * a third copy of the governor — which is the exact bug that caused the file to
 * exist. So `vert`, `attach` and `draw` are optional and default to the
 * fullscreen triangle, and the harness learns nothing new: a vertex shader is a
 * string like `frag` is, and a draw call is not a description of a picture.
 * `attach` runs again after a context restore, so whatever it builds must be
 * rebuilt there rather than cached against the element.
 *
 * That line is load-bearing. The moment this starts accepting a configuration
 * object that *describes* a shader, every future backdrop has to be expressible
 * in its vocabulary and the harness has become the subject — which is the
 * mistake `pyxis` made one level down, where the drawn pot grew bigger than the
 * photographs it was holding. If a new component cannot fit without this module
 * growing a new concept, the module is wrong, not the component.
 *
 * The one attribute it does own is `render`, because resolution is a property
 * of the harness rather than of the image. Everything else belongs upstairs.
 *
 * THE MOTION CONTROL IS ALSO MACHINERY, and it is the second thing this module
 * owns outright. WCAG 2.2.2 wants a mechanism to pause anything that moves by
 * itself for more than five seconds beside other content, and it wants it for
 * *every* user — `prefers-reduced-motion` answers a different question, asked
 * by a minority who have already found the setting. The loop, the visibility
 * gate and the intersection gate all live here; a pause switch is the same
 * category of thing, and putting it upstairs would mean seven copies of it.
 */

import { prefersReducedMotion, clampInt } from './reveal';

/**
 * The absolute ceiling on buffer size, so a 5K hero on a weak GPU cannot melt.
 * The `render` fraction is the real control; this is the backstop under it.
 */
const MAX_PIXELS = 3_000_000;

const VERT = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

/**
 * The fullscreen triangle's vertex shader, for a component that compiles a
 * SECOND program of its own — `achlys` runs a wipe mask into its own buffer
 * before the composite. Exported so there is one copy of the string rather than
 * two, and it is still machinery: a vertex shader that sets `gl_Position` from
 * a clip-space attribute describes no picture at all.
 */
export { VERT as FULLSCREEN_VERT };

/**
 * Compile, link, and say which element failed. Exported for the same reason as
 * the vertex shader above: linking is machinery, it knows nothing about what is
 * being drawn, and the alternative is a second copy of it living in a component.
 *
 * `bind` runs between attach and link, which is the only window in which
 * `bindAttribLocation` does anything — a component that shares one vertex buffer
 * across two programs needs both to agree on the attribute's index.
 */
export const linkProgram = (
  gl: WebGLRenderingContext,
  vert: string,
  frag: string,
  tag: string,
  bind?: (program: WebGLProgram) => void,
): WebGLProgram | null => {
  const make = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(tag, gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  };
  const vs = make(gl.VERTEX_SHADER, vert);
  const fs = make(gl.FRAGMENT_SHADER, frag);
  if (!vs || !fs) return null;

  const p = gl.createProgram()!;
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  bind?.(p);
  gl.linkProgram(p);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error(tag, gl.getProgramInfoLog(p));
    return null;
  }
  return p;
};

const srgbToLinear = (c: number) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);

/** One pixel, reused across every component, for turning a CSS colour into channels. */
let swatch: CanvasRenderingContext2D | null = null;

/**
 * Read a colour off the cascade and hand back linear channels.
 *
 * Not by parsing, and this is the part that has bitten before.
 * `getComputedStyle().color` does NOT normalise to `rgb()` — a
 * `color-mix(in oklab, …)` computes to `oklab(0.86 -0.0002 0.0007)`, an rgb
 * regex misses it entirely, and the fallback grey it returns instead is what
 * once rendered a terracotta pot as a dark grey drum. Painting the colour into
 * a pixel and reading it back survives every syntax a buyer might write: oklch,
 * `color()`, a named colour, a system colour.
 */
export const readColour = (
  probe: HTMLElement,
  prop: string,
  fallback: string,
): [number, number, number] => {
  probe.style.color = '';
  probe.style.color = `var(${prop}, ${fallback})`;
  const css = getComputedStyle(probe).color;

  swatch ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  if (!swatch) return [0.5, 0.5, 0.5];
  // An unsupported syntax leaves fillStyle at its previous value rather than
  // throwing, so the sentinel is what catches it.
  swatch.fillStyle = '#000';
  swatch.fillStyle = css;
  swatch.clearRect(0, 0, 1, 1);
  swatch.fillRect(0, 0, 1, 1);
  // es5 target: index instead of destructuring the ImageDataArray iterator.
  const px = swatch.getImageData(0, 0, 1, 1).data;
  const r = px[0] ?? 0, g = px[1] ?? 0, b = px[2] ?? 0;
  return [srgbToLinear(r / 255), srgbToLinear(g / 255), srgbToLinear(b / 255)];
};

/** A number published through the cascade, or null where nothing published one. */
export const cascaded = (styles: CSSStyleDeclaration, prop: string) => {
  const v = Number.parseFloat(styles.getPropertyValue(prop));
  return Number.isFinite(v) ? v : null;
};

/** What a component is handed on every frame. */
export interface Frame {
  gl: WebGLRenderingContext;
  /** Uniform locations, by the names the component asked for. */
  loc: Record<string, WebGLUniformLocation | null>;
  /** Drawing buffer size, after the resolution ladder and the pixel cap. */
  w: number;
  h: number;
  /** Accumulated drift, in the component's own units. Never a wall clock. */
  phase: number;
  /**
   * 0–1, moved by the governor. The component maps it onto whatever it spends —
   * march steps, plane count — so this module never learns what those are.
   */
  quality: number;
  /** Zero-size element to read the cascade from. Pass to `readColour`. */
  probe: HTMLElement;
  styles: CSSStyleDeclaration;
  reduced: boolean;
}

export interface FieldSpec {
  /** The host element. The canvas and probe are appended to it. */
  host: HTMLElement;
  /** Class prefix for the canvas and probe, e.g. `anthemion-pelagos`. */
  name: string;
  frag: string;
  /** Vertex shader. Omit for the fullscreen triangle, which is the usual case. */
  vert?: string;
  /**
   * Build the component's own buffers and set its own blend state, once per
   * context. Called after link with the program bound, and called *again* after
   * a context restore — so it must rebuild rather than reuse. Supplying it
   * replaces the fullscreen triangle, so pair it with `draw`.
   */
  attach?(gl: WebGLRenderingContext, program: WebGLProgram): void;
  /** Uniform names to look up once at link time. */
  uniforms: readonly string[];
  /** Upload uniforms and nothing else. Called every frame. */
  frame(f: Frame): void;
  /** The draw call. Defaults to the fullscreen triangle's three vertices. */
  draw?(f: Frame): void;
  /** Drift multiplier, usually straight off the component's own attribute. */
  rate(): number;
  /** Base drift, in phase units per second at rate 1. */
  speed?: number;
  /** Default for the `render` attribute, as a percentage. */
  render?: number;
}

/* ---- the page's motion control -------------------------------------------
 *
 * ONE BUTTON FOR THE WHOLE PAGE, and it lives in `document.body` rather than
 * inside any field. Two facts force both halves of that, and neither is a
 * preference.
 *
 * It cannot live in the host. Every field on this shelf is `position: fixed;
 * z-index: -1; pointer-events: none` — which makes the host a stacking context
 * sitting *behind* the document. A button inside it is unclickable at any
 * z-index, because a child cannot escape its parent's stacking context, and
 * `pointer-events: auto` does not help when the whole document is painted on
 * top. This is the same geometry that made `desme` read the pointer off the
 * document instead of taking pointer events for itself.
 *
 * And there is one of it because a page carries three or four of these at
 * once. Three pause buttons is not three times the compliance; it is a worse
 * page. The mechanism WCAG asks for is singular, so this is singular, and it
 * stops everything that moves.
 *
 * Under reduced motion no loop is ever started, so there is nothing to pause
 * and no control is rendered. The control appears when the first field that
 * actually animates mounts, and leaves with the last one.
 */

const fields = new Set<Field>();
let control: HTMLButtonElement | null = null;
let paused = false;

/** What the button says. It is a real text node, so it survives a missing stylesheet. */
const LABEL = { running: 'Pause motion', stopped: 'Play motion' };

const label = () => {
  if (!control) return;
  control.textContent = paused ? LABEL.stopped : LABEL.running;
  control.setAttribute('aria-pressed', String(paused));
};

const showControl = () => {
  if (control || typeof document === 'undefined') return;
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'anthemion-motion';
  b.addEventListener('click', () => {
    paused = !paused;
    fields.forEach((f) => (paused ? f.hold() : f.release())); // es5 target: no Set iteration
    label();
  });
  control = b;
  label();
  document.body.append(b);
};

const hideControl = () => {
  control?.remove();
  control = null;
};

/** Enrol a field that is about to start looping, and put the control on the page. */
const enrol = (f: Field) => {
  fields.add(f);
  showControl();
};

/** Retire a field. The control leaves with the last one, so a torn-down page is clean. */
const retire = (f: Field) => {
  fields.delete(f);
  if (!fields.size) hideControl();
};

/**
 * A full-bleed shader field: everything about drawing one, and nothing about
 * what is drawn.
 *
 * Composed rather than inherited, because the component already extends `Base`
 * and a custom element may only have one superclass.
 */
export class Field {
  private spec: FieldSpec;

  private surface: HTMLCanvasElement | null = null;
  private probe: HTMLElement | null = null;
  private gl: WebGLRenderingContext | null = null;
  private loc: Record<string, WebGLUniformLocation | null> = {};
  private resizer: ResizeObserver | null = null;
  private watcher: IntersectionObserver | null = null;

  private phase = 0;
  private last = 0;
  private frameId = 0;
  private onScreen = true;
  private reduced = false;

  /**
   * The governor, and it measures *dropped frames* rather than milliseconds.
   *
   * rAF can never tell you what a frame cost — it fires on the refresh. What it
   * can tell you is whether frames are being missed, which is the thing that
   * actually matters. So the display period is learned from the fastest frames
   * seen, decaying slowly so a machine that speeds up is followed, and quality
   * is trimmed only when the average interval runs well past it. That works at
   * 60Hz, at 120Hz, and on a throttled tab.
   */
  private quality = 1;
  private avg = 0;
  private period = 0;
  private streak = 0;

  constructor(spec: FieldSpec) {
    this.spec = spec;
  }

  mount() {
    const { host, name } = this.spec;
    this.reduced = prefersReducedMotion();

    const surface = document.createElement('canvas');
    surface.className = `${name}__gl`;
    surface.setAttribute('aria-hidden', 'true');

    // A zero-size probe, so the element's own cascade answers for colours and
    // for the hour without any of it being read off the host — whose `color`
    // the buyer may well have set for something else entirely.
    const probe = document.createElement('span');
    probe.className = `${name}__probe`;
    probe.setAttribute('aria-hidden', 'true');

    host.append(surface, probe);
    this.surface = surface;
    this.probe = probe;

    this.start();
  }

  unmount() {
    this.stop();
    retire(this);
    this.resizer?.disconnect();
    this.resizer = null;
    this.watcher?.disconnect();
    this.watcher = null;
    document.removeEventListener('visibilitychange', this.onVisibility);
  }

  /**
   * Stop looping because the reader asked, not because the browser did.
   *
   * Separate from `stop()` on purpose: the intersection and visibility gates
   * call `run()` freely as the page scrolls, and every one of those calls has
   * to keep honouring a reader who pressed pause. The guard lives in `run()`
   * for exactly that reason, so there is one place that decides.
   */
  hold() {
    this.stop();
  }

  /** Resume, if this field is still on screen and the tab is still in front. */
  release() {
    this.run();
  }

  /** Redraw on demand — for `attributeChangedCallback`. No-op before mount. */
  refresh() {
    if (this.gl) this.draw();
  }

  private start() {
    const surface = this.surface;
    if (!surface) return;

    // Opaque: this is a backdrop and it fills its own box, so there is nothing
    // to blend with and an alpha channel would only cost a composite.
    const gl = surface.getContext('webgl', { alpha: false, antialias: false, depth: false });
    if (!gl) return this.give('this browser has no WebGL');

    this.gl = gl;
    surface.addEventListener('webglcontextlost', (e) => {
      // Without this a backgrounded tab comes back to a blank canvas.
      e.preventDefault();
      this.stop();
    });
    surface.addEventListener('webglcontextrestored', () => {
      this.gl = null;
      this.start();
    });

    const program = this.link(gl);
    if (!program) return this.give('the shader would not compile');
    gl.useProgram(program);

    for (const n of this.spec.uniforms) this.loc[n] = gl.getUniformLocation(program, n);

    if (this.spec.attach) {
      this.spec.attach(gl, program);
    } else {
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    }

    this.resizer ??= new ResizeObserver(() => this.draw());
    this.resizer.observe(surface);

    this.spec.host.dataset.mode = 'gl';
    this.draw();

    // Reduced motion is the finished state, immediately: one frame is drawn and
    // no loop is ever started. Nothing to pause and nothing to resume — so this
    // returns before enrolling, and a page of nothing but stilled fields shows
    // no control at all.
    if (this.reduced) return;

    // A field mounting into an already-paused page must not start looping, so
    // enrol before the first `run()` and let its guard do the deciding.
    enrol(this);

    this.watcher ??= new IntersectionObserver((entries) => {
      this.onScreen = entries.some((e) => e.isIntersecting);
      this.onScreen ? this.run() : this.stop();
    });
    this.watcher.observe(surface);
    document.addEventListener('visibilitychange', this.onVisibility);
    this.run();
  }

  private link(gl: WebGLRenderingContext) {
    const tag = `<${this.spec.host.tagName.toLowerCase()}>`;
    return linkProgram(gl, this.spec.vert ?? VERT, this.spec.frag, tag);
  }

  /**
   * Hand the frame back to CSS.
   *
   * Every component on this shelf paints a gradient on the *host element*, by
   * element and never by a class, so it is already showing underneath. Losing
   * the shader therefore means removing the canvas, not rendering nothing.
   */
  private give(why: string) {
    this.stop();
    this.surface?.remove();
    this.surface = null;
    this.gl = null;
    this.spec.host.dataset.mode = 'gradient';
    console.warn(`<${this.spec.host.tagName.toLowerCase()}> fell back to the gradient: ${why}.`);
  }

  private onVisibility = () => {
    document.hidden || !this.onScreen ? this.stop() : this.run();
  };

  private run() {
    if (this.frameId || this.reduced || paused || !this.gl || document.hidden) return;
    this.last = performance.now();
    const tick = () => {
      this.draw();
      this.frameId = requestAnimationFrame(tick);
    };
    this.frameId = requestAnimationFrame(tick);
  }

  private stop() {
    cancelAnimationFrame(this.frameId);
    this.frameId = 0;
  }

  private govern(dt: number) {
    // Slow-decaying minimum: the display's period, learned rather than assumed.
    this.period = this.period ? Math.min(dt, this.period * 1.02) : dt;
    // Exponential mean, so one slow frame from elsewhere on the page is
    // absorbed rather than acted on.
    this.avg = this.avg ? this.avg * 0.9 + dt * 0.1 : dt;

    // Moves in small steps and only after a run of consistent frames, so it
    // settles instead of oscillating and nothing about it is visible.
    if (this.avg > this.period * 1.45) {
      this.streak = this.streak > 0 ? 0 : this.streak - 1;
      if (this.streak <= -10) {
        this.quality = Math.max(0, this.quality - 0.05);
        this.streak = 0;
      }
    } else if (this.avg < this.period * 1.12 && this.quality < 1) {
      this.streak = this.streak < 0 ? 0 : this.streak + 1;
      if (this.streak >= 40) {
        this.quality = Math.min(1, this.quality + 0.02);
        this.streak = 0;
      }
    } else {
      this.streak = 0;
    }
  }

  private draw() {
    const gl = this.gl;
    const surface = this.surface;
    const probe = this.probe;
    if (!gl || !surface || !probe) return;

    const now = performance.now();
    if (!this.reduced) {
      const dt = now - this.last;
      // Clamped: a throttled tab hands back a delta of seconds on resume, which
      // would jump the field somewhere else entirely.
      this.phase += Math.min(0.1, dt / 1000) * (this.spec.speed ?? 0.35) * this.spec.rate();
      if (dt > 0 && dt < 200) this.govern(dt);
    }
    this.last = now;

    /**
     * A fraction of the box, and deliberately not the device pixel ratio.
     *
     * These are backdrops: no text, no edge that a retina buffer preserves.
     * Rendering at DPR 2 costs four times the fragments of DPR 1 for nothing
     * anyone can see, and dropping it is the single largest saving available.
     * How far a given field can be pushed depends on the field — a smooth
     * emission survives 40, a hard density threshold does not — so the default
     * is the component's to choose and the buyer's to override.
     */
    const q = clampInt(this.spec.host.getAttribute('render'), this.spec.render ?? 66, 40, 100) / 100;
    const cw = (surface.clientWidth || 1) * q;
    const ch = (surface.clientHeight || 1) * q;
    const k = Math.min(1, Math.sqrt(MAX_PIXELS / Math.max(1, cw * ch)));
    const bw = Math.max(1, Math.round(cw * k));
    const bh = Math.max(1, Math.round(ch * k));
    if (surface.width !== bw || surface.height !== bh) {
      surface.width = bw;
      surface.height = bh;
      gl.viewport(0, 0, bw, bh);
    }

    const f: Frame = {
      gl,
      loc: this.loc,
      w: bw,
      h: bh,
      phase: this.phase,
      // Reduced motion draws one frame and never loops, so it can afford it all.
      quality: this.reduced ? 1 : this.quality,
      probe,
      styles: getComputedStyle(probe),
      reduced: this.reduced,
    };

    this.spec.frame(f);
    this.spec.draw ? this.spec.draw(f) : gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}
