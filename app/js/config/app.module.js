var app = angular.module('App', ['ngRoute', 'ngResource', 'ngCookies'])
.config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'HomeCtrl',
        })
        .when('/search', {
            templateUrl: 'app/views/search.html',
            controller: 'SearchCtrl',
        })
        .when('/dish/:dishId', {
            templateUrl: 'app/views/dishes.html',
            controller: 'DishesCtrl',
        })
        .otherwise({
            redirectTo: '/',
        });
  }
})
.run(function($rootScope) {

});
