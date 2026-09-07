// src/pages/UsuariosPage.tsx
import { useState } from 'react';
import { User, Plus, Search, Shield, Check, X, Save, ArrowLeft, Mail, Lock } from 'lucide-react';

const COLORS = {
  primary: '#059669',
  primaryHover: '#047857',
  bg: '#f1f5f9',
  card: '#ffffff',
  border: '#e2e8f0',
  text: '#1e293b',
  textMuted: '#64748b',
};

const MODULES = [
  { id: 'ganado', name: 'Ganado', icon: '🐄' },
  { id: 'sanidad', name: 'Sanidad', icon: '💉' },
  { id: 'reproduccion', name: 'Reproducción', icon: '🧬' },
  { id: 'produccion', name: 'Producción', icon: '🥛' },
  { id: 'fincas', name: 'Fincas', icon: '🏡' },
  { id: 'reportes', name: 'Reportes', icon: '📈' },
];

const ACTIONS = ['Ver', 'Crear', 'Editar', 'Eliminar'];

const ROLES = [
  { id: 'ADMINISTRADOR', label: 'Administrador' },
  { id: 'PROPIETARIO', label: 'Propietario' },
  { id: 'TRABAJADOR_CAMPO', label: 'Trabajador de Campo' },
  { id: 'VETERINARIO', label: 'Veterinario' },
];

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: string;
}

const MOCK_USERS: Usuario[] = [
  { id: '1', nombre: 'Juan Pérez', rol: 'TRABAJADOR_CAMPO', email: 'juan@finca.com' },
  { id: '2', nombre: 'Dra. María López', rol: 'VETERINARIO', email: 'maria@vet.com' },
];

