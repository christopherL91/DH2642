(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);

        function SearchCtrl($scope, Dinner) {
          $scope.options = [
            {
              name: 'Appetizer',
              value: 'appetizer'
            },
            {
              name: 'Main Course',
              value: 'main course'
            },
            {
              name: 'Dessert',
              value: 'dessert'
            }
          ];

          $scope.selectedOption = $scope.options[0];

          $scope.search = function(query,type) {
            console.log(query);
            console.log(type);
              $scope.status = "Searching...";
              Dinner.DishSearch.get({query:query, type:type}).$promise
                  .then(function(resp) {
                      const data = resp.toJSON();
                      const results = data.results;
                      const length = results.length;

                      $scope.dishes = results;
                      $scope.status = "Showing " + length + " results";
                  })
                  .catch(function(err) {
                      $scope.status = "There was an error";
                  });
            }
        }
})();
