'use client';
import React, { useState, useRef, useEffect } from 'react';
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  image,
  role,
  characterX,
  cardX,
  index,
}) => {
  const [isNear, setIsNear] = useState(false);
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);

  // Detect if character is near card (within 200px)
  useEffect(() => {
    const distance = Math.abs(characterX - cardX);
    setIsNear(distance < 200);
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

  return (
    <motion.div
      ref={cardRef}
      className="relative flex-shrink-0 w-80 h-96 group cursor-pointer"
      animate={{
        scale: isNear ? 1.05 : 1,
        y: isNear ? -20 : 0,
      }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      {/* Card background */}
      <motion.div
        className="absolute inset-0 bg-replicate-surface-card rounded-lg overflow-hidden border border-replicate-hairline"
        animate={{
          boxShadow: isNear
            ? '0 20px 40px rgba(234, 40, 4, 0.2)'
            : '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow effect when near */}
        {isNear && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-replicate-primary/20 to-transparent rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Image */}
        <div className="w-full h-56 overflow-hidden rounded-t-lg bg-replicate-surface-bone">
          <Image
            src={image}
            alt={title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-4 h-40 flex flex-col justify-between">
          <div>
            <p className="text-xs text-replicate-mute uppercase tracking-widest font-body mb-2">
              {role}
            </p>
            <h3 className="text-2xl font-bold text-replicate-ink font-display mb-1">
              {title}
            </h3>
            <p className="text-sm text-replicate-charcoal font-body line-clamp-2">
              {subtitle}
            </p>
          </div>

          {/* CTA */}
          <motion.div
            className="flex items-center gap-2 text-replicate-primary font-semibold text-sm"
            animate={{ x: isNear ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            View Case
            <ArrowUpRight size={16} />
          </motion.div>
        </div>
      </motion.div>

      {/* Floating label when near */}
      {isNear && (
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-replicate-primary text-replicate-on-primary px-3 py-1 rounded-full text-xs font-body font-semibold whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          ✨ Approach to interact
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectCard;
