/**
 * Created by Maayan on 6/24/2017.
 */
angular.module('CakesShop', ['ngRoute']).controller('mainController', ['$scope', 'UserService', function ($scope, UserService) {
    let vm = $scope;
    vm.userService = UserService;
}]);
angular.module('CakesShop', ['ngRoute']).factory('UserService', ['$http', function($http) {
    let service = {};
    service.isLoggedIn = false;
    service.login = function(user) {
        return $http.post('/users/login', user)
            .then(function(response) {
                let token = response.data.token;
                $http.defaults.headers.common = {
                    'my-Token': token,
                    'user' : user.UserName
                };
                service.isLoggedIn = true;
                return Promise.resolve(response);
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
    };
    return service;
}]);
//-------------------------------------------------------------------------------------------------------------------
angular.module('CakesShop').controller('productsController', ['$scope', '$http', function($scope, $http) {
    //let self = this;

    $http.get('/cakes/top5')
        .then(function (res) {
            $scope.top5 = res.data;
        })
        .catch(function (e) {
            return Promise.reject(e);
        });

    $scope.addToCart = function (productName ) {
        alert(productName);
    };
}]);

