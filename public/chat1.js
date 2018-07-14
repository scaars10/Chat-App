window.onload = function() {
    var socket = io.connect('http://localhost:3000');
    var message = document.getElementById('message');
    var handle = document.getElementById('handle');
    var btn = document.getElementById('send');
    var output = document.getElementById('output');
    var feedback = document.getElementById('feedback');
    btn.addEventListener('click', function () {
        //console.log('Button Clicked');
        socket.emit('chat', {
            message: message.value,
            handle: handle.value
        });
    });
    message.addEventListener('keypress', function(){
        socket.emit('typing', handle.value);
    });

//Listen for events

    socket.on('chat', function (data) {
        output.innerHTML += `<p>${data.handle}: ${data.message}</p>`;
        feedback.innerHTML = "";
    });
    socket.on('typing', function(data){
        //console.log(data);
        feedback.innerHTML = `<em>${data} is typing</em>`;
    });
};