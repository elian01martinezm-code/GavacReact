import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiCall } from '../api/client';

export default function RegisterPage() {
    const [nombre, setNombre] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validación básica en frontend
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        
        try {
            // Llamada al mock (o al backend real cuando esté listo)
            await apiCall('/api/v1/auth/register', {
                method: 'POST',
                body: JSON.stringify({ nombre, username, password })
            });
            
            setSuccess('¡Usuario registrado con éxito! Redirigiendo al login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
            
        } catch (err: any) {
            setError(err.message || 'Error al registrar el usuario. Intenta con otro nombre de usuario.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-100">
                <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Crear Cuenta</h2>
                <p className="text-center text-gray-500 mb-6 text-sm">Únete al sistema de gestión GAVAC</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Nombre Completo</label>
                        <input 
                            type="text" 
                            placeholder="Ej: Juan Pérez" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Nombre de Usuario</label>
                        <input 
                            type="text" 
                            placeholder="Ej: jperez_ganadero" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="Mínimo 6 caracteres" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Confirmar Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="Repite tu contraseña" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                            required 
                        />
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg flex items-center gap-2">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg flex items-center gap-2">
                            <span>✅</span> {success}
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full text-white p-3 rounded-lg font-semibold transition-all mt-2 ${
                            loading 
                            ? 'bg-blue-400 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                        }`}
                    >
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    ¿Ya tienes una cuenta?{' '}
                    <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline">
                        Inicia sesión aquí
                    </Link>
                </div>
            </div>
        </div>
    );
}