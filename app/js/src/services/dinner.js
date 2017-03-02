(function() {
    'use strict';

    angular
        .module('App')
        .factory('Dinner', Dinner);

        function Dinner($resource, $cookies) {
            let numberOfGuests = 2;
            let YOLO = 1;
            const menu = []; // type -> dish

            // Monkey patch
            function getType(dishTypes) {
                if(dishTypes.includes('appetizer')) {
                    return 'appetizer';
                } else if (dishTypes.includes('dessert')) {
                    return 'dessert';
                } else {
                    return 'main course';
                }
            }

            this.setNumberOfGuests = function(num) {
                numberOfGuests = num;
            }

            this.getNumberOfGuests = function() {
                return numberOfGuests;
            }

            this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
                get: {
                    headers: {
                        'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
                    },
                },
            });

            this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
                get: {
                    headers: {
                        'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
                    },
                    transformResponse: function(resp, headersGetter, status) {
                      let total = 0;
                      const data = JSON.parse(resp);
                      const ingredients = data.extendedIngredients.map(function (ingredient) {
                        const cost = ingredient.amount * YOLO;
                        total = total + cost;
                        return Object.assign(ingredient, {cost})
                      })
                      return Object.assign(data, {
                        type: getType(data.dishTypes),
                        extendedIngredients: {
                          total,
                          ingredients,
                        },
                      });
                    },
                },
            });

            this.addToMenu = function(dish) {
                menu[dish.type] = dish;
            }

            this.deleteFromMenu = function(dish) {
                delete menu[dish.type];
            }

            this.getMenu = function() {
                return menu;
            }

            return this;
        }
})();
