/**
 * Created by Maayan on 7/3/2017.
 */
app.factory('cakesService', ['$http', 'localStorageService', '$filter', '$rootScope',
    function($http, localStorageService, $filter, $rootScope) {
        let service = {};

        service.getRecommendedProducts = function(){
             return $http.get('/users/recommandation/' + $rootScope.UserName)
                    .then(function (res) {
                        $rootScope.recommendedCakes = res.data;
                        Promise.resolve(res.data);
                    })
                    .catch(function (e) {
                        return Promise.reject(e);
                    });
        };

        service.allCakes = function(){
            return $http.get('/cakes/')
                .then(function (res) {
                    $rootScope.allCakes = res.data;
                    Promise.resolve(res.data);
                })
                .catch(function (e) {
                    return Promise.reject(e);
                });
        };


        return service;
    }]);