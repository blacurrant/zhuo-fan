import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import WorkSection from '@/components/sections/workSectionMain';
import AboutSection from '@/components/sections/AboutSection';
import Navbar from '@/components/sections/Navbar';
import ContactSection from '@/components/sections/ContactSection';
import LogoLoop from '@/components/ui/LogoLoop';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiGithub,
  SiPython,
  SiShadcnui,
  SiHtml5,
  SiCss3,
  SiAdobe,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
} from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiJavascript />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiGithub />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiPython />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiShadcnui />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiHtml5 />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiCss3 />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiAdobe />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiNodedotjs />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiMongodb />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiExpress />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
];

const LandingPage: React.FC = () => {
  return (
    <main className="relative w-full">
      {/* <Navbar /> */}
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <div className='bg-white dark:bg-gray-950' style={{ height: '100px', position: 'relative', overflow: 'hidden' }}>
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#ffffff"
          ariaLabel="Technology partners"
        />
      </div>
      {/* <ContactSection /> */}
      <section className="sticky top-0 h-screen z-40">
        <ContactSection />
      </section>
    </main>
  );
};

export default LandingPage;
