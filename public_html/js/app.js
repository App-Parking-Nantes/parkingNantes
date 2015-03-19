//Déclarayion de notre application AngularJS avec les modules nécessaires
var app = angular.module('ParkingNantes', ['ngRoute']);

/* Configuration des routes*/
app.config(['$routeProvider',function ($routeProvider) {
  $routeProvider.when('/home', { 
    templateUrl: 'view/viewHome.html',
    controller:'HomeController'  
  })  
  .otherwise({redirectTo : '/home'});
}]);

