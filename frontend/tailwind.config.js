/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
