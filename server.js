const express = require('express');
const app = express(); 
const port = 3000;
var path = require('path');
var fs = require('fs');
var https = require('https'); 
var http = require('http'); 
const fetch = require('node-fetch');
//ejs library
let ejs = require('ejs');
const querystring = require('querystring');

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

// Configure OAuth2 access token for authorization: strava_oauth
var strava_oauth = defaultClient.authentications['strava_oauth'];
var json = require('./assets/cafes.json');

app.get('/', (req, res) => {
  res.render('index', {title: 'Hey', message: '' });
});

app.get('/home', (req, res) => {
  res.render('home', {title: 'Hey', message: '' });
})

app.get('/auth', (req, res) => {

    const { code, state, scope } = req.query;
    if (code) {
      console.log('Authorization code:', code);  // Logs the code received from Strava
      console.log('State:', state);  // Logs the state parameter, if present
      console.log('Scope:', scope);  // Logs the scope granted, if present

      const data = querystring.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code'
      });
      
      const options = {
        hostname: 'www.strava.com',
        path: '/api/v3/oauth/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data)
        }
      };
      
      const req = https.request(options, (res) => {
        let responseBody = '';
      
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
      
        res.on('end', () => {
          console.log('Response:', responseBody);

          let obj = JSON.parse(responseBody);
          console.log('access_token: ' + obj.access_token); 
          strava_oauth.accessToken = obj.access_token;
        });
      });
      
      req.on('error', (e) => {
        console.error(`Request failed: ${e.message}`);
      });

      req.write(data);
      req.end();  

    }

    res.redirect('/'); 

    //error handling when pressed cancelled
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

    getCountry(polyline) 
      .then(result => {
        if (result != "GBR") {
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


