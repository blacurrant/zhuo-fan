'use client';

import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import Navbar from './sections/Navbar';

type Props = {};

function ToggleNavbar({}: Props) {
  const pathname = usePathname();

  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ['/ibasho'];

  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return <div>{!shouldHideNavbar && <Navbar />}</div>;
}

export default ToggleNavbar;
