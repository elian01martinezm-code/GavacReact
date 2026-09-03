import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { ReactNode } from 'react'; // Importamos el tipo correcto

// Páginas Públicas
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Páginas Privadas
import DashboardLayout from './pages/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import GanadoPage from './pages/GanadoPage';
import ReportesPage from './pages/ReportesPage';
import ReproduccionPage from './pages/ReproduccionPage';
import ProduccionPage from './pages/ProduccionPage';
import SanidadPage from './pages/SanidadPage';

// Componente para proteger rutas
// ️ AQUÍ ESTABA EL ERROR: Cambiamos 'JSX.Element' por 'ReactNode'
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <>{children}</>;
};

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rutas Públicas */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Rutas Privadas (Dashboard) */}
                    <Route path="/app" element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<DashboardPage />} />
                        <Route path="ganado" element={<GanadoPage />} />
                        <Route path="reproduccion" element={<ReproduccionPage />} />
                        <Route path="produccion" element={<ProduccionPage />} />
                        <Route path="sanidad" element={<SanidadPage />} />
                        <Route path="reportes" element={<ReportesPage />} />
                    </Route>
                    
                    {/* Redirección por defecto si la ruta no existe */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}