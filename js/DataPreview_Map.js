
L.mapbox.accessToken = 'pk.eyJ1IjoibmF5ZW9uLWZhY3R1YWwiLCJhIjoiWTF1Nzk0SSJ9.HkA7gvIL9dZXrJ6Yy9gJog';
var map = L.mapbox.map('dataResultsMap', 'nayeon-factual.ijioib62')
  .setView([37.8, -96], 4);
  // .featureLayer.setGeoJSON(geojson);

var markers = new L.MarkerClusterGroup();

function initMap(coorSet){
  	markers.clearLayers();

  	for (var i = 0; i < coorSet.length; i++) {
      var a = coorSet[i];
      var marker = L.marker(new L.LatLng(a[0], a[1]));
      markers.addLayer(marker);
  	}
 	 map.addLayer(markers);
 
 	 map.fitBounds(markers.getBounds());
}
