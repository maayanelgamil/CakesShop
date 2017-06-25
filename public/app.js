'use strict';

var app = angular.module('CakesShop', [ 'ngRoute', 'LocalStorageModule']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.controller('mainController', ['$scope', 'UserService', '$location', '$window', '$http','localStorageService', '$filter', '$rootScope',
    function($scope, UserService, $location, $window,  $http, localStorageService, $filter, $rootScope) {
    let self = this;
    UserService.initUser($rootScope);
}]);

//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http', 'localStorageService', '$filter', function($http, localStorageService, $filter) {
    let service = {};

    service.initUser = function($rootScope){
        $rootScope.guest = true;
        $rootScope.UserName = '';
        $rootScope.LastLogin = '';
        if(localStorageService.cookie.isSupported){
            let user = localStorageService.cookie.get('user');
            if(user){
                $rootScope.UserName = user.UserName;
                $rootScope.LastLogin = user.Date;


                $rootScope.LastLogin = $filter('date')($rootScope.LastLogin, "dd/MM/yyyy");
                $rootScope.guest=false;
            }
        }
    };

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
            templateUrl : "views/home.html"})
        .when("/login", {
            templateUrl : "views/login.html"})
        .when("/register", {
            templateUrl : "views/register.html"
        }).when("/cakes", {
        templateUrl : "views/cakes.html"
    }).when("/about", {
        templateUrl : "views/about.html"
    }).otherwise({
        redirectTo : "/"
    });
}]);
//-------------------------------------------------------------------------------------------------------------------
