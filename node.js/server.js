const express = require('express');
const app = express(); 
const port = 3000;
var path = require('path');
var fs = require('fs');

app.use(express.json()); 

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../js')))
app.use(express.static(path.join(__dirname, '../css')));


app.get('/', function(req, res) {
    res.writeHead(200,{'Content-Type': 'text/html'});
    var readStream = fs.createReadStream('../index.html');
    readStream.pipe(res);
}).listen(port);