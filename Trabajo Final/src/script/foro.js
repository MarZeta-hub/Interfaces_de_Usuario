function nuevoMensajeForoManual() {
    var valor = document.getElementById("textMensajeNuevo").value;

    /* Obtengo la persona */
    var persona = obtenerNombre();

    /* Obtengo la fecha*/
    var f = new Date();
    var tiempo = f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear() + "  " + f.getHours() + ":" + f.getMinutes();
    agregarMensaje(persona, tiempo, valor);
    agregarMensajeCookie(persona, tiempo, valor);
}

function agregarMensajeCookie(persona, tiempo, valor) {
    var nuevoMensaje = {
        "persona": persona,
        "tiempo": tiempo,
        "valor": valor
    };
    var lugarActual = encontrarCookie("lugarActual");
    var cookieMensajes = encontrarCookie(lugarActual + "M");
    cookieMensajes = JSON.parse(cookieMensajes);
    var mensajes;
    if (cookieMensajes == null) {
        mensajes = [];
        mensajes.push(nuevoMensaje);
        cookieMensajes = mensajes;
    } else {
        cookieMensajes.push(nuevoMensaje);
    }
    cambiarCookie(lugarActual + "M", JSON.stringify(cookieMensajes));
}

function leerMensajesCookie() {
    var lugarActual = encontrarCookie("lugarActual");
    var cookieMensajes = encontrarCookie(lugarActual + "M");
    if (cookieMensajes == null || lugarActual == null) return
    var mensajes = JSON.parse(cookieMensajes);
    console.log(mensajes);
    for (var i = 0; i < mensajes.length; i++) {
        agregarMensaje(mensajes[i].persona, mensajes[i].tiempo, mensajes[i].valor);
    }
    var addNumero = parseInt(mensajes.length);
    var ultimoMensaje2 = mensajes[addNumero-1].tiempo;
    var addNumeroMensaje = document.getElementById("numeroMensaje");
    var ultimoMensaje = document.getElementById("ultimoMensajeTiempo");
    ultimoMensaje.textContent = "Último mensaje: " + ultimoMensaje2;
    addNumeroMensaje.textContent =  addNumero;
}

function agregarMensaje(persona, tiempo, valor) {
    /*lugar donde hay que agregar los mensajes*/
    var lugar = document.getElementById("mensaje");

    /* Creo el main div*/
    var nuevoMensaje = document.createElement("div");
    nuevoMensaje.className = "nuevoMensaje";

    /* Creo el div de cada usuario*/
    var usuarioMensaje = document.createElement("div");
    usuarioMensaje.className = "usuarioMensaje";

    /* Su contenido*/
    var nombreDiv = document.createElement("h4");
    nombreDiv.className = "userMensaje";
    nombreDiv.textContent = persona;

    /* FECHA*/
    var fecha = document.createElement("h4");
    fecha.className = "userMensaje";
    fecha.textContent = tiempo;

    /* TEXTO */
    var textoMensaje = document.createElement("p");
    textoMensaje.className = "userMensaje";
    textoMensaje.textContent = valor;

    /* Agregar los nuevos hijos */
    usuarioMensaje.appendChild(nombreDiv);
    usuarioMensaje.appendChild(fecha);
    nuevoMensaje.appendChild(usuarioMensaje);
    nuevoMensaje.appendChild(textoMensaje);
    lugar.insertAdjacentElement("beforebegin", nuevoMensaje);
}