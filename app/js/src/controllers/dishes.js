app.controller('DishesCtrl', ['$scope', '$routeParams', 'Dinner',
  function($scope, $routeParams, Dinner) {

    const id = $routeParams.dishId;
    Dinner.Dish.get({id}).$promise
        .then(function(data) {
          console.log(data);
            $scope.data = data;
        })
        .catch(function(err) {
            $scope.status = "There was an error";
        });
    $scope.back = function() {
      window.history.back();
    }

    $scope.addDish = function(data) {
      Dinner.addToMenu(data);
      window.history.back();
    }
  }
]);
