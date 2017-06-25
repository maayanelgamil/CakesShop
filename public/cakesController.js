

app.controller('cakesController', ['$scope', '$http','localStorageService','UserService',
    function($scope, $http, localStorageService, UserService) {
    let self = this;

    UserService.getUserProducts();
    /*\$http.get('/cakes/top5')
        .then(function (res) {
            self.top5 = res.data;
        })
        .catch(function (e) {
            return Promise.reject(e);
        });*/

}]);
