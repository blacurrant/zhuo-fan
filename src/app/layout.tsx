import React from 'react';
import '../styles/index.css';
import Navbar from '@/components/sections/Navbar';
import dynamic from 'next/dynamic';
import ToggleNavbar from '@/components/ToggleNavbar';

const PageLoader = dynamic(() => import('@/components/ui/PageLoader'), {
  ssr: false,
  loading: () => null,
});


const InvertCursor = dynamic(() => import('@/components/ui/InvertCursor'), {
  ssr: false,
  loading: () => null,
});

const Noise = dynamic(() => import('@/components/ui/Noise'), {
  ssr: false,
  loading: () => null,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://nishant.world'),
  title: 'Nishant Choudhary — Design Engineer & Creative Developer',
  description:
    'Design engineer and creative developer. GPU simulation, WebGL, motion systems and 200+ animated components shipped this year. React, Next.js, GSAP, Three.js. Based in India, working remote. Available for work.',
  keywords:
    'design engineer, creative developer, webgl developer, frontend engineer, interaction design, motion design, gsap, three.js, shaders, react, next.js, nishant choudhary',
  authors: [{ name: 'Nishant Choudhary' }],
  creator: 'Nishant Choudhary',
  openGraph: {
    title: 'Nishant Choudhary — Design Engineer & Creative Developer',
    description: 'Design engineer and creative developer — GPU simulation, WebGL and motion systems. Based in India, working remote.',
    url: 'https://nishant.world',
    siteName: 'Nishant Choudhary',
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://nishant.world/og-image.png', width: 1200, height: 630, alt: 'Nishant Choudhary — Design Engineer & Creative Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nishant Choudhary — Design Engineer & Creative Developer',
    description: 'Design engineer and creative developer — GPU simulation, WebGL and motion systems. Based in India, working remote.',
    images: ['https://nishant.world/og-image.png'],
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased relative flex">
        <div className="w-full relative">
          <div
            style={{
              position: 'fixed',
              inset: 0, 
              zIndex: 200, 
              pointerEvents: 'none',
            }}
          >
            <Noise
              patternSize={250}
              patternScaleX={1}
              patternScaleY={1}
              patternRefreshInterval={2}
              patternAlpha={15}
            />
          </div>
          <PageLoader />
          <InvertCursor />
          {/* <ToggleNavbar /> */}
          {/* <Navbar /> */}
          {children}
        </div>
      </body>
    </html>
  );
}
