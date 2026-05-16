import React, { useState, useEffect } from 'react';
import LandingPage from './landing/page';
import HorizontalJourney from '@/components/journey/HorizontalJourney';
const HomePage: React.FC = () => {

  return (
    <div>
      {/* <LandingPage /> */}
      <HorizontalJourney />
    </div>
  );
};

export default HomePage;
