
$(function(){
    $("#calendario").simpleCalendar({

        // displays events
        displayEvent: true,
    
        // event dates
        events: [
          {
            startDate: new Date("11/10/2020").toDateString(),
            endDate: new Date("11/10/2020").toDateString(),
            summary: 'Tema 4'
          },
          {
            startDate: new Date("11/11/2020").toDateString(),
            endDate: new Date("11/11/2020").toDateString(),
            summary: 'Videos tema 4'
          },
          {
            startDate: new Date("11/17/2020").toDateString(),
            endDate: new Date("11/17/2020").toDateString(),
            summary: 'Tema 5'
          },
          {
            startDate: new Date("11/18/2020").toDateString(),
            endDate: new Date("11/18/2020").toDateString(),
            summary: 'Videos tema 5'
          },
          {
            startDate: new Date("11/18/2020").toDateString(),
            endDate: new Date("11/18/2020").toDateString(),
            summary: 'Creacion foro tema 6'
          },
          {
            startDate: new Date("11/25/2020").toDateString(),
            endDate:  new Date("11/25/2020").toDateString(),
            summary: 'Tema 6'
          },
          {
            startDate: new Date("11/26/2020").toDateString(),
            endDate: new Date("11/26/2020").toDateString(),
            summary: 'Videos tema 6'
          },
          {
            startDate: new Date("11/26/2020").toDateString(),
            endDate: new Date("11/26/2020").toDateString(),
            summary: 'Creacion foro tema 7'
          },
          {
            startDate: new Date("12/01/2020").toDateString(),
            endDate: new Date("12/01/2020").toDateString(),
            summary: 'Tema 7 '
          },
          {
            startDate: new Date("12/02/2020").toDateString(),
            endDate: new Date("12/02/2020").toDateString(),
            summary: ' Videos tema 7'
          },
        ],
      
        // disable showing event details
        disableEventDetails: false,
      
        // disable showing empty date details
        disableEmptyDetails: false 
      
      });
    
})
function ocultarTodo(){
  document.getElementById("foro").style.display = "none";
  document.getElementById("califications").style.display = "none";
  document.getElementById("topics").style.display = "none";
  document.getElementById("students").style.display = "none";
  blockAndNoneAside();
}

function bloquearTodoLateral(){
  document.getElementById("navStudent").style.display = "block";
  document.getElementById("navCurso").style.display = "block";
  document.getElementById("navForo").style.display = "block";
  document.getElementById("navCalification").style.display = "block";


  document.getElementById("navStudent2").style.display = "block";
  document.getElementById("navForo2").style.display = "block";
  document.getElementById("navCalifications2").style.display = "block";
  document.getElementById("navTopics2").style.display = "block";
  ultimoProximoNav();
  
}

function students(){
    ocultarTodo();
    bloquearTodoLateral();
    document.getElementById("students").style.display = "block";
    document.getElementById("navStudent").style.display = "none";
    document.getElementById("navStudent2").style.display = "none";
    document.getElementById("h4Curso").innerHTML = 'Estudiantes';
    document.getElementById("paginaActual").innerHTML = 'Estudiantes';
}

function topics(){ 
    ocultarTodo();
    bloquearTodoLateral();
    document.getElementById("topics").style.display = "block";
    document.getElementById("h4Curso").innerHTML = 'Curso';
    document.getElementById("navCurso").style.display = "none";
    document.getElementById("navTopics2").style.display = "none";
    document.getElementById("paginaActual").innerHTML = 'Curso';
}

function foros(){
    ocultarTodo();
    bloquearTodoLateral();
    document.getElementById("foro").style.display = "block";
    document.getElementById("h4Curso").innerHTML = 'Foro';
    document.getElementById("navForo").style.display = "none";
    document.getElementById("navForo2").style.display = "none";
    document.getElementById("paginaActual").innerHTML = 'Foro';
}

function califications(){
    ocultarTodo();
    bloquearTodoLateral();
    document.getElementById("califications").style.display = "block";
    document.getElementById("h4Curso").innerHTML = 'Calificaciones';
    document.getElementById("navCalification").style.display = "none";
    document.getElementById("navCalifications2").style.display = "none";
    document.getElementById("paginaActual").innerHTML = 'Calificaciones';
}

function ultimo(){
    ocultarTodo();
    bloquearTodoLateral()
    document.getElementById("proximosEventos").style.display = "none";
    document.getElementById("ultimosEventos").style.display = "block";
    document.getElementById("aside").style.display = "block";
    document.getElementById("navUltimo").style.display = "none";
    document.getElementById("navUltimo2").style.display = "none";
    document.getElementById("paginaActual").innerHTML = 'Últimos Eventos';
}

function proximo(){
  ocultarTodo();
  bloquearTodoLateral()
  document.getElementById("proximosEventos").style.display = "block";
  document.getElementById("ultimosEventos").style.display = "none";
  document.getElementById("aside").style.display = "block";
  document.getElementById("navProximo").style.display = "none";
  document.getElementById("navProximo2").style.display = "none";
  document.getElementById("paginaActual").innerHTML = 'Próximos Eventos';
}

function blockAndNoneAside(){
  if(screen.width < 768) document.getElementById("aside").style.display = "none";
  else document.getElementById("aside").style.display = "block";
}

function ultimoProximoNav(){
  if(screen.width < 768) {
    document.getElementById("navUltimo2").style.display = "block";
    document.getElementById("navProximo2").style.display = "block";
    document.getElementById("navProximo").style.display = "block";
    document.getElementById("navUltimo").style.display = "block";
  }else {
    document.getElementById("navUltimo2").style.display = "none";
    document.getElementById("navProximo2").style.display = "none";
    document.getElementById("navProximo").style.display = "none";
    document.getElementById("navUltimo").style.display = "none";
  }
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


window.addEventListener('click', function(e){   
    if (!document.getElementById('proximosEventos').contains(e.target) && !document.getElementById('calendario').contains(e.target)){
        document.getElementById("calendario").style.display ="none";
    }
});

function abrirCalendario(){
    document.getElementById("calendario").style.display ="block";
}

