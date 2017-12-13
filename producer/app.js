var http = require('http'),
    path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    kafka = require('kafka-node'),
    client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
    Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    producer = new Producer(client),

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

producer.on('ready', function () {

    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/index.html'));
    })

    app.post('/logger', function(req, res) {
        var key = Object.keys(req.body)[0];
        var value = req.body[key];
        var message = `'${key}':'${value}'`
            payloads = [
                { topic: 'test', messages: message },
            ];
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    });

});

producer.on('error', function (err) {})

app.listen(3000);
console.log('Listening on port 3000...');
