import { Arma } from "./Arma.js";
import { Habilidad } from "./Habilidad.js";
import { escribir } from "./salida.js";

// ============================================
// PERSONAJE
// ============================================
export class Personaje {
  private readonly nombre: string;
  private vida: number;
  private readonly vidaMaxima: number;
  private arma: Arma;                    // Agregación: el Arma vive fuera del Personaje
  private readonly habilidad: Habilidad; // Agregación

  constructor(nombre: string, vida: number, arma: Arma, habilidad: Habilidad) {
    this.nombre = nombre;
    this.vida = vida;
    this.vidaMaxima = vida;
    this.arma = arma;
    this.habilidad = habilidad;
  }

  atacar(): void {
    escribir(`${this.nombre} ataca:`, "sep");
    this.arma.atacar();
  }

  usarHabilidad(): void {
    escribir(`${this.nombre} utiliza una habilidad:`, "sep");
    this.habilidad.usar();
  }

  cambiarArma(nuevaArma: Arma): void {
    this.arma = nuevaArma;
    escribir(`${this.nombre} ahora utiliza ${nuevaArma.getNombre()}`, "cambio");
  }

  recibirDanio(danio: number): void {
    this.vida = Math.max(0, this.vida - danio);
    escribir(`${this.nombre} recibió ${danio} puntos de daño.`, "dano");
    escribir(`Vida restante: ${this.vida}`, "dano");
  }

  restaurarVida(): void {
    this.vida = this.vidaMaxima;
  }

  getNombre(): string {
    return this.nombre;
  }

  getVida(): number {
    return this.vida;
  }

  getVidaMaxima(): number {
    return this.vidaMaxima;
  }

  getArma(): Arma {
    return this.arma;
  }

  getHabilidad(): Habilidad {
    return this.habilidad;
  }
}