export default function UsuariosPage() {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [users, setUsers] = useState<Usuario[]>(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Formulario de nuevo usuario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    rol: 'TRABAJADOR_CAMPO',
    password: '',
  });
  
  // Permisos por módulo
  const [permissions, setPermissions] = useState<Record<string, Record<string, boolean>>>({
    ganado: { Ver: true, Crear: false, Editar: false, Eliminar: false },
    sanidad: { Ver: true, Crear: false, Editar: false, Eliminar: false },
    reproduccion: { Ver: true, Crear: false, Editar: false, Eliminar: false },
    produccion: { Ver: true, Crear: false, Editar: false, Eliminar: false },
    fincas: { Ver: true, Crear: false, Editar: false, Eliminar: false },
    reportes: { Ver: true, Crear: false, Editar: false, Eliminar: false },
  });

  const togglePermission = (module: string, action: string) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action]
      }
    }));
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: Usuario = {
      id: Date.now().toString(),
      nombre: formData.nombre,
      email: formData.email,
      rol: formData.rol,
    };
    setUsers([...users, newUser]);
    console.log('Usuario creado:', newUser);
    console.log('Permisos asignados:', permissions);
    
    // Resetear formulario
    setFormData({ nombre: '', email: '', rol: 'TRABAJADOR_CAMPO', password: '' });
    setPermissions({
      ganado: { Ver: true, Crear: false, Editar: false, Eliminar: false },
      sanidad: { Ver: true, Crear: false, Editar: false, Eliminar: false },
      reproduccion: { Ver: true, Crear: false, Editar: false, Eliminar: false },
      produccion: { Ver: true, Crear: false, Editar: false, Eliminar: false },
      fincas: { Ver: true, Crear: false, Editar: false, Eliminar: false },
      reportes: { Ver: true, Crear: false, Editar: false, Eliminar: false },
    });
    setView('list');
  };

  const filteredUsers = users.filter(u => 
    u.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Vista: Lista de Usuarios
  if (view === 'list') {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl font-bold mb-2" style={{ color: COLORS.text }}>
              Gestión de Usuarios
            </h1>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>
              Administra los usuarios del sistema y sus permisos
            </p>
          </div>
          <button
            onClick={() => setView('create')}
            className="px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-md"
            style={{ backgroundColor: COLORS.primary, color: 'white' }}
          >
            <Plus className="h-4 w-4" />
            Nuevo Usuario
          </button>
        </div>

        {/* Buscador */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: COLORS.textMuted }} />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-500 transition-colors"
            style={{ borderColor: COLORS.border, backgroundColor: 'white' }}
          />
        </div>

        {/* Lista de usuarios */}
        <div className="grid gap-4">
          {filteredUsers.map(user => (
            <div
              key={user.id}
              className="bg-white rounded-xl border p-5 flex items-center justify-between hover:shadow-md transition-all"
              style={{ borderColor: COLORS.border }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: COLORS.primary }}
                >
                  {user.nombre.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: COLORS.text }}>{user.nombre}</p>
                  <p className="text-sm" style={{ color: COLORS.textMuted }}>{user.email}</p>
                  <span 
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mt-1 inline-block"
                    style={{ backgroundColor: COLORS.primary + '20', color: COLORS.primary }}
                  >
                    {user.rol.replace('_', ' ')}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg text-sm font-medium border hover:bg-gray-50 transition-colors" style={{ borderColor: COLORS.border, color: COLORS.textMuted }}>
                  Editar
                </button>
                <button className="px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Vista: Crear Usuario con Permisos
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header con botón de volver */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setView('list')}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" style={{ color: COLORS.textMuted }} />
        </button>
        <div>
          <h1 className="font-serif text-4xl font-bold" style={{ color: COLORS.text }}>
            Crear Nuevo Usuario
          </h1>
          <p className="text-sm mt-1" style={{ color: COLORS.textMuted }}>
            Completa los datos y asigna permisos en un solo paso
          </p>
        </div>
      </div>

      <form onSubmit={handleCreateUser} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel Izquierdo: Datos del Usuario */}
        <div className="bg-white rounded-2xl shadow-sm border p-6" style={{ borderColor: COLORS.border }}>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: COLORS.text }}>
            <User className="h-5 w-5" />
            Información del Usuario
          </h2>

          <div className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
                Nombre completo
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej. Juan Pérez"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-500 transition-colors"
                style={{ borderColor: COLORS.border }}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: COLORS.textMuted }} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ej. juan@finca.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-500 transition-colors"
                  style={{ borderColor: COLORS.border }}
                  required
                />
              </div>
            </div>

            {/* Rol */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
                Rol del usuario
              </label>
              <select
                value={formData.rol}
                onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-500 transition-colors bg-white"
                style={{ borderColor: COLORS.border }}
              >
                {ROLES.map(role => (
                  <option key={role.id} value={role.id}>{role.label}</option>
                ))}
              </select>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: COLORS.text }}>
                Contraseña temporal
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: COLORS.textMuted }} />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-500 transition-colors"
                  style={{ borderColor: COLORS.border }}
                  required
                />
              </div>
              <p className="text-xs mt-1" style={{ color: COLORS.textMuted }}>
                El usuario deberá cambiarla en su primer inicio de sesión
              </p>
            </div>
          </div>
        </div>

        {/* Panel Derecho: Permisos */}
        <div className="bg-white rounded-2xl shadow-sm border p-6" style={{ borderColor: COLORS.border }}>
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: COLORS.text }}>
            <Shield className="h-5 w-5" />
            Permisos por Módulo
          </h2>

          <div className="space-y-3">
            {MODULES.map(module => (
              <div key={module.id} className="border rounded-xl p-4" style={{ borderColor: COLORS.border }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{module.icon}</span>
                  <span className="font-semibold text-sm" style={{ color: COLORS.text }}>{module.name}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {ACTIONS.map(action => {
                    const hasPermission = permissions[module.id]?.[action] || false;
                    return (
                      <button
                        key={action}
                        type="button"
                        onClick={() => togglePermission(module.id, action)}
                        className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                          hasPermission
                            ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500'
                            : 'bg-gray-50 text-gray-400 border-2 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {hasPermission ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        {action}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs mt-4 p-3 rounded-lg bg-gray-50" style={{ color: COLORS.textMuted }}>
            💡 Haz clic en los permisos para activarlos/desactivarlos. Los permisos se guardarán junto con el usuario.
          </p>
        </div>

        {/* Botón de Guardar */}
        <div className="lg:col-span-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setView('list')}
            className="px-6 py-3 rounded-xl font-semibold text-sm border hover:bg-gray-50 transition-colors"
            style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 shadow-md"
            style={{ backgroundColor: COLORS.primary, color: 'white' }}
          >
            <Save className="h-4 w-4" />
            Crear Usuario con Permisos
          </button>
        </div>
      </form>
    </div>
  );
}