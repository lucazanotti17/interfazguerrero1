// ============================================
// UI: componentes gráficos (DOM)
// ============================================

export function crearLog(contenedor) {
  return function log(mensaje) {
    const linea = document.createElement("div");
    linea.className = "log-linea";
    linea.textContent = mensaje;
    contenedor.prepend(linea);
  };
}

export function crearTarjeta(personaje, armasDisponibles, log, avatar) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta";

  tarjeta.innerHTML = `
    <header class="tarjeta-header">
      <span class="avatar">${avatar}</span>
      <h2>${personaje.getNombre()}</h2>
    </header>

    <div class="barra"><div class="barra-relleno"></div></div>
    <p class="vida-texto"></p>

    <p class="seccion">Arma equipada</p>
    <div class="arma-actual"></div>

    <p class="seccion">Cambiar arma</p>
    <div class="armas"></div>

    <p class="seccion">Habilidad</p>
    <div class="habilidad">✨ ${personaje.getHabilidad().getNombre()}</div>

    <div class="acciones">
      <button data-accion="atacar">⚔️ Atacar</button>
      <button data-accion="habilidad">✨ Habilidad</button>
      <button data-accion="danio" class="peligro">💥 Recibir 20</button>
    </div>
  `;

  const relleno = tarjeta.querySelector(".barra-relleno");
  const vidaTexto = tarjeta.querySelector(".vida-texto");
  const armaActual = tarjeta.querySelector(".arma-actual");
  const contArmas = tarjeta.querySelector(".armas");

  function actualizar() {
    const pct = (personaje.getVida() / personaje.getVidaMax()) * 100;
    relleno.style.width = `${pct}%`;
    relleno.classList.toggle("baja", pct <= 30);
    vidaTexto.textContent = `❤️ ${personaje.getVida()} / ${personaje.getVidaMax()}`;

    const arma = personaje.getArma();
    armaActual.textContent = `${arma.getIcono()} ${arma.getNombre()} (${arma.getDanio()} daño)`;

    contArmas.querySelectorAll("button").forEach((btn, i) => {
      btn.classList.toggle("activa", armasDisponibles[i] === arma);
    });

    tarjeta.classList.toggle("muerto", !personaje.estaVivo());
    tarjeta.querySelectorAll(".acciones button").forEach(b => (b.disabled = !personaje.estaVivo()));
  }

  // Botones de armas (cambio por agregación)
  armasDisponibles.forEach(arma => {
    const btn = document.createElement("button");
    btn.className = "btn-arma";
    btn.textContent = `${arma.getIcono()} ${arma.getNombre()}`;
    btn.addEventListener("click", () => {
      log(personaje.cambiarArma(arma));
      actualizar();
    });
    contArmas.appendChild(btn);
  });

  tarjeta.querySelector('[data-accion="atacar"]').addEventListener("click", () => {
    log(personaje.atacar());
  });
  tarjeta.querySelector('[data-accion="habilidad"]').addEventListener("click", () => {
    log(personaje.usarHabilidad());
  });
  tarjeta.querySelector('[data-accion="danio"]').addEventListener("click", () => {
    log(personaje.recibirDanio(20));
    actualizar();
  });

  actualizar();
  return tarjeta;
}
