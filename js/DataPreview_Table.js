var gridColumns = []; 
var hiddenColumns = ['post_town', 'admin_region', 'address_extended', 'hours', 'category_ids', 'chain_id'];
var nameColumn = ['name', 'factual_id'];
var locationColumn = ['address', 'po_box' ,'locality', 'region', 'postcode','country'];
var latlngColumn = ['latitude', 'longitude'];
var contactColumn = ['website' ,'tel', 'fax' ,'email'];
var readCall = "";

// var options = { for slickgrid
//     enableCellNavigation: true,
//     enableColumnReorder: false,
//     autoHeight: false
// };
var columnsrenderer = function (value) {
  return '<div style= "height: 20px; font-family: Helvetica Neue,Helvetica,Arial,sans-serif; text-align: center; margin: 5px;">' + value + '</div>';
}

var cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties, rowdata) {
          if (Object.prototype.toString.call(value) == '[object Array]') {

            if(columnfield == 'name'){
              return '<span style="margin:4px 8px; font-size:13px; float:' + columnproperties.cellsalign + ';"> <b>' + value[0] + '</b> <br> <a href="http://www.factual.com/'+value[1]+'">' + value[1] +'</a></span>';
            
            }else if(columnfield == 'location'){
              var pobox = formatDataDisplay(' ', value[1]);
              var addressStr = value[0] + '<br>' + value[2] + ', ' + value[3] + ', ' + value[5].toUpperCase() + ' ' + value[4];
              return '<span style="margin:4px 8px; float:' + columnproperties.cellsalign + ';">' + addressStr + '<br> PO Box:' + pobox +'</span>';
            
            }else if(columnfield == 'contact'){
              var tel = formatDataDisplay('Tel: ', value[1]);
              var fax = formatDataDisplay(' | Fax: ', value[2]);
              var email = formatDataDisplay(' ', value[3]);
              var website = formatDataDisplay('', value[0]);
              return '<span style="margin:4px 8px; float:' + columnproperties.cellsalign + ';"> ' + tel + fax + '<br> Email:' + email + '<br> Website: ' + value[0] +'</span>';
            
            }else if(columnfield == 'latlng'){
              return '<span style="margin:4px 8px; float:' + columnproperties.cellsalign + ';"> ' + value[0] + ', <br> ' + value[1] +'</span>';
            }  
          }

          else {
              return '<span style="margin: 4px 8px; float: ' + columnproperties.cellsalign + ';">' + value + '</span>';
          }
      }

function formatDataDisplay(field, value){
  if(value == null){
    return '';
  }else{
    return field + value;
  }
}

//Creates gridHeadings and puts them in gridColumns array
function populateDataGridHeading(fieldsDataObject){

    if(hiddenColumns.indexOf(fieldsDataObject.name) == -1){
      var gridHeading = {};
      gridHeading['align']='center';
      gridHeading['cellsalign']='left';
      gridHeading['cellsrenderer']=cellsrenderer;
      gridHeading['renderer']=columnsrenderer;

      if(nameColumn.indexOf(fieldsDataObject.name) == -1 && locationColumn.indexOf(fieldsDataObject.name) == -1 && latlngColumn.indexOf(fieldsDataObject.name) == -1 && contactColumn.indexOf(fieldsDataObject.name) == -1){
        gridHeading['text']=fieldsDataObject.label;
        gridHeading['datafield']=fieldsDataObject.name;
        if(fieldsDataObject.name=='category_labels'){
          gridHeading['width']=250;
        }else if(fieldsDataObject.name=='chain_name'){
          gridHeading['width']=100;
        }else if(fieldsDataObject.name=='neighborhood'){
          gridHeading['width']=100;
        }else if(fieldsDataObject.name=='hours_display'){
          gridHeading['width']=800;
        }else{
          gridHeading['width']=200;
        }

      }else if(nameColumn.indexOf(fieldsDataObject.name) == 0){
        gridHeading['text']='Name';
        gridHeading['datafield']='name';
        gridHeading['width']=290;
      }else if(locationColumn.indexOf(fieldsDataObject.name) == 0){
        gridHeading['text']='Location/Address';
        gridHeading['datafield']='location';
        gridHeading['width']=400;
      }else if(latlngColumn.indexOf(fieldsDataObject.name) == 0){
        gridHeading['text']='Lat/Lng';
        gridHeading['datafield']='latlng';
        gridHeading['width']=90;
      }else if(contactColumn.indexOf(fieldsDataObject.name) == 0){
        gridHeading['text']='Contact Information';
        gridHeading['datafield']='contact';
        gridHeading['width']=300;
      }
      if(Object.keys(gridHeading).indexOf('text')!=-1)
        gridColumns.push(gridHeading);
    }
}

function populateGridData(readResults){
  var dataArray = [];
    for(l=0; l<readResults.length; l++){
      dataArray[l] = {};
      var nameList = [];
      var locationList = [];
      var latlngList = [];
      var contactList = [];

      for(c=0; c < gridColumns.length; c++){

          var gridColumnsText = gridColumns[c].text;
          var gridColumnsField = gridColumns[c].datafield;

          if(gridColumnsField == 'name'){
            for(i=0; i<nameColumn.length; i++){
              var nameField = nameColumn[i];
              nameList.push(readResults[l][nameField]);
            }
              dataArray[l]['name']=nameList;

          }else if(gridColumnsField == 'location'){
            for(i=0; i<locationColumn.length; i++){
              var locField = locationColumn[i];
              locationList.push(readResults[l][locField]);
            }
              dataArray[l]['location']=locationList;

          }else if(gridColumnsText == 'Lat/Lng'){
            for(i=0; i<latlngColumn.length; i++){
              var latlngField = latlngColumn[i];
              latlngList.push(readResults[l][latlngField]);
            }
              dataArray[l]['latlng']=latlngList;

          }else if(gridColumnsText == 'Contact Information'){
            for(i=0; i<contactColumn.length; i++){
              var contactField = contactColumn[i];
              contactList.push(readResults[l][contactField]);
            }
              dataArray[l]['contact']=contactList;
          }else{
            dataArray[l][gridColumnsField]=readResults[l][gridColumnsField];
          }
      }
  }
  console.log('dataarr '+JSON.stringify(dataArray));
  createjqxGrid(dataArray);                 
}

function createjqxGrid(dataArray) {
  $(document).ready(function () {
      // prepare the data
      var source =
      {
          datatype: "array",
          localdata: dataArray
      };
      
      var dataAdapter = new $.jqx.dataAdapter(source, {
          loadComplete: function (dataArray) { },
          loadError: function (xhr, status, error) { }
      });

      // initialize jqxGrid
      $(".dataResultsGrid").jqxGrid(
        {
          // autowidth: true,
          width: '90%',
          height: '60%',
          //each row supports 3 lines
          rowsheight:60,
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
          selectionmode: 'none',
          enablehover: false,
          columns: gridColumns,
          theme: 'custom'
        });
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
