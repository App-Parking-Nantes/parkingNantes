//Déclaration de notre application AngularJS avec les modules nécessaires
var app = angular.module('ParkingNantes', ['ngRoute','ngMap']);

/* Configuration des routes*/
app.config(['$routeProvider','$httpProvider',function ($routeProvider,$httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    
    $routeProvider.when('/maps', { 
        // localProd
            //templateUrl: 'view/viewMaps.html',
        //onlineDev
        templateUrl: 'https://rawgit.com/App-Parking-Nantes/parkingNantes/master/public_html/view/viewMaps.html',        
        controller:'MapsController'  
    }).when('/list',{
        // localProd
            //templateUrl :'view/viewList.html',
        //onlineDev
        templateUrl: 'https://rawgit.com/App-Parking-Nantes/parkingNantes/master/public_html/view/viewList.html',
        controller :'MapsController'
    })
    .when('/single/:idParking',{
        // localProd
            //templateUrl : 'view/viewSingle.html',
        //onlineDev
        templateUrl: 'https://rawgit.com/App-Parking-Nantes/parkingNantes/master/public_html/view/viewSingle.html',
        controller : 'MapsController'
    })
    .otherwise({redirectTo : '/maps'});
    
    
}]);



//JS pour le menu
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
