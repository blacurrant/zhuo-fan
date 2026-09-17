import { clampInt, prefersReducedMotion, seeded } from './reveal';
import { Base } from './base';
import { Field, readColour, linkProgram, FULLSCREEN_VERT, type Frame } from './raymarch';

/**
 * <anthemion-khysis> — χύσις, a pouring out. Pigment spilling into a wet ground.
 *
 * On the shelf, where the only test is whether anyone would screenshot it.
 * Everybody has drawn a cursor trail; nobody has drawn one that behaves like
 * wet media, and the difference between the two is entirely in what happens
 * after the pointer has gone.
 *
 * ITS MECHANIC IS ACHLYS'S AND ITS PICTURE IS NOT. A pointer stroke written
 * into a ping-ponged buffer that decays back over time is the misted window,
 * exactly, at the level of the state machine — and that is a reason to be
 * careful rather than a reason not to build it. What differs is the direction
 * and the physics: achlys is SUBTRACTIVE, clearing fog to reveal a scene that
 * was always there, and this is ADDITIVE, laying pigment onto an empty ground.
 * Mist re-condenses uniformly. Pigment does not do anything uniformly.
 *
 * THE FADE IS MOSTLY DISPERSAL, AND THE HONEST WORD FOR THE REST IS ABSORPTION.
 * A mark does not dim on a timer here. It spreads, and a fixed amount of
 * pigment over four times the area is a quarter as strong, which is most of
 * what the eye reads as fading — it is also why two spills that touch genuinely
 * merge, and why the edge goes ragged rather than staying a circle. But
 * diffusion alone CONSERVES pigment: on a bounded canvas with no-flux edges it
 * does not clear, it silts up into an even wash, and after five minutes of
 * traffic the gesture would stop registering at all. So there is a second term,
 * a slow uniform absorption into the ground, and it is named for what it is
 * rather than dressed up. Inventing physics is the same error as costume one
 * level up.
 *
 * THE WEAVE IS THE DIFFUSIVITY FIELD, NOT A TEXTURE ON TOP. "A marble
 * photograph tiled behind a div" is the house's standing example of the wrong
 * way to use a material, and a canvas texture laid over the frame is that. Here
 * the weave decides where pigment can GO: the raised tooth resists and the
 * valleys conduct, so a wash strings along the threads and its edge breaks up
 * on the cloth. That is the whole difference between paint on canvas and paint
 * on glass, and the same field lights the surface in the visible pass, so it
 * costs one evaluation and does two jobs.
 *
 * A PLAIN WEAVE ALTERNATES WHICH THREAD IS ON TOP, cell by cell, and that
 * checkerboard is the only reason it reads as woven rather than as corduroy.
 * Both threads exist at every point; (i + j) mod 2 says which one is raised.
 *
 * SUBTRACTIVE MIXING, WHICH IS NOT OPTIONAL. The state carries three dye
 * densities and the visible pass runs Beer-Lambert over them — transmittance
 * MULTIPLIES. Adding pigment in RGB instead makes two overlapping washes
 * brighter than either one, which is the single tell that nobody modelled the
 * paint. Blue over yellow has to come out green.
 *
 * Attributes
 *   spill   how often a bloom arrives unbidden, 0–100  (default 72)
 *   spread  diffusivity, 0–100                         (default 80)
 *   dry     how fast the ground gives up its water, 0–100 (default 22)
 *   tooth   how coarse the weave is, 0–100             (default 55)
 *   load    pigment per mark, 0–100                    (default 82)
 *   grain   granulation — how much pigment catches in the valleys, 0–100 (default 45)
 *   gate    none | pointer — pointer spills as it approaches (default none)
 *   drift   0–200 percent of the base rate             (default 100)
 *   render  resolution as a percentage of the box, 40–100 (default 80)
 *   place   fixed | inline — inline is for a gallery tile (default fixed)
 *
 * `spill` is the FLOOR and the pointer adds on top, so the two are independent:
 * at `spill="0" gate="pointer"` every mark on the canvas is one the visitor
 * made, and at `gate="none"` it paints itself forever. The canvas is never
 * blank at rest, which is not a decoration — an unattended hero, a gallery tile
 * and a screenshot are all the same still frame, and a component that is only
 * alive under a pointer fails the shelf's one test in every one of them.
 *
 * Custom properties
 *   --khysis-ground   the primed canvas
 *   --khysis-first    the first pigment
 *   --khysis-second   the second
 *   --khysis-third    the third
 *   --khysis-layer    z-index when fixed                (default -1)
 *   --khysis-ratio    aspect ratio when inline          (default 16 / 10)
 *
 * A pigment's property is the colour it transmits at full strength, so the
 * shader takes −log of it and gets an absorption. That is why there is no
 * separate opacity: density is `load`, and colour is what the dye does to light
 * passing through it.
 *
 * THE GESTURE IS PROXIMITY, NOT HOVER, and it is opt-in. An extra is full-bleed
 * behind the document at `pointer-events: none`, so a hover listener on it can
 * never fire — and giving it pointer events to make one work lays a transparent
 * sheet over the page and swallows every click. The document reports the
 * pointer and the element measures its own box.
 *
 * Without JavaScript the element is a primed ground with two faint washes on
 * it, selected by element rather than by a class.
 */

/* ---------------------------------------------------------------- constants */

/** Stamps laid in one frame: one pointer stroke plus any blooms arriving. */
const MAX_STAMPS = 8;
/**
 * Cap on the state buffer's longer side, and it is deliberately coarse.
 *
 * Diffusion spreads in TEXELS, not in pixels, so a finer buffer is a slower
 * wash for more money — twice the resolution is four times the cost to cover
 * the same fraction of the frame. The picture is a wet blur and loses nothing
 * to a small grid; the visible pass interpolates it back up.
 */
