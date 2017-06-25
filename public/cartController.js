
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('cartController', ['$scope', '$http','localStorageService', '$rootScope', 'UserService',
    function($scope, $http, localStorageService, $rootScope, UserService) {
        let self = this;

        UserService.getUserProducts();

        $scope.addToCart = function (productName ) {
            alert(productName);
        };
    }]);

