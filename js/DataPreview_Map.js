var oauth, options;

options = {
    // enablePrivilege: true,
    consumerKey: 'i9VTDsvooscG7eFQ6ycBX16gwAvLqOVUDv9u2dMh',
    consumerSecret: 'uowo6n31xVVg0UuwVfKJnbxCguCuLM0muJljvFxf'
};

oauth = OAuth(options);

L.mapbox.accessToken = 'pk.eyJ1IjoibmF5ZW9uLWZhY3R1YWwiLCJhIjoiWTF1Nzk0SSJ9.HkA7gvIL9dZXrJ6Yy9gJog';
var map = L.mapbox.map('dataResultsMap', 'nayeon-factual.ijioib62')
  .setView([37.8, -96], 4);
  // .featureLayer.setGeoJSON(geojson);

var markers = new L.MarkerClusterGroup();

function initMap(coorSet){
  	markers.clearLayers();
   	for (var i = 0; i < coorSet.length; i++) {
      var a = coorSet[i];
      if(a[2]!=undefined){
      	var f_id = a[2];
      }else{
      	var f_id = "";
      }
      var marker = L.marker(new L.LatLng(a[0], a[1]), {
      	// icon:
      	url:"http://www.factual.com/"+f_id
      });
      markers.addLayer(marker);
  	}
 	 map.addLayer(markers);

 	markers.on('click', function(e){
  		// console.log(e);
  		var openURL = e.layer.options.url;
 		window.open(openURL);
 	});
 	console.log(markers.getBounds());
 	 map.fitBounds(markers.getBounds());
}
