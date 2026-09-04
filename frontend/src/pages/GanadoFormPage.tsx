// src/pages/GanadoFormPage.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Animal, Especie, Sexo } from '../types';

export default function GanadoFormPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    chapeta: '',
    especie: 'BOVINO' as Especie,
    raza: '',
    sexo: 'MACHO' as Sexo,
    fechaNacimiento: '',
    peso: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validación básica (Criterio de aceptación 1: Chapeta única)
    if (formData.chapeta.trim().length < 3) {
      setError('La chapeta debe tener al menos 3 caracteres.');
      setLoading(false);
      return;
    }

    // Simulación de guardado en API (Aquí iría el apiCall real en el futuro)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Crear el objeto Animal completo para simular el guardado exitoso
    const nuevoAnimal: Animal = {
      id: crypto.randomUUID(), // Genera un ID único
      chapeta: formData.chapeta.toUpperCase().trim(),
      especie: formData.especie,
      raza: formData.raza.trim(),
      sexo: formData.sexo,
      fechaNacimiento: formData.fechaNacimiento,
      peso: Number(formData.peso),
      estado: 'ACTIVO', // Por defecto al registrarse (RF-010)
      fincaId: 'finca-01', // En el futuro vendrá del usuario logueado
      fechaRegistro: new Date().toISOString().split('T')[0],
    };

    console.log('✅ Animal registrado exitosamente:', nuevoAnimal);
    
    // Confirmación y redirección (Criterio de aceptación 3)
    alert('¡Animal registrado exitosamente en el sistema!');
    setLoading(false);
    navigate('/app/ganado');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header con botón de regreso */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/app/ganado')}
          className="text-sm text-gavac-textMuted hover:text-gavac-primary flex items-center gap-1 mb-4 transition-colors"
        >
          ← Volver al inventario
        </button>
        <h1 className="text-3xl font-bold text-gavac-text">Registrar Nuevo Animal</h1>
        <p className="text-gavac-textMuted mt-1">Complete la información para dar de alta un animal en el hato (HU-006)</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-gavac-card rounded-xl border border-gavac-border shadow-sm p-6 md:p-8 space-y-6">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chapeta */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gavac-text mb-1.5">
              Chapeta (Identificador único) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="chapeta"
              value={formData.chapeta}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg focus:ring-2 focus:ring-gavac-primary/20 focus:border-gavac-primary outline-none transition uppercase"
              placeholder="Ej: COL-00127"
              required
            />
          </div>

          {/* Especie */}
          <div>
            <label className="block text-sm font-semibold text-gavac-text mb-1.5">
              Especie <span className="text-red-500">*</span>
            </label>
            <select
              name="especie"
              value={formData.especie}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg focus:ring-2 focus:ring-gavac-primary/20 focus:border-gavac-primary outline-none transition"
              required
            >
              <option value="BOVINO">Bovino</option>
              <option value="PORCINO">Porcino</option>
              <option value="EQUINO">Equino</option>
              <option value="BUFALO">Búfalo</option>
            </select>
          </div>

          {/* Raza */}
          <div>
            <label className="block text-sm font-semibold text-gavac-text mb-1.5">
              Raza <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg focus:ring-2 focus:ring-gavac-primary/20 focus:border-gavac-primary outline-none transition"
              placeholder="Ej: Holstein, Brahman"
              required
            />
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-sm font-semibold text-gavac-text mb-1.5">
              Sexo <span className="text-red-500">*</span>
            </label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg focus:ring-2 focus:ring-gavac-primary/20 focus:border-gavac-primary outline-none transition"
              required
            >
              <option value="MACHO">Macho</option>
              <option value="HEMBRA">Hembra</option>
            </select>
          </div>

          {/* Fecha de Nacimiento */}
          <div>
            <label className="block text-sm font-semibold text-gavac-text mb-1.5">
              Fecha de Nacimiento <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg focus:ring-2 focus:ring-gavac-primary/20 focus:border-gavac-primary outline-none transition"
              required
            />
          </div>

          {/* Peso */}
          <div>
            <label className="block text-sm font-semibold text-gavac-text mb-1.5">
              Peso (kg) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-gavac-bg border border-gavac-border rounded-lg focus:ring-2 focus:ring-gavac-primary/20 focus:border-gavac-primary outline-none transition"
              placeholder="Ej: 45"
              min="1"
              step="0.1"
              required
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gavac-border">
          <button
            type="button"
            onClick={() => navigate('/app/ganado')}
            className="px-6 py-2.5 text-sm font-medium text-gavac-textMuted bg-white border border-gavac-border rounded-lg hover:bg-gavac-bg transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 text-sm font-bold text-white bg-gavac-primary rounded-lg hover:bg-gavac-primaryHover transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Guardando...
              </>
            ) : (
              'Guardar Animal'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}