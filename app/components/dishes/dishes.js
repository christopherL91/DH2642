(function() {
    'use strict';

    angular
        .module('app')
        .controller('DishesCtrl', DishesCtrl);

        function DishesCtrl($scope, $routeParams, Dinner) {
            const id = $routeParams.dishId;
            Dinner.Dish.get({id}).$promise
                .then(function(data) {
                    console.log(data);
                })
                .catch(function(err) {
                    $scope.status = "There was an error";
                });
        }
})();
