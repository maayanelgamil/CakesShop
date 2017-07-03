

app.controller('cakesController', ['$scope', '$http','localStorageService','UserService',
    function($scope, $http, localStorageService, UserService) {
    let self = this;

    UserService.getUserProducts();
    UserService.getRecommendedProducts();

    $http.get('/categories')
        .then(function (res) {
            self.categories = res.data;
        })
        .catch(function (e) {
            return Promise.reject(e);
        });

}]);
