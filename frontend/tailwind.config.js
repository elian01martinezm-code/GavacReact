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
          sidebar: '#1e3a2f',      // Verde oscuro profundo (Sidebar)
          sidebarHover: '#2d4a3e',  // Verde un poco más claro para hover
          primary: '#4a7c59',       // Verde medio (Botones, acentos)
          primaryHover: '#3a6346',  // Verde oscuro para hover de botones
          bg: '#f5f0e8',            // Beige suave (Fondo general)
          card: '#ffffff',          // Blanco (Tarjetas)
          border: '#e5e0d8',        // Beige grisáceo (Bordes sutiles)
          text: '#1a1a1a',          // Negro suave (Títulos)
          textMuted: '#6b7280',     // Gris (Textos secundarios)
          success: '#10b981',       // Verde brillante (Estados activos)
          warning: '#f59e0b',       // Naranja (Alertas, en proceso)
          danger: '#ef4444',        // Rojo (Eliminados, alertas críticas)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'], // Para títulos elegantes si los usas
      }
    },
  },
  plugins: [],
}