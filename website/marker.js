function init() {
	var geocoder = new google.maps.Geocoder();
	var maps = document.getElementById('map');
	AddMarker(maps, GeocodeConvert(geocoder, "3126 Caroljack Dr."));
	console.log("maniowanaiyou");
}
function GeocodeConvert(geocoder, address){
    var address = address;
    geocoder.geocode({'address': address}, function(result, staus){
        if(status === 'Ok'){
            return result[0].geometry.location;
        }
    });
}
function AddMarker(maps, location)
{
	var mark = new google.maps.Marker({position: location, draggable: true});
}
