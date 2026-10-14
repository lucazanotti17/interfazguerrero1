import type { TipoArma } from "./Arma.js";

// Dibujos SVG de cada tipo de arma (apuntando hacia arriba, centrados en la mano).
export const GLIFOS: Record<TipoArma, string> = {
  espada:
    '<path d="M0 -64 L6 -32 L6 -6 L-6 -6 L-6 -32Z" fill="var(--steel)"/>' +
    '<rect x="-17" y="-6" width="34" height="6" rx="2" fill="var(--ember)"/>' +
    '<rect x="-3" y="0" width="6" height="18" fill="var(--fg)"/>',
  arco:
    '<path d="M-4 -52 Q 36 0 -4 52" fill="none" stroke="var(--steel)" stroke-width="5" stroke-linecap="round"/>' +
    '<line x1="-4" y1="-52" x2="-4" y2="52" stroke="var(--muted)" stroke-width="1.5"/>',
  hacha:
    '<rect x="-3" y="-52" width="6" height="78" fill="var(--fg)"/>' +
    '<path d="M3 -50 Q 36 -46 31 -24 Q 36 -4 3 -6Z" fill="var(--steel)"/>',
  martillo:
    '<rect x="-3" y="-34" width="6" height="64" fill="var(--fg)"/>' +
    '<rect x="-21" y="-54" width="42" height="22" rx="3" fill="var(--steel)"/>' +
    '<rect x="-21" y="-46" width="42" height="5" fill="var(--ember)"/>',
};

// Figura del personaje. El arma se inserta dentro de [data-arma].
export function figura(conCasco: boolean): string {
  const cabeza = conCasco
    ? '<path class="traje" d="M78 62 A22 22 0 0 1 122 62 L122 54 L78 54Z"/><rect class="traje" x="97" y="40" width="6" height="18"/>'
    : '<path class="traje" d="M76 66 Q100 22 124 66 Q100 50 76 66Z"/>';

  return `
  <svg viewBox="0 0 200 230" role="img" aria-label="Personaje con arma equipada">
    <ellipse class="suelo" cx="100" cy="212" rx="56" ry="9"/>
    <rect class="traje" x="76" y="150" width="20" height="58" rx="4"/>
    <rect class="traje" x="104" y="150" width="20" height="58" rx="4"/>
    <rect class="traje" x="72" y="84" width="56" height="72" rx="10"/>
    <line x1="76" y1="96" x2="52" y2="128" stroke="var(--steel)" stroke-width="10" stroke-linecap="round"/>
    <circle class="piel" cx="100" cy="62" r="20"/>
    ${cabeza}
    <line x1="124" y1="96" x2="150" y2="112" stroke="var(--steel)" stroke-width="10" stroke-linecap="round"/>
    <g transform="translate(150 112)"><g class="swing" data-arma></g></g>
  </svg>`;
}
