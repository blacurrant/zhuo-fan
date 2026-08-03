// Shared project data — imported by the client-side ProjectBook and the
// server-rendered semantic mirror in app/journey/page.tsx. Keep this file
// free of 'use client' so the server component can import it.

export interface JourneyProject {
  title: string;
  subtitle: string;
  role: string;
  image: string;
  route: string;
}

export const PROJECTS: JourneyProject[] = [
  {
    title: 'Craon',
    subtitle: 'AI Video Editor · SaaS',
    role: 'Lead Frontend Engineer',
    image: '/craon/craon-hero.png',
    route: '/works/craon',
  },
  {
    title: 'MelloUp',
    subtitle: 'Event Marketing · MVP',
    role: 'Founding Engineer',
    image: '/melloup/melloup.png',
    route: '/works/melloup',
  },
  {
    title: 'Ibasho',
    subtitle: 'Brand · UI/UX · Web',
    role: 'Lead Designer & Developer',
    image: '/ibasho/ibashoo.png',
    route: '/works/ibasho',
  },
  {
    title: 'FreightEZ',
    subtitle: 'Fleet TMS · B2B SaaS',
    role: 'Frontend Engineer',
    image: '/freightez/freightez-hero.png',
    route: '/works/freightez',
  },
];
