import { api } from '../../persistence';
import { Calle } from '../models';

const calleService = {
  // Obtener todas las calles
  getAll: async () => {
    const response = await api.get('/api/calles');
    return response.data.map(data => new Calle(data));
  },

  // Obtener calle por ID
  getById: async (id) => {
    const response = await api.get(`/api/calles/${id}`);
    return new Calle(response.data);
  },

  // Crear nueva calle
  create: async (calleData) => {
    const response = await api.post('/api/calles', calleData);
    return new Calle(response.data);
  },

  // Actualizar calle
  update: async (id, calleData) => {
    const response = await api.put(`/api/calles/${id}`, calleData);
    return new Calle(response.data);
  },

  // Eliminar calle
  delete: async (id) => {
    const response = await api.delete(`/api/calles/${id}`);
    return response.data;
  },

  // Validar datos de la calle
  validate: (calleData) => {
    const errors = {};
    
    if (!calleData.nom_calle) {
      errors.nom_calle = 'El nombre de la calle es requerido';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },
};

export default calleService;