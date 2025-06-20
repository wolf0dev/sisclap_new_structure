import api from '../persistence/api';
import { jwtDecode } from 'jwt-decode';

const auth = {
  // Iniciar sesión
  login: async (username, password) => {
    try {
      const response = await api.post('/api/usuarios/login', {
        user: username,
        pass_user: password,
      });

      const { token, ...userData } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Convertir la foto de perfil base64 a URL si existe
      if (userData.foto_perfil) {
        try {
          if (typeof userData.foto_perfil === 'string') {
            userData.foto_perfil = `data:image/jpeg;base64,${userData.foto_perfil}`;
          }
        } catch (error) {
          console.warn('Error procesando foto de perfil:', error);
          userData.foto_perfil = undefined;
        }
      }

      return userData;
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      throw error;
    }
  },

  // Cerrar sesión
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    delete api.defaults.headers.common['Authorization'];
  },

  // Registrar usuario
  register: async (userData) => {
    try {
      const response = await api.post('/api/usuarios/registro', userData);
      return response.data;
    } catch (error) {
      console.error('Error de registro:', error);
      throw error;
    }
  },

  // Recuperar contraseña
  recoverPassword: async (correo, ced_user) => {
    try {
      const response = await api.post('/api/usuarios/recuperar', {
        correo,
        ced_user,
      });
      return response.data;
    } catch (error) {
      console.error('Error al recuperar contraseña:', error);
      throw error;
    }
  },

  // Recuperar nombre de usuario
  recoverUsername: async (ced_user, nom_user) => {
    try {
      const response = await api.post('/api/usuarios/recuperar-usuario', {
        ced_user,
        nom_user,
      });
      return response.data;
    } catch (error) {
      console.error('Error al recuperar usuario:', error);
      throw error;
    }
  },

  // Actualizar perfil
  updateProfile: async (data, userId) => {
    try {
      // Preparar la foto de perfil para envío
      let foto_perfil = null;
      if (data.foto_perfil && data.foto_perfil.startsWith('data:image/')) {
        // Extraer solo la parte base64 sin el prefijo data:image/...;base64,
        foto_perfil = data.foto_perfil.split(',')[1];
      }

      const response = await api.put('/api/usuarios/actualizar', {
        id: userId,
        nom_user: data.nom_user,
        user: data.user,
        ced_user: data.ced_user,
        correo: data.correo,
        id_rol_user: data.id_rol_user,
        id_calle: data.id_calle,
        foto_perfil: foto_perfil,
      });

      return response.data;
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    }
  },

  // Cambiar contraseña
  changePassword: async (userId, oldPassword, newPassword) => {
    try {
      const response = await api.put('/api/usuarios/actualizar-contrasena', {
        id: userId,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });

      return response.data;
    } catch (error) {
      console.error('Error al cambiar contraseña:', error);
      throw error;
    }
  },

  // Verificar si el token es válido
  isTokenValid: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp && decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  },

  // Obtener datos del usuario desde localStorage
  getCurrentUser: () => {
    const userData = localStorage.getItem('userData');
    if (!userData) return null;

    try {
      const parsedUserData = JSON.parse(userData);
      
      // Convertir la foto de perfil base64 a URL si existe
      if (parsedUserData.foto_perfil) {
        try {
          if (typeof parsedUserData.foto_perfil === 'string') {
            parsedUserData.foto_perfil = `data:image/jpeg;base64,${parsedUserData.foto_perfil}`;
          }
        } catch (error) {
          console.warn('Error procesando foto de perfil:', error);
          parsedUserData.foto_perfil = null;
        }
      }

      return parsedUserData;
    } catch (error) {
      return null;
    }
  },

  // Verificar permisos
  hasPermission: (user, permission) => {
    if (!user) return false;
    
    // Líder de comunidad tiene todos los permisos
    if (user.id_rol_user === 1) return true;
    
    // Jefe de calle tiene permisos limitados
    if (user.id_rol_user === 2) {
      const allowedPermissions = [
        'view_beneficiarios',
        'edit_beneficiarios',
        'view_dependientes',
        'edit_dependientes',
        'view_reports',
      ];
      return allowedPermissions.includes(permission);
    }
    
    return false;
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
  getRoleName: (user) => {
    if (!user) return 'Usuario';
    
    const roles = {
      1: 'Líder de Comunidad',
      2: 'Jefe de Calle',
    };
    
    return roles[user.id_rol_user] || 'Usuario';
  },

  // Refrescar token
  refreshToken: async () => {
    try {
      const response = await api.post('/api/usuarios/refresh-token');
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return token;
    } catch (error) {
      console.error('Error al refrescar token:', error);
      auth.logout();
      throw error;
    }
  },
};

export default auth;