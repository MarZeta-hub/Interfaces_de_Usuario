

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


function nuevoMensajeForo(){
    var datos = document.getElementById("tema1Nuevo").value;
    document.write(datos);
}