const WASH_MAX = 340;
/** CSS pixels per thread. A real canvas is finer; this is what reads on screen. */
const THREAD = 6.4;
/**
 * Seconds a full-strength mark takes to be absorbed by the ground.
 *
 * Long, because dispersal is doing most of the dimming already and the two
 * compound. At nine seconds a resting canvas was empty every time it was
 * photographed: blooms arrive about every two, and each was down to a fifth of
 * its strength — and spread thin on top of that — before the next one landed.
 */
const LIFE = 20.0;
/** Steps run in one frame to compose a finished painting under reduced motion. */
const BATCH = 300;
/** Steps run per redraw once composed, so a gated pointer mark still spreads. */
const NUDGE_STEPS = 10;
/**
 * Steps run once on mount, before the first frame anybody sees.
 *
 * A canvas that starts bare and fills up over the next half minute is empty for
 * exactly the part of the visit that decides anything — a visitor arriving at a
 * hero, a gallery tile being photographed and a screenshot are all the first
 * five seconds. This is those five seconds, run before the first frame, so the
 * page opens on a painting that has been going a while. It is not a decoration:
 * "never blank at rest" is the reason the resting bloom exists at all, and
 * without this it was only true after a wait nobody gives a page.
 */
const PRIME = 230;

/**
 * Diffusion coefficient, and it is a stability limit rather than a taste.
 *
 * The explicit five-point scheme is stable while K·Σw ≤ 1, and there are four
 * neighbours whose weights are at most 1 apiece. Anything above a quarter makes
 * the field oscillate and then explode, which does not look like paint.
 */
const K_MAX = 0.22;

/**
 * The stencil radii, cycled one per step.
 *
 * A single large radius is four visible lobes; a single small one does not move.
 * Cycling coarse and fine is a cheap multigrid — the wide steps carry pigment
 * across the picture and the narrow ones fill in what they jumped over, and the
 * four-lobed bias of any one of them is gone by the time four have run.
 */
const REACH = [1, 2, 4, 7];

/** So two elements on one page do not paint the same picture. */
let instances = 0;

/* ------------------------------------------------------------------ shaders */

/**
 * The cloth. Shared verbatim by both programs, because a weave in two places is
 * a weave that will disagree — and here the disagreement would be invisible in
 * a still and obvious in motion, with pigment wicking along threads that are
 * drawn somewhere else.
 */
const WEAVE = `
float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i), b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0)), d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

/**
 * The cloth's own wander, in thread units.
 *
 * Applied BEFORE anything is floored out of the coordinate, which is the whole
 * point: a hash grid is a grid, and at any size where the cells are nearly full
 * it shows as a square lattice — achlys's bead field paid for that lesson
 * already. It is evaluated ONCE per pixel and reused for every neighbour,
 * because it varies over about twenty threads and a neighbour is a fraction of
 * one. Sampling it five times would cost five times as much to return the same
 * number.
 */
vec2 warpOf(vec2 q) {
  return 0.34 * vec2(vnoise(q * 0.055), vnoise(q * 0.055 + 19.0)) - 0.17;
}

/** Thread height, 0–1. Both threads are present; (i + j) mod 2 says which is up. */
float weaveAt(vec2 q, vec2 w) {
  vec2 z = q + w;
  vec2 cell = floor(z);
  vec2 f = fract(z);
  float over = mod(cell.x + cell.y, 2.0);
  // Half-sine cross sections, because a thread is round. Warp runs vertically
  // so its section varies across x; weft is the other way about.
  float warp = sin(f.x * 3.14159265);
  float weft = sin(f.y * 3.14159265);
  return over > 0.5 ? max(weft, warp * 0.45) : max(warp, weft * 0.45);
}
`;

/**
 * The wash: one diffusion step, plus whatever was spilled this frame.
 *
 * `.rgb` is the density of three dyes and `.a` is how much water is still in
 * the ground. Wet pigment moves and dry pigment does not, which is the entire
 * behaviour — a spill runs fast while the ground is wet and locks as it dries.
 */
