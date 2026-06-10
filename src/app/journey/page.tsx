import React from 'react';
import dynamic from 'next/dynamic';

const HorizontalJourney = dynamic(() => import('@/components/journey/HorizontalJourney'), { ssr: false });
const ExperienceSwitch = dynamic(() => import('@/components/ui/ExperienceSwitch'), { ssr: false });

export const metadata = {
  title: 'Journey - Nishant Choudhary',
  description: 'An immersive portfolio experience. Scroll through my creative journey.',
};

export default function JourneyPage() {
  return (
    <>
      <HorizontalJourney />
      <ExperienceSwitch current="journey" />
    </>
  );
}
