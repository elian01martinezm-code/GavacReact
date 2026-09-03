import { useState, useEffect } from 'react';
import { apiCall } from '../api/client';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface Animal { 
    id: number; 
    ear_tag: string; 
    breed: string; 
    gender: string; 
    weight: number | null; 
    status: string; 
}

declare module 'jspdf' { 
    interface jsPDF { 
        autoTable: (options: any) => jsPDF; 
    } 
}

export default function GanadoPage() {
    const [animales, setAnimales] = useState<Animal[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ 
        ear_tag: '', 
        breed: '', 
        gender: 'macho', 
        weight: '' 
    });

    useEffect(() => { 
        cargarAnimales(); 
    }, []);

    const cargarAnimales = async () => {
        try {
            const data = await apiCall('/api/v1/ganado/');
            setAnimales(Array.isArray(data) ? data : []);
        } catch (error) { 
            setAnimales([]); 
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await apiCall('/api/v1/ganado/', { 
                method: 'POST', 
                body: JSON.stringify({ 
                    ...formData, 
                    weight: formData.weight ? parseFloat(formData.weight) : null 
                }) 
            });
            setShowModal(false);
            setFormData({ ear_tag: '', breed: '', gender: 'macho', weight: '' });
            cargarAnimales();
        } catch (error: any) { 
            alert('Error: ' + error.message); 
        }
    };

    // Lógica de filtrado
    const filteredAnimales = animales.filter(a => 
        a.ear_tag.toLowerCase().includes(searchTerm.toLowerCase()) || 
        a.breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Los botones solo se muestran si hay búsqueda activa
    const showExportButtons = searchTerm.length > 0;

    const exportarPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18); doc.setTextColor(27, 94, 32); doc.text('GAVAC - Animales Filtrados', 14, 20);
        doc.autoTable({ 
            startY: 30, 
            head: [['Arete', 'Raza', 'Sexo', 'Peso', 'Estado']], 
            body: filteredAnimales.map(a => [a.ear_tag, a.breed, a.gender, a.weight ? `${a.weight}kg` : 'N/A', a.status]), 
            theme: 'grid', 
            headStyles: { fillColor: [27, 94, 32] } 
        });
        doc.save(`animales-filtrados-${Date.now()}.pdf`);
    };

    const exportarExcel = () => {
        const data = [['Arete', 'Raza', 'Sexo', 'Peso', 'Estado'], ...filteredAnimales.map(a => [a.ear_tag, a.breed, a.gender, a.weight, a.status])];
        const ws = XLSX.utils.aoa_to_sheet(data); 
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Animales'); 
        XLSX.writeFile(wb, `animales-filtrados-${Date.now()}.xlsx`);
    };

    return (
        <div>
            {/* Header con Título y Botón de Registro */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gavac-text mb-2">Registro de Animales</h1>
                    <p className="text-gavac-textLight">Gestiona el inventario de tu hato ganadero</p>
                </div>
                <button 
                    onClick={() => setShowModal(true)}
                    className="bg-gavac-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-gavac-primaryHover hover:-translate-y-0.5 transition-all shadow-lg shadow-gavac-primary/20 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Registrar Animal
                </button>
            </div>

            {/* Barra de Búsqueda y Exportación Condicional */}
            <div className="bg-white rounded-xl border border-black/10 p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 bg-gavac-bg rounded-lg px-4 py-2.5 w-full md:w-96 text-gavac-textMuted">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4.3-4.3" />
                    </svg>
                    <input 
                        type="text" 
                        placeholder="Buscar por arete o raza..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm w-full text-gavac-text placeholder-gavac-textMuted" 
                    />
                </div>
                
                {/* Botones condicionales: Solo aparecen si hay búsqueda */}
                <div className={`flex gap-2 transition-all duration-300 ${showExportButtons ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none translate-x-4'}`}>
                    <button onClick={exportarPDF} className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors flex items-center gap-2">
                        📄 PDF
                    </button>
                    <button onClick={exportarExcel} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors flex items-center gap-2">
                        📊 Excel
                    </button>
                </div>
            </div>

            {/* Tabla de Animales */}
            <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-[#FAFAF8] border-b border-black/10">
                        <tr>
                            {['Arete', 'Raza', 'Sexo', 'Peso (kg)', 'Estado'].map(h => (
                                <th key={h} className="px-6 py-4 text-left text-xs font-bold text-gavac-textMuted uppercase tracking-wider">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {filteredAnimales.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gavac-textMuted">
                                    No se encontraron animales {searchTerm && 'con ese criterio'}.
                                </td>
                            </tr>
                        ) : (
                            filteredAnimales.map((animal) => (
                                <tr key={animal.id} className="hover:bg-gavac-bg transition-colors">
                                    <td className="px-6 py-4 font-semibold text-gavac-text">{animal.ear_tag}</td>
                                    <td className="px-6 py-4 text-gavac-textLight capitalize">{animal.breed}</td>
                                    <td className="px-6 py-4 text-gavac-textLight capitalize">{animal.gender}</td>
                                    <td className="px-6 py-4 text-gavac-textLight">{animal.weight ? `${animal.weight} kg` : 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${animal.status === 'activo' ? 'bg-gavac-light text-gavac-accent' : 'bg-red-100 text-red-700'}`}>
                                            {animal.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de Registro */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-serif font-bold text-gavac-text mb-4">Registrar Nuevo Animal</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gavac-text mb-2">Número de Arete *</label>
                                <input type="text" required placeholder="Ej: ARG-004" className="w-full p-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gavac-primary" value={formData.ear_tag} onChange={(e) => setFormData({...formData, ear_tag: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gavac-text mb-2">Raza *</label>
                                <input type="text" required placeholder="Ej: Brahman" className="w-full p-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gavac-primary" value={formData.breed} onChange={(e) => setFormData({...formData, breed: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gavac-text mb-2">Sexo *</label>
                                <select className="w-full p-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gavac-primary" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                                    <option value="macho">Macho</option>
                                    <option value="hembra">Hembra</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gavac-text mb-2">Peso (kg)</label>
                                <input type="number" step="0.1" placeholder="Ej: 250.5" className="w-full p-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gavac-primary" value={formData.weight} onChange={(e) => setFormData({...formData, weight: e.target.value})} />
                            </div>
                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-black/10">
                                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 text-gavac-textLight bg-gavac-bg rounded-lg hover:bg-[#EDE8E0] transition-colors font-semibold">Cancelar</button>
                                <button type="submit" className="px-6 py-2.5 text-white bg-gavac-primary rounded-lg hover:bg-gavac-primaryHover transition-colors font-semibold shadow-md">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}