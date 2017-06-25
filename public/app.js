'use strict';

var app = angular.module('CakesShop', [ 'ngRoute', 'LocalStorageModule']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.controller('mainController', ['$scope', 'UserService', '$location', '$window', '$http','localStorageService',
    function($scope, UserService, $location, $window,  $http, localStorageService) {
    self.guest=true;
        if(localStorageService.cookie.isSupported){
            let user = localStorageService.cookie.get('user');
            if(user){
                let name = user.UserName;
                let time = user.Date;
                self.guest=false;

            }
        }
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
