const express = require('express');
const app = express(); 
const port = process.env.PORT || 3000;
var path = require('path');
var https = require('https'); 
const querystring = require('querystring');

//referencing env variables
require('dotenv').config();

let { validateLink, getId, getPolyline, getCountry, getCafeList, getName, getDistance} = require('./js/strava.js')

//Strava API
var StravaApiV3 = require('./node_modules/strava_api_v3');
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
//var json = require('./assets/cafes.json');

app.get('/', (req, res) => {
  res.render('index', {title: 'Hey', message: '', authMessage: ''}); 
});

app.get('/about', (req, res) => {
  res.render('about', {title: 'Hey', message: '' });
})

app.get('/projects', (req, res) => {
  res.render('projects', {title: 'Hey', message: '' });
})

app.get('/auth', (req, res, next) => {

  let firstname;
  
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
        let obj = JSON.parse(responseBody);

        if (obj.message == "Bad Request") {
          return next("badRequest");
        }
          
        firstname = obj.athlete.firstname; 
        strava_oauth.accessToken = obj.access_token;
      });
    });
    
    req.on('error', (e) => {
      console.error(`Request failed: ${e.message}`);
    });

    req.write(data);
    req.end(); 

    setTimeout(() => {
      let welcomeMessage
      if (firstname) {
        welcomeMessage = "Connected! Welcome " + firstname; 
      } 
      else {
        welcomeMessage = "Connected!"
      }
      res.render('index', {title: 'Hey', message: '', authMessage: welcomeMessage}); 
    }, "1000"); //Timeout of 1 sec
  }
  else {
    //error handling when pressed cancelled needs more testing
    res.redirect('/'); 
  }
});



app.post('/api', async (req, res, next) => {

  let link = req.body['routeSrc'];  
  let id = getId(link);
  let api = new StravaApiV3.RoutesApi()
  let err = ""

  if(!validateLink(link)) {
    return next("linkError"); 
  }

  var callback = async function(error, data, response) {

    if (error) { 
      return next(error);
    } 

    let polyline = getPolyline(data);
    let result = await getCountry(polyline)
        
    if (result != '["GBR"]') {
      console.log("countryCode: " + result);
      return next("locationError");
    }
    
    cafesArr = getCafeList(data);    
    let name = getName(data);
    let distance = getDistance(data);  

    if (cafesArr.length == 0) {
      console.log("Unfortunately no cafes could be found in this area"); 
      err = "Unfortunately no cafes could be found in this area"
    }

    res.render('routes', { data: { message: polyline, cafes: cafesArr, name: name, distance: distance, error: err } });
    res.end(); 

  };
  api.getRouteById(id, callback);
    
});
app.listen(port); 


//error handling
app.use((err, req, res, next) => {

  //app.set('views','/views/errors/');

  if(err.status == 404) {
    console.log("error 403 is run");
    res.render('403', { url: req.url });
    res.end(); 
  }
  else if(err == "linkError") {
    res.render('index', { message: 'Make sure your link is a full Strava URL route as seen below', authMessage: ''})
    res.end(); 
  }
  else if(err == "locationError") {
    res.render('index', { message: 'This website is sadly exclusive to routes in the UK only', authMessage: ''})
    res.end();
  }
  else if (err == "countryCodeErr") {
    res.render('index', { message: 'Unfortunately there was an error with the link. Please ensure the route is within the UK', authMessage: ''})
    res.end();
  }
  else if (err == "badRequest") {
    res.render('index', {title: 'Hey', message: 'Bad Request - Try re-authenticating again', authMessage: ''}); 
    res.end(); 
  }
});