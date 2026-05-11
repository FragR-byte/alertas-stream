// ============================================================
// ALERTA BERSERK · "El Espadachín Negro despierta"
// Duración total: 19 segundos
// Iconografía: Marca del Sacrificio + Eclipse + frase de Guts
// ============================================================

(function() {
  
  // ---------- CONFIG ----------
  const DURACION_TOTAL = 19000;          // 19s
  const APARICION_FRASE = 9000;          // a los 9s aparece la frase final
  const COLOR_MARCA = "#8b0000";         // rojo sangre oscuro
  const COLOR_BRILLO = "#ff0000";        // rojo brillante (pulso)
  const ECLIPSE_TAMANO = 110;            // px del Eclipse
  
  const FRASES = [
    "«El sueño de un hombre nunca muere»",
    "«Detrás de cada cicatriz, una batalla que no perdí»",
    "«Lucharé. Es lo único que sé hacer»",
    "«Le arrebataré la cabeza al destino»",
    "«La oscuridad es mi compañera más antigua»"
  ];
  const frase = FRASES[Math.floor(Math.random() * FRASES.length)];

  // ---------- IMAGEN BASE ----------
  const img = document.getElementById("imagen");
  if (!img) {
    console.warn("Alerta Berserk: no se encontró #imagen, abortando");
    return;
  }
  const rect = img.getBoundingClientRect();

  // ---------- ANIMACIONES CSS ----------
  const style = document.createElement("style");
  style.textContent = `
    @keyframes berserk-pulse {
      0%, 100% {
        transform: scale(1);
        filter: drop-shadow(0 0 8px ${COLOR_MARCA}) 
                drop-shadow(0 0 16px ${COLOR_MARCA});
      }
      50% {
        transform: scale(1.2);
        filter: drop-shadow(0 0 18px ${COLOR_BRILLO}) 
                drop-shadow(0 0 32px ${COLOR_BRILLO});
      }
    }
    @keyframes berserk-eclipse {
      0%, 100% {
        box-shadow: 0 0 60px 20px #2a0000, 
                    inset 0 0 30px #000;
      }
      50% {
        box-shadow: 0 0 100px 35px #5a0000, 
                    inset 0 0 45px #000;
      }
    }
    @keyframes berserk-corona {
      0%, 100% { transform: rotate(0deg); opacity: 0.7; }
      50% { transform: rotate(180deg); opacity: 1; }
    }
    @keyframes berserk-soul {
      from {
        transform: rotate(0deg) translateX(70px) rotate(0deg);
        opacity: 0;
      }
      15%, 85% { opacity: 0.6; }
      to {
        transform: rotate(360deg) translateX(70px) rotate(-360deg);
        opacity: 0;
      }
    }
    @keyframes berserk-frase-in {
      from { opacity: 0; transform: translate(-50%, 20px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }
  `;
  document.head.appendChild(style);

  // ---------- MARCA DEL SACRIFICIO (junto a la imagen) ----------
  const marca = document.createElement("div");
  marca.textContent = "✠";
  marca.style.cssText = `
    position: fixed;
    top: ${rect.bottom + 12}px;
    right: ${window.innerWidth - rect.right}px;
    color: ${COLOR_MARCA};
    font-size: 46px;
    z-index: 99999;
    animation: berserk-pulse 1.2s ease-in-out infinite;
    opacity: 0;
    transition: opacity 1s;
    text-shadow: 0 0 14px ${COLOR_BRILLO};
    pointer-events: none;
  `;
  document.body.appendChild(marca);

  // ---------- ECLIPSE (esquina opuesta) ----------
  const eclipse = document.createElement("div");
  eclipse.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 80px;
    width: ${ECLIPSE_TAMANO}px;
    height: ${ECLIPSE_TAMANO}px;
    border-radius: 50%;
    background: radial-gradient(circle, #000 55%, #3a0000 90%, transparent 100%);
    z-index: 99997;
    animation: berserk-eclipse 4s ease-in-out infinite;
    opacity: 0;
    transition: opacity 2s;
    pointer-events: none;
  `;
  document.body.appendChild(eclipse);

  // Corona del Eclipse (anillo exterior rotando)
  const corona = document.createElement("div");
  corona.style.cssText = `
    position: fixed;
    bottom: ${80 - 15}px;
    left: ${80 - 15}px;
    width: ${ECLIPSE_TAMANO + 30}px;
    height: ${ECLIPSE_TAMANO + 30}px;
    border-radius: 50%;
    border: 2px dashed rgba(255, 100, 0, 0.4);
    z-index: 99996;
    animation: berserk-corona 12s linear infinite;
    opacity: 0;
    transition: opacity 2s;
    pointer-events: none;
  `;
  document.body.appendChild(corona);

  // ---------- ALMAS ESPECTRALES (giran alrededor de la imagen) ----------
  const almas = [];
  for (let k = 0; k < 5; k++) {
    const alma = document.createElement("div");
    alma.textContent = "·";
    alma.style.cssText = `
      position: fixed;
      top: ${rect.top + rect.height / 2}px;
      left: ${rect.left + rect.width / 2}px;
      color: #cccccc;
      font-size: 32px;
      z-index: 99998;
      animation: berserk-soul ${5 + k * 0.7}s linear infinite;
      animation-delay: ${k * 1.1}s;
      text-shadow: 0 0 8px #ffffff, 0 0 16px #aaaaaa;
      pointer-events: none;
      opacity: 0;
    `;
    document.body.appendChild(alma);
    almas.push(alma);
  }

  // ---------- FRASE FINAL (aparece a los 9s) ----------
  const frasebox = document.createElement("div");
  frasebox.innerHTML = `
    <div style="
      font-size: 11px;
      letter-spacing: 7px;
      color: #888;
      margin-bottom: 10px;
      font-family: 'Times New Roman', serif;
    ">— EL ESPADACHÍN NEGRO HA DESPERTADO —</div>
    <div style="
      font-family: 'Times New Roman', serif;
      font-size: 34px;
      color: ${COLOR_MARCA};
      text-shadow: 0 0 12px #000, 2px 2px 4px #000, 0 0 24px ${COLOR_BRILLO};
      font-style: italic;
      font-weight: bold;
    ">${frase}</div>
    <div style="
      font-size: 12px;
      letter-spacing: 4px;
      color: #666;
      margin-top: 12px;
      font-family: 'Times New Roman', serif;
    ">— GUTS —</div>
  `;
  frasebox.style.cssText = `
    position: fixed;
    bottom: 25vh;
    left: 50%;
    transform: translate(-50%, 20px);
    text-align: center;
    z-index: 99999;
    opacity: 0;
    transition: opacity 1.5s ease-out, transform 1.5s ease-out;
    pointer-events: none;
    max-width: 80vw;
  `;
  document.body.appendChild(frasebox);

  // ---------- SECUENCIA DE APARICIÓN ----------
  requestAnimationFrame(() => {
    marca.style.opacity = "1";
    eclipse.style.opacity = "0.85";
    corona.style.opacity = "1";
    almas.forEach(a => a.style.opacity = "1");
  });

  // Frase aparece a los 9 segundos
  setTimeout(() => {
    frasebox.style.opacity = "1";
    frasebox.style.transform = "translate(-50%, 0)";
  }, APARICION_FRASE);

  // ---------- SALIDA Y LIMPIEZA ----------
  setTimeout(() => {
    marca.style.opacity = "0";
    eclipse.style.opacity = "0";
    corona.style.opacity = "0";
    frasebox.style.opacity = "0";
    almas.forEach(a => a.style.opacity = "0");
    
    setTimeout(() => {
      marca.remove();
      eclipse.remove();
      corona.remove();
      frasebox.remove();
      almas.forEach(a => a.remove());
      style.remove();
    }, 1500);
  }, DURACION_TOTAL - 1500);

})();
