var express = require('express');
var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

var messages = [
	/*
	{  
	    author: "Franklin",
	    text: "Hola! que tal?"
	},
	{
	    author: "Cliente 01",
	    text: "Muy bien! y tu??"
	},
	{
	    author: "Franklin",
	    text: "Genial!"
	}*/
	{
		id: 1,
		text: "Hola esta es una practica websocket",
		author: "Franklin Condori"
	}
];

app.use(express.static('public'));

app.get('/home', function(rep, res){
	res.status(200).send("Hola mundo! :P");
});

io.on('connection', function(socket){
	console.log('Alguien se conecto mediante Sockets');
	socket.emit('messages', messages);

	socket.on('new-message', function(data){
		messages.push(data);
		io.sockets.emit('messages', messages);
	});
});

server.listen(8002, function(){
	console.log("Servidor corriendo... en http://localhost:8002");
});

