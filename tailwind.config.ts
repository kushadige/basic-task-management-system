import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          background: "#3b82f6",
          text: "#fff",
          hover: "#2563eb",
        },
        secondary: {
          background: "#100E1D",
          text: "#fff",
          hover: "#1E213A",
        },
        tertiary: {
          background: "#252945",
          text: "#6E707A",
          hover: "#333A56",
        },
        accent: {
          background: "#FFD43B",
          text: "#000",
          hover: "#FCC419",
        },
        danger: {
          background: "#ef4444",
          text: "#fff",
          hover: "#dc2626",
        },
        warning: {
          background: "#F59E0B",
          text: "#fff",
          hover: "#D97706",
        },
        success: {
          background: "#22c55e",
          text: "#fff",
          hover: "#16a34a",
        },
      },
    },
  },
  plugins: [],
};

export default config;
