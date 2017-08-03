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
