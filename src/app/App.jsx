import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import AuthLayout from './layouts/AuthLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import BeneficiariosPage from './pages/BeneficiariosPage.jsx';
import BeneficiarioFormPage from './pages/BeneficiarioFormPage.jsx';
import BeneficiarioDetailPage from './pages/BeneficiarioDetailPage.jsx';
import BeneficiariosInactivosPage from './pages/BeneficiariosInactivosPage.jsx';
import DependientesPage from './pages/DependientesPage.jsx';
import DependienteFormPage from './pages/DependienteFormPage.jsx';
import DependienteDetailPage from './pages/DependienteDetailPage.jsx';
import ReporteCargaFamiliarPage from './pages/ReporteCargaFamiliarPage.jsx';
import ReporteHabitantesCallePage from './pages/ReporteHabitantesCallePage.jsx';
import ReporteRangoEdadPage from './pages/ReporteRangoEdadPage.jsx';
import ReporteVentasPage from './pages/ReporteVentasPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

// Components
import ProtectedRoute from './components/ProtectedRoute.jsx';

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