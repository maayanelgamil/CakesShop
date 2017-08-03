
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('cartController', ['$scope', '$http','localStorageService', '$rootScope', 'ngDialog','cartService',
    function($scope, $http, localStorageService, $rootScope, ngDialog, cartService) {
        let self = this;
        self.cart = localStorageService.get($rootScope.UserName);
        self.showModal = false;
        let html = '<img ng-src="{{ctrl.cake.ImagePath}}" class="modalImg"/>'
            +'<label class="modalText"> description: {{ctrl.cake.CakeName}}</label>' +
            ' <label class="modalText">{{ctrl.cake.price}}  </label>' +
            ' <label class="modalText">Amount left in stock: {{ctrl.cake.StockAmount}} </label>' +
            '<label class="modalText">Category: {{ctrl.cake.Category}}</label>';

        self.remove = function (cake) {
            let index = self.cart.indexOf(cake);
            self.cart.splice(index,1);
            localStorageService.set($rootScope.UserName, self.cart);
        };

        self.CakeAmount = function(cake){
            localStorageService.set($rootScope.UserName, self.cart);
        };

        self.pay = function(){
            var order =
                { UserName: $rootScope.UserName,
                    OrderDate: new Date(),
                    ShipmentDate: "", // MISSING!!
                    Dollar: "",
                    TotalAmount: 0
            };
            $http.post('/addOrder')
        };

        self.getTotal = function () {
            if(self.cart) { // bug fix - unknown reason
                var total = 0;
                for (var i = 0; i < self.cart.length; i++) {
                    total += self.cart[i].price * self.cart[i].Amount;
                }
                return total;
            }
        };

        self.getCake = function(){
            return self.selectedCake;
        }

        self.open = function(cake) {
            cartService.selectedCake = cake;
            ngDialog.open({ template:html,
                            controller:['cartService', function(cartService) {
                                self = this;
                                self.cake = cartService.selectedCake;
                             }],
                            controllerAs: 'ctrl',
                            className: 'ngdialog-theme-default'
                            });
        };
    }]);