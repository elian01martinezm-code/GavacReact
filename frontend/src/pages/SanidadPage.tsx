import { useState } from 'react';

interface RegistroSanidad {
    id: number;
    animal: string;
    tipo: string;
    producto: string;
    fecha: string;
    proximaDosis: string;
    estado: string;
}

export default function SanidadPage() {
    const [showModal, setShowModal] = useState(false);
    const [registros] = useState<RegistroSanidad[]>([
        { id: 1, animal: 'ARG-001', tipo: 'Vacunación', producto: 'Aftosa', fecha: '2026-07-15', proximaDosis: '2027-01-15', estado: 'Al día' },
        { id: 2, animal: 'ARG-002', tipo: 'Desparasitación', producto: 'Ivermectina', fecha: '2026-08-01', proximaDosis: '2026-11-01', estado: 'Al día' },
        { id: 3, animal: 'ARG-003', tipo: 'Vacunación', producto: 'Rabia', fecha: '2026-06-20', proximaDosis: '2026-12-20', estado: 'Pendiente' },
    ]);

    const stats = {
        alDia: registros.filter(r => r.estado === 'Al día').length,
        pendientes: registros.filter(r => r.estado === 'Pendiente').length,
        vacunacionesMes: 5,
        alertas: 1
    };

    return (
        <div>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gavac-text mb-2">Sanidad y Vacunación</h1>
                    <p className="text-gavac-textLight">Calendario sanitario, historial médico y alertas de vacunación</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-gavac-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-gavac-primaryHover hover:-translate-y-0.5 transition-all shadow-lg shadow-gavac-primary/20"
                >
                    + Nuevo Registro
                </button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-black/10 p-6">
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Al Día</p>
                    <p className="text-3xl font-serif font-bold text-gavac-primary">{stats.alDia}</p>
                </div>
                <div className="bg-white rounded-xl border border-black/10 p-6">
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Pendientes</p>
                    <p className="text-3xl font-serif font-bold text-yellow-600">{stats.pendientes}</p>
                </div>
                <div className="bg-white rounded-xl border border-black/10 p-6">
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Vacunaciones este mes</p>
                    <p className="text-3xl font-serif font-bold text-gavac-text">{stats.vacunacionesMes}</p>
                </div>
                <div className="bg-white rounded-xl border border-red-200 p-6">
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Alertas Activas</p>
                    <p className="text-3xl font-serif font-bold text-red-600">{stats.alertas}</p>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#FAFAF8] border-b border-black/10">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Animal</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Producto</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Fecha Aplicación</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Próxima Dosis</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {registros.map((registro) => (
                            <tr key={registro.id} className="hover:bg-gavac-bg transition-colors">
                                <td className="px-6 py-4 font-semibold text-gavac-text">{registro.animal}</td>
                                <td className="px-6 py-4 text-gavac-textLight">{registro.tipo}</td>
                                <td className="px-6 py-4 text-gavac-textLight">{registro.producto}</td>
                                <td className="px-6 py-4 text-gavac-textMuted">{registro.fecha}</td>
                                <td className="px-6 py-4 text-gavac-textMuted">{registro.proximaDosis}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                        registro.estado === 'Al día' ? 'bg-gavac-light text-gavac-accent' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {registro.estado}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-serif font-bold text-gavac-text mb-4">Nuevo Registro Sanitario</h2>
                        <p className="text-gavac-textMuted text-sm mb-4">Módulo en desarrollo. Próximamente podrás registrar tratamientos aquí.</p>
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