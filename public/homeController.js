
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('productsController', ['$scope', '$http', function($scope, $http) {
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

