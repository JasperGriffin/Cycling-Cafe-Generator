
var map = L.map('map').setView([51.39434, -0.31393], 10);//13

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var parsedData = JSON.parse(data);
//alert(obj); 

var polylinePoints = parsedData;  
try {
    var firstpolyline = new L.Polyline(polylinePoints, {
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
catch(err) {
    alert(err); 
};




