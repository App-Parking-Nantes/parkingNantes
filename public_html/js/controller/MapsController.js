/*
 * Controller HomeController
 */
app.controller('MapsController', ['$scope', '$http', '$location', '$rootScope', '$q', '$routeParams', '$sce',function ($scope, $http, $location, $rootScope, $q, $routeParams,$sce) {

        $scope.parkings = []; 

        /**
         * Problème liée au cross-domain
         * exécution de code JavaScript dans un navigateur répond å certaines
         * contraintes de sécurité, tel que l'exécution "cross-domain", 
         * en particulier pour les requêtes Ajax.
         * Comprendre que pour une page s'exécutant sur un domaine "x",
         * le navigateur ne va pas forcément exécuter directement 
         * le code chargé depuis un domaine "y".
         */
        // http://stackoverflow.com/questions/22546177/cross-domain-http-request-angularjs --> CROSS DOMAIN
        // http://stackoverflow.com/questions/26262235/jsonp-returning-uncaught-syntaxerror-unexpected-token-angularjs-routingnu -> json callback
        // http://stackoverflow.com/questions/16661032/http-get-is-not-allowed-by-access-control-allow-origin-but-ajax-is -> allow Origin
        // http://openclassrooms.com/forum/sujet/jquery-getjson-sans-parametres-75069 
        // http://data.nantes.fr/forum/?tx_mmforum_pi1%5Baction%5D=list_post&tx_mmforum_pi1%5Btid%5D=123        
        
        
        
        $scope.data = function(){ 
            
            var deferred = $q.defer();
            
            var promise0 = $http({method: 'GET', url: 'http://baptistedixneuf.fr/parking/parkings.php', cache: 'true'});
            var promise1 = $http({method: 'GET', url: 'http://baptistedixneuf.fr/parking/localisation.php', cache: 'true'});
            var promise2 = $http({method: 'GET', url: 'http://baptistedixneuf.fr/parking/horaireParkings.php', cache: 'true'});

            $q.all([promise0, promise1, promise2]).then(function(data){
               // console.log(data[0], data[1], data[2]);

                $scope.parkings= data[0].data.opendata.answer.data.Groupes_Parking.Groupe_Parking;
                localisations = data[1].data.data;
                horaires= data[2].data.data;

                //Jointure Parking <=> Localisation
                angular.forEach($scope.parkings, function(parking,key) {                    
                    angular.forEach(localisations, function(localisation) {                       
                        if(parking.IdObj==localisation._IDOBJ){
                            // console.log("find");                            
                            $scope.parkings[key].localisation=localisation;
                        }
                    });
                });
                
                //Jointure Parking <=> Horaires                 
                angular.forEach($scope.parkings, function(parking,key) { 
                    $scope.parkings[key].horairesArray= [];
                    angular.forEach(horaires, function(horaire) {                       
                        if(parking.IdObj==horaire._IDOBJ){                                                     
                            $scope.parkings[key].horairesArray.push(horaire); 
                        }
                    });
                });
                
                deferred.resolve($scope.parkings);

            }), function(reason) {
                alert('Failed: ' + reason);
                deferred.reject('Errreur chargement données ');
            };
            
            return deferred.promise;
        };
        
        
        $scope.one = function(idParking){  
            
            angular.forEach($scope.parkings, function(parking,key) {                       
                if(parking.IdObj==idParking){                                                     
                    $scope.infos = $scope.parkings[key];  
                }
            });
            console.log($scope.infos);
        };
        
                          
        $scope.$on('mapInitialized', function (event, map) {
            $scope.objMapa = map;
        });
        

        $scope.showInfoWindow = function (event, p) {
            /*console.log($scope.map.InfoWindow);
             for (var key in $scope.map.InfoWindow) {
                $scope.objMapa.InfoWindow[key].close;
            };
           
            
            var infowindow = new google.maps.InfoWindow();           
            var center = new google.maps.LatLng(p.localisation._l[0],p.localisation._l[1]);
            $scope.one(p.IdObj);
            console.log(p) ;
            infowindow.setContent(
                '<h4>' + p.Grp_nom + '</h4>'
                +'<ul>'
                +'<li> Place disponible : '+ p.Grp_disponible+'</li>'
                +'</ul>');
            infowindow.setPosition(center);
            infowindow.open($scope.objMapa);*/
            
        };
        
        
        //Main
        var init = function () {
           
            
            if(typeof $routeParams.idParking !== 'undefined') { 
                 console.log($routeParams.idParking);
                $scope.data().then(function() {
                    $scope.one($routeParams.idParking);
                }, function(reason) {
                  alert('Failed: ' + reason);
                });
            }else{
                $scope.data();  
            }
        };

        // fire on controller loaded
        init();          
       

    }]);
