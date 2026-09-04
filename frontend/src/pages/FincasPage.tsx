// src/pages/FincasPage.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import type { Finca } from '../types';

const mockFincas: Finca[] = [
  { id: '1', nombre: 'Finca La Esperanza', ubicacion: 'Vereda El Tambo, Córdoba', hectareas: 150, activo: true },
  { id: '2', nombre: 'Hacienda Los Ceibos', ubicacion: 'Yopal, Casanare', hectareas: 420, activo: true },
];

export default function FincasPage() {
  const { usuario } = useAuth();
  const [fincas, setFincas] = useState<Finca[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', ubicacion: '', hectareas: '' });

  useEffect(() => {
    const datos = localStorage.getItem('gavac_fincas');
    if (datos) setFincas(JSON.parse(datos));
    else {
      localStorage.setItem('gavac_fincas', JSON.stringify(mockFincas));
      setFincas(mockFincas);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaFinca: Finca = {
      id: crypto.randomUUID(),
      nombre: formData.nombre,
      ubicacion: formData.ubicacion,
      hectareas: Number(formData.hectareas),
      activo: true,
    };
    const actualizadas = [...fincas, nuevaFinca];
    setFincas(actualizadas);
    localStorage.setItem('gavac_fincas', JSON.stringify(actualizadas));
    setFormData({ nombre: '', ubicacion: '', hectareas: '' });
    setShowForm(false);
  };

  const toggleActivo = (id: string) => {
    const actualizadas = fincas.map(f => f.id === id ? { ...f, activo: !f.activo } : f);
    setFincas(actualizadas);
    localStorage.setItem('gavac_fincas', JSON.stringify(actualizadas));
  };

  if (usuario?.rol !== 'ADMINISTRADOR') {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700">⛔ Acceso Denegado</h2>
          <p className="text-red-600">Solo el administrador puede gestionar fincas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gavac-text">Gestión de Fincas</h1>
          <p className="text-gavac-textMuted mt-1">Administrar las explotaciones ganaderas (RF-002, HU-002)</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 bg-gavac-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gavac-primaryHover transition shadow-sm">
          <span>➕</span> Nueva Finca
        </button>
      </div>

      {showForm && (
        <div className="bg-gavac-card rounded-xl border border-gavac-border shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-gavac-text mb-4">Registrar Nueva Finca</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input type="text" placeholder="Nombre de la finca" value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg outline-none focus:ring-2 focus:ring-gavac-primary/20" required />
            <input type="text" placeholder="Ubicación (Municipio, Vereda)" value={formData.ubicacion} onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })} className="px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg outline-none focus:ring-2 focus:ring-gavac-primary/20" required />
            <input type="number" placeholder="Hectáreas" value={formData.hectareas} onChange={(e) => setFormData({ ...formData, hectareas: e.target.value })} className="px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg outline-none focus:ring-2 focus:ring-gavac-primary/20" required />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-gavac-primary text-white rounded-lg font-bold hover:bg-gavac-primaryHover transition">Guardar</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">Cancelar</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-gavac-card rounded-xl border border-gavac-border shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gavac-bg border-b border-gavac-border">
            <tr>
              <th className="px-6 py-4 font-semibold text-gavac-textMuted">Nombre</th>
              <th className="px-6 py-4 font-semibold text-gavac-textMuted">Ubicación</th>
              <th className="px-6 py-4 font-semibold text-gavac-textMuted">Hectáreas</th>
              <th className="px-6 py-4 font-semibold text-gavac-textMuted">Estado</th>
              <th className="px-6 py-4 font-semibold text-gavac-textMuted text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gavac-border">
            {fincas.map((finca) => (
              <tr key={finca.id} className="hover:bg-gavac-bg/50 transition-colors">
                <td className="px-6 py-4 font-medium text-gavac-text">{finca.nombre}</td>
                <td className="px-6 py-4 text-gavac-textMuted">{finca.ubicacion}</td>
                <td className="px-6 py-4 text-gavac-text">{finca.hectareas} ha</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${finca.activo ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                    {finca.activo ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => toggleActivo(finca.id)} className={`text-sm font-medium ${finca.activo ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}>
                    {finca.activo ? 'Desactivar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}