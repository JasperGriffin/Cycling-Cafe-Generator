//import { readFileSync } from "node:fs";
//var http = require('http'); 

//cafe link: https://uxwing.com/coffee-shop-map-location-icon/

setTimeout(1000);

var map = L.map('map').setView([51.39434, -0.31393], 10);//13

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var cafeIcon = L.icon({
    iconUrl: 'img/pin.png',
    iconSize:     [60, 60], // size of the icon
    //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});

var bigIcon = L.icon({
    iconUrl: 'img/pin.png',
    iconSize:     [70, 70], // size of the icon
    //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});


var parsedData = JSON.parse(data);
initMap(parsedData) 
.then(result => {
    //addCafeMarkers(); 

  })

async function initMap(parsedData) {

    var firstpolyline = new L.Polyline(parsedData, {
        color: '#FC5200',
        weight: 5,
        opacity: 1,
        smoothFactor: 1
    });
    
    firstpolyline.addTo(map);

    //addCafeMarkers(firstpolyline);

    setTimeout(function () {
        addCafeMarkers(firstpolyline);
    }, 2000);

    setTimeout(function () {
        map.fitBounds(firstpolyline.getBounds());
    }, 1000);
}

async function printJSON() {
    const res = await fetch('./assets/cafes.json');
    return await res.json();
}


function addCafeMarkers(data) {
    //let marker = L.marker([51.1627, 0.16314], {icon: cafeIcon}).addTo(map);

    var locations = [
        ["Kingdom", 51.1627, 0.16314, "Open everyday 9am - 5pm (after 4pm drinks and cake only)", "Grove Road,Penshurst, Tonbridge, Kent, TN11 8DU"],
        ["Giro", 51.37064, -0.363588, "Open daily 7:30 - 15:00, Sat & Sun 7:30 - 17:00", "2 High St, Esher KT10 9RT"],
        ["Rapha", 51.510784, -0.136667, "Open daily 7:30 - 19:00", "85 Brewer St, Soho, London W1F 9ZN, UK"],
        ["Rykas", 51.255543, -0.32239097, "Open Mon - Fri 8:00 -16:00, Sat - Sun8;00 -17:00", "Old London Rd, Mickleham, Dorking, Surrey RH5 6BY"],
    ];

    let json = printJSON(); 
    console.log("json: " + json); 
    
    for (var i = 0; i < locations.length; i++) {

        //Find town from address field
        let town = getLocationName(i, locations); 
        
        //create marker
        marker = new L.marker([locations[i][1], locations[i][2]], {icon: cafeIcon});
       
        if (isMarkerInsidePolygon(marker, data)) {
            //marker.bindPopup(locations[i][0]);
            marker.bindPopup(
                "<div class=marker-background>"+
                "<img class='marker-img' src='https://lh3.googleusercontent.com/p/AF1QipN1FE0zhWzca3hD0KOCZqQuMUUwSWHlHcmHnHNa=s1360-w1360-h1020'>" +
                "<h1>"+locations[i][0]+"</h1>" + town + "<br/>" + locations[i][3]+
                "</div>"
            );
            marker.addTo(map);
        }
        else {
            marker.bindPopup(
                "<img class='marker-img' src='https://lh3.googleusercontent.com/p/AF1QipM3gy7yJuB6YbI_9qImLAAzTiwXBWMH-zlzCefU=s680-w680-h510'>" +
                "<h1>"+locations[i][0]+"</h1>" + town + "<br/>" + locations[i][3]
            );
            marker.addTo(map);
        }

        marker.on('mouseover',function(ev) {
            ev.target.openPopup();
            ev.target.setIcon(bigIcon);
        });

        marker.on('mouseout',function(ev) {
            ev.target.setIcon(cafeIcon);
        });
    }
    
}
    
function getLocationName(i, locations) {
    let text = locations[i][4]
    let townArr = text.split(",");
    let town = townArr[1];
    return town; 
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




