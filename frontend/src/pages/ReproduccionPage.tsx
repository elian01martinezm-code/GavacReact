import { Plus, Search, Filter } from 'lucide-react';

const eventos = [
  { fecha: '2025-07-20', chapeta: '0012', tipo: 'Monta', estado: 'En proceso', observaciones: '-' },
  { fecha: '2025-07-15', chapeta: '0015', tipo: 'Inseminación', estado: 'Confirmada', observaciones: 'Preñada' },
  { fecha: '2025-07-10', chapeta: '0011', tipo: 'Parto', estado: 'Completado', observaciones: 'Hembra con cría' },
  { fecha: '2025-06-28', chapeta: '0013', tipo: 'Monta', estado: 'En proceso', observaciones: '-' },
  { fecha: '2025-06-20', chapeta: '0014', tipo: 'Inseminación', estado: 'Confirmada', observaciones: 'Preñada' },
  { fecha: '2025-06-15', chapeta: '0010', tipo: 'Parto', estado: 'Completado', observaciones: 'Macho' },
];

const estadoColors: Record<string, string> = {
  'Completado': 'bg-emerald-100 text-emerald-700',
  'Confirmada': 'bg-blue-100 text-blue-700',
  'En proceso': 'bg-orange-100 text-orange-700',
};

export default function ReproduccionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-gavac-text mb-1">Reproducción</h1>
          <p className="text-sm text-gavac-muted">Controla los eventos reproductivos de tu ganado</p>
        </div>
        <button className="px-5 py-2.5 rounded-lg bg-gavac-primary text-white font-semibold text-sm flex items-center gap-2 hover:bg-gavac-dark transition-colors shadow-sm">
          <Plus className="h-4 w-4" />
          Registrar evento
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gavac-border flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gavac-muted" />
          <input type="text" placeholder="Buscar por chapeta o tipo..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gavac-border text-sm outline-none focus:border-gavac-primary" />
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
                {['Fecha', 'Chapeta', 'Tipo', 'Estado', 'Observaciones'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gavac-muted uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gavac-border">
              {eventos.map((e, i) => (
                <tr key={i} className="hover:bg-gavac-bg/50 transition-colors">
                  <td className="px-5 py-4 text-sm text-gavac-text">{e.fecha}</td>
                  <td className="px-5 py-4 text-sm font-medium text-gavac-text">{e.chapeta}</td>
                  <td className="px-5 py-4 text-sm text-gavac-text">{e.tipo}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${estadoColors[e.estado]}`}>
                      {e.estado}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gavac-text">{e.observaciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-4 border-t border-gavac-border bg-gavac-bg/30">
          <p className="text-xs text-gavac-muted">Mostrando 1 - 6 de 18</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`w-8 h-8 rounded-lg text-xs font-medium ${p === 1 ? 'bg-gavac-primary text-white' : 'text-gavac-muted hover:bg-gavac-bg'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}