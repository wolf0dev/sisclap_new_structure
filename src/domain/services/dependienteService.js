import { api } from '../../persistence';
import { Dependiente } from '../models';

const dependienteService = {
  // Obtener dependientes por beneficiario
  getByBeneficiario: async (cedulaBeneficiario) => {
    const response = await api.get(`/api/dependientes/${cedulaBeneficiario}`);
    return response.data.map(data => new Dependiente(data));
  },

  // Obtener dependiente por cédula
  getById: async (cedula) => {
    const response = await api.get(`/api/dependientes/detalles/${cedula}`);
    return new Dependiente(response.data);
  },

  // Crear nuevo dependiente
  create: async (dependienteData) => {
    const response = await api.post('/api/dependientes', dependienteData);
    return new Dependiente(response.data);
  },

  // Actualizar dependiente
  update: async (cedula, dependienteData) => {
    const response = await api.put(`/api/dependientes/${cedula}`, dependienteData);
    return new Dependiente(response.data);
  },

  // Eliminar dependiente
  delete: async (cedula) => {
    const response = await api.delete(`/api/dependientes/${cedula}`);
    return response.data;
  },

  // Validar datos del dependiente
  validate: (dependienteData) => {
    const errors = {};
    
    if (!dependienteData.cedula) {
      errors.cedula = 'La cédula es requerida';
    }
    
    if (!dependienteData.nombre_apellido) {
      errors.nombre_apellido = 'El nombre y apellido es requerido';
    }
    
    if (!dependienteData.parentesco) {
      errors.parentesco = 'El parentesco es requerido';
    }
    
    if (!dependienteData.cedula_beneficiario) {
      errors.cedula_beneficiario = 'La cédula del beneficiario es requerida';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Obtener tipos de parentesco disponibles
  getParentescoTypes: () => {
    return [
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
  },
};

export default dependienteService;