'use strict';

app.controller('registerController', ['$scope', '$location', '$window', '$http',
    function($scope, $location, $window, $http) {
        let self = this;
        self.user = {UserName: '', Password: '', FirstName: '', LastName: '' , Address: '',
            City: '', Country: '', Phone: '', Mail: '',CreditCardNumber: '', isADmin: 0
            , Question1: '', Question2: '', Answer1: '', Answer2: '', Category1: ''
            ,Category2: '', Category3: ''};
        self.countries = [];
        $http.get('/categories')
            .then(function (res) {
                self.categories = res.data;
            })
            .catch(function (e) {
                return Promise.reject(e);
            });

        $http.get("countries.xml").then(function (xml) {
            $(xml).find('Country').each(function () {
                let country = {
                ID: $(this).find('ID').text(),
                Name: $(this).find('Name').text()
                };

                self.countries.push(country)
            });
        });

        self.register = function(valid) {
            if (valid) {
                $http.post('users/register',self.user).then(function (success) {
                    $window.alert('Register Successfully');
                    $location.path('/login');
                }, function (error) {
                    self.errorMessage = error.data;
                    $window.alert('register has failed');
                })
            }
        };
    }]);