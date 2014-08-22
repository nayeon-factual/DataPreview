
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

