import { Usuario } from "./Usuario.js";
import { Publicacion } from "./Publicacion.js";
import { PublicacionVenta } from "./PublicacionVenta.js";
import { PublicacionServicio } from "./PublicacionServicio.js";
import { RepositorioPublicaciones } from "./RepositorioPublicaciones.js";

// users
const jorge = new Usuario("Jorge", "jorge@mail.com");
const ana = new Usuario("Ana", "ana@mail.com");
const carlos = new Usuario("Carlos", "carlos@mail.com");

// publis
const pub1 = new PublicacionVenta(
  "Vendo apuntes de Álgebra",
  "Completos y anillados",
  jorge,
  1500 // le mandamos el precio por aca
);
const pub2 = new Publicacion(
  "Perdí mi termo en el buffet",
  "Es un Stanley verde",
  jorge,
);
const pub3 = new Publicacion(
  "Busco compañero de grupo",
  "Para el TP de Laboratorio",
  ana,
);
const pub4 = new PublicacionServicio(
  "Doy clases particulares de JS",
  "Precio accesible",
  carlos
);
const pub5 = new Publicacion(
  "Compro monitor usado",
  "De 24 pulgadas o más",
  ana,
);

pub4.activa = false;
pub5.activa = false;

const publicaciones = [pub1, pub2, pub3, pub4, pub5];

console.log("\n--- chequeando las instancias ---");
publicaciones.forEach((pub, i) => {
  const esPublicacion = pub instanceof Publicacion;
  // nos tiene que dar true en todos los casos
  console.log(`pub ${i + 1} es una Publicacion:`, esPublicacion);
});

console.log("TODAS LAS PUBLICACIONES");
publicaciones.forEach((pub) => {
  console.log(pub.mostrarResumen());
  console.log("Activa?:", pub.estaActiva());
  console.log("  ----");
});

const activas = publicaciones.filter((pub) => pub.estaActiva());
console.log(`\nPUBLICACIONES ACTIVAS: ${activas.length}`);
activas.forEach((pub) => console.log(" -", pub.titulo));

const nombreBuscado = "Jorge";
const primera = publicaciones.find((pub) => pub.autor.nombre === nombreBuscado);
console.log(`\nPRIMERA PUBLICACIÓN DE ${nombreBuscado}`);
console.log(primera ? primera.mostrarResumen() : "No encontrada");

console.log("\nVERIFICACIÓN DE REFERENCIA");
console.log("Email de Jorge ANTES del cambio:");
console.log("  pub1.autor.email:", pub1.autor.email);
console.log("  pub2.autor.email:", pub2.autor.email);

jorge.email = "jorge_nuevo@mail.com";

console.log("\nEmail de Jorge DESPUÉS del cambio:");
console.log("  pub1.autor.email:", pub1.autor.email);
console.log("  pub2.autor.email:", pub2.autor.email);
console.log("Ambas publicaciones ven el cambio? Sí");

console.log("=============");
console.log("REPOSITORIO DE PUBLICACIONES");

const repo = new RepositorioPublicaciones();

repo.agregar(pub1);
repo.agregar(pub2);
repo.agregar(pub3);
repo.agregar(pub4);
repo.agregar(pub5);

console.log(
  `\nTotal de publicaciones en el repositorio: ${repo.cantidadTotal()}`,
);

console.log("\nPublicaciones de Jorge:");
repo
  .buscarPorUsuario("Jorge")
  .forEach((pub) => console.log(" -", pub.mostrarResumen()));

console.log("\nPublicaciones de Ana:");
repo
  .buscarPorUsuario("Ana")
  .forEach((pub) => console.log(" -", pub.mostrarResumen()));

console.log("\nPublicaciones de Carlos:");
repo
  .buscarPorUsuario("Carlos")
  .forEach((pub) => console.log(" -", pub.mostrarResumen()));

console.log("\nPublicaciones activas en el repositorio:");
repo.filtrarActivas().forEach((pub) => console.log(" -", pub.mostrarResumen()));

console.log("\n--- TEST: Listar por tipo (Ventas) ---");
const ventas = repo.listarPorTipo(PublicacionVenta);
ventas.forEach((venta) => console.log(" - VENTA:", venta.titulo));

console.log("\n--- TEST: Listar por tipo (Servicios) ---");
const servicios = repo.listarPorTipo(PublicacionServicio);
servicios.forEach((servicio) => console.log(" - SERVICIO:", servicio.titulo));
