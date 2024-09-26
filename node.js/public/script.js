
/*validation needed for strava route
    - Regex so it's a proper strava route
    - check it's not private?? 

*/

function getForm() {
    let x = document.forms["routeForm"]["routeSrc"].value;
    testAlert();
}

function testAlert() {
    alert("This is an alert again"); 
}