var http = require('http')
var fs = require('fs');
var express = require('express');
const bodyParser = require("body-parser");

function hex2a(hexx) {
    var hex = hexx.toString(); //force conversion
    var str = '';
    for (var i = 0;
        (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}


var app = express();
app.use(bodyParser.json())

// endpoint for check connectivity
app.get('/receiver', function(req, res) {
    console.log('Msg received')
    res.send('OK')
})

// endpoint for receiving data
app.post('/receiver', function(req, res) {
    body = req.body;
    console.log('...');
    console.log('JSON received from Sigfox...')
    console.log(body);

    console.log('Data field decoded...');
    console.log(hex2a(body.data));

    res.send('OK')
})

var server = http.createServer(app).listen(1880, function() {
    console.log('My Sigfox backend...');
    console.log("server started, listening at port 1880");
});