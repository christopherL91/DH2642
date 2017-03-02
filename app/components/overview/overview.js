(function() {
    'use strict';

    angular
        .module('app')
        .controller('OverViewCtrl', OverViewCtrl);

        function OverViewCtrl($scope, Dinner) {
          $scope.menu = Dinner.getMenu();
          console.log($scope.menu);
        }
})();
