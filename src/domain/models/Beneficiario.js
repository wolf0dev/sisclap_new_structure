class Beneficiario {
  constructor(data = {}) {
    this.cedula = data.cedula || '';
    this.nombre_apellido = data.nombre_apellido || '';
    this.fecha_nacimiento = data.fecha_nacimiento || null;
    this.genero = data.genero || '';
    this.estado_civil = data.estado_civil || '';
    this.grado_instruccion = data.grado_instruccion || '';
    this.profesion = data.profesion || '';
    this.telefono = data.telefono || '';
    this.numero_casa = data.numero_casa || '';
    this.id_calle = data.id_calle || null;
    this.nom_calle = data.nom_calle || '';
    this.estatus = data.estatus || 'Activo';
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  // Getters
  get fullName() {
    return this.nombre_apellido;
  }

  get isActive() {
    return this.estatus === 'Activo' || this.estatus === 'ACTIVO';
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

  get formattedPhone() {
    if (!this.telefono) return '';
    const cleaned = this.telefono.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    return cleaned;
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

    if (!this.telefono) {
      errors.telefono = 'El teléfono es requerido';
    } else if (!/^[\d\-\+\(\)\s]+$/.test(this.telefono)) {
      errors.telefono = 'El teléfono no es válido';
    }

    if (!this.numero_casa) {
      errors.numero_casa = 'El número de casa es requerido';
    }

    if (!this.id_calle) {
      errors.id_calle = 'La calle es requerida';
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
      estado_civil: this.estado_civil,
      grado_instruccion: this.grado_instruccion,
      profesion: this.profesion,
      telefono: this.telefono,
      numero_casa: this.numero_casa,
      id_calle: this.id_calle,
      nom_calle: this.nom_calle,
      estatus: this.estatus,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  // Crear desde datos planos
  static fromJSON(data) {
    return new Beneficiario(data);
  }

  // Métodos estáticos para constantes
  static getGeneros() {
    return ['Masculino', 'Femenino'];
  }

  static getEstadosCiviles() {
    return ['Soltero', 'Casado', 'Divorciado', 'Viudo', 'Unión Libre'];
  }

  static getGradosInstruccion() {
    return ['Sin Instrucción', 'Primaria', 'Secundaria', 'Técnico', 'Universitario', 'Postgrado'];
  }
}

export default Beneficiario;