const FRAG_WASH = `
precision highp float;

uniform sampler2D u_prev;
uniform vec2  u_size;     // the state buffer, in its own pixels
uniform vec2  u_weave;    // threads across the element, x and y
uniform float u_dryStep;  // water lost this frame
uniform float u_absorb;   // pigment taken by the ground this frame
uniform float u_tooth;
uniform float u_ring;
uniform float u_reach;   // stencil radius, in state texels
uniform vec2  u_axis;    // the cross's direction this step; its perpendicular is the other arm
uniform float u_grain;
uniform float u_dither;   // 1 on the 8-bit path, 0 on half float
uniform float u_jitter;
uniform int   u_count;
uniform vec4  u_seg[${MAX_STAMPS}];   // xy = from, zw = to, in state px
uniform vec4  u_ink[${MAX_STAMPS}];   // rgb = which dyes, a = how much
uniform vec2  u_arm[${MAX_STAMPS}];   // x = radius px, y = water

${WEAVE}

/** Conductance: high in the valleys, low on the raised tooth. */
float condAt(vec2 q, vec2 w) {
  return mix(1.0, 1.0 - weaveAt(q, w) * 0.92, u_tooth);
}

float toSeg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-4), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  vec2 texel = 1.0 / u_size;
  vec2 uv = gl_FragCoord.xy * texel;

  vec4 s  = texture2D(u_prev, uv);
  /* Neighbours at u_reach texels, not at one, and on a ROTATING cross.
     
     A five-point stencil spreads like sqrt(2·K·n) TEXELS, so on a buffer three
     hundred wide it takes tens of thousands of frames to cross a tenth of the
     picture — the first render was a soft brush that never moved, and nothing
     in the code said it could not. Sampling at radius d multiplies the
     effective diffusivity by d² for the same four taps.
     
     What that buys in speed it loses in shape: four arms on the axes spread
     faster along them than between, and the blooms came out as octagons.
     Cycling the RADIUS does not fix it, because every radius has the same four
     directions. Cycling the ANGLE does — the cross is turned by the golden
     angle each step, so across a handful of steps the taps have covered a
     circle, and the arms stay perpendicular so the scheme is untouched. */
  vec2 offA = u_axis * u_reach * texel;
  vec2 offB = vec2(-u_axis.y, u_axis.x) * u_reach * texel;
  vec4 nL = texture2D(u_prev, uv - offA);
  vec4 nR = texture2D(u_prev, uv + offA);
  vec4 nD = texture2D(u_prev, uv - offB);
  vec4 nU = texture2D(u_prev, uv + offB);

  vec2 q = uv * u_weave;
  vec2 wp = warpOf(q);
  vec2 hopA = u_weave * offA;
  vec2 hopB = u_weave * offB;

  float c0 = condAt(q, wp);
  /* The EDGE weight is the mean of the two cells it joins, which makes it the
     same number seen from either side — and that symmetry is what makes the
     scheme conserve pigment. An asymmetric weight quietly creates or destroys
     paint, and the symptom is a wash that brightens as it spreads. */
  float cL = 0.5 * (c0 + condAt(q - hopA, wp));
  float cR = 0.5 * (c0 + condAt(q + hopA, wp));
  float cD = 0.5 * (c0 + condAt(q - hopB, wp));
  float cU = 0.5 * (c0 + condAt(q + hopB, wp));

  /* MAX, and this is the whole difference between a wash and a soft brush.
     Gated on the min of the two wetnesses — which is the reading that sounds
     right, since pigment travels in water — nothing can ever cross the edge of
     the wet patch, because the cell outside it is dry and the min is zero. The
     water cannot get out either, since its own spreading was gated the same
     way, so the mark locks inside the disc the stamp wetted and sits there
     looking like an airbrush. A wet cell beside a dry one is exactly where
     water goes, so the gate is the max: the wet side wets its neighbour and
     takes pigment with it. Max is symmetric, so nothing is created. */
  float gL = cL * max(s.a, nL.a);
  float gR = cR * max(s.a, nR.a);
  float gD = cD * max(s.a, nD.a);
  float gU = cU * max(s.a, nU.a);

  /* Fixed, at the stability limit. The spread dial moves the stencil's REACH
     instead, because the two are not equivalent: K is capped at a quarter by
     the scheme and reach is not, and spreading goes as reach SQUARED. Turning
     the dial into K could only ever buy a factor of one and a half; turning it
     into reach buys twenty. It also gives an honest zero — a reach under one
     texel samples the texel it started from, so spread at nil is a mark that
     never moves at all rather than one that moves imperceptibly. */
  float K = ${K_MAX.toFixed(3)};
  vec3 pig = s.rgb + K * (gL * (nL.rgb - s.rgb) + gR * (nR.rgb - s.rgb)
                        + gD * (nD.rgb - s.rgb) + gU * (nU.rgb - s.rgb));

  /* THE DRYING RING, and it is not drawn. Water leaves the middle of a wash
     before it leaves the rim, and the flow that replaces it carries pigment
     outward — which is why every watercolour wash has a dark edge and a pale
     centre. Written as a GATHER, because a fragment shader can only write to
     itself: what arrives here from wetter neighbours, minus what leaves here
     for drier ones. Both halves use the same edge weight, so this moves
     pigment about without inventing any. */
  vec3 gain = nL.rgb * max(nL.a - s.a, 0.0) * gL + nR.rgb * max(nR.a - s.a, 0.0) * gR
            + nD.rgb * max(nD.a - s.a, 0.0) * gD + nU.rgb * max(nU.a - s.a, 0.0) * gU;
  float loss = max(s.a - nL.a, 0.0) * gL + max(s.a - nR.a, 0.0) * gR
             + max(s.a - nD.a, 0.0) * gD + max(s.a - nU.a, 0.0) * gU;
  pig += u_ring * (gain - s.rgb * loss);

  /* Water spreads on the CONDUCTANCE alone, with no wetness in the gate at
     all. Anything else is the same lock one level down: a term that needs the
     neighbour to be wet before water can reach it. */
  float wet = s.a + K * 0.55 * (cL * (nL.a - s.a) + cR * (nR.a - s.a)
                              + cD * (nD.a - s.a) + cU * (nU.a - s.a));
  wet = max(wet - u_dryStep, 0.0);

  // The ground takes its share. Subtractive rather than proportional, so a mark
  // reaches exactly zero — a proportional decay leaves a permanent faint tint
  // and the canvas silts up.
  pig = max(pig - u_absorb, 0.0);

  vec2 p = gl_FragCoord.xy;
  float tooth = weaveAt(q, wp);

  for (int i = 0; i < ${MAX_STAMPS}; i++) {
    if (i >= u_count) break;
    vec4 sg = u_seg[i];
    float r = max(u_arm[i].x, 0.6);
    float d = toSeg(p, sg.xy, sg.zw);
    float k = 1.0 - smoothstep(r * 0.30, r, d);
    // Granulation at the moment of laying down: pigment catches in the valleys
    // and skips the tops, which is what breaks a fresh edge on cloth.
    k *= mix(1.0, 0.30 + 1.05 * (1.0 - tooth), u_grain);
    /* max(), never +=. Holding the pointer still over one spot stamps the
       same disc sixty times a second, and adding it lands on a black clipped
       hole inside a second — achlys learned this on its wipe and paint is no
       different. A max is also correct across dyes, because each one owns its
       own channel and a max per channel still lets two of them mix. */
    pig = max(pig, u_ink[i].rgb * k * u_ink[i].a);
    // Water is a max, not a sum: a spill wets the ground it lands on, and
    // holding the pointer still must not flood it without limit.
    wet = max(wet, k * u_arm[i].y);
  }

  pig = min(pig, vec3(1.0));
  wet = min(wet, 1.0);

  /* Dither, on the 8-bit path only, and gated on there being something to
     dither. Diffusion in 8 bits STALLS: once neighbours are within 1/255 the
     weighted mean rounds back to the value it started from and the field stops
     moving, mid-bloom, with a visible plateau. A per-pixel half-step makes the
     rounding stochastic so it keeps creeping. Gated, because lifting an empty
     pixel would seed permanent speckle on a canvas that is supposed to clear. */
  float dj = (hash21(p + u_jitter) - 0.5) * u_dither / 255.0;
  vec3 live = step(vec3(0.5 / 255.0), pig);
  gl_FragColor = vec4(clamp(pig + dj * live, 0.0, 1.0),
                      clamp(wet + dj * step(0.5 / 255.0, wet), 0.0, 1.0));
}
`;

