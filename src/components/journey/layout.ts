/**
 * layout.ts — single source of truth for the horizontal world's geometry.
 *
 * All positions are in viewport-width (vw) units: multiply by
 * windowSize.width to get pixels. Section starts, waypoints, the chest
 * and the process progress ramp are all derived from SECTIONS — change
 * a width here and everything stays in agreement.
 */

export type SectionId = 'hero' | 'projects' | 'process' | 'contact';

export interface SectionDef {
  id: SectionId;
  bg: number;           // parallax background set number
  width: number;        // desktop width, vw units
  widthMobile?: number; // mobile (<768px) override
}

export const SECTIONS: SectionDef[] = [
  { id: 'hero',     bg: 1, width: 1.5 },
  { id: 'projects', bg: 2, width: 2.2 },
  { id: 'process',  bg: 4, width: 1, widthMobile: 2 },
  { id: 'contact',  bg: 3, width: 1 },
];

const def = (id: SectionId): SectionDef => SECTIONS.find((s) => s.id === id)!;

export const widthOf = (id: SectionId, isMobile: boolean): number => {
  const s = def(id);
  return isMobile && s.widthMobile !== undefined ? s.widthMobile : s.width;
};

export const startOf = (id: SectionId, isMobile: boolean): number => {
  let x = 0;
  for (const s of SECTIONS) {
    if (s.id === id) return x;
    x += widthOf(s.id, isMobile);
  }
  return 0;
};

export const totalWidth = (isMobile: boolean): number =>
  SECTIONS.reduce((acc, s) => acc + widthOf(s.id, isMobile), 0);

/** Scrollable range = total content minus the one visible viewport. */
export const maxScrollVw = (isMobile: boolean): number => totalWidth(isMobile) - 1;

/**
 * Scroll window (vw) the project book plays over. It used to run 1.2vw from
 * the projects start, leaving ~0.3vw of bare landscape before it (hero copy
 * gone, book not yet arrived) and ~0.4vw after it (book closed, process
 * tablets still off screen). It now opens as the hero copy leaves and closes
 * as the first tablet comes into view.
 */
export const bookWindow = (isMobile: boolean): { startVw: number; spanVw: number } => {
  const startVw = startOf('projects', isMobile) - 0.2;
  // Mobile tablets stay hidden until the process section itself is reached
  // (processProgress has no lead-in there), so the book can run closer to it.
  const endVw = startOf('process', isMobile) - (isMobile ? 0.2 : 0.85);
  return { startVw, spanVw: endVw - startVw };
};

/** Chest sits 0.5vw into the farewell section (+60px applied by caller). */
export const chestVw = (isMobile: boolean): number => startOf('contact', isMobile) + 0.5;

export interface WaypointDef {
  label: string;
  x: number;        // signpost world position, vw units
  targetVw: number; // fast-travel scroll destination, vw units
  showArrow: boolean;
}

export const waypointDefs = (isMobile: boolean): WaypointDef[] => [
  { label: 'work',             x: 0.5,                                targetVw: startOf('projects', isMobile), showArrow: true },
  { label: 'process',          x: startOf('process', isMobile) - 1.1, targetVw: startOf('process', isMobile),  showArrow: true },
  { label: 'contact',          x: startOf('contact', isMobile) - 1,   targetVw: startOf('contact', isMobile),  showArrow: true },
  { label: 'rest, traveller.', x: startOf('contact', isMobile),       targetVw: startOf('contact', isMobile),  showArrow: false },
];

/**
 * 0..1 progress through the process section.
 * Desktop ramps over 1vw starting one viewport before the section
 * (so tablets rise as it enters); mobile ramps across the section itself.
 */
export const processProgress = (scrollX: number, vw: number, isMobile: boolean): number => {
  if (vw === 0) return 0;
  const xVw = scrollX / vw;
  const leadIn = isMobile ? 0 : 1;
  const span = isMobile ? widthOf('process', true) : 1;
  return Math.max(0, Math.min(1, (xVw - (startOf('process', isMobile) - leadIn)) / span));
};
