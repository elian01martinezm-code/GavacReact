import { useState } from 'react';

interface RegistroProduccion {
    id: number;
    animal: string;
    tipo: string;
    cantidad: number;
    unidad: string;
    fecha: string;
}

export default function ProduccionPage() {
    const [showModal, setShowModal] = useState(false);
    const [registros] = useState<RegistroProduccion[]>([
        { id: 1, animal: 'ARG-002', tipo: 'Leche', cantidad: 12.5, unidad: 'litros', fecha: '2026-08-20' },
        { id: 2, animal: 'ARG-001', tipo: 'Peso', cantidad: 285, unidad: 'kg', fecha: '2026-08-18' },
        { id: 3, animal: 'ARG-003', tipo: 'Leche', cantidad: 8.3, unidad: 'litros', fecha: '2026-08-20' },
    ]);

    const stats = {
        produccionLeche: '20.8 L/día',
        animalesProduccion: 2,
        gananciaPeso: '+15 kg/mes',
        eficiencia: '92%'
    };

    return (
        <div>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gavac-text mb-2">Producción y Peso</h1>
                    <p className="text-gavac-textLight">Seguimiento de producción lechera, control de pesos y ganancias</p>
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
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Producción Leche</p>
                    <p className="text-3xl font-serif font-bold text-gavac-primary">{stats.produccionLeche}</p>
                </div>
                <div className="bg-white rounded-xl border border-black/10 p-6">
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Animales en Producción</p>
                    <p className="text-3xl font-serif font-bold text-gavac-text">{stats.animalesProduccion}</p>
                </div>
                <div className="bg-white rounded-xl border border-black/10 p-6">
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Ganancia de Peso</p>
                    <p className="text-3xl font-serif font-bold text-gavac-text">{stats.gananciaPeso}</p>
                </div>
                <div className="bg-white rounded-xl border border-black/10 p-6">
                    <p className="text-xs font-bold text-gavac-textMuted uppercase tracking-wide mb-2">Eficiencia</p>
                    <p className="text-3xl font-serif font-bold text-gavac-primary">{stats.eficiencia}</p>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#FAFAF8] border-b border-black/10">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Animal</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Cantidad</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {registros.map((registro) => (
                            <tr key={registro.id} className="hover:bg-gavac-bg transition-colors">
                                <td className="px-6 py-4 font-semibold text-gavac-text">{registro.animal}</td>
                                <td className="px-6 py-4 text-gavac-textLight">{registro.tipo}</td>
                                <td className="px-6 py-4 text-gavac-textLight">{registro.cantidad} {registro.unidad}</td>
                                <td className="px-6 py-4 text-gavac-textMuted">{registro.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-serif font-bold text-gavac-text mb-4">Nuevo Registro de Producción</h2>
                        <p className="text-gavac-textMuted text-sm mb-4">Módulo en desarrollo. Próximamente podrás registrar producción aquí.</p>
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