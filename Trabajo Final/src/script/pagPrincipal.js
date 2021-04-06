/**
 * CODIGO DE LA PÁGINA PRINCIPAL
 */

function mostrarAsignaturas() {
  switch (parseInt(obtenerAsignatura())) {
    case 1:
      document.getElementById("InterfacesU").style.display = "none";
      document.getElementById("IngenieriaS").style.display = "none";
      break;
    case 2:
      document.getElementById("arquitectura").style.display = "none";
      document.getElementById("IngenieriaS").style.display = "none";
      break;
    case 3:
      document.getElementById("arquitectura").style.display = "none";
      document.getElementById("InterfacesU").style.display = "none";
      break;
    default:
      //todas
      break;
  }
}

var cookies = document.cookie;
cookies = cookies.split(";");
$(window).on("load", function () {
  mostrarAsignaturas();
  calendario();
});

function calendario() {
  var sampleEvents = [];
  sampleEvents.push({
    title: "Hoy",
    date: new Date().getTime(), // last week
    link: "#"
  });
  var lugar1 = "interfaces";
  var lugar2 = "arquitectura";
  var lugar3 = "ingenieria";
  var arraydatos = [encontrarCookie(lugar1),encontrarCookie(lugar2), encontrarCookie(lugar3)] ;
  for(var k= 0; k< arraydatos.length;k++){
    var datos = JSON.parse(arraydatos[k]);
    if( datos == null){
      continue;
    }
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
