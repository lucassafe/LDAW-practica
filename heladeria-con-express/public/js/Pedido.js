export class Pedido {
  static precios = { chico: 3500, mediano: 5200, grande: 6900 };

  constructor(cliente, telefono, sabor, tamano, cantidad) {
    this.cliente = cliente;
    this.telefono = telefono;
    this.sabor = sabor;
    this.tamano = tamano;
    this.cantidad = cantidad;
    this.estado = "pendiente";
  }

  calcularTotal() {
    return Pedido.precios[this.tamano] * this.cantidad;
  }

  mostrarResumen() {
    return `${this.cantidad} × ${this.sabor} (${this.tamano}) — $${this.calcularTotal()}`;
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }
}
