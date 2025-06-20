const validationService = {
  // Validar email
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validar teléfono
  validatePhone: (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  // Validar cédula
  validateCedula: (cedula) => {
    const cedulaRegex = /^[0-9]{7,8}$/;
    return cedulaRegex.test(cedula);
  },

  // Validar contraseña
  validatePassword: (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return {
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
      errors: {
        minLength: password.length < minLength,
        hasUpperCase: !hasUpperCase,
        hasLowerCase: !hasLowerCase,
        hasNumbers: !hasNumbers,
      }
    };
  },

  // Validar campo requerido
  validateRequired: (value) => {
    if (typeof value === 'string') {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined && value !== '';
  },

  // Validar longitud mínima
  validateMinLength: (value, minLength) => {
    if (typeof value !== 'string') return false;
    return value.length >= minLength;
  },

  // Validar longitud máxima
  validateMaxLength: (value, maxLength) => {
    if (typeof value !== 'string') return false;
    return value.length <= maxLength;
  },

  // Validar número
  validateNumeric: (value) => {
    return !isNaN(value) && !isNaN(parseFloat(value));
  },

  // Validar entero
  validateInteger: (value) => {
    return Number.isInteger(Number(value));
  },

  // Validar número positivo
  validatePositive: (value) => {
    return Number(value) > 0;
  },

  // Validar rango
  validateRange: (value, min, max) => {
    const num = Number(value);
    return num >= min && num <= max;
  },

  // Validar fecha
  validateDate: (date) => {
    const d = new Date(date);
    return d instanceof Date && !isNaN(d.getTime());
  },

  // Validar rango de fechas
  validateDateRange: (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return start <= end;
  },

  // Validar edad
  validateAge: (birthDate, minAge = 0, maxAge = 120) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age >= minAge && age <= maxAge;
  },

  // Validar URL
  validateURL: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  // Validar formulario completo
  validateForm: (data, rules) => {
    const errors = {};
    
    for (const field in rules) {
      const value = data[field];
      const fieldRules = rules[field];
      
      for (const rule of fieldRules) {
        const { type, message, ...params } = rule;
        let isValid = true;
        
        switch (type) {
          case 'required':
            isValid = validationService.validateRequired(value);
            break;
          case 'email':
            isValid = !value || validationService.validateEmail(value);
            break;
          case 'phone':
            isValid = !value || validationService.validatePhone(value);
            break;
          case 'cedula':
            isValid = !value || validationService.validateCedula(value);
            break;
          case 'password':
            isValid = !value || validationService.validatePassword(value).isValid;
            break;
          case 'minLength':
            isValid = !value || validationService.validateMinLength(value, params.min);
            break;
          case 'maxLength':
            isValid = !value || validationService.validateMaxLength(value, params.max);
            break;
          case 'numeric':
            isValid = !value || validationService.validateNumeric(value);
            break;
          case 'integer':
            isValid = !value || validationService.validateInteger(value);
            break;
          case 'positive':
            isValid = !value || validationService.validatePositive(value);
            break;
          case 'range':
            isValid = !value || validationService.validateRange(value, params.min, params.max);
            break;
          case 'date':
            isValid = !value || validationService.validateDate(value);
            break;
          case 'age':
            isValid = !value || validationService.validateAge(value, params.min, params.max);
            break;
          case 'url':
            isValid = !value || validationService.validateURL(value);
            break;
          case 'custom':
            isValid = params.validator(value, data);
            break;
          default:
            break;
        }
        
        if (!isValid) {
          if (!errors[field]) {
            errors[field] = [];
          }
          errors[field].push(message);
          break; // Solo mostrar el primer error por campo
        }
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Obtener error de campo
  getFieldError: (errors, field) => {
    return errors[field] ? errors[field][0] : null;
  },

  // Verificar si hay error en campo
  hasFieldError: (errors, field) => {
    return errors[field] && errors[field].length > 0;
  },

  // Sanitizar entrada
  sanitizeInput: (input) => {
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/[<>]/g, '') // Remover < y >
      .replace(/javascript:/gi, '') // Remover javascript:
      .replace(/on\w+=/gi, '') // Remover event handlers
      .trim();
  },

  // Normalizar texto
  normalizeText: (text) => {
    if (typeof text !== 'string') return text;
    
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remover acentos
      .replace(/[^\w\s]/g, '') // Remover caracteres especiales
      .trim();
  },
};

export default validationService;