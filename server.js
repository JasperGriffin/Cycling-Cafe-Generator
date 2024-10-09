const express = require('express');
const app = express(); 
const port = 3000;
var path = require('path');
var fs = require('fs');
var http = require('http'); 
//ejs library
let ejs = require('ejs');

//referencing env variables
require('dotenv').config();

let { sayHello, validateLink, getId, getPolyline } = require('./strava.js');

//Strava API
var StravaApiV3 = require('strava_api_v3');
var defaultClient = StravaApiV3.ApiClient.instance;

app.use(express.json()); 

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'js')))
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs'); 
app.set('trust proxy', true);

app.get('/', (req, res) => {
    res.render('index', {title: 'Hey', message: '' }) 
})//.listen(port);  
 
// Configure OAuth2 access token for authorization: strava_oauth
var strava_oauth = defaultClient.authentications['strava_oauth'];
strava_oauth.accessToken = process.env.ACCESS_TOKEN;
//const id = BigInt("3273788391549797542");


app.get('/api', async (req, res) => {

  /*
  OAUTH
  */
});

//private link
//https://www.strava.com/routes/3273788814186038130 

//public link
//https://www.strava.com/routes/3273788391549797542
app.post('/api', async (req, res, next) => {

  let link = req.body['routeSrc'];  

  if(validateLink(link)) {
    
    let id = getId(link);
    let api = new StravaApiV3.RoutesApi();

    console.log("id: " + id);
    
    var callback = function(error, data, response) {
      if (error) {
        return next(error);
      } else {
        console.log('API called successfully. Returned data: ' + data);
        getPolyline(data);
      }
    };
    api.getRouteById(id, callback);
    
  }
  else { 
    return next("linkError");
  }

  
});
app.listen(port); 

app.use((err, req, res, next) => {

  //app.set('views','/views/errors/');

  if(err.status == 403) {
    res.render('403', { url: req.url });
    res.end(); 
  }
  else if(err.status == 404) {
    res.render('404', {url: req.url})
    res.end(); 
  }
  else if (err == "linkError") {
    res.render('index', { message: 'Make sure your link is a full Strava URL route'})
    res.end(); 
  }


});


