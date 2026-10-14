import { Arma } from "./Arma.js";
import { Habilidad } from "./Habilidad.js";
import { Personaje } from "./Personaje.js";
import { conectarSalida } from "./salida.js";
import { VistaArmeria, VistaPersonaje } from "./vista.js";

function obtener<T extends HTMLElement>(id: string): T {
  const elemento = document.getElementById(id);
  if (!elemento) {
    throw new Error(`Falta el elemento #${id} en index.html`);
  }
  return elemento as T;
}

// ============================================
// MAIN
// ============================================
function main(): void {
  // La salida de las clases va a la consola de la página
  const consola = obtener<HTMLUListElement>("consola");
  conectarSalida((texto, tipo) => {
    const linea = document.createElement("li");
    linea.textContent = texto;
    if (tipo) linea.className = tipo;
    consola.appendChild(linea);
    consola.scrollTop = consola.scrollHeight;
  });
  obtener<HTMLButtonElement>("limpiar").addEventListener("click", () => {
    consola.innerHTML = "";
  });

  // Creamos armas
  const espada = new Arma("Espada de fuego", 30, "espada");
  const arco = new Arma("Arco mágico", 20, "arco");
  const hacha = new Arma("Hacha de guerra", 35, "hacha");
  const martillo = new Arma("Martillo de trueno", 40, "martillo");
  const armas = [espada, arco, hacha, martillo];

  // Creamos habilidades
  const curacion = new Habilidad("Curación", 25);
  const escudo = new Habilidad("Escudo mágico", 15);

  // Agregación: los personajes usan los objetos anteriores
  const guerrero = new Personaje("Guerrero", 100, espada, curacion);
  const arquero = new Personaje("Arquero", 80, arco, escudo);

  // Vistas
  const zonaPersonajes = obtener<HTMLElement>("personajes");
  const vistas: VistaPersonaje[] = [];
  const armeria = new VistaArmeria(obtener<HTMLElement>("armeria"), armas, vistas);
  const actualizar = (): void => {
    vistas.forEach((v) => v.refrescar());
    armeria.refrescar();
  };

  vistas.push(
    new VistaPersonaje(guerrero, armas, zonaPersonajes, { color: "var(--ember)", conCasco: true }, actualizar),
    new VistaPersonaje(arquero, armas, zonaPersonajes, { color: "var(--good)", conCasco: false }, actualizar),
  );

  // Jugamos (misma secuencia que el main() de C++)
  guerrero.atacar();
  guerrero.usarHabilidad();
  guerrero.recibirDanio(20);
  guerrero.cambiarArma(arco);
  guerrero.atacar();
  arquero.atacar();
  arquero.usarHabilidad();

  actualizar();
}

main();
