import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import type { ReactNode } from 'react';

// Páginas Públicas
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Páginas Privadas
import DashboardLayout from './pages/DashboardLayout';
import DashboardPage from './pages/DashboardPage';
import GanadoPage from './pages/GanadoPage';
import SanidadPage from './pages/SanidadPage';
import ReproduccionPage from './pages/ReproduccionPage';
import InventarioPage from './pages/InventarioPage';
import ReportesPage from './pages/ReportesPage';

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route path="/app" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardPage />} />
            <Route path="ganado" element={<GanadoPage />} />
            <Route path="sanidad" element={<SanidadPage />} />
            <Route path="reproduccion" element={<ReproduccionPage />} />
            <Route path="inventario" element={<InventarioPage />} />
            <Route path="reportes" element={<ReportesPage />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}