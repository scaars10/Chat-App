"use strict";
var express = require('express');
var app = express();
var socket = require('socket.io');

var server = app.listen(3000,function(){
    console.log('Server running on port 3000');
});

app.use(express.static('public'));

var io = socket(server);
io.on('connection', function(socket){
   console.log(`made socket connection ${socket.id}`);
   socket.on('chat', function(data){
       //console.log(data);
       io.sockets.emit('chat', data);
   });
   socket.on('typing', function(data){
       //console.log(data);
       socket.broadcast.emit('typing', data);
   })
});