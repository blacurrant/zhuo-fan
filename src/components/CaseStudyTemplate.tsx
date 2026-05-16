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
    <div className="min-h-screen bg-replicate-canvas text-replicate-ink selection:bg-replicate-primary/10">
      {/* Ink roughness filter — globally defined for this page */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="ink-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Hero Section - The Archival Header */}
      <section className="relative pt-32 pb-20 border-b border-replicate-hairline">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back to Journey Stamp */}
            <button
              onClick={() => router.push(backHref)}
              className="mb-12 group relative flex items-center justify-center w-fit"
            >
               <motion.div 
                className="px-6 py-2 border border-replicate-primary/30 rounded-full flex items-center gap-3 transition-all group-hover:bg-replicate-primary/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
               >
                  <ArrowLeft size={16} className="text-replicate-primary" />
                  <span style={{
                    fontFamily: '"Georgia", serif',
                    fontStyle: 'italic',
                    fontSize: '0.75rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(20,12,5,0.75)',
                    filter: 'url(#ink-rough)',
                  }}>
                    Return to Journey
                  </span>
               </motion.div>
            </button>

            <div className="flex flex-col items-center text-center">
               {/* Edition Label */}
               <div style={{
                  fontFamily: '"Georgia", serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'rgba(20,12,5,0.6)',
                  marginBottom: '2rem',
                  filter: 'url(#ink-rough)',
               }}>
                  Chronicle &nbsp;·&nbsp; Case Study Vol. I
               </div>

              {/* Title - Stamped */}
              <h1 
                className="text-7xl md:text-9xl font-light mb-6 tracking-tighter leading-none"
                style={{
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  color: 'rgba(12,7,2,0.92)',
                  filter: 'url(#ink-rough)',
                }}
              >
                {title}
              </h1>

              {/* Ornate Divider */}
              <div className="flex items-center gap-4 mb-8">
                  <div style={{ width: '60px', height: '1px', background: 'rgba(20,12,5,0.15)' }} />
                  <span style={{ color: 'rgba(234,40,4,0.7)', fontSize: '0.7rem' }}>✦</span>
                  <div style={{ width: '60px', height: '1px', background: 'rgba(20,12,5,0.15)' }} />
              </div>

              {/* Subtitle */}
              <p 
                className="text-2xl md:text-3xl mb-4 italic"
                style={{
                  fontFamily: '"Georgia", serif',
                  color: 'rgba(20,12,5,0.85)',
                  lineHeight: 1.4,
                  maxWidth: '30ch',
                }}
              >
                {subtitle}
              </p>

              <p 
                className="text-lg text-replicate-mute mb-16 max-w-2xl"
                style={{
                  fontFamily: '"Georgia", serif',
                  lineHeight: 1.8,
                }}
              >
                {description}
              </p>
            </div>

            {/* Meta Grid - Archivist Style */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-b border-replicate-hairline py-12">
              {[
                { label: 'Role', value: meta.role },
                { label: 'Duration', value: meta.duration },
                { label: 'Industry', value: meta.industry },
                { label: 'Status', value: meta.status }
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] mb-3 text-replicate-primary/70">{item.label}</div>
                  <div className="text-sm font-display italic text-replicate-ink">{item.value}</div>
                </div>
              ))}
            </div>
            {/* Metrics - Codex Tablets */}
            {metrics.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
              >
                {metrics.map((metric, idx) => (
                  <div 
                    key={idx} 
                    className="p-6 border border-replicate-hairline bg-replicate-surface-bone/50 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-replicate-primary/40 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="text-2xl font-bold text-replicate-primary mb-1" style={{ fontFamily: '"Playfair Display", serif' }}>
                      {metric.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-replicate-mute font-bold">
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
      <div className="max-w-5xl mx-auto px-6">
        {sections.map((section, idx) => (
          <section
            key={section.id}
            className={`py-24 border-b border-replicate-hairline last:border-0 ${
              section.isDark ? 'bg-replicate-surface-dark text-replicate-on-dark -mx-screen px-screen' : ''
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {section.title && (
                <h2 
                  className="text-4xl md:text-5xl font-bold mb-10 tracking-tight"
                  style={{
                    fontFamily: '"Playfair Display", "Georgia", serif',
                    filter: 'url(#ink-rough)',
                  }}
                >
                  {section.title}
                </h2>
              )}
              <div 
                className="text-lg leading-relaxed"
                style={{
                  fontFamily: '"Georgia", serif',
                  color: section.isDark ? 'rgba(252,252,252,0.85)' : 'rgba(20,12,5,0.75)',
                }}
              >
                {section.content}
              </div>
            </motion.div>
          </section>
        ))}
      </div>

      {/* Footer - Final Stamp */}
      <footer className="py-32 text-center">
          <div 
            className="inline-flex flex-col items-center justify-center p-8 border border-replicate-hairline"
            style={{ filter: 'url(#ink-rough)' }}
          >
              <div className="text-replicate-primary text-xl mb-2">✦</div>
              <div className="font-display font-bold text-xs uppercase tracking-widest">End of Record</div>
          </div>
      </footer>
    </div>
  );
}
