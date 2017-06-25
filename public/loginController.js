
'use strict';
//-------------------------------------------------------------------------------------------------------------------
app.controller('loginController', ['$scope', 'UserService', '$location', '$window', '$http',
    function($scope, UserService, $location, $window,  $http) {
        let self = this;

        self.user = {UserName: '', Password: ''};
        self.restorePswd = false;
        self.answers = {Answer1:'', Answer2:''};

        self.login = function(valid) {
            if (valid) {
                UserService.login(self.user).then(function (success) {
                    var token = success.data;
                    if (token){
                        alert('You are logged in');
                        $location.path('/');
                    }else{
                        alert('Login failed');
                    }

                }, function (error) {
                    self.errorMessage = error.data;
                    alert('log-in has failed');
                })
            }
        };
        self.getQuestions = function () {
            if (self.user.UserName === ''){
                alert('Please enter user name');
            }
            else {
                self.restorePswd = true;
                $http.get('/users/questions/' +self.user.UserName)
                    .then(function (res) {
                        self.questions = res.data;
                    })
                    .catch(function (e) {
                        return Promise.reject(e);
                    });
            }
        }


    }]);
