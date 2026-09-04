// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Usuario {
  id: string;
  nombreCompleto: string;
  email: string;
  rol: 'ADMINISTRADOR' | 'PROPIETARIO' | 'TRABAJADOR_CAMPO' | 'VETERINARIO';
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión guardada al cargar la app
    const storedUser = localStorage.getItem('gavac_user');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simular delay de red (800ms)
    await new Promise(resolve => setTimeout(resolve, 800));

    // 🔐 Credenciales de prueba mapeadas a tus roles del Dashboard
    const mockUsers: Record<string, Usuario> = {
      'admin@gavac.com': { id: '1', nombreCompleto: 'Carlos Admin', email: 'admin@gavac.com', rol: 'ADMINISTRADOR' },
      'propietario@gavac.com': { id: '2', nombreCompleto: 'Ana Propietaria', email: 'propietario@gavac.com', rol: 'PROPIETARIO' },
      'trabajador@gavac.com': { id: '3', nombreCompleto: 'Juan Trabajador', email: 'trabajador@gavac.com', rol: 'TRABAJADOR_CAMPO' },
      'vet@gavac.com': { id: '4', nombreCompleto: 'Dra. María Vet', email: 'vet@gavac.com', rol: 'VETERINARIO' },
    };

    const user = mockUsers[email];
    
    // Para pruebas, aceptamos la contraseña si el usuario existe y la pass tiene al menos 3 caracteres
    if (user && password.length >= 3) { 
      setUsuario(user);
      localStorage.setItem('gavac_user', JSON.stringify(user));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('gavac_user');
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};