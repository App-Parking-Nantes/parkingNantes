/*
 * Controller ListController
 */
app.controller('ListController', ['$scope', '$http', '$location', '$rootScope', '$q', function ($scope, $http, $location, $rootScope, $q) {

        $scope.parkings = [];
        $scope.infos =" " ;


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
        
        $scope.singleInformation = function(id){
            $scope.infos = id;
        };
        $scope.dataParkings();
 
   
    }]);
