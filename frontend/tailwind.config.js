// tailwind.config.js
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
          primary: '#166534',       // Verde bosque profundo (Profesional, serio)
          primaryHover: '#14532d',  // Verde más oscuro para efectos hover
          accent: '#65a30d',        // Verde lima (Toque tecnológico del logo)
          bg: '#F8FAFC',            // Fondo gris-azulado muy suave (menos cansado que blanco)
          card: '#FFFFFF',          // Blanco puro para tarjetas
          text: '#1E293B',          // Gris oscuro profesional para textos principales
          textMuted: '#64748B',     // Gris medio para textos secundarios
          light: '#F0FDF4',         // Verde muy pálido para fondos de alertas o badges
          border: '#E2E8F0',        // Bordes suaves y elegantes
        }
      }
    },
  },
  plugins: [],
}