/** The visible pass: the primed cloth, lit, with the dyes over it. */
const FRAG_GROUND = `
precision highp float;

uniform vec2  iResolution;
uniform sampler2D u_wash;
uniform vec2  u_washSize;
uniform vec2  u_weave;
uniform vec3  u_ground;
uniform vec3  u_abs1;
uniform vec3  u_abs2;
uniform vec3  u_abs3;
uniform vec3  u_light;
uniform float u_tooth;
uniform float u_grain;

${WEAVE}

/**
 * Bilinear by hand, because the state texture is NEAREST.
 *
 * A half-float render target cannot be filtered without
 * OES_texture_half_float_linear, and depending on a second extension for the
 * picture to be smooth rather than blocky is a bug waiting for a phone that has
 * the first and not the second. Four taps and two mixes are exact on both
 * paths and cost less than the branch would.
 */
vec4 bilerp(vec2 uv) {
  vec2 p = uv * u_washSize - 0.5;
  vec2 i = floor(p), f = fract(p);
  vec2 tx = 1.0 / u_washSize;
  vec4 a = texture2D(u_wash, (i + vec2(0.5, 0.5)) * tx);
  vec4 b = texture2D(u_wash, (i + vec2(1.5, 0.5)) * tx);
  vec4 c = texture2D(u_wash, (i + vec2(0.5, 1.5)) * tx);
  vec4 d = texture2D(u_wash, (i + vec2(1.5, 1.5)) * tx);
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

/**
 * Linear out to sRGB, and this component is the first on the shelf that needs
 * it. Every other field here is dark, where writing linear values straight to
 * the buffer is a shift nobody can see. On a near-white primed ground it is the
 * difference between canvas and grey card: #efe9dd computes to 0.86 in linear,
 * and 0.86 written to an untagged buffer displays as #dcd8cf.
 */
vec3 encode(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution;
  vec4 s = bilerp(uv);

  vec2 q = uv * u_weave;
  vec2 wp = warpOf(q);
  float h = weaveAt(q, wp);

  /* The cloth's own slope is its normal, from a function that costs two sines.
     A third of a thread, deliberately: differencing tighter measures the warp
     noise instead of the thread and lays a hatching over everything, which is
     the epsilon lesson iris paid for. */
  float e = 0.33;
  float hx = weaveAt(q + vec2(e, 0.0), wp) - weaveAt(q - vec2(e, 0.0), wp);
  float hy = weaveAt(q + vec2(0.0, e), wp) - weaveAt(q - vec2(0.0, e), wp);
  vec3 n = normalize(vec3(-hx * u_tooth * 2.4, -hy * u_tooth * 2.4, 1.0));

  float lit = 0.66 + 0.34 * max(dot(n, u_light), 0.0);
  vec3 ground = u_ground * mix(1.0, lit, 0.15 + 0.85 * u_tooth);

  /* Granulation in the render, as well as at the stamp. The same density reads
     darker where the cloth is low, because that is where the pigment settled —
     this is the one term that makes it paint on a fabric rather than paint on a
     screen, and without it the weave is decoration. */
  vec3 dens = s.rgb * mix(1.0, 0.40 + 1.15 * (1.0 - h), u_grain);

  /* Beer-Lambert over three dyes. Transmittance MULTIPLIES, which is what makes
     this subtractive: blue over yellow comes out green, and two washes crossing
     are darker than either. Summing pigment in RGB instead would make the
     crossing brighter, which is the tell. */
  vec3 trans = exp(-(u_abs1 * dens.r + u_abs2 * dens.g + u_abs3 * dens.b));

  /* AND A BODY TERM, because transmittance alone cannot survive a dark ground.
     The ground is the buyer's to set, and on anything near black the ground
     times the transmittance is a near-zero times a number under one: it vanishes
     and nothing says why. That is true of real watercolour — a transparent wash
     on black paper is close to invisible — but a component that dies silently
     on a documented property is a footgun rather than a fact.
     So the pigment also scatters a little of its own colour back. The tint is
     the transmittance of the same mixture at unit density, which keeps the
     mixing subtractive: blue over yellow still scatters green. At half
     strength it is nearly invisible over a light ground and it is the only
     thing visible over a dark one, which is the right shape for both. */
  float total = max(dens.r + dens.g + dens.b, 1e-3);
  vec3 unit = dens / max(total, 1.0);
  vec3 tint = exp(-(u_abs1 * unit.r + u_abs2 * unit.g + u_abs3 * unit.b));
  vec3 col = ground * trans + tint * (1.0 - trans) * 0.55;

  // Wet paint is glossy and dry paint is not, which is most of what says a
  // mark is fresh without any of it being drawn.
  vec3 hv = normalize(u_light + vec3(0.0, 0.0, 1.0));
  col += pow(max(dot(n, hv), 0.0), 30.0) * s.a * 0.16;

  gl_FragColor = vec4(encode(col), 1.0);
}
`;

const GROUND_UNIFORMS = [
  'iResolution', 'u_wash', 'u_washSize', 'u_weave', 'u_ground',
  'u_abs1', 'u_abs2', 'u_abs3', 'u_light', 'u_tooth', 'u_grain',
] as const;

