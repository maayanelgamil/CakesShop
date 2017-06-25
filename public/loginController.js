
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('loginController', ['$scope', 'localStorageService', 'UserService', '$location', '$window', '$http',
    function($scope, localStorageService, UserService, $location, $window,  $http) {
        let self = this;

        self.user = {UserName: '', Password: ''};
        self.restorePswd = false;
        self.answers = {Answer1:'', Answer2:''};
        self.questions = {Question1:'', Question2: ''};

        self.login = function(valid) {
            if (valid) {
                UserService.login(self.user).then(function (success) {
                    alert('You are logged in');
                    localStorageService.set(self.user.UserName, self.user.Password)
                    $location.path('/');
                }, function (error) {
                    self.errorMessage = error.data;
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
