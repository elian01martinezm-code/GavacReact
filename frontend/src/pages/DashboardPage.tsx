import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { Beef, Syringe, Baby, AlertTriangle, TrendingUp, TrendingDown, Bell, Calendar } from 'lucide-react';

const COLORS = {
  primary: '#40916C',
  dark: '#1B4332',
  bg: '#F5F5F0',
  text: '#1A1A1A',
  muted: '#6C757D',
};

// Datos mock realistas
const estadoGanado = [
  { name: 'En producción', value: 32, color: '#40916C' },
  { name: 'Secas', value: 8, color: '#95D5B2' },
  { name: 'Terneras', value: 5, color: '#F4A261' },
  { name: 'Vacas en cría', value: 3, color: '#E76F51' },
];

const actividadReciente = [
  { icon: '', title: 'Vacunación registrada - Lote 2', time: 'Hoy, 08:24', color: 'bg-green-100' },
  { icon: '🐣', title: 'Nacimiento registrado - Chapeta 1035', time: 'Ayer, 16:40', color: 'bg-blue-100' },
  { icon: '💔', title: 'Animal vendido - Chapeta 0872', time: 'Ayer, 11:15', color: 'bg-red-100' },
];

const kpis = [
  { label: 'Total animales', value: 48, change: '+5%', up: true, icon: Beef, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'En sanidad', value: 12, change: '+2%', up: true, icon: Syringe, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'En reproducción', value: 8, change: '+1%', up: true, icon: Baby, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Alertas', value: 2, change: '-3%', up: false, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50' },
];

export default function DashboardPage() {
  const { usuario } = useAuth();
  const nombre = usuario?.nombreCompleto?.split(' ')[0] || 'Andrés';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-4xl font-bold text-gavac-text mb-1">Inicio</h1>
        <p className="text-sm text-gavac-muted">Resumen general de tu finca</p>
      </div>

      {/* Banner de Bienvenida */}
      <div className="relative rounded-2xl overflow-hidden h-48 shadow-sm">
        <img 
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80" 
          alt="Campo ganadero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gavac-dark/80 to-gavac-dark/40"></div>
        <div className="relative z-10 p-8 h-full flex flex-col justify-center">
          <h2 className="text-white text-3xl font-bold mb-2">Hola, {nombre} </h2>
          <p className="text-white/90 text-sm max-w-md">Aquí tienes un resumen de la actividad de tu ganado.</p>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="bg-white rounded-xl p-5 shadow-sm border border-gavac-border hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2.5 rounded-lg ${kpi.bg}`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${kpi.up ? 'text-emerald-600' : 'text-red-500'}`}>
                  {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.change}
                </div>
              </div>
              <p className="text-xs text-gavac-muted font-medium uppercase tracking-wide mb-1">{kpi.label}</p>
              <p className="text-3xl font-bold text-gavac-text">{kpi.value}</p>
            </div>
          );
        })}
      </div>

      {/* Actividad Reciente + Estado del Ganado */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividad Reciente */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gavac-border">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-serif text-xl font-bold text-gavac-text">Actividad reciente</h3>
            <button className="text-xs text-gavac-primary font-semibold hover:underline">Ver todo</button>
          </div>
          <div className="space-y-3">
            {actividadReciente.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gavac-bg transition-colors">
                <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center text-lg flex-shrink-0`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gavac-text truncate">{item.title}</p>
                  <p className="text-xs text-gavac-muted">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estado del Ganado (Gráfico Dona) */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gavac-border">
          <h3 className="font-serif text-xl font-bold text-gavac-text mb-5">Estado del ganado</h3>
          <div className="relative h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={estadoGanado}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {estadoGanado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Total en el centro */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold text-gavac-text">48</span>
              <span className="text-xs text-gavac-muted">Total</span>
            </div>
          </div>
          {/* Leyenda */}
          <div className="space-y-2 mt-4">
            {estadoGanado.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gavac-muted">{item.name}</span>
                </div>
                <span className="font-semibold text-gavac-text">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}