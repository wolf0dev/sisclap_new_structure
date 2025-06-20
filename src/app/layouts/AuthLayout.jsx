import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../security';

const AuthLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthLayout;