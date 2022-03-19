var http = require('http')
var fs = require('fs');
var express = require('express');
const bodyParser = require("body-parser");
// const Promise = require('bluebird')
// const AppDAO = require('./dao')
// const MessageRepository = require('./tools/message_repository')
var db = require("./tools/database.js")


// //create table if not exists
// const dao = new AppDAO('./database.sqlite3')
// const msgRepo = new MessageRepository(dao)
// msgRepo.createTable()
//     .catch((err) => {
//         console.log('Error: ')
//         console.log(JSON.stringify(err))
//     })


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
    //console.log(hex2a(body.data));


    var errors = []
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    //console.log(body.deviceId);

    var sql = 'INSERT INTO messages (device_id, msg_seq_number, data, time, device_type_id) VALUES (?,?,?,?,?)'
    var params = [body.deviceId, body.seqNumber, body.data, body.time, body.deviceTypeId]
    db.run(sql, params, function(err, result) {
        if (err) {
            console.log(err);
            //res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": body.data
        })
    })


    //msgRepo.create(body.deviceId, body.seqNumber, body.data, body.time, body.deviceTypeId)

    res.send('OK')
})

// Express route to handle errors
app.use(function(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send('Oops, Something went wrong!');
    } else {
        next(err);
    }
});

var server = http.createServer(app).listen(1880, function() {
    console.log('My Sigfox backend...');
    console.log("server started, listening at port 1880");
});