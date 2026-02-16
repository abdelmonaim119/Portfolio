import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0b1020",
          900: "#111a33",
          800: "#1c2a52"
        },
        paper: {
          50: "#fbfbfb",
          100: "#f4f4f5",
          200: "#e7e7ea"
        }
      }
    }
  },
  plugins: []
};

export default config;

