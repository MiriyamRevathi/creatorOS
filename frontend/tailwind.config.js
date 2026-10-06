/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {'primary': '#412653', 'secondary': '#3F567F', 'accent1': '#D174D2', 'accent2': '#E0563F'}
    },
  },
  plugins: [],
}
