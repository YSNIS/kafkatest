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
app.use('/public', express.static(__dirname + '/public'));

producer.on('ready', function () {

    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/index.html'));
    })

    app.post('/logger', function(req, res) {
        var payload = createPayload(req.body)
        producer.send(payload, function (err, data) {
            if (data) {
                res.send('success');
                console.log('Data sent to the producer.');
            }
            if (err) {
                res.send('failure');
                console.log('Data failed to send to the producer.');

            }
        });
    });

});

var createPayload = function (data) {
    var message = JSON.stringify(data)
        payload = [
            { topic: 'test', messages: message },
        ];
    return payload;
}

producer.on('error', function (err) {})

app.listen(3000);
console.log('Listening on port 3000...');
