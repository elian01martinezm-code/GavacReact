// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import type { ReactNode } from "react";

// ==========================================
// PÁGINAS PÚBLICAS
// ==========================================
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecuperarPage from "./pages/RecuperarPage"; // Agregado para flujo completo

// ==========================================
// PÁGINAS PRIVADAS (DASHBOARD)
// ==========================================
import DashboardLayout from "./pages/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";

// Módulos de Negocio
import GanadoPage from "./pages/GanadoPage";
import GanadoFormPage from "./pages/GanadoFormPage";
import SanidadPage from "./pages/SanidadPage";
import ReproduccionPage from "./pages/ReproduccionPage";
import ProduccionPage from "./pages/ProduccionPage";
import ReportesPage from "./pages/ReportesPage";

// Módulos de Administración (RF-002, RF-003)
import FincasPage from "./pages/FincasPage";
import UsersPage from "./pages/UsersPage";

// ==========================================
// COMPONENTE DE PROTECCIÓN DE RUTAS
// ==========================================
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Si está autenticado, muestra el contenido protegido
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ==========================================
                        RUTAS PÚBLICAS (Sin autenticación)
                        ========================================== */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recuperar" element={<RecuperarPage />} />

          {/* ==========================================
                        RUTAS PRIVADAS (Requieren autenticación)
                        ========================================== */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Ruta por defecto del dashboard */}
            <Route index element={<DashboardPage />} />
            {/* Módulos de Negocio */}
            <Route path="ganado" element={<GanadoPage />} />
            <Route path="ganado/nuevo" element={<GanadoFormPage />} />
            <Route path="sanidad" element={<SanidadPage />} />
            <Route path="reproduccion" element={<ReproduccionPage />} />
            <Route path="produccion" element={<ProduccionPage />} />
            <Route path="reportes" element={<ReportesPage />} />
            {/* Módulos de Administración (Solo visibles en menú si eres ADMIN) */}
            <Route path="fincas" element={<FincasPage />} />{" "}
            {/* RF-002, HU-002 */}
            <Route path="usuarios" element={<UsersPage />} />{" "}
            {/* RF-003, HU-003 */}
          </Route>

          {/* ==========================================
                        RUTA COMODÍN (404)
                        ========================================== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
