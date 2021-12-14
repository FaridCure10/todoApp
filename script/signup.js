/* -------------------------------------------------------------------------- */
/*                   logica aplicada en la pantalla de LOGIN                  */
/* -------------------------------------------------------------------------- */
const apiUrl = 'https://ctd-todo-api.herokuapp.com/v1/users';

window.addEventListener('load', function(){

    const formulario = this.document.forms[0];
    const inputNpmbre = this.document.querySelector('#inputNombre');
    const inputApellido = this.document.querySelector('#inputApellido');
    const inputEmail = this.document.querySelector('#inputEmail');
    const inputPassword = this.document.querySelector('#inputPassword');
    const inputPasswordRepetida = this.document.querySelector('#inputPasswordRepetida');

    formulario.addEventListener('submit', function(e){
        e.preventDefault();

        const validacion = validacionNoVacio(inputNpmbre.value) && validacionNoVacio(inputApellido.value) && validacionNoVacio(inputEmail.value) && validacionNoVacio(inputPassword.value) && validacionNoVacio(inputPasswordRepetida.value);

        if(validacion){
            const datosUsuario = normalizacionRegister(inputPassword.value, inputPasswordRepetida.value);
            fetchApiRegister(apiUrl, datosUsuario);
        }else{
            console.log("algun dato no es correcto");
        }

        formulario.reset();

    })

})


/* -------------------------------------------------------------------------- */
/*                      seccion de funciones disponibles                      */
/* -------------------------------------------------------------------------- */

function validacionNoVacio(texto){
    let resultado = true;

    if(texto === ""){
        resultado = false;
    }

    return resultado;
}

function validacionAmbasPassword(password1, password2){
    let resultado = true;

    if(password1 != password2){
        resultado = false;
    }

    return resultado;
}

function normalizacionRegister(nombre, apellido, email, password){
    const usuario = {
        firstName: nombre.trim(),
        lastName: apellido.trim(),
        email: email.toLowerCase().trim(),
        password: password.trim()
    }

    return usuario;
}

function fetchApiRegister(url, payload){

    const configuraciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    fetch(url,configuraciones)
    .then( Response => {
        return Response.json();
    })

    .then( data => {
        if(!data.jwt){
            alert(data);
        }

        if(data.jwt){
            localStorage.setItem('jwt', data.jwt);
            location.href = './mis-tareas.html'
        }
    }).catch( error => console.log(error));
}