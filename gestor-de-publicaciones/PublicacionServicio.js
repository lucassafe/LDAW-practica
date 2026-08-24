import { Publicacion } from './publicacion.js';

export class PublicacionServicio extends Publicacion {
  constructor(titulo, descripcion, autor) {
    super(titulo, descripcion, autor);
    // Aquí se podrían agregar atributos específicos para servicios,
    // por ejemplo: this.modalidad = "Virtual", this.precioPorHora = 0, etc.
  }
}
