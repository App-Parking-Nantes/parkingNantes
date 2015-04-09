/*
 * Controller ListController
 */
app.controller('SingleController', ['$scope', '$http', '$location', '$rootScope', '$q', function($scope, $http, $location, $rootScope, $q) {

        $scope.parkings = [];
        $scope.infos = [];
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


        $scope.singleInformation = function(id) {
            $scope.infos = [];
            $scope.infos.parking;
            $scope.infos.localisation;
            $scope.infos.horaire = [];

            angular.forEach($scope.horaires, function(horaire) {
                console.log("hey")
                if (horaire._IDOBJ == id) {

                    $scope.infos.horaire.push(horaire);
                }
            });

            angular.forEach($scope.parkings, function(parking) {
                if (parking.IdObj == id) {

                    $scope.infos.parking = parking;
                }
            });

            angular.forEach($scope.localisations, function(localisation) {
                if (localisation._IDOBJ == id) {

                    $scope.infos.localisation = localisation;
                }
            });

        };

        $scope.dataParkings();
        $scope.dataHoraire();
        $scope.dataLocalisation();


    }]);

