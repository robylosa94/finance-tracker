import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "color-background": "rgba(var(--color-background), <alpha-value>)",
        "color-background-darker": "rgba(var(--color-background-darker), <alpha-value>)",
        "color-background-darkest": "rgba(var(--color-background-darkest), <alpha-value>)",
        "color-foreground": "rgba(var(--color-foreground), <alpha-value>)",
        "color-primary": "rgba(var(--color-primary), <alpha-value>)",
        "color-primary-darker": "rgba(var(--color-primary-darker), <alpha-value>)",
      },
      spacing: {
        container: "var(--container)",
        "container-gutter": "var(--container-gutter)",
        "section-gap": "var(--section-gap)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
    },
  },
  plugins: [],
}
export default config
