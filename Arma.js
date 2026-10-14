// ============================================
// ARMA
// ============================================
export class Arma {
  #nombre;
  #danio;
  #icono;

  constructor(nombre, danio, icono = "⚔️") {
    this.#nombre = nombre;
    this.#danio = danio;
    this.#icono = icono;
  }

  atacar() {
    return `${this.#icono} Ataque con ${this.#nombre}: ${this.#danio} puntos de daño`;
  }

  getNombre() {
    return this.#nombre;
  }

  getDanio() {
    return this.#danio;
  }

  getIcono() {
    return this.#icono;
  }
}
