import { Plus, Search, Filter } from 'lucide-react';

const insumos = [
  { nombre: 'Vacuna Brucelosis', categoria: 'Medicamento', cantidad: 50, unidad: 'Dosis', estado: 'Disponible' },
  { nombre: 'Vitaminas', categoria: 'Medicamento', cantidad: 30, unidad: 'Dosis', estado: 'Disponible' },
  { nombre: 'Desparasitante', categoria: 'Medicamento', cantidad: 20, unidad: 'Dosis', estado: 'Disponible' },
  { nombre: 'Sal Mineral', categoria: 'Suplemento', cantidad: 100, unidad: 'Kg', estado: 'Disponible' },
  { nombre: 'Concentrado', categoria: 'Alimento', cantidad: 500, unidad: 'Kg', estado: 'Bajo stock' },
  { nombre: 'Pasto de corte', categoria: 'Alimento', cantidad: 2000, unidad: 'Kg', estado: 'Disponible' },
];

const estadoColors: Record<string, string> = {
  'Disponible': 'bg-emerald-100 text-emerald-700',
  'Bajo stock': 'bg-orange-100 text-orange-700',
  'Agotado': 'bg-red-100 text-red-700',
};

export default function InventarioPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-gavac-text mb-1">Inventario</h1>
          <p className="text-sm text-gavac-muted">Gestiona los insumos y recursos de tu finca</p>
        </div>
        <button className="px-5 py-2.5 rounded-lg bg-gavac-primary text-white font-semibold text-sm flex items-center gap-2 hover:bg-gavac-dark transition-colors shadow-sm">
          <Plus className="h-4 w-4" />
          Nuevo insumo
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gavac-border flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gavac-muted" />
          <input type="text" placeholder="Buscar insumo..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gavac-border text-sm outline-none focus:border-gavac-primary" />
        </div>
        <button className="px-4 py-2.5 rounded-lg border border-gavac-border text-sm font-medium text-gavac-muted hover:bg-gavac-bg flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gavac-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gavac-bg border-b border-gavac-border">
              <tr>
                {['Nombre', 'Categoría', 'Cantidad', 'Unidad', 'Estado'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gavac-muted uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gavac-border">
              {insumos.map((ins, i) => (
                <tr key={i} className="hover:bg-gavac-bg/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-medium text-gavac-text">{ins.nombre}</td>
                  <td className="px-5 py-4 text-sm text-gavac-text">{ins.categoria}</td>
                  <td className="px-5 py-4 text-sm text-gavac-text">{ins.cantidad}</td>
                  <td className="px-5 py-4 text-sm text-gavac-text">{ins.unidad}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[ins.estado]}`}>
                      {ins.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-4 border-t border-gavac-border bg-gavac-bg/30">
          <p className="text-xs text-gavac-muted">Mostrando 1 - 6 de 12</p>
          <div className="flex items-center gap-1">
            {[1, 2].map((p) => (
              <button key={p} className={`w-8 h-8 rounded-lg text-xs font-medium ${p === 1 ? 'bg-gavac-primary text-white' : 'text-gavac-muted hover:bg-gavac-bg'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}