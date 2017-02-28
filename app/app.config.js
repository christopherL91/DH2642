(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

        config.$inject = ['$routeProvider', '$locationProvider'];

        function config($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider
                .when('/', {
                    templateUrl: 'app/components/home/home.html',
                    controller: 'HomeCtrl',
                })
                .when('/search', {
                    templateUrl: 'app/components/search/search.html',
                    controller: 'SearchCtrl',
                })
                .when('/dish/:dishId', {
                    templateUrl: 'app/components/dishes/dishes.html',
                    controller: 'DishesCtrl',
                })
                .otherwise({
                    redirectTo: '/',
                });
        }
})();
