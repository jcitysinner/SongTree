
// Require Native Node.js Libraries
var express = require('express');
var app = express();
var http = require('http');
http = http.Server(app);
var io = require('socket.io')
io = io(http);

// Route our Assets
app.use('/assets/', express.static(__dirname + '/public/assets/'));

// Route our Home Page
app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// Route our Login Page
app.get('/login', function(req, res){
  res.sendFile(__dirname + '/public/login.html');
});

// Route our Signup Page
app.get('/signup', function(req, res){
  res.sendFile(__dirname + '/public/signup.html');
});

// Route our Main Page
app.get('/main', function(req, res){
  res.sendFile(__dirname + '/public/main.html');
});

// Handle Socket Connection
io.on('connection', function(socket){
  console.log('A User Connected');

  //handle message event
  socket.on('song', function(data){
  	io.emit('update', data);
  })

  socket.on('message', function(message){
    io.emit('post', message);
  })
  
});

// Start Server
http.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = http.address();
  console.log("Server started at", addr.address + ":" + addr.port);
});
