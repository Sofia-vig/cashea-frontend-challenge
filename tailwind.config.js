/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: { 400: "#A5B4FC", 500: "#818CF8" },
        card: "#FDF8F4",
        mint: "#9DEBC0",
        yellow: "#FDE68A",
        pink: "#FCA5A5",

        beige: "#F7EFE7",
        slate: "#1E1E2E",
        white: "#FFFFFF",
        graphite: "#2A2A3B",

        border: "#E5E7EB",
        gray: {
          700: "#374151",
          500: "#6B7280",
          300: "#CBD5E1",
          100: "#F1F5F9",
        },
      },
      fontFamily: {
        DMsansBold: ["DMsansBold"],
        DMsansRegular: ["DMsansRegular"],
      },
    },
  },
  plugins: [],
};
