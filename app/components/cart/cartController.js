
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('cartController', ['$scope', '$http','localStorageService', '$rootScope',
    function($scope, $http, localStorageService, $rootScope) {
        let self = this;
        self.cart = localStorageService.get($rootScope.UserName);


        self.remove = function (cake) {
            let index = self.cart.indexOf(cake);
            self.cart.splice(index,1);
            localStorageService.set($rootScope.UserName, self.cart);
            if (self.cart.length < 1){
                $rootScope.cartEmpty = true;
            }
        };

        self.CakeAmount = function(cake){
            if(!cake.Amount) {
                cake.Amount = 1;
            }
        };

        self.pay = function(){
            var order =
                { UserName: $rootScope.UserName,
                    OrderDate: new Date(),
                    ShipmentDate: "", // MISSING!!
                    Dollar: "",
                    TotalAmount: 0
            };
            $http.post('/addOrder', )
        };

        self.getTotal = function () {
            var total = 0;
            for(var i=0; i<self.cart.length; i++){
                total += self.cart[i].price * self.cart[i].Amount ;
            }
            return total;
        };

        self.cartIsEmpty = function () {
            let valueStored = localStorageService.get($rootScope.UserName);
            return (!valueStored || self.cart.length >0)
        }
    }]);

