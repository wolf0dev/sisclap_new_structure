// Utilidades para validación de formularios
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateCedula = (cedula) => {
  const cedulaRegex = /^[0-9]{7,8}$/;
  return cedulaRegex.test(cedula);
};

export const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    errors: {
      minLength: password.length < minLength,
      hasUpperCase: !hasUpperCase,
      hasLowerCase: !hasLowerCase,
      hasNumbers: !hasNumbers,
      hasSpecialChar: !hasSpecialChar,
    }
  };
};

export const validateRequired = (value) => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined && value !== '';
};

export const validateMinLength = (value, minLength) => {
  if (typeof value !== 'string') return false;
  return value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  if (typeof value !== 'string') return false;
  return value.length <= maxLength;
};

export const validateNumeric = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value));
};

export const validateInteger = (value) => {
  return Number.isInteger(Number(value));
};

export const validatePositive = (value) => {
  return Number(value) > 0;
};

export const validateRange = (value, min, max) => {
  const num = Number(value);
  return num >= min && num <= max;
};

export const validateDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
};

export const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
};

export const validateAge = (birthDate, minAge = 0, maxAge = 120) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age >= minAge && age <= maxAge;
};

export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateFileSize = (file, maxSizeInMB) => {
  if (!file) return false;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
};

export const validateFileType = (file, allowedTypes) => {
  if (!file) return false;
  return allowedTypes.includes(file.type);
};

export const validateImageDimensions = (file, maxWidth, maxHeight) => {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith('image/')) {
      resolve(false);
      return;
    }
    
    const img = new Image();
    img.onload = () => {
      resolve(img.width <= maxWidth && img.height <= maxHeight);
    };
    img.onerror = () => resolve(false);
    img.src = URL.createObjectURL(file);
  });
};

export const validateCreditCard = (cardNumber) => {
  // Algoritmo de Luhn
  const digits = cardNumber.replace(/\D/g, '');
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

export const validateForm = (data, rules) => {
  const errors = {};
  
  for (const field in rules) {
    const value = data[field];
    const fieldRules = rules[field];
    
    for (const rule of fieldRules) {
      const { type, message, ...params } = rule;
      let isValid = true;
      
      switch (type) {
        case 'required':
          isValid = validateRequired(value);
          break;
        case 'email':
          isValid = !value || validateEmail(value);
          break;
        case 'phone':
          isValid = !value || validatePhone(value);
          break;
        case 'cedula':
          isValid = !value || validateCedula(value);
          break;
        case 'password':
          isValid = !value || validatePassword(value).isValid;
          break;
        case 'minLength':
          isValid = !value || validateMinLength(value, params.min);
          break;
        case 'maxLength':
          isValid = !value || validateMaxLength(value, params.max);
          break;
        case 'numeric':
          isValid = !value || validateNumeric(value);
          break;
        case 'integer':
          isValid = !value || validateInteger(value);
          break;
        case 'positive':
          isValid = !value || validatePositive(value);
          break;
        case 'range':
          isValid = !value || validateRange(value, params.min, params.max);
          break;
        case 'date':
          isValid = !value || validateDate(value);
          break;
        case 'age':
          isValid = !value || validateAge(value, params.min, params.max);
          break;
        case 'url':
          isValid = !value || validateURL(value);
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
};

export const getFieldError = (errors, field) => {
  return errors[field] ? errors[field][0] : null;
};

export const hasFieldError = (errors, field) => {
  return errors[field] && errors[field].length > 0;
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remover < y >
    .replace(/javascript:/gi, '') // Remover javascript:
    .replace(/on\w+=/gi, '') // Remover event handlers
    .trim();
};

export const normalizeText = (text) => {
  if (typeof text !== 'string') return text;
  
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^\w\s]/g, '') // Remover caracteres especiales
    .trim();
};

export const formatCedula = (cedula) => {
  const cleaned = cedula.replace(/\D/g, '');
  if (cleaned.length <= 8) {
    return cleaned.replace(/(\d{1,2})(\d{3})(\d{3})/, '$1.$2.$3');
  }
  return cleaned;
};

export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return cleaned;
};

export const formatCurrency = (amount, currency = 'VES') => {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatNumber = (number, decimals = 0) => {
  return new Intl.NumberFormat('es-VE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
};

const validateFormUtils = {
  validateEmail,
  validatePhone,
  validateCedula,
  validatePassword,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateNumeric,
  validateInteger,
  validatePositive,
  validateRange,
  validateDate,
  validateDateRange,
  validateAge,
  validateURL,
  validateFileSize,
  validateFileType,
  validateImageDimensions,
  validateCreditCard,
  validateForm,
  getFieldError,
  hasFieldError,
  sanitizeInput,
  normalizeText,
  formatCedula,
  formatPhone,
  formatCurrency,
  formatNumber,
};

export default validateFormUtils;