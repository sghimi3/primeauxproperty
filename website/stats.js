/*
SCHOOL API
https://data.brla.gov/resource/4gku-4cqw.json

OPEN SCHOOLS
https://data.brla.gov/resource/4gku-4cqw.json?open_closed=O
*/


//Get all open schools
$.ajax({
    url: "https://data.brla.gov/resource/4gku-4cqw.json?open_closed=O&recno=???",
    type: "GET",
    data: {
      "$limit" : 1000,
      "$$app_token" : "OBimKBKVR5rBKKLHnMg5ENdx2"
    }
}).done(function(data) {
  //give list of them
  for (var i = 0; i < data.length; i++){
    if(data[i].geolocation != null){
      var coords = data[i].geolocation.coordinates;
      var test = {lat: coords[1], lng: coords[0]};
      locations.push(test);
    }
  }
});

$(#school).click(function(){
  alert("school clicked");
})


//On click, return unique record num of school. 

//take json text and make object
var objSchool = JSON.parse(text);

//display json info
document.getElementById("school").innerHTML = "Name: " + objSchool.name + 
                                              "<br>Grade Levels: " + objSchool.gradelevels +
                                              "<br>Type: " + objSchool.public_private +
                                              "<br>Phone Number: " + objSchool.phone_number +
                                              "<br>Website: " + objSchool.website +
                                              "<br>Address: " + objSchool.geolocation;
