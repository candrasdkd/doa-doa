import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
      colors: {
        border: "hsl(214, 15%, 85%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(222.2, 47.4%, 11.2%)",
        'muted-foreground': "hsl(215, 16%, 46%)",
        ring: "hsl(222.2, 84%, 4.9%)",
        // dark
        'bg-dark': "hsl(222.2, 84%, 4.9%)",
        'fg-dark': "hsl(210, 40%, 98%)"
      },
      fontFamily: {
        sans: ["var(--font-inter)"]
      }
    }
  },
  plugins: []
};
export default config;
