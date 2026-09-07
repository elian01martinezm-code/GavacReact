import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, Briefcase } from 'lucide-react';
import logoGavac from '../assets/logo_gavac.png';

const COLORS = {
  primary: '#2E7D32',
  error: '#DC2626',
};

const USER_TYPES = [
  { id: 'ADMINISTRADOR', label: 'Administrador', desc: 'Dueño de finca', icon: User },
  { id: 'TRABAJADOR_CAMPO', label: 'Trabajador', desc: 'Operario de campo', icon: Briefcase },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('ADMINISTRADOR');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);

    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        
        {/* Logo centrado */}
        <div className="flex justify-center mb-8">
          <img src={logoGavac} alt="GAVAC Logo" className="h-20 w-auto object-contain" />
        </div>

        {/* Tarjeta de Registro */}
        <div className="bg-white rounded-2xl shadow-xl px-8 py-10 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear cuenta</h1>
            <p className="text-sm text-gray-500">Solicita acceso al sistema</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Tipo de usuario */}
            <div>
              <p className="text-sm font-semibold mb-3 text-gray-700">Tipo de usuario</p>
              <div className="grid grid-cols-2 gap-3">
                {USER_TYPES.map(({ id, label, icon: Icon }) => {
                  const active = userType === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setUserType(id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        active
                          ? 'border-green-600 bg-green-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <Icon
                        className="h-6 w-6"
                        strokeWidth={2}
                        color={active ? COLORS.primary : '#6B7269'}
                      />
                      <span
                        className="text-xs font-semibold"
                        style={{ color: active ? COLORS.primary : '#22261F' }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nombre completo */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2} />
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="w-full rounded-lg border-2 border-gray-200 pl-11 pr-4 py-3 text-sm outline-none focus:border-green-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Correo */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ej. juan@finca.com"
                  className="w-full rounded-lg border-2 border-gray-200 pl-11 pr-4 py-3 text-sm outline-none focus:border-green-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full rounded-lg border-2 border-gray-200 pl-11 pr-4 py-3 text-sm outline-none focus:border-green-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" strokeWidth={2} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la contraseña"
                  className="w-full rounded-lg border-2 border-gray-200 pl-11 pr-4 py-3 text-sm outline-none focus:border-green-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-lg bg-green-700 text-white font-bold text-sm shadow-lg hover:bg-green-800 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Procesando...' : 'Solicitar acceso'}
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-500">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="font-bold text-green-600 hover:text-green-700 hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}