import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiCall } from '../api/client';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            const data = await apiCall('/api/v1/auth/login', {
                method: 'POST',
                body: JSON.stringify({ username, password })
            });
            
            // Guardar token en el contexto
            login(data.access_token);
            
            // 🎯 REDIRECCIÓN AL PANEL DE CONTROL (DashboardPage)
            navigate('/app', { replace: true });
            
        } catch (err: any) {
            setError(err.message || 'Usuario o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gavac-bg py-12 px-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-black/10">
                <h2 className="text-3xl font-serif font-bold mb-2 text-center text-gavac-text">Iniciar Sesión</h2>
                <p className="text-center text-gavac-textMuted mb-6 text-sm">Accede a tu cuenta de Gavac</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gavac-text mb-2">Usuario</label>
                        <input 
                            type="text" 
                            placeholder="admin" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gavac-primary" 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gavac-text mb-2">Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="admin123" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-gavac-primary" 
                            required 
                        />
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg">
                            ️ {error}
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-gavac-primary text-white p-3 rounded-lg font-semibold hover:bg-gavac-primaryHover transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                    </button>
                </form>

                <div className="mt-6 p-4 bg-gavac-light rounded-lg text-center">
                    <p className="text-xs text-gavac-accent font-semibold mb-2">🔑 Credenciales de prueba:</p>
                    <p className="text-sm text-gavac-text">Usuario: <strong>admin</strong></p>
                    <p className="text-sm text-gavac-text">Contraseña: <strong>admin123</strong></p>
                </div>
                
                <div className="mt-6 text-center text-sm text-gavac-textMuted">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="text-gavac-primary font-semibold hover:underline">
                        Regístrate aquí
                    </Link>
                </div>
            </div>
        </div>
    );
}