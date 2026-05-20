'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useViewportScale } from '@/hooks/useViewportScale';

interface ProcessTimelineProps {
  scrollProgress: number;
}

const TABLET_DATA = [
  { numeral: 'I',   title: 'Discovery', description: 'Understand the terrain.\nMap the unknown.',          threshold: 0.05, rotate: -2.5 },
  { numeral: 'II',  title: 'Design',    description: 'Shape the language.\nTurn intent into form.',        threshold: 0.14, rotate:  1.8 },
  { numeral: 'III', title: 'Build',     description: 'Clean code.\nClean architecture.',                   threshold: 0.24, rotate: -1.5 },
  { numeral: 'IV',  title: 'Ship',      description: 'Release. Gather signal.\nIterate without mercy.',   threshold: 0.35, rotate:  2.2 },
];

const TABLET_THRESHOLDS_MOBILE = [0.05, 0.30, 0.57, 0.80];

// Desktop: horizontal spread
const DESKTOP_POS = [
  { left: '7%',  bottom: '34%' },
  { left: '30%', bottom: '26%' },
  { left: '56%', bottom: '32%' },
  { left: '76%', bottom: '25%' },
];
const PATH_DESKTOP   = 'M 14,31 C 22,35 29,39 37,39 C 50,39 55,33 63,33 C 72,33 77,40 83,40';
const DOTS_DESKTOP: [number, number][] = [[14, 31], [37, 39], [63, 33], [83, 40]];

