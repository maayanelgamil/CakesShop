

app.controller('cakesController', ['$scope', '$http','localStorageService','UserService', 'cakesService', '$rootScope',
    function($scope, $http, localStorageService, UserService, cakesService, $rootScope) {
        let self = this;

        self.categoryHeader = "All Cakes";
        self.showAll = true;
        self.sortedOptions =[ { name:'Cake name', label:'CakeName', reverse:false},
                              { name:'Price - low to high', label:'price', reverse:false},
                              { name:'Price - high to low', label:'price', reverse:true}];
        self.filterBy = "";
        self.orderBy = "";
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
            });
            self.orderBy = "";
        };

        self.selectAll = function () {
            self.showAll = true;
            self.categoryHeader = "All Cakes";
            self.cakes = $rootScope.allCakes;
            self.orderBy ="";
        }
    }]);
