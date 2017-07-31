
app.factory('cakesService', ['$http', 'localStorageService', '$filter', '$rootScope',
    function($http, localStorageService, $filter, $rootScope) {
        let service = {};
        service.cakes = [];

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
                    service.cakes = res.data;
                })
                .catch(function (e) {
                    return Promise.reject(e);
                });
        };

        self.addToCart = function (cake) {
            let valueStored = localStorageService.get($rootScope.UserName);
            if (!valueStored) {
                localStorageService.set($rootScope.UserName, [cake]);
                alert('Cake was added successfully');
            } else {
                var exist = valueStored.indexOf(cake);
                if (exist === 'undefined' || exist === -1) { // verify that the cake is not already in the cart
                    cake.Amount = 1;
                    valueStored.push(cake);
                    localStorageService.set($rootScope.UserName, valueStored);
                }
            }
        };

        return service;
    }]);