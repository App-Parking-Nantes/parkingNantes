//Déclarayion de notre application AngularJS avec les modules nécessaires
var app = angular.module('ParkingNantes', ['ngRoute']);

/* Configuration des routes*/
app.config(['$routeProvider','$httpProvider',function ($routeProvider,$httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $routeProvider.when('/maps', { 
        templateUrl: 'view/viewMaps.html',
        controller:'MapsController'  
  }).when('/list',{
        templateUrl :'view/viewList.html',
        controller :'ListController'
  })       
  .otherwise({redirectTo : '/maps'});
}]);



(function($) {

    $('#header__icon').click(function(e) {
        e.preventDefault();
        $('body').toggleClass('with--sidebar');
    });

    $('#site-cache').click(function(e) {
        $('body').removeClass('with--sidebar');
    });
    
    $('.menu').click(function(e) {
        $('body').removeClass('with--sidebar');
    });

})(jQuery);
