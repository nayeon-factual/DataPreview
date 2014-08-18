angular.module('dataPreviewApp', [
	'ngRoute',
	'dataPreviewControllers'
])

.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'DataPreview.html',
        controller: 'dataPreviewCtrl'
      })
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