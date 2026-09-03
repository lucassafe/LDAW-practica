import { Usuario } from "./Usuario.js";

export class Publicacion {
  constructor(titulo, descripcion, autor) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.autor = autor; // autor es un objet
    this.fechaPublicacion = new Date();
    this.activa = true;
    this.destacada = false;
  }

  mostrarResumen() {
    return `"${this.titulo}" - Autor: "${this.autor.mostrarPerfil()}"`;
  }

  estaActiva() {
    return this.activa;
  }

  darDeBaja() {
    this.activa = false;
  }
  
  destacar() {
    this.destacada = true;
  }

  esDeAutor(nombre) {
    return this.autor.nombre === nombre;
  }
}

const usuarioTeste = new Usuario("Nico", "nico@email.com");
const Teste = new Publicacion(
  "Busco compañero de grupo",
  "Para el TP final",
  usuarioTeste,
);

console.log("TEST DE PUBLICACIÓN ");
console.log("Resumen:", Teste.mostrarResumen());
console.log("Está activa?:", Teste.estaActiva());
console.log("Es de Nico?:", Teste.esDeAutor("Nico"));
console.log("Es de Pedro?:", Teste.esDeAutor("Pedro"));
