const express = require('express')
const app = express()
const path = require('path');

// global vars from node
var amqp = require('amqplib/callback_api');

// submit data to rabbitmq
function submitToRabbitMQ(data) {
    amqp.connect('amqp://demo:123@rabbitmq.localnet', function (error0, connection) {
        if (error0) {
            throw error0;
        }

        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'hello';
            var msg = data.nickname;

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });

        setTimeout(function () {
            connection.close();
            // process.exit(0) // exits node
        }, 500);
    });
}

app.use(express.json()); // json incoming
// app.use(express.urlencoded({ extended: false })); // if it where formbody data
// we have node serve up our form
app.use(express.static(path.join(__dirname, '.')));
app.use('/form', (req, res, next) => {
    res.sendFile(__dirname + '/form.html');
});

// the same node receives our formdata and handles it
app.post('/hello', function (req, res) {
    console.log(req.body);
    submitToRabbitMQ(req.body);
    res.send(req.body);
});

app.listen(3000, "0.0.0.0")