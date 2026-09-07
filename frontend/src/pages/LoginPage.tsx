import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import logoGavac from '../assets/logo_gavac.png';
import fondoLogin from '../assets/fondo_login.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [email, setEmail] = useState('admin@gavac.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) navigate('/app');
    else setError('Credenciales incorrectas. Revisa el email y la contraseña.');
  };

  return (
    <div className="flex min-h-screen">
      {/* === LADO IZQUIERDO: IMAGEN DE FONDO CON LOGO === */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12 overflow-hidden">
        {/* Imagen de fondo */}
        <img 
          src={fondoLogin} 
          alt="Campo ganadero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay oscuro para que el texto y logo resalten */}
        <div className="absolute inset-0 bg-gradient-to-br from-gavac-dark/70 via-gavac-dark/60 to-gavac-dark/50"></div>
        
        {/* Contenido centrado */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-lg">
          {/* Logo centrado - SIN contenedor beige */}
          <div className="mb-8">
            <img src={logoGavac} alt="GAVAC" className="h-24 w-auto object-contain" />
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
            Tu ganado,<br/>mejor gestionado.
          </h2>
          <p className="text-gray-200 text-lg leading-relaxed">
            Control total de tu hato, sanidad y reproducción en un solo lugar.
          </p>
        </div>
      </div>

      {/* === LADO DERECHO: FORMULARIO === */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo solo visible en móvil - SIN contenedor */}
          <div className="lg:hidden flex justify-center mb-8">
            <img src={logoGavac} alt="GAVAC" className="h-20 w-auto object-contain" />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gavac-text mb-2">Iniciar sesión</h1>
            <p className="text-gavac-muted">Accede a tu cuenta para continuar</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gavac-text mb-2">Usuario</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gavac-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ej. admin@gavac.com"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gavac-border bg-gray-50 text-gavac-text outline-none focus:border-gavac-primary focus:ring-2 focus:ring-gavac-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gavac-text">Contraseña</label>
                <Link to="/recuperar" className="text-sm text-gavac-primary hover:underline">¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gavac-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-gavac-border bg-gray-50 text-gavac-text outline-none focus:border-gavac-primary focus:ring-2 focus:ring-gavac-primary/20 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gavac-muted hover:text-gavac-text"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Recordarme */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gavac-border text-gavac-primary focus:ring-gavac-primary" />
                <span className="text-sm text-gavac-muted">Recordarme</span>
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100">
                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <p className="text-xs text-red-600 font-medium">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-lg bg-gavac-primary text-white font-semibold text-sm shadow-md hover:bg-gavac-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          {/* Acceso rápido */}
          <div className="mt-6 p-4 rounded-lg bg-gavac-bg border border-gavac-border">
            <p className="text-xs font-semibold text-gavac-primary mb-2 flex items-center gap-1">
              🔑 Acceso rápido (Pruebas):
            </p>
            <p className="text-xs text-gavac-muted">
              Admin: admin@gavac.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}