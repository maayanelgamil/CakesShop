
let app = angular.module('CakesShop', ['ngRoute']);
//-------------------------------------------------------------------------------------------------------------------
app.controller('mainController', ['UserService', function (UserService) {
    let vm = this;
    vm.userService = UserService;
}]);
//-------------------------------------------------------------------------------------------------------------------
app.controller('loginController', ['UserService', '$location', '$window',
    function(UserService, $location, $window) {
        let self = this;
        self.user = {UserName: '', Password: ''};
        self.restorePswd = false;
        self.answer = {Answer1:'', Answer2:''};

        self.login = function(valid) {
            if (valid) {
                UserService.login(self.user).then(function (success) {
                    $window.alert('You are logged in');
                    $location.path('/');
                }, function (error) {
                    self.errorMessage = error.data;
                    $window.alert('log-in has failed');
                })
            }
        };

        self.restore = function () {
            if (self.user.UserName === ''){
                $window.alert('Please enter user name');
            }
            else {
                self.restorePswd = true;
            }
        }
}]);

//-------------------------------------------------------------------------------------------------------------------
app.controller('registerController', ['UserService', '$location', '$window', '$http',
    function(UserService, $location, $window, $http) {
        let self = this;
        self.user = {UserName: '', Password: '', FirstName: '', LastName: '' , Address: '',
                     City: '', Country: '', Phone: '', Mail: '',CreditCardNumber: '', isADmin: 0
                        , Question1: '', Question2: '', Answer1: '', Answer2: '', Category1: ''
                    ,Category2: '', Category3: ''};
        $http.get('/categories')
            .then(function (res) {
                self.categories = res.data;
            })
            .catch(function (e) {
                return Promise.reject(e);
            });

        self.register = function(valid) {
          if (valid) {
                $http.post('users/register',self.user).then(function (success) {
                    $window.alert('Register Successfully');
                    $location.path('/');
                }, function (error) {
                    self.errorMessage = error.data;
                    $window.alert('register has failed');
                })
            }
        };
    }]);
//-------------------------------------------------------------------------------------------------------------------
app.controller('productsController', ['$http', function($http) {
    let self = this;

    $http.get('/cakes/top5')
        .then(function (res) {
            self.top5 = res.data;
        })
        .catch(function (e) {
            return Promise.reject(e);
    });

    self.addToCart = function (productName ) {
      alert(productName);
    };
}]);
//-------------------------------------------------------------------------------------------------------------------
app.controller('citiesController', ['$http', function($http) {
        let self = this;
        self.fieldToOrderBy = "name";
        // self.cities = [];
        self.getCakes = function () {
            $http.get('/cakes/')
                .then(function (res) {
                    self.cities = res.data;

                });
        };
    }]);
//-------------------------------------------------------------------------------------------------------------------
app.factory('UserService', ['$http', function($http) {
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
app.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
app.config( ['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "views/home.html",
            controller : "mainController"
        })
        .when("/login", {
            templateUrl : "views/login.html",
            controller : "loginController"
        })
        .when("/cities", {
            templateUrl : "views/cities.html",
            controller: 'citiesController'
        })
        .when("/register", {
            templateUrl : "views/register.html",
            controller: "mainController"
        })
        .otherwise({
            redirectTo : 'index.html'
        });
}]);
//-------------------------------------------------------------------------------------------------------------------
