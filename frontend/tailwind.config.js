/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gavac: {
          bg: '#F7F4EF',
          text: '#1A1A14',
          textLight: '#4A4A40',
          textMuted: '#8A8A7A',
          primary: '#1B5E20',
          primaryHover: '#2E7D32',
          light: '#EAF3DE',
          accent: '#3B6D11',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['DM Serif Display', 'serif'],
      }
    },
  },
  plugins: [],
}