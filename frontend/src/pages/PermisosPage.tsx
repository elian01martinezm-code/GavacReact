// src/pages/PermisosPage.tsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Check, X, Save, Search } from 'lucide-react';

const COLORS = {
  primary: '#059669',
  primaryHover: '#047857',
  primaryLight: '#d1fae5',
  bg: '#f1f5f9',
  card: '#ffffff',
  border: '#e2e8f0',
  text: '#1e293b',
  textMuted: '#64748b',
  danger: '#ef4444',
  dangerLight: '#fee2e2',
};

// Módulos del sistema
const MODULES = [
  { id: 'ganado', name: 'Ganado', icon: '🐄' },
  { id: 'sanidad', name: 'Sanidad', icon: '💉' },
  { id: 'reproduccion', name: 'Reproducción', icon: '🧬' },
  { id: 'produccion', name: 'Producción', icon: '🥛' },
  { id: 'fincas', name: 'Fincas', icon: '🏡' },
  { id: 'reportes', name: 'Reportes', icon: '📈' },
  { id: 'usuarios', name: 'Usuarios', icon: '👥' },
];

// Acciones posibles
const ACTIONS = ['Ver', 'Crear', 'Editar', 'Eliminar', 'Exportar'];

// Usuarios de prueba (simulados)
const MOCK_USERS = [
  { id: '1', nombre: 'Juan Pérez', rol: 'TRABAJADOR_CAMPO', email: 'juan@finca.com' },
  { id: '2', nombre: 'Dra. María López', rol: 'VETERINARIO', email: 'maria@vet.com' },
  { id: '3', nombre: 'Carlos Rodríguez', rol: 'TRABAJADOR_CAMPO', email: 'carlos@finca.com' },
];

export default function PermisosPage() {
  const { usuario } = useAuth();
  const [selectedUser, setSelectedUser] = useState(MOCK_USERS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({
    ganado: { Ver: true, Crear: true, Editar: false, Eliminar: false, Exportar: true },
    sanidad: { Ver: true, Crear: true, Editar: true, Eliminar: false, Exportar: true },
    reproduccion: { Ver: true, Crear: false, Editar: false, Eliminar: false, Exportar: false },
    produccion: { Ver: true, Crear: false, Editar: false, Eliminar: false, Exportar: false },
    fincas: { Ver: true, Crear: false, Editar: false, Eliminar: false, Exportar: false },
    reportes: { Ver: true, Crear: false, Editar: false, Eliminar: false, Exportar: true },
    usuarios: { Ver: false, Crear: false, Editar: false, Eliminar: false, Exportar: false },
  });
  const [saved, setSaved] = useState(false);

  const togglePermission = (module: string, action: string) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action]
      }
    }));
    setSaved(false);
  };

  const handleSave = () => {
    // Aquí iría la llamada a la API para guardar
    console.log('Guardando permisos:', { userId: selectedUser.id, permissions });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const filteredUsers = MOCK_USERS.filter(u => 
    u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold mb-2" style={{ color: COLORS.text }}>
          Gestión de Permisos
        </h1>
        <p className="text-sm" style={{ color: COLORS.textMuted }}>
          Administra los permisos de cada usuario por módulo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6">
        {/* Panel Izquierdo: Lista de Usuarios */}
        <div className="bg-white rounded-2xl shadow-sm border p-6" style={{ borderColor: COLORS.border }}>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.text }}>
            <User className="h-5 w-5" />
            Usuarios
          </h2>

          {/* Buscador */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: COLORS.textMuted }} />
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm outline-none focus:border-emerald-500 transition-colors"
              style={{ borderColor: COLORS.border, backgroundColor: '#f8fafc' }}
            />
          </div>

          {/* Lista de usuarios */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredUsers.map(user => (
              <button
                key={user.id}
                onClick={() => {
                  setSelectedUser(user);
                  setSaved(false);
                }}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedUser.id === user.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: COLORS.primary }}
                  >
                    {user.nombre.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: COLORS.text }}>
                      {user.nombre}
                    </p>
                    <p className="text-xs truncate" style={{ color: COLORS.textMuted }}>
                      {user.email}
                    </p>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: COLORS.primary }}>
                      {user.rol.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Panel Derecho: Matriz de Permisos */}
        <div className="bg-white rounded-2xl shadow-sm border p-6" style={{ borderColor: COLORS.border }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: COLORS.text }}>
                <Shield className="h-5 w-5" />
                Permisos de {selectedUser.nombre}
              </h2>
              <p className="text-xs mt-1" style={{ color: COLORS.textMuted }}>
                {selectedUser.email} · {selectedUser.rol.replace('_', ' ')}
              </p>
            </div>
            <button
              onClick={handleSave}
              className={`px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all ${
                saved ? 'bg-emerald-100 text-emerald-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'
              }`}
            >
              <Save className="h-4 w-4" />
              {saved ? 'Guardado ✓' : 'Guardar Cambios'}
            </button>
          </div>

          {/* Tabla de permisos */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2" style={{ borderColor: COLORS.border }}>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider" style={{ color: COLORS.textMuted }}>
                    Módulo
                  </th>
                  {ACTIONS.map(action => (
                    <th key={action} className="text-center py-3 px-4 text-xs font-bold uppercase tracking-wider" style={{ color: COLORS.textMuted }}>
                      {action}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MODULES.map((module, idx) => (
                  <tr 
                    key={module.id} 
                    className="border-b transition-colors hover:bg-gray-50"
                    style={{ borderColor: COLORS.border }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{module.icon}</span>
                        <span className="font-semibold text-sm" style={{ color: COLORS.text }}>
                          {module.name}
                        </span>
                      </div>
                    </td>
                    {ACTIONS.map(action => {
                      const hasPermission = permissions[module.id]?.[action] || false;
                      return (
                        <td key={action} className="py-4 px-4 text-center">
                          <button
                            onClick={() => togglePermission(module.id, action)}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                              hasPermission
                                ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                            }`}
                          >
                            {hasPermission ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Leyenda */}
          <div className="mt-6 p-4 rounded-lg bg-gray-50 border" style={{ borderColor: COLORS.border }}>
            <p className="text-xs font-semibold mb-2" style={{ color: COLORS.textMuted }}>
              💡 Instrucciones:
            </p>
            <p className="text-xs" style={{ color: COLORS.textMuted }}>
              Haz clic en los iconos para activar/desactivar permisos. Los cambios se guardan al presionar "Guardar Cambios".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}