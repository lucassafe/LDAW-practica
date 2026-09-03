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
  if (publicacion.id === undefined) {
    publicacion.id = publicaciones.indexOf(publicacion);
  }

  const article = document.createElement("article");
  article.style.border = "1px solid #ccc";
  article.style.margin = "10px 0";
  article.style.padding = "10px";
  if (publicacion.destacada) {
    article.style.backgroundColor = "#fff3cd";
  }
  article.dataset.id = publicacion.id;

  const texto = document.createElement("span");
  texto.textContent = publicacion.mostrarResumen() + " ";

  const estado = document.createElement("strong");
  if (publicacion.estaActiva()) {
    estado.textContent = "Activa";
  } else {
    estado.textContent = "Inactiva";
  }
  estado.style.marginLeft = "10px";

  const botonDestacar = document.createElement("button");
  botonDestacar.textContent = "Destacar";
  botonDestacar.dataset.accion = "destacar";
  botonDestacar.style.marginLeft = "10px";

  const boton = document.createElement("button");
  boton.textContent = "Dar de baja";
  boton.dataset.accion = "baja";
  boton.style.marginLeft = "10px";

  if (!publicacion.estaActiva()) {
    boton.disabled = true;
  }

  article.appendChild(texto);
  article.appendChild(estado);
  article.appendChild(botonDestacar);
  article.appendChild(boton);
  listaPublicaciones.appendChild(article);
}

function renderizarPublicaciones() {
  listaPublicaciones.innerHTML = "";
  publicaciones.forEach((pub) => agregarTarjeta(pub));
}

function crearPublicacionDesdeFormulario() {
  const usuario = new Usuario(autor.value, email.value);
  if (tipo.value === "venta") {
    return new PublicacionVenta(
      titulo.value,
      descripcion.value,
      usuario,
      Number(document.querySelector("#precio").value),
    );
  }
  return new PublicacionServicio(
    titulo.value,
    descripcion.value,
    usuario,
    document.querySelector("#modalidad").value,
    Number(document.querySelector("#duracion").value),
  );
}

function manejarEnvio(evento) {
  evento.preventDefault();
  const publicacion = crearPublicacionDesdeFormulario();
  publicaciones.push(publicacion);
  renderizarPublicaciones();
  formulario.reset();
  actualizarCamposEspecificos();
  actualizarVistaPrevia();
}

formulario.addEventListener("submit", manejarEnvio);

// --- p1 2/9/2026 ---
function observarClick(evento) {
  console.log("target", evento.target);
  console.log("currentTarget", evento.currentTarget);
}
listaPublicaciones.addEventListener("click", observarClick);

listaPublicaciones.removeEventListener("click", observarClick); //sacar despues de probar

// --- p3 y p4: conectar con el dominio ---
function manejarAccion(evento) {
  const boton = evento.target.closest("button[data-accion]");
  if (!boton || !listaPublicaciones.contains(boton)) return;

  const tarjeta = boton.closest("[data-id]");
  const id = Number(tarjeta.dataset.id);
  const accion = boton.dataset.accion;

  const publicacion = publicaciones.find((p) => p.id === id);
  if (!publicacion) return;

  if (accion === "baja") publicacion.darDeBaja();
  if (accion === "destacar") publicacion.destacar();

  renderizarPublicaciones();
}
listaPublicaciones.addEventListener("click", manejarAccion);
