const dataService = {
  // Transformar datos para la vista
  transformForView: (data, transformations = {}) => {
    if (!data) return data;
    
    if (Array.isArray(data)) {
      return data.map(item => dataService.transformForView(item, transformations));
    }
    
    const transformed = { ...data };
    
    // Aplicar transformaciones específicas
    Object.keys(transformations).forEach(key => {
      if (transformed[key] !== undefined) {
        transformed[key] = transformations[key](transformed[key]);
      }
    });
    
    return transformed;
  },

  // Formatear fecha
  formatDate: (date, format = 'dd/mm/yyyy') => {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    
    switch (format) {
      case 'dd/mm/yyyy':
        return `${day}/${month}/${year}`;
      case 'mm/dd/yyyy':
        return `${month}/${day}/${year}`;
      case 'yyyy-mm-dd':
        return `${year}-${month}-${day}`;
      default:
        return d.toLocaleDateString();
    }
  },

  // Formatear número
  formatNumber: (number, decimals = 0) => {
    if (isNaN(number)) return '';
    return new Intl.NumberFormat('es-VE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(number);
  },

  // Formatear moneda
  formatCurrency: (amount, currency = 'VES') => {
    if (isNaN(amount)) return '';
    return new Intl.NumberFormat('es-VE', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  },

  // Formatear teléfono
  formatPhone: (phone) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return cleaned;
  },

  // Formatear cédula
  formatCedula: (cedula) => {
    if (!cedula) return '';
    const cleaned = cedula.replace(/\D/g, '');
    if (cleaned.length <= 8) {
      return cleaned.replace(/(\d{1,2})(\d{3})(\d{3})/, '$1.$2.$3');
    }
    return cleaned;
  },

  // Calcular edad
  calculateAge: (birthDate) => {
    if (!birthDate) return 0;
    
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  },

  // Filtrar datos
  filterData: (data, filters) => {
    if (!Array.isArray(data)) return data;
    
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === '' || value == null) return true;
        
        const itemValue = item[key];
        if (typeof value === 'string') {
          return itemValue.toString().toLowerCase().includes(value.toLowerCase());
        }
        return itemValue === value;
      });
    });
  },

  // Ordenar datos
  sortData: (data, key, direction = 'asc') => {
    if (!Array.isArray(data)) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      
      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  },

  // Agrupar datos
  groupData: (data, key) => {
    if (!Array.isArray(data)) return {};
    
    return data.reduce((groups, item) => {
      const group = item[key];
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {});
  },

  // Paginar datos
  paginateData: (data, page = 1, pageSize = 10) => {
    if (!Array.isArray(data)) return { data: [], total: 0, page, pageSize };
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
      data: data.slice(startIndex, endIndex),
      total: data.length,
      page,
      pageSize,
      totalPages: Math.ceil(data.length / pageSize),
    };
  },

  // Buscar en datos
  searchData: (data, searchTerm, searchFields = []) => {
    if (!Array.isArray(data) || !searchTerm) return data;
    
    const term = searchTerm.toLowerCase();
    
    return data.filter(item => {
      if (searchFields.length === 0) {
        // Buscar en todos los campos string
        return Object.values(item).some(value => 
          typeof value === 'string' && value.toLowerCase().includes(term)
        );
      } else {
        // Buscar solo en campos específicos
        return searchFields.some(field => {
          const value = item[field];
          return typeof value === 'string' && value.toLowerCase().includes(term);
        });
      }
    });
  },

  // Validar estructura de datos
  validateDataStructure: (data, requiredFields = []) => {
    if (!data || typeof data !== 'object') {
      return { isValid: false, errors: ['Datos inválidos'] };
    }
    
    const errors = [];
    
    requiredFields.forEach(field => {
      if (!(field in data)) {
        errors.push(`Campo requerido faltante: ${field}`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  // Limpiar datos
  cleanData: (data) => {
    if (!data) return data;
    
    if (Array.isArray(data)) {
      return data.map(item => dataService.cleanData(item));
    }
    
    if (typeof data === 'object') {
      const cleaned = {};
      Object.keys(data).forEach(key => {
        const value = data[key];
        if (value !== null && value !== undefined && value !== '') {
          cleaned[key] = dataService.cleanData(value);
        }
      });
      return cleaned;
    }
    
    return data;
  },

  // Convertir a CSV
  toCSV: (data, delimiter = ',') => {
    if (!Array.isArray(data) || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(delimiter);
    
    const csvRows = data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escapar comillas y envolver en comillas si contiene el delimitador
        if (typeof value === 'string' && (value.includes(delimiter) || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(delimiter)
    );
    
    return [csvHeaders, ...csvRows].join('\n');
  },

  // Convertir desde CSV
  fromCSV: (csvString, delimiter = ',') => {
    if (!csvString) return [];
    
    const lines = csvString.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(delimiter);
    
    return lines.slice(1).map(line => {
      const values = line.split(delimiter);
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index] ? values[index].trim() : '';
      });
      return obj;
    });
  },
};

export default dataService;