import { apiFetch, apiFetchId, apiUpdate, apiDelete } from '../../persistence';
import { api } from '../../persistence';
import { Beneficiario } from '../models';

const beneficiarioService = {
  // Obtener todos los beneficiarios
  getAll: async () => {
    const response = await api.get('/api/beneficiarios');
    return response.data.map(data => new Beneficiario(data));
  },

  // Obtener beneficiarios filtrados por calle del usuario
  getAllByUserCalle: async (idCalle) => {
    const response = await api.get('/api/beneficiarios');
    const allBeneficiarios = response.data;
    // Filtrar por la calle del usuario
    return allBeneficiarios
      .filter((b) => b.id_calle === idCalle)
      .map(data => new Beneficiario(data));
  },

  // Obtener beneficiario por cédula
  getById: async (cedula) => {
    const response = await api.get(`/api/beneficiarios/${cedula}`);
    return new Beneficiario(response.data);
  },

  // Crear nuevo beneficiario
  create: async (beneficiarioData) => {
    const response = await api.post('/api/beneficiarios', {
      ...beneficiarioData,
      estatus: 'Activo'
    });
    return new Beneficiario(response.data);
  },

  // Actualizar beneficiario
  update: async (cedula, beneficiarioData) => {
    const response = await api.put(`/api/beneficiarios/${cedula}`, {
      cedula,
      ...beneficiarioData,
      estatus: beneficiarioData.estatus || 'Activo'
    });
    return new Beneficiario(response.data);
  },

  // Actualizar estatus del beneficiario
  updateStatus: async (cedula, estatus) => {
    const response = await api.put(`/api/beneficiarios/estatus/${cedula}`, {
      estatus: estatus
    });
    return response.data;
  },

  // Deshabilitar beneficiario (cambiar estatus a Inactivo)
  disable: async (cedula) => {
    return beneficiarioService.updateStatus(cedula, 'Inactivo');
  },

  // Verificar si el usuario puede acceder a este beneficiario
  canAccessBeneficiario: (beneficiario, userRole, userCalle) => {
    // Líder de comunidad puede acceder a todos
    if (userRole === 1) return true;
    // Jefe de calle solo puede acceder a beneficiarios de su calle
    if (userRole === 2) return beneficiario.id_calle === userCalle;
    return false;
  },

  // Función helper para verificar si un beneficiario está activo
  isActive: (beneficiario) => {
    return beneficiario.estatus === 'ACTIVO' || beneficiario.estatus === 'Activo';
  },

  // Función helper para verificar si un beneficiario está inactivo
  isInactive: (beneficiario) => {
    return beneficiario.estatus === 'INACTIVO' || beneficiario.estatus === 'Inactivo';
  },

  // Validar datos del beneficiario
  validate: (beneficiarioData) => {
    const errors = {};
    
    if (!beneficiarioData.cedula) {
      errors.cedula = 'La cédula es requerida';
    }
    
    if (!beneficiarioData.nombre_apellido) {
      errors.nombre_apellido = 'El nombre y apellido es requerido';
    }
    
    if (!beneficiarioData.fecha_nacimiento) {
      errors.fecha_nacimiento = 'La fecha de nacimiento es requerida';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },
};

export default beneficiarioService;