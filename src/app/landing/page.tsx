import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';

const WorkSection = dynamic(() => import('@/components/sections/workSectionMain'), {
  ssr: false,
  loading: () => null,
});

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  ssr: false,
  loading: () => null,
});

const ContactSection = dynamic(() => import('@/components/sections/ContactSection'), {
  ssr: false,
  loading: () => null,
});

const LogoLoop = dynamic(() => import('@/components/ui/LogoLoop'), {
  ssr: false,
  loading: () => null,
});
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
  { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiGithub />, title: 'GitHub', href: 'https://github.com' },
  { node: <SiPython />, title: 'Python', href: 'https://python.org' },
  { node: <SiShadcnui />, title: 'Shadcn/ui', href: 'https://ui.shadcn.com' },
  { node: <SiHtml5 />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { node: <SiCss3 />, title: 'CSS3', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { node: <SiAdobe />, title: 'Adobe', href: 'https://adobe.com' },
  { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiMongodb />, title: 'MongoDB', href: 'https://mongodb.com' },
  { node: <SiExpress />, title: 'Express.js', href: 'https://expressjs.com' },
];

const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen relative w-full overflow-x-hidden">
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <div className='bg-white dark:bg-gray-950 w-full overflow-hidden' style={{ height: '100px', position: 'relative' }}>
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
      {/* <section className="sticky top-0 h-screen z-40 w-full"> */}
        <ContactSection />
      {/* </section> */}
    </main>
  );
};

export default LandingPage;