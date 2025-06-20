import api from './api';

const apiConnect = {
  // Configurar token de autenticación
  setAuthToken: (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  },

  // Obtener token actual
  getAuthToken: () => {
    return localStorage.getItem('token');
  },

  // Verificar si hay token válido
  hasValidToken: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      // Decodificar token JWT para verificar expiración
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp && payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  },

  // Limpiar autenticación
  clearAuth: () => {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  },

  // Configurar interceptores personalizados
  setupInterceptors: (onUnauthorized, onError) => {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && onUnauthorized) {
          onUnauthorized();
        } else if (onError) {
          onError(error);
        }
        return Promise.reject(error);
      }
    );
  },

  // Realizar petición con reintentos
  requestWithRetry: async (requestConfig, maxRetries = 3) => {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await api(requestConfig);
      } catch (error) {
        lastError = error;
        
        // No reintentar en errores 4xx (excepto 408, 429)
        if (error.response?.status >= 400 && error.response?.status < 500) {
          if (error.response.status !== 408 && error.response.status !== 429) {
            throw error;
          }
        }
        
        // Esperar antes del siguiente intento
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000; // Backoff exponencial
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  },

  // Verificar conectividad
  checkConnectivity: async () => {
    try {
      await api.get('/health', { timeout: 5000 });
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default apiConnect;