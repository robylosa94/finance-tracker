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
        "color-background": "var(--color-background)",
        "color-background-darker": "var(--color-background-darker)",
        "color-foreground": "var(--color-foreground)",
        "color-primary": "var(--color-primary)",
        "color-primary-darker": "var(--color-primary-darker)",
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
