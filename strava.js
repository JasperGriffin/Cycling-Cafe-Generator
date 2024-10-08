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
/**
 * Implement Polyline encoder
 * 
 */

module.exports = { sayHello, validateLink, getId };