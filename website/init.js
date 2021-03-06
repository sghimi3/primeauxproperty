var markers  = [];
var lat;
var long;


function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 12,
  center: {lat: 30.4583, lng: -91.1403}
});

  // Create the search box and link it to the UI element.
  var input = document.getElementById('input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
  });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
      map.fitBounds(bounds);
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


function GeocodeConvert(geocoder, address){
    console.log('.');
    var address = address;
    geocoder.geocode({'address': address}, function(result, status){
        console.log(status);
        if(status == 'Ok'){
            console.log('.');
            return result[0].geometry.location;
        }
    });
}
function codeAddress(Address, geocoder, map) {
    var address = Address;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  /*google.maps.event.addListener(map, 'click', function( event ){
    lat = event.latLng.lat();
    lng = event.latLng.lng();
    alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng()); 

    document.getElementById("details").innerHTML("HI");
  });*/
}
