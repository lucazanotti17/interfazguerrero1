import { Arma } from "./Arma.js";
import { Habilidad } from "./Habilidad.js";
import { Personaje } from "./Personaje.js";
import { crearTarjeta, crearLog } from "./ui.js";

// Armas y habilidades: existen de forma independiente de los personajes
const espada = new Arma("Espada de fuego", 30, "🗡️");
const arco = new Arma("Arco mágico", 20, "🏹");
const hacha = new Arma("Hacha de guerra", 40, "🪓");
const armas = [espada, arco, hacha];

const curacion = new Habilidad("Curación", 25);
const escudo = new Habilidad("Escudo mágico", 15);

// Los personajes agregan (referencian) esos objetos.
// El arco puede ser usado por ambos: nadie es "dueño" de él.
const guerrero = new Personaje("Guerrero", 100, espada, curacion);
const arquero = new Personaje("Arquero", 80, arco, escudo);

const log = crearLog(document.getElementById("log"));
const escenario = document.getElementById("escenario");

escenario.append(
  crearTarjeta(guerrero, armas, log, "🛡️"),
  crearTarjeta(arquero, armas, log, "🧝")
);

log("🎮 ¡Comienza el juego! Probá cambiar las armas de cada personaje.");
