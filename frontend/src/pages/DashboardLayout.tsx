// src/pages/DashboardLayout.tsx
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoGavac from '../assets/logo-gavac.png'; // <-- .png en lugar de .jpg

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const menuByRole: Record<string, Array<{ path: string; label: string; icon: string }>> = {
    ADMINISTRADOR: [
      { path: '/app', label: 'Dashboard', icon: '📊' },
      { path: '/app/ganado', label: 'Ganado', icon: '' },
      { path: '/app/sanidad', label: 'Sanidad', icon: '💉' },
      { path: '/app/reproduccion', label: 'Reproducción', icon: '🧬' },
      { path: '/app/produccion', label: 'Producción', icon: '' },
      { path: '/app/reportes', label: 'Reportes', icon: '' },
      { path: '/app/fincas', label: 'Fincas', icon: '' },
      { path: '/app/usuarios', label: 'Usuarios', icon: '' },
    ],
    PROPIETARIO: [
      { path: '/app', label: 'Dashboard', icon: '📊' },
      { path: '/app/ganado', label: 'Ganado', icon: '🐄' },
      { path: '/app/reproduccion', label: 'Reproducción', icon: '' },
      { path: '/app/produccion', label: 'Producción', icon: '🥛' },
      { path: '/app/reportes', label: 'Reportes', icon: '📈' },
    ],
    TRABAJADOR_CAMPO: [
      { path: '/app', label: 'Dashboard', icon: '' },
      { path: '/app/ganado', label: 'Ganado', icon: '🐄' },
      { path: '/app/sanidad', label: 'Sanidad', icon: '💉' },
      { path: '/app/reproduccion', label: 'Reproducción', icon: '🧬' },
      { path: '/app/produccion', label: 'Producción', icon: '🥛' },
    ],
    VETERINARIO: [
      { path: '/app', label: 'Dashboard', icon: '📊' },
      { path: '/app/sanidad', label: 'Sanidad', icon: '💉' },
      { path: '/app/reportes', label: 'Reportes', icon: '📈' },
    ],
  };

  const menuItems = menuByRole[usuario?.rol || 'TRABAJADOR_CAMPO'] || [];
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gavac-bg">
      <aside className="w-72 bg-white border-r border-gavac-border flex flex-col shadow-lg">
        <div className="px-6 py-6 border-b border-gavac-border bg-white flex flex-col items-center">
          <Link to="/app" className="block hover:scale-105 transition-transform duration-300">
            <img src={logoGavac} alt="GAVAC Logo" className="h-20 w-auto object-contain" />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                isActive(item.path)
                  ? 'bg-gavac-light text-gavac-primary border-l-4 border-gavac-primary shadow-sm'
                  : 'text-gavac-textMuted hover:bg-gavac-bg hover:text-gavac-primary'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gavac-border bg-gavac-bg/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-gavac-primary text-white flex items-center justify-center font-bold shadow-sm">
              {usuario?.nombreCompleto?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gavac-text truncate">{usuario?.nombreCompleto || 'Usuario'}</p>
              <p className="text-xs text-gavac-textMuted truncate">{usuario?.rol?.replace('_', ' ') || 'Rol'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors flex items-center justify-center gap-2 border border-red-100">
            <span>🚪</span> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-gavac-bg">
        <Outlet />
      </main>
    </div>
  );
}