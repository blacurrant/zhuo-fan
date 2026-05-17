'use client';
import React, { useMemo } from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useViewportScale } from '@/hooks/useViewportScale';

const PROJECTS = [
  {
    title: 'Craon',
    subtitle: 'AI Video Editor · SaaS',
    role: 'Lead Frontend Engineer',
    image: '/craon/craon-hero.png',
    route: '/works/craon',
  },
  {
    title: 'MelloUp',
    subtitle: 'Event Marketing · MVP',
    role: 'Founding Engineer',
    image: '/melloup/melloup.png',
    route: '/works/melloup',
  },
  {
    title: 'Ibasho',
    subtitle: 'Brand · UI/UX · Web',
    role: 'Lead Designer & Developer',
    image: '/ibasho/ibashoo.png',
    route: '/works/ibasho',
  },
  {
    title: 'FreightEZ',
    subtitle: 'Fleet TMS · B2B SaaS',
    role: 'Frontend Engineer',
    image: '/freightez/freightez-hero.png',
    route: '/works/freightez',
  },
];

const FRAME_PX = 272;

const B = {
  OPEN_END: 0.15,
  TURN_01_S: 0.28,
  TURN_01_E: 0.35,
  TURN_12_S: 0.48,
  TURN_12_E: 0.55,
  TURN_23_S: 0.68,
  TURN_23_E: 0.75,
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
  contentOpacity: number;
}

function computePhase(t: number): Phase | null {
  if (t <= 0 || t >= 1) return null;

  const open = { sprite: '/book/Open_book.png', cols: 4, rows: 3, totalFrames: 12 };
  const close = { sprite: '/book/Close_book.png', cols: 4, rows: 3, totalFrames: 12 };
  const turn = { sprite: '/book/Turning_pages_left.png', cols: 4, rows: 4, totalFrames: 16 };

  const frameOf = (progress: number, total: number) =>
    Math.min(total - 1, Math.floor(progress * total));

  const turnPhase = (tp: number, fromIdx: number, toIdx: number, spriteDef: typeof turn): Phase => {
    if (tp < 0.5) {
      return {
        ...spriteDef,
        frame: frameOf(tp * 2 * 0.5, 16),
        projectIdx: fromIdx,
        showContent: true,
        contentOpacity: 1 - tp * 2,
      };
    }
    return {
      ...spriteDef,
      frame: frameOf(0.5 + (tp - 0.5) * 0.5, 16),
      projectIdx: toIdx,
      showContent: true,
      contentOpacity: (tp - 0.5) * 2,
    };
  };

  if (t < B.OPEN_END) {
    return { ...open, frame: frameOf(t / B.OPEN_END, 12), projectIdx: 0, showContent: false, contentOpacity: 0 };
  }
  if (t < B.TURN_01_S) {
    return { ...open, frame: 11, projectIdx: 0, showContent: true, contentOpacity: 1 };
  }
  if (t < B.TURN_01_E) {
    return turnPhase((t - B.TURN_01_S) / (B.TURN_01_E - B.TURN_01_S), 0, 1, turn);
  }
  if (t < B.TURN_12_S) {
    return { ...open, frame: 11, projectIdx: 1, showContent: true, contentOpacity: 1 };
  }
  if (t < B.TURN_12_E) {
    return turnPhase((t - B.TURN_12_S) / (B.TURN_12_E - B.TURN_12_S), 1, 2, turn);
  }
  if (t < B.TURN_23_S) {
    return { ...open, frame: 11, projectIdx: 2, showContent: true, contentOpacity: 1 };
  }
  if (t < B.TURN_23_E) {
    return turnPhase((t - B.TURN_23_S) / (B.TURN_23_E - B.TURN_23_S), 2, 3, turn);
  }
  if (t < B.CLOSE_START) {
    return { ...open, frame: 11, projectIdx: 3, showContent: true, contentOpacity: 1 };
  }
  return {
    ...close,
    frame: frameOf((t - B.CLOSE_START) / (1 - B.CLOSE_START), 12),
    projectIdx: 3,
    showContent: false,
    contentOpacity: 0,
  };
}

interface ProjectBookProps {
  scrollX: number;
}

