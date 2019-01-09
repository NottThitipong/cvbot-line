'use strict';
// Imports dependencies and set up http server
const express = require('express'),
      bodyParser = require('body-parser'),
      request = require('request');

// creates express http server
const app = express();
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// test connect
app.get('/', (req, res) => {
    res.send('Hello CVBOT-LINE Heroku.');
});

app.post('/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken
    reply(reply_token)
    res.sendStatus(200)
})

// Getting running.
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'));
});

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {12345}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'I am cvbot.'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
}