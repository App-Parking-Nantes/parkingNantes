/*
 * Controller HomeController
 */
app.controller('HomeController', ['$scope', '$http', '$location', '$rootScope', '$q', function($scope, $http, $location, $rootScope, $q) {

        $scope.parkings = [];

        //On récupère les données
        var deferred = $q.defer();

        // http://stackoverflow.com/questions/22546177/cross-domain-http-request-angularjs --> CROSS DOMAIN
        // http://stackoverflow.com/questions/26262235/jsonp-returning-uncaught-syntaxerror-unexpected-token-angularjs-routingnu -> json callback
        // http://stackoverflow.com/questions/16661032/http-get-is-not-allowed-by-access-control-allow-origin-but-ajax-is -> allow Origin

        $http.get("http://baptistedixneuf.fr/parking/").
                success(function(data, status) {
                    deferred.resolve(data);
                }).
                error(function(data, status) {
                    deferred.reject('Erreur requete ajax: Connexion serveur impossible');
                });

        data = deferred.promise;

        $scope.parkings = data.then(function(data) {
            $scope.parkings = data;
        }, function(msg) {
            alert(msg);
        });


    }]);
