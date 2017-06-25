
'use strict';
app.factory('UserService', ['$http', function($http) {
    let service = {};
    service.isLoggedIn = false;

    let vm = this;
    vm.userService = UserService;

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

