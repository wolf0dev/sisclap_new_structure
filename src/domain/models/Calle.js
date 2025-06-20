class Calle {
  constructor(data = {}) {
    this.id_calle = data.id_calle || null;
    this.nom_calle = data.nom_calle || '';
    this.descripcion = data.descripcion || '';
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
  }

  // Getters
  get name() {
    return this.nom_calle;
  }

  get id() {
    return this.id_calle;
  }

  // Validación
  validate() {
    const errors = {};

    if (!this.nom_calle) {
      errors.nom_calle = 'El nombre de la calle es requerido';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  // Serialización
  toJSON() {
    return {
      id_calle: this.id_calle,
      nom_calle: this.nom_calle,
      descripcion: this.descripcion,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }

  // Crear desde datos planos
  static fromJSON(data) {
    return new Calle(data);
  }
}

export default Calle;