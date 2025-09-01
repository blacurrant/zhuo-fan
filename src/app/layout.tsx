import React from 'react';
import '../styles/index.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Nishant Choudhary - Fullstack Developer Portfolio',
  description: 'Professional portfolio of Nishant Choudhary, a skilled fullstack developer with 2 years of experience in React.js, Next.js, and TailwindCSS. Available for hire.',
  keywords: 'fullstack developer, react developer, next.js, tailwindcss, web development, portfolio, nishant choudhary',
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
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
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
      <body className="antialiased">
        {children}
        <script type="module" src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fnishants1754back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.8"></script>
      </body>
    </html>
  );
}
