'use strict';

var app = angular.module('CakesShop', [ 'ngRoute']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http', function($http) {
    let service = {};
    service.isLoggedIn = false;

    service.login = function(user) {
        return $http.post('/users/login', user)
            .then(function(response) {
                let token = response.data.token;
                $http.defaults.headers.common = {
                    'my-Token': token,
                    'user' : user.UserName
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
app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            controller : "productsController"
        })
        .when("/login", {
            templateUrl : "views/login.html",
            controller : "loginController"
        })
        .when("/register", {
            templateUrl : "views/register.html",
            controller: "registerController"
        }).otherwise({
        redirectTo : "/"
    });
}]);
//-------------------------------------------------------------------------------------------------------------------
