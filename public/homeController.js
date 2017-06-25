
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('productsController', ['$scope', '$http','localStorageService', function($scope, $http, localStorageService) {
    let self = this;

    $http.get('/cakes/top5')
        .then(function (res) {
            self.top5 = res.data;
        })
        .catch(function (e) {
            return Promise.reject(e);
        });

    $scope.addToCart = function (productName ) {
        alert(productName);
    };
}]);

