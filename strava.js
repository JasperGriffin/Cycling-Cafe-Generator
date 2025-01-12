let polylineConvert = require('google-polyline'); 
const latlongify = require('latlongify');

var json = require('./assets/cafes.json'); 

//const regex = new RegExp("^https:\/\/www\.strava\.com\/routes\/\d+");
const regex = new RegExp("^https:\/\/www\.strava\.com\/routes\/[0-9]{19}$");

function validateLink(link) {

    if (regex.test(link)) {
        return true; 
    }
}

function getId(link) { 
    let id = link.split('/')[4]; 
    return id; 
}

function getPolyline(data) {

    const polyline = data.map.polyline; 
    
    try {
        let obj = polylineConvert.decode(polyline); 
        //console.log(obj);
        return obj;
    }
    catch(err) {
        console.log("error: " + err); 
    }

}

//gets country
async function getCountry(polyline) {

    let str = polyline[0].toString(); 
    
    let array = str.split(',');
    a = Number(array[0]), b = Number(array[1]);  
    
    let res = await latlongify.find(a, b); 
    console.log("country code: " + res.country.code); 

    return res.country.code; 
    //if (res.country.code == "GBR") {
    //    return true; 
    //}
}

function getCafeList(polyline) {

    json.forEach(async (item) => {
        //console.log("this is working!"); 
        console.log(item.phone);

        //lat, lng, address, photo, 
    })
} 

function isMarkerInsidePolygon(marker, poly) {
    var polyPoints = poly.getLatLngs();       
    var x = marker.getLatLng().lat, y = marker.getLatLng().lng;

    var inside = false;
    for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
        var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
        var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
}

//Method checks for 404 errors for photo URLs
async function checkServerErrURL(json) {

    console.log("this server is being run"); 
  
    //var json = require('./assets/cafes.json'); 
    var noPhotoArr = [];
    var absoluteURLErr = []; 
    var totalArr = []; 
    var failed404 = [];
    var failedOther = []; 
  
    //check for 404 errors
    json.forEach(async (item) => {
  
      totalArr.push(item.name);
      
      if('photo' in item) {
        let url = item.photo;
  
        if (!url.includes("cafes.cyclingmaps.net")) {
          try {
            await new Promise((resolve) => setTimeout(resolve, 0));
            var res = await fetch(url);
      
            if(res.status == 404) {
              console.log("404: " + item.name + ": " + item.photo); 
              failed404.push(item.name); 
            }
          }
          catch(err) {
            console.log("other error: " + item.name + ": " + item.photo);
            //console.log(err); 
            failedOther.push(item.name); 
          }
        }
          
      }
      else {
        console.log(item.name + " does not have a photo");
        noPhotoArr.push(item.name); 
      }
    });
    
    console.log("List finished");
    console.log("total no photos: " + noPhotoArr.length); 
    console.log("total array: " + totalArr.length); 
  
    console.log("total 404s: " + failed404.length);
    console.log("total other fails: " + failedOther.length);  
    
  }

async function verifyJSON() {

    //check for 404 errors
    json.forEach(async (item) => {
      let x = Object.keys(item).length
      //console.log(x + " : Name: " + item.name + " : Full address: " + item.details);
      if (item.details) {
        console.log(item.details);
      }
      else {
        console.log(item.name);
      }
    })
  }
  


module.exports = { validateLink, getId, getPolyline, getCountry, getCafeList, checkServerErrURL, verifyJSON};