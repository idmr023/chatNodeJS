$(function(){
    const socket = io();
    var identificador = '';

    //Acceder por id del DOM:
    const mensajesFormulario=$('#formulario-mensajes');
    const mensaje=$('#barra-mensaje');
    const chat=$('#chat');

    const fomularioAcceder=$("#fomulario-acceso");
    const mostrarError=$("#mensaje-error");
    const nombreEnviado=$("#nombre-ingresado");

    const nombresUsuarios=$("#nombres");

    // Función para mostrar la alerta de error
    function mostrarAlertaError(mensajeError) {
        mostrarError.html(`<div class="alert alert-danger">${mensajeError}</div>`);
    }

    //Nuevo usuario:
    fomularioAcceder.submit(e=>{
        e.preventDefault();
        if (nombreEnviado.val().trim() === '') {
            mostrarAlertaError('Ingrese un usuario');
        } else {
            socket.emit('nuevo usuario', nombreEnviado.val(), datos=>{
                if(datos){
                    identificador = nombreEnviado.val();
                    $('#inicio').hide();
                    $('#sesion-chat').show();
                } else {
                    mostrarAlertaError('El usuario ya existe');
                }
                nombreEnviado.val('');
            });
        }
    });

    //Eventos
    mensajesFormulario.submit( e =>{
        e.preventDefault();
        socket.emit('enviar mensaje', mensaje.val());
        mensaje.val('');
    });

    //Obtenemos respuesta del servidor:
    socket.on('nuevo mensaje', function(datos){
        //console.log(datos);

        let color="#f4f4f4";

        if(identificador==datos.username){
            color="#9ff4c5";
        }
        chat.append(`<div class="msg-area mb-2 d-flex align-items-center" style="background-color:${color}"><span class="material-symbols-outlined" style="color:black;padding-left:8px;">account_circle</span><p class="msg"><b>${datos.username}: </b>${datos.msg}</p></div>`);
    });

    //Obtenemos el array de usuarios conectados:
    socket.on('nombre usuario', datos=>{
        let html='';
        let color='';
        let salir= '';

        for(let i=0;i<datos.length;i++){
            if(identificador==datos[i]){
                color="#027f43";
                salir = `<a class="enlace-salir" href="/"><span class="material-symbols-outlined" style="font-size: 105%; vertical-align: middle; margin-right: 5px;color: ${color};">logout</span></a>`;
            }else{
                color="#919191";
                salir= '';
            }
            html +=`<p style="color: ${color}"><span class="material-symbols-outlined" style="font-size: 105%; vertical-align: middle; margin-right: 5px;">person</span>${datos[i]} ${salir}</p>`;
        }
        nombresUsuarios.html(html);
    });
})

