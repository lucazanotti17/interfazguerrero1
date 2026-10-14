// ============================================
// HABILIDAD
// ============================================
export class Habilidad {
  #nombre;
  #poder;

  constructor(nombre, poder) {
    this.#nombre = nombre;
    this.#poder = poder;
  }

  usar() {
    return `✨ Se utiliza ${this.#nombre}: ${this.#poder} puntos de poder`;
  }

  getNombre() {
    return this.#nombre;
  }

  getPoder() {
    return this.#poder;
  }
}
