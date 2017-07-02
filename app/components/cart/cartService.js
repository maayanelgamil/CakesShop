/**
 * Created by Maayan on 7/2/2017.
 */
app.factory('cartService', ['$http', 'localStorageService', '$filter', '$rootScope',
    function($http, localStorageService, $filter, $rootScope) {
        let service = {};

        service.getUserProducts = function(){
            if(!$rootScope.top5){
                $http.get('/cakes/top5')
                    .then(function (res) {
                        $rootScope.top5 = res.data;

                        if(!$rootScope.newProducts){
                            $http.get('/cakes/getNewCakes')
                                .then(function (res) {
                                    $rootScope.newProducts = res.data;
                                })
                                .catch(function (e) {
                                    return Promise.reject(e);
                                });
                        }
                    })
                    .catch(function (e) {
                        return Promise.reject(e);
                    });
            }
        };

        service.login = function(user) {
            return $http.post('/users/login', user)
                .then(function(response) {
                    let token = response.data.token;
                    $http.defaults.headers.common = {
                        'my-Token': token,
                        'user' : user.UserName
                    };
                    return Promise.resolve(response);
                })
                .catch(function (e) {
                    return Promise.reject(e);
                });
        };
        return service;
    }]);