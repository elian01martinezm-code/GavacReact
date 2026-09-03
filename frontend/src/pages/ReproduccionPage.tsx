import { useState } from 'react';

interface EventoReproductivo {
    id: number;
    animal: string;
    tipo: string;
    fecha: string;
    estado: string;
    notas: string;
}

export default function ReproduccionPage() {
    const [showModal, setShowModal] = useState(false);
    const [eventos] = useState<EventoReproductivo[]>([
        { id: 1, animal: 'ARG-001', tipo: 'Inseminación', fecha: '2026-08-15', estado: 'Confirmado', notas: 'Toro Brahman' },
        { id: 2, animal: 'ARG-002', tipo: 'Parto esperado', fecha: '2026-09-20', estado: 'Pendiente', notas: 'Primera cría' },
        { id: 3, animal: 'ARG-003', tipo: 'Detección de celo', fecha: '2026-08-18', estado: 'En proceso', notas: 'Observación diaria' },
    ]);

    const stats = {
        gestantes: eventos.filter(e => e.estado === 'Confirmado').length,
        pendientes: eventos.filter(e => e.estado === 'Pendiente').length,
        partosMes: 2,
        tasaExito: '85%'
    };

    return (
        <div>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gavac-text mb-2">Reproducción</h1>
                    <p className="text-gavac-textLight">Control de partos, celos, inseminación y alertas del hato</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-gavac-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-gavac-primaryHover hover:-translate-y-0.5 transition-all shadow-lg shadow-gavac-primary/20"
                >
                    + Nuevo Evento
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-black/10 p-6">
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Gestantes</p>
                    <p className="text-3xl font-serif font-bold text-gavac-text">{stats.gestantes}</p>
                </div>
                <div className="bg-white rounded-xl border border-black/10 p-6">
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Pendientes</p>
                    <p className="text-3xl font-serif font-bold text-gavac-text">{stats.pendientes}</p>
                </div>
                <div className="bg-white rounded-xl border border-black/10 p-6">
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Partos este mes</p>
                    <p className="text-3xl font-serif font-bold text-gavac-text">{stats.partosMes}</p>
                </div>
                <div className="bg-white rounded-xl border border-black/10 p-6">
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Tasa de éxito</p>
                    <p className="text-3xl font-serif font-bold text-gavac-primary">{stats.tasaExito}</p>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#FAFAF8] border-b border-black/10">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Animal</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Fecha</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Notas</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {eventos.map((evento) => (
                            <tr key={evento.id} className="hover:bg-gavac-bg transition-colors">
                                <td className="px-6 py-4 font-semibold text-gavac-text">{evento.animal}</td>
                                <td className="px-6 py-4 text-gavac-textLight">{evento.tipo}</td>
                                <td className="px-6 py-4 text-gavac-textLight">{evento.fecha}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                        evento.estado === 'Confirmado' ? 'bg-gavac-light text-gavac-accent' :
                                        evento.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-blue-100 text-blue-700'
                                    }`}>
                                        {evento.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gavac-textMuted text-sm">{evento.notas}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-serif font-bold text-gavac-text mb-4">Nuevo Evento Reproductivo</h2>
                        <p className="text-gavac-textMuted text-sm mb-4">Módulo en desarrollo. Próximamente podrás registrar eventos aquí.</p>
                        <button 
                            onClick={() => setShowModal(false)}
                            className="w-full px-6 py-2.5 text-gavac-textLight bg-gavac-bg rounded-lg hover:bg-[#EDE8E0] transition-colors font-semibold"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}