angular.module('CakesShop').controller('registerController', ['$scope', 'UserService', '$location', '$window', '$http',
    function($scope, UserService, $location, $window, $http) {
        //let self = this;
        $scope.user = {UserName: '', Password: '', FirstName: '', LastName: '' , Address: '',
            City: '', Country: '', Phone: '', Mail: '',CreditCardNumber: '', isADmin: 0
            , Question1: '', Question2: '', Answer1: '', Answer2: '', Category1: ''
            ,Category2: '', Category3: ''};
        $http.get('/categories')
            .then(function (res) {
                $scope.categories = res.data;
            })
            .catch(function (e) {
                return Promise.reject(e);
            });

        $scope.register = function(valid) {
            if (valid) {
                $http.post('users/register',$scope.user).then(function (success) {
                    $window.alert('Register Successfully');
                    $location.path('/');
                }, function (error) {
                    $scope.errorMessage = error.data;
                    $window.alert('register has failed');
                })
            }
        };
    }]);