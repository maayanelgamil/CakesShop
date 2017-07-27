

app.controller('cakesController', ['$scope', '$http','localStorageService','UserService', 'cakesService', '$rootScope',
    function($scope, $http, localStorageService, UserService, cakesService, $rootScope) {
        let self = this;

        self.categoryHeader = "All Cakes";
        self.showAll = true;
        self.sortedOptions = ['Cake name', 'Price - high to low', 'Price - low to high'];
        self.filterBy = "";
        self.reverseSort = false;


        $http.get('/categories') // get categories
            .then(function (res) {
                self.categories = res.data;
                /*if(!$rootScope.guest && !$rootScope.allCakes) {
                    cakesService.getRecommendedProducts() // gets all the recommended cakes
                        .then(cakesService.allCakes()); // now all the cakes are save in $root.allCakes !
                }*/
                if(!$rootScope.allCakes){
                    cakesService.allCakes().then(function () {
                    self.cakes = $rootScope.allCakes;
                    });
                }

            })
            .catch(function (e) {
                return Promise.reject(e);
            });

        self.selectCategory = function (categoryName) {
            self.showAll = false;
            self.categoryHeader = categoryName;
            $http.get('/cakes/byCategory/'+categoryName).then(function (res) {
                self.cakes = res.data;
            })
        };

        self.selectAll = function () {
            self.showAll = true;
            self.categoryHeader = "All Cakes";
            self.cakes = $rootScope.allCakes;
        }
    }]);