const WASH_UNIFORMS = [
  'u_prev', 'u_size', 'u_weave', 'u_dryStep', 'u_absorb',
  'u_tooth', 'u_ring', 'u_grain', 'u_dither', 'u_jitter', 'u_reach', 'u_axis', 'u_count',
  'u_seg[0]', 'u_ink[0]', 'u_arm[0]',
] as const;

/* ------------------------------------------------------------------ targets */

interface Target {
  fb: WebGLFramebuffer;
  tex: WebGLTexture;
  w: number;
  h: number;
}

/**
 * A state buffer, at the best precision the machine will render to.
 *
 * Half float where it exists, because 8-bit diffusion stalls — and the check is
 * `checkFramebufferStatus` rather than the extension's presence, since a
 * context can expose `OES_texture_half_float` for sampling and refuse to render
 * into one. Asking the question the framebuffer answers is the only way to know.
 */
const target = (
  gl: WebGLRenderingContext,
  w: number,
  h: number,
  type: number,
): Target | null => {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, type, null);
  // NEAREST on both: half-float filtering needs a second extension, and the
  // visible pass interpolates by hand instead. See `bilerp`.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const fb = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  if (!ok) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteFramebuffer(fb);
    gl.deleteTexture(tex);
    return null;
  }
  // Cleared to nothing: no pigment, and a bone-dry ground.
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { fb, tex, w, h };
};

/* ---------------------------------------------------------------- component */

export class AnthemionKhysis extends Base {
  static observedAttributes = [
    'spill', 'spread', 'dry', 'tooth', 'load', 'grain',
    'gate', 'drift', 'render', 'place',
  ];

  private gl: WebGLRenderingContext | null = null;
  private ground: WebGLProgram | null = null;
  private wash: WebGLProgram | null = null;
  private washLoc: Record<string, WebGLUniformLocation | null> = {};
  private front: Target | null = null;
  private back: Target | null = null;
  /** The type the state buffer actually got. Reported on the host, diagnostic. */
  private texType = 0;
  private eightBit = true;

  /** The stamps for this frame, filled by `upload` and spent by `paint`. */
  private segs = new Float32Array(MAX_STAMPS * 4);
  private inks = new Float32Array(MAX_STAMPS * 4);
  private arms = new Float32Array(MAX_STAMPS * 2);
  private stamps = 0;

  /**
   * Sub-step remainders, banked.
   *
   * On the 8-bit path a frame's share of a nine-second absorption is a fiftieth
   * of one representable step, so spending it directly spends nothing at all
   * and the canvas never clears. Accumulated and spent whole, exactly as achlys
   * banks its re-fog. On half float there is nothing to bank and the debt is
   * spent in full every frame.
   */
  private absorbDebt = 0;
  private dryDebt = 0;

  private lastPhase = 0;
  private bloomAt = 0.6;
  private bloomN = 0;
  /** Has the live path laid its opening painting? Per context and per size. */
  private primed = false;
  private seed = (instances++) * 37.13;
  private composed = false;

  /** Where the pointer is, in client coordinates, or null if it has left. */
  private aim: { x: number; y: number } | null = null;
  /** Where the stroke was last frame, in uv. Null means the stroke starts here. */
  private from: { x: number; y: number } | null = null;
  private listening = false;
  private pending = 0;

  private field = new Field({
    host: this,
    name: 'anthemion-khysis',
    frag: FRAG_GROUND,
    uniforms: GROUND_UNIFORMS,
    // Phase is seconds at drift 100, which is what every rate in here is
    // written in — one clock, and `drift` scales all of it together.
    speed: 1,
    render: 80,
    rate: () => clampInt(this.getAttribute('drift'), 100, 0, 200) / 100,
    attach: (gl, program) => this.build(gl, program),
    frame: (f) => this.upload(f),
    draw: (f) => this.paint(f),
  });

  connectedCallback() {
    this.field.mount();
    this.syncGate();
  }

  disconnectedCallback() {
    this.field.unmount();
    this.listen(false);
    cancelAnimationFrame(this.pending);
    this.pending = 0;
  }

  attributeChangedCallback() {
    // Fires before connectedCallback for attributes present in the markup, so
    // the harness ignores the refresh until there is something to draw into.
    this.syncGate();
    // A changed dial has to re-settle the reduced-motion painting, or the
    // finished state on screen is the one the old attributes composed.
    this.composed = false;
    this.field.refresh();
  }

  /* ------------------------------------------------------------- the gate */

  /**
   * Named `syncGate` and not `gate`: `gate` is an observed attribute, and React
   * sets a PROPERTY whenever the name already exists on a custom element — so a
   * method called `gate` is silently replaced by the string "pointer" and throws
   * the next time anything calls it. `check:registration` enforces this.
   */
  private syncGate() {
    this.listen(this.getAttribute('gate') === 'pointer');
  }

  private listen(on: boolean) {
    if (on === this.listening) return;
    this.listening = on;
    if (on) {
      document.addEventListener('pointermove', this.onMove, { passive: true });
      // On the root element, not on `document`: pointerleave does not bubble.
      document.documentElement.addEventListener('pointerleave', this.onLeave);
      return;
    }
    document.removeEventListener('pointermove', this.onMove);
    document.documentElement.removeEventListener('pointerleave', this.onLeave);
    this.aim = null;
    this.from = null;
  }

  private onMove = (e: PointerEvent) => {
    this.aim = { x: e.clientX, y: e.clientY };
    this.nudge();
  };

  /**
   * The stroke is dropped with the pointer. Kept, it would join where the
   * pointer left to wherever it came back and drag a line of paint across the
   * canvas that nobody's hand ever made.
   */
  private onLeave = () => {
    this.aim = null;
    this.from = null;
  };

