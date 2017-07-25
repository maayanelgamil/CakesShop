
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('productsController', ['$scope', '$http','localStorageService', '$rootScope', 'UserService',
    function($scope, $http, localStorageService, $rootScope, UserService) {
    let self = this;

    UserService.getUserProducts();

    $scope.addToCart = function (productName ) {
        alert(productName);
    };

    self.addToCart = function (cake) {
       let valueStored = localStorageService.get($rootScope.UserName);
       if (!valueStored){
           localStorageService.set($rootScope.UserName, [cake]);
           alert('Cake was added successfully');
       } else{
           var exist = valueStored.indexOf(cake);
           if(exist === 'undefined'){ // verify that the cake is not already in the cart
               valueStored.push(cake);
               localStorageService.set($rootScope.UserName,valueStored);
           }
       }
    }
}]);

