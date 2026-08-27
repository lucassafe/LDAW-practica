import { EventEmitter } from "node:events";

export class RepositorioPublicaciones extends EventEmitter {
  constructor() {
    super();
    this.publicaciones = []; // array interno
  }

  agregar(publicacion) {
    this.publicaciones.push(publicacion);
    this.emit("publicacionAgregada", publicacion);
  }

  buscarPorUsuario(nombre) {
    return this.publicaciones.filter((pub) => pub.autor.nombre === nombre);
  }

  filtrarActivas() {
    return this.publicaciones.filter((pub) => pub.activa === true);
  }

  cantidadTotal() {
    return this.publicaciones.length;
  }

  listarPorTipo(claseConstructor) {
    return this.publicaciones.filter((pub) => pub instanceof claseConstructor);
  }

  listarResumenes() {
    return this.publicaciones.map((pub) => pub.mostrarResumen());
  }

  filtrarPorTipo(claseConstructor) {
    return this.publicaciones.filter((pub) => pub instanceof claseConstructor);
  }
}
