"use strict";
var express = require('express');
var app = express();
const events = require('events');
var socket = require('socket.io');
//var ytaudio = require('./audioStream');
var server = app.listen(3000,function(){
    console.log('Server running on port 3000');
});

app.use(express.static('public'));
const linkEmitter = new events.EventEmitter();
function callPython(message, sendData){
    // console.log('Inside Python');
    var spawn = require("child_process").spawn;

    var process = spawn('python',['./youtube.py', message]);
    // console.log('Still There');
    process.stdout.on('data', function(data) {
        //console.log(data.toString());
        linkEmitter.emit('link-received', data);

    } );
    // console.log('Leaving');
}
var io = socket(server);
io.on('connection', function(socket){
   console.log(`made socket connection ${socket.id}`);
   socket.on('chat', function(data){
       var message = data.message.toString();
       if((message.toString()).lastIndexOf(';;')===0){
           console.log('Bot Command');
           callPython(message.slice(2),data);

           //console.log('It emitted')
       }
       io.sockets.emit('chat', data);
   });
   socket.on('typing', function(data){
       //console.log(data);
       socket.broadcast.emit('typing', data);
   });
    linkEmitter.on('link-received', (link)=> {
        console.log(link.toString());
        link = link.toString();
        //ytaudio()
       const res ={message: link,
       handle: 'bot'};
        //taudio.getaudio(link,);
       io.sockets.emit('chat', res);
    });
});
