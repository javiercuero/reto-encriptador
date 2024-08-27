const d = document;
const textArea = d.querySelector(".input_form");
const imagenNiño = d.querySelector(".resultado_niño");
const loaderBarra = d.querySelector(".loader");
const resultadoTitulo = d.querySelector(".resultado_titulo");
const resultadoTexto = d.querySelector(".resultado_texto");
const botonDeEncriptar = d.querySelector(".boton_a");
const botonDeDesencriptar = d.querySelector(".boton_b");
const botonDeCopiar = d.querySelector(".boton_c");
const botonPegar = d.querySelector(".boton_e");

const llaves_constantes = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

// Función para encriptar
function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;

        for (let j = 0; j < llaves_constantes.length; j++) {
            if (letra === llaves_constantes[j][0]) {
                encriptada = llaves_constantes[j][1];
                break;
            }
        }

        mensajeEncriptado += encriptada;
    }

    return mensajeEncriptado;
}

// Función para desencriptar
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves_constantes.length; i++) {
        let regex = new RegExp(llaves_constantes[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves_constantes[i][0]);
    }
    return mensajeDesencriptado;
}

// Ocultamos elementos al escribir
textArea.addEventListener("input", (e) => {
    imagenNiño.style.display = "none";
    console.log(e.target.value);
    loaderBarra.classList.remove("hidden");
    resultadoTitulo.textContent = "Ingresando Mensaje.";
    resultadoTexto.textContent = "";
});

// Lógica del botón Encriptar
botonDeEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeEncriptado;
    botonDeCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "El mensaje encriptado es:";
});

// Lógica del botón Desencriptar
botonDeDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoTexto.textContent = mensajeDesencriptado;
    botonDeCopiar.classList.remove("hidden");
    resultadoTitulo.textContent = "El mensaje desencriptado es:";
});

// Lógica botón Copiar
botonDeCopiar.addEventListener("click", () => {
    let copiarTexto = resultadoTexto.textContent;
    navigator.clipboard.writeText(copiarTexto).then(() => {
        imagenNiño.style.display = "block";
        loaderBarra.classList.add("hidden");
        resultadoTitulo.textContent = "El texto ha sido copiado";
        botonDeCopiar.classList.add("hidden");
        resultadoTexto.textContent = "";
    }).catch(err => {
        console.error("Error al copiar el texto: ", err);
        resultadoTitulo.textContent = "Error al copiar el texto.";
    });
});
