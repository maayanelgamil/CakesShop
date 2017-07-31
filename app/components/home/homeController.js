'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('productsController', ['$scope', '$http','localStorageService', '$rootScope', 'UserService',
    function($scope, $http, localStorageService, $rootScope, UserService) {
    let self = this;

    UserService.getUserProducts();

    self.addToCart = function (cake) {
       let valueStored = localStorageService.get($rootScope.UserName);
       if (!valueStored){
           localStorageService.set($rootScope.UserName, [cake]);
           alert('Cake was added successfully');
       } else{
           var exist = valueStored.indexOf(cake);
           if(exist === 'undefined' || exist === -1 ){ // verify that the cake is not already in the cart
               cake.Amount = 1;
               valueStored.push(cake);
               localStorageService.set($rootScope.UserName,valueStored);
           }
       }
    }
}]);

