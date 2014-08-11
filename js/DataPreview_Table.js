var grid;
var columns = []; 
var readCall = "";

var options = {
enableCellNavigation: true,
enableColumnReorder: false
};

function populateDataGridHeading(fieldsDataObject){
    var gridHeading = {};
    gridHeading['id']=fieldsDataObject.name;
    gridHeading['name']=fieldsDataObject.label;
    gridHeading['field']=fieldsDataObject.name;
    columns.push(gridHeading);
}

function makeReadCall(){
    var initReadCall = URL.replace('www.factual.com/data','api.v3.factual.com');
    initReadCall += '&limit=50&KEY='+key;
    readCall = initReadCall.replace('places#','places?');
//    console.log('gridColumns '+JSON.stringify(columns));
    $.get(readCall).done(function(data){
        var readResults = data.response.data;
        var dataArray = [];
        for(l=0; l<readResults.length; l++){
            dataArray[l] = {};
            for(c=0; c<columns.length; c++){
                var columnsField = columns[c].field;
                dataArray[l][columnsField]=readResults[l][columnsField];
            }            
        }
        createGrid(dataArray);
    })
}

function createGrid(dataArray) {
  $(function () {
    grid = new Slick.Grid(".dataResultsGrid", dataArray, columns, options);
  })
}
