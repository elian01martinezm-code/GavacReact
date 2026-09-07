import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoGavac from '../assets/logo_gavac.png';
import { 
  LayoutDashboard, Beef, Syringe, Dna, Milk, ClipboardList, 
  LogOut, Bell, ChevronDown 
} from 'lucide-react';

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  // Menú basado en el mockup
  const menuItems = [
    { path: '/app', label: 'Inicio', icon: LayoutDashboard },
    { path: '/app/ganado', label: 'Animales', icon: Beef },
    { path: '/app/sanidad', label: 'Sanidad', icon: Syringe },
    { path: '/app/reproduccion', label: 'Reproducción', icon: Dna },
    { path: '/app/inventario', label: 'Inventario', icon: ClipboardList }, // Ajustado al mockup
    { path: '/app/reportes', label: 'Reportes', icon: ClipboardList },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gavac-bg font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gavac-sidebar flex flex-col text-white shadow-xl z-20">
        {/* Logo Area */}
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          {/* Filtro brightness-0 invert vuelve el logo blanco puro */}
          <img src={logoGavac} alt="GAVAC" className="h-10 w-auto filter brightness-0 invert" />
          <div>
            <h1 className="text-xl font-bold tracking-wide">GAVAC</h1>
            <p className="text-[10px] text-white/60 uppercase tracking-widest">Gestión Ganadera</p>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  active 
                    ? 'bg-gavac-primary text-white shadow-md' 
                    : 'text-white/70 hover:bg-gavac-sidebarHover hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Perfil de Usuario (Abajo) */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gavac-primary flex items-center justify-center font-bold text-white shadow-md">
              {usuario?.nombreCompleto?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{usuario?.nombreCompleto || 'Andrés Martínez'}</p>
              <p className="text-xs text-white/60 truncate">{usuario?.rol || 'Administrador'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header Superior (Opcional, para buscador o notificaciones) */}
        <header className="h-16 bg-white border-b border-gavac-border flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-xl font-bold text-gavac-text">
            {menuItems.find(m => isActive(m.path))?.label || 'Panel'}
          </h2>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gavac-bg text-gavac-textMuted transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-gavac-danger"></span>
            </button>
            <div className="flex items-center gap-2 text-sm font-medium text-gavac-text cursor-pointer">
              <span>Finca La Esperanza</span>
              <ChevronDown className="h-4 w-4 text-gavac-textMuted" />
            </div>
          </div>
        </header>

        {/* Área de las Páginas (Outlet) */}
        <div className="flex-1 overflow-auto p-8 bg-gavac-bg">
          <Outlet />
        </div>
      </main>
    </div>
  );
}