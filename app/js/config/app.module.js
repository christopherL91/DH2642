
var app = angular.module('app', [ 'ngRoute', 'ngTouch', 'ngResource', 'ngCookies', 'ngAnimate', 'ui.bootstrap'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
  })
  .run(function($rootScope) {

  });

});
