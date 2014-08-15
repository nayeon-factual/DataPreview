L.mapbox.accessToken = 'pk.eyJ1IjoibmF5ZW9uLWZhY3R1YWwiLCJhIjoiWTF1Nzk0SSJ9.HkA7gvIL9dZXrJ6Yy9gJog';
var geojson = [
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-77.03238901390978,38.913188059745586]
    },
    "properties": {
      "title": "Mapbox DC",
      "description": "1714 14th St NW, Washington DC",
      "marker-color": "#fc4353",
      "marker-size": "large",
      "marker-symbol": "monument"
    }
  },
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [-122.414, 37.776]
    },
    "properties": {
      "title": "Mapbox SF",
      "description": "155 9th St, San Francisco",
      "marker-color": "#fc4353",
      "marker-size": "large",
      "marker-symbol": "harbor"
    }
  }
];

L.mapbox.map('map', 'examples.map-i86nkdio')
  .setView([37.8, -96], 4)
  .featureLayer.setGeoJSON(geojson);