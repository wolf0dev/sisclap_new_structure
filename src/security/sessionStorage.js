const sessionStorage = {
  // Guardar datos en sessionStorage
  set: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      window.sessionStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  },

  // Obtener datos de sessionStorage
  get: (key, defaultValue = null) => {
    try {
      const item = window.sessionStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error('Error reading from sessionStorage:', error);
      return defaultValue;
    }
  },

  // Eliminar datos de sessionStorage
  remove: (key) => {
    try {
      window.sessionStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
    }
  },

  // Limpiar todo el sessionStorage
  clear: () => {
    try {
      window.sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  },

  // Verificar si una clave existe
  has: (key) => {
    return window.sessionStorage.getItem(key) !== null;
  },

  // Obtener todas las claves
  keys: () => {
    try {
      return Object.keys(window.sessionStorage);
    } catch (error) {
      console.error('Error getting sessionStorage keys:', error);
      return [];
    }
  },

  // Obtener el tamaño del sessionStorage
  size: () => {
    try {
      return window.sessionStorage.length;
    } catch (error) {
      console.error('Error getting sessionStorage size:', error);
      return 0;
    }
  },

  // Guardar datos con expiración
  setWithExpiry: (key, value, ttl) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };
    sessionStorage.set(key, item);
  },

  // Obtener datos con verificación de expiración
  getWithExpiry: (key, defaultValue = null) => {
    const item = sessionStorage.get(key);
    if (!item) return defaultValue;

    const now = new Date();
    if (now.getTime() > item.expiry) {
      sessionStorage.remove(key);
      return defaultValue;
    }

    return item.value;
  },

  // Guardar estado de formulario
  saveFormState: (formId, formData) => {
    const key = `form_state_${formId}`;
    sessionStorage.set(key, formData);
  },

  // Recuperar estado de formulario
  getFormState: (formId) => {
    const key = `form_state_${formId}`;
    return sessionStorage.get(key, {});
  },

  // Limpiar estado de formulario
  clearFormState: (formId) => {
    const key = `form_state_${formId}`;
    sessionStorage.remove(key);
  },

  // Guardar filtros de tabla
  saveTableFilters: (tableId, filters) => {
    const key = `table_filters_${tableId}`;
    sessionStorage.set(key, filters);
  },

  // Recuperar filtros de tabla
  getTableFilters: (tableId) => {
    const key = `table_filters_${tableId}`;
    return sessionStorage.get(key, {});
  },

  // Guardar configuración de usuario
  saveUserPreferences: (preferences) => {
    sessionStorage.set('user_preferences', preferences);
  },

  // Recuperar configuración de usuario
  getUserPreferences: () => {
    return sessionStorage.get('user_preferences', {
      theme: 'light',
      language: 'es',
      pageSize: 10,
    });
  },

  // Guardar historial de navegación
  saveNavigationHistory: (path) => {
    const history = sessionStorage.get('navigation_history', []);
    history.push({
      path,
      timestamp: new Date().toISOString(),
    });
    
    // Mantener solo los últimos 10 elementos
    if (history.length > 10) {
      history.shift();
    }
    
    sessionStorage.set('navigation_history', history);
  },

  // Obtener historial de navegación
  getNavigationHistory: () => {
    return sessionStorage.get('navigation_history', []);
  },

  // Limpiar historial de navegación
  clearNavigationHistory: () => {
    sessionStorage.remove('navigation_history');
  },
};

export default sessionStorage;