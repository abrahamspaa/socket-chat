const express = require('express'),
          app = express(),
     {static} = express,
         http = require('http').Server(app),
           io = require('socket.io')(http);

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(static(__dirname + '/source'));

io.on('connection', function(socket) {

 socket.on('chat', function(messageObject) {
  io.emit('chat', messageObject);
 });

});

http.listen(app.get('port'), function(){
  console.log(`listening on port ${app.get('port')} for chat`);
});
