import React from 'react';
import '../styles/index.css';
import Navbar from '@/components/sections/Navbar';
import dynamic from 'next/dynamic';
import ToggleNavbar from '@/components/ToggleNavbar';


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
  title: 'Nishant Choudhary - Fullstack Developer Portfolio',
  description:
    'Professional portfolio of Nishant Choudhary, a skilled fullstack developer with 2 years of experience in React.js, Next.js, and TailwindCSS. Available for hire.',
  keywords:
    'fullstack developer, react developer, next.js, tailwindcss, web development, portfolio, nishant choudhary',
  authors: [{ name: 'Nishant Choudhary' }],
  creator: 'Nishant Choudhary',
  openGraph: {
    title: 'Nishant Choudhary - Fullstack Developer Portfolio',
    description: 'Professional portfolio showcasing fullstack development projects and skills',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nishant Choudhary - Fullstack Developer Portfolio',
    description: 'Professional portfolio showcasing fullstack development projects and skills',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
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
          <InvertCursor />
          <ToggleNavbar />
          {/* <Navbar /> */}
          {children}
        </div>
      </body>
    </html>
  );
}
