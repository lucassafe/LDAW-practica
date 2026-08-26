import { Publicacion } from "./Publicacion.js";

export class PublicacionServicio extends Publicacion {
  constructor(titulo, descripcion, autor, modalidad, duracion) {
    super(titulo, descripcion, autor);
    this.modalidad = modalidad;
    this.duracion = duracion;
  }

  mostrarResumen() {
    return (
      super.mostrarResumen() +
      ` - Modalidad: ${this.modalidad} - Duración: ${this.duracion}`
    );
  }
}
