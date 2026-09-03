import { Link } from 'react-router-dom';

export default function DashboardPage() {
    const modulos = [
        { name: 'Registro de Animales', desc: 'Gestiona el inventario de tu hato', icon: '🐄', count: '124', link: '/app/ganado', color: 'bg-blue-50 text-blue-700' },
        { name: 'Reproducción', desc: 'Control de partos y celos', icon: '🐾', count: '12', link: '/app/reproduccion', color: 'bg-pink-50 text-pink-700' },
        { name: 'Producción', desc: 'Leche, carne y pesos', icon: '🥛', count: '85 L/día', link: '/app/produccion', color: 'bg-yellow-50 text-yellow-700' },
        { name: 'Sanidad', desc: 'Vacunas y tratamientos', icon: '💉', count: '3 alertas', link: '/app/sanidad', color: 'bg-red-50 text-red-700' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-gavac-text mb-2">Panel de Control</h1>
                <p className="text-gavac-textLight">Resumen general de la actividad de tu finca</p>
            </div>

            {/* Tarjetas de Resumen por Módulo */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {modulos.map((mod, i) => (
                    <Link to={mod.link} key={i} className="bg-white rounded-xl border border-black/10 p-6 hover:-translate-y-1 hover:shadow-lg transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-3xl">{mod.icon}</span>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${mod.color}`}>{mod.count}</span>
                        </div>
                        <h3 className="font-bold text-gavac-text group-hover:text-gavac-primary transition-colors">{mod.name}</h3>
                        <p className="text-sm text-gavac-textMuted mt-1">{mod.desc}</p>
                    </Link>
                ))}
            </div>

            {/* Actividad Reciente (Simulada) */}
            <div className="bg-white rounded-xl border border-black/10 p-6">
                <h2 className="font-serif font-bold text-xl text-gavac-text mb-4">Actividad Reciente</h2>
                <div className="space-y-4">
                    {[
                        { text: 'Se registró el animal ARG-004 (Brahman)', time: 'Hace 10 min', icon: '🐄' },
                        { text: 'Alerta de vacunación para ARG-002', time: 'Hace 2 horas', icon: '💉' },
                        { text: 'Registro de producción: 12.5L (ARG-002)', time: 'Hace 5 horas', icon: '' },
                    ].map((act, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gavac-bg transition-colors">
                            <span className="text-xl">{act.icon}</span>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gavac-text">{act.text}</p>
                                <p className="text-xs text-gavac-textMuted">{act.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}