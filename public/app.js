'use strict';

var app = angular.module('CakesShop', [ 'ngRoute']);

app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
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
