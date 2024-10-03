 //Me permite crear el servidor
const express = require('express');

//Me permite trabajar en un entorno web
const http = require('http'); 

//Importo el modulo de socket.io
const socketIo = require('socket.io'); 

//Front
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static('public'));

//Logica del chat
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');

    socket.on('chat message', (data) => {
        //Coloco la fecha y hora
        const timestamp = new Date().toLocaleDateString([], {hour: "2-digit", minute: "2-digit"});
        const messageData = {...data, timestamp};
        io.emit('chat message', messageData);
    });

    socket.on('disconnect', () =>{
        console.log('Un usuario se ha desconectado');
    });
});

//Corro el servidor en el puerto indicado
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
