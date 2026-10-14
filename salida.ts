// ============================================
// SALIDA (equivale al cout del programa en C++)
// Las clases del dominio escriben acá sin conocer el DOM.
// ============================================
export type TipoLinea = "" | "sep" | "cambio" | "dano";

type Destino = (texto: string, tipo: TipoLinea) => void;

let destino: Destino = (texto) => console.log(texto);

export function conectarSalida(nuevoDestino: Destino): void {
  destino = nuevoDestino;
}

export function escribir(texto: string, tipo: TipoLinea = ""): void {
  destino(texto, tipo);
}
