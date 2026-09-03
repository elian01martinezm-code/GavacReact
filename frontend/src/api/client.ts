import { getToken, clearToken } from '../shared/storage';
import { mockAnimales, mockReporte } from './mockData';

// 🚨 CAMBIA ESTO A `false` CUANDO TU BACKEND ESTÉ LISTO
const USE_MOCK = true; 

export async function apiCall(endpoint: string, options: RequestInit = {}) {
    const token = getToken();

    // 1. MODO SIMULACIÓN (Para trabajar sin backend)
    if (USE_MOCK) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simula 0.5s de espera de red

        // LOGIN
        if (endpoint === '/api/v1/auth/login' && options.method === 'POST') {
            const body = JSON.parse(options.body as string);
            if (body.username === 'admin' && body.password === 'admin123') {
                return { access_token: "mock_jwt_token_12345", token_type: "bearer" };
            }
            throw new Error('Usuario o contraseña incorrectos (Prueba: admin / admin123)');
        }

        // 🎯 GANADO - GET (Listar todos). 
        // Se agrega '!options.method' porque si no se pasa, fetch usa GET por defecto.
        if (endpoint === '/api/v1/ganado/' && (!options.method || options.method === 'GET')) {
            return mockAnimales;
        }

        // GANADO - POST (Crear nuevo)
        if (endpoint === '/api/v1/ganado/' && options.method === 'POST') {
            const body = JSON.parse(options.body as string);
            const nuevoAnimal = {
                id: Date.now(), // Usamos Date.now() para IDs únicos en el mock
                ...body,
                status: "activo",
                birth_date: null
            };
            mockAnimales.push(nuevoAnimal); // Lo agrega al array de prueba
            return nuevoAnimal;
        }

        // REPORTES - GET
        if (endpoint === '/api/v1/reportes/general') {
            return mockReporte;
        }
        
        // Respuesta por defecto si no coincide nada
        return {};
    }

    // 2. MODO REAL (Cuando el backend esté listo)
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`http://localhost:8000${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        clearToken();
        window.location.href = '/login';
        throw new Error('Sesión expirada');
    }

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.detail || `Error en la petición: ${response.statusText}`);
    }

    return response.json();
}