
var dataPreviewControllers = angular.module('dataPreviewControllers', []);

dataPreviewApp.controller('dataPreviewCtrl', function ($scope) {
  $scope.query=[{name:"just view"}];
  $scope.data=[];
});

// dataPreviewApp.controller('viewsCtrl', function ($scope) {
//   $scope.query=["ice","ice","baby"];
//   $scope.data=[];
// });

// dataPreviewControllers.controller('tableViewCtrl', function ($scope) {
//   $scope.query=[{name:"tableViewwww"}];
//   $scope.data=[];
// });

// dataPreviewControllers.controller('mapViewCtrl', function ($scope) {
//   $scope.query=[{name:"mapViewwww"}];
//   $scope.data=[];
// });