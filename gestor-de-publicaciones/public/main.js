import { Usuario } from "./Usuario.js";
import { Publicacion } from "./Publicacion.js";
import { PublicacionVenta } from "./PublicacionVenta.js";
import { PublicacionServicio } from "./PublicacionServicio.js";
import { RepositorioPublicaciones } from "./RepositorioPublicaciones.js";

// users
function validarPublicacion(publicacion, reglas) {
  if (publicacion.titulo.length < reglas.minCaracteresTitulo) {
    return false;
  }
  if (
    !reglas.permitirGratuitos &&
    publicacion instanceof PublicacionVenta &&
    publicacion.precio <= 0
  ) {
    return false;
  }
  return true;
}

const reglasDeValidacion = {
  minCaracteresTitulo: 5,
  permitirGratuitos: false,
};

const jorge = new Usuario("Jorge", "jorge@mail.com");
const ana = new Usuario("Ana", "ana@mail.com");
const carlos = new Usuario("Carlos", "carlos@mail.com");

// publis
const pub1 = new PublicacionVenta(
  "Vendo apuntes de Álgebra",
  "Completos y anillados",
  jorge,
  1500, // le mandamos el precio por aca
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
  carlos,
  "Virtual",
  "1 mes",
);
const pub5 = new Publicacion(
  "Compro monitor usado",
  "De 24 pulgadas o más",
  ana,
);
const pub6 = new PublicacionVenta(
  "Vendo teclado mecánico",
  "Switches red",
  jorge,
  3000,
);
const pub7 = new PublicacionServicio(
  "Reparación de PC",
  "Formateo y limpieza",
  carlos,
  "Presencial",
  "1 día",
);
const pub8 = new PublicacionVenta(
  "Vendo guitarra acústica",
  "Casi sin uso, con funda",
  ana,
  50000,
);
const pub9 = new PublicacionServicio(
  "Diseño web",
  "Páginas institucionales",
  ana,
  "Remoto",
  "2 semanas",
);

pub4.activa = false;
pub5.activa = false;

const publicaciones = [pub1, pub2, pub3, pub4, pub5, pub6, pub7, pub8, pub9];

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
if (primera) {
  console.log(primera.mostrarResumen());
} else {
  console.log("No encontrada");
}

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

repo.on("publicacionAgregada", (pub) => {
  console.log(`\nNueva publicación agregada: "${pub.titulo}"`);
});

repo.on("publicacionAgregada", (pub) => {
  console.log(`El usuario ${pub.autor.nombre} creó una publicación.`);
});

repo.agregar(pub1);
repo.agregar(pub2);
repo.agregar(pub3);
repo.agregar(pub4);
repo.agregar(pub5);
repo.agregar(pub6);
repo.agregar(pub7);
repo.agregar(pub8);
repo.agregar(pub9);

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

console.log("\n--- TEST: listarResumenes() ---");
const resumenes = repo.listarResumenes();
resumenes.forEach((r) => console.log(r));

console.log("\n--- TEST: filtrarPorTipo(PublicacionVenta) ---");
repo
  .filtrarPorTipo(PublicacionVenta)
  .forEach((pub) => console.log(" -", pub.mostrarResumen()));

console.log("\n--- TEST: Parte 3 (Asincronismo) ---");

function publicarConDemora(publicacion) {
  return new Promise((resolve) => {
    setTimeout(() => {
      repo.agregar(publicacion);
      resolve();
    }, 2000);
  });
}

const pub10 = new Publicacion(
  "Busco grupo para el TP",
  "Soy de la comisión 3",
  jorge,
);

async function ejecutarPublicacion() {
  console.log("Iniciando carga de publicación unos segundos...");
  await publicarConDemora(pub10);
  console.log(
    "Termina la espera. La publicación 10 se agregó exitosamente con async/await",
  );
}

ejecutarPublicacion();

console.log(
  ">>>>>> Este mensaje está justo después de invocar ejecutarPublicacion() y tampoco espera porque la función es asincrona",
);

// --- p2 31/08/2026 ---
const titulo = document.getElementById("titulo");
const tipo = document.getElementById("tipo");