  /**
   * Under reduced motion the harness draws one frame and never loops, so
   * nothing is running to pick a new pointer position up — the gate asks for
   * the redraw itself, coalesced to one a frame because a sweep fires far more
   * often than a display refreshes.
   */
  private nudge() {
    if (!prefersReducedMotion() || this.pending) return;
    this.pending = requestAnimationFrame(() => {
      this.pending = 0;
      this.field.refresh();
    });
  }

  /* ----------------------------------------------------------- the context */

  private build(gl: WebGLRenderingContext, program: WebGLProgram) {
    this.gl = gl;
    this.ground = program;
    this.front = null;
    this.back = null;
    this.composed = false;
    this.primed = false;

    /* One buffer for both programs, so they have to agree on the attribute's
       index. The harness's program is already linked and cannot be told what to
       use, so the wash program is told to match it. */
    const slot = gl.getAttribLocation(program, 'a_position');
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(slot);
    gl.vertexAttribPointer(slot, 2, gl.FLOAT, false, 0, 0);

    const bind = (p: WebGLProgram) => gl.bindAttribLocation(p, slot, 'a_position');
    this.wash = linkProgram(gl, FULLSCREEN_VERT, FRAG_WASH, '<anthemion-khysis>', bind);
    if (this.wash) {
      for (const n of WASH_UNIFORMS) this.washLoc[n] = gl.getUniformLocation(this.wash, n);
    }

    const half = gl.getExtension('OES_texture_half_float');
    this.texType = half ? half.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;
    this.eightBit = !half;

    gl.disable(gl.BLEND);
    gl.disable(gl.DEPTH_TEST);
  }

  /** Half the drawing buffer, capped. The wash does not need the full grid. */
  private size(gl: WebGLRenderingContext, w: number, h: number) {
    const k = Math.min(0.38, WASH_MAX / Math.max(w, h, 1));
    const ww = Math.max(4, Math.round(w * k));
    const wh = Math.max(4, Math.round(h * k));
    if (this.front?.w === ww && this.front.h === wh) return;

    for (const t of [this.front, this.back]) {
      if (!t) continue;
      gl.deleteFramebuffer(t.fb);
      gl.deleteTexture(t.tex);
    }
    this.front = target(gl, ww, wh, this.texType);
    if (!this.front && this.texType !== gl.UNSIGNED_BYTE) {
      // The extension was there and the driver will not render into it. Say so
      // once, then take the 8-bit path with the dither on.
      console.warn(
        '<anthemion-khysis> half-float render targets are unavailable here; ' +
          'the wash runs at 8 bits with dithered rounding.',
      );
      this.texType = gl.UNSIGNED_BYTE;
      this.eightBit = true;
      this.front = target(gl, ww, wh, this.texType);
    }
    this.back = this.front ? target(gl, ww, wh, this.texType) : null;
    this.composed = false;
    this.primed = false;
    this.dataset['precision'] = this.eightBit ? 'byte' : 'half';
  }

  /* ------------------------------------------------------------ the frame */

  /**
   * Everything the wash needs for one step, and the ground's own uniforms.
   *
   * Stamps are computed here rather than in `paint` because this is where the
   * element's box is already being measured — and measuring layout inside the
   * pointer handler instead would read it on every single move event.
   */
  private upload(f: Frame) {
    const { gl, loc, w, h, phase, probe, reduced } = f;
    this.size(gl, w, h);

    const ground = readColour(probe, '--khysis-ground', '#efe9dd');
    const dyes: [number, number, number][] = [
      readColour(probe, '--khysis-first', '#1b3f8f'),
      readColour(probe, '--khysis-second', '#b32338'),
      readColour(probe, '--khysis-third', '#d9a01e'),
    ];

    const cw = Math.max(1, this.clientWidth);
    const ch = Math.max(1, this.clientHeight);
    const weave: [number, number] = [cw / THREAD, ch / THREAD];

    const tooth = clampInt(this.getAttribute('tooth'), 55, 0, 100) / 100;
    const grain = clampInt(this.getAttribute('grain'), 45, 0, 100) / 100;

    gl.uniform2f(loc['iResolution']!, w, h);
    gl.uniform2f(loc['u_washSize']!, this.front?.w ?? 1, this.front?.h ?? 1);
    gl.uniform2f(loc['u_weave']!, weave[0], weave[1]);
    gl.uniform3f(loc['u_ground']!, ground[0], ground[1], ground[2]);
    /**
     * A dye's property is the colour it TRANSMITS at unit density, so its
     * absorption is −log of that. Floored, because a pure `#000` pigment is an
     * infinite absorption and would turn the whole channel into a hard edge.
     */
    const absorb = (c: [number, number, number]) =>
      c.map((v) => -Math.log(Math.max(v, 0.004))) as [number, number, number];
    const names = ['u_abs1', 'u_abs2', 'u_abs3'] as const;
    for (let i = 0; i < 3; i++) {
      const a = absorb(dyes[i]!);
      gl.uniform3f(loc[names[i]!]!, a[0], a[1], a[2]);
    }
    // A fixed key from the upper left, the direction a painter sets a lamp.
    // No `sky` read: a canvas is indoors, and a stretcher does not have an hour.
    gl.uniform3f(loc['u_light']!, -0.46, 0.60, 0.66);
    gl.uniform1f(loc['u_tooth']!, tooth);
    gl.uniform1f(loc['u_grain']!, grain);
    gl.uniform1i(loc['u_wash']!, 0);

    // Phase is seconds. Clamped, because a backgrounded tab hands back a delta
    // of minutes on resume and the ground would dry in one step.
    const dt = Math.max(0, Math.min(0.1, phase - this.lastPhase));
    this.lastPhase = phase;
    this.prepare(dt, reduced);
  }

