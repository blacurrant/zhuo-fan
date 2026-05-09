module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        global: {
          background1: "var(--global-bg-1)",
          background2: "var(--global-bg-2)",
          background3: "var(--global-bg-3)",
          background4: "var(--global-bg-4)",
          background5: "var(--global-bg-5)",
          background6: "var(--global-bg-6)",
          background7: "var(--global-bg-7)",
          background8: "var(--global-bg-8)",
          text1: "var(--global-text-1)",
          text2: "var(--global-text-2)",
          text3: "var(--global-text-3)",
          text4: "var(--global-text-4)",
          text5: "var(--global-text-5)",
          text6: "var(--global-text-6)",
          text7: "var(--global-text-7)",
          text8: "var(--global-text-8)",
          text9: "var(--global-text-9)"
        },
        header: {
          background1: "var(--header-bg-1)"
        },
        primary: {
          background: "var(--primary-background)",
          foreground: "var(--primary-foreground)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)"
        },
        secondary: {
          background: "var(--secondary-background)",
          foreground: "var(--secondary-foreground)",
          light: "var(--secondary-light)",
          dark: "var(--secondary-dark)"
        },
        // Replicate Design System
        replicate: {
          canvas: "#f9f7f3",
          "surface-bone": "#f3f0e8",
          "surface-card": "#ffffff",
          "surface-dark": "#202020",
          "surface-deep": "#000000",
          primary: "#ea2804",
          "primary-deep": "#c01f00",
          "hero-glow": "#ff6a3d",
          "hero-pink": "#f4a8a0",
          "on-primary": "#ffffff",
          hairline: "rgba(32,32,32,0.12)",
          "hairline-strong": "#202020",
          ink: "#202020",
          body: "#3a3a3a",
          charcoal: "#575757",
          mute: "#646464",
          ash: "#8d8d8d",
          stone: "#bbbbbb",
          "on-dark": "#fcfcfc",
          "on-dark-mute": "rgba(252,252,252,0.72)",
          "badge-success": "#2b9a66",
          link: "#ea2804",
          "ring-focus": "rgba(59,130,246,0.5)"
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        display: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
        section: '96px',
        band: '160px'
      },
      borderRadius: {
        xs: '4px',
        sm: '6px',
        md: '10px',
        lg: '16px',
        full: '9999px'
      }
    }
  },
  plugins: []
};