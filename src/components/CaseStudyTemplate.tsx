'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
  isDark?: boolean;
}

interface CaseStudyProps {
  title: string;
  subtitle: string;
  description: string;
  meta: {
    role: string;
    duration: string;
    industry: string;
    status: string;
  };
  metrics?: Array<{
    value: string;
    label: string;
  }>;
  sections: Section[];
  backHref?: string;
}

export default function CaseStudyTemplate({
  title,
  subtitle,
  description,
  meta,
  metrics = [],
  sections,
  backHref = '/landing'
}: CaseStudyProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-replicate-canvas">
      {/* Hero Section - Orange Band */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-replicate-primary overflow-hidden py-32">
        {/* Atmospheric mesh - orange to pink gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-replicate-primary via-replicate-hero-glow to-replicate-hero-pink opacity-90" />
        </div>

        <div className="relative container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button
              onClick={() => router.push(backHref)}
              className="mb-8 inline-flex items-center gap-2 text-replicate-on-primary hover:opacity-80 transition-opacity"
            >
              <ArrowLeft size={20} />
              <span className="font-body text-sm">Back</span>
            </button>

            {/* Display XXL - 128px */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-replicate-on-primary mb-6 leading-tight tracking-tighter">
              {title}
            </h1>

            {/* Display LG - 48px */}
            <p className="text-3xl md:text-4xl text-replicate-on-primary mb-4 font-display">
              {subtitle}
            </p>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-replicate-on-dark-mute mb-12 max-w-3xl font-body leading-relaxed">
              {description}
            </p>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
              {[
                { label: 'Role', value: meta.role },
                { label: 'Duration', value: meta.duration },
                { label: 'Industry', value: meta.industry },
                { label: 'Status', value: meta.status }
              ].map((item) => (
                <div key={item.label} className="text-replicate-on-dark-mute">
                  <div className="text-xs md:text-sm font-body mb-1">{item.label}</div>
                  <div className="text-sm md:text-base font-display text-replicate-on-primary">{item.value}</div>
                </div>
              ))}
            </div>

            {/* Metrics */}
            {metrics.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {metrics.map((metric, idx) => (
                  <div key={idx} className="bg-replicate-on-primary/20 backdrop-blur-sm p-6 rounded-md">
                    <div className="text-2xl md:text-3xl font-bold text-replicate-on-primary">
                      {metric.value}
                    </div>
                    <div className="text-xs md:text-sm text-replicate-on-dark-mute font-body">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      {sections.map((section, idx) => (
        <section
          key={section.id}
          className={`py-section px-6 ${
            section.isDark
              ? 'bg-replicate-surface-dark text-replicate-on-dark'
              : idx % 2 === 0
                ? 'bg-replicate-canvas text-replicate-ink'
                : 'bg-replicate-surface-bone text-replicate-ink'
          }`}
        >
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {section.title && (
                <h2 className={`text-5xl md:text-6xl font-bold mb-8 leading-tight tracking-tighter font-display ${
                  section.isDark ? 'text-replicate-on-dark' : 'text-replicate-ink'
                }`}>
                  {section.title}
                </h2>
              )}
              <div className={`font-body text-base md:text-lg leading-relaxed ${
                section.isDark ? 'text-replicate-on-dark' : 'text-replicate-body'
              }`}>
                {section.content}
              </div>
            </motion.div>
          </div>
        </section>
      ))}
    </div>
  );
}
