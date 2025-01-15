let polylineConvert = require('google-polyline'); 
const latlongify = require('latlongify');

var json = require('./assets/cafes.json'); 

//const regex = new RegExp("^https:\/\/www\.strava\.com\/routes\/\d+");
const regex = new RegExp("^https:\/\/www\.strava\.com\/routes\/[0-9]{19}$");
const diffVal = 0.025; 

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
        //console.log("polyline obj: " + obj.length);
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
    //console.log("country code: " + res.country.code); 

    return res.country.code; 
    //if (res.country.code == "GBR") {
    //    return true; 
    //}
}

function getCafeList(data) {

  let polyline = getPolyline(data);

  let cafeArr = [];

  json.forEach(async (item) => {

    //console.log(item.phone);

    let lat = item.lat;
    let lng = item.lng; 

    if (isCafeInsidePolygon(polyline, lat, lng) || isCafeNearPolygon(polyline, lat, lng)) {
      //validation
      validateCafeList(item);
      addCafeToList(cafeArr, item);
      
    }
  
  })
  //console.log(cafeArr); 
  return cafeArr; 
} 


function isCafeInsidePolygon(poly, lat, lng) {

  var x = lat, y = lng;
  var inside = false;
  
  for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      var xi = poly[i][0], yi = poly[i][1];
      var xj = poly[j][0], yj = poly[j][1];

      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }

  return inside;
}

//51.176153986622694, 0.18069822159516988 - closest point to cafe
//51.176489505874024, 0.18694405131728786 - coordinates for penhurst cafe
//> 0.00033551925132968563 - lat
//> 0.006245829722117985 - long
//0.010

//51.17157998047327, 0.27608825410817145 - too far!!

//> 0.004574006149425713
//> 0.09539003251300157

//0.0001
function isCafeNearPolygon(poly, lat, lng) {
  var x = lat, y = lng;
  var near = false;

  for (let i = 0; i < poly.length; i++) {

    let xi = poly[i][0];
    let yi = poly[i][1];

    //0.01 - original
    if (difference(xi, x) < diffVal && difference(yi, y) < diffVal) {
      near = true;
      break;
    }
  }
  return near; 
}

function difference(a, b) {
  return Math.abs(a - b);
}

function addCafeToList(cafeArr, item) {
  cafeArr.push({
    name: item.name,
    address: item.address,
    details: item.details,
    lat: item.lat,
    lng: item.lng,
    photo: item.photo
  })
  return cafeArr;
}

function validateCafeList(item) {

  /*
    cafeArr.push({
        name: item.name,
        address: item.address,
        details: item.details,
        lat: item.lat,
        lng: item.lng,
        photo: item.photo
    })
  */

  if (!item.photo) {
    item["photo"] = "https://media.ntslive.co.uk/crop/770x770/4f0a253d-a3a4-49e7-90a6-59071475be10_1554249600.jpeg";
  }


  //Needles Bank, Godstone RH9 8DZ
  if (item.address) {
    let text = item.address
    let townArr = text.split(",");
    let town = townArr[1];
    
    //regex to split towns from their postcodes
    const reg = /[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}/
    let updatedTown = town.replace(reg, "");
    item.address = updatedTown; 

    console.log(updatedTown);
  }

  return item; 
}

//Method checks for 404 errors for photo URLs
async function checkServerErrURL(json) {

    console.log("this server is being run"); 
  
    //var json = require('./assets/cafes.json'); 
    var noPhotoArr = [];
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