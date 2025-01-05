//import { readFileSync } from "node:fs";
//var http = require('http'); 

//cafe link: https://uxwing.com/coffee-shop-map-location-icon/

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

    addCafeMarkers(firstpolyline);

    setTimeout(function () {
        map.fitBounds(firstpolyline.getBounds());
    }, 1000);
}

function addCafeMarkers(data) {
    //let marker = L.marker([51.1627, 0.16314], {icon: cafeIcon}).addTo(map);

    console.log("test: " + typeof(data));

    var locations = [
        ["Kingdom", 51.1627, 0.16314],
        ["Giro", 51.37064, -0.363588],
        ["Rapha", 51.510784, -0.136667],
        ["Rykas", 51.255543, -0.32239097],
        ["devil", 51.114136, -0.729459]
    ];

    for (var i = 0; i < locations.length; i++) {

        marker = new L.marker([locations[i][1], locations[i][2]], {icon: cafeIcon});
       
       if (isMarkerInsidePolygon(marker, data)) {
        marker.bindPopup(locations[i][0]);
        marker.addTo(map);
       }
       else {
        marker.bindPopup(locations[i][0]);
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
};





