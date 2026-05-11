// ============================================================
// ALERTA BERSERK · FIXED CORNER VERSION
// Escala: 1/32 de la pantalla (aprox) en esquina superior derecha
// ============================================================

(function() {
  
  const DURACION_TOTAL = 19000;
  const APARICION_FRASE = 9000;
  const COLOR_MARCA = "#8b0000";
  const COLOR_BRILLO = "#ff0000";

  // Seleccionamos la imagen de Guts y la forzamos a la esquina
  const img = document.getElementById("imagen") || document.querySelector("img");
  if (img) {
    img.style.cssText = `
      position: fixed !important;
      top: 10px !important;
      right: 10px !important;
      width: 180px !important; /* Tamaño pequeño (1/32 aprox de un 1080p) */
      height: auto !important;
      z-index: 99990 !important;
      left: auto !important;
      transform: none !important;
    `;
  } else {
    return; // Si no hay imagen, no ejecutamos nada
  }

  const rect = img.getBoundingClientRect();

  // Estilos de animaciones
  const style = document.createElement("style");
  style.textContent = `
    @keyframes berserk-pulse {
      0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px ${COLOR_MARCA}); }
      50% { transform: scale(1.1); filter: drop-shadow(0 0 15px ${COLOR_BRILLO}); }
    }
    @keyframes berserk-soul {
      from { transform: rotate(0deg) translateX(50px) rotate(0deg); opacity: 0; }
      15%, 85% { opacity: 0.6; }
      to { transform: rotate(360deg) translateX(50px) rotate(-360deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Marca del Sacrificio (encima de Guts)
  const marca = document.createElement("div");
  marca.textContent = "✠";
  marca.style.cssText = `
    position: fixed;
    top: ${rect.top + 20}px;
    right: 25px;
    color: ${COLOR_MARCA};
    font-size: 30px;
    z-index: 99999;
    animation: berserk-pulse 1.2s infinite;
    opacity: 0; transition: opacity 1s;
    text-shadow: 0 0 10px ${COLOR_BRILLO};
  `;
  document.body.appendChild(marca);

  // Almas (pequeñas alrededor de la esquina)
  const almas = [];
  for (let k = 0; k < 4; k++) {
    const alma = document.createElement("div");
    alma.textContent = "·";
    alma.style.cssText = `
      position: fixed;
      top: ${rect.top + 60}px;
      right: 60px;
      color: #fff;
      font-size: 24px;
      z-index: 99998;
      animation: berserk-soul ${4 + k}s linear infinite;
      opacity: 0;
    `;
    document.body.appendChild(alma);
    almas.push(alma);
  }

  // Frase (Debajo de Guts, no en medio de la pantalla)
  const FRASES = ["«Lucharé. Es lo único que sé hacer»", "«Le arrebataré la cabeza al destino»"];
  const frasebox = document.createElement("div");
  frasebox.style.cssText = `
    position: fixed;
    top: ${rect.bottom + 10}px;
    right: 10px;
    width: 200px;
    text-align: right;
    color: ${COLOR_MARCA};
    font-family: serif;
    font-size: 14px;
    font-style: italic;
    opacity: 0;
    transition: all 1s;
  `;
  frasebox.innerHTML = FRASES[Math.floor(Math.random() * FRASES.length)];
  document.body.appendChild(frasebox);

  // Ejecución
  requestAnimationFrame(() => {
    marca.style.opacity = "1";
    almas.forEach(a => a.style.opacity = "1");
  });

  setTimeout(() => { frasebox.style.opacity = "1"; }, 3000);

  // Limpieza
  setTimeout(() => {
    [marca, frasebox, ...almas].forEach(el => el.style.opacity = "0");
    setTimeout(() => {
      [marca, frasebox, ...almas, style].forEach(el => el?.remove());
    }, 1500);
  }, DURACION_TOTAL - 1500);

})();
