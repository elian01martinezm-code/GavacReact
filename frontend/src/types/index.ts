// src/types/index.ts
// Documento base: Requerimientos Semana #4 & Historias de Usuario Semana #5 (GAVAC)

// ==========================================
// SPRINT 1: AUTENTICACIÓN Y USUARIOS
// ==========================================

// Roles definidos en el proyecto (RF-004, HU-004)
export type RolUsuario = 'ADMINISTRADOR' | 'PROPIETARIO' | 'TRABAJADOR_CAMPO' | 'VETERINARIO';

export interface Usuario {
  id: string;
  nombreCompleto: string;
  email: string;
  telefono?: string; // Agregado: útil para contacto en campo (RNF-001 Usabilidad)
  rol: RolUsuario;
  fincaId: string; // Cada usuario pertenece a una finca (RN-002)
  activo: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  usuario: Usuario; 
}

// ==========================================
// SPRINT 1: FINCAS
// ==========================================

export interface Finca {
  id: string;
  nombre: string;
  ubicacion: string;
  hectareas: number;
  activo: boolean;
}

// ==========================================
// SPRINT 2: GANADO (HU-006 a HU-010)
// ==========================================

export type Especie = 'BOVINO' | 'PORCINO' | 'EQUINO' | 'BUFALO';
export type Sexo = 'MACHO' | 'HEMBRA';
// RF-010: Eliminación lógica de animales (no se borra de la BD, cambia de estado)
export type EstadoAnimal = 'ACTIVO' | 'VENDIDO' | 'FALLECIDO' | 'RETIRADO'; 

export interface Animal {
  id: string;
  chapeta: string; // Identificador único (RF-007)
  especie: Especie;
  raza: string;
  sexo: Sexo;
  fechaNacimiento: string; // Para calcular edad dinámicamente
  peso: number; // en kg
  estado: EstadoAnimal;
  fincaId: string;
  fechaRegistro: string; // Fecha en que se dio de alta en el sistema
}

// ==========================================
// SPRINT 3: SANIDAD (HU-007, RF-011 a RF-013)
// ==========================================

export type TipoSanitario = 'VACUNA' | 'TRATAMIENTO' | 'ENFERMEDAD' | 'CONTROL_VETERINARIO';

export interface RegistroSanitario {
  id: string;
  animalId: string;
  tipo: TipoSanitario;
  nombre: string; // Ej: "Fiebre Aftosa", "Desparasitante"
  fecha: string;
  proximaFecha?: string; // Clave para generar Alertas automáticas (RF-013)
  observaciones?: string;
}

// ==========================================
// SPRINT 4: REPRODUCCIÓN (HU-008, RF-014 a RF-015)
// ==========================================

export type EventoReproductivo = 'CELO' | 'INSEMINACION' | 'PREÑEZ' | 'PARTO';

export interface RegistroReproductivo {
  id: string;
  animalId: string;
  evento: EventoReproductivo;
  fecha: string;
  observaciones?: string;
}

// ==========================================
// SPRINT 4: PRODUCCIÓN (HU-009, RF-016 a RF-017)
// ==========================================

export type TipoProduccion = 'LECHE' | 'PESO';

export interface RegistroProductivo {
  id: string;
  animalId: string;
  fecha: string;
  tipoProduccion: TipoProduccion;
  cantidad: number; // Litros de leche o Kg de peso
  observaciones?: string;
}