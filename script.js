// Elementos
const textoElemento = document.getElementById("texto");
const avanzarBtn = document.getElementById("avanzar");
const musica = document.getElementById("musica");
const playBtn = document.getElementById("playMusica");
const blip = document.getElementById("blip");
const clickSound = document.getElementById("clickSound"); // 🔊 Nuevo

const pantalla1 = document.getElementById("pantalla1");
const pantalla2 = document.getElementById("pantalla2");
const pantallaDibujos = document.getElementById("pantallaDibujos");
const pantallaFinal = document.getElementById("pantallaFinal");

const fotos = document.querySelectorAll(".foto");
const siguienteFotosBtn = document.getElementById("siguienteFotos");

// Texto por foto
const textoFoto = document.getElementById("textoFoto");
const mensajesFotos = [
  "Me acuerdo que este día nos dimos nuestro primer abrazo, fue muy lindo y la pase re bien ese día 🤠",
  "De las pocas y decentes fotos que tenemos juntos, ese día tambien la pasé hermoso jiji 😁❤",
  "Gracias por tu regalito y presencia en mi cumpleaños, me sentí re bien ese día y más que hayas estado ahí 😋 (sali re mal en esa foto, asi que si podes no se la muestres a nadie je)"
];

// Control para tipeo en fotos
let escribiendoFoto = false;
let intervaloFoto = null;

const fotosDibujo = document.querySelectorAll(".fotoDibujo");
const siguienteDibujoBtn = document.getElementById("siguienteDibujo");
const descargasDiv = document.getElementById("descargasDibujos");

let dialogos = [
  "Holaa val. 😋",
  "Activa la música para que la experiencia sea mas copada (el soundtrack lo hice yo).",
  "Este es el regalito final que te tengo.",
  "Basicamente una página web dedicada especialmente para vos, espero valores este esfuercito que hice.",
  "Acá te dejo las distintas opciones que puse para este regalo."
];

let indiceDialogo = 0;
let escribiendo = false;
let indiceLetra = 0;
let fotoActual = 0;
let dibujoActual = 0;

// Música
playBtn.addEventListener("click", () => {
  musica.play();
  playBtn.style.display = "none";
});

// Sonido global en botones (excepto "avanzar")
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.id !== "avanzar") {
    const s = clickSound.cloneNode();
    s.play();
  }
});



// Texto del menú
function escribirTexto(texto) {
  escribiendo = true;
  textoElemento.innerHTML = "";
  indiceLetra = 0;

  const intervalo = setInterval(() => {
    if (indiceLetra < texto.length) {
      textoElemento.innerHTML += texto[indiceLetra];
      if (texto[indiceLetra] !== " ") {
        const sonido = blip.cloneNode();
        sonido.play();
      }
      const x = (Math.random() - 0.5) * 2; 
      const y = (Math.random() - 0.5) * 2;
      textoElemento.style.transform = `translate(${x}px, ${y}px)`;
      indiceLetra++;
    } else {
      clearInterval(intervalo);
      escribiendo = false;
      textoElemento.style.transform = `translate(0,0)`;
      if (indiceDialogo >= dialogos.length) {
        animarGloboOpciones();
      }
    }
  }, 40);
}

// Texto para fotos con salto
function escribirTextoFoto(texto) {
  escribiendoFoto = true;
  textoFoto.innerHTML = "";
  let i = 0;

  clearInterval(intervaloFoto);
  intervaloFoto = setInterval(() => {
    if (i < texto.length) {
      textoFoto.innerHTML += texto[i];
      if (texto[i] !== " ") {
        const sonido = blip.cloneNode();
        sonido.play();
      }
      const x = (Math.random() - 0.5) * 2;
      const y = (Math.random() - 0.5) * 2;
      textoFoto.style.transform = `translate(${x}px, ${y}px)`;
      i++;
    } else {
      clearInterval(intervaloFoto);
      escribiendoFoto = false;
      textoFoto.style.transform = "translate(0,0)";
    }
  }, 40);
}

avanzarBtn.addEventListener("click", () => {
  if (escribiendo) return; // 👉 no hace nada ni suena si aún está escribiendo

  if (indiceDialogo < dialogos.length) {
    escribirTexto(dialogos[indiceDialogo]);
    indiceDialogo++;

    // 👉 ahora sí, solo cuando avanza realmente
    const s = clickSound.cloneNode();
    s.play();
  }
});


// Animar globo y opciones
function animarGloboOpciones() {
  const dialogoBox = document.getElementById("dialogo");
  dialogoBox.style.transition = "transform 0.5s ease";
  dialogoBox.style.transform = "translateY(-50px)";
  if (!document.getElementById("opcionesFinal")) {
    const opcionesDiv = document.createElement("div");
    opcionesDiv.id = "opcionesFinal";
    opcionesDiv.style.marginTop = "20px";
    const btnSlideshow = document.createElement("button");
    btnSlideshow.innerText = "Ver recuerdos 📸";
    btnSlideshow.onclick = irAPantalla2;
    opcionesDiv.appendChild(btnSlideshow);
    const btnDibujos = document.createElement("button");
    btnDibujos.innerText = "Ver dibujos 🎨";
    btnDibujos.onclick = irAPantallaDibujos;
    opcionesDiv.appendChild(btnDibujos);
    const btnFinal = document.createElement("button");
    btnFinal.innerText = "Mensaje final ✨";
    btnFinal.onclick = irAPantallaFinal;
    opcionesDiv.appendChild(btnFinal);
    dialogoBox.appendChild(opcionesDiv);
  } else {
    document.getElementById("opcionesFinal").style.display = "block";
  }
  avanzarBtn.style.display = "none";
  dialogoBox.classList.add("parpadeando");
}

