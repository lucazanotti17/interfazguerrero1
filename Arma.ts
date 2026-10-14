import { escribir } from "./salida.js";

export type TipoArma = "espada" | "arco" | "hacha" | "martillo";

// ============================================
// ARMA
// ============================================
export class Arma {
  private readonly nombre: string;
  private readonly danio: number;
  private readonly tipo: TipoArma;

  constructor(nombre: string, danio: number, tipo: TipoArma) {
    this.nombre = nombre;
    this.danio = danio;
    this.tipo = tipo;
  }

  atacar(): void {
    escribir(`⚔️ Ataque con ${this.nombre}: ${this.danio} puntos de daño`);
  }

  getDanio(): number {
    return this.danio;
  }

  getNombre(): string {
    return this.nombre;
  }

  getTipo(): TipoArma {
    return this.tipo;
  }
}
