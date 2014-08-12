var columns = []; 
var readCall = "";

var options = {
    enableCellNavigation: true,
    enableColumnReorder: false,
    autoHeight: false
};

function populateDataGridHeading(fieldsDataObject){
    if(fieldsDataObject.label!='Address Extended'&&fieldsDataObject.label!='Category IDs'&&fieldsDataObject.label!='Chain ID'){
      var gridHeading = {};
      gridHeading['id']=fieldsDataObject.name;
      gridHeading['name']=fieldsDataObject.label;
      gridHeading['field']=fieldsDataObject.name;
      gridHeading['sortable']=true;
      columns.push(gridHeading);
    }
}

function makeReadCall(){
    var initReadCall = URL.replace('www.factual.com/data','api.v3.factual.com');
    initReadCall += '&limit=50&KEY='+key;
    readCall = initReadCall.replace(table_id+'#',table_id+'?');
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
            dataArray[l]['id']=readResults[l]['factual_id']
        }
        createGrid(dataArray);
    })
}

function createGrid(dataArray) {
  $(function () {
      var dataView = new Slick.Data.DataView();
      var grid = new Slick.Grid(".dataResultsGrid", dataView, columns, options);
      grid.setSelectionModel(new Slick.RowSelectionModel());
      
      dataView.onRowCountChanged.subscribe(function (e, args) {
          grid.updateRowCount();
          grid.render();
      });
      dataView.onRowsChanged.subscribe(function(e,args) {
          grid.invalidateRows(args.rows);
          grid.render();
      });
      
//      dataView.beginUpdate();
      dataView.setItems(dataArray);
//      dataView.endUpdate();
      
      grid.onSort.subscribe(function(e, args) {
          var comparer = function(a, b) {
              return (a[args.sortCol.field] > b[args.sortCol.field]) ? 1 : -1;
          }
      dataView.sort(comparer, args.sortAsc);
      });
      
  })
}
