var locations = [];
var schools = [];

var call1 = $.ajax({
    url: "https://data.brla.gov/resource/5rji-ddnu.json",
    type: "GET",
    data: {
      "$limit" : 500,
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

