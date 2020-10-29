

function students(){
    document.getElementById("foro").style.display = "none";
    document.getElementById("califications").style.display = "none";
    document.getElementById("topics").style.display = "none";
    document.getElementById("students").style.display = "block";
    document.getElementById("navStudent").style.display = "none";
    document.getElementById("navCurso").style.display = "block";
    document.getElementById("navForo").style.display = "block";
    document.getElementById("navCalification").style.display = "block";
    document.getElementById("h4Curso").innerHTML = 'Estudiante';
}

function topics(){
    document.getElementById("foro").style.display = "none";
    document.getElementById("califications").style.display = "none";
    document.getElementById("students").style.display = "none";
    document.getElementById("topics").style.display = "block";
    document.getElementById("h4Curso").innerHTML = 'Curso';
    document.getElementById("navStudent").style.display = "block";
    document.getElementById("navCurso").style.display = "none";
    document.getElementById("navForo").style.display = "block";
    document.getElementById("navCalification").style.display = "block";
}

function foros(){
    document.getElementById("students").style.display = "none";
    document.getElementById("califications").style.display = "none";
    document.getElementById("topics").style.display = "none";
    document.getElementById("foro").style.display = "block";
    document.getElementById("h4Curso").innerHTML = 'Foro';
    document.getElementById("navStudent").style.display = "block";
    document.getElementById("navCurso").style.display = "block";
    document.getElementById("navForo").style.display = "none";
    document.getElementById("navCalification").style.display = "block";
}

function califications(){
    document.getElementById("topics").style.display = "none";
    document.getElementById("students").style.display = "none";
    document.getElementById("foro").style.display = "none";
    document.getElementById("califications").style.display = "block";
    document.getElementById("h4Curso").innerHTML = 'Calificaciones';
    document.getElementById("navStudent").style.display = "block";
    document.getElementById("navCurso").style.display = "block";
    document.getElementById("navForo").style.display = "block";
    document.getElementById("navCalification").style.display = "none";
}

function email(){
    console.log("hola");
    window.location.href = "mailto:";
}


function nuevoMensajeForo(mensajeNuevo, lugarMensaje, numeroMensaje, ultimoTiempo){
    var datos = document.getElementById(mensajeNuevo).value;
    if( datos.length <= 10){
        alert("No se puede publicar un post con menos de 10 letras");
        return;
    }
    var imagenActual= document.getElementById("imagenActual").outerHTML;
    var personaActual = document.getElementById("personaActual").innerHTML;
    var f = new Date();
    var fechaActual = f.getDate() + "/" + f.getMonth() + "/" + f.getFullYear() +"  " + f.getHours() + ":" + f.getMinutes();
    var nuevoTiempo = "Último mensaje: " + fechaActual; 
    document.getElementById(ultimoTiempo).innerHTML = nuevoTiempo;
    document.getElementById(numeroMensaje).innerHTML = parseInt(document.getElementById(numeroMensaje).innerHTML) + 1;
    document.getElementById(lugarMensaje).outerHTML = '<div class="mensaje"><div class="emisor">' + imagenActual + '<h4 class="nombreForo">' + personaActual + '</h4><h6 class="fechaForo">' +fechaActual+ '</h6></div><p class="mensajeForo">'+ datos + '</p></div><div id="'+lugarMensaje+ '"></div>';
}

