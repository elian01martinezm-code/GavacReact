import React, { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { getToken, clearToken } from '../shared/storage';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = getToken();
        setIsAuthenticated(!!token);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('gavac_token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        clearToken();
        setIsAuthenticated(false);
    };

    // Mientras verifica, no renderiza nada (evita parpadeos)
    if (isAuthenticated === null) {
        return <div className="min-h-screen bg-gavac-bg flex items-center justify-center">
            <p className="text-gavac-textMuted">Cargando...</p>
        </div>;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return context;
};