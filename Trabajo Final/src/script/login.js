var cookies = document.cookie;
cookies = cookies.split(";");
$(window).on("load", function () {
	for (var i = 0; i < cookies.length; i++) {
		var nombre = cookies[i].split("=");
		if (nombre[0] == "isregistrado" || nombre[0] == " isregistrado") {
			var valorRegistrado = nombre[1];
			if (valorRegistrado == "true") {
				window.location.replace("pagprincipal.html");
				return;
			}
		}
	}
});

function iniciosesion() {
	var iemail = document.getElementById("iemail").value;
	var ipass = document.getElementById("ipass").value;

	//Email con formato valido
	if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(iemail))) {
		alert('El email, no posee un formato valido');
		return false;
	}

	//Contraseña menor de 8 caracteres
	var contraseña = new RegExp("^.{1,8}$");
	if (!contraseña.test(ipass)) {
		alert('La contraseña no es valida, debe ser menor de 8 caracteres de tipo [a-z0-9]');
		return false;
	}

	var cookies = document.cookie;
	cookies = cookies.split(";");
	for (var i = 0; i < cookies.length; i++) {
		var nombre = cookies[i].split("=");
		console.log(nombre);
		if (nombre[0] == "usuario" || nombre[0] == " usuario") {
			var usuarios = nombre[1].split("%");
			for (var j = 0; j < usuarios.length; j++) {
				var variablesUsuario = usuarios[j].split("|");
				if (variablesUsuario[0] == iemail) {
					if (variablesUsuario[1] == ipass) {
						var usuario = variablesUsuario[0] + "|" + variablesUsuario[2] + "|" + variablesUsuario[3] + "|" + variablesUsuario[4];
						var expiresdate = new Date(2068, 1, 02, 11, 20);
						document.cookie = "isregistrado=true;SameSite=Lax;expires=" + expiresdate.toUTCString();
						document.cookie = "usuarioActual=" + usuario + ";SameSite=Lax;expires=" + expiresdate.toUTCString();
						return true;
					} else {
						alert("La contraseña no coincide");
						return false;
					}
				}
			}
			break;
		}
	}
	alert("El email no está registrado");
	return false;
}

function registro() {
	var rpass = document.getElementById("rpass").value;
	var name = document.getElementById("name").value;
	var remail = document.getElementById("remail").value;
	var rol = document.getElementById("rol").value;
	var condiciones = document.getElementById("condiciones");

	//Contraseña menor de 8 caracteres
	var contraseña = new RegExp("^.{1,8}$");
	if (!contraseña.test(rpass)) {
		alert('La contraseña no es valida, debe ser menor de 8 caracteres de tipo [a-z0-9]');
		return false;
	}

	//INFORMACION PERSONAL

	//Verificar que el nombre y apellidos tiene un formato correcto
	var letras1 = new RegExp("^[^0-9]{1,}$");
	if (!letras1.test(name)) {
		alert("Un nombre no puede poseer numeros, además de que debe añadir los apellidos");
		return false;
	}

	//Email con formato valido
	if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(remail))) {
		alert('El email, no posee un formato valido');
		return false;
	}

	//Verificar que se ha seleccionado un ROL
	if (rol == null || rol == "rol") {
		alert("Se debe seleccionar uno de los roles disponibles");
		return false;
	}

	//Verificar que el checkbox ha sido marcado
	if (!condiciones.checked) {
		alert("Las condiciones y politicas de privacidad no han sido aceptadas");
		return false;
	}
	//Asignaturas de forma automatica a las que se va a agregar el usuario


	//Verificar que el correo electrónico no es igual al anterior y agregar la cookie
	//crear las nuevas cookies
	var expiresdate = 3600 * 24;
	var coockieAntigua = document.cookie;
	var newUser;
	var asignaturaProfesor = Math.round(Math.random() * (3 - 1) + 1);
	if (rol == "profesor") {
		newUser = remail + "|" + rpass + "|" + name + "|" + rol + "|" + asignaturaProfesor + "%";
	} else {
		newUser = remail + "|" + rpass + "|" + name + "|" + rol + "|0%";
	}

	coockieAntigua = coockieAntigua.split(";");
	for (var i = 0; i < coockieAntigua.length; i++) {
		var usuario = coockieAntigua[i].split("=");
		if (usuario[0] == "usuario" || usuario[0] == " usuario") {
			var baseUsuarios = usuario[1].split("%");
			for (var j = 0; j < baseUsuarios.length; j++) {
				var variablesUsuario = baseUsuarios[j].split("|");
				if (variablesUsuario[0] == remail) {
					alert("El correo que estás metiendo ya está en uso");
					return false;
				}
			}
			newUser = usuario[1] + newUser;
			break;
		}
	}
	document.cookie = "usuario=" + newUser +";SameSite=Lax;max-age=" + 3600 * 24;
	agregarNuevoAlumno(name);
	alert("Te has registrado correctamente");
	return true;
}

function getIniciosesion() {
	var x = document.getElementById("iniciosesion");
	var y = document.getElementById("registro");
	var z = document.getElementById("elegir");
	x.style.left = "50px";
	y.style.left = "450px";
	z.style.left = "0px";
}

function getRegistro() {
	var x = document.getElementById("iniciosesion");
	var y = document.getElementById("registro");
	var z = document.getElementById("elegir");
	x.style.left = "-400px";
	y.style.left = "50px";
	z.style.left = "120px";
}