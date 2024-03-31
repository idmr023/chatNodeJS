module.exports = (io) =>{
    
    let listaNombres=[];

    io.on('connection', socket =>{
        //Al recibir un mensaje se recoje los datos: 
        socket.on('enviar mensaje', (datos) =>{
            io.sockets.emit('nuevo mensaje', {
                msg:datos,
                username:socket.nombre
            });
        });

        socket.on('nuevo usuario',(datos,callback)=>{
            if(listaNombres.indexOf(datos) != -1 ){
                callback(false);
            }else{
                callback(true);
                socket.nombre=datos;
                listaNombres.push(socket.nombre);

                io.sockets.emit('nombre usuario', listaNombres);
            }
        });

        socket.on('disconnect', datos=>{
            if(!socket.nombre){
                return;
            }else{
                listaNombres.splice(listaNombres.indexOf(socket.nombre),1);
                io.sockets.emit('nombre usuario', listaNombres);
            }
        });
    })
}

