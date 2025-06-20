// Punto de entrada principal del sistema
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import './app/styles/global.css';

// Importar proveedores de contexto
import { AuthProvider } from './security';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { NotificationProvider } from './app/providers/NotificationProvider';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);