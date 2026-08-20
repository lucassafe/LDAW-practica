import { Publicacion } from './Publicacion.js';

const pub1 = new Publicacion("Vendo apuntes de Álgebra", "Completos y anillados", "Jorge");
const pub2 = new Publicacion("Busco compañero de grupo", "Para el TP de Laboratorio", "Ana");
const pub3 = new Publicacion("Doy clases particulares de JS", "Precio accesible", "Carlos");
const pub4 = new Publicacion("Perdí mi termo en el buffet", "Es un Stanley verde", "Sofía");


pub3.activa = false;


const publicaciones = [pub1, pub2, pub3, pub4];


const pub5 = new Publicacion("Compro monitor usado", "De 24 pulgadas o más", "Pedro");
pub5.activa = false;
publicaciones.push(pub5);

console.log("TODAS LAS PUBLICACIONES ");
publicaciones.forEach(pub => {
    console.log(pub.mostrarResumen());
    console.log("¿Está activa?:", pub.estaActiva());
    console.log("----");
});

const publicacionesActivas = publicaciones.filter(pub => pub.estaActiva());
console.log(\nCantidad total de publicaciones activas: ${publicacionesActivas.length});


console.log("\nTÍTULOS DE PUBLICACIONES ACTIVAS ");
publicacionesActivas.forEach(pub => {
    console.log(` ${pub.titulo}`);
});


const publicacionesJSON = JSON.stringify(publicaciones, null, 2);
console.log("JSON: ", publicacionesJSON);