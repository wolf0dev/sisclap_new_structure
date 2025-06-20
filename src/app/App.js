import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import BeneficiariosPage from './pages/BeneficiariosPage';
import BeneficiarioFormPage from './pages/BeneficiarioFormPage';
import BeneficiarioDetailPage from './pages/BeneficiarioDetailPage';
import BeneficiariosInactivosPage from './pages/BeneficiariosInactivosPage';
import DependientesPage from './pages/DependientesPage';
import DependienteFormPage from './pages/DependienteFormPage';
import DependienteDetailPage from './pages/DependienteDetailPage';
import ReporteCargaFamiliarPage from './pages/ReporteCargaFamiliarPage';
import ReporteHabitantesCallePage from './pages/ReporteHabitantesCallePage';
import ReporteRangoEdadPage from './pages/ReporteRangoEdadPage';
import ReporteVentasPage from './pages/ReporteVentasPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          
          {/* Beneficiarios */}
          <Route path="beneficiarios">
            <Route index element={<BeneficiariosPage />} />
            <Route path="new" element={<BeneficiarioFormPage />} />
            <Route path="edit/:cedula" element={<BeneficiarioFormPage />} />
            <Route path="view/:cedula" element={<BeneficiarioDetailPage />} />
            <Route path="inactivos" element={<BeneficiariosInactivosPage />} />
          </Route>
          
          {/* Dependientes */}
          <Route path="dependientes">
            <Route index element={<DependientesPage />} />
            <Route path="new" element={<DependienteFormPage />} />
            <Route path="edit/:cedula" element={<DependienteFormPage />} />
            <Route path="view/:cedula" element={<DependienteDetailPage />} />
          </Route>
          
          {/* Reportes */}
          <Route path="reportes">
            <Route path="carga-familiar" element={<ReporteCargaFamiliarPage />} />
            <Route path="habitantes-calle" element={<ReporteHabitantesCallePage />} />
            <Route path="rango-edad" element={<ReporteRangoEdadPage />} />
            <Route path="ventas" element={<ReporteVentasPage />} />
          </Route>
        </Route>
        
        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Global Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;