function sayHello() { 
    console.log("Success!"); 
}

function validateLink(link) {
    
   
    //let arr = link.split('/'); 
    //if arr[1] == strava, arr[2] == routes, etc
    //getId(); 

    return true;
}

function getId(link) { 
    return link.split('/')[4]; 
}
/**
 * Implement Polyline encoder
 * 
 */

module.exports = { sayHello, validateLink, getId };