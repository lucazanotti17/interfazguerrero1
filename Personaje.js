// ============================================
// PERSONAJE
// ============================================
// AGREGACIÓN: el Personaje conoce a un Arma y a una Habilidad,
// pero NO las crea ni las destruye. Existen fuera de él y pueden
// ser compartidas entre varios personajes o reemplazadas en cualquier momento.
export class Personaje {
  #nombre;
  #vida;
  #vidaMax;
  #arma;       // referencia (no propietario)
  #habilidad;  // referencia (no propietario)

  constructor(nombre, vida, arma, habilidad) {
    this.#nombre = nombre;
    this.#vida = vida;
    this.#vidaMax = vida;
    this.#arma = arma;
    this.#habilidad = habilidad;
  }

  atacar() {
    return `${this.#nombre} ataca → ${this.#arma.atacar()}`;
  }

  usarHabilidad() {
    return `${this.#nombre} utiliza una habilidad → ${this.#habilidad.usar()}`;
  }

  cambiarArma(nuevaArma) {
    this.#arma = nuevaArma;
    return `🔄 ${this.#nombre} ahora utiliza ${nuevaArma.getNombre()}`;
  }

  recibirDanio(danio) {
    this.#vida = Math.max(0, this.#vida - danio);
    return `💥 ${this.#nombre} recibió ${danio} puntos de daño. Vida restante: ${this.#vida}`;
  }

  estaVivo() {
    return this.#vida > 0;
  }

  getNombre() { return this.#nombre; }
  getVida() { return this.#vida; }
  getVidaMax() { return this.#vidaMax; }
  getArma() { return this.#arma; }
  getHabilidad() { return this.#habilidad; }
}
