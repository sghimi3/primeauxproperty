function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: -34.397, lng: 150.644}
    });
    var geocoder = new google.maps.Geocoder();
    GeocodeSet(geocoder, map, "3126 Caroljack Dr");
    alert(typeof 5);
}
function GeocodeSet(geocoder, resultsMap, address) {
    var address = address;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
}
function GeocodeConvert(geocoder, address){
    var address = address;
    geocoder.geocode({'address': address}, function(result, staus){
        if(status === 'Ok'){
            return result[0].geometry.location;
        }
    });
}
