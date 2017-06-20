
let app = angular.module('CakesShop', ['ngRoute']);
//-------------------------------------------------------------------------------------------------------------------
app.controller('mainController', ['UserService', function (UserService) {
    let vm = this;
    vm.userService = UserService;
}]);
//-------------------------------------------------------------------------------------------------------------------
app.controller('loginController', ['UserService', '$location', '$window',
    function(UserService, $location, $window) {
        let self = this;
        self.user = {UserName: '', Password: ''};

        self.login = function(valid) {
            if (valid) {
                UserService.login(self.user).then(function (success) {
                    $window.alert('You are logged in');
                    $location.path('/');
                }, function (error) {
                    self.errorMessage = error.data;
                    $window.alert('log-in has failed');
                })
            }
        };
}]);
//-------------------------------------------------------------------------------------------------------------------
app.controller('citiesController', ['$http', function($http) {
        let self = this;
        self.fieldToOrderBy = "name";
        // self.cities = [];
        self.getCities = function () {
            $http.get('/cities')
                .then(function (res) {
                    self.cities = res.data;
                });
        };
    }]);
//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http', function($http) {
    let service = {};
    service.isLoggedIn = false;
    service.login = function(user) {
        return $http.post('/users/login', user)
            .then(function(response) {
                let token = response.data;
                $http.defaults.headers.common = {
                    'my-Token': token,
                    'user' : user.username
                };
                service.isLoggedIn = true;
                return Promise.resolve(response);
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
    };
    return service;
}]);
//-------------------------------------------------------------------------------------------------------------------
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            controller : "mainController"
        })
        .when("/login", {
            templateUrl : "views/login.html",
            controller : "loginController"
        })
        .when("/cities", {
            templateUrl : "views/cities.html",
            controller: 'citiesController'
        })
        .otherwise({redirect: '/',
        });
}]);
//-------------------------------------------------------------------------------------------------------------------
