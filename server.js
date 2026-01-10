const express = require('express');
const app = express(); 
const port = process.env.PORT || 3000;
var path = require('path');
var https = require('https'); 
const querystring = require('querystring');

//referencing env variables
require('dotenv').config();

let { validateLink, getId, getPolyline, getCountry, getCafeList, getName, getDistance} = require('./js/strava.js');
let { getErrorHandling } = require('./js/error.js');

//Strava API
var StravaApiV3 = require('./vendor/strava_api_v3');
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

app.get('/contact', (req, res) => {
  res.render('contact', {title: 'Hey', message: '' })
})

app.get('/thanks', (req, res) => {
  res.render('thanks', {title: 'Hey', message: '' })
})

app.get('/error', (req, res) => {
  res.render('error', {titel: 'Hey', message: ''})
})

app.get('/auth', (req, res, next) => {

  let firstname;
  
  const { code, state, scope } = req.query;
  if (code) {
    console.log('Authorization code:', code);
    console.log('State:', state); 
    console.log('Scope:', scope); 

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
      let welcomeMessage = "Connected!"
      if (firstname) {
        welcomeMessage = "Connected! Welcome " + firstname; 
      } 
      res.render('index', {title: 'Hey', message: '', authMessage: welcomeMessage}); 
    }, "1000"); //Timeout of 1 sec
  }
  else {
    //error handling when pressed cancelled needs more testing
    res.redirect('/'); 
  }
});


app.get('/api/route/1466', async (req, res) => {
  const routeId = req.params.id;
  // Fetch route data from Strava API or your database
  //res.json({ id: routeId, name: 'Sample Route', coordinates: [...] });
});

// api
app.post('/api', async (req, res, next) => {

  let link = req.body['routeSrc'];
  link = link.trim(); 
  console.log("link: " + link);
  let id = getId(link);
  let api = new StravaApiV3.RoutesApi();
  let err = "";

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
      return next("locationError");
    }
    
    cafesArr = getCafeList(data);    
    let name = getName(data); 
    let distance = getDistance(data);  

    if (cafesArr.length == 0) {
      err = "Unfortunately no cafes could be found in this area"
    }

    console.log("data: " + data.id); //gets strava id

    res.render('routes', { data: { message: polyline, cafes: cafesArr, name: name, distance: distance, error: err } });
    res.end(); 
  };
  api.getRouteById(id, callback);
    
});
app.listen(port); 

//error handling
app.use((err, req, res, next) => {

  //app.set('views','/views/errors/');
  getErrorHandling(err, req, res); 
  res.end(); 
});