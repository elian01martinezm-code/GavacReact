import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function DashboardLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path: string) => {
        return location.pathname.includes(path) 
            ? 'bg-gavac-light text-gavac-primary font-bold' 
            : 'text-gavac-textLight hover:bg-gavac-bg hover:text-gavac-text';
    };

    const handleRegisterClick = (module: string) => {
        setShowRegisterModal(false);
        // Redirige al módulo correspondiente (podrías abrir un modal específico después)
        navigate(`/app/${module}`);
    };

    return (
        <div className="min-h-screen bg-gavac-bg grid grid-cols-[264px_1fr]">
            {/* SIDEBAR */}
            <aside className="bg-white border-r border-black/10 flex flex-col p-5 h-screen sticky top-0">
                <div className="flex items-center gap-3 mb-6 px-2 cursor-pointer" onClick={() => navigate('/app')}>
                    <span className="text-2xl">🐾</span>
                    <div>
                        <p className="font-serif text-lg font-bold text-gavac-primary leading-none">Gavac</p>
                        <p className="text-[11px] text-gavac-textMuted">Livestock traceability</p>
                    </div>
                </div>

                {/* Botón de Registro en el Sidebar */}
                <button 
                    onClick={() => setShowRegisterModal(true)}
                    className="w-full bg-gavac-primary text-white rounded-xl py-3.5 px-4 text-sm font-bold mb-6 hover:bg-gavac-primaryHover hover:-translate-y-0.5 transition-all shadow-lg shadow-gavac-primary/20 flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Nuevo Registro
                </button>

                <nav className="flex flex-col gap-1 flex-1">
                    <Link to="/app" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${location.pathname === '/app' ? 'bg-gavac-light text-gavac-primary font-bold' : 'text-gavac-textLight hover:bg-gavac-bg hover:text-gavac-text'}`}>
                        📊 <span>Panel de Control</span>
                    </Link>
                    <Link to="/app/ganado" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive('/app/ganado')}`}>
                        🐄 <span>Registro de animales</span>
                    </Link>
                    <Link to="/app/reproduccion" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive('/app/reproduccion')}`}>
                         <span>Reproducción</span>
                    </Link>
                    <Link to="/app/produccion" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive('/app/produccion')}`}>
                        🥛 <span>Producción</span>
                    </Link>
                    <Link to="/app/sanidad" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive('/app/sanidad')}`}>
                        💉 <span>Sanidad</span>
                    </Link>
                    <Link to="/app/reportes" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive('/app/reportes')}`}>
                        📈 <span>Reportes</span>
                    </Link>
                </nav>

                <div className="border-t border-black/10 pt-3 mt-3 flex flex-col gap-1">
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gavac-textLight hover:bg-red-50 hover:text-red-700 transition-all text-left">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" />
                        </svg>
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>

            {/* CONTENIDO PRINCIPAL */}
            <div className="flex flex-col min-w-0">
                <header className="bg-white border-b border-black/10 px-7 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 bg-gavac-bg rounded-lg px-4 py-2.5 max-w-sm w-full text-gavac-textMuted">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                            <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
                        </svg>
                        <input type="text" placeholder="Búsqueda global..." className="bg-transparent border-none outline-none text-sm w-full text-gavac-text placeholder-gavac-textMuted" />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 pl-3 border-l border-black/10">
                            <div className="w-8 h-8 rounded-full bg-gavac-primary text-white flex items-center justify-center text-xs font-bold">A</div>
                            <span className="text-sm font-bold text-gavac-text">Admin</span>
                        </div>
                    </div>
                </header>

                <main className="p-8 max-w-7xl w-full mx-auto">
                    <Outlet />
                </main>
            </div>

            {/* Modal de Selección de Registro */}
            {showRegisterModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6">
                        <h3 className="text-xl font-serif font-bold text-gavac-text mb-4">¿Qué deseas registrar?</h3>
                        <div className="space-y-2">
                            <button onClick={() => handleRegisterClick('ganado')} className="w-full text-left px-4 py-3 rounded-lg border border-black/10 hover:bg-gavac-light hover:border-gavac-primary transition-all flex items-center gap-3">
                                 <span className="font-medium">Nuevo Animal</span>
                            </button>
                            <button onClick={() => handleRegisterClick('reproduccion')} className="w-full text-left px-4 py-3 rounded-lg border border-black/10 hover:bg-gavac-light hover:border-gavac-primary transition-all flex items-center gap-3">
                                🐾 <span className="font-medium">Evento Reproductivo</span>
                            </button>
                            <button onClick={() => handleRegisterClick('produccion')} className="w-full text-left px-4 py-3 rounded-lg border border-black/10 hover:bg-gavac-light hover:border-gavac-primary transition-all flex items-center gap-3">
                                🥛 <span className="font-medium">Registro de Producción</span>
                            </button>
                            <button onClick={() => handleRegisterClick('sanidad')} className="w-full text-left px-4 py-3 rounded-lg border border-black/10 hover:bg-gavac-light hover:border-gavac-primary transition-all flex items-center gap-3">
                                 <span className="font-medium">Registro Sanitario</span>
                            </button>
                        </div>
                        <button onClick={() => setShowRegisterModal(false)} className="w-full mt-4 py-2 text-sm text-gavac-textMuted hover:text-gavac-text transition-colors">
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}