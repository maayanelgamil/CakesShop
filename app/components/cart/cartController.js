
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('cartController', ['$scope', '$http','localStorageService', '$rootScope', 'cartService',
    function($scope, $http, localStorageService, $rootScope, cartService) {
        let self = this;
        self.cart = localStorageService.get($rootScope.UserName);

        $scope.addToCart = function (productName ) {
            alert(productName);
        };
    }]);

