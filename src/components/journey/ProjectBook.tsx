'use client';
import React, { useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const PROJECTS = [
  { title: 'Craon', subtitle: 'AI Video Editor · SaaS', role: 'Lead Frontend Engineer', image: '/craon/craon-hero.png', route: '/works/craon' },
  { title: 'MelloUp', subtitle: 'Event Marketing · MVP', role: 'Founding Engineer', image: '/melloup/melloup.png', route: '/works/melloup' },
  { title: 'Ibasho', subtitle: 'Brand · UI/UX · Web', role: 'Lead Designer & Developer', image: '/ibasho/ibashoo.png', route: '/works/ibasho' },
  { title: 'FreightEZ', subtitle: 'Fleet TMS · B2B SaaS', role: 'Frontend Engineer', image: '/freightez/freightez-hero.png', route: '/works/freightez' },
];

const FRAME_PX = 272;

// Phase breakpoints as fraction of section scroll range (1.2vw)
const B = {
  OPEN_END:    0.15,
  TURN_01_S:   0.28, TURN_01_E: 0.35,
  TURN_12_S:   0.48, TURN_12_E: 0.55,
  TURN_23_S:   0.68, TURN_23_E: 0.75,
  CLOSE_START: 0.88,
};

interface Phase {
  sprite: string;
  cols: number;
  rows: number;
  totalFrames: number;
  frame: number;
  projectIdx: number;
  showContent: boolean;
}

function computePhase(t: number): Phase | null {
  if (t <= 0 || t >= 1) return null;

  const open   = { sprite: '/book/Open_book.png',           cols: 4, rows: 3, totalFrames: 12 };
  const close  = { sprite: '/book/Close_book.png',          cols: 4, rows: 3, totalFrames: 12 };
  const turn   = { sprite: '/book/Turning_pages_left.png',  cols: 4, rows: 4, totalFrames: 16 };

  const frameOf = (progress: number, total: number) => Math.min(total - 1, Math.floor(progress * total));

  // Opening
  if (t < B.OPEN_END) {
    return { ...open, frame: frameOf(t / B.OPEN_END, 12), projectIdx: 0, showContent: false };
  }
  // Project 0
  if (t < B.TURN_01_S) {
    return { ...open, frame: 11, projectIdx: 0, showContent: true };
  }
  // Turn 0 → 1
  if (t < B.TURN_01_E) {
    return { ...turn, frame: frameOf((t - B.TURN_01_S) / (B.TURN_01_E - B.TURN_01_S), 16), projectIdx: 0, showContent: false };
  }
  // Project 1
  if (t < B.TURN_12_S) {
    return { ...open, frame: 11, projectIdx: 1, showContent: true };
  }
  // Turn 1 → 2
  if (t < B.TURN_12_E) {
    return { ...turn, frame: frameOf((t - B.TURN_12_S) / (B.TURN_12_E - B.TURN_12_S), 16), projectIdx: 1, showContent: false };
  }
  // Project 2
  if (t < B.TURN_23_S) {
    return { ...open, frame: 11, projectIdx: 2, showContent: true };
  }
  // Turn 2 → 3
  if (t < B.TURN_23_E) {
    return { ...turn, frame: frameOf((t - B.TURN_23_S) / (B.TURN_23_E - B.TURN_23_S), 16), projectIdx: 2, showContent: false };
  }
  // Project 3
  if (t < B.CLOSE_START) {
    return { ...open, frame: 11, projectIdx: 3, showContent: true };
  }
  // Closing
  return { ...close, frame: frameOf((t - B.CLOSE_START) / (1 - B.CLOSE_START), 12), projectIdx: 3, showContent: false };
}

interface ProjectBookProps {
  scrollX: number;
}

const ProjectBook: React.FC<ProjectBookProps> = ({ scrollX }) => {
  const router = useRouter();

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Section: starts when scrollX = 1vw, spans 1.2vw of scroll
  const sectionStart = vw;
  const sectionRange = vw * 1.2;
  const t = Math.max(0, Math.min(1, (scrollX - sectionStart) / sectionRange));

  // Book size: fill most of the viewport without overflow
  const bookSize = Math.round(Math.min(vh * 0.88, vw * 0.56));
  const scale = bookSize / FRAME_PX;

  const phase = useMemo(() => computePhase(t), [t]);

  if (!phase) return null;

  const { sprite, cols, rows, frame, projectIdx, showContent } = phase;
  const project = PROJECTS[projectIdx];

  const col = frame % cols;
  const row = Math.floor(frame / cols);

  const spriteStyle: React.CSSProperties = {
    backgroundImage: `url(${sprite})`,
    backgroundSize: `${cols * FRAME_PX * scale}px ${rows * FRAME_PX * scale}px`,
    backgroundPosition: `${-(col * FRAME_PX * scale)}px ${-(row * FRAME_PX * scale)}px`,
    backgroundRepeat: 'no-repeat',
  };

  // Fade in/out at section edges
  const opacity = t < 0.03 ? t / 0.03 : t > 0.97 ? (1 - t) / 0.03 : 1;

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 45,
        width: `${bookSize}px`,
        height: `${bookSize}px`,
        opacity,
      }}
    >
      {/* Book sprite */}
      <div style={{ position: 'absolute', inset: 0, ...spriteStyle }} />

      {/* Project content — overlaid on open pages */}
      <AnimatePresence mode="wait">
        {showContent && (
          <motion.div
            key={projectIdx}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Left page: title, role, description */}
            <div
              className="absolute flex flex-col justify-center"
              style={{
                left: '9%',
                top: '16%',
                width: '36%',
                height: '68%',
                padding: '0 12px',
              }}
            >
              {/* Role stamp */}
              <span
                className="font-body font-bold uppercase self-start"
                style={{
                  fontSize: 'clamp(7px, 0.9vw, 11px)',
                  letterSpacing: '0.18em',
                  color: 'rgba(234,40,4,0.85)',
                  border: '1px solid rgba(234,40,4,0.55)',
                  padding: '2px 7px',
                  transform: 'rotate(-3deg)',
                  transformOrigin: 'left center',
                  display: 'inline-block',
                  marginBottom: '10px',
                }}
              >
                {project.role}
              </span>

              {/* Title */}
              <h2
                className="font-display font-bold leading-none"
                style={{
                  fontSize: 'clamp(18px, 2.8vw, 38px)',
                  color: 'rgba(20,10,5,0.90)',
                  marginBottom: '8px',
                }}
              >
                {project.title}
              </h2>

              {/* Red rule */}
              <div style={{ width: '28px', height: '2px', background: 'rgba(234,40,4,0.55)', marginBottom: '8px' }} />

              {/* Subtitle */}
              <p
                className="font-body"
                style={{
                  fontSize: 'clamp(8px, 1vw, 13px)',
                  color: 'rgba(20,10,5,0.45)',
                  letterSpacing: '0.06em',
                  marginBottom: '18px',
                }}
              >
                {project.subtitle}
              </p>

              {/* CTA */}
              <button
                style={{
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  fontSize: 'clamp(7px, 0.85vw, 11px)',
                  letterSpacing: '0.2em',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'rgba(234,40,4,0.9)',
                  border: '1px solid rgba(234,40,4,0.5)',
                  padding: '5px 12px',
                  background: 'transparent',
                  fontFamily: 'var(--font-body, sans-serif)',
                }}
                onClick={() => router.push(project.route)}
              >
                View Work →
              </button>
            </div>

            {/* Right page: project screenshot */}
            <div
              className="absolute overflow-hidden"
              style={{
                left: '52%',
                top: '16%',
                width: '38%',
                height: '68%',
                borderRadius: '2px',
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes={`${Math.round(bookSize * 0.38)}px`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectBook;
