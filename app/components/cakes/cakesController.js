

app.controller('cakesController', ['$scope', '$http','localStorageService','UserService', 'cakesService', '$rootScope',
    function($scope, $http, localStorageService, UserService, cakesService, $rootScope) {
        let self = this;

        $http.get('/categories') // get categories
            .then(function (res) {
                self.categories = res.data;
                /*if(!$rootScope.guest && !$rootScope.allCakes) {
                    cakesService.getRecommendedProducts() // gets all the recommended cakes
                        .then(cakesService.allCakes()); // now all the cakes are save in $root.allCakes !
                }*/
                if(!$rootScope.allCakes){
                    cakesService.allCakes();
                }

            })
            .catch(function (e) {
                return Promise.reject(e);
            });


    }]);
