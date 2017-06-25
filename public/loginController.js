
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('loginController', ['$scope', '$location', '$window',
    function($location, $window, $scope) {
        let self = this;
        self.user = {UserName: '', Password: ''};
        self.restorePswd = false;
        self.answers = {Answer1:'', Answer2:''};
        self.questions = {Question1:'', Question2: ''};

        self.login = function(valid) {
            if (valid) {
                UserService.login($scope.user).then(function (success) {
                    alert('You are logged in');
                    $location.path('/');
                }, function (error) {
                    $scope.errorMessage = error.data;
                    alert('log-in has failed');
                })
            }
        };
        self.restore = function () {
            if (self.user.UserName === ''){
                alert('Please enter user name');
            }
            else {
                self.restorePswd = true;
            }
        }

    }]);
//-------------------------------------------------------------------------------------------------------------------