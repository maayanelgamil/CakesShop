
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('cartController', ['$scope', '$http','localStorageService', '$rootScope',
    function($scope, $http, localStorageService, $rootScope) {
        let self = this;
        self.cart = localStorageService.get($rootScope.UserName);

        self.remove = function (cake) {
            let index = self.cart.indexOf(cake);
            self.cart.splice(index,1);
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
    }]);

