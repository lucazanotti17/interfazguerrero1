import { Arma } from "./Arma.js";
import { Personaje } from "./Personaje.js";
import { GLIFOS, figura } from "./glifos.js";

function buscar<T extends Element>(raiz: ParentNode, selector: string): T {
  const elemento = raiz.querySelector<T>(selector);
  if (!elemento) {
    throw new Error(`No se encontró el elemento "${selector}"`);
  }
  return elemento;
}

export interface OpcionesVista {
  color: string;
  conCasco: boolean;
}

// ============================================
// VISTA DE UN PERSONAJE
// ============================================
export class VistaPersonaje {
  private readonly escena: HTMLElement;
  private readonly fichas: HTMLButtonElement[] = [];
  private readonly textoVida: HTMLElement;
  private readonly barra: HTMLElement;
  private readonly textoArma: HTMLElement;
  private readonly contenedorArma: SVGGElement;

  constructor(
    private readonly personaje: Personaje,
    private readonly armas: Arma[],
    contenedor: HTMLElement,
    opciones: OpcionesVista,
    private readonly alCambiar: () => void,
  ) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.style.setProperty("--traje", opciones.color);
    tarjeta.innerHTML = `
      <div class="cab">
        <h2>${personaje.getNombre()}</h2>
        <span class="hab">Habilidad: ${personaje.getHabilidad().getNombre()}</span>
      </div>
      <div class="escena">${figura(opciones.conCasco)}</div>
      <div class="vida">
        <div class="vida-fila"><span>Vida</span><strong data-vida></strong></div>
        <div class="barra"><i data-barra></i></div>
      </div>
      <div class="equipo">
        <span class="etiqueta">Arma equipada: <b data-arma-nombre></b></span>
        <div class="fichas" data-fichas></div>
      </div>
      <div class="acciones">
        <button type="button" data-atacar>Atacar</button>
        <button type="button" data-habilidad>Usar habilidad</button>
        <button type="button" class="peligro" data-danio>Recibir 20 de daño</button>
        <button type="button" data-curar>Restaurar vida</button>
      </div>`;
    contenedor.appendChild(tarjeta);

    this.escena = buscar<HTMLElement>(tarjeta, ".escena");
    this.textoVida = buscar<HTMLElement>(tarjeta, "[data-vida]");
    this.barra = buscar<HTMLElement>(tarjeta, "[data-barra]");
    this.textoArma = buscar<HTMLElement>(tarjeta, "[data-arma-nombre]");
    this.contenedorArma = buscar<SVGGElement>(tarjeta, "[data-arma]");

    const zonaFichas = buscar<HTMLElement>(tarjeta, "[data-fichas]");
    for (const arma of this.armas) {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "ficha";
      boton.textContent = arma.getNombre();
      boton.addEventListener("click", () => {
        this.personaje.cambiarArma(arma);
        this.alCambiar();
      });
      zonaFichas.appendChild(boton);
      this.fichas.push(boton);
    }

    buscar<HTMLButtonElement>(tarjeta, "[data-atacar]").addEventListener("click", () => {
      this.personaje.atacar();
      this.animar("golpe");
    });
    buscar<HTMLButtonElement>(tarjeta, "[data-habilidad]").addEventListener("click", () => {
      this.personaje.usarHabilidad();
    });
    buscar<HTMLButtonElement>(tarjeta, "[data-danio]").addEventListener("click", () => {
      this.personaje.recibirDanio(20);
      this.animar("herido");
      this.alCambiar();
    });
    buscar<HTMLButtonElement>(tarjeta, "[data-curar]").addEventListener("click", () => {
      this.personaje.restaurarVida();
      this.alCambiar();
    });
  }

  getPersonaje(): Personaje {
    return this.personaje;
  }

  refrescar(): void {
    const vida = this.personaje.getVida();
    const maxima = this.personaje.getVidaMaxima();
    const arma = this.personaje.getArma();

    this.textoVida.textContent = `${vida} / ${maxima}`;
    this.barra.style.width = `${(vida / maxima) * 100}%`;
    this.barra.classList.toggle("baja", vida / maxima <= 0.3);
    this.escena.classList.toggle("caido", vida === 0);

    this.textoArma.textContent = `${arma.getNombre()} (${arma.getDanio()})`;
    this.contenedorArma.innerHTML = GLIFOS[arma.getTipo()];
    this.fichas.forEach((boton, i) => {
      boton.setAttribute("aria-pressed", String(this.armas[i] === arma));
    });
  }

  private animar(clase: "golpe" | "herido"): void {
    this.escena.classList.remove(clase);
    void this.escena.offsetWidth; // reinicia la animación
    this.escena.classList.add(clase);
  }
}

// ============================================
// VISTA DE LA ARMERÍA
// ============================================
export class VistaArmeria {
  constructor(
    private readonly contenedor: HTMLElement,
    private readonly armas: Arma[],
    private readonly vistas: VistaPersonaje[],
  ) {}

  refrescar(): void {
    const maximo = Math.max(...this.armas.map((a) => a.getDanio()));
    this.contenedor.innerHTML = "";

    for (const arma of this.armas) {
      const duenos = this.vistas
        .filter((v) => v.getPersonaje().getArma() === arma)
        .map((v) => v.getPersonaje().getNombre());

      const tarjeta = document.createElement("div");
      tarjeta.className = "arma";
      tarjeta.innerHTML = `
        <b>${arma.getNombre()}</b>
        <div class="poder" role="img" aria-label="Daño ${arma.getDanio()} de ${maximo}">
          <i style="width:${(arma.getDanio() / maximo) * 100}%"></i>
        </div>
        <small>Daño ${arma.getDanio()} · ${duenos.length ? "En uso: " + duenos.join(" y ") : "Disponible"}</small>`;
      this.contenedor.appendChild(tarjeta);
    }
  }
}
