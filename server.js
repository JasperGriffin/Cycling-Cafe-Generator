const express = require('express');
const app = express(); 
const port = 3000;
var path = require('path');
var fs = require('fs');
var http = require('http'); 
let ejs = require('ejs');

app.use(express.json()); 

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'js')))
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'assets')));

//https://github.com/DevonCrawford/Personal-Website

/*
app.get('/', function(req, res) {
    res.writeHead(200,{'Content-Type': 'text/html'});
    var readStream = fs.createReadStream('../index.html');
    readStream.pipe(res);
}).listen(port);
*/


app.set('view engine', 'ejs'); 

app.get('/', (req, res) => {
    res.render('index', {title: 'Hey', message: 'Hello there!' }) 
}).listen(port);  


/*
fs.readFile('index.html', function(err, html) {

    http.createServer(function(req, res) {
        res.writeHeader(200, {"Content-Type": 'text/html'});
        res.write(html);
        res.end(); 
    }).listen(port);
});

http.createServer(function(req, res) {
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.write(req.url); 
    res.end(); 
}).listen(4200);
*/

//app.get (api) -> create a javascript function that reditcts to api 
