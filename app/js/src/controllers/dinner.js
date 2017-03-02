app.controller('DinnerCtrl', ['$scope', 'Dinner',
  function($scope,Dinner) {
    $scope.dinner = Dinner;
    $scope.numberOfGuests = Dinner.getNumberOfGuests();

    $scope.setNumberOfGuest = function(number){
        Dinner.setNumberOfGuests(number);
    }

    $scope.getNumberOfGuests = function() {
        return Dinner.getNumberOfGuests();
    }
  }
]);
