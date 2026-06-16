import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#C0000A",
          light: "#E8000D",
          muted: "#7A0006",
        },
        bg: {
          DEFAULT: "#FFFFFF",
          muted: "#F8F8F8",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          muted: "#6B6B6B",
        },
        dark: {
          DEFAULT: "#0A0A0A",
          card: "#111111",
        },
        line: "#E5E5E5",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        "card-hover": "0 24px 48px rgba(192,0,10,0.15)",
        glow: "0 0 80px rgba(192,0,10,0.25)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(20px, -30px) scale(1.08)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-30px, 20px) scale(1.05)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
        float: "float 14s ease-in-out infinite",
        "float-slow": "float-slow 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
