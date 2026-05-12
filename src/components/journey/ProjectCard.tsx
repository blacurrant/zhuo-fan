'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
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
  cardWidth?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  image,
  role,
  characterX,
  cardX,
  index,
  absoluteX,
  cardWidth = 520,
}) => {
  const [isNear, setIsNear] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const distance = Math.abs(characterX - cardX);
    setIsNear(distance < 300);
  }, [characterX, cardX]);

  const handleClick = () => {
    const routes: { [key: number]: string } = {
      0: '/works/craon',
      1: '/works/melloup',
      2: '/works/ibasho',
      3: '/works/freightez',
    };
    router.push(routes[index] || '/');
  };

  const left = absoluteX !== undefined ? absoluteX - cardWidth / 2 : undefined;
  // Card is image-only, height = 16:10 ratio
  const cardHeight = Math.round(cardWidth * 0.65);
  // Slight alternating tilt for a hand-placed, cartoony feel
  const tilt = isNear ? 0 : index % 2 === 0 ? 1.8 : -1.8;

  return (
    <motion.div
      onClick={handleClick}
      className="cursor-pointer group"
      style={
        left !== undefined
          ? {
              position: 'absolute',
              left: `${left}px`,
              bottom: '14%',
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
            }
          : { flexShrink: 0, width: `${cardWidth}px`, height: `${cardHeight}px` }
      }
      animate={{
        scale: isNear ? 1.05 : 1,
        y: isNear ? -24 : 0,
        rotate: tilt,
      }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div
        className="relative w-full h-full overflow-hidden"
        animate={{
          boxShadow: isNear
            ? [
                '0 0 0 5px #ffffff',          /* white cartoon border */
                '0 0 0 8px rgba(20,12,5,0.85)', /* dark outer stroke */
                '0 32px 80px rgba(234,40,4,0.30)', /* red glow */
              ].join(', ')
            : [
                '0 0 0 5px #ffffff',
                '0 0 0 8px rgba(20,12,5,0.75)',
                '0 12px 40px rgba(0,0,0,0.40)',
              ].join(', '),
          borderRadius: isNear ? '18px' : '14px',
        }}
        transition={{ duration: 0.35 }}
      >
        {/* ── Full-bleed image ── */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={`${cardWidth}px`}
        />

        {/* ── Gradient scrim: transparent top → dark bottom ── */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 45%, transparent 80%)',
          }}
        />

        {/* ── Text overlay — sits on top of image ── */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-10">
          <p
            className="uppercase tracking-[0.18em] font-body font-medium mb-1"
            style={{ fontSize: '10px', color: '#ea2804cc' }}
          >
            {role}
          </p>
          <h3
            className="font-bold font-display leading-tight mb-1 text-white"
            style={{ fontSize: `${Math.max(22, cardWidth * 0.048)}px` }}
          >
            {title}
          </h3>
          <p
            className="font-body line-clamp-2 mb-4"
            style={{
              fontSize: `${Math.max(12, cardWidth * 0.023)}px`,
              color: 'rgba(255,255,255,0.65)',
            }}
          >
            {subtitle}
          </p>

          <motion.div
            className="inline-flex items-center gap-2 font-semibold font-body text-white"
            style={{ fontSize: `${Math.max(12, cardWidth * 0.023)}px` }}
            animate={{ x: isNear ? 6 : 0 }}
            transition={{ duration: 0.3 }}
          >
            View Case Study
            <ArrowUpRight size={15} />
          </motion.div>
        </div>

        {/* ── Subtle red top-edge accent on hover/approach ── */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-replicate-primary transition-opacity duration-300"
          style={{ opacity: isNear ? 1 : 0 }}
        />
      </motion.div>

      {/* Floating badge */}
      {isNear && (
        <motion.div
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-replicate-primary text-replicate-on-primary px-4 py-1.5 rounded-full text-xs font-body font-semibold whitespace-nowrap shadow-xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          ✨ Click to explore
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
