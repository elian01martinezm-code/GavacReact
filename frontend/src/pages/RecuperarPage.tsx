// src/pages/RecuperarPage.tsx
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import logoGavac from '../assets/logo-gavac.png'; // <-- .png en lugar de .jpg 

export default function RecuperarPage() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el correo de recuperación
    console.log('Enviar correo a:', email);
    setEnviado(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-950 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(34,197,94,0.3) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-green-100">
        <div className="flex justify-center mb-6">
          <img src={logoGavac} alt="GAVAC Logo" className="h-20 w-auto" />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Recuperar Contraseña</h1>
          <p className="text-sm text-gray-500 mt-1">Te enviaremos un enlace de recuperación</p>
        </div>

        {enviado ? (
          <div className="text-center">
            <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-200 mb-4">
              <p className="font-medium">¡Correo enviado!</p>
              <p className="text-sm mt-1">Revisa tu bandeja de entrada en <strong>{email}</strong></p>
            </div>
            <Link to="/login" className="text-green-600 font-bold hover:underline">
              ← Volver al inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-gray-50"
                placeholder="tu@correo.com"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition shadow-lg"
            >
              Enviar enlace de recuperación
            </button>

            <div className="text-center">
              <Link to="/login" className="text-sm text-green-600 font-medium hover:underline">
                ← Volver al inicio de sesión
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}