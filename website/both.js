var locations = [];
var schools = [];

var call1 = $.ajax({
    url: "https://data.brla.gov/resource/5rji-ddnu.json",
    type: "GET",
    data: {
      "$limit" : 1000,
      "$$app_token" : "OBimKBKVR5rBKKLHnMg5ENdx2"
    }
}).done(function(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].geolocation != null) {
          var coords = data[i].geolocation.coordinates;
          var test = {lat: coords[1], lng: coords[0]};
          locations.push(test);
        }
    }
});


var call2 = $.ajax({
    url: "https://data.brla.gov/resource/4gku-4cqw.json",
    type: "GET",
    data: {
      "$$app_token" : "OBimKBKVR5rBKKLHnMg5ENdx2"
    }
}).done(function(data) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].geolocation != null) {
          var coords = data[i].geolocation.coordinates;
          var test = {lat: coords[1], lng: coords[0]};
          schools.push(test);
        }
    }
});


function initMap() {

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 12,
  center: {lat: 30.4583, lng: -91.1403}
});

// Create an array of alphabetical characters used to label the markers.
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var crimeimage = 'markerimages/crimeimage.png';
var schoolimage = 'markerimages/schoolimage.png';

// Add some markers to the map.
// Note: The code uses the JavaScript Array.prototype.map() method to
// create an array of markers based on a given "locations" array.
// The map() method here has nothing to do with the Google Maps API.
var markers = locations.map(function(location, i) {
  return new google.maps.Marker({
    position: location,
    label: labels[i % labels.length],
    icon: crimeimage,
    data: 'crime'
  });
});


var markers2 = schools.map(function(location, i) {
  return new google.maps.Marker({
    position: location,
    label: labels[i % labels.length],
    icon: schoolimage,
    data: 'school'
  });
});
//        Array.prototype.push.apply(markers,markers2);

function toggleMarkers(attr,val) {
    if (markers){
        for (i in markers) {
            if(markers[i].attr == val){
                var visibility = (markers[i].getVisible() == true) ? false : true;
                markers[i].setVisible(visibility);
            }
        }
    }
}
// Add a marker clusterer to manage the markers.
var markerCluster = new MarkerClusterer(map, markers,
    {imagePath: './markerimages/n'});

var markerCluster2 = new MarkerClusterer(map, markers2,
    {imagePath: './markerimages/m'});
}
