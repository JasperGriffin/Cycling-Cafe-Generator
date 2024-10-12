let polylineConvert = require('google-polyline'); 
const latlongify = require('latlongify');
const GBR = "GBR";

const regex = new RegExp("https:\/\/www\.strava\.com\/routes\/[0-9]{19}");

function sayHello() { 
    console.log("Success!"); 
}

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
        console.log(obj);
        return obj;
    }
    catch(err) {
        console.log("error: " + err); 
    }

}

async function getCountry(polyline) {
    
    let str = polyline[0].toString(); 
    
    var array = str.split(',');
    a = Number(array[0]), b = Number(array[1]);  
    
    const res = await latlongify.find(a, b); 
    return res.country.code; 
}




module.exports = { sayHello, validateLink, getId, getPolyline, getCountry };