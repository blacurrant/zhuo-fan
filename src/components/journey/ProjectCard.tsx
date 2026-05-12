'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  image: string;
  role: string;
  characterX: number;
  cardX: number;
  index: number;
  absoluteX?: number;
}

const CARD_WIDTH = 260;
const CARD_HEIGHT = 380;
const IMAGE_HEIGHT = Math.round(CARD_HEIGHT * 0.55);
const CONTENT_HEIGHT = CARD_HEIGHT - IMAGE_HEIGHT - 1; // 1px for hairline
const NUMERALS = ['I', 'II', 'III', 'IV'];
const ROUTES: Record<number, string> = {
  0: '/works/craon',
  1: '/works/melloup',
  2: '/works/ibasho',
  3: '/works/freightez',
};
const BOTTOM_POSITIONS = ['18%', '28%', '18%', '28%'];

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  image,
  role,
  characterX,
  cardX,
  index,
  absoluteX,
}) => {
  const [isNear, setIsNear] = useState(false);
  const [stampVisible, setStampVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsNear(Math.abs(characterX - cardX) < 300);
  }, [characterX, cardX]);

  const handleClick = () => {
    setStampVisible(true);
    setTimeout(() => router.push(ROUTES[index] ?? '/'), 300);
  };

  const tilt = isNear ? 0 : index % 2 === 0 ? 1.8 : -1.8;
  const numeral = NUMERALS[index] ?? 'I';

  const positionStyle: React.CSSProperties =
    absoluteX !== undefined
      ? {
          position: 'absolute',
          left: `${absoluteX - CARD_WIDTH / 2}px`,
          bottom: BOTTOM_POSITIONS[index],
          width: `${CARD_WIDTH}px`,
          height: `${CARD_HEIGHT}px`,
        }
      : { flexShrink: 0, width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px` };

  return (
    <motion.div
      onClick={handleClick}
      className="cursor-pointer"
      style={positionStyle}
      animate={{ scale: isNear ? 1.06 : 1, y: isNear ? -32 : 0, rotate: tilt }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Scroll banner — unfurls from top when near */}
      <AnimatePresence>
        {isNear && (
          <motion.div
            className="absolute flex items-center justify-center gap-1.5 bg-white pointer-events-none"
            style={{
              top: '-36px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '140px',
              height: '28px',
              border: '1px solid rgba(234,40,4,0.5)',
              transformOrigin: 'bottom center',
              zIndex: 10,
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span style={{ color: 'rgba(234,40,4,0.9)', fontSize: '7px', fontWeight: 700 }}>
              ✦
            </span>
            <span
              className="font-body font-bold uppercase"
              style={{ fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(234,40,4,0.9)' }}
            >
              OPEN COMMISSION
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card body */}
      <motion.div
        className="relative w-full h-full overflow-hidden"
        style={{
          background: '#ffffff',
          borderTop: '2px solid rgba(234,40,4,0.65)',
          borderLeft: '1px solid rgba(234,40,4,0.20)',
          borderRight: '1px solid rgba(234,40,4,0.20)',
          borderBottom: '1px solid rgba(234,40,4,0.20)',
        }}
        animate={{
          boxShadow: isNear
            ? '0 0 0 4px #ffffff, 0 0 0 6px rgba(20,12,5,0.8), 0 32px 80px rgba(234,40,4,0.35)'
            : '0 0 0 4px #ffffff, 0 0 0 6px rgba(20,12,5,0.7), 0 12px 40px rgba(0,0,0,0.35)',
        }}
        transition={{ duration: 0.35 }}
      >
        {/* Image — top 55%, hand-cut clip */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            height: `${IMAGE_HEIGHT}px`,
            clipPath: 'polygon(0 0, 100% 0, 100% 96%, 97% 100%, 3% 100%)',
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes={`${CARD_WIDTH}px`}
          />
        </div>

        {/* Red hairline below image */}
        <div style={{ height: '1px', background: 'rgba(234,40,4,0.5)' }} />

        {/* Content area */}
        <div
          className="relative overflow-hidden px-5 pt-4 pb-5"
          style={{ height: `${CONTENT_HEIGHT}px` }}
        >
          {/* Giant numeral watermark */}
          <div
            className="absolute font-display font-bold select-none pointer-events-none"
            style={{
              fontSize: '6rem',
              color: 'rgba(234,40,4,0.06)',
              right: '-4px',
              top: '-4px',
              lineHeight: 1,
            }}
          >
            {numeral}
          </div>

          {/* Role stamp */}
          <div
            className="inline-block font-body font-bold uppercase mb-2"
            style={{
              fontSize: '8px',
              letterSpacing: '0.2em',
              color: 'rgba(234,40,4,0.85)',
              border: '1px solid rgba(234,40,4,0.7)',
              padding: '2px 6px',
              transform: 'rotate(-6deg)',
              transformOrigin: 'left center',
            }}
          >
            {role}
          </div>

          {/* Title */}
          <h3
            className="font-display font-bold leading-tight mt-1"
            style={{ fontSize: '1.35rem', color: 'rgba(20,10,5,0.92)' }}
          >
            {title}
          </h3>

          {/* Subtitle */}
          <p
            className="font-body leading-relaxed mt-1"
            style={{ fontSize: '0.72rem', color: 'rgba(20,10,5,0.45)' }}
          >
            {subtitle}
          </p>

          {/* Wax seal */}
          <motion.div
            className="absolute bottom-4 right-4 rounded-full flex items-center justify-center"
            style={{ width: '18px', height: '18px', background: 'rgba(234,40,4,0.9)' }}
            animate={
              isNear
                ? {
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 6px rgba(234,40,4,0.25)',
                      '0 0 14px rgba(234,40,4,0.6)',
                      '0 0 6px rgba(234,40,4,0.25)',
                    ],
                  }
                : { scale: 1, boxShadow: '0 0 6px rgba(234,40,4,0.25)' }
            }
            transition={
              isNear
                ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
          >
            <span style={{ color: '#fff', fontSize: '7px', fontWeight: 700 }}>✦</span>
          </motion.div>
        </div>

        {/* Ember glow — bottom edge */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: '1px', background: 'rgba(234,40,4,0.5)' }}
          animate={{ opacity: isNear ? [0.3, 0.9, 0.3] : 0.2 }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.4,
          }}
        />

        {/* Click stamp */}
        <AnimatePresence>
          {stampVisible && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 20 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 1] }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <span style={{ fontSize: '4rem', color: 'rgba(234,40,4,0.9)' }}>✦</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
