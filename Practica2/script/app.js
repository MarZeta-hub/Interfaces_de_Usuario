
var cookies = document.cookie;
cookies = cookies.split(";");
$(window).on("load",function(){
for(var i = 0; i <cookies.length ; i++ ){
	var nombre= cookies[i].split("=");
	console.log(nombre[0]);
	console.log(nombre[1]);
	if(nombre[0] == "isregistrado" || nombre[0] == " isregistrado"){
		console.log(nombre[1]);
		var valorRegistrado = nombre[1];
		if(valorRegistrado == "true"){
				document.getElementById("registroeInicio").style.display= "none";
				document.getElementById("registro").style.display = "none";
				document.getElementById("usuarioRegistrado").style.display = "block";
		}
	}	
	if(nombre[0] == "nombre" || nombre[0] == " nombre"){
		console.log(nombre[1]);
		document.getElementById("nombreHeader").innerText = nombre[1];
		document.getElementById("nombreForoID2").innerText = nombre[1];
		document.getElementById("nombreForoID3").innerText = nombre[1];
		document.getElementById("nombreForoID4").innerText = nombre[1];
		document.getElementById("nombreForoID5").innerText = nombre[1];
		document.getElementById("nombreForoID1").innerText = nombre[1];
		
	}
	if(nombre[0] == "rol" || nombre[0] == " rol"){
		if(nombre[1]=="estudiante"){
			document.getElementById("navStudent2").style.display = "none";
			document.getElementById("navStudent").style.display = "none";
		}
		
	}

}
});

function obtenerRol(){
	var cookies = document.cookie;
cookies = cookies.split(";");
for(var i = 0; i <cookies.length ; i++ ){
	var nombre= cookies[i].split("=");
	console.log(nombre[0]);
	console.log(nombre[1]);
	if(nombre[0] == "rol" || nombre[0] == " rol"){
		if(nombre[1] == "estudiante")return "estudiante"
		else return "profesor";
	}
}
}


function iniciosesion(){
	var iemail = document.getElementById("iemail").value;
	var ipass = document.getElementById("ipassword").value;
	var warnings = document.getElementById("iwarnings").value;

//Email con formato valido
	if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(iemail))){
		alert('El email, no posee un formato valido');
		return false;
	}

//Contraseña menor de 8 caracteres
	var contraseña = new RegExp("^[a-zA-Z0-9\s]+$");
	if(ipass.length>8 || !contraseña.test(ipass)){
		alert('La contraseña no es valida, debe ser menor de 8 caracteres de tipo [a-z0-9]');
		return false;
	}

	var cookies = document.cookie;
	cookies = cookies.split(";");
	var isEmail = 0;
	var isPass = 0;
	for(var i = 0; i <cookies.length ; i++ ){
		var nombre= cookies[i].split("=");
		if(nombre[0] == "email" || nombre[0] == " email"){
			var emailObtenido = nombre[1];
			if(iemail == emailObtenido){
				isEmail = 1;
			}
		}
		console.log(nombre[0]);
		if(nombre[0] == " pass" || nombre[0] == "pass"){
			var passObtenido = nombre[1];
			if(ipass == passObtenido){
				isPass = 1;
			}else{
			}
		}

	}
	
	if(isEmail == 1 && isPass == 1){
		var expiresdate = new Date(2068, 1, 02, 11, 20);
		document.cookie = "isregistrado=true; SameSite=None"+"; expires=" + expiresdate.toUTCString();
		return true;
	}

	alert("La contraseña o el email no coinciden");
	return false;
	

}



function registro(){
	var username=document.getElementById("username").value
	var nia=document.getElementById("nia").value
	var rpass=document.getElementById("rpassword").value; 
	var name=document.getElementById("name").value;
	var remail=document.getElementById("remail").value;
	var fecha=document.getElementById("fecha").value;
	var dni=document.getElementById("dni").value;
	var rol=document.getElementById("rol").value;
	var grado=document.getElementById("grado").value;
	var uni=document.getElementById("universidad").value;
	var idioma=document.getElementById("idioma").value;
	var condiciones=document.getElementById("condiciones");

									//INFORMACION DE LA CUENTA

//Verificar que el NIA tiene un formato correcto
	if( isNaN(nia) || nia.length!=9 || nia.charAt(0)!=1 || nia.charAt(1)!=0 || nia.charAt(2)!=0 ) {
		alert("El NIA no es valido, debe tener exactamente 9 caracteres y empezar por 100");
		return false;
	}

//Contraseña menor de 8 caracteres
	var contraseña = new RegExp("^[a-zA-Z0-9\s]+$");
	if(rpass.length>8 || !contraseña.test(rpass)){
		alert('La contraseña no es valida, debe ser menor de 8 caracteres de tipo [a-z0-9]');
		return false;
	}

									//INFORMACION PERSONAL
//Verificar que el nombre y apellidos tiene un formato correcto
	var letras1 = new RegExp(/^([a-zA-Z]+)(\s)([a-zA-Z]+)(\s)([a-zA-Z]+)$/);
	if(!letras1.test(name)) {
		alert("Un nombre no puede poseer numeros");
		return false;
	}

//Email con formato valido
	if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(remail))){
		alert('El email, no posee un formato valido');
		return false;
	}


//Verificar que el DNI tiene un formato correcto
	var letras2 = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E', 'T'];
	if(dni.charAt(8) != letras2[(dni.substring(0, 8))%23]) {
		alert("El DNI debe contener solo numeros y una letra valida al final.\n Recuerda que en el DNI, la última letra verifica el número de DNI.");
		return false;
	}
	if( !(/^\d{8}[A-Z]$/.test(dni)) ) {
		alert("El DNI debe contener solo numeros y una letra valida al final");
		return false;
	}

//Verificar que se ha seleccionado un ROL
	if( rol == null || rol == "rol" ) {
		alert("Se debe seleccionar uno de los roles disponibles");
		return false;
	}

//Verificar que se ha seleccionado un grado
	if( grado == null || grado == "grado" ) {
		alert("Se debe seleccionar uno de los grados disponibles");
		return false;
	}

//Verificar que se ha seleccionado un idioma
	if( idioma == null || idioma == "idioma" ) {
		alert("Se debe seleccionar uno de los idiomas disponibles");
		return false;
	}


//Verificar que el checkbox ha sido marcado
	if( !condiciones.checked ) {
		alert("Las condiciones y politicas de privacidad no han sido aceptadas");
		return false;
	}
	var expiresdate = new Date(2068, 1, 02, 11, 20);
	document.cookie = "email="+ remail+"; expires=" + expiresdate.toUTCString();
	document.cookie = "pass="+ rpass+"; expires=" + expiresdate.toUTCString();
	document.cookie = "nombre="+ name+"; expires=" + expiresdate.toUTCString();
	document.cookie = "rol="+ rol+"; expires=" + expiresdate.toUTCString();

	return true;


}

function iregistro(){
	document.getElementById("iniciosesion").style.display="none";
	document.getElementById("registro").style.display="block";
}

function iinicio(){
	document.getElementById("iniciosesion").style.display="block";
	document.getElementById("registro").style.display="none";

}
