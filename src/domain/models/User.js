class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.nom_user = data.nom_user || '';
    this.ced_user = data.ced_user || '';
    this.user = data.user || '';
    this.correo = data.correo || '';
    this.id_rol_user = data.id_rol_user || 2;
    this.id_calle = data.id_calle || null;
    this.foto_perfil = data.foto_perfil || null;
    this.estatus = data.estatus || 'Activo';
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  // Getters
  get fullName() {
    return this.nom_user;
  }

  get isActive() {
    return this.estatus === 'Activo' || this.estatus === 'ACTIVO';
  }

  get isLiderComunidad() {
    return this.id_rol_user === 1;
  }

  get isJefeCalle() {
    return this.id_rol_user === 2;
  }

  get roleName() {
    const roles = {
      1: 'Líder de Comunidad',
      2: 'Jefe de Calle',
    };
    return roles[this.id_rol_user] || 'Usuario';
  }

  // Métodos
  hasPermission(permission) {
    // Implementar lógica de permisos según el rol
    const permissions = {
      1: ['all'], // Líder de comunidad tiene todos los permisos
      2: ['view_beneficiarios', 'edit_beneficiarios', 'view_dependientes', 'edit_dependientes'], // Jefe de calle
    };
    
    const userPermissions = permissions[this.id_rol_user] || [];
    return userPermissions.includes('all') || userPermissions.includes(permission);
  }

  canAccessBeneficiario(beneficiario) {
    if (this.isLiderComunidad) return true;
    if (this.isJefeCalle) return beneficiario.id_calle === this.id_calle;
    return false;
  }

  // Validación
  validate() {
    const errors = {};

    if (!this.nom_user) {
      errors.nom_user = 'El nombre es requerido';
    }

    if (!this.ced_user) {
      errors.ced_user = 'La cédula es requerida';
    } else if (!/^[0-9]{7,8}$/.test(this.ced_user)) {
      errors.ced_user = 'La cédula debe tener entre 7 y 8 dígitos';
    }

    if (!this.user) {
      errors.user = 'El nombre de usuario es requerido';
    }

    if (!this.correo) {
      errors.correo = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.correo)) {
      errors.correo = 'El correo no es válido';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Serialización
  toJSON() {
    return {
      id: this.id,
      nom_user: this.nom_user,
      ced_user: this.ced_user,
      user: this.user,
      correo: this.correo,
      id_rol_user: this.id_rol_user,
      id_calle: this.id_calle,
      foto_perfil: this.foto_perfil,
      estatus: this.estatus,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  // Crear desde datos planos
  static fromJSON(data) {
    return new User(data);
  }
}

export default User;