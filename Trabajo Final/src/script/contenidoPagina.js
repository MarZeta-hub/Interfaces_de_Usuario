/**
 * CODIGO DE LA PÁGINA PRINCIPAL
 */

function setForo() {
  quitarSobrayadoNav();
  document.getElementById("contenido").style.display = "none";
  document.getElementById("CalificacionesContenedor").style.display = "none";
  document.getElementById("foro").style.display = "block";
  document.getElementById("navcolorforo").style.backgroundColor = "#ff8282";
}

function setCalificaciones() {
  quitarSobrayadoNav();
  document.getElementById("foro").style.display = "none";
  document.getElementById("contenido").style.display = "none";
  document.getElementById("CalificacionesContenedor").style.display = "block";
  document.getElementById("navCalificaciones").style.backgroundColor = "#ff8282";
  genera_tabla();
}

function quitarSobrayadoNav() {
  document.getElementById("seleccion").style.backgroundColor = "#ffffff";
  document.getElementById("navCalificaciones").style.backgroundColor = "#ffffff";
  document.getElementById("navcolorforo").style.backgroundColor = "#ffffff";
}


$(window).on("load", function () {
  addTemaAutomatico();
  calendario();
  leerMensajesCookie();
  console.log(rol);
  if (rol == "estudiante" || rol == " estudiante") {
    document.getElementById("nuevoTema").style.display = "none";
    document.getElementById("temaNuevoBoton").style.display = "none";
    var contenido = document.getElementById("addContenido");
    if (contenido != null) {
      contenido.style.display = "none";
    }
  }
});

function calendario() {
  var lugar = encontrarCookie("lugarActual");
  var datos = encontrarCookie(lugar);

  var sampleEvents = [];
  sampleEvents.push({
    title: "Hoy",
    date: new Date().getTime(), // last week
    link: "#"
  });
  if (datos != null) {
    datos = JSON.parse(datos);
    for (var i = 0; i < datos.length; i++) {
      for (var j = 0; j < datos[i].Entregable.length; j++) {
        datos[i].Entregable[j].date = Date.parse(datos[i].Entregable[j].date);
        console.log(datos[i].Entregable[j].date + "   " + new Date().getTime());
        sampleEvents.push(datos[i].Entregable[j]);
      }
    }
  }
  $("#calendario").MEC({
    events: sampleEvents,
    from_monday: true
  });
}

function addTemaAutomatico() {
  var lugarActual = encontrarCookie("lugarActual");
  var temas = JSON.parse(encontrarCookie(lugarActual));
  if (temas == null) return;
  for (var i = 0; i < temas.length; i++) {
    addTema(temas[i].Tema);
    var contenidoArray = temas[i].Contenido.split("|");
    for (var j = 0; j < contenidoArray.length; j++) {
      addNuevoContenido(contenidoArray[j], temas[i].Tema);
    }
    for (var j = 0; j < temas[i].Entregable.length; j++) {
      addNuevoEntregable(temas[i].Entregable[j].date, temas[i].Entregable[j].title, temas[i].Tema);
    }
  }
}

function addTemaManual() {
  var lugarActual = encontrarCookie("lugarActual");
  var temas = encontrarCookie(lugarActual);
  var nombreDelTema;
  if (temas == null) {
    nombreDelTema = prompt("Por favor, diga el nombre del nuevo tema", "Tema " + 1);
    if (nombreDelTema == null || nombreDelTema == "") return;
  } else {
    temas = JSON.parse(temas);
    nombreDelTema = prompt("Por favor, diga el nombre del nuevo tema", "Tema " + parseInt(temas.length + 1));
    if (nombreDelTema == null || nombreDelTema == "") return;
    for (var i = 0; i < temas.length; i++) {
      if (temas[i].Tema == nombreDelTema || " " + temas[i].Tema == nombreDelTema) {
        alert("No puedes agregar un tema con el mismo nombre que otro");
        return;
      }
    }
  }
  addTema(nombreDelTema);
  saveTema(nombreDelTema);
}
/* Añade los botones necesarios para poder add contenido*/
function addTema(nombreDelTema) {
  var lugar = document.getElementById("nuevoTema");

  // Crear el boton para agregar texto
  const botonTexto = document.createElement("button");
  botonTexto.setAttribute('onclick', "addContenidoFuncion('" + nombreDelTema + "')");
  botonTexto.className = "botonNuevoContenido";
  botonTexto.textContent = "Añadir contenido";

  // Crear el boton para nuevo entregable
  const botonEntregable = botonTexto.cloneNode();
  botonEntregable.className = "botonNuevoEntregable";
  botonEntregable.setAttribute('onclick', "addEntregableFuncion('" + nombreDelTema + "')");
  botonEntregable.textContent = "Añade una nueva tarea";

  // Crear el boton para nuevo entregable
  const botonAyuda = botonTexto.cloneNode();
  botonAyuda.className = "botonNuevoAyuda";
  botonAyuda.setAttribute('onclick', "ayuda()");
  botonAyuda.textContent = "AYUDA";

  //Crear contenedor
  const contenerdorDeBotones = document.createElement("div");
  contenerdorDeBotones.appendChild(botonTexto);
  contenerdorDeBotones.appendChild(botonEntregable);
  contenerdorDeBotones.appendChild(botonAyuda);
  contenerdorDeBotones.id = nombreDelTema;

  //Barra Espaciadores
  const barra = document.createElement("hr");
  barra.className = "separadorTemas";

  //Crear todo
  const temaNuevo = document.createElement("article");
  const tituloTemaNuevo = document.createElement("h3");
  tituloTemaNuevo.textContent = nombreDelTema;
  temaNuevo.appendChild(tituloTemaNuevo);
  temaNuevo.appendChild(contenerdorDeBotones);
  temaNuevo.appendChild(barra);
  if (rol == "estudiante" | rol == " estudiante") {
    contenerdorDeBotones.style.display = "none";
  }
  var resultado = lugar.insertAdjacentElement("beforebegin", temaNuevo);
}

