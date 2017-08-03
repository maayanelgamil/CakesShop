'use strict';

var app = angular.module('CakesShop', [ 'ngRoute', 'LocalStorageModule']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

app.controller('mainController', ['$scope', 'UserService', '$location', '$window', '$http','localStorageService',
    '$filter', '$rootScope', 'cakesService',
    function($scope, UserService, $location, $window,  $http, localStorageService, $filter, $rootScope, cakesService) {
    let self = this;
    UserService.initUser($rootScope);
}]);

//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http', 'localStorageService', '$filter', '$rootScope',
    function($http, localStorageService, $filter, $rootScope) {
    let service = {};

    service.initUser = function(){
        $rootScope.guest = true;
        $rootScope.UserName = '';
        $rootScope.LastLogin = '';
        if(localStorageService.cookie.isSupported){
            let user = localStorageService.cookie.get('user');
            if(user){
                $rootScope.UserName = user.UserName; // extract cookie data
                $rootScope.LastLogin = user.Date;

                $http.defaults.headers.common = {                  //use the token for the user requets
                    'my-Token': user.Token,
                    'user' : user.UserName
                };

                $rootScope.guest=false;                 //update that this is not a guest

                //update the cookie for the new login time!
                var cookieObject = {UserName: user.UserName, Date: new Date(), Token: user.Token }
                localStorageService.cookie.set('user',cookieObject);
            }
        }
    };

    service.getUserProducts = function(){
        if(!$rootScope.top5) {
            $http.get('/cakes/top5')
                .then(function (res) {
                    $rootScope.top5 = res.data;
                }).catch(function (e) {
                return Promise.reject(e);
            });
        }
        if(!$rootScope.newProducts){
            $http.get('/cakes/getNewCakes')
                .then(function (res) {
                    $rootScope.newProducts = res.data;
                })
                .catch(function (e) {
                    return Promise.reject(e);
                });
        }
    };

    service.getRecommendedProducts = function(){
            if(!$rootScope.guest && !$rootScope.recommendedCakes){
                $http.get('/users/recommandation/' + $rootScope.UserName)
                    .then(function (res) {
                        $rootScope.recommendedCakes = res.data;
                    })
                    .catch(function (e) {
                        return Promise.reject(e);
                    });
            }
        };

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
            templateUrl : "./components/home/home.html"})
        .when("/login", {
            templateUrl : "./components/login/login.html"})
        .when("/register", {
            templateUrl : "./components/register/register.html"
        }).when("/cakes", {
        templateUrl : "./components/cakes/cakes.html"
    }).when("/about", {
        templateUrl : "./shared/about.html"
    }).when("/cart", {
        templateUrl : "./components/cart/cart.html"
    }).otherwise({
        redirectTo : "/"
    });
}]);
//-------------------------------------------------------------------------------------------------------------------
