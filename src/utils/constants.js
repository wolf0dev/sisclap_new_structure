// Constantes de la aplicación
export const APP_NAME = 'Sistema de Gestión de Beneficios';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Sistema de gestión de beneficiarios para la comunidad Brisas del Orinoco II';

// URLs de la API
export const API_BASE_URL = 'http://127.0.0.1:3000';
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/usuarios/login',
    REGISTER: '/api/usuarios/registro',
    RECOVER_PASSWORD: '/api/usuarios/recuperar',
    RECOVER_USERNAME: '/api/usuarios/recuperar-usuario',
    UPDATE_PROFILE: '/api/usuarios/actualizar',
    CHANGE_PASSWORD: '/api/usuarios/actualizar-contrasena',
  },
  BENEFICIARIOS: {
    BASE: '/api/beneficiarios',
    BY_ID: (id) => `/api/beneficiarios/${id}`,
    UPDATE_STATUS: (id) => `/api/beneficiarios/estatus/${id}`,
  },
  DEPENDIENTES: {
    BASE: '/api/dependientes',
    BY_BENEFICIARIO: (id) => `/api/dependientes/${id}`,
    BY_ID: (id) => `/api/dependientes/detalles/${id}`,
  },
  CALLES: {
    BASE: '/api/calles',
  },
  REPORTES: {
    GENERAL: '/api/reportes/beneficiarios-dependientes',
    CARGA_FAMILIAR: (id) => `/api/reportes/beneficiario-dependientes/${id}`,
    HABITANTES_CALLE: (id) => `/api/reportes/habitantes-calle/${id}`,
    RANGO_EDAD: '/api/reportes/rango-edad',
  },
};

// Roles de usuario
export const USER_ROLES = {
  LIDER_COMUNIDAD: 1,
  JEFE_CALLE: 2,
};

export const ROLE_NAMES = {
  [USER_ROLES.LIDER_COMUNIDAD]: 'Líder de Comunidad',
  [USER_ROLES.JEFE_CALLE]: 'Jefe de Calle',
};

// Estados de beneficiarios
export const BENEFICIARIO_STATUS = {
  ACTIVO: 'Activo',
  INACTIVO: 'Inactivo',
};

// Géneros
export const GENEROS = ['Masculino', 'Femenino'];

// Estados civiles
export const ESTADOS_CIVILES = [
  'Soltero',
  'Casado',
  'Divorciado',
  'Viudo',
  'Unión Libre',
];

// Grados de instrucción
export const GRADOS_INSTRUCCION = [
  'Sin Instrucción',
  'Primaria',
  'Secundaria',
  'Técnico',
  'Universitario',
  'Postgrado',
];

// Parentescos
export const PARENTESCOS = [
  'Hijo',
  'Hija',
  'Esposo',
  'Esposa',
  'Padre',
  'Madre',
  'Hermano',
  'Hermana',
  'Otro',
];

// Tipos de reporte
export const TIPOS_REPORTE = {
  CARGA_FAMILIAR: 'carga-familiar',
  HABITANTES_CALLE: 'habitantes-calle',
  RANGO_EDAD: 'rango-edad',
  VENTAS: 'ventas',
};

// Tipos de venta
export const TIPOS_VENTA = {
  CLAP: 'CLAP',
  GAS: 'GAS',
};

// Formatos de fecha
export const DATE_FORMATS = {
  SHORT: 'dd/mm/yyyy',
  LONG: 'dd/mm/yyyy hh:mm',
  ISO: 'yyyy-mm-dd',
  RELATIVE: 'relative',
};

// Tamaños de archivo
export const FILE_SIZES = {
  MAX_IMAGE_SIZE: 2, // MB
  MAX_DOCUMENT_SIZE: 10, // MB
};

// Tipos de archivo permitidos
export const ALLOWED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  SPREADSHEETS: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
};

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
  MAX_PAGE_SIZE: 100,
};

// Configuración de notificaciones
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const NOTIFICATION_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000,
  PERSISTENT: 0,
};

// Configuración de tema
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto',
};

// Breakpoints responsive
export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536,
};

// Z-index layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODAL_BACKDROP: 1040,
  MODAL: 1050,
  POPOVER: 1060,
  TOOLTIP: 1070,
};

