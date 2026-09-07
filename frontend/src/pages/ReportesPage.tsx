import { FileText, Beef, Syringe, Baby, Package, BarChart3, Calendar } from 'lucide-react';
import { useState } from 'react';

const reportes = [
  { titulo: 'Inventario de animales', desc: 'Listado completo del ganado por finca y lote.', icon: Beef, color: 'bg-emerald-100 text-emerald-600' },
  { titulo: 'Sanidad', desc: 'Historial de vacunaciones y tratamientos.', icon: Syringe, color: 'bg-blue-100 text-blue-600' },
  { titulo: 'Reproducción', desc: 'Eventos reproductivos y preñeces.', icon: Baby, color: 'bg-purple-100 text-purple-600' },
  { titulo: 'Inventario', desc: 'Stock de insumos y recursos.', icon: Package, color: 'bg-orange-100 text-orange-600' },
  { titulo: 'General', desc: 'Resumen completo de la finca.', icon: BarChart3, color: 'bg-pink-100 text-pink-600' },
];

export default function ReportesPage() {
  const [fechaInicio, setFechaInicio] = useState('2025-07-01');
  const [fechaFin, setFechaFin] = useState('2025-07-31');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold text-gavac-text mb-1">Reportes</h1>
          <p className="text-sm text-gavac-muted">Consulta y genera reportes de tu finca</p>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-lg border border-gavac-border p-2">
          <Calendar className="h-4 w-4 text-gavac-muted ml-2" />
          <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="text-sm border-0 outline-none text-gavac-text" />
          <span className="text-gavac-muted text-xs">-</span>
          <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} className="text-sm border-0 outline-none text-gavac-text" />
          <button className="px-4 py-2 rounded-lg bg-gavac-primary text-white text-sm font-semibold hover:bg-gavac-dark transition-colors">
            Generar reporte
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reportes.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.titulo} className="bg-white rounded-xl p-6 shadow-sm border border-gavac-border hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
              <div className={`w-12 h-12 rounded-xl ${r.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg text-gavac-text mb-2">{r.titulo}</h3>
              <p className="text-sm text-gavac-muted leading-relaxed">{r.desc}</p>
              <button className="mt-4 text-sm font-semibold text-gavac-primary hover:underline flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Generar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}