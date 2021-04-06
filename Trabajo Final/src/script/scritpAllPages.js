/**
 * CODIGO PRINCIPAL QUE TIENE QUE TENER TODAS LAS PÁGINAS EXCEPTO LOGIN
 */

var email = "default";
var rol = "default";
var nombre = "default";
var asignatura = 0;

function getVariables() {
  var usuarioActual = encontrarCookie("usuarioActual");
  var variable = usuarioActual.split("|");
  email = variable[0];
  nombre = variable[1];
  rol = variable[2];
  asignatura = variable[3];
}

function obtenerEmail() {
  return email;
}

function obtenerRol() {
  return rol;
}

function obtenerNombre() {
  return nombre;
}

function obtenerAsignatura() {
  return asignatura;
}



function setInterfaces() {
  cambiarCookie("lugarActual", "interfaces");
  window.location.replace("interfaces.html");
}

function setingenieria() {
  cambiarCookie("lugarActual", "ingenieria");
  window.location.replace("ingenieria.html");
}

function setAC() {
  cambiarCookie("lugarActual", "arquitectura");
  window.location.replace("arquitectura.html");
}

function setPrincipal() {
  console.log("volver a la página principal");
  window.location.replace("pagprincipal.html");
}

function cerrarSesion() {
  var confirmacion = confirm("¿De verdad quieres cerrar sesión?");
  console.log(confirmacion);
  if (confirmacion) {
    document.cookie = "isregistrado=false";
    document.cookie = "usuarioActual=null"
    window.location.replace("login.html");
  }
}

function openForm() {
  document.getElementById("clearfix").style.display = "flex";
  document.getElementById("user").style.display = "none";
}

function closeForm() {
  document.getElementById("clearfix").style.display = "none";
  document.getElementById("user").style.display = "flex";
}

function encontrarCookie(valorCookie) {
  var cookies = document.cookie;
  cookies = cookies.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var declaradorYValor = cookies[i].split("=");
    if (declaradorYValor[0] == valorCookie || declaradorYValor[0] == " " + valorCookie) {
      return declaradorYValor[1];
    }
  }
  return null;
}

function cambiarCookie(declarador, valor) {
  document.cookie = declarador + "=" + valor + ";SameSite=Lax;max-age=" + 3600 * 24;
}

$(window).on("load", function () {
  var isRegistrado = encontrarCookie("isregistrado");
  if (isRegistrado == "true") {
    getVariables();
    document.getElementById("username").textContent = obtenerNombre();
    var rol = obtenerRol();
    if (rol == "estudiante") {
      document.getElementById("rol").textContent = "Estudiante";
    } else {
      document.getElementById("rol").textContent = "Profesor";
    }
  } else {
    window.location.replace("login.html");
  }
});