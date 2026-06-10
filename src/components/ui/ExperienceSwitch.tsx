'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const GEO = '"Georgia", "Times New Roman", serif';
const PREF_KEY = 'nc_experience_pref';

interface ExperienceSwitchProps {
  current: 'journey' | 'editorial';
}

export default function ExperienceSwitch({ current }: ExperienceSwitchProps) {
  const router = useRouter();

  const switchTo = () => {
    const next = current === 'journey' ? 'editorial' : 'journey';
    localStorage.setItem(PREF_KEY, next);
    router.push(next === 'journey' ? '/journey' : '/landing');
  };

  const isJourney = current === 'journey';

  const label       = isJourney ? 'The Editorial' : 'The Journey';
  const sublabel    = isJourney ? 'Switch to minimal' : 'Switch to adventure';
  const borderColor = isJourney ? 'rgba(252,252,252,0.18)' : 'rgba(20,12,5,0.18)';
  const bgIdle      = isJourney ? 'rgba(252,252,252,0.06)' : 'rgba(20,12,5,0.04)';
  const bgHover     = isJourney ? 'rgba(252,252,252,0.12)' : 'rgba(20,12,5,0.08)';
  const textMain    = isJourney ? 'rgba(252,252,252,0.85)' : 'rgba(12,7,2,0.85)';
  const textSub     = isJourney ? 'rgba(252,252,252,0.4)'  : 'rgba(20,12,5,0.4)';

  return (
    <motion.button
      onClick={switchTo}
      className="fixed top-4 left-4 md:top-8 md:left-8 z-[200] group flex items-center gap-3"
      style={{
        background: bgIdle,
        border: `1px solid ${borderColor}`,
        cursor: 'pointer',
        padding: '0.55rem 1rem',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        transition: 'background 0.25s',
      }}
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={e => (e.currentTarget.style.background = bgHover)}
      onMouseLeave={e => (e.currentTarget.style.background = bgIdle)}
    >
      {/* Wax dot */}
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'rgba(234,40,4,0.75)', flexShrink: 0, display: 'inline-block' }} />

      <span className="flex flex-col items-start">
        <span style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.82rem', color: textMain, letterSpacing: '0.02em', lineHeight: 1.2 }}>
          {label}
        </span>
        <span style={{ fontFamily: GEO, fontSize: '0.62rem', color: textSub, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1.2 }}>
          {sublabel}
        </span>
      </span>

      <span
        style={{ fontSize: '0.7rem', color: 'rgba(234,40,4,0.6)' }}
        className="group-hover:translate-x-1 inline-block transition-transform duration-200 ml-1"
      >
        →
      </span>
    </motion.button>
  );
}
