// src/pages/UsersPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Usuario, RolUsuario } from '../types';

// Datos de prueba (Mock) para usuarios
const mockUsuarios: Usuario[] = [
  { id: '1', nombreCompleto: 'Admin Principal', email: 'admin@gavac.com', rol: 'ADMINISTRADOR', fincaId: 'finca-01', activo: true },
  { id: '2', nombreCompleto: 'Juan Pérez', email: 'juan@finca.com', rol: 'PROPIETARIO', fincaId: 'finca-01', activo: true },
  { id: '3', nombreCompleto: 'María González', email: 'maria@campo.com', rol: 'TRABAJADOR_CAMPO', fincaId: 'finca-01', activo: true },
  { id: '4', nombreCompleto: 'Dr. Carlos Ramírez', email: 'carlos@vet.com', rol: 'VETERINARIO', fincaId: 'finca-01', activo: false },
];

export default function UsersPage() {
  const { usuario } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    rol: 'TRABAJADOR_CAMPO' as RolUsuario,
  });

  useEffect(() => {
    const datosGuardados = localStorage.getItem('gavac_usuarios');
    if (datosGuardados) {
      setUsuarios(JSON.parse(datosGuardados));
    } else {
      localStorage.setItem('gavac_usuarios', JSON.stringify(mockUsuarios));
      setUsuarios(mockUsuarios);
    }
  }, []);

  const usuariosFiltrados = usuarios.filter(u => 
    u.nombreCompleto.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoUsuario: Usuario = {
      id: crypto.randomUUID(),
      ...formData,
      fincaId: 'finca-01',
      activo: true,
    };
    const actualizados = [...usuarios, nuevoUsuario];
    setUsuarios(actualizados);
    localStorage.setItem('gavac_usuarios', JSON.stringify(actualizados));
    setFormData({ nombreCompleto: '', email: '', rol: 'TRABAJADOR_CAMPO' });
    setShowForm(false);
  };

  const toggleActivo = (id: string) => {
    const actualizados = usuarios.map(u => 
      u.id === id ? { ...u, activo: !u.activo } : u
    );
    setUsuarios(actualizados);
    localStorage.setItem('gavac_usuarios', JSON.stringify(actualizados));
  };

  const getRolColor = (rol: string) => {
    switch (rol) {
      case 'ADMINISTRADOR': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'PROPIETARIO': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'TRABAJADOR_CAMPO': return 'bg-green-100 text-green-700 border-green-200';
      case 'VETERINARIO': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Solo el administrador puede ver esta página (RF-004)
  if (usuario?.rol !== 'ADMINISTRADOR') {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-2">⛔ Acceso Denegado</h2>
          <p className="text-red-600">Solo el administrador puede gestionar usuarios.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gavac-text">Gestión de Usuarios</h1>
          <p className="text-gavac-textMuted mt-1">Administrar usuarios y roles del sistema (RF-003, HU-003)</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-2 bg-gavac-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gavac-primaryHover transition-colors shadow-sm"
        >
          <span>➕</span> Nuevo Usuario
        </button>
      </div>

      {/* Formulario de creación (condicional) */}
      {showForm && (
        <div className="bg-gavac-card rounded-xl border border-gavac-border shadow-sm p-6 mb-6">
          <h3 className="text-lg font-bold text-gavac-text mb-4">Crear Nuevo Usuario</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nombre completo"
              value={formData.nombreCompleto}
              onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
              className="px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg focus:ring-2 focus:ring-gavac-primary/20 focus:border-gavac-primary outline-none"
              required
            />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg focus:ring-2 focus:ring-gavac-primary/20 focus:border-gavac-primary outline-none"
              required
            />
            <select
              value={formData.rol}
              onChange={(e) => setFormData({ ...formData, rol: e.target.value as RolUsuario })}
              className="px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg focus:ring-2 focus:ring-gavac-primary/20 focus:border-gavac-primary outline-none"
              required
            >
              <option value="PROPIETARIO">Propietario</option>
              <option value="TRABAJADOR_CAMPO">Trabajador de Campo</option>
              <option value="VETERINARIO">Veterinario</option>
            </select>
            <div className="md:col-span-3 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 text-sm font-medium text-gavac-textMuted bg-white border border-gavac-border rounded-lg hover:bg-gavac-bg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-bold text-white bg-gavac-primary rounded-lg hover:bg-gavac-primaryHover transition-colors"
              >
                Guardar Usuario
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Barra de Búsqueda */}
      <div className="bg-gavac-card p-4 rounded-xl border border-gavac-border shadow-sm mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gavac-textMuted">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg focus:ring-2 focus:ring-gavac-primary/20 focus:border-gavac-primary outline-none transition text-sm"
          />
        </div>
      </div>

      {/* Tabla de Usuarios */}
      <div className="bg-gavac-card rounded-xl border border-gavac-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gavac-bg border-b border-gavac-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-gavac-textMuted">Nombre</th>
                <th className="px-6 py-4 font-semibold text-gavac-textMuted">Correo</th>
                <th className="px-6 py-4 font-semibold text-gavac-textMuted">Rol</th>
                <th className="px-6 py-4 font-semibold text-gavac-textMuted">Estado</th>
                <th className="px-6 py-4 font-semibold text-gavac-textMuted text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gavac-border">
              {usuariosFiltrados.map((user) => (
                <tr key={user.id} className="hover:bg-gavac-bg/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                        {user.nombreCompleto.charAt(0)}
                      </div>
                      <span className="font-medium text-gavac-text">{user.nombreCompleto}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gavac-textMuted">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRolColor(user.rol)}`}>
                      {user.rol.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      user.activo ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'
                    }`}>
                      {user.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toggleActivo(user.id)}
                      className={`text-sm font-medium mr-3 ${user.activo ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}`}
                    >
                      {user.activo ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}