  /** The stamps for this frame: the pointer's stroke, and any bloom due. */
  private prepare(dt: number, reduced: boolean) {
    const mw = this.front?.w ?? 1;
    const mh = this.front?.h ?? 1;
    const load = clampInt(this.getAttribute('load'), 82, 0, 100) / 100;
    const spill = clampInt(this.getAttribute('spill'), 72, 0, 100) / 100;
    this.stamps = 0;

    const put = (
      ax: number, ay: number, bx: number, by: number,
      ink: [number, number, number], amount: number, radius: number, water: number,
    ) => {
      if (this.stamps >= MAX_STAMPS) return;
      const i = this.stamps++;
      this.segs[i * 4] = ax * mw;
      this.segs[i * 4 + 1] = ay * mh;
      this.segs[i * 4 + 2] = bx * mw;
      this.segs[i * 4 + 3] = by * mh;
      this.inks[i * 4] = ink[0];
      this.inks[i * 4 + 1] = ink[1];
      this.inks[i * 4 + 2] = ink[2];
      this.inks[i * 4 + 3] = amount;
      this.arms[i * 2] = radius * mh;
      this.arms[i * 2 + 1] = water;
    };

    /* The pointer. A CAPSULE from where the stroke was to where it is, never a
       dot: at any real pointer speed the gaps between frames are wider than the
       brush, and a component that stamps dots draws a dotted line. */
    const aim = this.aim;
    if (aim) {
      const box = this.getBoundingClientRect();
      if (box.width > 0 && box.height > 0) {
        const at = {
          x: (aim.x - box.left) / box.width,
          // Flipped: the pointer measures down the page and a texture measures up.
          y: 1 - (aim.y - box.top) / box.height,
        };
        /* Proximity, not containment. A pointer that has to be INSIDE the
           element is a hover test wearing different clothes, and it would make
           a fixed backdrop respond only when the pointer was over the one
           element it can never be over. */
        const near = at.x > -0.15 && at.x < 1.15 && at.y > -0.15 && at.y < 1.15;
        if (near) {
          const a = this.from ?? at;
          // The pointer walks the palette rather than picking one dye, so a
          // sustained stroke lays down all three and they mix where it crosses
          // itself — which is the whole demonstration, for free.
          put(a.x, a.y, at.x, at.y, this.palette(this.lastPhase * 0.085),
            0.30 + 0.55 * load, 0.028 + 0.055 * load, 0.92);
          this.from = at;
        } else {
          this.from = null;
        }
      }
    }

    /* Blooms arriving by themselves, so the canvas is never empty. Positions
       come from `seeded` off a per-element offset: deterministic, so a reload
       repaints the same picture, and different per element, so two on one page
       are not the same picture twice. */
    this.bloomAt -= dt;
    if (spill > 0 && this.bloomAt <= 0) {
      const n = this.bloomN++;
      const s = this.seed;
      put(
        0.12 + 0.76 * seeded(n * 3.7 + s),
        0.12 + 0.76 * seeded(n * 5.3 + s + 91),
        0.12 + 0.76 * seeded(n * 3.7 + s),
        0.12 + 0.76 * seeded(n * 5.3 + s + 91),
        this.palette(seeded(n * 7.1 + s + 13)),
        0.42 + 0.55 * load,
        0.045 + 0.075 * seeded(n * 11.9 + s + 41),
        0.95,
      );
      this.bloomAt = 0.28 + (1 - spill) * 2.8;
    }

    /* Both rates are banked. See absorbDebt: a frame's share of a nine-second
       absorption is well under one 8-bit step, and spending it directly spends
       nothing at all. */
    const dry = clampInt(this.getAttribute('dry'), 22, 0, 100) / 100;
    this.absorbDebt += dt / LIFE;
    this.dryDebt += dt / (1.6 + (1 - dry) * 13.0);
    // Reduced motion runs its whole painting inside one frame, so a wall-clock
    // delta is meaningless there — the batch supplies its own step instead.
    if (reduced) {
      this.absorbDebt = 0;
      this.dryDebt = 0;
    }
  }

  /** Which dyes a mark is made of, as channel weights that sum to one. */
  private palette(t: number): [number, number, number] {
    const u = (t - Math.floor(t)) * 3;
    const i = Math.floor(u);
    const f = u - i;
    const w: [number, number, number] = [0, 0, 0];
    w[i % 3] = 1 - f;
    w[(i + 1) % 3] = f;
    return w;
  }

  private reachN = 0;
  private reachScale = 1;

  /** One diffusion step, into `back`, then swap. */
  private step(gl: WebGLRenderingContext, absorb: number, dryStep: number, jitter: number) {
    const front = this.front;
    const back = this.back;
    if (!front || !back || !this.wash) return;

    gl.bindFramebuffer(gl.FRAMEBUFFER, back.fb);
    gl.viewport(0, 0, back.w, back.h);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, front.tex);

