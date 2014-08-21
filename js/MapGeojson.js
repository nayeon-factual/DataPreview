// var geojson = [];

// var coordinate1 = [-77.03238901390978,38.913188059745586];
// var coordinate2 = [-122.414, 37.776];

// var marker1 = {
//     "type": "Feature",
//     "geometry": {
//       "type": "Point",
//       "coordinates": coordinate1
//     },
//     "properties": {
//       "title": "Mapbox DC",
//       "description": "1714 14th St NW, Washington DC",
//       "marker-color": "#fc4353",
//       "marker-size": "large",
//       "marker-symbol": "monument"
//     }
//   };

//   var marker2 = {
//     "type": "Feature",
//     "geometry": {
//       "type": "Point",
//       "coordinates": coordinate2
//     },
//     "properties": {
//       "title": "Mapbox SF",
//       "description": "155 9th St, San Francisco",
//       "marker-color": "#fc4353",
//       "marker-size": "large",
//       "marker-symbol": "harbor"
//     }
//   };

// geojson.push(marker1);
// geojson.push(marker2);

function getCoordinates(readResults){
  var coorSet = [];
    for(l=0; l<readResults.length; l++){
      var coor = [];
      if(readResults[l]['latitude']!=undefined&&readResults[l]['longitude']!=undefined){
        var lat = readResults[l]['latitude'];
        var lng = readResults[l]['longitude'];
        var id = readResults[l]['factual_id'];
          coor[0]=lat;
          coor[1]=lng;
          coor[2]=id;
          coorSet.push(coor);
      }
    }
    initMap(coorSet);
}

