/**
 * Datos de prueba para desarrollar el frontend sin depender del backend.
 */

export const mockAnimales = [
    { id: 1, ear_tag: "ARG-001", breed: "Brahman", gender: "macho", birth_date: "2023-05-10", weight: 250.5, status: "activo" },
    { id: 2, ear_tag: "ARG-002", breed: "Angus", gender: "hembra", birth_date: "2023-08-15", weight: 210.0, status: "activo" },
    { id: 3, ear_tag: "ARG-003", breed: "Gyr", gender: "macho", birth_date: "2024-01-20", weight: 180.0, status: "activo" },
];

export const mockReporte = {
    total_animales: 3,
    machos: 2,
    hembras: 1,
    peso_promedio: 213.5
};