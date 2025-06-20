// Utilidades para formateo de fechas
export const formatDate = (date, format = 'dd/mm/yyyy') => {
  if (!date) return '';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  switch (format) {
    case 'dd/mm/yyyy':
      return `${day}/${month}/${year}`;
    case 'mm/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'yyyy-mm-dd':
      return `${year}-${month}-${day}`;
    case 'dd/mm/yyyy hh:mm':
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    case 'dd/mm/yyyy hh:mm:ss':
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    case 'relative':
      return getRelativeTime(d);
    case 'long':
      return d.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    case 'short':
      return d.toLocaleDateString('es-ES', {
        month: 'short',
        day: 'numeric'
      });
    default:
      return d.toLocaleDateString();
  }
};

export const getRelativeTime = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  
  if (seconds < 60) return 'hace unos segundos';
  if (minutes < 60) return `hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
  if (hours < 24) return `hace ${hours} hora${hours > 1 ? 's' : ''}`;
  if (days < 7) return `hace ${days} día${days > 1 ? 's' : ''}`;
  if (weeks < 4) return `hace ${weeks} semana${weeks > 1 ? 's' : ''}`;
  if (months < 12) return `hace ${months} mes${months > 1 ? 'es' : ''}`;
  return `hace ${years} año${years > 1 ? 's' : ''}`;
};

export const isToday = (date) => {
  const today = new Date();
  const d = new Date(date);
  return d.toDateString() === today.toDateString();
};

export const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const d = new Date(date);
  return d.toDateString() === yesterday.toDateString();
};

export const isSameWeek = (date) => {
  const now = new Date();
  const d = new Date(date);
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
  return d >= startOfWeek && d <= endOfWeek;
};

export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addMonths = (date, months) => {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
};

export const addYears = (date, years) => {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + years);
  return result;
};

export const getAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
};

export const getLastDayOfMonth = (year, month) => {
  return new Date(year, month, 0).getDay();
};

export const isLeapYear = (year) => {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
};

export const getWeekNumber = (date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

export const getMonthName = (month, locale = 'es-ES') => {
  const date = new Date();
  date.setMonth(month - 1);
  return date.toLocaleDateString(locale, { month: 'long' });
};

export const getDayName = (day, locale = 'es-ES') => {
  const date = new Date();
  date.setDate(date.getDate() + (day - date.getDay()));
  return date.toLocaleDateString(locale, { weekday: 'long' });
};

export const parseDate = (dateString, format = 'dd/mm/yyyy') => {
  if (!dateString) return null;
  
  let day, month, year;
  
  switch (format) {
    case 'dd/mm/yyyy':
      [day, month, year] = dateString.split('/');
      break;
    case 'mm/dd/yyyy':
      [month, day, year] = dateString.split('/');
      break;
    case 'yyyy-mm-dd':
      [year, month, day] = dateString.split('-');
      break;
    default:
      return new Date(dateString);
  }
  
  return new Date(year, month - 1, day);
};

export const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const getDateRange = (startDate, endDate) => {
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);
  
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  
  return dates;
};

export const getBusinessDays = (startDate, endDate) => {
  const dates = getDateRange(startDate, endDate);
  return dates.filter(date => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // Excluir domingos (0) y sábados (6)
  });
};

export const getWeekends = (startDate, endDate) => {
  const dates = getDateRange(startDate, endDate);
  return dates.filter(date => {
    const day = date.getDay();
    return day === 0 || day === 6; // Solo domingos (0) y sábados (6)
  });
};

const formatDateUtils = {
  formatDate,
  getRelativeTime,
  isToday,
  isYesterday,
  isSameWeek,
  addDays,
  addMonths,
  addYears,
  getAge,
  getDaysInMonth,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  isLeapYear,
  getWeekNumber,
  getMonthName,
  getDayName,
  parseDate,
  isValidDate,
  getDateRange,
  getBusinessDays,
  getWeekends,
};

export default formatDateUtils;