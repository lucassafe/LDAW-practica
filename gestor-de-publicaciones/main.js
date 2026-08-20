import { Usuario } from "./Usuario.js";
import { Publicacion } from "./Publicacion.js";

//users

const jorge = new Usuario("Jorge", "jorge@mail.com");
const ana = new Usuario("Ana", "ana@mail.com");
const carlos = new Usuario("Carlos", "carlos@mail.com");

//publis
const pub1 = new Publicacion(
  "Vendo apuntes de Álgebra",
  "Completos y anillados",
  jorge,
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
const pub4 = new Publicacion(
  "Doy clases particulares de JS",
  "Precio accesible",
  carlos,
);
const pub5 = new Publicacion(
  "Compro monitor usado",
  "De 24 pulgadas o más",
  ana,
);

pub4.activa = false;
pub5.activa = false;

const publicaciones = [pub1, pub2, pub3, pub4, pub5];

console.log("=== TODAS LAS PUBLICACIONES (forEach) ===");
publicaciones.forEach((pub) => {
  console.log(pub.mostrarResumen());
  console.log("Está activa?:", pub.estaActiva());
  console.log("----");
});

const activas = publicaciones.filter((pub) => pub.estaActiva());
console.log(`\n=== PUBLICACIONES ACTIVAS (filter): ${activas.length} ===`);
activas.forEach((pub) => console.log(" -", pub.titulo));

const nombreBuscado = "Jorge";
const primera = publicaciones.find((pub) => pub.autor.nombre === nombreBuscado);
console.log(`\n=== PRIMERA PUBLICACIÓN DE ${nombreBuscado} (find) ===`);
console.log(primera ? primera.mostrarResumen() : "No encontrada");

console.log("\n=== VERIFICACIÓN DE REFERENCIA ===");
console.log("Email de Jorge ANTES del cambio:");
console.log("  pub1.autor.email:", pub1.autor.email);
console.log("  pub2.autor.email:", pub2.autor.email);

jorge.email = "jorge_nuevo@mail.com";

console.log(
  "\nEmail de Jorge DESPUÉS del cambio (jorge.email = 'jorge_nuevo@mail.com'):",
);
console.log("  pub1.autor.email:", pub1.autor.email);
console.log("  pub2.autor.email:", pub2.autor.email);
console.log(
  "\nAmbas publicaciones ven el cambio? Si porque comparten el MISMO objeto Usuario.",
);
