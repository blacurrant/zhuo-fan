import React from 'react';
import dynamic from 'next/dynamic';
import { PROJECTS } from '@/components/journey/projects';

const HorizontalJourney = dynamic(() => import('@/components/journey/HorizontalJourney'), { ssr: false });
const ExperienceSwitch = dynamic(() => import('@/components/ui/ExperienceSwitch'), { ssr: false });

export const metadata = {
  title: 'Journey - Nishant Choudhary',
  description: 'An immersive portfolio experience. Scroll through my creative journey.',
};

// Duplicated from FarewellChest (client module — not importable here). 4 lines, acceptable.
const CONTACT_LINKS = [
  { label: 'GitHub', href: 'https://github.com/blacurrant' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nishant-choudhary-dev' },
  { label: 'Twitter', href: 'https://twitter.com/nishantcy' },
  { label: 'Résumé (PDF)', href: '/Nishant_Choudhary_CV.pdf' },
];

export default function JourneyPage() {
  return (
    <>
      {/* Semantic mirror — server-rendered content for crawlers, agents and
          assistive tech. The visual experience below is client-only (ssr: false)
          and ships an empty body without this. */}
      <section className="sr-only">
        <h1>Nishant Choudhary — Design Engineer & Creative Developer</h1>
        <p>
          Charting immersive digital worlds through code, design, and obsessive attention to
          craft. This page is an interactive, horizontally-scrolling journey; a conventional
          version of the same content is at <a href="/landing">/landing</a>.
        </p>
        <h2>Selected Work</h2>
        <ul>
          {PROJECTS.map((p) => (
            <li key={p.route}>
              <a href={p.route}>{p.title}</a> — {p.subtitle} ({p.role})
            </li>
          ))}
        </ul>
        <h2>Contact</h2>
        <ul>
          {CONTACT_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </section>

      <noscript>
        <div style={{ padding: '2rem', fontFamily: 'Georgia, serif' }}>
          This journey needs JavaScript. Visit <a href="/landing">the landing page</a> for the
          full portfolio without it.
        </div>
      </noscript>

      <HorizontalJourney />
      <ExperienceSwitch current="journey" />
    </>
  );
}
