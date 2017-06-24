/**
 * Created by Maayan on 6/24/2017.
 */
//-------------------------------------------------------------------------------------------------------------------
angular.module('CakesShop').controller('loginController', ['$scope', 'UserService', '$location', '$window',
    function(UserService, $location, $window, $scope) {
        //let self = this;
        $scope.user = {UserName: '', Password: ''};

        $scope.login = function(valid) {
            if (valid) {
                UserService.login($scope.user).then(function (success) {
                    $window.alert('You are logged in');
                    $location.path('/');
                }, function (error) {
                    $scope.errorMessage = error.data;
                    $window.alert('log-in has failed');
                })
            }
        };
    }]);
//-------------------------------------------------------------------------------------------------------------------