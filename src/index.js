const express = require('express');
const path = require('path');

const page = express();

const server = require('http').Server(page);

const socketio = require('socket.io')(server);

page.set('port', process.env.PORT || 3000);

//Ejecutar la funcion de sockets.js
require('./sockets')(socketio);

//Archivos estáticos:

page.use(express.static(path.join(__dirname, 'public')));

server.listen(page.get('port'), () =>{
    console.log('Servidor en el puerto', page.get('port'));
} )