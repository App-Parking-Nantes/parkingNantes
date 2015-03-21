//Déclarayion de notre application AngularJS avec les modules nécessaires
var app = angular.module('ParkingNantes', ['ngRoute']);

/* Configuration des routes*/
app.config(['$routeProvider','$httpProvider',function ($routeProvider,$httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $routeProvider.when('/home', { 
        templateUrl: 'view/viewHome.html',
        controller:'HomeController'  
  })  
  .otherwise({redirectTo : '/home'});
}]);

