// src/pages/DashboardPage.tsx
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const estadisticas = {
    totalAnimales: 245,
    vacasLecheras: 120,
    alertasSanitarias: 8,
    vacunasPendientes: 12,
  };

  const actividadReciente = [
    { tipo: 'Sanidad', descripcion: 'Bovino #1234 - Vacuna contra fiebre aftosa aplicada', fecha: 'Hace 2 horas', estado: 'Completado' },
    { tipo: 'Producción', descripcion: 'Bovino #1235 - Registro de peso: 450kg', fecha: 'Hace 5 horas', estado: 'Completado' },
    { tipo: 'Alerta', descripcion: 'Bovino #1236 - Vacuna vencida en 3 días', fecha: 'Hace 1 día', estado: 'Pendiente' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gavac-text">Panel de Control</h1>
        <p className="text-gavac-textMuted mt-1">Resumen general de la explotación ganadera</p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total de Animales */}
        <div className="bg-gavac-card rounded-xl p-6 shadow-sm border border-gavac-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gavac-light rounded-lg flex items-center justify-center">
              <span className="text-2xl">🐄</span>
            </div>
            <span className="text-xs font-semibold text-gavac-primary bg-gavac-light px-2.5 py-1 rounded-full">
              +12% este mes
            </span>
          </div>
          <h3 className="text-sm font-medium text-gavac-textMuted mb-1">Total de Animales</h3>
          <p className="text-3xl font-bold text-gavac-text">{estadisticas.totalAnimales}</p>
          <Link to="/app/ganado" className="text-sm text-gavac-primary font-medium hover:text-gavac-primaryHover mt-3 inline-block transition-colors">
            Ver inventario completo →
          </Link>
        </div>

        {/* Vacas Lecheras */}
        <div className="bg-gavac-card rounded-xl p-6 shadow-sm border border-gavac-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🥛</span>
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
              Producción activa
            </span>
          </div>
          <h3 className="text-sm font-medium text-gavac-textMuted mb-1">Vacas Lecheras</h3>
          <p className="text-3xl font-bold text-gavac-text">{estadisticas.vacasLecheras}</p>
          <Link to="/app/produccion" className="text-sm text-blue-700 font-medium hover:text-blue-800 mt-3 inline-block transition-colors">
            Ver producción →
          </Link>
        </div>

        {/* Alertas Sanitarias */}
        <div className="bg-gavac-card rounded-xl p-6 shadow-sm border border-gavac-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <span className="text-xs font-semibold text-red-700 bg-red-50 px-2.5 py-1 rounded-full">
              Requiere atención
            </span>
          </div>
          <h3 className="text-sm font-medium text-gavac-textMuted mb-1">Alertas Sanitarias</h3>
          <p className="text-3xl font-bold text-gavac-text">{estadisticas.alertasSanitarias}</p>
          <Link to="/app/sanidad" className="text-sm text-red-700 font-medium hover:text-red-800 mt-3 inline-block transition-colors">
            Gestionar alertas →
          </Link>
        </div>

        {/* Vacunas Pendientes */}
        <div className="bg-gavac-card rounded-xl p-6 shadow-sm border border-gavac-border hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💉</span>
            </div>
            <span className="text-xs font-semibold text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded-full">
              Próximos 7 días
            </span>
          </div>
          <h3 className="text-sm font-medium text-gavac-textMuted mb-1">Vacunas Pendientes</h3>
          <p className="text-3xl font-bold text-gavac-text">{estadisticas.vacunasPendientes}</p>
          <Link to="/app/sanidad" className="text-sm text-yellow-700 font-medium hover:text-yellow-800 mt-3 inline-block transition-colors">
            Programar →
          </Link>
        </div>
      </div>

      {/* Sección de actividad reciente y accesos rápidos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividad Reciente */}
        <div className="lg:col-span-2 bg-gavac-card rounded-xl shadow-sm border border-gavac-border p-6">
          <h2 className="text-lg font-bold text-gavac-text mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gavac-primary rounded-full"></span>
            Actividad Reciente en Campo
          </h2>
          <div className="space-y-3">
            {actividadReciente.map((actividad, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gavac-bg rounded-lg border border-gavac-border/50">
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                  actividad.estado === 'Completado' ? 'bg-gavac-primary' : 'bg-yellow-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gavac-textMuted bg-white border border-gavac-border px-2 py-0.5 rounded">
                      {actividad.tipo}
                    </span>
                    <span className="text-xs text-gavac-textMuted">{actividad.fecha}</span>
                  </div>
                  <p className="text-sm text-gavac-text font-medium">{actividad.descripcion}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  actividad.estado === 'Completado' 
                    ? 'text-gavac-primary bg-gavac-light' 
                    : 'text-yellow-700 bg-yellow-50'
                }`}>
                  {actividad.estado}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Accesos Rápidos */}
        <div className="bg-gavac-card rounded-xl shadow-sm border border-gavac-border p-6">
          <h2 className="text-lg font-bold text-gavac-text mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gavac-accent rounded-full"></span>
            Accesos Rápidos
          </h2>
          <div className="space-y-3">
            <Link to="/app/ganado" className="group block p-4 bg-gavac-light rounded-lg border border-gavac-primary/10 hover:border-gavac-primary/30 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">➕</span>
                <div>
                  <p className="text-sm font-bold text-gavac-text">Registrar Animal</p>
                  <p className="text-xs text-gavac-textMuted">Nuevo ingreso al hato</p>
                </div>
              </div>
            </Link>

            <Link to="/app/sanidad" className="group block p-4 bg-blue-50 rounded-lg border border-blue-100 hover:border-blue-200 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">💉</span>
                <div>
                  <p className="text-sm font-bold text-gavac-text">Registrar Vacuna</p>
                  <p className="text-xs text-gavac-textMuted">Control sanitario</p>
                </div>
              </div>
            </Link>

            <Link to="/app/reproduccion" className="group block p-4 bg-purple-50 rounded-lg border border-purple-100 hover:border-purple-200 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">🧬</span>
                <div>
                  <p className="text-sm font-bold text-gavac-text">Evento Reproductivo</p>
                  <p className="text-xs text-gavac-textMuted">Celo, inseminación o parto</p>
                </div>
              </div>
            </Link>

            <Link to="/app/reportes" className="group block p-4 bg-orange-50 rounded-lg border border-orange-100 hover:border-orange-200 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">📊</span>
                <div>
                  <p className="text-sm font-bold text-gavac-text">Generar Reporte</p>
                  <p className="text-xs text-gavac-textMuted">Exportar a PDF o Excel</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}