var gridColumns = []; 
// var gridDataFields = [];
var readCall = "";

// var options = { for slickgrid
//     enableCellNavigation: true,
//     enableColumnReorder: false,
//     autoHeight: false
// };

var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
          if (columnfield == 'name') {
              return '<span style="margin: 4px; height:10px; float: ' + columnproperties.cellsalign + ';">' + value + '<br> factual id can go here' +'</span>';
          }
          else {
              return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
          }
      }

//Creates gridHeadings and puts them in gridColumns array
function populateDataGridHeading(fieldsDataObject){
    if(fieldsDataObject.label!='Address Extended'&&fieldsDataObject.label!='Category IDs'&&fieldsDataObject.label!='Chain ID'){
      var gridHeading = {};
      var gridHeadingType = {};
      gridHeading['text']=fieldsDataObject.label;
      gridHeading['datafield']=fieldsDataObject.name;
      gridHeading['align']='center';
      gridHeading['cellsalign']='left';
      gridHeading['cellsrenderer']=cellsrenderer;
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
      
      var dataAdapter = new $.jqx.dataAdapter(source, {
          loadComplete: function (dataArray) { },
          loadError: function (xhr, status, error) { }
      });

      // initialize jqxGrid
      $(".dataResultsGrid").jqxGrid(
        {
          width: 1290,
          height: 360,
          rowsheight:40,
          source: dataAdapter,
          pageable: true,
          pagesize: pageSizeLim,
          pagesizeoptions: ['20',pageSizeLim],
          autoheight: false,
          sortable: false,
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