function ayuda() {
  alert("Los botones: \n -Añadir contenido: Añade un nuevo texto al tema\n -Añade una nueva tarea: Añade un nuevo examen o fecha de entrega \n Recuerda que una vez añadidos no se puede eliminar.Si puedes cancelarlos antes de agregarlos.");
}

function saveTema(temaNuevo) {
  var lugarActual = encontrarCookie("lugarActual");
  let temas = encontrarCookie(lugarActual);
  var str = {
    "Tema": temaNuevo,
    "Contenido": "",
    "Entregable": ""
  }
  if (temas == null) {
    temas = [];
  } else {
    temas = JSON.parse(temas);
  }
  console.log(temas);
  temas.push(str);
  cambiarCookie(lugarActual, JSON.stringify(temas));
}

var abiertoTextArea = false;

function addContenidoManual(nombreTema) {
  var valor = document.getElementById("nuevoContenidoTextArea").value;
  var lugar = document.getElementById(nombreTema);
  var addContenido = document.getElementById("addContenido");
  if (valor == "") {
    alert("No has escrito nada");
    return;
  }
  addNuevoContenido(valor, nombreTema);
  addContenidoCookie(valor, nombreTema);
  abiertoTextArea = false;
  cancelar(nombreTema);
}

/* Funcion que agrega los botones para poder añadir nuevo contenido */
function addContenidoFuncion(nombreTema) {
  if (abiertoTextArea == true) {
    alert("Ya estás añadiendo otro contenido. Por favor, añade una tras otro.");
    return;
  }
  abiertoTextArea = true;
  var lugar = document.getElementById(nombreTema);
  lugar.style.display = "none";

  /* CREO EL TEXT AREA */
  const texto = document.createElement("textarea");
  texto.style.display = "inline-block";
  texto.className = "textAreaAdd"
  texto.id = "nuevoContenidoTextArea";

  /* Botones de la funcion*/
  const botonTexto = document.createElement("button");
  botonTexto.style.display = "inline-block";
  botonTexto.textContent = "Agregar contenido";
  botonTexto.className = "addContenidoBoton";
  botonTexto.setAttribute("onclick", "addContenidoManual('" + nombreTema + "')");

  /* Boton cancelar*/
  const botoncancelar = document.createElement("button");
  botoncancelar.className = "botonNuevoCancelar";
  botoncancelar.textContent = "Cancelar";
  botoncancelar.setAttribute('onclick', "cancelar('" + nombreTema + "')");
  /* Para add contenido*/
  const divContenidoNuevo = document.createElement("div");
  divContenidoNuevo.id = "addContenido";
  divContenidoNuevo.style.display = "inline-block";
  divContenidoNuevo.appendChild(texto);
  divContenidoNuevo.appendChild(botonTexto);
  divContenidoNuevo.appendChild(botoncancelar);
  lugar.insertAdjacentElement("beforebegin", divContenidoNuevo);
}

function addNuevoContenido(valor, nombreTema) {
  if(valor == "")return;
  const nuevoContenido = document.createElement("p");
  nuevoContenido.className = "textAreaContenido";
  nuevoContenido.textContent = valor;
  var lugar = document.getElementById(nombreTema);
  lugar.insertAdjacentElement("beforebegin", nuevoContenido);
}

