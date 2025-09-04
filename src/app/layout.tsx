import React from 'react';
import '../styles/index.css';
import Navbar from '@/components/sections/Navbar';
import InvertCursor from '@/components/ui/InvertCursor';
import Noise from '@/components/ui/Noise';

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
              zIndex: -1, 
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
          <Navbar />
          {children}
        </div>
        {/* <div className="hidden lg:flex absolute top-0 bottom-0 right-0 w-[12%] bg-white dark:bg-black py-10">
          <div className="z-0 h-screen w-full flex flex-col items-center justify-evenly">
            <p className="w-7xl z-10 font-mono text-black dark:text-white text-md font-light rotate-90 p-4">
              01/02
            </p>
            <p className="w-7xl z-10 font-mono text-black dark:text-white text-md font-light rotate-90 p-4">
              @ nishant choudhary
            </p>
          </div>
        </div> */}
        <script
          type="module"
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fnishants1754back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.8"
        ></script>
      </body>
    </html>
  );
}
