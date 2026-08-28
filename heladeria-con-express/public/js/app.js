import { Pedido } from "./Pedido.js";

const formulario = document.querySelector("#form-pedido");
const lista = document.querySelector("#lista-pedidos");
const pedidos = [];

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const datos = new FormData(formulario);

  const pedido = new Pedido(
    datos.get("cliente"),
    datos.get("telefono"),
    datos.get("sabor"),
    datos.get("tamano"),
    Number(datos.get("cantidad")),
  );

  pedidos.push(pedido);

  formulario.dispatchEvent(new CustomEvent("pedidoCreado", { detail: pedido }));
});

formulario.addEventListener("pedidoCreado", ({ detail: pedido }) => {
  const id = pedidos.indexOf(pedido);

  lista.insertAdjacentHTML(
    "beforeend",
    `
    <article class="pedido" data-id="${id}">
      <h3>${pedido.cliente}</h3>
      <p>${pedido.mostrarResumen()}</p>
      <p class="estado">Estado: ${pedido.estado}</p>
      <button class="btn-preparado">Marcar preparado</button>
    </article>`,
  );
});

lista.addEventListener("click", (evento) => {
  if (!evento.target.classList.contains("btn-preparado")) return;

  const tarjeta = evento.target.closest(".pedido");
  const id = Number(tarjeta.dataset.id);
  const pedido = pedidos[id];

  pedido.cambiarEstado("preparado");

  tarjeta.querySelector(".estado").textContent = `Estado: ${pedido.estado}`;
});
