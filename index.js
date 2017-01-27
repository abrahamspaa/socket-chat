const express = require('express'),
          app = express(),
     {static} = express,
         http = require('http').Server(app),
           io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(static(__dirname + '/source'));

io.on('connection', function(socket) {

 socket.on('chat', function(messageObject) {
  io.emit('chat', messageObject);
 });

});

http.listen(3000, function(){
  console.log('listening on *:3000 for chat');
});
