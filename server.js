const express = require('express');
const app = express(); 
const port = 3000;
var path = require('path');
var fs = require('fs');
var http = require('http'); 
const fetch = require('node-fetch');
//ejs library
let ejs = require('ejs');

//referencing env variables
require('dotenv').config();

let { sayHello, validateLink, getId, getPolyline, getCountry } = require('./strava.js');

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


app.get('/api', async (req, res) => {
  /*
  OAUTH
  */
});

app.post('/api', async (req, res, next) => {

  checkServerErrURL(); 

  let link = req.body['routeSrc'];  

  if(!validateLink(link)) {
    return next("linkError"); 
  }

  let id = getId(link);
  let api = new StravaApiV3.RoutesApi();
  
  var callback = function(error, data, response) {

    if (error) { return next(error);} 
    else {
      let polyline = getPolyline(data);

      getCountry(polyline) // <- return here is important
        .then(result => {
          if (result == "GBR") {
            res.render('routes', { message: polyline });
            res.end(); 
          }
          else { return next("locationError"); }
        })   
    }
  };
  api.getRouteById(id, callback);
    
});
app.listen(port); 

async function checkServerErrURL() {
  
  var json = require('./assets/cafes.json'); 

  var noPhotoArr = [];
  var absoluteURLErr = []; 
  var totalArr = []; 
  
  //still need to check for 404 errors
  json.forEach((item) => {

    totalArr.push(item.name);
    
    if('photo' in item) {
      let url = item.photo;
      fetch(url)
      .then(response => console.log("this works!"))
      .catch(error => console.log("cafe: " + item.name + " does not have an absolute URL"));

      noPhotoArr.push(item.name); 
    }
    else {
      console.log(item.name + " does not have a photo");
      absoluteURLErr.push(item.name); 
    }
  });

  console.log("List finished");
  console.log("total no photos: " + noPhotoArr.length); 
  console.log("total absolute errors: " + absoluteURLErr.length); 
  console.log("total array: " + totalArr.length); 
    
}

//error handling
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
  else if(err == "linkError") {
    res.render('index', { message: 'Make sure your link is a full Strava URL route'})
    res.end(); 
  }
  else if(err == "locationError") {
    res.render('index', { message: 'This website is sadly exclusive to routes in the UK only'})
    res.end();
  }

});


