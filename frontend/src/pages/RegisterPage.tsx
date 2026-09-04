// src/pages/RegisterPage.tsx
import { Link } from 'react-router-dom';
import logoGavac from '../assets/logo-gavac.png'; // <-- .png en lugar de .jpg 

export default function RegisterPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Imagen de fondo de ganado en el potrero */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1545063914-0b5ee6f5a586?w=1920&q=80')" }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Tarjeta Centrada */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Logo Tipográfico Profesional - SIN IMAGEN */}
        <div className="bg-gradient-to-b from-green-50 to-white p-5 border-b border-green-100">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gavac-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">G</div>
              <span className="text-3xl font-bold text-gray-800 tracking-tight">GAVAC</span>
            </div>
            <span className="text-[10px] text-gavac-textMuted font-medium tracking-[0.2em] uppercase mt-2">Gestión Ganadera</span>
          </div>
        </div>

        <div className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Acceso Restringido</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Por seguridad del sistema (RF-003, HU-003), el registro de nuevos usuarios solo puede ser realizado por el <strong>Administrador Principal</strong> desde el panel de control.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Si necesitas acceso a la plataforma, por favor contacta al administrador de tu finca para que te asigne un usuario y contraseña.
          </p>

          <Link 
            to="/login" 
            className="inline-flex items-center justify-center gap-2 w-full bg-gavac-primary text-white py-3.5 rounded-lg font-bold text-base hover:bg-gavac-primaryHover transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Inicio de Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}