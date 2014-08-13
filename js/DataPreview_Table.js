var gridColumns = []; 
// var gridDataFields = [];
var readCall = "";

// var options = { for slickgrid
//     enableCellNavigation: true,
//     enableColumnReorder: false,
//     autoHeight: false
// };

//Creates gridHeadings and puts them in gridColumns array
function populateDataGridHeading(fieldsDataObject){
    if(fieldsDataObject.label!='Address Extended'&&fieldsDataObject.label!='Category IDs'&&fieldsDataObject.label!='Chain ID'){
      var gridHeading = {};
      var gridHeadingType = {};
      gridHeading['text']=fieldsDataObject.label;
      gridHeading['datafield']=fieldsDataObject.name;
      gridHeading['align']='center';
      gridHeading['cellsalign']='left';
      //gridHeading['width']=?;
      // gridHeadingType['name']=fieldsDataObject.name;
      // gridHeadingType['type']=fieldsDataObject.datatype;
      gridColumns.push(gridHeading);
    }
}

function makeReadCall(){
    var initReadCall = URL.replace('www.factual.com/data','api.v3.factual.com');
    initReadCall += '&limit=50&KEY='+key;
    readCall = initReadCall.replace(table_id+'#',table_id+'?');
    $.get(readCall).done(function(data){
        var readResults = data.response.data;
        var dataArray = [];
        for(l=0; l<readResults.length; l++){
            dataArray[l] = {};
            for(c=0; c<gridColumns.length; c++){
                var gridColumnsField = gridColumns[c].datafield;
                dataArray[l][gridColumnsField]=readResults[l][gridColumnsField];
            }
            dataArray[l]['id']=readResults[l]['factual_id']
        }
        createjqxGrid(dataArray);
    })
}

function createjqxGrid(dataArray) {
  $(document).ready(function () {
      // prepare the data
      var source =
      {
          datatype: "array",
          localdata: dataArray,
          // datafields: gridDataFields,
          // root: "Products",
          // record: "Product",
          // id: 'ProductID',
      };
      // var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
      //     if (value < 20) {
      //         return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
      //     }
      //     else {
      //         return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
      //     }
      // }
      var dataAdapter = new $.jqx.dataAdapter(source, {
          loadComplete: function (dataArray) { },
          loadError: function (xhr, status, error) { }
      });

      // initialize jqxGrid
      $(".dataResultsGrid").jqxGrid(
        {
          width: 1290,
          source: dataAdapter,
          // theme:theme,                
          // pageable: true,
          autoheight: false,
          sortable: true,
          columnsResize:true,
          // altrows: true,
          // enabletooltips: true,
          editable: false,
          selectionmode: 'singlerow',
          columns: gridColumns
        });
      $('.dataResultsGrid').jqxGrid('autoresizecolumns'); 
  });
}

// function createGrid(dataArray) {
//   $(function () {
//       var dataView = new Slick.Data.DataView();
//       var grid = new Slick.Grid(".dataResultsGrid", dataView, columns, options);
//       grid.setSelectionModel(new Slick.RowSelectionModel());
      
//       dataView.onRowCountChanged.subscribe(function (e, args) {
//           grid.updateRowCount();
//           grid.render();
//       });
//       dataView.onRowsChanged.subscribe(function(e,args) {
//           grid.invalidateRows(args.rows);
//           grid.render();
//       });
      
// //      dataView.beginUpdate();
//       dataView.setItems(dataArray);
// //      dataView.endUpdate();
      
//       grid.onSort.subscribe(function(e, args) {
//           var comparer = function(a, b) {
//               return (a[args.sortCol.field] > b[args.sortCol.field]) ? 1 : -1;
//           }
//       dataView.sort(comparer, args.sortAsc);
//       });
      
//   })
// }
