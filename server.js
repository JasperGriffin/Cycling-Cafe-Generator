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

let { validateLink, getId, getPolyline, getCountry, getCafeList, checkServerErrURL, verifyJSON } = require('./strava.js');

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

var json = require('./assets/cafes.json'); 

app.get('/api', async (req, res) => {
  /*
  OAUTH
  */
});

app.post('/api', async (req, res, next) => {

  let link = req.body['routeSrc'];  
  let id = getId(link);
  let api = new StravaApiV3.RoutesApi()
  let err = ""

  if(!validateLink(link)) {
    return next("linkError"); 
  }

  var callback = function(error, data, response) {

    if (error) { 
      return next(error);
    } 

    let polyline = getPolyline(data);

    getCountry(polyline) // <- return here is important
      .then(result => {
        if (result != "GBR") {
          //polyline, list of cafes within it'
          return next("locationError");
        }

        cafesArr = getCafeList(data)      

        if (cafesArr.length == 0) {
          err = "Unfortunately no cafes could be found in this area"
        }
        res.render('routes', { data: { message: polyline, cafes: cafesArr, error: err } });
        res.end(); 
      })
      .catch(err => {
        console.log("polyine not found"); 
        console.log(err);
        return next("countryCodeErr");
      })
  };
  api.getRouteById(id, callback);
    
});
app.listen(port); 


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
  else if (err == "countryCodeErr") {
    res.render('index', { message: 'Unfortunately there was an error with the link. Please ensure the route is from the UK'})
    res.end();
  }
});


