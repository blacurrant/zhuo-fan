'use client';
import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { experience, projects, testimonials } from '@/utils/landing-data';
import ExperienceSwitch from '@/components/ui/ExperienceSwitch';

const PF = '"Playfair Display", "Georgia", "Times New Roman", serif';
const GEO = '"Georgia", "Times New Roman", serif';
const MONO = '"JetBrains Mono", monospace';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const Rule = () => (
  <div className="flex items-center gap-3 w-full">
    <div style={{ flex: 1, height: '1px', background: 'rgba(20,12,5,0.18)' }} />
    <span style={{ color: 'rgba(234,40,4,0.85)', fontSize: '0.65rem', filter: 'url(#ink-rough)' }}>✦</span>
    <div style={{ flex: 1, height: '1px', background: 'rgba(20,12,5,0.18)' }} />
  </div>
);

const SectionLabel = ({ label }: { label: string }) => (
  <p style={{ fontFamily: GEO, fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(20,12,5,0.45)', marginBottom: '1rem', filter: 'url(#ink-rough)' }}>
    {label}
  </p>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: PF, fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 100, color: 'rgba(12,7,2,0.88)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '1.2rem', filter: 'url(#ink-rough)' }}>
    {children}
  </h2>
);

export default function LandingPage() {
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('nishantchoudhary.dev@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }, []);

  return (
    <main style={{ background: '#f9f7f3', minHeight: '100vh' }}>

      {/* Shared ink-rough SVG filter */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="ink-rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ── MASTHEAD ── */}
      <section className="px-6 md:px-16 pt-20 md:pt-28 pb-16 md:pb-20 max-w-5xl mx-auto">
        <motion.div {...fadeUp(0.1)} style={{ fontFamily: GEO, fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(20,12,5,0.6)', marginBottom: '1.5rem', filter: 'url(#ink-rough)' }}>
          Vol. I &nbsp;·&nbsp; Portfolio 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: PF, fontSize: 'clamp(4rem, 11vw, 9.5rem)', fontWeight: 100, color: 'rgba(12,7,2,0.92)', lineHeight: 0.88, letterSpacing: '-0.02em', marginBottom: '0.15em', filter: 'url(#ink-rough)' }}
        >
          Nishant<br />Choudhary
        </motion.h1>

        <motion.div {...fadeUp(0.55)} className="my-8"><Rule /></motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <motion.div {...fadeUp(0.65)}>
            <p style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', color: 'rgba(20,12,5,0.85)', letterSpacing: '0.06em', marginBottom: '1.2rem' }}>
              Full-Stack Creative Developer
            </p>
            <p style={{ fontFamily: GEO, fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)', color: 'rgba(20,12,5,0.72)', lineHeight: 1.9 }}>
              Developer & Designer with 2+ years crafting immersive digital experiences. Based in India, working remote. Obsessive about craft.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.78)} className="flex flex-col gap-5">
            <button
              onClick={copyEmail}
              className="group flex items-center gap-2 w-fit"
              style={{ fontFamily: MONO, fontSize: '0.8rem', color: 'rgba(20,12,5,0.75)', letterSpacing: '0.04em', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              nishantchoudhary.dev@gmail.com
              <Copy size={12} style={{ opacity: 0.4 }} className="group-hover:opacity-80 transition-opacity" />
              {copied && <span style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.7rem', color: 'rgba(234,40,4,0.85)' }}>copied!</span>}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.8rem', color: 'rgba(20,12,5,0.6)' }}>Available for work</span>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center self-start"
              style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'rgba(234,40,4,0.85)', filter: 'url(#ink-rough)' }}
            >
              <span style={{ color: 'rgba(255,255,255,0.92)', fontSize: '0.9rem', lineHeight: 1 }}>✦</span>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.38rem', letterSpacing: '0.14em', marginTop: '2px', fontFamily: GEO, fontWeight: 700 }}>NC</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE — editorial CV list, text-forward, no images ── */}
      <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <SectionLabel label="The Record" />
          <SectionHeading>Experience.</SectionHeading>
          <Rule />
        </motion.div>

        <div className="flex flex-col">
          {experience.map((item, idx) => (
            <motion.div
              key={item.id}
              {...fadeUp(0.08 * idx)}
              onClick={() => router.push(item.route)}
              className="group cursor-pointer grid grid-cols-[2.5rem_1fr] md:grid-cols-[3.5rem_1fr] gap-4 md:gap-8 py-8"
              style={{ borderBottom: '1px solid rgba(20,12,5,0.1)' }}
            >
              {/* Roman numeral — left gutter */}
              <div className="pt-1 select-none" style={{ fontFamily: GEO, fontSize: '0.65rem', letterSpacing: '0.14em', color: 'rgba(234,40,4,0.6)', filter: 'url(#ink-rough)' }}>
                {item.numeral}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 style={{ fontFamily: PF, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 100, color: 'rgba(12,7,2,0.9)', lineHeight: 1, letterSpacing: '-0.01em', filter: 'url(#ink-rough)' }}>
                    {item.company}
                  </h3>
                  <ArrowUpRight
                    size={15}
                    style={{ marginTop: '6px', flexShrink: 0, color: 'rgba(20,12,5,0.2)', transition: 'all 0.25s' }}
                    className="group-hover:text-[rgba(234,40,4,0.75)] group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(20,12,5,0.7)' }}>{item.role}</span>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(20,12,5,0.2)', display: 'inline-block' }} />
                  <span style={{ fontFamily: MONO, fontSize: '0.68rem', color: 'rgba(20,12,5,0.4)', letterSpacing: '0.06em' }}>{item.period}</span>
                </div>

                <p style={{ fontFamily: GEO, fontSize: '0.85rem', color: 'rgba(20,12,5,0.6)', lineHeight: 1.85, maxWidth: '58ch', marginTop: '4px' }}>
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {item.tags.map(tag => (
                    <span
                      key={tag}
                      style={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.08em', color: 'rgba(20,12,5,0.45)', border: '1px solid rgba(20,12,5,0.15)', padding: '2px 8px' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS — image-forward editorial grid ── */}
      <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <SectionLabel label="Personal Work" />
          <SectionHeading>Projects.</SectionHeading>
          <Rule />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              {...fadeUp(0.1 * idx)}
              onClick={() => project.route !== '#' && router.push(project.route)}
              className={`group flex flex-col gap-3 ${project.route !== '#' ? 'cursor-pointer' : ''}`}
            >
              {/* Image / Video / placeholder */}
              <div
                className="overflow-hidden relative h-[40vh] md:h-[52vh]"
                style={{ border: '1px solid rgba(20,12,5,0.1)', background: (project.image || project.video) ? undefined : 'rgba(20,12,5,0.03)' }}
              >
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                ) : project.image ? (
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <span style={{ fontFamily: PF, fontSize: '3rem', color: 'rgba(20,12,5,0.08)', filter: 'url(#ink-rough)' }}>✦</span>
                    <span style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.8rem', color: 'rgba(20,12,5,0.3)', letterSpacing: '0.1em' }}>in the works</span>
                  </div>
                )}

                {/* Year stamp — top-left */}
                <div
                  className="absolute top-3 left-3"
                  style={{ fontFamily: MONO, fontSize: '0.6rem', color: 'rgba(252,252,252,0.7)', letterSpacing: '0.12em', textShadow: '0 1px 6px rgba(0,0,0,0.5)', background: 'rgba(0,0,0,0.22)', padding: '2px 6px' }}
                >
                  {project.year}
                </div>

                {project.route !== '#' && (
                  <div className="absolute top-3 right-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    <ArrowUpRight size={15} style={{ color: 'rgba(252,252,252,0.75)', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.5))' }} />
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="flex flex-col gap-1 px-1">
                <div className="flex items-baseline gap-2">
                  <h3 style={{ fontFamily: PF, fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)', fontWeight: 400, color: 'rgba(12,7,2,0.88)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                    {project.title}
                  </h3>
                  <span style={{ width: '1px', height: '14px', background: 'rgba(20,12,5,0.2)', display: 'inline-block', alignSelf: 'center' }} />
                  <span style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.75rem', color: 'rgba(234,40,4,0.75)' }}>{project.role}</span>
                </div>
                <p style={{ fontFamily: GEO, fontSize: '0.73rem', color: 'rgba(20,12,5,0.45)', letterSpacing: '0.06em' }}>{project.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS — editorial blockquotes ── */}
      <section style={{ background: 'rgba(20,12,5,0.03)', borderTop: '1px solid rgba(20,12,5,0.08)', borderBottom: '1px solid rgba(20,12,5,0.08)' }} className="px-6 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="mb-10">
            <SectionLabel label="Voices" />
            <SectionHeading>What they said.</SectionHeading>
            <Rule />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ border: '1px solid rgba(20,12,5,0.1)' }}>
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.id}
                {...fadeUp(0.1 * idx)}
                className={`flex flex-col gap-5 p-7 relative ${idx < testimonials.length - 1 ? 'border-b md:border-b-0 md:border-r border-[rgba(20,12,5,0.1)]' : ''}`}
                style={{ background: '#f9f7f3' }}
              >
                {/* Open-quote glyph */}
                <span
                  style={{ fontFamily: PF, fontSize: '4.5rem', lineHeight: 0.8, color: 'rgba(234,40,4,0.12)', filter: 'url(#ink-rough)', userSelect: 'none', display: 'block' }}
                  aria-hidden
                >
                  "
                </span>

                <p style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.88rem', color: 'rgba(20,12,5,0.72)', lineHeight: 1.85 }}>
                  {t.quote}
                </p>

                <div className="mt-auto flex flex-col gap-1 pt-4" style={{ borderTop: '1px solid rgba(20,12,5,0.1)' }}>
                  <span style={{ fontFamily: PF, fontSize: '0.95rem', fontWeight: 400, color: 'rgba(12,7,2,0.85)' }}>{t.author}</span>
                  <span style={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.1em', color: 'rgba(20,12,5,0.4)', textTransform: 'uppercase' }}>{t.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-10">
          <SectionLabel label="The Craftsman" />
          <SectionHeading>About.</SectionHeading>
          <Rule />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-2">
          <motion.div {...fadeUp(0.15)} className="overflow-hidden" style={{ border: '1px solid rgba(20,12,5,0.1)' }}>
            <Image src="/cat.jpg" alt="Me and Daisy" width={800} height={800} className="w-full h-full object-cover" style={{ maxHeight: '460px' }} />
          </motion.div>

          <motion.div {...fadeUp(0.3)} className="flex flex-col justify-center gap-6">
            <p style={{ fontFamily: PF, fontSize: 'clamp(1.15rem, 2vw, 1.55rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(12,7,2,0.82)', lineHeight: 1.55 }}>
              "Frontend Developer and Designer with 2+ years crafting beautiful, responsive web experiences."
            </p>
            <div style={{ width: '44px', height: '1px', background: 'rgba(20,12,5,0.22)' }} />
            <p style={{ fontFamily: GEO, fontSize: '0.9rem', color: 'rgba(20,12,5,0.65)', lineHeight: 1.9 }}>
              👋 Hi from me and Daisy!{' '}
              <span style={{ fontSize: '0.78rem', color: 'rgba(20,12,5,0.4)' }}>(she&apos;s not real)</span>.{' '}
              We pour our hearts into creating designs that aren&apos;t just pretty — things people enjoy using, remember, and come back to.
            </p>
            <p style={{ fontFamily: GEO, fontSize: '0.8rem', color: 'rgba(20,12,5,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              React.js &nbsp;·&nbsp; Next.js &nbsp;·&nbsp; TailwindCSS &nbsp;·&nbsp; TypeScript
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ background: 'rgba(12,7,2,0.94)', padding: '6rem 1.5rem' }}>
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeUp(0)} className="flex justify-end gap-8 mb-16">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nishant-choudhary-dev/' },
              { label: 'Twitter', href: 'https://x.com/nishantcy' },
              { label: 'Github', href: 'https://github.com/blacurrant' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(252,252,252,0.5)', letterSpacing: '0.06em', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(234,40,4,0.85)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(252,252,252,0.5)')}
              >
                {link.label}
              </a>
            ))}
          </motion.div>

          <motion.h2
            {...fadeUp(0.2)}
            style={{ fontFamily: PF, fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', fontWeight: 100, color: 'rgba(252,252,252,0.9)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '3rem', filter: 'url(#ink-rough)' }}
          >
            Curious what we<br />can build together?
          </motion.h2>

          <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row gap-5 items-start mb-24">
            <button
              onClick={() => window.open('mailto:nishantchoudhary.dev@gmail.com', '_blank')}
              style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.9rem', letterSpacing: '0.1em', color: 'rgba(252,252,252,0.85)', border: '1px solid rgba(252,252,252,0.25)', padding: '0.7rem 2rem', background: 'transparent', cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'rgba(234,40,4,0.85)'; b.style.borderColor = 'rgba(234,40,4,0.85)'; }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.borderColor = 'rgba(252,252,252,0.25)'; }}
            >
              Get in touch
            </button>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span style={{ fontFamily: GEO, fontStyle: 'italic', fontSize: '0.82rem', color: 'rgba(252,252,252,0.45)' }}>Available for work</span>
            </div>
          </motion.div>

          <div style={{ height: '1px', background: 'rgba(252,252,252,0.08)', marginBottom: '2rem' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ fontFamily: GEO, fontSize: '0.75rem', color: 'rgba(252,252,252,0.3)', letterSpacing: '0.04em' }}>
            <div><p>+91 9417801998</p><p>nishantchoudhary.dev@gmail.com</p></div>
            <div><p>Designed & Developed</p><p>by Nishant Choudhary</p></div>
            <div className="md:text-right"><p>All rights reserved,</p><p>NC ©2025</p></div>
          </div>
        </div>
      </section>

      <ExperienceSwitch current="editorial" />
    </main>
  );
}
