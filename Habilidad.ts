import { escribir } from "./salida.js";

// ============================================
// HABILIDAD
// ============================================
export class Habilidad {
  private readonly nombre: string;
  private readonly poder: number;

  constructor(nombre: string, poder: number) {
    this.nombre = nombre;
    this.poder = poder;
  }

  usar(): void {
    escribir(`✨ Se utiliza ${this.nombre}: ${this.poder} puntos de poder`);
  }

  getNombre(): string {
    return this.nombre;
  }
}
