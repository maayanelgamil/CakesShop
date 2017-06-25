
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('productsController', ['$scope', '$http','localStorageService', '$rootScope', function($scope, $http, localStorageService, $rootScope) {
    let self = this;
    if(!$rootScope.top5){
        $http.get('/cakes/top5')
            .then(function (res) {
                $rootScope.top5 = res.data;
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
    }


    $scope.addToCart = function (productName ) {
        alert(productName);
    };
}]);

