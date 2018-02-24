function initAutocomplete() {
var map = new google.maps.Map(document.getElementById('map'), {
zoom: 12,
center: {lat: 30.4583, lng: -91.1403}
});
console.log('.');
var geocoder = new google.maps.Geocoder();
ValidArry.forEach(function(x){ codeAddress(x.address, geocoder, map, x.offense_desc + " on " + x.st_name)});
console.log('.');
// Create the search box and link it to the UI element.
var input = document.getElementById('input');
var searchBox = new google.maps.places.SearchBox(input);
map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// Bias the SearchBox results towards current map's viewport.
map.addListener('bounds_changed', function() {
  searchBox.setBounds(map.getBounds());
});

var markers = [];
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
    }
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
function codeAddress(Address, geocoder, map, lab) {
    var address = Address;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            label: {text: lab, opacity: 0.25, fontSize: "10px"}
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  function geocodeLatLng(geocoder, latlng) {
          geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              return results[0].zip;
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
    }
