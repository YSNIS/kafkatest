var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path'),
    bodyParser = require('body-parser'),
    kafka = require('kafka-node'),
    HighLevelConsumer = kafka.HighLevelConsumer,
    client = new kafka.Client(),
    messages = [],
    consumer = new HighLevelConsumer(
        client,
        [
            { topic: 'test' }
        ]
    )

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('someone joined');
});

consumer.on('message', function (message) {
    if (message.value) {
        console.log(message);
        console.log(message.value);
        io.emit('message', message.value);
    }
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});



// var express = require('express'),
//     app = express(),
//     http = require('http').Server(app),
//     path = require('path'),
//     bodyParser = require('body-parser'),
//     kafka = require('kafka-node'),
//     HighLevelConsumer = kafka.HighLevelConsumer,
//     client = new kafka.Client(),
//     messages = [],
//     io = require('socket.io')(http),
//     consumer = new HighLevelConsumer(
//         client,
//         [
//             { topic: 'test' }
//         ]
//     )
//
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use('/public', express.static(__dirname + '/public'));
//
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// })
//
// io.on('connection', function(socket){
//   console.log('a user connected');
// });
//
// consumer.on('message', function (message) {
//     if (message.value) {
//         console.log(message.value);
//     }
// });
//
// app.listen(8080);
// console.log('Listening on port 8080...');
