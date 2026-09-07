import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { saveToken, getToken, clearToken } from '../shared/storage';

// 1. Definimos el tipo de usuario que espera tu DashboardLayout
export interface Usuario {
  id: string;
  nombreCompleto: string;
  email: string;
  rol: 'ADMINISTRADOR' | 'PROPIETARIO' | 'TRABAJADOR_CAMPO' | 'VETERINARIO';
}

interface AuthContextType {
  isAuthenticated: boolean;
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Credenciales de prueba mapeadas a tus roles
const MOCK_USERS: Record<string, { password: string; usuario: Usuario }> = {
  'admin@gavac.com': {
    password: 'admin123',
    usuario: { id: '1', nombreCompleto: 'Carlos Admin', email: 'admin@gavac.com', rol: 'ADMINISTRADOR' }
  },
  'propietario@gavac.com': {
    password: 'prop123',
    usuario: { id: '2', nombreCompleto: 'Ana Propietaria', email: 'propietario@gavac.com', rol: 'PROPIETARIO' }
  },
  'trabajador@gavac.com': {
    password: 'trab123',
    usuario: { id: '3', nombreCompleto: 'Juan Trabajador', email: 'trabajador@gavac.com', rol: 'TRABAJADOR_CAMPO' }
  },
  'vet@gavac.com': {
    password: 'vet123',
    usuario: { id: '4', nombreCompleto: 'Dra. María Vet', email: 'vet@gavac.com', rol: 'VETERINARIO' }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Al cargar, verificamos si hay token Y usuario guardado
  useEffect(() => {
    const token = getToken();
    const storedUser = localStorage.getItem('gavac_usuario');
    
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUsuario(JSON.parse(storedUser));
    } else {
      setIsAuthenticated(false);
      setUsuario(null);
    }
    setIsLoading(false);
  }, []);

  // 4. Login simulado que valida email/password y guarda ambos
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de red para realismo
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = MOCK_USERS[email];

    if (mockUser && mockUser.password === password) {
      const fakeToken = 'mock_jwt_token_' + Date.now();
      saveToken(fakeToken); // Usa tu función de storage.ts
      localStorage.setItem('gavac_usuario', JSON.stringify(mockUser.usuario));
      
      setIsAuthenticated(true);
      setUsuario(mockUser.usuario);
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  // 5. Logout limpio
  const logout = () => {
    clearToken(); // Usa tu función de storage.ts
    localStorage.removeItem('gavac_usuario');
    setIsAuthenticated(false);
    setUsuario(null);
  };

  // Pantalla de carga inicial para evitar parpadeos
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gavac-bg flex items-center justify-center">
        <p className="text-gavac-textMuted">Cargando sesión...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, usuario, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};