function addContenidoCookie(valor, nombreTema) {
  var lugarActual = encontrarCookie("lugarActual");
  var temas = encontrarCookie(lugarActual);
  temas = JSON.parse(temas);
  for (var i = 0; i < temas.length; i++) {
    if (temas[i].Tema == nombreTema) {
      if (temas[i].Contenido == "") {
        temas[i].Contenido = valor
      } else {
        temas[i].Contenido = temas[i].Contenido + "|" + valor;
      }
    }
  }
  cambiarCookie(lugarActual, JSON.stringify(temas));
}

function addEntregableManual(nombreTema) {
  var tiempo = document.getElementById("tiempo").value;
  var nombreEntregable = document.getElementById("nombreEntregable").value;
  if (nombreEntregable == "" || tiempo == "") {
    alert("No has escrito nada of falta agregar el tiempo");
    return;
  }
  addNuevoEntregable(tiempo, nombreEntregable, nombreTema);
  addEntregableCookie(tiempo, nombreEntregable, nombreTema);
  cancelar(nombreTema);
}

function addEntregableFuncion(nombreTema) {
  if (abiertoTextArea == true) {
    alert("Ya estás añadiendo otro contenido o entregable. Por favor, añade una tras otro.");
    return;
  }
  abiertoTextArea = true;
  var lugar = document.getElementById(nombreTema);
  lugar.style.display = "none";

  /*Agregar nuevo formulario*/
  var tiempo = document.createElement("input");
  var f = new Date();
  tiempo.setAttribute("type", "date");
  tiempo.value = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
  tiempo.id = "tiempo";
  tiempo.min = "2020/11/01";
  var nombreEntregable = document.createElement("input")
  nombreEntregable.setAttribute("type", "'text'");
  nombreEntregable.id = "nombreEntregable";
  nombreEntregable.className = "textAreaFecha";

  /*Boton*/
  const botonTexto = document.createElement("button");
  botonTexto.style.display = "inline-block";
  botonTexto.textContent = "Agregar nuevo entregable";
  botonTexto.className = "addContenidoBoton";
  botonTexto.setAttribute("onclick", "addEntregableManual('" + nombreTema + "')");

  /* Boton Cancelar*/
  const botoncancelar = document.createElement("button");
  botoncancelar.className = "botonNuevoCancelar";
  botoncancelar.textContent = "Cancelar";
  botoncancelar.setAttribute('onclick', "cancelar('" + nombreTema + "')");

  /* Crear nuevo DIv para agregar el timepo*/
  const divContenidoNuevo = document.createElement("div");
  divContenidoNuevo.id = "addContenido";
  divContenidoNuevo.style.display = "inline-block";
  divContenidoNuevo.appendChild(nombreEntregable);
  divContenidoNuevo.appendChild(tiempo);
  divContenidoNuevo.appendChild(botonTexto);
  divContenidoNuevo.appendChild(botoncancelar);
  lugar.insertAdjacentElement("beforebegin", divContenidoNuevo);

}

function addNuevoEntregable(tiempo, nombreEntregable, nombreTema) {
  const nuevoContenido = document.createElement("p");
  nuevoContenido.className = "textAreaEntregable";
  nuevoContenido.textContent = "Entregable: " + nombreEntregable + " Fecha: " + tiempo;
  var lugar = document.getElementById(nombreTema);
  lugar.insertAdjacentElement("beforebegin", nuevoContenido);
}

function addEntregableCookie(tiempo, nombreEntregable, nombreTema) {
  var lugarActual = encontrarCookie("lugarActual");
  var temas = encontrarCookie(lugarActual);
  temas = JSON.parse(temas);
  var entregables;
  var nuevo = {
    title: nombreEntregable,
    date: tiempo, // today
    link: "#"
  };
  console.log("hola");
  for (var i = 0; i < temas.length; i++) {
    if (temas[i].Tema == nombreTema) {
      if (temas[i].Entregable == "") {
        entregables = [];
        entregables.push(nuevo);
        temas[i].Entregable = entregables;
      } else {
        temas[i].Entregable.push(nuevo);
      }
    }
  }
  console.log(temas);
  agregarNuevoEntregable(nombreEntregable); //Para ponerles nota
  cambiarCookie(lugarActual, JSON.stringify(temas));
}

function cancelar(nombreDeltema) {
  var lugar = document.getElementById(nombreDeltema);
  var addContenido = document.getElementById("addContenido");
  lugar.style.display = "block";
  addContenido.remove();
  abiertoTextArea = false;
}