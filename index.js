var app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat', function(msg){
    io.emit('chat', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000 for chat');
});
