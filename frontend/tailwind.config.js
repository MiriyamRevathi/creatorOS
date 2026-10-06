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
          purple: "#412653",
          slate: "#3F567F",
          lavender: "#D174D2",
          coral: "#E0563F",
          bg: "#FFFFFF",
          muted: "#F8F6FA",
          border: "#E7E2ED",
          darkBg: "#120D1A",
          darkCard: "#1D1629"
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
