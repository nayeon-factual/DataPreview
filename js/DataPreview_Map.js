L.mapbox.accessToken = 'pk.eyJ1IjoibmF5ZW9uLWZhY3R1YWwiLCJhIjoiWTF1Nzk0SSJ9.HkA7gvIL9dZXrJ6Yy9gJog';

L.mapbox.map('dataResultsMap', 'nayeon-factual.ijioib62')
  .setView([37.8, -96], 4)
  .featureLayer.setGeoJSON(geojson);