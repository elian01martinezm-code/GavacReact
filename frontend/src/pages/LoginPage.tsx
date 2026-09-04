import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Briefcase, Stethoscope, Mail, Lock, ShieldCheck, Cloud, LineChart, AlertCircle } from 'lucide-react';

const COLORS = {
  primary: '#2E7D32',
  primaryHover: '#256428',
  light: '#E4F1E5',
  bg: '#F6F4EF',
  border: '#E4DED2',
  text: '#22261F',
  textMuted: '#6B7269',
  error: '#DC2626',
};

const USER_TYPES = [
  { id: 'ADMINISTRADOR', label: 'Administrador', desc: 'Gestión completa', icon: User },
  { id: 'TRABAJADOR_CAMPO', label: 'Trabajador', desc: 'Registro de campo', icon: Briefcase },
  { id: 'VETERINARIO', label: 'Veterinario', desc: 'Control sanitario', icon: Stethoscope },
];

export default function LoginPreview() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [userType, setUserType] = useState('ADMINISTRADOR');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    
    if (success) {
      navigate('/app'); // Redirige a la ruta base de tu Dashboard
    } else {
      setError('Credenciales incorrectas. Revisa el email y la contraseña.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: 'linear-gradient(rgba(10,14,8,0.55), rgba(10,14,8,0.6)), linear-gradient(120deg, #3f5a2d 0%, #5c7a3f 35%, #7a9455 60%, #46612f 100%)', backgroundSize: 'cover' }}>
      
      <div className="relative w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="h-14 w-14 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: COLORS.primary }}>G</div>
          <div className="text-center">
            <p className="font-serif text-2xl font-bold text-white leading-none">GAVAC</p>
            <p className="text-xs font-semibold tracking-wide text-white/85 mt-1">Gestión Ganadera</p>
          </div>
        </div>

        {/* Tarjeta */}
        <div className="w-full bg-white rounded-2xl shadow-2xl px-7 py-8 sm:px-9 sm:py-10">
          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl mb-1.5" style={{ color: COLORS.text }}>Iniciar sesión</h1>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>Accede a tu cuenta para continuar</p>
          </div>

          {/* Banner de ayuda */}
          <div className="mb-6 p-3 rounded-lg border-2 border-dashed" style={{ borderColor: COLORS.primary, backgroundColor: COLORS.light }}>
            <p className="text-xs font-bold mb-2" style={{ color: COLORS.primary }}>🔑 Credenciales de prueba:</p>
            <div className="space-y-1 text-[11px]" style={{ color: COLORS.text }}>
              <p><strong>Admin:</strong> admin@gavac.com / admin123</p>
              <p><strong>Trabajador:</strong> trabajador@gavac.com / trab123</p>
              <p><strong>Veterinario:</strong> vet@gavac.com / vet123</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Tipo de usuario */}
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: COLORS.text }}>Tipo de usuario</p>
              <div className="grid grid-cols-3 gap-3">
                {USER_TYPES.map(({ id, label, desc, icon: Icon }) => {
                  const active = userType === id;
                  return (
                    <button key={id} type="button" onClick={() => setUserType(id)}
                      className="flex flex-col items-center text-center gap-2 rounded-xl border px-2 py-3 transition-colors"
                      style={{ borderColor: active ? COLORS.primary : COLORS.border, backgroundColor: active ? COLORS.light : '#fff' }}>
                      <Icon className="h-5 w-5" strokeWidth={1.75} color={active ? COLORS.primary : COLORS.textMuted} />
                      <span className="text-[11px] font-bold leading-tight" style={{ color: active ? COLORS.primary : COLORS.text }}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Correo */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text }}>Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: COLORS.textMuted }} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ej. admin@gavac.com"
                  className="w-full rounded-lg border pl-10 pr-4 py-3 text-sm outline-none"
                  style={{ borderColor: COLORS.border, backgroundColor: '#FAFAF7', color: COLORS.text }} required />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold" style={{ color: COLORS.text }}>Contraseña</label>
                <Link to="/recuperar" className="text-xs font-semibold hover:underline" style={{ color: COLORS.primary }}>¿Olvidaste tu contraseña?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: COLORS.textMuted }} />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full rounded-lg border pl-10 pr-4 py-3 text-sm outline-none"
                  style={{ borderColor: COLORS.border, backgroundColor: '#FAFAF7', color: COLORS.text }} required />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg border" style={{ borderColor: COLORS.error, backgroundColor: '#FEF2F2' }}>
                <AlertCircle className="h-4 w-4" style={{ color: COLORS.error }} />
                <p className="text-xs" style={{ color: COLORS.error }}>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={isLoading}
              className="w-full py-3.5 rounded-lg text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: COLORS.primary }}>
              {isLoading ? 'Verificando...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: COLORS.textMuted }}>
            ¿No tienes cuenta? <Link to="/register" className="font-bold hover:underline" style={{ color: COLORS.primary }}>Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}