// Correr con node 8

var express = require('express');
var app = express();
var io = require('socket.io')(app.listen(8081));
var five = require('johnny-five');

app.use(express.static(__dirname + '/app'));

app.get('/', function (req,res) { 
  	res.sendFile(__dirname + '/index.html');
});

var board = new five.Board({
  	repl:false
});

board.on('ready', function () {
    /***
     * Enciende, apaga y hace parpadear un LED 
    ***/

    // var led = new five.Led(13);
    // var blink = false;

    // led.on();

    // io.on('connection', function (socket) {
    //     socket.on('stop', function (){
    //         if (blink){
    //             led.stop(); // to stop blinking
    //             blink = false;
    //         }
    //         else{
    //             led.blink(300);
    //             blink = true;
    //         }
    //     });
                    
    //     socket.on('off', function (){
    //         led.off();  // to shut it off (stop doesn't mean "off")
    //     });

    //     socket.on('on', function (){
    //         led.on(); // to turn on, but not blink
    //     });

    // });

    /***
     *  Lee sensor de luminosidad 
    ***/
    var self = this;
    io.on('connection', function(socket) {
        self.pinMode(0, five.Pin.ANALOG);
        self.analogRead(0, function(voltage) {
            console.log(voltage);
            socket.emit('voltage', { data: voltage });
        });
    })
});