const ProjectBook: React.FC<ProjectBookProps> = ({ scrollX }) => {
  const router = useRouter();
  const { windowSize } = useViewportScale();
  const vw = windowSize.width;
  const vh = windowSize.height;

  const sectionStart = vw * 1.5;
  const sectionRange = vw * 1.2;
  if (sectionRange === 0) return null;
  const t = Math.max(0, Math.min(1, (scrollX - sectionStart) / sectionRange));

  const isMobile = vw < 768;

  const bookSize = isMobile
    ? Math.round(Math.min(vh * 0.9, vw * 1.1))
    : Math.round(Math.min(vh * 0.88, vw * 0.56));

  const scale = bookSize / FRAME_PX;

  const phase = useMemo(() => computePhase(t), [t]);
  if (!phase) return null;

  const { sprite, cols, rows, frame, projectIdx, showContent, contentOpacity } = phase;
  const project = PROJECTS[projectIdx];

  const col = frame % cols;
  const row = Math.floor(frame / cols);

  const spriteStyle: React.CSSProperties = {
    backgroundImage: `url(${sprite})`,
    backgroundSize: `${cols * FRAME_PX * scale}px ${rows * FRAME_PX * scale}px`,
    backgroundPosition: `${-(col * FRAME_PX * scale)}px ${-(row * FRAME_PX * scale)}px`,
    backgroundRepeat: 'no-repeat',
  };

  const opacity = t < 0.03 ? t / 0.03 : t > 0.97 ? (1 - t) / 0.03 : 1;

  const DROP_END = 0.10;
  const entranceP = Math.min(1, t / DROP_END);
  const eased = 1 - Math.pow(1 - entranceP, 3);
  const entranceScale = 0.1 + eased * 0.9;
  const entranceY = (1 - eased) * 60;

  // ── Shared content blocks ────────────────────────────────────────────────

  const textContent = (
    <>
      <div
        className="flex items-center gap-2 mb-3"
        style={{
          color: 'rgba(160, 40, 20, 0.85)',
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontStyle: 'italic',
          fontSize: isMobile ? 'clamp(8px, 2.5vw, 13px)' : 'clamp(9px, 1vw, 14px)',
        }}
      >
        <span style={{ fontSize: '0.8em', opacity: 0.7 }}>✧</span>
        <span>{project.role}</span>
        <span style={{ fontSize: '0.8em', opacity: 0.7 }}>✧</span>
      </div>

      <h2
        className="leading-none lowercase"
        style={{
          fontFamily: '"Playfair Display", "Cinzel", "Georgia", serif',
          fontSize: isMobile ? 'clamp(20px, 6vw, 36px)' : 'clamp(24px, 3.5vw, 48px)',
          fontWeight: 600,
          color: 'rgba(20, 15, 5, 0.75)',
          letterSpacing: '0.02em',
          textShadow: '0.5px 0.5px 0px rgba(0,0,0,0.1)',
          marginBottom: isMobile ? '6px' : '10px',
        }}
      >
        {project.title}
      </h2>

      <div
        className="flex items-center gap-1 mb-4"
        style={{ color: 'rgba(160, 40, 20, 0.5)', fontSize: 'clamp(8px, 0.8vw, 12px)' }}
      >
        <span>❧</span>
        <div style={{ width: '40px', height: '1px', background: 'currentColor' }} />
        <span>☙</span>
      </div>

      <p
        style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: isMobile ? 'clamp(9px, 2.5vw, 14px)' : 'clamp(10px, 1.2vw, 16px)',
          color: 'rgba(40, 25, 15, 0.8)',
          lineHeight: 1.6,
          marginBottom: isMobile ? '14px' : '28px',
        }}
      >
        {project.subtitle}
      </p>

      <button
        className="group flex items-center gap-2"
        style={{
          pointerEvents: 'auto',
          cursor: 'pointer',
          fontSize: isMobile ? 'clamp(9px, 2.5vw, 13px)' : 'clamp(10px, 1.1vw, 15px)',
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontStyle: 'italic',
          color: 'rgba(160, 40, 20, 0.95)',
          background: 'transparent',
          border: 'none',
          padding: '4px 0',
          borderBottom: '1px dashed rgba(160, 40, 20, 0.4)',
          transition: 'all 0.3s ease',
        }}
        onClick={() => router.push(project.route)}
      >
        <span className="transition-transform group-hover:-translate-x-1" style={{ fontSize: '0.8em' }}>✦</span>
        <span style={{ fontWeight: 600 }}>View Work</span>
        <span className="transition-transform group-hover:translate-x-1" style={{ fontSize: '0.8em' }}>✦</span>
      </button>
    </>
  );

  const imageSlices = (
    <div
      className="absolute right-0 top-0 bottom-0"
      style={{ width: '72cqw', transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0" style={{ overflow: 'hidden', borderRadius: '0 1px 1px 0' }}>
        <div className="absolute right-0 top-0 bottom-0" style={{ width: '100cqw' }}>
          <Image
            src={project.image} alt={project.title} fill className="object-cover"
            sizes={`${Math.round(bookSize * 0.38)}px`}
            style={{ filter: 'contrast(0.95) saturate(0.85)' }}
          />
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0"
        style={{ right: 'calc(100% - 1px)', width: '11cqw', transformOrigin: 'right center', transform: 'rotateY(-10deg)', transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
          <div className="absolute top-0 bottom-0" style={{ right: '-72cqw', width: '100cqw' }}>
            <Image src={project.image} alt={project.title} fill className="object-cover"
              sizes={`${Math.round(bookSize * 0.38)}px`}
              style={{ filter: 'contrast(0.95) saturate(0.85) brightness(0.92)' }}
            />
          </div>
        </div>

        <div
          className="absolute top-0 bottom-0"
          style={{ right: 'calc(100% - 1px)', width: '5cqw', transformOrigin: 'right center', transform: 'rotateY(-10deg)', transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
            <div className="absolute top-0 bottom-0" style={{ right: '-83cqw', width: '100cqw' }}>
              <Image src={project.image} alt={project.title} fill className="object-cover"
                sizes={`${Math.round(bookSize * 0.38)}px`}
                style={{ filter: 'contrast(0.95) saturate(0.85) brightness(0.85)' }}
              />
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0"
            style={{ right: 'calc(100% - 1px)', width: '12cqw', transformOrigin: 'right center', transform: 'rotateY(-18deg)', transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0" style={{ overflow: 'hidden', borderRadius: '1px 0 0 1px' }}>
              <div className="absolute top-0 bottom-0" style={{ right: '-88cqw', width: '100cqw' }}>
                <Image src={project.image} alt={project.title} fill className="object-cover"
                  sizes={`${Math.round(bookSize * 0.38)}px`}
                  style={{ filter: 'contrast(0.95) saturate(0.85) brightness(0.7)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Desktop layout (landscape open book) ────────────────────────────────
  if (!isMobile) {
    return (
      <div
        className="fixed pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(-50%, calc(-50% - 6vh + ${entranceY}vh)) scale(${entranceScale})`,
          transformOrigin: 'center center',
          zIndex: 45,
          width: `${bookSize}px`,
          height: `${bookSize}px`,
          opacity,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, ...spriteStyle }} />

        {showContent && (
          <div key={projectIdx} className="absolute inset-0" style={{ opacity: contentOpacity }}>
            <div
              className="absolute flex flex-col justify-center items-center text-center"
              style={{
                left: '9%', top: '16%', width: '36%', height: '90%',
                padding: '0 12px',
                mixBlendMode: 'multiply',
                transform: 'rotate(-0.5deg)',
              }}
            >
              {textContent}
            </div>

            <div
              className="absolute"
              style={{
                left: '52%', top: '34%', width: '38%', height: '56%',
                containerType: 'size',
                perspective: '800px',
                transformStyle: 'preserve-3d',
                mixBlendMode: 'multiply',
                opacity: 0.9,
                transform: 'rotate(-0.5deg)',
              }}
            >
              {imageSlices}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Mobile layout (portrait — book rotated 90°) ──────────────────────────
  // Three separate wrappers so centering and entrance animation stay in screen space.
  // Layer 1: zero-size fixed anchor at viewport center.
  // Layer 2: entrance animation — translateY is screen-vertical before rotation.
  // Layer 3: book square centered via negative margins, then rotated 90°.
  // Content div: counter-rotated -90° so text/image render in screen space.
  //
  // After 90° CW rotation the sprite pages map to screen space as:
  //   right page (image) → top:  ~10–48%, left: ~15–85%
  //   left page  (text)  → bottom: ~55–91%, left: ~15–85%
  return (
    <div className="fixed pointer-events-none" style={{ left: '50%', top: '50%', zIndex: 45, opacity }}>
      <div style={{ transform: `translateY(${entranceY}vh) scale(${entranceScale})` }}>
        <div
          style={{
            position: 'relative',
            width: `${bookSize}px`,
            height: `${bookSize}px`,
            marginLeft: `-${bookSize / 2}px`,
            marginTop: `-${bookSize / 2}px`,
            transform: 'rotate(90deg)',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, ...spriteStyle }} />

          {showContent && (
            <div
              key={projectIdx}
              className="absolute inset-0"
              style={{ opacity: contentOpacity, transform: 'rotate(-90deg)', transformOrigin: 'center center' }}
            >
              {/* Image — top half (was right page) */}
              <div
                className="absolute"
                style={{
                  left: '18%', top: '11%', width: '62%', height: '36%',
                  containerType: 'size',
                  perspective: '800px',
                  transformStyle: 'preserve-3d',
                  mixBlendMode: 'multiply',
                  opacity: 0.9,
                  transform: 'rotate(-0.5deg)',
                }}
              >
                {imageSlices}
              </div>

              {/* Text — bottom half (was left page) */}
              <div
                className="absolute flex flex-col justify-center items-center text-center"
                style={{
                  left: '50%',
                  top: '54%',
                  width: '64%',
                  height: '38%',
                  transform: 'translateX(-50%) rotate(-0.5deg)',
                  mixBlendMode: 'multiply',
                  padding: '0 8px',
                }}
              >
                {textContent}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectBook;
