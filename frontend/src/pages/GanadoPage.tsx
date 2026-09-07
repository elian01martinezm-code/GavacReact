import { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const animales = [
  { chapeta: '0010', nombre: 'B-0010', raza: 'Nelore', sexo: 'Macho', estado: 'Activo', lote: 'Lote 1' },
  { chapeta: '0011', nombre: 'B-0011', raza: 'Angus', sexo: 'Hembra', estado: 'Activo', lote: 'Lote 2' },
  { chapeta: '0012', nombre: 'B-0012', raza: 'Gyr', sexo: 'Macho', estado: 'Activo', lote: 'Lote 1' },
  { chapeta: '0013', nombre: 'B-0013', raza: 'Nelore', sexo: 'Hembra', estado: 'Activo', lote: 'Lote 3' },
  { chapeta: '0014', nombre: 'B-0014', raza: 'Brahman', sexo: 'Macho', estado: 'Vendido', lote: 'Lote 2' },
  { chapeta: '0015', nombre: 'B-0015', raza: 'Angus', sexo: 'Hembra', estado: 'Activo', lote: 'Lote 3' },
];

const estadoColors: Record<string, string> = {
  'Activo': 'bg-emerald-100 text-emerald-700',
  'Vendido': 'bg-orange-100 text-orange-700',
  'Muerto': 'bg-red-100 text-red-700',
};

export default function GanadoPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-gavac-text mb-1">Animales</h1>
          <p className="text-sm text-gavac-muted">Gestiona el registro y estado de tus animales</p>
        </div>
        <button className="px-5 py-2.5 rounded-lg bg-gavac-primary text-white font-semibold text-sm flex items-center gap-2 hover:bg-gavac-dark transition-colors shadow-sm">
          <Plus className="h-4 w-4" />
          Nuevo animal
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gavac-border flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gavac-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por chapeta, nombre o lote..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gavac-border text-sm outline-none focus:border-gavac-primary"
          />
        </div>
        <button className="px-4 py-2.5 rounded-lg border border-gavac-border text-sm font-medium text-gavac-muted hover:bg-gavac-bg flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-gavac-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gavac-bg border-b border-gavac-border">
              <tr>
                {['Chapeta', 'Nombre', 'Raza', 'Sexo', 'Estado', 'Lote', 'Acciones'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gavac-muted uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gavac-border">
              {animales.map((a) => (
                <tr key={a.chapeta} className="hover:bg-gavac-bg/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-gavac-text">{a.chapeta}</td>
                  <td className="px-5 py-4 text-sm text-gavac-text">{a.nombre}</td>
                  <td className="px-5 py-4 text-sm text-gavac-text">{a.raza}</td>
                  <td className="px-5 py-4 text-sm text-gavac-text">{a.sexo}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[a.estado]}`}>
                      {a.estado}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gavac-text">{a.lote}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded hover:bg-gavac-bg text-gavac-muted hover:text-gavac-primary">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-red-50 text-gavac-muted hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gavac-border bg-gavac-bg/30">
          <p className="text-xs text-gavac-muted">Mostrando 1 - 6 de 48</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                onClick={() => setCurrentPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === p ? 'bg-gavac-primary text-white' : 'text-gavac-muted hover:bg-gavac-bg'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}