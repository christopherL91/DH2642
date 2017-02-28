(function() {
    'use strict';

    angular
        .module('app')
        .controller('DinnerCtrl', DinnerCtrl);

        function DinnerCtrl($scope, Dinner) {
            $scope.numberOfGuests = Dinner.getNumberOfGuests();

            $scope.setNumberOfGuest = function(number){
                Dinner.setNumberOfGuests(number);
            }

            $scope.getNumberOfGuests = function() {
                return Dinner.getNumberOfGuests();
            }
        }
})();
