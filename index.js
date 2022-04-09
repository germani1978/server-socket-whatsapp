const express = require('express');
const res = require('express/lib/response');

const port = process.env.PORT || 3000;
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var clients = {};

// app.use(express.json());


io.on('connection', (socket) => { 
    console.log('usuario conectado', socket.id); 

    socket.on('disconnect', () => { 
        console.log('usuario desconectado'); 
    });

    socket.on('signin', (id) => {
        console.log(id);
        clients[id] = socket;
    } );

    socket.on("message", (msg) => {
        console.log(msg);
        let targetId = msg.targetId;
        if (clients[targetId]) clients[targetId].emit('message', msg);
    })
});

app.route("/check").get( (req, res) => {
    return res.json("Tu app esta trabajando bien");
});

server.listen(port, (err) => {
    console.log('Servidor corriendo en puerto:',port);
});

