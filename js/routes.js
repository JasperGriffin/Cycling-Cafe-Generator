//import { readFileSync } from "node:fs";
//var http = require('http'); 

//cafe link: https://uxwing.com/coffee-shop-map-location-icon/

//setTimeout(1000);

var map = L.map('map').setView([51.39434, -0.31393], 10);//13

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var cafeIcon = L.icon({
    iconUrl: 'img/cafe-pin.png',
    iconSize:     [45, 45], // size of the icon. Originally [60, 60]
    //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -35] // point from which the popup should open relative to the iconAnchor
});

var bigIcon = L.icon({
    iconUrl: 'img/cafe-pin.png',
    iconSize:     [55, 55], // size of the icon. Originally [70, 70]
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
        addCafeMarkers(firstpolyline);
    }, 2000);

    setTimeout(function () {
        map.fitBounds(firstpolyline.getBounds());
    }, 1000);
}

function addCafeMarkers(data) {

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
    
    let cafes = JSON.parse(cafesArr)    
    cafes.forEach((item) => {
        
        //let town = getTown(item); 
        let town = item.address;
        let details = splitDetails(item); 

        //create marker (x, y, cafeIcon)
        marker = new L.marker([item.lat, item.lng], {icon: cafeIcon});

        marker.bindPopup(
            "<div class=marker-background>"+
                "<img class='marker-img' src="+item.photo+">" +
                "<h1>"+item.name+"</h1>" +town +"<br/>" + details+
            "</div>"
        );
        marker.addTo(map);

        marker.on('mouseover',function(ev) {
            ev.target.openPopup();
            ev.target.setIcon(bigIcon);
        });

        marker.on('mouseout',function(ev) {
            ev.target.setIcon(cafeIcon);
        });
    })
    
}
    
function getTown(item) {
    let text = item.address
    let townArr = text.split(",");
    let town = townArr[1];
    return town; 
}

function splitDetails(item) {
    let detailsArr = item.details.split(".");
    let address = detailsArr[0];
    return address; 
}

