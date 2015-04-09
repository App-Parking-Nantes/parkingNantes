/*
 * Controller HomeController
 */
app.controller('MapsController', ['$scope', '$http', '$location', '$rootScope', '$q',function ($scope, $http, $location, $rootScope, $q) {

        $scope.parkings = [];
        $scope.horaires = [];
        $scope.localisations = [];

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



        $scope.dataParkings = function () {

            //On récupère les données
            var deferred = $q.defer();


            $http.get("http://baptistedixneuf.fr/parking/parkings.php").
                    success(function (data, status) {
                        deferred.resolve(data);
                    }).
                    error(function (data, status) {
                        deferred.reject('Erreur requete ajax: Connexion serveur impossible');
                    });

            data = deferred.promise;

            $scope.parkings = data.then(function (data) {
                $scope.parkings = data.opendata.answer.data.Groupes_Parking.Groupe_Parking;
            }, function (msg) {
                alert(msg);
            });
        };


        $scope.dataHoraire = function () {
            //On récupère les données
            var deferred = $q.defer();

            $http.get("http://baptistedixneuf.fr/parking/horaireParkings.php").
                    success(function (data, status) {
                        deferred.resolve(data);
                    }).
                    error(function (data, status) {
                        deferred.reject('Erreur requete ajax: Connexion serveur impossible');
                    });

            data = deferred.promise;

            $scope.horaires = data.then(function (data) {
                $scope.horaires = data.data;
            }, function (msg) {
                alert(msg);
            });
        };


        $scope.dataLocalisation = function () {
            //On récupère les données
            var deferred = $q.defer();

            $http.get("http://baptistedixneuf.fr/parking/localisation.php").
                    success(function (data, status) {
                        deferred.resolve(data);
                    }).
                    error(function (data, status) {
                        deferred.reject('Erreur requete ajax: Connexion serveur impossible');
                    });

            data = deferred.promise;

            $scope.localisations = data.then(function (data) {
                $scope.localisations = data.data;
            }, function (msg) {
                alert(msg);
            });
        };
        
        
        $scope.singleInformation = function(id){
            $scope.infos = [];
            $scope.infos.parking;
            $scope.infos.localisation;
            $scope.infos.horaire = [];
            
            angular.forEach($scope.horaires, function(horaire) {
              if(horaire._IDOBJ == id){
                  
                  $scope.infos.horaire.push(horaire)  ;
              }
            });
            
            angular.forEach($scope.parkings, function(parking) {
              if(parking.IdObj == id){
                 
                  $scope.infos.parking=parking  ;
              }
            });
            
            angular.forEach($scope.localisations, function(localisation) {
              if(localisation._IDOBJ == id){
                 
                  $scope.infos.localisation=localisation  ;
              }
            });
   
        };
        
        
       $scope.jointureParkingLocalisation = function(){           
            var promise1 = $http({method: 'GET', url: 'http://baptistedixneuf.fr/parking/parkings.php', cache: 'true'});
            var promise2 = $http({method: 'GET', url: 'http://baptistedixneuf.fr/parking/localisation.php', cache: 'true'});

            $q.all([promise1, promise2]).then(function(data){
                console.log(data[0], data[1]);

                dataParkings= data[0].data.opendata.answer.data.Groupes_Parking.Groupe_Parking;
                dataLocalisations = data[1].data.data;

                angular.forEach(dataParkings, function(parking,key) {
                    console.log("boucle parking: "+ parking);
                    angular.forEach(dataLocalisations, function(localisation) {
                        console.log("localisation"+localisation._l);
                        if(parking.IdObj==localisation._IDOBJ){
                            console.log("find");
                            $scope.parkings[key].localisation= [];
                            $scope.parkings[key].localisation.push(localisation);
                            console.log($scope.parkings[key].localisation._l);

                        }
                    });
                });

            });
             
           
           
        };
       
        


        $scope.dataParkings();
        $scope.dataHoraire();
        $scope.dataLocalisation();
         
        $scope.jointureParkingLocalisation();
        
           
        $scope.$on('mapInitialized', function (event, map) {
            $scope.objMapa = map;
         });

         $scope.showInfoWindow = function (event, p) {
            var infowindow = new google.maps.InfoWindow();
            var center = new google.maps.LatLng(p._l[0],p._l[1]);
            $scope.singleInformation(p._IdObj);

            infowindow.setContent(
                '<h3>' + p._l + '</h3>');

            infowindow.setPosition(center);
            infowindow.open($scope.objMapa);
         };

    }]);
