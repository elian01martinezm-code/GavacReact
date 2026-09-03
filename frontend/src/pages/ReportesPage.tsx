import { useState, useEffect } from 'react';
import { apiCall } from '../api/client';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface ReporteData { total_animales: number; machos: number; hembras: number; peso_promedio: number; }
declare module 'jspdf' { interface jsPDF { autoTable: (options: any) => jsPDF; } }

export default function ReportesPage() {
    const [reporte, setReporte] = useState<ReporteData | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // Filtro de ejemplo

    useEffect(() => { cargarReporte(); }, []);

    const cargarReporte = async () => {
        try { const data = await apiCall('/api/v1/reportes/general'); setReporte(data); } 
        catch (error) { console.error(error); } 
        finally { setLoading(false); }
    };

    // Simulamos un filtro (en un caso real filtrarías por fechas o tipo de reporte)
    const showExportButtons = searchTerm.toLowerCase() === 'exportar' || searchTerm.length > 3;

    const exportarPDF = () => {
        if (!reporte) return;
        const doc = new jsPDF();
        doc.setFontSize(20); doc.setTextColor(27, 94, 32); doc.text('GAVAC - Reporte General', 14, 20);
        doc.autoTable({ startY: 30, head: [['Métrica', 'Valor']], body: [['Total', reporte.total_animales], ['Machos', reporte.machos], ['Hembras', reporte.hembras], ['Peso Prom.', `${reporte.peso_promedio} kg`]], theme: 'grid', headStyles: { fillColor: [27, 94, 32] } });
        doc.save('reporte-gavac.pdf');
    };

    const exportarExcel = () => {
        if (!reporte) return;
        const data = [['Métrica', 'Valor'], ['Total', reporte.total_animales], ['Machos', reporte.machos], ['Hembras', reporte.hembras], ['Peso Promedio', reporte.peso_promedio]];
        const ws = XLSX.utils.aoa_to_sheet(data); const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Reporte'); XLSX.writeFile(wb, 'reporte-gavac.xlsx');
    };

    if (loading) return <div className="flex items-center justify-center h-64"><p className="text-gavac-textMuted">Cargando...</p></div>;
    if (!reporte) return <div className="flex items-center justify-center h-64"><p className="text-red-600">Error al cargar.</p></div>;

    return (
        <div>
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gavac-text mb-2">Reportes y Análisis</h1>
                    <p className="text-gavac-textLight">Visualiza y exporta el estado general de tu hato</p>
                </div>
            </div>

            {/* Barra de Búsqueda y Exportación Condicional */}
            <div className="bg-white rounded-xl border border-black/10 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 bg-gavac-bg rounded-lg px-4 py-2.5 w-full md:w-96 text-gavac-textMuted">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
                    <input 
                        type="text" 
                        placeholder="Escribe 'exportar' o filtra por tipo..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm w-full text-gavac-text placeholder-gavac-textMuted" 
                    />
                </div>
                
                <div className={`flex gap-2 transition-all duration-300 ${showExportButtons ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none translate-x-4'}`}>
                    <button onClick={exportarPDF} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"> PDF</button>
                    <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2">📊 Excel</button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-black/10 p-6"><p className="text-xs font-bold text-gavac-textMuted uppercase mb-2">Total</p><p className="text-3xl font-serif font-bold text-gavac-text">{reporte.total_animales}</p></div>
                <div className="bg-white rounded-xl border border-black/10 p-6"><p className="text-xs font-bold text-gavac-textMuted uppercase mb-2">Machos</p><p className="text-3xl font-serif font-bold text-gavac-text">{reporte.machos}</p></div>
                <div className="bg-white rounded-xl border border-black/10 p-6"><p className="text-xs font-bold text-gavac-textMuted uppercase mb-2">Hembras</p><p className="text-3xl font-serif font-bold text-gavac-text">{reporte.hembras}</p></div>
                <div className="bg-white rounded-xl border border-black/10 p-6"><p className="text-xs font-bold text-gavac-textMuted uppercase mb-2">Peso Prom.</p><p className="text-3xl font-serif font-bold text-gavac-primary">{reporte.peso_promedio} <span className="text-lg text-gavac-textMuted">kg</span></p></div>
            </div>

            <div className="bg-white rounded-xl border border-black/10 p-8">
                <h2 className="text-xl font-serif font-bold text-gavac-text mb-4">Resumen General</h2>
                <p className="text-gavac-textLight leading-relaxed">El sistema registra <strong>{reporte.total_animales}</strong> animales ({reporte.machos} machos, {reporte.hembras} hembras) con un peso promedio de <strong>{reporte.peso_promedio} kg</strong>.</p>
            </div>
        </div>
    );
}