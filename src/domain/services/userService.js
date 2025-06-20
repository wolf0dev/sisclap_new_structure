import { apiFetch, apiFetchId, apiUpdate, apiDelete } from '../../persistence';
import { User } from '../models';

const userService = {
  // Obtener todos los usuarios
  getAll: async () => {
    const data = await apiFetch('/api/usuarios');
    return data.map(userData => new User(userData));
  },

  // Obtener usuario por ID
  getById: async (id) => {
    const data = await apiFetchId('/api/usuarios', id);
    return new User(data);
  },

  // Actualizar usuario
  update: async (id, userData) => {
    const data = await apiUpdate('/api/usuarios', id, userData);
    return new User(data);
  },

  // Eliminar usuario
  delete: async (id) => {
    return await apiDelete('/api/usuarios', id);
  },

  // Validar permisos de usuario
  hasPermission: (user, permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  },

  // Verificar si es líder de comunidad
  isLiderComunidad: (user) => {
    return user?.id_rol_user === 1;
  },

  // Verificar si es jefe de calle
  isJefeCalle: (user) => {
    return user?.id_rol_user === 2;
  },

  // Obtener nombre del rol
  getRoleName: (roleId) => {
    const roles = {
      1: 'Líder de Comunidad',
      2: 'Jefe de Calle',
    };
    return roles[roleId] || 'Usuario';
  },
};

export default userService;