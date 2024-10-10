let polylineConvert = require('google-polyline'); 

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
    }
    catch(err) {
        console.log("error: " + err); 
    }

}





module.exports = { sayHello, validateLink, getId, getPolyline };