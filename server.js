// require express node module
var app = require('express')();
// express is used to initialize app to be a function handler used to supply to an HTTP server
var http = require('http').Server(app);
// requires socket.io for chat functionality in real time and initialized a new instance
// of socket.io by passing http (the HTTP server) object
var io = require('socket.io')(http);

// create index file and serve it when we visit localhost
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// listens for incoming sockets and logs each user in the console
io.on('connection', function(socket){
	console.log('a user connected');
	// listens for disconnects from the chat by any user (closing of tab or window or refreshes)
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
	// on socket connection of sending a message, the following will occur and be captured on client side (index page)
	socket.on('chat message', function(msg){
		// sends a message to everyone including the sender
		io.emit('chat message', msg);
		// logs message in terminal window
		console.log('message: ' + msg);
	});
});

// makes our http server listen on port 3000
http.listen(3000, function(){
  console.log('listening on port:3000');
});

// homework:
// Broadcast message to connected users when someone connects or disconnects.
// add support for nicknames.
// don't send the same message to user who sent it himself, append message directly as soon as enter is pressed.
// add "{user} is typing" functionality.
// show who's online.
// add private messaging.
// share improvements!