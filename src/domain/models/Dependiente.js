class Dependiente {
  constructor(data = {}) {
    this.cedula = data.cedula || '';
    this.nombre_apellido = data.nombre_apellido || '';
    this.fecha_nacimiento = data.fecha_nacimiento || null;
    this.genero = data.genero || '';
    this.parentesco = data.parentesco || '';
    this.cedula_beneficiario = data.cedula_beneficiario || '';
    this.nombre_beneficiario = data.nombre_beneficiario || '';
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  // Getters
  get fullName() {
    return this.nombre_apellido;
  }

  get age() {
    if (!this.fecha_nacimiento) return 0;
    
    const today = new Date();
    const birth = new Date(this.fecha_nacimiento);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  get formattedBirthDate() {
    if (!this.fecha_nacimiento) return '';
    const date = new Date(this.fecha_nacimiento);
    return date.toLocaleDateString('es-ES');
  }

  get formattedCedula() {
    if (!this.cedula) return '';
    const cleaned = this.cedula.replace(/\D/g, '');
    if (cleaned.length <= 8) {
      return cleaned.replace(/(\d{1,2})(\d{3})(\d{3})/, '$1.$2.$3');
    }
    return cleaned;
  }

  // Métodos
  isAdult() {
    return this.age >= 18;
  }

  isMinor() {
    return this.age < 18;
  }

  isSenior() {
    return this.age >= 60;
  }

  isChild() {
    return this.age < 12;
  }

  isTeenager() {
    return this.age >= 12 && this.age < 18;
  }

  // Validación
  validate() {
    const errors = {};

    if (!this.cedula) {
      errors.cedula = 'La cédula es requerida';
    } else if (!/^[0-9]{7,8}$/.test(this.cedula)) {
      errors.cedula = 'La cédula debe tener entre 7 y 8 dígitos';
    }

    if (!this.nombre_apellido) {
      errors.nombre_apellido = 'El nombre y apellido es requerido';
    }

    if (!this.fecha_nacimiento) {
      errors.fecha_nacimiento = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(this.fecha_nacimiento);
      const today = new Date();
      if (birthDate > today) {
        errors.fecha_nacimiento = 'La fecha de nacimiento no puede ser futura';
      }
    }

    if (!this.genero) {
      errors.genero = 'El género es requerido';
    }

    if (!this.parentesco) {
      errors.parentesco = 'El parentesco es requerido';
    }

    if (!this.cedula_beneficiario) {
      errors.cedula_beneficiario = 'La cédula del beneficiario es requerida';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Serialización
  toJSON() {
    return {
      cedula: this.cedula,
      nombre_apellido: this.nombre_apellido,
      fecha_nacimiento: this.fecha_nacimiento,
      genero: this.genero,
      parentesco: this.parentesco,
      cedula_beneficiario: this.cedula_beneficiario,
      nombre_beneficiario: this.nombre_beneficiario,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  // Crear desde datos planos
  static fromJSON(data) {
    return new Dependiente(data);
  }

  // Métodos estáticos para constantes
  static getGeneros() {
    return ['Masculino', 'Femenino'];
  }

  static getParentescos() {
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
  }
}

export default Dependiente;