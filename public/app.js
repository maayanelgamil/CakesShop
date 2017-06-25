'use strict';

var app = angular.module('CakesShop', [ 'ngRoute', 'LocalStorageModule']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.controller('mainController', ['$scope', 'UserService', '$location', '$window', '$http','localStorageService', '$filter',
    function($scope, UserService, $location, $window,  $http, localStorageService, $filter) {
    let self = this;
    self.UserName = '';
    self.LastLogin = '';
    self.guest=true;
        if(localStorageService.cookie.isSupported){
            let user = localStorageService.cookie.get('user');
            if(user){
                self.UserName = user.UserName;
                self.LastLogin = user.Date;


                self.LastLogin = $filter('date')(self.LastLogin, "dd/MM/yyyy");
                self.guest=false;
            }
        }
}]);

//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http', function($http) {
    let service = {};

    service.getNewProducts = function(){
        return $http.get('cakes//getNewCakes').then(function(response){
            return Promise.resolve(response);
        }).catch(function (e) {
            return Promise.reject(e);
        });
    }

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
        }).when("/about", {
        templateUrl : "views/about.html"
    }).when("/cakes", {
        templateUrl : "views/cakes.html",
        controller: "cakesController"
    }).otherwise({
        redirectTo : "/"
    });
}]);
//-------------------------------------------------------------------------------------------------------------------
