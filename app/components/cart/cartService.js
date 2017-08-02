

app.factory('cartService', ['$http', 'localStorageService', '$filter', '$rootScope',
    function($http, localStorageService, $filter, $rootScope) {

        let service = {};

        service.addToCart = function (cake) {
            let valueStored = localStorageService.get($rootScope.UserName);
            cake.Amount = 1;
            if (!valueStored){
                localStorageService.set($rootScope.UserName, [cake]);

            } else{
                var exist = valueStored.indexOf(cake);
                if(exist === 'undefined' || exist === -1 ){ // verify that the cake is not already in the cart

                    valueStored.push(cake);
                    localStorageService.set($rootScope.UserName,valueStored);
                }
            }
            if ($rootScope.cartEmpty){
                $rootScope.cartEmpty = false;
            }
            alert('Cake was added successfully');
        };

        return service;
    }]);