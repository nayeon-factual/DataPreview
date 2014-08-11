var grid;
var columns = [];
//[{"id":"name","name":"Name","field":"name"},{"id":"address","name":"Address","field":"address"},{"id":"address_extended","name":"Address Extended","field":"address_extended"},{"id":"po_box","name":"PO Box","field":"po_box"},{"id":"locality","name":"Locality (Town/City)","field":"locality"},{"id":"region","name":"Region (State/Province)","field":"region"},{"id":"postcode","name":"Post Code","field":"postcode"},{"id":"website","name":"Website","field":"website"},{"id":"latitude","name":"Latitude","field":"latitude"},{"id":"longitude","name":"Longitude","field":"longitude"},{"id":"country","name":"Country","field":"country"},{"id":"tel","name":"Tel","field":"tel"},{"id":"factual_id","name":"Factual ID","field":"factual_id"},{"id":"fax","name":"Fax","field":"fax"},{"id":"email","name":"Email","field":"email"},{"id":"category_ids","name":"Category IDs","field":"category_ids"},{"id":"category_labels","name":"Category Labels","field":"category_labels"},{"id":"chain_id","name":"Chain ID","field":"chain_id"},{"id":"chain_name","name":"Chain Name","field":"chain_name"},{"id":"neighborhood","name":"Neighborhood","field":"neighborhood"},{"id":"post_town","name":"Post Town","field":"post_town"},{"id":"admin_region","name":"Admin Region","field":"admin_region"},{"id":"hours","name":"Hours of Operations","field":"hours"},{"id":"hours_display","name":"Hours (display)","field":"hours_display"}] 
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
    console.log('gridColumns '+JSON.stringify(columns));
    $.get(readCall).done(function(data){
        var readResults = data.response.data;
        var dataArray = [];
        for(l=0; l<readResults.length; l++){
            dataArray[l] = {};
            for(c=0; c<columns.length; c++){
                var columnsField = columns[c].field;
                dataArray[l][columnsField]=readResults[l][columnsField];
            }
//            dataArray[l]['name']=result_name;
            
        }
        createGrid(dataArray);
    })
}

function createGrid(dataArray) {
  $(function () {
    grid = new Slick.Grid(".dataResultsGrid", dataArray, columns, options);
  })
}
