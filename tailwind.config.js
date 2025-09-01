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
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};