(function() {
    'use strict';

    angular
        .module('app')
        .controller('DinnerCtrl', DinnerCtrl);

        function DinnerCtrl($scope, Dinner) {
            $scope.menu = Dinner.getMenu();
            $scope.numberOfGuests = Dinner.getNumberOfGuests();

            $scope.setNumberOfGuest = function(number){
                Dinner.setNumberOfGuests(number);
            }

            $scope.getNumberOfGuests = function() {
                return Dinner.getNumberOfGuests();
            }

            $scope.$watch('menu', function(newval,oldval,scope) {
              console.log({newval, oldval});
              $scope.menu = newval;
            });
        }
})();
