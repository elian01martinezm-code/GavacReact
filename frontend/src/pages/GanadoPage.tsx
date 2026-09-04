// src/pages/GanadoPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Animal } from '../types';

// Datos de prueba (Mock) actualizados con 'fechaRegistro' para cumplir con la interfaz Animal
const mockAnimales: Animal[] = [
  { 
    id: '1', 
    chapeta: 'COL-00123', 
    especie: 'BOVINO', 
    raza: 'Holstein', 
    sexo: 'HEMBRA', 
    fechaNacimiento: '2022-05-15', 
    peso: 450, 
    estado: 'ACTIVO', 
    fincaId: 'finca-01',
    fechaRegistro: '2024-01-10' // <-- Campo agregado
  },
  { 
    id: '2', 
    chapeta: 'COL-00124', 
    especie: 'BOVINO', 
    raza: 'Brahman', 
    sexo: 'MACHO', 
    fechaNacimiento: '2021-08-20', 
    peso: 520, 
    estado: 'ACTIVO', 
    fincaId: 'finca-01',
    fechaRegistro: '2024-01-12' // <-- Campo agregado
  },
  { 
    id: '3', 
    chapeta: 'COL-00125', 
    especie: 'BOVINO', 
    raza: 'Gyr', 
    sexo: 'HEMBRA', 
    fechaNacimiento: '2023-01-10', 
    peso: 310, 
    estado: 'ACTIVO', 
    fincaId: 'finca-01',
    fechaRegistro: '2024-02-05' // <-- Campo agregado
  },
  { 
    id: '4', 
    chapeta: 'COL-00126', 
    especie: 'BOVINO', 
    raza: 'Holstein', 
    sexo: 'HEMBRA', 
    fechaNacimiento: '2020-11-05', 
    peso: 480, 
    estado: 'VENDIDO', 
    fincaId: 'finca-01',
    fechaRegistro: '2023-11-20' // <-- Campo agregado
  },
];

export default function GanadoPage() {
  const [busqueda, setBusqueda] = useState('');

  // Lógica de búsqueda en tiempo real (RF-019)
  const animalesFiltrados = mockAnimales.filter(animal => 
    animal.chapeta.toLowerCase().includes(busqueda.toLowerCase()) ||
    animal.raza.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Función auxiliar para el color del badge de estado (RF-010: Eliminación lógica)
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'ACTIVO': return 'bg-gavac-light text-gavac-primary border-gavac-primary/20';
      case 'VENDIDO': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'FALLECIDO': return 'bg-red-50 text-red-700 border-red-200';
      case 'RETIRADO': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header del Módulo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gavac-text">Inventario de Ganado</h1>
          <p className="text-gavac-textMuted mt-1">Gestión y seguimiento del hato (RF-018)</p>
        </div>
        <Link 
          to="/app/ganado/nuevo" 
          className="inline-flex items-center justify-center gap-2 bg-gavac-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gavac-primaryHover transition-colors shadow-sm"
        >
          <span>➕</span> Registrar Animal
        </Link>
      </div>

      {/* Barra de Búsqueda y Filtros (RF-019) */}
      <div className="bg-gavac-card p-4 rounded-xl border border-gavac-border shadow-sm mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gavac-textMuted">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Buscar por chapeta o raza..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg focus:ring-2 focus:ring-gavac-primary/20 focus:border-gavac-primary outline-none transition text-sm"
          />
        </div>
      </div>

      {/* Tabla de Inventario */}
      <div className="bg-gavac-card rounded-xl border border-gavac-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gavac-bg border-b border-gavac-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-gavac-textMuted">Chapeta</th>
                <th className="px-6 py-4 font-semibold text-gavac-textMuted">Especie / Raza</th>
                <th className="px-6 py-4 font-semibold text-gavac-textMuted">Sexo</th>
                <th className="px-6 py-4 font-semibold text-gavac-textMuted">Peso</th>
                <th className="px-6 py-4 font-semibold text-gavac-textMuted">Estado</th>
                <th className="px-6 py-4 font-semibold text-gavac-textMuted text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gavac-border">
              {animalesFiltrados.length > 0 ? (
                animalesFiltrados.map((animal) => (
                  <tr key={animal.id} className="hover:bg-gavac-bg/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-gavac-text">{animal.chapeta}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gavac-text">{animal.especie}</div>
                      <div className="text-xs text-gavac-textMuted">{animal.raza}</div>
                    </td>
                    <td className="px-6 py-4 text-gavac-text">
                      {animal.sexo === 'MACHO' ? '♂️ Macho' : '♀️ Hembra'}
                    </td>
                    <td className="px-6 py-4 text-gavac-text font-medium">
                      {animal.peso} kg
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getEstadoColor(animal.estado)}`}>
                        {animal.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gavac-primary hover:text-gavac-primaryHover font-medium text-sm mr-3">
                        Ver
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 font-medium text-sm">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gavac-textMuted">
                    No se encontraron animales con esa búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Paginación simple (Visual por ahora) */}
        <div className="px-6 py-4 border-t border-gavac-border bg-gavac-bg/30 flex items-center justify-between">
          <span className="text-sm text-gavac-textMuted">
            Mostrando {animalesFiltrados.length} de {mockAnimales.length} animales
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gavac-border rounded bg-white text-gavac-textMuted disabled:opacity-50" disabled>
              Anterior
            </button>
            <button className="px-3 py-1 text-sm border border-gavac-border rounded bg-white text-gavac-textMuted disabled:opacity-50" disabled>
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}