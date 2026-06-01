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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0f5132", // Deep Corporate Green
          light: "#198754",
          dark: "#082f1e",
        },
        secondary: {
          DEFAULT: "#fd7e14", // Saffron Orange accent
          light: "#ff922b",
          dark: "#d9480f",
        },
        navy: {
          DEFAULT: "#0f172a", // Dark Blue accents
          light: "#1e293b",
          dark: "#020617",
        }
      },
    },
  },
  plugins: [],
};
export default config;