function observarEvento(evento) {
  console.table({
    type: evento.type,
    target: evento.target.id,
    currentTarget: evento.currentTarget.id,
    timeStamp: Math.round(evento.timeStamp),
  });
}

titulo.addEventListener("input", observarEvento);
tipo.addEventListener("change", observarEvento);

// --- p3 31/08/2026 Vista previa incremental ---
const autor = document.getElementById("autor");
const vistaPrevia = document.getElementById("vista-previa");

function actualizarVistaPrevia() {
  const nombre = autor.value || "Autor";
  const texto = titulo.value || "Sin título";
  vistaPrevia.textContent = `${texto} — ${nombre} (${tipo.value})`;
}
titulo.addEventListener("input", actualizarVistaPrevia);
autor.addEventListener("input", actualizarVistaPrevia);
tipo.addEventListener("change", actualizarVistaPrevia);

// --- Parte 4: Change adapta el formulario ---
const camposEspecificos = document.getElementById("campos-especificos");

function actualizarCamposEspecificos() {
  if (tipo.value === "venta") {
    camposEspecificos.innerHTML = `
    <input id="precio" type="number" placeholder="Precio">
    <input id="stock" type="number" value="1">`;
  } else {
    camposEspecificos.innerHTML = `
    <select id="modalidad">
      <option>presencial</option><option>virtual</option>
    </select>
    <input id="duracion" type="number" placeholder="Minutos">`;
  }
}
tipo.addEventListener("change", actualizarCamposEspecificos);
actualizarCamposEspecificos();

// --- Parte 5: Focus y blur ofrecen ayuda ---
const email = document.getElementById("email");
const ayudaEmail = document.getElementById("ayuda-email");

function mostrarAyudaEmail() {
  ayudaEmail.textContent = "Usá un email válido del autor";
}

function ocultarAyudaEmail() {
  ayudaEmail.textContent = "";
}

email.addEventListener("focus", mostrarAyudaEmail);
email.addEventListener("blur", ocultarAyudaEmail);

// --- Parte 6: Submit crea objetos del dominio ---
const formulario = document.getElementById("form-publicacion");
const descripcion = document.getElementById("descripcion");
const listaPublicaciones = document.getElementById("lista-publicaciones");

function agregarTarjeta(publicacion) {
  const article = document.createElement("article");
  article.style.border = "1px solid #ccc";
  article.style.margin = "10px 0";
  article.style.padding = "10px";

  const texto = document.createElement("span");
  texto.textContent = publicacion.mostrarResumen() + " ";

  const estado = document.createElement("strong");
  if (publicacion.estaActiva()) {
    estado.textContent = "Activa";
  } else {
    estado.textContent = "Inactiva";
  }
  estado.style.marginLeft = "10px";

  const boton = document.createElement("button");
  boton.textContent = "Dar de baja";
  boton.style.marginLeft = "10px";

  function manejarBaja(evento) {
    console.log(evento.type, evento.target);
    publicacion.darDeBaja();
    estado.textContent = "Inactiva";
    boton.disabled = true;
  }

  if (!publicacion.estaActiva()) {
    boton.disabled = true;
  }

  boton.addEventListener("click", manejarBaja);

  article.appendChild(texto);
  article.appendChild(estado);
  article.appendChild(boton);
  listaPublicaciones.appendChild(article);
}

function crearPublicacionDesdeFormulario() {
  const usuario = new Usuario(autor.value, email.value);
  if (tipo.value === "venta") {
    return new PublicacionVenta(
      titulo.value, descripcion.value, usuario,
      Number(document.querySelector("#precio").value)
    );
  }
  return new PublicacionServicio(
    titulo.value, descripcion.value, usuario,
    document.querySelector("#modalidad").value,
    Number(document.querySelector("#duracion").value)
  );
}

function manejarEnvio(evento) {
  evento.preventDefault();
  const publicacion = crearPublicacionDesdeFormulario();
  publicaciones.push(publicacion);
  agregarTarjeta(publicacion);
  formulario.reset();
  actualizarCamposEspecificos();
  actualizarVistaPrevia();
}

formulario.addEventListener("submit", manejarEnvio);

