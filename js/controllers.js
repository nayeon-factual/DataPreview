var dataPreviewApp = angular.module('dataPreviewApp', ['ngRoute']);
// var dataPreviewControllers = angular.module('dataPreviewControllers', []);

dataPreviewApp.config(function ($routeProvider) {
    $routeProvider

      // .when('/', {
      //   templateUrl: 'DataPreview.html',
      //   controller: 'dataPreviewCtrl'
      // })

      .when('/table', {
        templateUrl: 'partials/DPTable.html',
        controller: 'tableViewCtrl'
      })

      .when('/map', {
        templateUrl: 'partials/DPMap.html',
        controller: 'mapViewCtrl'
      })

      .otherwise({
        redirectTo: '/table'
      });

  });


// dataPreviewApp.controller('dataPreviewCtrl', function ($scope) {
//   $scope.query=["dataPreviewCtrl in works!"];
//   $scope.data=[];
// });

dataPreviewApp.controller('tableViewCtrl', function ($scope) {
  $scope.query=["tableviewctrl in works!!"];
  $scope.data=[];
});

dataPreviewApp.controller('mapViewCtrl', function ($scope) {
  $scope.query=["mapviewctrl in works!!"];
  $scope.data=[];
});

// dataPreviewControllers.controller('tableViewCtrl', function ($scope) {
//   $scope.query=[{name:"tableViewwww"}];
//   $scope.data=[];
//   function populateGridData(readResults){
//   var dataArray = [];
//     for(l=0; l<readResults.length; l++){
//       dataArray[l] = {};
//       var nameList = [];
//       var locationList = [];
//       var latlngList = [];
//       var contactList = [];

//       for(c=0; c < gridColumns.length; c++){

//           var gridColumnsText = gridColumns[c].text;
//           var gridColumnsField = gridColumns[c].datafield;

//           if(gridColumnsField == 'name'){
//             for(i=0; i<nameColumn.length; i++){
//               var nameField = nameColumn[i];
//               nameList.push(readResults[l][nameField]);
//             }
//               dataArray[l]['name']=nameList;

//           }else if(gridColumnsField == 'location'){
//             for(i=0; i<locationColumn.length; i++){
//               var locField = locationColumn[i];
//               locationList.push(readResults[l][locField]);
//             }
//               dataArray[l]['location']=locationList;

//           }else if(gridColumnsText == 'Lat/Lng'){
//             for(i=0; i<latlngColumn.length; i++){
//               var latlngField = latlngColumn[i];
//               latlngList.push(readResults[l][latlngField]);
//             }
//               dataArray[l]['latlng']=latlngList;

//           }else if(gridColumnsText == 'Contact Information'){
//             for(i=0; i<contactColumn.length; i++){
//               var contactField = contactColumn[i];
//               contactList.push(readResults[l][contactField]);
//             }
//               dataArray[l]['contact']=contactList;
//           }else{
//             dataArray[l][gridColumnsField]=readResults[l][gridColumnsField];
//           }
//       }
//   }
//   console.log('dataarr '+JSON.stringify(dataArray));
//   createjqxGrid(dataArray);                 
// }
// });

// dataPreviewControllers.controller('mapViewCtrl', function ($scope) {
//   $scope.query=[{name:"mapViewwww"}];
//   $scope.data=[];
// });

// // phonecatControllers.controller('PhoneListCtrl', ['$scope', '$http',
// //   function ($scope, $http) {
// //     $http.get('phones/phones.json').success(function(data) {
// //       $scope.phones = data;
// //     });

// //     $scope.orderProp = 'age';
// //   }]);