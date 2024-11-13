//import { readFileSync } from "node:fs";
//var http = require('http'); 
var map = L.map('map').setView([51.39434, -0.31393], 10);//13

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var parsedData = JSON.parse(data);
initMap(parsedData) 
.then(result => {
    addCafeMarkers(); 
  })


async function initMap(parsedData) {

    var firstpolyline = new L.Polyline(parsedData, {
        color: '#FC5200',
        weight: 5,
        opacity: 1,
        smoothFactor: 1
    });
    
    firstpolyline.addTo(map);

    setTimeout(function () {
        map.fitBounds(firstpolyline.getBounds());
    }, 1000);
}

function addCafeMarkers() {

    var cafeIcon = L.icon({
        iconUrl: 'img/cafe.png',
    
        iconSize:     [45, 50], // size of the icon
        //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    L.marker([51.1627, 0.16314], {icon: cafeIcon}).addTo(map);

    checkServerErr(); 
}

function checkServerErr() {

    console.log("testing checkServerErr"); 
}