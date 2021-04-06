function agregarNuevoEntregable(entregable) {
    /* Obtengo todos los alumnos */
    var personas = encontrarCookie("usuario");
    personas = personas.split("%");
    var estudiantes = [];
    for (var i = 0; i < personas.length; i++) {
        var nombre = personas[i].split("|");
        if (nombre[3] == "estudiante" || nombre[3] == " estudiante") {
            estudiantes.push({
                "Nombre": nombre[2],
                "Nota": "-"
            });
        }
    }
    var calEntregable = [];
    var lugarActual = encontrarCookie("lugarActual");
    var cookieEntregables = encontrarCookie(lugarActual + "C");
    var entregables = JSON.parse(cookieEntregables);
    if (entregables == null) {
        calEntregable.push({
            "Entregable": entregable,
            "Alumnos": estudiantes
        });
        entregables = calEntregable;
    } else {
        entregables.push({
            "Entregable": entregable,
            "Alumnos": estudiantes
        });
    }
    cambiarCookie(lugarActual + "C", JSON.stringify(entregables));
}

function agregarNuevoAlumno(alumno) {
    /* Obtengo todos los entregables */
    var lugarActual = encontrarCookie2("lugarActual");
    var cookieEntregables = encontrarCookie2(lugarActual + "C");
    var entregables = JSON.parse(cookieEntregables);
    if (entregables == null) return;
    for (var i = 0; i < entregables.length; i++) {
        entregables[i].Alumnos.push({
            "Nombre": alumno,
            "Nota": "-"
        });
    }
    cambiarCookie2(lugarActual + "C", JSON.stringify(entregables));
}

/* Tengo que hacer esto debido a fallos de compatibilidad entre allScripts y Login */
function encontrarCookie2(valorCookie) {
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

/* Tengo que hacer esto debido a fallos de compatibilidad entre allScripts y Login */
function cambiarCookie2(declarador, valor) {
    document.cookie = declarador + "=" + valor + ";SameSite=Lax;max-age=" + 3600 * 24;
}

function genera_tabla() {
    var posicion = document.getElementById("calificacionesTabla");

    var tabla = document.createElement("table");
    tabla.id = "tabla";
    var tblBody = document.createElement("tbody");

    var lugar = encontrarCookie2("lugarActual");
    console.log(lugar+"C");
    var datos = encontrarCookie2(lugar + "C");
    console.log(datos);
    var calificaciones = JSON.parse(datos);
    var hilera = document.createElement("tr");
    var celda = document.createElement("td");
    var textoCelda = document.createTextNode("");
    celda.appendChild(textoCelda);
    hilera.appendChild(celda);
    tblBody.appendChild(hilera);
    console.log(calificaciones);
    if(calificaciones == null){
        console.log("Las calificaciones están vacías");
        return;
    }
    for (var i = 0; i < calificaciones.length; i++) {
        celda = document.createElement("td");
        textoCelda = document.createTextNode(calificaciones[i].Entregable);
        celda.appendChild(textoCelda);
        hilera.appendChild(celda);
    }

    if (obtenerRol() == "profesor") {
        tblBody.appendChild(hilera);
        for (var j = 0; j < calificaciones[0].Alumnos.length; j++) {
            var hilera = document.createElement("tr");
            console.log(calificaciones[0].Alumnos.length);
            var celda = document.createElement("td");
            var textoCelda = document.createTextNode(calificaciones[0].Alumnos[j].Nombre);
            celda.appendChild(textoCelda);
            console.log(calificaciones[0].Alumnos[j].Nombre);
            hilera.appendChild(celda);
            for (var k = 0; k < calificaciones.length; k++) {
                var celda2 = document.createElement("td");
                var textArea = document.createElement("input");
                textArea.setAttribute("type", "text");
                textArea.value = calificaciones[k].Alumnos[j].Nota;
                celda2.appendChild(textArea);
                hilera.appendChild(celda2);
            }
            tblBody.appendChild(hilera);
        }
    } else {
        var nombre = obtenerNombre();
        tblBody.appendChild(hilera);
        for (var j = 0; j < calificaciones[0].Alumnos.length; j++) {
            var hilera = document.createElement("tr");
            var celda = document.createElement("td");
            if (nombre == calificaciones[0].Alumnos[j].Nombre) {
                var textoCelda = document.createTextNode(calificaciones[0].Alumnos[j].Nombre);
                celda.appendChild(textoCelda);
                console.log(calificaciones[0].Alumnos[j].Nombre);
                hilera.appendChild(celda);
                for (var k = 0; k < calificaciones.length; k++) {
                    var celda2 = document.createElement("td");
                    var textArea = document.createElement("input");
                    textArea.setAttribute("type", "text");
                    textArea.value = calificaciones[k].Alumnos[j].Nota;
                    celda2.appendChild(textArea);
                    hilera.appendChild(celda2);
                }
            }
            tblBody.appendChild(hilera);
        }
    }
    tabla.appendChild(tblBody);
    posicion.appendChild(tabla);
    const botonExcel = document.createElement("button");
    botonExcel.setAttribute("onclick", "descargarExcel()");
    botonExcel.textContent = "Descarga el XLS";
    posicion.appendChild(botonExcel);
    tabla.setAttribute("border", "2");
}


function descargarExcel() {
    $("#tabla").table2excel({
        filename: "Notas 20-21 del al",
        fileext: ".xls"
    });
}