/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#412653',
          slate: '#3F567F',
          lavender: '#D174D2',
          coral: '#E0563F',
          bg: '#FFFFFF',
          darkBg: '#120D1A',
          darkCard: '#1D1629',
        },
        creator: {
          purple: "#412653",
          "purple-hover": "#321d40",
          "purple-light": "#f4eef7",
          blue: "#3F567F",
          "blue-hover": "#334668",
          "blue-light": "#edf2f9",
          lavender: "#D174D2",
          "lavender-light": "#faeefb",
          coral: "#E0563F",
          "coral-hover": "#c94630",
          "coral-light": "#fef2f0",
          bg: "#FFFFFF",
          surface: "#F9FAFC",
          border: "#E2E8F0",
          muted: "#64748B",
          dark: "#0F172A",
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