    gl.uniform1i(this.washLoc['u_prev']!, 0);
    gl.uniform2f(this.washLoc['u_size']!, back.w, back.h);
    gl.uniform1f(this.washLoc['u_absorb']!, absorb);
    gl.uniform1f(this.washLoc['u_dryStep']!, dryStep);
    gl.uniform1f(this.washLoc['u_jitter']!, jitter);
    const n = this.reachN++;
    gl.uniform1f(this.washLoc['u_reach']!, REACH[n % REACH.length]! * this.reachScale);
    // 137.5°, the angle a plant puts its next thing at, and for the same reason:
    // no small number of successive steps lands on the same axis twice.
    const a = n * 2.39996322;
    gl.uniform2f(this.washLoc['u_axis']!, Math.cos(a), Math.sin(a));
    gl.uniform1i(this.washLoc['u_count']!, this.stamps);
    gl.uniform4fv(this.washLoc['u_seg[0]']!, this.segs);
    gl.uniform4fv(this.washLoc['u_ink[0]']!, this.inks);
    gl.uniform2fv(this.washLoc['u_arm[0]']!, this.arms);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    this.front = back;
    this.back = front;
  }

  /**
   * The wash pass, then the cloth.
   *
   * Both halves of the contract with the harness are paid here and neither is
   * optional. THE PROGRAM IS PUT BACK, because `upload` runs before this on the
   * next frame and would otherwise send the ground's uniforms to the wash. And
   * THE VIEWPORT IS PUT BACK, because the harness sets it only when the canvas
   * changes size, while this changes it every frame.
   */
  private paint({ gl, loc, w, h, reduced }: Frame) {
    if (this.wash && this.ground && this.front && this.back) {
      gl.useProgram(this.wash);
      const cw = Math.max(1, this.clientWidth);
      const chh = Math.max(1, this.clientHeight);
      gl.uniform2f(this.washLoc['u_weave']!, cw / THREAD, chh / THREAD);
      this.reachScale = 0.4 + 1.6 * (clampInt(this.getAttribute('spread'), 80, 0, 100) / 100);
      gl.uniform1f(this.washLoc['u_tooth']!,
        clampInt(this.getAttribute('tooth'), 55, 0, 100) / 100);
      gl.uniform1f(this.washLoc['u_grain']!,
        clampInt(this.getAttribute('grain'), 45, 0, 100) / 100);
      gl.uniform1f(this.washLoc['u_ring']!, 0.18);
      gl.uniform1f(this.washLoc['u_dither']!, this.eightBit ? 1 : 0);

      if (reduced) {
        /**
         * REDUCED MOTION IS A FINISHED PAINTING, NOT A BLANK CANVAS.
         *
         * No loop is ever started here, so "the finished state, immediately"
         * cannot mean the first frame of the simulation — that is a primed
         * ground with one mark on it. The whole thing is run inside this one
         * frame instead: three hundred steps with blooms seeded through them,
         * which arrives at the same picture a reader watching for half a minute
         * would have seen, and then stops. Afterwards a redraw runs only a
         * handful of steps, so a gated pointer mark still spreads rather than
         * sitting on the cloth as a disc.
         */
        this.settle(gl, this.composed ? NUDGE_STEPS : BATCH);
        this.composed = true;
      } else if (!this.primed) {
        /* The opening painting, run once. Kept separate from `composed`, which
           an attribute change resets: re-priming on every input event would
           cost a hundred and fifty passes per slider tick AND wipe whatever the
           visitor had just painted, which is the wrong answer to both. */
        this.primed = true;
        this.settle(gl, PRIME);
      } else {
        // Spent in whole 1/255 steps on the 8-bit path; the remainder is banked.
        const q = this.eightBit ? 255 : 0;
        const absorb = q ? Math.floor(this.absorbDebt * q) / q : this.absorbDebt;
        const dryStep = q ? Math.floor(this.dryDebt * q) / q : this.dryDebt;
        this.absorbDebt -= absorb;
        this.dryDebt -= dryStep;
        this.step(gl, absorb, dryStep, this.lastPhase * 61.7);
      }

      gl.useProgram(this.ground);
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, w, h);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.front?.tex ?? null);
    gl.uniform2f(loc['u_washSize']!, this.front?.w ?? 1, this.front?.h ?? 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  /**
   * Run the simulation forward inside one frame.
   *
   * The stamps prepared for this frame are laid on the first step only — a
   * stamp repeated three hundred times is a hole, not a mark — and blooms are
   * dealt through the rest on the same schedule the loop would have used.
   */
  private settle(gl: WebGLRenderingContext, steps: number) {
    const dt = 1 / 30;
    const dry = clampInt(this.getAttribute('dry'), 22, 0, 100) / 100;
    const absorb = dt / LIFE;
    const dryStep = dt / (1.6 + (1 - dry) * 13.0);
    const q = this.eightBit ? 255 : 0;
    // Banked inside the loop exactly as the live path banks it, rather than
    // spent every Nth step by a rule of thumb: a step's share of a nine-second
    // absorption is smaller than one 8-bit unit, and rounding it to zero three
    // hundred times over composes a painting that never clears anything.
    let aDebt = 0;
    let dDebt = 0;

    const spill = clampInt(this.getAttribute('spill'), 72, 0, 100) / 100;
    const load = clampInt(this.getAttribute('load'), 82, 0, 100) / 100;
    let due = 0;

    for (let i = 0; i < steps; i++) {
      if (i > 0) {
        this.stamps = 0;
        due -= dt;
        if (spill > 0 && due <= 0) {
          const n = this.bloomN++;
          const s = this.seed;
          const x = 0.12 + 0.76 * seeded(n * 3.7 + s);
          const y = 0.12 + 0.76 * seeded(n * 5.3 + s + 91);
          const mw = this.front?.w ?? 1;
          const mh = this.front?.h ?? 1;
          this.segs[0] = x * mw;
          this.segs[1] = y * mh;
          this.segs[2] = x * mw;
          this.segs[3] = y * mh;
          const ink = this.palette(seeded(n * 7.1 + s + 13));
          this.inks[0] = ink[0];
          this.inks[1] = ink[1];
          this.inks[2] = ink[2];
          this.inks[3] = 0.42 + 0.55 * load;
          this.arms[0] = (0.045 + 0.075 * seeded(n * 11.9 + s + 41)) * mh;
          this.arms[1] = 0.95;
          this.stamps = 1;
          due = 0.28 + (1 - spill) * 2.8;
        }
      }
      aDebt += absorb;
      dDebt += dryStep;
      const pay = q ? Math.floor(aDebt * q) / q : aDebt;
      const payDry = q ? Math.floor(dDebt * q) / q : dDebt;
      aDebt -= pay;
      dDebt -= payDry;
      this.step(gl, pay, payDry, i * 13.7 + this.seed);
    }
  }
}

export const defineKhysis = () => {
  if (!customElements.get('anthemion-khysis')) {
    customElements.define('anthemion-khysis', AnthemionKhysis);
  }
};
/* Copy-in: this file, plus base.ts, reveal.ts and raymarch.ts. See index.ts. */
if (typeof customElements !== 'undefined') defineKhysis();