// Mobile: vertical stack, centered
const MOBILE_POS = [
  { top: '4%'  },
  { top: '27%' },
  { top: '52%' },
  { top: '74%' },
];
const PATH_MOBILE   = 'M 50,12 C 52,20 48,28 50,35 C 52,45 48,52 50,59 C 52,67 48,74 50,81';
const DOTS_MOBILE: [number, number][] = [[50, 12], [50, 35], [50, 59], [50, 81]];

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ scrollProgress }) => {
  const pathProgress = Math.min(scrollProgress * 1.3, 1);
  const { viewportScale, windowSize } = useViewportScale();
  const isMobile = windowSize.width < 768;

  const tabletWidth     = isMobile ? Math.max(200, Math.round(280 * viewportScale)) : Math.max(120, Math.round(210 * viewportScale));
  const tabletMinHeight = isMobile ? Math.max(120, Math.round(160 * viewportScale)) : Math.max(200, Math.round(320 * viewportScale));
  const tabletPadX      = isMobile ? Math.max(14,  Math.round(24  * viewportScale)) : Math.max(12,  Math.round(28  * viewportScale));
  const tabletPadY      = isMobile ? Math.max(12,  Math.round(20  * viewportScale)) : Math.max(20,  Math.round(40  * viewportScale));
  const numeralSize     = isMobile ? Math.max(3.5, 6   * viewportScale) : Math.max(4.5, 8 * viewportScale);
  const titleSize       = isMobile ? Math.max(1.0, 1.5 * viewportScale) : Math.max(1.1, 1.75 * viewportScale);

  const PATH_D       = isMobile ? PATH_MOBILE   : PATH_DESKTOP;
  const DOT_POSITIONS = isMobile ? DOTS_MOBILE   : DOTS_DESKTOP;
  const positions    = isMobile ? MOBILE_POS     : DESKTOP_POS;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Background title */}
      <div className="absolute inset-0 flex items-start justify-center select-none" style={{ zIndex: 0 }}>
        <div
          className="font-display font-bold whitespace-nowrap text-center w-full"
          style={{
            fontSize: '9.2vw',
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,1)',
            lineHeight: 1.0,
            paddingTop: '0.15em',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 88%)',
            maskImage:       'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 88%)',
          }}
        >
          Creative Process
        </div>
      </div>

      {/* Section marker placeholder */}
      <motion.div
        className="absolute top-8 left-12 z-20 flex items-center gap-3 pointer-events-none"
        animate={{ opacity: scrollProgress > 0.05 ? 1 : 0, x: scrollProgress > 0.05 ? 0 : -16 }}
        transition={{ duration: 0.5 }}
      />

      {/* SVG treasure-map path */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d={PATH_D} fill="none" stroke="rgba(234,40,4,0.12)" strokeWidth="0.35" strokeDasharray="0.9 2.2" strokeLinecap="round" />
        <motion.path
          d={PATH_D}
          fill="none"
          stroke="rgba(234,40,4,0.5)"
          strokeWidth="0.35"
          strokeDasharray="0.9 2.2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: pathProgress }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        />
        {DOT_POSITIONS.map(([cx, cy], i) => (
          <motion.circle
            key={i} cx={cx} cy={cy} r="0.8" fill="#ea2804"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale:   scrollProgress > (isMobile ? TABLET_THRESHOLDS_MOBILE[i] : TABLET_DATA[i].threshold) ? 1 : 0,
              opacity: scrollProgress > (isMobile ? TABLET_THRESHOLDS_MOBILE[i] : TABLET_DATA[i].threshold) ? 1 : 0,
            }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 280 }}
          />
        ))}
      </svg>

      {/* Codex Tablets */}
      {TABLET_DATA.map((tablet, idx) => {
        const threshold = isMobile ? TABLET_THRESHOLDS_MOBILE[idx] : tablet.threshold;
        const active = scrollProgress > threshold;
        const pos = positions[idx];

        return (
          <motion.div
            key={tablet.numeral}
            className="absolute z-20"
            style={isMobile ? { left: '50%', top: (pos as { top: string }).top } : { left: (pos as { left: string; bottom: string }).left, bottom: (pos as { left: string; bottom: string }).bottom }}
            initial={{ y: 140, opacity: 0 }}
            animate={{ y: active ? 0 : 140, opacity: active ? 1 : 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            {isMobile ? (
              <div style={{ transform: 'translateX(-50%)' }}>
                <div style={{ transform: `rotate(${tablet.rotate}deg)` }}>
                  <TabletCard
                    tablet={tablet} active={active} idx={idx}
                    tabletWidth={tabletWidth} tabletMinHeight={tabletMinHeight}
                    tabletPadX={tabletPadX} tabletPadY={tabletPadY}
                    numeralSize={numeralSize} titleSize={titleSize}
                  />
                </div>
              </div>
            ) : (
              <div style={{ transform: `rotate(${tablet.rotate}deg)` }}>
                <TabletCard
                  tablet={tablet} active={active} idx={idx}
                  tabletWidth={tabletWidth} tabletMinHeight={tabletMinHeight}
                  tabletPadX={tabletPadX} tabletPadY={tabletPadY}
                  numeralSize={numeralSize} titleSize={titleSize}
                />
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

interface TabletCardProps {
  tablet: typeof TABLET_DATA[number];
  active: boolean;
  idx: number;
  tabletWidth: number;
  tabletMinHeight: number;
  tabletPadX: number;
  tabletPadY: number;
  numeralSize: number;
  titleSize: number;
}

const TabletCard: React.FC<TabletCardProps> = ({
  tablet, active, idx,
  tabletWidth, tabletMinHeight, tabletPadX, tabletPadY,
  numeralSize, titleSize,
}) => (
  <div
    className="relative overflow-hidden"
    style={{
      width: tabletWidth,
      minHeight: tabletMinHeight,
      paddingTop: tabletPadY,
      paddingBottom: tabletPadY,
      paddingLeft: tabletPadX,
      paddingRight: tabletPadX,
      background: 'rgba(255,255,255,1)',
      borderTop:    '2px solid rgba(234,40,4,0.65)',
      borderLeft:   '2px solid rgba(234,40,4,0.30)',
      borderRight:  '1px solid rgba(255,255,255,0.25)',
      borderBottom: '1px solid rgba(255,255,255,0.12)',
      WebkitBackdropFilter: 'blur(18px)',
      boxShadow: active
        ? '0 4px 20px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.3)'
        : '0 2px 10px rgba(0,0,0,0.08)',
    }}
  >
    <div
      className="absolute -right-3 -top-3 font-display font-bold select-none pointer-events-none"
      style={{ fontSize: `${numeralSize}rem`, color: 'rgba(234,40,4,0.08)', lineHeight: 1, userSelect: 'none' }}
    >
      {tablet.numeral}
    </div>

    <div className="font-body text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: 'rgba(234,40,4,0.9)' }}>
      {tablet.numeral}
    </div>

    <h3 className="font-display font-bold leading-tight mb-3" style={{ fontSize: `${titleSize}rem`, color: 'rgba(20,10,5,0.92)' }}>
      {tablet.title}
    </h3>

    <div className="w-8 h-px mb-4" style={{ background: 'rgba(234,40,4,0.5)' }} />

    <p className="font-body leading-relaxed" style={{ fontSize: '0.82rem', color: 'rgba(20,10,5,0.55)', whiteSpace: 'pre-line', lineHeight: 1.75 }}>
      {tablet.description}
    </p>

    <div
      className="absolute bottom-5 right-5 w-5 h-5 rounded-full flex items-center justify-center"
      style={{ background: 'rgba(234,40,4,0.9)', boxShadow: '0 0 6px rgba(234,40,4,0.25)' }}
    >
      <span style={{ color: '#fff', fontSize: '8px', fontWeight: 700 }}>✦</span>
    </div>

    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[1px]"
      style={{ background: 'rgba(234,40,4,0.5)' }}
      animate={{ opacity: active ? [0.3, 0.9, 0.3] : 0 }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }}
    />
  </div>
);

export default ProcessTimeline;