// Ir a recuerdos
function irAPantalla2() {
  pantalla1.classList.add("oculto");
  pantalla2.classList.remove("oculto");
  pantallaDibujos.classList.add("oculto");
  pantallaFinal.classList.add("oculto");
  const opcionesDiv = document.getElementById("opcionesFinal");
  if (opcionesDiv) opcionesDiv.style.display = "none";
  fotoActual = 0;
  fotos.forEach((f, i) => f.classList.toggle("oculto", i !== 0));
  escribirTextoFoto(mensajesFotos[fotoActual]);
}

// Ir a dibujos
function irAPantallaDibujos() {
  pantalla1.classList.add("oculto");
  pantalla2.classList.add("oculto");
  pantallaDibujos.classList.remove("oculto");
  pantallaFinal.classList.add("oculto");
  const opcionesDiv = document.getElementById("opcionesFinal");
  if (opcionesDiv) opcionesDiv.style.display = "none";
  actualizarBotonDescarga();
}

// Ir a mensaje final
function irAPantallaFinal() {
  pantalla1.classList.add("oculto");
  pantalla2.classList.add("oculto");
  pantallaDibujos.classList.add("oculto");
  pantallaFinal.classList.remove("oculto");
  const opcionesDiv = document.getElementById("opcionesFinal");
  if (opcionesDiv) opcionesDiv.style.display = "none";
}

// Siguiente foto (con salto)
siguienteFotosBtn.addEventListener("click", () => {
  if (escribiendoFoto) {
    clearInterval(intervaloFoto);
    textoFoto.textContent = mensajesFotos[fotoActual];
    escribiendoFoto = false;
    return;
  }
  fotos[fotoActual].classList.add("oculto");
  fotoActual++;
  if (fotoActual < fotos.length) {
    fotos[fotoActual].classList.remove("oculto");
    escribirTextoFoto(mensajesFotos[fotoActual] || "");
  } else {
    fotoActual = 0;
    fotos.forEach((f, i) => f.classList.toggle("oculto", i !== 0));
    escribirTextoFoto(mensajesFotos[fotoActual] || "");
    volverAlMenuOpciones();
  }
});

// Dibujos con descarga
function actualizarBotonDescarga() {
  descargasDiv.innerHTML = "";
  const btn = document.createElement("button");
  btn.innerText = "⬇️ Descargar este dibujo";
  btn.onclick = () => {
    const imgActual = fotosDibujo[dibujoActual];
    const link = document.createElement("a");
    link.href = imgActual.src;
    link.download = imgActual.alt + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  descargasDiv.appendChild(btn);
}

siguienteDibujoBtn.addEventListener("click", () => {
  fotosDibujo[dibujoActual].classList.add("oculto");
  dibujoActual++;
  if (dibujoActual < fotosDibujo.length) {
    fotosDibujo[dibujoActual].classList.remove("oculto");
    actualizarBotonDescarga();
  } else {
    dibujoActual = 0;
    fotosDibujo.forEach((f, i) => f.classList.toggle("oculto", i !== 0));
    actualizarBotonDescarga();
    volverAlMenuOpciones();
  }
});

// Volver al menú
function volverAlMenuOpciones() {
  clearInterval(intervaloFoto);
  escribiendoFoto = false;
  if (textoFoto) textoFoto.style.transform = "translate(0,0)";

  pantalla1.classList.remove("oculto");
  pantalla2.classList.add("oculto");
  pantallaDibujos.classList.add("oculto");
  pantallaFinal.classList.add("oculto");

  const dialogoBox = document.getElementById("dialogo");
  dialogoBox.style.transform = "translateY(-50px)";

  const opcionesDiv = document.getElementById("opcionesFinal");
  if (opcionesDiv) opcionesDiv.style.display = "block";

  dialogoBox.classList.add("parpadeando");
}

// Botón volver del final
const volverMenuFinalBtn = document.getElementById("volverMenuFinal");
volverMenuFinalBtn.addEventListener("click", () => {
  volverAlMenuOpciones();
});

// Iniciar diálogo
escribirTexto(dialogos[indiceDialogo]);
indiceDialogo++;

// Efecto de partículas al hacer click en "Soundtrack"
playBtn.addEventListener("click", (e) => {
  for (let i = 0; i < 10; i++) {
    const part = document.createElement("span");
    part.classList.add("particula");
    document.body.appendChild(part);

    const x = e.clientX;
    const y = e.clientY;

    part.style.left = x + "px";
    part.style.top = y + "px";

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 80 + 20;

    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    part.animate(
      [
        { transform: `translate(0,0)`, opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
      ],
      {
        duration: 600,
        easing: "ease-out",
        fill: "forwards"
      }
    );

    setTimeout(() => part.remove(), 600);
  }
});
