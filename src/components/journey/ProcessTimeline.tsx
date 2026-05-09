'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface TimelineStage {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

interface ProcessTimelineProps {
  scrollProgress: number;
}

const STAGES: TimelineStage[] = [
  {
    icon: '✏️',
    title: 'Discovery & Sketch',
    description: 'Understanding problems, sketching solutions, exploring possibilities',
    delay: 0,
  },
  {
    icon: '🎨',
    title: 'Design & Wireframe',
    description: 'Creating visual language, user flows, interactive prototypes',
    delay: 0.2,
  },
  {
    icon: '💻',
    title: 'Development',
    description: 'Building scalable, performant solutions with clean architecture',
    delay: 0.4,
  },
  {
    icon: '🚀',
    title: 'Launch & Iterate',
    description: 'Shipping, gathering feedback, continuous improvement',
    delay: 0.6,
  },
];

const ProcessTimeline: React.FC<ProcessTimelineProps> = ({ scrollProgress }) => {
  return (
    <div className="relative h-full flex items-center justify-center px-16">
      <div className="max-w-5xl w-full">
        <h2 className="text-5xl font-display font-bold text-replicate-ink mb-4 text-center">
          Creative Process
        </h2>
        <p className="text-lg text-replicate-body font-body text-center mb-16">
          From concept to launch, every project follows a deliberate process.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-replicate-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: scrollProgress > 0.5 ? 1 : scrollProgress }}
            transition={{ duration: 0.6 }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Stages */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {STAGES.map((stage, idx) => (
              <motion.div
                key={stage.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: scrollProgress > idx * 0.25 ? 1 : 0.3,
                  y: scrollProgress > idx * 0.25 ? 0 : 30,
                }}
                transition={{ delay: stage.delay, duration: 0.5 }}
              >
                {/* Node */}
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-full bg-replicate-surface-card border-2 border-replicate-primary flex items-center justify-center text-3xl shadow-lg"
                  animate={{
                    scale: scrollProgress > idx * 0.25 ? 1.1 : 1,
                    boxShadow:
                      scrollProgress > idx * 0.25
                        ? '0 0 20px rgba(234, 40, 4, 0.4)'
                        : '0 0 0px rgba(0, 0, 0, 0)',
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {stage.icon}
                </motion.div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-lg font-display font-bold text-replicate-ink mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-replicate-charcoal font-body leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Progress indicator */}
                {scrollProgress > idx * 0.25 && (
                  <motion.div
                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-replicate-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