// Configuración de validación
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 50,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERNAME_LENGTH: 20,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 100,
  MIN_AGE: 0,
  MAX_AGE: 120,
  CEDULA_MIN_LENGTH: 7,
  CEDULA_MAX_LENGTH: 8,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
};

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  REQUIRED: 'Este campo es requerido',
  INVALID_EMAIL: 'Correo electrónico inválido',
  INVALID_PHONE: 'Número de teléfono inválido',
  INVALID_CEDULA: 'Cédula inválida',
  PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${VALIDATION.MIN_PASSWORD_LENGTH} caracteres`,
  PASSWORD_TOO_LONG: `La contraseña no puede tener más de ${VALIDATION.MAX_PASSWORD_LENGTH} caracteres`,
  PASSWORDS_DONT_MATCH: 'Las contraseñas no coinciden',
  INVALID_DATE: 'Fecha inválida',
  INVALID_AGE: `La edad debe estar entre ${VALIDATION.MIN_AGE} y ${VALIDATION.MAX_AGE} años`,
  FILE_TOO_LARGE: `El archivo es demasiado grande (máximo ${FILE_SIZES.MAX_IMAGE_SIZE}MB)`,
  INVALID_FILE_TYPE: 'Tipo de archivo no permitido',
  NETWORK_ERROR: 'Error de conexión. Verifique su conexión a internet.',
  SERVER_ERROR: 'Error del servidor. Intente nuevamente más tarde.',
  UNAUTHORIZED: 'No tiene permisos para realizar esta acción',
  NOT_FOUND: 'El recurso solicitado no fue encontrado',
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  CREATED: 'Creado exitosamente',
  UPDATED: 'Actualizado exitosamente',
  DELETED: 'Eliminado exitosamente',
  SAVED: 'Guardado exitosamente',
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  LOGOUT_SUCCESS: 'Sesión cerrada exitosamente',
  PASSWORD_CHANGED: 'Contraseña cambiada exitosamente',
  PROFILE_UPDATED: 'Perfil actualizado exitosamente',
  EMAIL_SENT: 'Correo enviado exitosamente',
  FILE_UPLOADED: 'Archivo subido exitosamente',
  EXPORT_SUCCESS: 'Exportación completada exitosamente',
};

// Configuración de localStorage
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_DATA: 'userData',
  THEME: 'theme',
  LANGUAGE: 'language',
  PREFERENCES: 'preferences',
  LAST_ROUTE: 'lastRoute',
};

// Configuración de cookies
export const COOKIE_NAMES = {
  SESSION: 'session',
  PREFERENCES: 'preferences',
  CONSENT: 'consent',
};

// Configuración de idiomas
export const LANGUAGES = {
  ES: 'es',
  EN: 'en',
};

export const LANGUAGE_NAMES = {
  [LANGUAGES.ES]: 'Español',
  [LANGUAGES.EN]: 'English',
};

// Configuración de monedas
export const CURRENCIES = {
  VES: 'VES',
  USD: 'USD',
  EUR: 'EUR',
};

export const CURRENCY_SYMBOLS = {
  [CURRENCIES.VES]: 'Bs.',
  [CURRENCIES.USD]: '$',
  [CURRENCIES.EUR]: '€',
};

// Configuración de exportación
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  EXCEL: 'excel',
  CSV: 'csv',
  JSON: 'json',
};

// Configuración de impresión
export const PRINT_SIZES = {
  A4: 'A4',
  LETTER: 'Letter',
  LEGAL: 'Legal',
};

export const PRINT_ORIENTATIONS = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
};

// Configuración de gráficos
export const CHART_COLORS = [
  '#FF4040',
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEAA7',
  '#DDA0DD',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
];

// Configuración de animaciones
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

export const ANIMATION_EASING = {
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  LINEAR: 'linear',
};

// Configuración de debounce
export const DEBOUNCE_DELAY = {
  SEARCH: 300,
  RESIZE: 100,
  SCROLL: 50,
  INPUT: 500,
};

// Configuración de retry
export const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  DELAY: 1000,
  BACKOFF_FACTOR: 2,
};

// Configuración de cache
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutos
  MEDIUM: 30 * 60 * 1000, // 30 minutos
  LONG: 60 * 60 * 1000, // 1 hora
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 horas
};

// Configuración de logs
export const LOG_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};

// Configuración de desarrollo
export const DEV_CONFIG = {
  ENABLE_LOGS: process.env.NODE_ENV === 'development',
  ENABLE_DEBUG: process.env.NODE_ENV === 'development',
  API_TIMEOUT: 30000, // 30 segundos
};

const constants = {
  APP_NAME,
  APP_VERSION,
  APP_DESCRIPTION,
  API_BASE_URL,
  API_ENDPOINTS,
  USER_ROLES,
  ROLE_NAMES,
  BENEFICIARIO_STATUS,
  GENEROS,
  ESTADOS_CIVILES,
  GRADOS_INSTRUCCION,
  PARENTESCOS,
  TIPOS_REPORTE,
  TIPOS_VENTA,
  DATE_FORMATS,
  FILE_SIZES,
  ALLOWED_FILE_TYPES,
  PAGINATION,
  NOTIFICATION_TYPES,
  NOTIFICATION_DURATION,
  THEME_MODES,
  BREAKPOINTS,
  Z_INDEX,
  VALIDATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  COOKIE_NAMES,
  LANGUAGES,
  LANGUAGE_NAMES,
  CURRENCIES,
  CURRENCY_SYMBOLS,
  EXPORT_FORMATS,
  PRINT_SIZES,
  PRINT_ORIENTATIONS,
  CHART_COLORS,
  ANIMATION_DURATION,
  ANIMATION_EASING,
  DEBOUNCE_DELAY,
  RETRY_CONFIG,
  CACHE_DURATION,
  LOG_LEVELS,
  DEV_CONFIG,
};

export default constants;