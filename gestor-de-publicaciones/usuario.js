export class Usuario {
  constructor(nombre, email) {
    this.nombre = nombre;
    this.email = email;
    this.fechaRegistro = new Date();
    this.contactos = []; // auto-asociación con otros objetos Usuario
  }

  agregarContacto(otroUsuario) {
    this.contactos.push(otroUsuario);
  }

  mostrarPerfil() {
    return `${this.nombre} (${this.email})`;
  }
}
