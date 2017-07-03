

app.controller('cakesController', ['$scope', '$http','localStorageService','UserService', 'cakesService', '$rootScope',
    function($scope, $http, localStorageService, UserService, cakesService, $rootScope) {
        let self = this;
        $http.get('/categories')
            .then(function (res) {
                self.categories = res.data;
                if(!$rootScope.guest && !$rootScope.allCakes) {
                    cakesService.getRecommendedProducts().then(cakesService.allCakes);
                }
            })
            .catch(function (e) {
                return Promise.reject(e);
            });

    }]);
