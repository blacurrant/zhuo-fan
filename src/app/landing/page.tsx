import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import WorkSection from '@/components/sections/WorkSection';
import AboutSection from '@/components/sections/AboutSection';
import Navbar from '@/components/sections/Navbar';
import ContactSection from '@/components/sections/ContactSection';

const LandingPage: React.FC = () => {
  return (
    <main className='relative'>
      <Navbar />
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />

    </main>
  );
};

export default LandingPage;
